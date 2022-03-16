import { Container } from "@mui/material";
import { NextPage } from "next";
import { MainAppBar } from "src/components/appBar";
import { useUser } from "src/swr-cache/useUser";
import { BoothFilterChips } from "./boothFilterChips";
import { BoothMonitoringHeading } from "./boothMonitoringHeading";

export const BoothMonitoringPage: NextPage = () => {
  return (
    <>
      <MainAppBar />
      <Container maxWidth="lg" sx={{ mt: 3 }}>
        <BoothMonitoringHeading />
        <BoothFilterChips />
      </Container>
    </>
  );
};
