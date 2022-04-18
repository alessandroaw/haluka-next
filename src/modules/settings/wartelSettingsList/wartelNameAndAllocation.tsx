import { CircularProgress, Stack, Typography } from "@mui/material";
import React from "react";
import { Button } from "src/components/button";
import { allocateBooth, deallocateBooth } from "src/repositories/booths";
import { clientKey } from "src/swr-cache/useClient";
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
  const [loading, setLoading] = React.useState(false);

  const handleAllocation = async () => {
    setLoading(true);
    try {
      const createdBooth = await allocateBooth(wartel.id);
      mutate(userBoothsByIdKeys(wartel.id), (boothList: Booth[]) => [
        ...boothList,
        createdBooth,
      ]);
      mutate(userListKey, (userList: User[]) => {
        const userIndex = userList.findIndex((u) => u.id === wartel.id);
        const lastNumber: number = userList[userIndex].lastBoothNumber ?? 0;
        const newUserList = [...userList];
        newUserList[userIndex].lastBoothNumber = lastNumber + 1;
        return [...newUserList];
      });
      mutate(clientKey, (client: Client) => {
        client.currentBoothCount += 1;
        return client;
      });
    } catch (e) {
      alert("kesalahan");
    }
    setLoading(false);
  };

  const handleDeallocation = async () => {
    setLoading(true);
    try {
      await deallocateBooth(wartel.id);
      mutate(userBoothsByIdKeys(wartel.id), (boothList: Booth[]) => {
        const newBoothList = [...boothList];
        newBoothList.pop();
        return newBoothList;
      });
      mutate(userListKey, (userList: User[]) => {
        const userIndex = userList.findIndex((u) => u.id === wartel.id);
        const lastNumber: number = userList[userIndex].lastBoothNumber ?? 0;
        const newUserList = [...userList];
        newUserList[userIndex].lastBoothNumber = lastNumber - 1;
        return [...newUserList];
      });
      mutate(clientKey, (client: Client) => {
        client.currentBoothCount -= 1;
        return client;
      });
    } catch (e) {
      alert("kesalahan");
    }
    setLoading(false);
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
          disabled={loading}
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
