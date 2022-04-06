import { Box } from "@mui/material";
import { kHalukaContainerPadding } from "src/utils/styles";

export const HalukaContainer: React.FC = ({ children }) => (
  <Box px={kHalukaContainerPadding}>{children}</Box>
);
