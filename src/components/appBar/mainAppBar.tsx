import { AppBar, Container, SxProps, Tab, Tabs, Toolbar } from "@mui/material";
import { useRouter } from "next/router";
import React from "react";
import { AvatarButton } from "src/components/button/avatarButton";
import { HalukaLogo } from "src/components/logo";
import { kBorderColor } from "src/utils/styles";
import { HalukaContainer } from "../container";
import { LinkTab } from "../tabs";

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
  console.log(pageName);
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
      <HalukaContainer>
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
                href={`/${actor}/${pageName}${
                  pageName === "settings" ? "/accounts" : ""
                }`}
                label={label}
                key={index}
              />
            ))}
          </Tabs>
          <AvatarButton anchorHorizontal="right" />
        </Toolbar>
      </HalukaContainer>
    </AppBar>
  );
};
