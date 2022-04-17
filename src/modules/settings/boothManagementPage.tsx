import { Skeleton, Stack, Typography } from "@mui/material";
import { NextPage } from "next";
import React from "react";
import { GenericErrorAlert } from "src/components/alert";
import { useClient } from "src/swr-cache/useClient";
import { SettingsBorderBox, SettingsLayout } from "./settingsLayout";
import { WartelSettingsList } from "./wartelSettingsList";

export const BoothManagementPage: NextPage = () => {
  return (
    <SettingsLayout>
      <WartelQuotaSummary />
      <WartelSettingsList />
    </SettingsLayout>
  );
};

export const WartelQuotaSummary: React.FC = () => {
  const { client, loading, error } = useClient();

  if (loading) {
    return (
      <SettingsBorderBox>
        <Stack>
          <Typography variant="headline-md" gutterBottom>
            <Skeleton sx={{ maxWidth: "179px" }} />
          </Typography>
          <Typography variant="body-md">
            <Skeleton />
          </Typography>
        </Stack>
      </SettingsBorderBox>
    );
  }

  if (error || !client) {
    return (
      <SettingsBorderBox>
        <GenericErrorAlert />
      </SettingsBorderBox>
    );
  }

  return (
    <SettingsBorderBox>
      <Stack>
        <Typography variant="headline-md" gutterBottom>
          6 KBU tersisa
        </Typography>
        <Typography variant="body-md">
          Anda memiliki kuota total sebanyak {client?.maxBooth} KBU. Anda telah
          menggunakan 14 KBU.
        </Typography>
      </Stack>
    </SettingsBorderBox>
  );
};
