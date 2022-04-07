import { Container, Typography } from "@mui/material";
import { NextPage } from "next";
import { MainAppBar } from "src/components/appBar";
import { HalukaContainer } from "src/components/container";
import { PageTitle } from "src/components/typography";
import { SettingsLayout } from "./settingsLayout";
import { SettingsTab } from "./settingsTab";

export const PricingManagementPage: NextPage = () => {
  return (
    <SettingsLayout>
      <Typography>Hello World</Typography>
    </SettingsLayout>
  );
};
