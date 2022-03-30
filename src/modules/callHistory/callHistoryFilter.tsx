import { Box, Link, Stack, Typography } from "@mui/material";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { FilterChip } from "src/components/chip";
import { CallFilterQuery } from "src/types/query";
import { kDateFilterItems } from "src/utils/constant";
import { kCallMethod } from "src/utils/constant";

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
        <Stack direction="row" spacing={4}>
          <MethodFilterChips />
          <PaymentStatusFilter />
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

const DateFilterChips: React.FC = () => {
  const { push, query } = useRouter();
  const callQuery = query as CallFilterQuery;
  const [selectedFilterIndex, setSelectedFilterIndex] =
    React.useState<number>(0);

  React.useEffect(() => {
    if (callQuery.dateRange) {
      setSelectedFilterIndex(parseInt(callQuery.dateRange ?? "0"));
    }
  }, [callQuery.dateRange]);

  const handleFilterClick = (index: number) => () => {
    setSelectedFilterIndex(index);
    const newQuery: CallFilterQuery = {
      ...callQuery,
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
          active={selectedFilterIndex === -1}
          onClick={handleFilterClick(-1)}
          endIcon={<i className="bx bx-chevron-down" />}
        />
      </Stack>
    </Stack>
  );
};

const MethodFilterChips: React.FC = () => {
  const { push, query } = useRouter();
  const callQuery = query as CallFilterQuery;

  const [selectedFilterIndices, setSelectedFilterIndices] = React.useState<
    string[]
  >([]);

  React.useEffect(() => {
    if (callQuery.method) {
      setSelectedFilterIndices([callQuery.method].flat());
    }
  }, [callQuery.method]);

  const handleFilterClick = (index: string) => () => {
    const newSelectedFilterIndices = selectedFilterIndices.includes(index)
      ? selectedFilterIndices.filter((i) => i !== index)
      : [...selectedFilterIndices, index];

    setSelectedFilterIndices(newSelectedFilterIndices);

    const newQuery: CallFilterQuery = {
      ...callQuery,
      method: newSelectedFilterIndices,
    };
    push({
      query: newQuery,
    });
  };

  return (
    <Stack>
      <Typography variant="title-sm">Metode Panggilan</Typography>
      <Stack mt={1} direction="row" spacing={1}>
        {kCallMethod.map((label, index) => (
          <FilterChip
            key={index}
            label={label}
            active={selectedFilterIndices.includes(`${index}`)}
            onClick={handleFilterClick(`${index}`)}
          />
        ))}
      </Stack>
    </Stack>
  );
};

const PaymentStatusFilter: React.FC = () => {
  const { push, query } = useRouter();
  const callQuery = query as CallFilterQuery;
  const [selectedFilterIndices, setSelectedFilterIndices] = React.useState<
    string[]
  >([]);

  React.useEffect(() => {
    if (callQuery.status) {
      setSelectedFilterIndices([callQuery.status].flat());
    }
  }, [callQuery.status]);

  const handleFilterClick = (index: string) => () => {
    const newSelectedFilterIndices = selectedFilterIndices.includes(index)
      ? selectedFilterIndices.filter((i) => i !== index)
      : [...selectedFilterIndices, index];

    setSelectedFilterIndices(newSelectedFilterIndices);
    const newQuery: CallFilterQuery = {
      ...callQuery,
      status: newSelectedFilterIndices,
    };
    push({
      query: newQuery,
    });
  };

  return (
    <Stack>
      <Typography variant="title-sm">Status Pembayaran</Typography>
      <Stack mt={1} direction="row" spacing={1}>
        <FilterChip
          label="Lunas"
          active={selectedFilterIndices.includes("3")}
          onClick={handleFilterClick("3")}
        />
        <FilterChip
          label="Belum dibayar"
          active={selectedFilterIndices.includes("2")}
          onClick={handleFilterClick("2")}
        />
      </Stack>
    </Stack>
  );
};
