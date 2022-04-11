import { Box, Stack, ToggleButton, Typography } from "@mui/material";
import { NextPage } from "next";
import { Button } from "src/components/button";
import { useClient } from "src/swr-cache/useClient";
import { kCustomContainerLight } from "src/utils/styles";
import { SettingsBorderBox, SettingsLayout } from "./settingsLayout";

export const BoothManagementPage: NextPage = () => {
  const { client, loading, mutate, error } = useClient();

  return (
    <SettingsLayout>
      <SettingsBorderBox>
        <Stack>
          <Typography variant="headline-md" gutterBottom>
            6 KBU tersisa
          </Typography>
          <Typography variant="body-md">
            Anda memiliki kuota total sebanyak 20 KBU. Anda telah menggunakan 14
            KBU.
          </Typography>
        </Stack>
      </SettingsBorderBox>
      <SettingsBorderBox noBorder sx={{ mt: 6, p: 0 }}>
        <WartelNameAndAllocation />
        <Stack direction="row" spacing={1.5}>
          <BoothBox boothNumber={1} />
          <BoothBox boothNumber={1} isActive />
        </Stack>
      </SettingsBorderBox>
    </SettingsLayout>
  );
};

const WartelNameAndAllocation: React.FC = ({}) => {
  return (
    <Stack direction="row" justifyContent="space-between">
      <Typography variant="title-lg">Wartel Putra</Typography>
      <Stack
        direction="row"
        alignItems="stretch"
        sx={{
          border: "1px solid #73777F",
          borderRadius: "8px",
        }}
      >
        <Button
          sx={{
            borderRadius: "7px 0 0 7px",
          }}
        >
          <i className="bx bx-minus bx-large" />
        </Button>
        <Stack
          width="64px"
          height="40px"
          justifyContent="center"
          alignItems="center"
        >
          <Typography variant="label-lg">1</Typography>
        </Stack>
        <Button
          sx={{
            borderRadius: "0 7px 7px 0",
          }}
        >
          <i className="bx bx-plus bx-large" />
        </Button>
      </Stack>
    </Stack>
  );
};

interface BoothBoxProps {
  // boothId: string;
  boothNumber: number;
  isActive?: boolean;
}

const BoothBox: React.FC<BoothBoxProps> = ({
  // boothId,
  boothNumber,
  isActive = false,
}) => {
  const handleClick = () => {
    console.log("handleClick");
  };

  return (
    <Box
      width={90}
      height={90}
      onClick={handleClick}
      sx={{
        borderRadius: "12px",
        borderWidth: "1px",
        borderStyle: "solid",
        borderColor: "#73777F",
        cursor: "pointer",
      }}
    >
      <Stack alignItems="center" justifyContent="center" height="100%">
        <Typography variant="headline-md">{boothNumber}</Typography>
        <Stack
          justifyContent="center"
          alignItems="center"
          sx={{
            bgcolor: isActive ? kCustomContainerLight : "transparent",
            borderRadius: "100px",
            px: "6px",
          }}
        >
          {isActive ? (
            <Typography variant="label-sm">Aktif</Typography>
          ) : (
            <Typography variant="label-sm">&nbsp;</Typography>
          )}
        </Stack>
      </Stack>
    </Box>
  );
};
