import React from "react";
import { Box, CircularProgress, Stack, Typography } from "@mui/material";
import { useCalls } from "src/swr-cache/useCalls";
import { kDateFilterItems } from "src/utils/constant";
import { GenericErrorAlert } from "src/components/alert";
import { prettyDateTime } from "src/utils/helper";
import { useRouter } from "next/router";
import { RoundedButton } from "src/components/button";
import { CallFilterQuery } from "src/types/query";
import { CallFilterParams } from "src/types/params";

const queryToParams = (query: CallFilterQuery) => {
  const { startedAt, endedAt } =
    kDateFilterItems[parseInt(query.dateRange ?? "0")];
  const newCallFilterParams: CallFilterParams = {
    startedAt,
    endedAt,
    status: query.status ? parseInt(query.status) : undefined,
    method: query.method ? parseInt(query.method) : undefined,
    boothNumber: query.boothNumber ? parseInt(query.boothNumber) : undefined,
  };

  return newCallFilterParams;
};

export const CallHistoryDataGrid: React.FC = ({}) => {
  const { query } = useRouter();
  const { calls, loading, error } = useCalls(queryToParams(query));

  if (loading) {
    return <CircularProgress />;
  }

  if (error || !calls) {
    return <GenericErrorAlert />;
  }

  return (
    <Box>
      <Stack>
        {/* <pre>{JSON.stringify({ query }, null, 2)}</pre> */}
        {calls.map((call, index) => (
          <Stack direction="row" spacing={2}>
            <Typography variant="label-lg">{index}</Typography>
            <Typography variant="label-lg">
              {prettyDateTime(call.createdAt)}
            </Typography>
          </Stack>
        ))}
      </Stack>
    </Box>
  );
};
