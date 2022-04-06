import { Box, Link, Stack, Typography } from "@mui/material";
import { useRouter } from "next/router";
import React from "react";
import { RoundedButton } from "src/components/button";
import { FilterChip } from "src/components/chip";
import { DateRangeState } from "src/components/dateRange";
import { FilterMenu } from "src/components/menu";
import { DateRangeMenu } from "src/components/menu/dateRangeMenu";
import { useUserBooths } from "src/swr-cache/useUserBooths";
import { CallFilterQuery } from "src/types/query";
import { kCallMethod, kDateFilterItems } from "src/utils/constant";

export const CallHistoryFilter: React.FC = ({}) => {
  const [isSeeMoreClicked, setIsSeeMoreClicked] = React.useState(false);
  const { push, query } = useRouter();

  React.useEffect(() => {
    const { boothNumber, method, status } = query as CallFilterQuery;
    if (Boolean(boothNumber) || Boolean(method) || Boolean(status)) {
      setIsSeeMoreClicked(true);
    }
  }, [query]);

  const handleResetClick = () => {
    push({
      query: {},
    });
  };

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
        <Stack width="100%" direction="row" justifyContent="space-between">
          <Typography variant="title-md">Filter Riwayat Panggilan</Typography>
          <RoundedButton
            onClick={handleResetClick}
            variant="outlined"
            color="error"
            sx={{
              borderColor: "#73777F",
            }}
          >
            Reset filter
          </RoundedButton>
        </Stack>
        <DateFilterChips />
        {isSeeMoreClicked && (
          <Stack direction="row" spacing={4}>
            <BoothNumberFilter />
            <MethodFilterChips />
            <PaymentStatusFilter />
          </Stack>
        )}
        <Link
          variant="label-md"
          underline="hover"
          color="primary.main"
          onClick={() => setIsSeeMoreClicked(!isSeeMoreClicked)}
          sx={{
            cursor: "pointer",
          }}
        >
          Lihat lebih {isSeeMoreClicked ? "sedikit" : "banyak"} filter
        </Link>
      </Stack>
    </Box>
  );
};

const DateFilterChips: React.FC = () => {
  const { push, query } = useRouter();
  const callQuery = query as CallFilterQuery;
  const [anchor, setAnchor] = React.useState<null | HTMLElement>(null);
  const [selectedFilterIndex, setSelectedFilterIndex] =
    React.useState<number>(0);

  React.useEffect(() => {
    setSelectedFilterIndex(parseInt(callQuery.dateRange ?? "0"));
  }, [callQuery.dateRange]);

  const handleFilterClick = (index: number) => () => {
    setSelectedFilterIndex(index);
    delete callQuery.startDate;
    delete callQuery.endDate;
    const newQuery: CallFilterQuery = {
      ...callQuery,
      dateRange: `${index}`,
    };
    push({
      query: newQuery,
    });
  };

  const handleDateRangeFilterClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    setAnchor(event.currentTarget);
  };

  const handleDateRangeChange = ({ startDate, endDate }: DateRangeState) => {
    setSelectedFilterIndex(-1);
    const newQuery: CallFilterQuery = {
      ...callQuery,
      dateRange: `${-1}`,
      startDate: startDate?.toISOString(),
      endDate: endDate?.toISOString(),
    };
    push({
      query: newQuery,
    });
  };

  const handleClose = () => {
    setAnchor(null);
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
          onClick={handleDateRangeFilterClick}
          endIcon={<i className="bx bx-chevron-down" />}
        />
      </Stack>
      <DateRangeMenu
        open={Boolean(anchor)}
        anchorEl={anchor}
        onClose={handleClose}
        onFinish={handleDateRangeChange}
        initialValue={{
          startDate: callQuery.startDate
            ? new Date(callQuery.startDate)
            : new Date(),
          endDate: callQuery.endDate ? new Date(callQuery.endDate) : new Date(),
        }}
      />
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
    } else {
      setSelectedFilterIndices([]);
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
    } else {
      setSelectedFilterIndices([]);
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
    } else {
      setSelectedBoothNumbers([]);
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
