import React from "react";
import logoImg from "public/images/png/logo.png";
import Image from "next/image";
import { Box } from "@mui/material";

interface Props {
  width: number;
  height: number;
}

export const HalukaLogo: React.FC = () => {
  return (
    <Box>
      <Image src={logoImg} width={90} height={40.5} layout="intrinsic" />
    </Box>
  );
};
