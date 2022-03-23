import { Box, Link, Stack, Typography } from "@mui/material";
import React from "react";
import { FilterChip } from "src/components/chip";
import { useCalls } from "src/swr-cache/useCalls";
import { kDateFilterItems } from "src/utils/constant";

export const CallHistoryFilter: React.FC = ({}) => {
  const [selectedFilterIndex, setSelectedFilterIndex] =
    React.useState<number>(0);
  const { calls, loading, error } = useCalls({
    startedAt: kDateFilterItems[selectedFilterIndex].startedAt,
    endedAt: kDateFilterItems[selectedFilterIndex].endedAt,
  });

  return (
    <Box
      p={3}
      my={3}
      sx={{
        border: "1px solid rgba(27, 27, 27, 0.12)",
        borderRadius: "16px",
      }}
    >
      <Stack width="100%" alignItems="flex-start" spacing={3}>
        <Typography variant="title-md">Filter Riwayat Panggilan</Typography>
        <Stack>
          <Typography variant="title-sm">Periode Panggilan</Typography>
          <Stack mt={1} direction="row" spacing={1}>
            {kDateFilterItems.map(({ label }, index) => (
              <FilterChip
                key={index}
                label={label}
                active={index === selectedFilterIndex}
                onClick={() => setSelectedFilterIndex(index)}
              />
            ))}
            <FilterChip
              label="Lainnya"
              active={selectedFilterIndex === kDateFilterItems.length}
              onClick={() => setSelectedFilterIndex(kDateFilterItems.length)}
            />
          </Stack>
        </Stack>
        <Link
          variant="label-md"
          underline="hover"
          color="primary.main"
          onClick={() => console.log("clicked")}
          sx={{
            cursor: "pointer",
          }}
        >
          Lebih banyak filter
        </Link>
      </Stack>
    </Box>
  );
};
