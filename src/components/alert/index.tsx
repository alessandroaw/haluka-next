import { Alert } from "@mui/material";

export const GenericErrorAlert: React.FC = () => {
  return (
    <Alert severity="error">Terjadi kesalahan saat menghubungi server</Alert>
  );
};
