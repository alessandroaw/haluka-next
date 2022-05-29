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
import { SimpleImageDialog } from "src/components/dialog";

interface SaveChangeConfirmationDialogProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void | Promise<void>;
  loading?: boolean;
}

export const SaveChangeConfirmationDialog: React.FunctionComponent<
  SaveChangeConfirmationDialogProps
> = ({ open, onClose, onConfirm, loading = false }) => {
  return (
    <SimpleImageDialog
      open={open}
      onClose={onClose}
      onConfirm={onConfirm}
      image={saveChangeImg}
      title="Menyimpan perubahan pengaturan"
      message="Apakah Anda yakin ingin menyimpan perubahan pengaturan biaya?"
      loading={loading}
    />
  );
};
