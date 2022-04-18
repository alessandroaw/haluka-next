import { CircularProgress, Stack, Typography } from "@mui/material";
import React from "react";
import { Button } from "src/components/button";
import { SimpleImageDialog } from "src/components/dialog";
import { SnackBarAlert } from "src/components/snackbar";
import { allocateBooth, deallocateBooth } from "src/repositories/booths";
import { useSnackBarControl } from "src/shared-hooks/useSnackbarControl";
import { useClient } from "src/swr-cache/useClient";
import {
  userBoothsByIdKeys,
  useUserBoothsById,
} from "src/swr-cache/useUserBoothsById";
import deactivateBoothImg from "public/images/png/deactivate-booth.png";
import { userListKey } from "src/swr-cache/useUserList";
import { Booth, Client, User } from "src/types/models";
import { mutate } from "swr";

interface WartelNameAndAllocationProps {
  wartel: User;
}

export const WartelNameAndAllocation: React.FC<
  WartelNameAndAllocationProps
> = ({ wartel }) => {
  // Remote Cache
  const { client, mutate: mutateClient } = useClient();
  const { booths, mutate: mutateBoothList } = useUserBoothsById(wartel.id);

  // UI State
  const [loading, setLoading] = React.useState(false);
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const { sbOpen, sbMessage, sbSeverity, handleSbClose, handleSbOpen } =
    useSnackBarControl({});

  const fullMutation = (
    allocate: boolean,
    createdBooth: Booth | undefined = undefined
  ) => {
    if (allocate && !createdBooth)
      throw new Error("createdBooth cannot undefined in allocation");

    // Mutate all swr cache
    clientMutation(allocate);
    userBoothMutation(allocate, createdBooth);
    userListMutation(allocate);

    // Show success snackbar
    handleSbOpen(
      "info",
      `KBU berhasil ${allocate ? "ditambahkan" : "dihapus"}`
    );
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
      handleSbOpen("error", "Terjadi kesalahan saat mengalokasikan KBU");
    }
    setLoading(false);
  };

  const handleDeallocationControl = () => {
    if (!booths) return;

    if (Boolean(booths[booths.length - 1].activeSession)) {
      return setDialogOpen(true);
    }
    handleDeallocation();
  };

  const handleDeallocation = async () => {
    setLoading(true);
    try {
      await deallocateBooth(wartel.id);
      fullMutation(false);
    } catch (e) {
      handleSbOpen("error", "Terjadi kesalahan saat menghapus KBU");
    }
    setLoading(false);
  };

  const isMinAllocation = () => {
    if (!booths) return true;
    return booths.length <= 0;
  };

  const isMaxAllocation = () => {
    if (!client) return true;
    return client.currentBoothCount >= client.maxBooth;
  };

  return (
    <Stack direction="row" justifyContent="space-between">
      <SnackBarAlert
        open={sbOpen}
        message={sbMessage}
        severity={sbSeverity}
        onClose={handleSbClose}
      />
      <SimpleImageDialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        image={deactivateBoothImg}
        loading={loading}
        title="Menonaktifkan KBU"
        message={`Pengurangan jumlah KBU pada ${
          wartel.name
        } akan menonaktifkan KBU terakhir pada ${
          wartel.name
        } terlebih dahulu. Apakah Anda yakin ingin menonaktifkan KBU nomor ${
          booths ? booths.length : "-"
        } dari ${wartel.name}?`}
        onConfirm={handleDeallocation}
        confirmButtonText="Nonaktifkan KBU"
      />
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
          disabled={loading || isMinAllocation()}
          onClick={handleDeallocationControl}
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
