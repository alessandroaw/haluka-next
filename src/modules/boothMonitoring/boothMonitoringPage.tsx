import { Container } from "@mui/material";
import { NextPage } from "next";
import { MainAppBar } from "src/components/appBar";
import { PageTitle } from "src/components/typography";
import { BoothBillPanels } from "./boothBillsPanel";
import { BoothMonitoringHeading } from "./boothMonitoringHeading";

export const BoothMonitoringPage: NextPage = () => {
  return (
    <>
      <MainAppBar />
      <Container maxWidth="lg" sx={{ position: "relative" }}>
        <PageTitle title="Monitoring KBU" />
        <BoothMonitoringHeading />
        <BoothBillPanels />
      </Container>
    </>
  );
};
