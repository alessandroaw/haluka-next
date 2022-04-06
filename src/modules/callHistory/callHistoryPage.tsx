import { NextPage } from "next";
import { MainAppBar } from "src/components/appBar";
import { HalukaContainer } from "src/components/container";
import { PageTitle } from "src/components/typography";
import { CallHistoryDataGrid } from "./callHistoryDataGrid";
import { CallHistoryFilter } from "./callHistoryFilter";

export const CallHistoryPage: NextPage = () => {
  return (
    <>
      <MainAppBar />
      <HalukaContainer>
        <PageTitle title="Riwayat Transaksi" />
        <CallHistoryFilter />
        <CallHistoryDataGrid />
      </HalukaContainer>
    </>
  );
};
