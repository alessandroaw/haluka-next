import React from "react";
import logoImg from "public/images/png/logo.png";
import Image from "next/image";
import { Box, Stack, Typography } from "@mui/material";

interface Props {
  width: number;
  height: number;
}

export const HalukaLogo: React.FC = () => {
  return (
    <Stack direction="row" spacing={1.5} alignItems="center">
      <Image src={logoImg} width={29} height={36.2} layout="intrinsic" />
      <Typography variant="title-sm">Haluka</Typography>
    </Stack>
  );
};
