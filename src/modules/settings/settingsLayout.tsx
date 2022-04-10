import { MainAppBar } from "src/components/appBar";
import { HalukaContainer } from "src/components/container";
import { PageTitle } from "src/components/typography";
import { SettingsTab } from "./settingsTab";
import { Box, SxProps } from "@mui/material";

export const SettingsLayout: React.FC = ({ children }) => {
  return (
    <>
      <MainAppBar />
      <HalukaContainer>
        <PageTitle title="Pengaturan" />
      </HalukaContainer>
      <SettingsTab />
      <HalukaContainer
        sx={{
          mt: 4,
          width: "100%",
        }}
      >
        {children}
      </HalukaContainer>
    </>
  );
};

export const kSettingFormMaxWidth = "888px";

interface SettingsBorderBoxProps {
  maxWidth?: string;
  children?: React.ReactNode;
  sx?: SxProps;
}

export const SettingsBorderBox: React.FC<SettingsBorderBoxProps> = ({
  children,
  maxWidth,
  sx,
}) => {
  return (
    <Box
      sx={{
        width: "100%",
        borderRadius: "16px",
        border: `1px solid rgba(27, 27, 27, 0.12)`,
        p: [3, 4],
        maxWidth: maxWidth || kSettingFormMaxWidth,
        ...sx,
      }}
    >
      {children}
    </Box>
  );
};
