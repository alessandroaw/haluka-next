import { Box, Tabs } from "@mui/material";
import { useRouter } from "next/router";
import { LinkTab, LinkTabProps } from "src/components/tabs";
import { kBorderColor, kHalukaContainerPadding } from "src/utils/styles";

const tabItems: LinkTabProps[] = [
  {
    label: "Pengaturan Akun",
    href: "/admin/settings/accounts",
  },
  {
    label: "Pengaturan KBU",
    href: "/admin/settings/booths",
  },
  {
    label: "Pengaturan Biaya",
    href: "/admin/settings/pricing",
  },
];

export const SettingsTab: React.FC = () => {
  const { asPath } = useRouter();
  const tabValue = tabItems.findIndex((item) => item.href === asPath);

  return (
    <Box
      width="100%"
      px={kHalukaContainerPadding}
      sx={{
        borderBottom: `2px solid ${kBorderColor}`,
      }}
    >
      <Tabs value={tabValue} aria-label="settings-tab" sx={{ mt: 3 }}>
        {tabItems.map(({ label, href }) => (
          <LinkTab key={label} href={href} label={label} />
        ))}
      </Tabs>
    </Box>
  );
};
