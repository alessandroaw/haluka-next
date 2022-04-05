import { Box, Typography } from "@mui/material";

interface PageTitleProps {
  title: string;
}

export const PageTitle: React.FC<PageTitleProps> = ({ title }) => {
  return (
    <Box mt={3}>
      <Typography variant="headline-lg">{title}</Typography>
    </Box>
  );
};
