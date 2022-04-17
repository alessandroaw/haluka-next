import {
  Box,
  CircularProgress,
  Skeleton,
  Stack,
  Typography,
} from "@mui/material";
import React from "react";
import { GenericErrorAlert } from "src/components/alert";
import { Button } from "src/components/button";
import { useUserBoothsById } from "src/swr-cache/useUserBoothsById";
import { useUserList } from "src/swr-cache/useUserList";
import { User } from "src/types/models";
import { kCustomContainerLight } from "src/utils/styles";
import { SettingsBorderBox } from "./settingsLayout";

export const WartelSettingsList: React.FC = () => {
  return (
    <SettingsBorderBox noBorder sx={{ mt: 6, p: 0 }}>
      <WartelBoothsSettings />
    </SettingsBorderBox>
  );
};

export const WartelBoothsSettings: React.FC = () => {
  const { users, loading, error } = useUserList();

  if (loading) {
    return (
      <Stack spacing={4} mb={5}>
        {Array.from(Array(3).keys()).map((_, index) => (
          <React.Fragment key={index}>
            <Stack width="100%" direction="row" justifyContent="space-between">
              <Skeleton width="30%" />
              <Skeleton variant="rectangular" height={30} width="20%" />
            </Stack>
            <Stack direction="row" spacing={2}></Stack>
          </React.Fragment>
        ))}
      </Stack>
    );
  }

  if (error || !users) {
    return <GenericErrorAlert />;
  }

  return (
    // Spacing should be 6 but 4 because subtracted by booth box margin bottom 2
    <Stack spacing={4} mb={5}>
      {users
        .filter((user) => user.role === 2)
        .map((user) => (
          <Stack key={user.id} spacing={3}>
            <WartelNameAndAllocation wartel={user} />
            <BoothBoxList userId={user.id} />
          </Stack>
        ))}
    </Stack>
  );
};

interface WartelNameAndAllocationProps {
  wartel: User;
}

const WartelNameAndAllocation: React.FC<WartelNameAndAllocationProps> = ({
  wartel,
}) => {
  const [loading, setLoading] = React.useState(false);

  const handleAllocation = async () => {
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setLoading(false);
  };

  const handleDeallocation = async () => {
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setLoading(false);
  };

  return (
    <Stack direction="row" justifyContent="space-between">
      <Stack direction="row" alignItems="center" spacing={1}>
        <Typography variant="title-lg">{wartel.name}</Typography>
        {loading && <CircularProgress size="25px" />}
      </Stack>
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
            i: {
              fontWeight: 800,
              fontSize: "1.8rem",
            },
          }}
          disabled={loading}
          onClick={handleDeallocation}
        >
          <i className="bx bx-minus bx-large" />
        </Button>
        <Stack
          width="64px"
          height="40px"
          justifyContent="center"
          alignItems="center"
        >
          <Typography variant="label-lg">
            {wartel.lastBoothNumber ?? 0}
          </Typography>
        </Stack>
        <Button
          onClick={handleAllocation}
          disabled={loading}
          sx={{
            borderRadius: "0 7px 7px 0",
            i: {
              fontWeight: 800,
              fontSize: "1.8rem",
            },
          }}
        >
          <i className="bx bx-plus bx-large" />
        </Button>
      </Stack>
    </Stack>
  );
};

interface BoothBoxListProps {
  userId: string;
}

const BoothBoxList: React.FC<BoothBoxListProps> = ({ userId }) => {
  const { booths, loading, error } = useUserBoothsById(userId);

  if (loading) {
    return (
      <Box
        width="100%"
        sx={{
          display: "flex",
          flexWrap: "wrap",
        }}
      >
        {Array.from(Array(5).keys()).map((_, index) => (
          <Skeleton
            variant="rectangular"
            key={index}
            width={96}
            height={88}
            sx={{
              mr: 1.5,
              mb: 2,
            }}
          />
        ))}
      </Box>
    );
  }

  if (error || !booths) {
    return <GenericErrorAlert />;
  }

  return (
    <Box
      width="100%"
      sx={{
        display: "flex",
        flexWrap: "wrap",
      }}
    >
      {booths.map((booth) => (
        <BoothBox
          key={booth.id}
          boothNumber={booth.boothNumber}
          isActive={Boolean(booth.activeSession) && booth.activeSession !== ""}
        />
      ))}
    </Box>
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
      width={"96px"}
      height={"88px"}
      onClick={handleClick}
      sx={{
        borderRadius: "12px",
        borderWidth: "1px",
        borderStyle: "solid",
        borderColor: "#73777F",
        mr: 1.5,
        mb: 2,
        "&:hover": {
          ".deactivate-button": {
            opacity: 1,
            transform: "translateX(-50%)",
          },
          ".active-booth-indicator": {
            opacity: 0,
            transform: "translateX(-80%)",
          },
        },
      }}
    >
      <Stack alignItems="center" justifyContent="center" height="100%">
        <Typography variant="headline-md" sx={{ cursor: "default" }}>
          {boothNumber}
        </Typography>
        {/* Small Mui Button with font size 1rem */}
        <Box position="relative" height="20px">
          {isActive && (
            <Button
              className="deactivate-button"
              color="error"
              size="small"
              sx={{
                borderRadius: "100px",
                position: "absolute",
                top: 0,
                left: 0,
                transform: "translateX(-30%)",
                opacity: 0,
                transition: "all 0.3s ease-in-out",
              }}
            >
              <Typography variant="label-sm" sx={{ cursor: "pointer" }}>
                Nonaktifkan
              </Typography>
            </Button>
          )}
          <Box
            className="active-booth-indicator"
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              opacity: 1,
              transform: "translateX(-50%)",
              transition: "all 0.3s ease-in-out",
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
          </Box>
        </Box>
      </Stack>
    </Box>
  );
};
