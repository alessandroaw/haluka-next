import { Divider } from "@mui/material";
import { NextPage } from "next";
import { MainAppBar } from "src/components/appBar";
import { HalukaContainer } from "src/components/container";
import { PageTitle } from "src/components/typography";
import { kBorderColor } from "src/utils/styles";
import { BoothBillPanels } from "./boothBillsPanel";
import { BoothMonitoringHeading } from "./boothMonitoringHeading";

export const BoothMonitoringPage: NextPage = () => {
  return (
    <>
      <MainAppBar />
      <HalukaContainer>
        <PageTitle title="Monitoring KBU" />
        <BoothMonitoringHeading />
      </HalukaContainer>
      <Divider sx={{ borderWidth: "1px", borderColor: kBorderColor }} />
      <BoothBillPanels />
    </>
  );
};
