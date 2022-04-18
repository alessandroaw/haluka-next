import { NextPage } from "next";
import { MainAppBar } from "src/components/appBar";
import { HalukaContainer } from "src/components/container";
import { PageTitle } from "src/components/typography";
import { AdminUserIdTab } from "./adminUserIdTab";
import { CallHistoryDataGrid } from "./callHistoryDataGrid";
import { CallHistoryFilter } from "./callHistoryFilter";

export const CallHistoryAdminPage: NextPage = () => {
  return (
    <>
      <MainAppBar />
      <HalukaContainer>
        <PageTitle title="Riwayat Transaksi" />
        <CallHistoryFilter />
      </HalukaContainer>
      <AdminUserIdTab />
      <HalukaContainer>
        <CallHistoryDataGrid />
      </HalukaContainer>
    </>
  );
};
