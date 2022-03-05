import { createTheme, responsiveFontSizes, ThemeOptions } from "@mui/material";
import { TypographyOptions } from "@mui/material/styles/createTypography";

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
  palette: {
    primary: {
      active: "#1D64E51f",
      main: "#1D64E5",
      light: "#6A91FF",
      dark: "#003BB2",
      state: {
        selected: "#1D64E514",
      },
    },
    neutral: {
      disabled: "#00000099",
      main: "#FAFAFA",
      black: {
        main: "#000000",
        highEmphasis: "rgba(0, 0, 0, 0.87)",
        medEmphasis: "rgba(0, 0, 0, 0.6)",
        disabled: "rgba(0, 0, 0, 0.38)",
        outline: "rgba(0, 0, 0, 0.12)",
      },
      state: {
        hover: "rgba(0, 0, 0, 0.04)",
      },
    },
    other: {
      orange: {
        dark: "#BD6F00",
        state: {
          active: "#F59E0B1F",
        },
      },
    },
  },
  typography: {
    htmlFontSize: 10,
    fontFamily: ['"Inter"', '"sans-serif"'].join(","),
    tooltip: {
      fontFamily: ['"Inter"', '"sans-serif"'].join(","),
      fontSize: "1rem",
      lineHeight: 1.6,
      fontWeight: 500,
    },
    h1: { fontSize: "9.6rem", lineHeight: 1.1667, fontWeight: 500 },
    h2: { fontSize: "6.0rem", lineHeight: 1.2, fontWeight: 600 },
    h3: { fontSize: "4.8rem", lineHeight: 1, fontWeight: 600 },
    h4: { fontSize: "3.4rem", lineHeight: 1.0588, fontWeight: 700 },
    h5: { fontSize: "2.4rem", lineHeight: 1, fontWeight: 700 },
    h6: { fontSize: "2.0rem", lineHeight: 1.2, fontWeight: 700 },
    subtitle1: { fontSize: "1.6rem", lineHeight: 1.5, fontWeight: 400 },
    subtitle2: { fontSize: "1.4rem", lineHeight: 1.7143, fontWeight: 400 },
    body1: { fontSize: "1.6rem", lineHeight: 1.5, fontWeight: 400 },
    body2: { fontSize: "1.4rem", lineHeight: 1.43, fontWeight: 400 },
    button: { fontWeight: 500 },
    caption: { fontSize: "1.2rem", lineHeight: 1.33, fontWeight: 400 },
    overline: {
      fontSize: "1.0rem",
      lineHeight: 1.6,
      fontWeight: 400,
      letterSpacing: ".1rem",
    },
  },
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
