import { Container } from "@mui/material";
import { NextPage } from "next";
import { MainAppBar } from "src/components/appBar";
import { BoothBillPanels } from "./boothBillsPanel";
import { BoothMonitoringHeading } from "./boothMonitoringHeading";

export const BoothMonitoringPage: NextPage = () => {
  return (
    <>
      <MainAppBar />
      <Container maxWidth="lg" sx={{ position: "relative" }}>
        <BoothMonitoringHeading />
        <BoothBillPanels />
      </Container>
    </>
  );
};
