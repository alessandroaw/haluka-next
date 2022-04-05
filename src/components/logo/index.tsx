import React from "react";
import logoImg from "public/images/png/logo.png";
import Image from "next/image";
import { Box, Stack, Typography } from "@mui/material";
import { useRouter } from "next/router";

interface Props {
  width: number;
  height: number;
}

export const HalukaLogo: React.FC = () => {
  const { push } = useRouter();

  const goToHomePage = () => {
    push("/");
  };

  return (
    <Stack
      onClick={goToHomePage}
      direction="row"
      spacing={1.5}
      alignItems="center"
      sx={{
        cursor: "pointer",
      }}
    >
      <Image src={logoImg} width={29} height={36.2} layout="intrinsic" />
      <Typography variant="title-sm">Haluka</Typography>
    </Stack>
  );
};
