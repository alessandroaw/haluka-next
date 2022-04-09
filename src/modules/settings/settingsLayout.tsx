import { MainAppBar } from "src/components/appBar";
import { HalukaContainer } from "src/components/container";
import { PageTitle } from "src/components/typography";
import { SettingsTab } from "./settingsTab";

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
