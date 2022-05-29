import { Skeleton, Stack } from "@mui/material";
import React from "react";
import { GenericErrorAlert } from "src/components/alert";
import { useUserList } from "src/swr-cache/useUserList";
import { SettingsBorderBox } from "../settingsLayout";
import { BoothBoxList } from "./boothBoxList";
import { WartelNameAndAllocation } from "./wartelNameAndAllocation";

export const WartelSettingsList: React.FC = () => {
  return (
    <SettingsBorderBox noBorder sx={{ mt: 6, p: 0 }}>
      <WartelBoothsSettings />
    </SettingsBorderBox>
  );
};

export const WartelBoothsSettings: React.FC = () => {
  const { users, loading, error } = useUserList();

  if (loading) {
    return (
      <Stack spacing={4} mb={5}>
        {Array.from(Array(3).keys()).map((_, index) => (
          <React.Fragment key={index}>
            <Stack width="100%" direction="row" justifyContent="space-between">
              <Skeleton width="30%" />
              <Skeleton variant="rectangular" height={30} width="20%" />
            </Stack>
            <Stack direction="row" spacing={2}></Stack>
          </React.Fragment>
        ))}
      </Stack>
    );
  }

  if (error || !users) {
    return <GenericErrorAlert />;
  }

  return (
    // Spacing should be 6 but 4 because subtracted by booth box margin bottom 2
    <Stack spacing={4} mb={5}>
      {users
        .filter((user) => user.role === 2)
        .map((user, index) => (
          <Stack key={user.id} spacing={3}>
            <WartelNameAndAllocation wartel={user} />
            <BoothBoxList userId={user.id} />
          </Stack>
        ))}
    </Stack>
  );
};
