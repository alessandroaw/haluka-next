import { PaletteOptions } from "@mui/material";

declare module "@mui/material/styles" {
  interface Palette {
    neutral: Palette["primary"];
    surface2: Palette["primary"];
  }
  interface PaletteOptions {
    neutral: PaletteOptions["primary"];
    surface2: PaletteOptions["primary"];
  }
}

export const palette: PaletteOptions = {
  primary: {
    main: "#1260A4",
  },
  secondary: {
    main: "#D7E3F8",
    light: "#EAF0F8",
  },
  neutral: {
    main: "#5D5E62",
  },
  surface2: {
    main: "#EAF0F8",
  },
  error: {
    main: "#BA1B1B",
    // light: "#FFDAD4",
  },
  success: {
    main: "#09814A",
    // light: "#C0FFD3",
  },
};
