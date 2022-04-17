import { Box, Skeleton, Stack, Typography } from "@mui/material";
import { NextPage } from "next";
import React from "react";
import underConstructionImg from "public/images/png/under-construction.png";
import Image from "next/image";
import { SettingsBorderBox, SettingsLayout } from "./settingsLayout";

export const AccountManagementPage: NextPage = () => {
  return (
    <SettingsLayout>
      <SettingsBorderBox>
        <Box position="relative" height="400px">
          <Image
            src={underConstructionImg}
            alt="Under Construction"
            layout="fill"
            objectFit="contain"
          />
        </Box>
        <Stack justifyContent="center" alignItems="center">
          <Typography variant="title-lg" color="textPrimary">
            Halaman sedang dalam pengembangan.
          </Typography>
        </Stack>
      </SettingsBorderBox>
    </SettingsLayout>
  );
};
