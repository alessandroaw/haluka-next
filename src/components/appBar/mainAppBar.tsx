import { AppBar, Container, Tab, Tabs, Toolbar } from "@mui/material";
import { useRouter } from "next/router";
import React from "react";
import { AvatarButton } from "src/components/button/avatarButton";
import { HalukaLogo } from "src/components/logo";
import { kBorderColor } from "src/utils/styles";

export const MainAppBar: React.FC = () => {
  const Navigations: { [key: string]: number } = {
    "booth-monitoring": 0,
    "transaction-history": 1,
  };

  const router = useRouter();
  const tabValue = Navigations[router.pathname.split("/")[1]];
  return (
    <AppBar
      color="inherit"
      elevation={0}
      position="sticky"
      sx={{
        top: 0,
        left: 0,
        borderBottom: `2px solid ${kBorderColor}`,
      }}
    >
      <Container
        maxWidth="lg"
        // sx={{ py: "11.75px" }}
      >
        <Toolbar disableGutters sx={{ alignItems: "stretch" }}>
          <HalukaLogo />
          <Tabs
            value={tabValue}
            aria-label="simple tabs example"
            sx={{
              ml: 4,
              flexGrow: 1,
              // height: "100%",
              // alignSelf: "flex-end",
            }}
          >
            <LinkTab href="/booth-monitoring" label="Monitoring KBU" />
            <LinkTab href="/transaction-history" label="Riwayat Panggilan" />
          </Tabs>
          <AvatarButton anchorHorizontal="right" />
        </Toolbar>
      </Container>
    </AppBar>
  );
};

interface LinkTabProps {
  label: string;
  href: string;
}

const LinkTab: React.FC<LinkTabProps> = ({ label, href }) => {
  const router = useRouter();
  return (
    <Tab
      component="a"
      color="black"
      sx={{
        // height: "100%",
        // pb: 3,
        textTransform: "initial",
      }}
      onClick={(event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        event.preventDefault();
        router.push(`${href}`);
      }}
      label={label}
    />
  );
};
