import { PaymentConfirmationDialogPlayground } from "./paymentConfirmationDialog";
import { Container } from "@mui/material";
import { NextPage } from "next";
import { MainAppBar } from "src/components/appBar";
import { BoothBillPanels } from "./boothBillsPanel";
import { BoothFilterChips } from "./boothFilterChips";
import { BoothMonitoringHeading } from "./boothMonitoringHeading";
import { MonitoringProvider } from "src/context/monitoringContext";

export const BoothMonitoringPage: NextPage = () => {
  return (
    <>
      <MainAppBar />
      <Container maxWidth="lg">
        <MonitoringProvider>
          <BoothMonitoringHeading />
          <BoothFilterChips />
          <PaymentConfirmationDialogPlayground />
          <BoothBillPanels />
        </MonitoringProvider>
      </Container>
    </>
  );
};
