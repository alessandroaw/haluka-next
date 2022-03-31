import React from "react";
import { Box, CircularProgress, Link, Stack, Typography } from "@mui/material";
import { useRouter } from "next/router";
import { FilterChip } from "src/components/chip";
import { FilterMenu } from "src/components/menu";
import { CallFilterQuery } from "src/types/query";
import { kDateFilterItems } from "src/utils/constant";
import { kCallMethod } from "src/utils/constant";
import { useUserBooths } from "src/swr-cache/useUserBooths";
import { GenericErrorAlert } from "src/components/alert";

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
          <BoothNumberFilter />
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

const kBoothNumberFilterItems = ["1", "2", "3", "4", "5", "6", "7"];

const BoothNumberFilter: React.FC = () => {
  const { push, query } = useRouter();
  const callQuery = query as CallFilterQuery;
  // Load user booths to get booth numbers
  const { booths, loading, error } = useUserBooths();

  const [selectedBoothNumbers, setSelectedBoothNumbers] = React.useState<
    number[]
  >([]);
  const [boothNumbers, setBoothNumbers] = React.useState<number[]>([]);

  const [anchor, setAnchor] = React.useState<null | HTMLElement>(null);

  React.useEffect(() => {
    if (callQuery.boothNumber) {
      setSelectedBoothNumbers([callQuery.boothNumber].flat().map(Number));
    }
    if (booths) {
      const newBoothNumbers = booths
        .map((booth) => booth.boothNumber)
        .sort((a, b) => a - b);
      setBoothNumbers(newBoothNumbers);
    }
  }, [callQuery.boothNumber, booths]);

  const openFilterMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchor(event.currentTarget);
  };

  const handleFilterChange = (newBoothNumbers: number[]) => {
    console.log("hello");

    setSelectedBoothNumbers(newBoothNumbers);

    const newQuery: CallFilterQuery = {
      ...callQuery,
      boothNumber: newBoothNumbers && newBoothNumbers.map((i) => `${i}`),
    };
    console.log({ message: "newQuery", newQuery });
    push({
      query: newQuery,
    });
  };

  return (
    <Stack>
      <Typography variant="title-sm">KBU</Typography>
      <Stack mt={1} direction="row" spacing={1}>
        <FilterChip
          label="No KBU"
          active={selectedBoothNumbers && selectedBoothNumbers.length > 0}
          badge={
            selectedBoothNumbers && selectedBoothNumbers.length > 0
              ? `${selectedBoothNumbers.length}`
              : undefined
          }
          onClick={openFilterMenu}
          endIcon={<i className="bx bx-chevron-down" />}
        />
      </Stack>
      <FilterMenu
        initialSelectedIndices={selectedBoothNumbers.map((i) =>
          boothNumbers.indexOf(i)
        )}
        open={Boolean(anchor)}
        anchorEl={anchor}
        loading={loading}
        error={Boolean(error)}
        onClose={() => {
          setAnchor(null);
        }}
        onFinish={(indices: number[]) => {
          const newBoothNumbers = indices.map((i) => boothNumbers[i]);
          handleFilterChange(newBoothNumbers);
        }}
        onReset={() => {
          handleFilterChange([]);
        }}
        list={boothNumbers}
      />
    </Stack>
  );
};
