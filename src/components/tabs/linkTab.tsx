import { SxProps, Tab } from "@mui/material";
import { useRouter } from "next/router";
import React from "react";

export interface LinkTabProps {
  label: string;
  href: string;
  sx?: SxProps;
}

export const LinkTab: React.FC<LinkTabProps> = ({ label, href, sx }) => {
  const router = useRouter();
  return (
    <Tab
      component="a"
      color="black"
      sx={{
        textTransform: "initial",
        ...sx,
      }}
      onClick={(event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        event.preventDefault();
        router.push(`${href}`);
      }}
      label={label}
    />
  );
};
