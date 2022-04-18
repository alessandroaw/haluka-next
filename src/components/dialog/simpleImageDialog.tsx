import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
  Typography,
} from "@mui/material";
import Image from "next/image";
import React from "react";
import { RoundedButton } from "src/components/button";

interface SimpleImageDialogProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void | Promise<void>;
  image: string | StaticImageData;
  title: string;
  message: string;
  loading?: boolean;
  confirmButtonText?: string;
}

export const SimpleImageDialog: React.FunctionComponent<
  SimpleImageDialogProps
> = ({
  open,
  onClose,
  onConfirm,
  image,
  title,
  message,
  loading = false,
  confirmButtonText,
}) => {
  const handleConfirmation = async () => {
    await onConfirm();
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
          src={image}
          alt="dialog image"
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
            {title}
          </Typography>
          <Typography color="GrayText" variant="body-md">
            {message}
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
            {confirmButtonText ?? "Simpan perubahan"}
          </RoundedButton>
        </Stack>
      </DialogActions>
    </Dialog>
  );
};
