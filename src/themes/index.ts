import { createTheme, responsiveFontSizes, ThemeOptions } from "@mui/material";
import { TypographyOptions } from "@mui/material/styles/createTypography";
import { typography } from "./typography";

declare module "@mui/material/styles" {
  interface TypographyVariants {
    tooltip: React.CSSProperties;
  }

  interface PaletteColor {
    active?: string;
  }
  interface SimplePaletteColorOptions {
    active?: string;
  }

  interface Palette {
    neutral: Palette["primary"];
  }
  interface PaletteOptions {
    neutral: PaletteOptions["primary"];
  }

  // allow configuration using `createTheme`
  interface TypographyVariantsOptions {
    tooltip?: React.CSSProperties;
  }
}
// Update the Typography's variant prop options
declare module "@mui/material/Typography" {
  interface TypographyPropsVariantOverrides {
    tooltip: true;
  }
}
const theme = createTheme({
  typography,
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1440,
    },
  },
} as ThemeOptions);

export default responsiveFontSizes(theme);
// export default theme;
