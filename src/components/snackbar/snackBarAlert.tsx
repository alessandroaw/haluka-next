import { Alert, Snackbar } from "@mui/material";

interface SnackbarAlertProps {
  message?: string;
  open: boolean;
  onClose: () => void;
  severity?: "success" | "info" | "warning" | "error";
}

export const SnackBarAlert: React.FC<SnackbarAlertProps> = ({
  message = "Terjadi kesalahan saat menghubungi server",
  open: sbAlertOpen,
  onClose,
  severity = "error",
}) => {
  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    onClose();
  };

  return (
    <Snackbar
      open={sbAlertOpen}
      anchorOrigin={{
        vertical: "top",
        horizontal: "center",
      }}
      autoHideDuration={2000}
      onClose={handleClose}
    >
      <Alert
        onClose={onClose}
        severity={severity}
        sx={{
          width: "100%",
        }}
      >
        {message}
      </Alert>
    </Snackbar>
  );
};
