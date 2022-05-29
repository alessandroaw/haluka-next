import { Stack, Typography } from "@mui/material";
import React from "react";
import { FilterChip } from "src/components/chip";

// TODO: Add filter compoonent logic and SWR logic
interface BoothFilterValues {
  all: boolean;
  active: boolean;
  pending: boolean;
}

type BoothFilterKeys = "all" | "active" | "pending";

export const BoothFilterChips: React.FC = () => {
  const [filterValues, setFilterValues] = React.useState<BoothFilterValues>({
    all: false,
    active: false,
    pending: false,
  });

  const copyWriting = {
    all: "seluruh KBU yang terhubung",
    active: "sesi KBU yang aktif",
    pending: "sesi KBU yang perlu dibayar",
  };

  const handleChipClick = (chip: BoothFilterKeys) => {
    setFilterValues({
      all: false,
      active: false,
      pending: false,
      [chip]: !filterValues[chip],
    });
  };

  return (
    <Stack spacing={2} mt={3}>
      <Stack direction="row" spacing={1}>
        <FilterChip
          label="Seluruh KBU"
          onClick={() => handleChipClick("all")}
          active={filterValues.all}
        />
        <FilterChip
          label="Aktif"
          onClick={() => handleChipClick("active")}
          active={filterValues.active}
        />
        <FilterChip
          label="Menunggu Pembayaran"
          onClick={() => handleChipClick("pending")}
          active={filterValues.pending}
        />
      </Stack>
      {/* TODO: Change this to reflect filter */}
      <Typography variant="body-md">Menampilkan seluruh KBU</Typography>
    </Stack>
  );
};
