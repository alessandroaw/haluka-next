import { Box, SxProps } from "@mui/material";
import { kHalukaContainerPadding } from "src/utils/styles";

interface HalukaContainerProps {
  children: React.ReactNode;
  sx?: SxProps;
}

export const HalukaContainer: React.FC<HalukaContainerProps> = ({
  children,
  sx,
}) => (
  <Box px={kHalukaContainerPadding} sx={sx}>
    {children}
  </Box>
);
