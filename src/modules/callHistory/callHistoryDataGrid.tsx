import React from "react";
import { Box, CircularProgress, Stack, Typography } from "@mui/material";
import { useCalls } from "src/swr-cache/useCalls";
import { kDateFilterItems } from "src/utils/constant";
import { GenericErrorAlert } from "src/components/alert";
import { prettyDate, prettyDateTime } from "src/utils/helper";

export const CallHistoryDataGrid: React.FC = ({}) => {
  const { calls, loading, error } = useCalls({
    startedAt: kDateFilterItems[0].startedAt,
    endedAt: kDateFilterItems[0].endedAt,
  });

  if (loading) {
    return <CircularProgress />;
  }

  if (error || !calls) {
    return <GenericErrorAlert />;
  }

  return (
    <Box>
      <Stack>
        {calls.map((call, index) => (
          <Stack direction="row" spacing={2}>
            <Typography variant="label-md">{index}</Typography>
            <Typography variant="label-md">
              {prettyDateTime(call.createdAt)}
            </Typography>
          </Stack>
        ))}
      </Stack>
    </Box>
  );
};
