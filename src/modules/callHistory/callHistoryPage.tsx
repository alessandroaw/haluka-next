import { CallHistoryDataGrid } from "./callHistoryDataGrid";
import { CallHistoryFilter } from "./callHistoryFilter";
import { Container } from "@mui/material";
import { NextPage } from "next";
import { MainAppBar } from "src/components/appBar";
import { Typography, Box } from "@mui/material";

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
