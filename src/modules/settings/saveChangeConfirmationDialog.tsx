import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
  Typography,
} from "@mui/material";
import Image from "next/image";
import saveChangeImg from "public/images/png/save-change.png";
import React from "react";
import { RoundedButton } from "src/components/button";

interface SaveChangeConfirmationDialogProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export const SaveChangeConfirmationDialog: React.FunctionComponent<
  SaveChangeConfirmationDialogProps
> = ({ open, onClose, onConfirm }) => {
  const [loading, setLoading] = React.useState(false);

  const handleConfirmation = async () => {
    onConfirm();
    onClose();
  };

  const handleCancelation = () => {
    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      PaperProps={{
        sx: {
          borderRadius: "16px",
          minWidth: "560px",
          py: 3,
          px: 2,
        },
      }}
    >
      <DialogContent
        sx={{
          position: "relative",
          height: "160px",
        }}
      >
        <Image
          src={saveChangeImg}
          alt="Save Change Ilustration"
          // width={216}
          // height={160}
          layout="fill"
          objectFit="contain"
        />
      </DialogContent>

      <DialogTitle
        id="alert-dialog-title"
        sx={{
          my: 3,
        }}
      >
        <Stack>
          <Typography gutterBottom variant="title-lg">
            Menyimpan perubahan pengaturan
          </Typography>
          <Typography color="GrayText" variant="body-md">
            Apakah Anda yakin ingin menyimpan perubahan pengaturan biaya?
          </Typography>
        </Stack>
      </DialogTitle>

      <DialogActions>
        <Stack width="100%" direction="row" spacing={1}>
          <RoundedButton
            fullWidth
            variant="outlined"
            size="small"
            disabled={loading}
            onClick={handleCancelation}
          >
            Batal
          </RoundedButton>
          <RoundedButton
            fullWidth
            size="small"
            variant="contained"
            loading={loading}
            color="primary"
            onClick={handleConfirmation}
            autoFocus
          >
            Simpan perubahan
          </RoundedButton>
        </Stack>
      </DialogActions>
    </Dialog>
  );
};
