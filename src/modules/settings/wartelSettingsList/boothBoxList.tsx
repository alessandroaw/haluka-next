import { Box, Skeleton, Stack, Typography } from "@mui/material";
import deactivateBoothImg from "public/images/png/deactivate-booth.png";
import React from "react";
import { GenericErrorAlert } from "src/components/alert";
import { Button } from "src/components/button";
import { SimpleImageDialog } from "src/components/dialog";
import { deactivateBooth } from "src/repositories/booths";
import { useUserBoothsById } from "src/swr-cache/useUserBoothsById";
import { Booth } from "src/types/models";
import { kCustomContainerLight } from "src/utils/styles";

interface BoothBoxListProps {
  userId: string;
}

export const BoothBoxList: React.FC<BoothBoxListProps> = ({ userId }) => {
  const { booths, loading, error, mutate } = useUserBoothsById(userId);

  const boothMutation = (booth: Booth) => {
    if (booths && booths.length > 0) {
      const newBooths = [...booths];
      const index = newBooths.findIndex((b) => b.id === booth.id);
      newBooths[index] = booth;
      mutate(newBooths);
    }
  };

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
          boothId={booth.id}
          boothNumber={booth.boothNumber}
          isActive={Boolean(booth.activeSession) && booth.activeSession !== ""}
          boothMutation={boothMutation}
        />
      ))}
    </Box>
  );
};

interface BoothBoxProps {
  boothId: string;
  boothNumber: number;
  isActive?: boolean;
  boothMutation: (booth: Booth) => void;
}

export const BoothBox: React.FC<BoothBoxProps> = ({
  boothId,
  boothNumber,
  isActive = false,
  boothMutation,
}) => {
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const handleClick = () => {
    if (!isActive) return;
    setOpen(true);
  };

  const handleConfirm = async () => {
    try {
      setLoading(true);
      const updatedBooth = await deactivateBooth(boothId);
      boothMutation(updatedBooth);
    } catch (e) {
      alert("Terjadi Kesalahan saat menonaktifkan kbu");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <SimpleImageDialog
        open={open}
        onClose={() => setOpen(false)}
        image={deactivateBoothImg}
        loading={loading}
        title="Menonaktifkan KBU"
        message={`Apakah Anda yakin ingin menonaktifkan KBU nomor ${boothNumber} dari Wartel Putra?`}
        onConfirm={handleConfirm}
        confirmButtonText="Nonaktifkan KBU"
      />
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
    </>
  );
};
