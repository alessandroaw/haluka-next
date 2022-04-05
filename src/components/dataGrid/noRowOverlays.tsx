import { Box, Stack, Typography } from "@mui/material";
import Image from "next/image";
import noRowsData from "public/images/png/emptyRow.png";
import React from "react";

export const DataGridNoRowsOverlay: React.FC<{
  message?: string;
  compact?: boolean;
}> = ({
  message = "Tidak terdapat data yang dapat ditampilkan",
  compact,
  children,
}) => {
  return (
    <Stack
      direction="column"
      py={compact ? 3 : 4}
      spacing={compact ? 1.5 : 4}
      sx={{
        margin: "56px auto 0",
        alignItems: "center",
        flex: "flex-end",
      }}
    >
      <Box width={compact ? 65 : "125px"}>
        <Image src={noRowsData} alt="Tidak ada data" layout="responsive" />
      </Box>
      <Typography variant="body-md" color="text.secondary">
        {message}
      </Typography>
      {children}
    </Stack>
  );
};
