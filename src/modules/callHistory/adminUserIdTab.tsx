import React from "react";
import { Box, CircularProgress, Skeleton, Stack, Tabs } from "@mui/material";
import { useRouter } from "next/router";
import { GenericErrorAlert } from "src/components/alert";
import { LinkTab, LinkTabProps } from "src/components/tabs";
import { useUserList } from "src/swr-cache/useUserList";
import { kBorderColor, kHalukaContainerPadding } from "src/utils/styles";
import { CallFilterQuery } from "src/types/query";

export const AdminUserIdTab: React.FC = () => {
  // const { asPath } = useRouter();
  // const tabValue = tabItems.findIndex((item) => item.href === asPath);

  const { users, loading, error } = useUserList();
  const { push, query } = useRouter();
  const callQuery = query as CallFilterQuery;
  const [tabValue, setTabValue] = React.useState(0);

  React.useEffect(() => {
    if (callQuery.wartelId) {
      if (users) {
        const wartelIndex = users
          .filter((u) => u.role === 2)
          .findIndex((user) => user.id === callQuery.wartelId);

        if (wartelIndex !== -1) {
          setTabValue(wartelIndex === -1 ? 0 : wartelIndex);
        } else {
          const newQuery = {
            ...callQuery,
            wartelId: users.filter((u) => u.role === 2)[0].id,
          };
          push({
            query: newQuery,
          });
        }
      }
    }

    if (!callQuery.wartelId) {
      if (users) {
        const newQuery: CallFilterQuery = {
          ...callQuery,
          wartelId: users[0].id,
        };
        push({
          query: newQuery,
        });
      }
    }
  }, [callQuery.wartelId, users]);

  if (loading) {
    return (
      <Stack
        width="100%"
        direction="row"
        spacing={1}
        px={kHalukaContainerPadding}
        sx={{
          borderBottom: `2px solid ${kBorderColor}`,
        }}
      >
        {Array.from(Array(3).keys()).map((_, index) => (
          <Skeleton key={index} width="10%" />
        ))}
      </Stack>
    );
  }

  if (error || !users) {
    return (
      <Box
        width="100%"
        px={kHalukaContainerPadding}
        sx={{
          borderBottom: `2px solid ${kBorderColor}`,
        }}
      >
        <GenericErrorAlert />
      </Box>
    );
  }

  const handleTabClick = (id: string) => () => {
    const newQuery: CallFilterQuery = {
      ...callQuery,
      wartelId: id,
    };
    push({
      query: newQuery,
    });
  };

  return (
    <Box
      width="100%"
      px={kHalukaContainerPadding}
      sx={{
        borderBottom: `2px solid ${kBorderColor}`,
      }}
    >
      <Tabs value={tabValue} aria-label="settings-tab" sx={{ mt: 3 }}>
        {users
          .filter((u) => u.role === 2)
          .map(({ id, name: label }) => (
            <LinkTab key={label} label={label} onClick={handleTabClick(id)} />
          ))}
      </Tabs>
    </Box>
  );
};

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
