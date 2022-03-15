import { NextPage } from "next";
import { Container, Typography } from "@mui/material";
import { MainAppBar } from "src/components/appBar";

export const BoothMonitoringPage: NextPage = () => (
  <>
    <MainAppBar />
    <Container maxWidth="lg">
      <Typography variant="headline-lg">Hello World</Typography>
    </Container>
  </>
);
