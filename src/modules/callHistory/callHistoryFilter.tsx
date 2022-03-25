import { Box, Link, Stack, Typography } from "@mui/material";
import { useRouter } from "next/router";
import React from "react";
import { FilterChip } from "src/components/chip";
import { CallFilterQuery } from "src/types/query";
import { kDateFilterItems } from "src/utils/constant";

export const CallHistoryFilter: React.FC = ({}) => {
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
        <DateFilterChips />
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

const DateFilterChips: React.FC = () => {
  const { push, query } = useRouter();
  const [selectedFilterIndex, setSelectedFilterIndex] = React.useState<number>(
    query.dateRange ? parseInt((query as CallFilterQuery).dateRange ?? "0") : 0
  );

  const handleFilterClick = (index: number) => () => {
    setSelectedFilterIndex(index);
    const newQuery: CallFilterQuery = {
      ...query,
      dateRange: `${index}`,
    };
    push({
      query: newQuery,
    });
  };

  return (
    <Stack>
      <Typography variant="title-sm">Periode Panggilan</Typography>
      <Stack mt={1} direction="row" spacing={1}>
        {kDateFilterItems.map(({ label }, index) => (
          <FilterChip
            key={index}
            label={label}
            active={index === selectedFilterIndex}
            onClick={handleFilterClick(index)}
          />
        ))}
        <FilterChip
          label="Lainnya"
          active={selectedFilterIndex === kDateFilterItems.length}
          onClick={() => setSelectedFilterIndex(kDateFilterItems.length)}
        />
      </Stack>
    </Stack>
  );
};
