import { AppBar, Container, Tab, Tabs, Toolbar } from "@mui/material";
import { useRouter } from "next/router";
import React from "react";
import { AvatarButton } from "src/components/button/avatarButton";
import { HalukaLogo } from "src/components/logo";
import { kBorderColor } from "src/utils/styles";

interface TabItem {
  label: string;
  pageName: string;
}

export const MainAppBar: React.FC = () => {
  const navigations: { [key: string]: TabItem[] } = {
    cashier: [
      { pageName: "booth-monitoring", label: "Monitoring KBU" },
      { pageName: "call-history", label: "Riwayat Panggilan" },
    ],
    admin: [
      { pageName: "call-history", label: "Riwayat Panggilan" },
      { pageName: "settings", label: "Pengaturan" },
    ],
  };

  const router = useRouter();
  const pathNameSplit = router.pathname.split("/");
  const actor = pathNameSplit[1];
  const pageName = pathNameSplit[2];
  const tabValue = navigations[actor]?.findIndex(
    (item) => item.pageName === pageName
  );
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
              ".MuiTabs-scroller": {
                display: "flex",
              },
            }}
          >
            {navigations[actor]?.map(({ label, pageName }, index) => (
              <LinkTab
                href={`/${actor}/${pageName}`}
                label={label}
                key={index}
              />
            ))}
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
