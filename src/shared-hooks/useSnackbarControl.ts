import { AlertColor } from "@mui/material";
import React from "react";
interface SnackBarControlInitialValue {
  open?: boolean;
  severity?: AlertColor;
  message?: string;
}

export const useSnackBarControl = ({
  open = false,
  severity = "info",
  message = "",
}: SnackBarControlInitialValue) => {
  const [sbOpen, setSbOpen] = React.useState(open);
  const [sbMessage, setSbMessage] = React.useState(message);
  const [sbSeverity, setSbSeverity] = React.useState<AlertColor>(severity);

  const handleSbClose = () => {
    setSbOpen(false);
  };

  const handleSbOpen = (severity: AlertColor, message: string) => {
    setSbOpen(true);
    setSbMessage(message);
    setSbSeverity(severity);
  };

  return {
    sbOpen,
    sbMessage,
    sbSeverity,
    handleSbClose,
    handleSbOpen,
  };
};
