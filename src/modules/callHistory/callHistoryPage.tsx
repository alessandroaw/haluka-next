import { NextPage } from "next";
import React from "react";
import { Box, Container, Typography } from "@mui/material";
import { MainAppBar } from "src/components/appBar";
import { CallHistoryDataGrid } from "./callHistoryDataGrid";
import { CallHistoryFilter } from "./callHistoryFilter";

export const CallHistoryPage: NextPage = () => {
  return (
    <>
      <MainAppBar />
      <Container maxWidth="lg" sx={{ position: "relative" }}>
        <PageTitle />
        <CallHistoryFilter />
        <CallHistoryDataGrid />
      </Container>
    </>
  );
};

const PageTitle: React.FC = () => {
  return (
    <Box mt={3}>
      <Typography variant="headline-lg">Riwayat Transaksi</Typography>
    </Box>
  );
};
