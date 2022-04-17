import { SxProps, Tab } from "@mui/material";
import { useRouter } from "next/router";
import React from "react";

export interface LinkTabProps {
  label: string;
  href?: string;
  sx?: SxProps;
  onClick?: () => void;
}

export const LinkTab: React.FC<LinkTabProps> = ({
  label,
  href,
  sx,
  onClick,
}) => {
  const router = useRouter();
  const handleClick = (
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) => {
    event.preventDefault();
    if (onClick) {
      return onClick();
    }
    router.push(`${href}`);
  };

  return (
    <Tab
      component="a"
      color="black"
      sx={{
        textTransform: "initial",
        ...sx,
      }}
      onClick={handleClick}
      label={label}
    />
  );
};
