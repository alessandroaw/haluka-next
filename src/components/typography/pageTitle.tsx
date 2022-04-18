import { Box, Typography } from "@mui/material";
import { HalukaTitle } from "../head";

interface PageTitleProps {
  title: string;
}

export const PageTitle: React.FC<PageTitleProps> = ({ title }) => {
  return (
    <Box mt={3}>
      <HalukaTitle title={title} />
      <Typography variant="headline-lg">{title}</Typography>
    </Box>
  );
};
