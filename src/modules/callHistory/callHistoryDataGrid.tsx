import { Box, LinearProgress, Stack, Typography } from "@mui/material";
import {
  DataGrid,
  GridColDef,
  GridRenderCellParams,
  GridToolbarExport,
} from "@mui/x-data-grid";
import { useRouter } from "next/router";
import React from "react";
import { GenericErrorAlert } from "src/components/alert";
import { useCalls } from "src/swr-cache/useCalls";
import { CallFilterParams } from "src/types/params";
import { CallFilterQuery } from "src/types/query";
import { kDateFilterItems } from "src/utils/constant";
import {
  calculateCallDuration,
  numberToRupiahString,
  prettyDateTime,
} from "src/utils/helper";
import { kCallMethod } from "src/utils/constant";

const columnHeaderClassName = "haluka-datagrid--header";

const columns: GridColDef[] = [
  {
    field: "createdAt",
    headerName: "Waktu",
    flex: 1,
    headerClassName: columnHeaderClassName,
    renderCell: (params: GridRenderCellParams<Date>) => {
      const date = prettyDateTime(params.value);
      return date;
    },
  },
  // { field: "method", headerName: "No Nota", width: 150 },
  // { field: "method", headerName: "No KBU", width: 150 },
  {
    field: "callNumber",
    headerName: "No Tujuan",
    flex: 1,
    headerClassName: columnHeaderClassName,
  },
  {
    field: "method",
    headerName: "Metode Panggilan",
    minWidth: 150,

    headerClassName: columnHeaderClassName,
    renderCell: (params: GridRenderCellParams<number>) =>
      kCallMethod[params.value < 0 ? 0 : params.value],
  },
  {
    field: "status",
    headerName: "Status Pembayaran",
    width: 150,
    headerClassName: columnHeaderClassName,
    renderCell: (params: GridRenderCellParams<number>) =>
      params.value > 2 ? "Lunas" : "Belum Lunas",
  },
  {
    field: "duration",
    headerName: "Durasi",
    minWidth: 100,
    headerClassName: columnHeaderClassName,
    renderCell: (params: GridRenderCellParams<number>) =>
      calculateCallDuration(params.value),
  },
  {
    field: "total",
    headerName: "Biaya",
    headerClassName: columnHeaderClassName,
    width: 150,
    renderCell: (params: GridRenderCellParams<number>) =>
      numberToRupiahString(params.value),
  },
];

const queryToParams = ({ dateRange, status, method }: CallFilterQuery) => {
  const parsedDateRange = parseInt(dateRange ?? "0");
  if (parsedDateRange === -1) {
    // alert("custom filter");
    return {};
  }
  const { startedAt, endedAt } = kDateFilterItems[parsedDateRange];
  const newCallFilterParams: CallFilterParams = {
    startedAt,
    endedAt,
    status: status ? [status].flat() : undefined,
    method: method ? [method].flat() : undefined,
    // "method[]": query["method[]"] ? parseInt(query["method[]" : undefined,
    // boothNumber: query.boothNumber ? parseInt(query.boothNumber) : undefined,
  };

  return newCallFilterParams;
};

export const CallHistoryDataGrid: React.FC = ({}) => {
  const { query } = useRouter();
  const { calls, loading, error } = useCalls(queryToParams(query));

  if (error) {
    return <GenericErrorAlert />;
  }

  const toolbarHeight = 44;
  const offset = 24 + toolbarHeight;

  return (
    <Box mt={`${offset + 24}px`}>
      <DataGrid
        autoHeight
        localeText={{
          toolbarExport: "Unduh riwayat panggilan",
          noRowsLabel: "Tidak ada data",
        }}
        sx={{
          mb: 6,
          ".haluka-datagrid--header": {
            bgcolor: "secondary.light",
          },
        }}
        components={{
          LoadingOverlay: () => <LinearProgress />,
          // NoRowsOverlay: () => <DataGridNoRowsOverlay />,
          Toolbar: (props) => (
            <Box
              sx={{
                position: "relative",
                width: "100%",
              }}
            >
              <Stack
                className="toolbarContainer"
                direction="row"
                alignItems="center"
                justifyContent="space-between"
                width="100%"
                sx={{
                  position: "absolute",
                  top: `-${offset}px`,
                  width: "100%",
                  // transform: "translateY(100%)",
                }}
              >
                <Typography variant="body-md">
                  Menampilkan 1-10 dari total 24 riwayat panggilan
                </Typography>
                <GridToolbarExport
                  color="primary"
                  variant="contained"
                  disableElevation
                  sx={{
                    textTransform: "none",
                    borderRadius: "100px",
                    padding: "10px 24px 10px 16px",
                  }}
                  csvOptions={{
                    fileName: `Laporan Panggilan ${new Date().toLocaleDateString()}`,
                    // fields: ["name", "email", "role"],
                  }}
                  {...props}
                  startIcon={<i className="bx bx-download bx-md" />}
                  label=""
                />
              </Stack>
            </Box>
          ),
        }}
        loading={loading || !calls}
        rows={calls ?? []}
        columns={columns}
      />
    </Box>
  );
};
