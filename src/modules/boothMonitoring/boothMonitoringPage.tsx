import { Box, Container } from "@mui/material";
import { NextPage } from "next";
import { MainAppBar } from "src/components/appBar";
import { BoothBillPanels } from "./boothBillsPanel";
import { BoothFilterChips } from "./boothFilterChips";
import { BoothMonitoringHeading } from "./boothMonitoringHeading";

export const BoothMonitoringPage: NextPage = () => {
  return (
    <>
      <MainAppBar />
      <Container maxWidth="lg">
        <BoothMonitoringHeading />
        <BoothFilterChips />
      </Container>
      <BoothBillPanels />
    </>
  );
};
