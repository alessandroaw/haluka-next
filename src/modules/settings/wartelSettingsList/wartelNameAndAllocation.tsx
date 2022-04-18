import { CircularProgress, Stack, Typography } from "@mui/material";
import React from "react";
import { Button } from "src/components/button";
import { allocateBooth, deallocateBooth } from "src/repositories/booths";
import { clientKey, useClient } from "src/swr-cache/useClient";
import { userBoothsByIdKeys } from "src/swr-cache/useUserBoothsById";
import { userListKey } from "src/swr-cache/useUserList";
import { Booth, Client, User } from "src/types/models";
import { mutate } from "swr";

interface WartelNameAndAllocationProps {
  wartel: User;
}

export const WartelNameAndAllocation: React.FC<
  WartelNameAndAllocationProps
> = ({ wartel }) => {
  const { client, mutate: mutateClient } = useClient();
  const [loading, setLoading] = React.useState(false);

  const fullMutation = (
    allocate: boolean,
    createdBooth: Booth | undefined = undefined
  ) => {
    if (allocate && !createdBooth)
      throw new Error("createdBooth cannot undefined in allocation");

    clientMutation(allocate);
    userBoothMutation(allocate, createdBooth);
    userListMutation(allocate);
  };

  const clientMutation = (allocate: boolean) => {
    const increment = allocate ? 1 : -1;
    if (client) {
      const newClient = { ...client };
      newClient.currentBoothCount += increment;
      mutateClient(newClient);
    } else {
      mutate((client: Client) => {
        client.currentBoothCount += increment;
        return client;
      });
    }
  };

  const userBoothMutation = (
    allocate: boolean,
    createdBooth: Booth | undefined = undefined
  ) => {
    if (allocate && createdBooth) {
      mutate(userBoothsByIdKeys(wartel.id), (boothList: Booth[]) => [
        ...boothList,
        createdBooth,
      ]);
    } else {
      mutate(userBoothsByIdKeys(wartel.id), (boothList: Booth[]) => {
        const newBoothList = [...boothList];
        newBoothList.pop();
        return newBoothList;
      });
    }
  };

  const userListMutation = (allocate: boolean) => {
    mutate(userListKey, (userList: User[]) => {
      const userIndex = userList.findIndex((u) => u.id === wartel.id);
      const lastNumber: number = userList[userIndex].lastBoothNumber ?? 0;
      const newUserList = [...userList];
      newUserList[userIndex].lastBoothNumber = allocate
        ? lastNumber + 1
        : lastNumber - 1;
      return [...newUserList];
    });
  };

  const handleAllocation = async () => {
    setLoading(true);
    try {
      const createdBooth = await allocateBooth(wartel.id);
      fullMutation(true, createdBooth);
    } catch (e) {
      alert("kesalahan");
    }
    setLoading(false);
  };

  const handleDeallocation = async () => {
    setLoading(true);
    try {
      await deallocateBooth(wartel.id);
      fullMutation(false);
    } catch (e) {
      alert("kesalahan");
    }
    setLoading(false);
  };

  const isMaxAllocation = () => {
    if (!client) return true;
    return client.currentBoothCount >= client.maxBooth;
  };

  return (
    <Stack direction="row" justifyContent="space-between">
      <Stack direction="row" alignItems="center" spacing={1}>
        <Typography variant="title-lg">{wartel.name}</Typography>
        {loading && <CircularProgress size="25px" />}
      </Stack>
      <Stack
        direction="row"
        alignItems="stretch"
        sx={{
          border: "1px solid #73777F",
          borderRadius: "8px",
        }}
      >
        <Button
          sx={{
            borderRadius: "7px 0 0 7px",
            i: {
              fontWeight: 800,
              fontSize: "1.8rem",
            },
          }}
          disabled={loading}
          onClick={handleDeallocation}
        >
          <i className="bx bx-minus bx-large" />
        </Button>
        <Stack
          width="64px"
          height="40px"
          justifyContent="center"
          alignItems="center"
        >
          <Typography variant="label-lg">
            {wartel.lastBoothNumber ?? 0}
          </Typography>
        </Stack>
        <Button
          onClick={handleAllocation}
          disabled={loading || isMaxAllocation()}
          sx={{
            borderRadius: "0 7px 7px 0",
            i: {
              fontWeight: 800,
              fontSize: "1.8rem",
            },
          }}
        >
          <i className="bx bx-plus bx-large" />
        </Button>
      </Stack>
    </Stack>
  );
};
