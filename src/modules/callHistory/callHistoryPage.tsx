import React from "react";
import { NextPage } from "next";
import { MainAppBar } from "src/components/appBar";
import { HalukaContainer } from "src/components/container";
import { PageTitle } from "src/components/typography";
import { CallHistoryDataGrid } from "./callHistoryDataGrid";
import { CallHistoryFilter } from "./callHistoryFilter";
import { useRouter } from "next/router";
import { CallFilterQuery } from "src/types/query";

export const CallHistoryPage: NextPage = () => {
  const { query, push } = useRouter();
  // Precaution so that cashier cannot access wartel id
  React.useEffect(() => {
    if (query.wartelId) {
      const newQuery: CallFilterQuery = { ...query };
      delete newQuery.wartelId;
      push({
        query: newQuery,
      });
    }
  }, [query.wartelId]);

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
