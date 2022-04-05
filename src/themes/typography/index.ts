import { TypographyOptions } from "@mui/material/styles/createTypography";

declare module "@mui/material/styles" {
  interface TypographyVariants {
    "display-lg": React.CSSProperties;
    "display-md": React.CSSProperties;
    "display-sm": React.CSSProperties;

    "headline-lg": React.CSSProperties;
    "headline-md": React.CSSProperties;
    "headline-sm": React.CSSProperties;

    "title-lg": React.CSSProperties;
    "title-md": React.CSSProperties;
    "title-sm": React.CSSProperties;

    "label-lg": React.CSSProperties;
    "label-md": React.CSSProperties;
    "label-sm": React.CSSProperties;

    "body-lg": React.CSSProperties;
    "body-md": React.CSSProperties;
    "body-sm": React.CSSProperties;
  }

  // allow configuration using `createTheme`
  interface TypographyVariantsOptions {
    "display-lg"?: React.CSSProperties;
    "display-md"?: React.CSSProperties;
    "display-sm"?: React.CSSProperties;

    "headline-lg"?: React.CSSProperties;
    "headline-md"?: React.CSSProperties;
    "headline-sm"?: React.CSSProperties;

    "title-lg"?: React.CSSProperties;
    "title-md"?: React.CSSProperties;
    "title-sm"?: React.CSSProperties;

    "label-lg"?: React.CSSProperties;
    "label-md"?: React.CSSProperties;
    "label-sm"?: React.CSSProperties;

    "body-lg"?: React.CSSProperties;
    "body-md"?: React.CSSProperties;
    "body-sm"?: React.CSSProperties;
  }
}

// Update the Typography's variant prop options
declare module "@mui/material/Typography" {
  interface TypographyPropsVariantOverrides {
    "display-lg": true;
    "display-md": true;
    "display-sm": true;

    "headline-lg": true;
    "headline-md": true;
    "headline-sm": true;

    "title-lg": true;
    "title-md": true;
    "title-sm": true;

    "label-lg": true;
    "label-md": true;
    "label-sm": true;

    "body-lg": true;
    "body-md": true;
    "body-sm": true;

    // Disable default
    h1: false;
    h2: false;
    h3: false;
    h4: false;
    h5: false;
    h6: false;
    body1: false;
    body2: false;
    subtitle1: false;
    subtitle2: false;
  }
}

export const typography: TypographyOptions = {
  htmlFontSize: 10,
  fontFamily: ['"Inter"', '"sans-serif"'].join(","),
  "display-lg": {
    fontSize: "5.7rem",
    lineHeight: "6.4rem",
    fontWeight: 400,
    letterSpacing: "-0.025rem",
  },
  "display-md": { fontSize: "4.5rem", lineHeight: "5.2rem", fontWeight: 400 },
  "display-sm": { fontSize: "3.6rem", lineHeight: "4.4rem", fontWeight: 400 },

  "headline-lg": { fontSize: "3.2rem", lineHeight: "4rem", fontWeight: 400 },
  "headline-md": { fontSize: "2.8rem", lineHeight: "3.6rem", fontWeight: 400 },
  "headline-sm": { fontSize: "2.4rem", lineHeight: "3.2rem", fontWeight: 400 },

  "title-lg": { fontSize: "2.2rem", lineHeight: "2.8rem", fontWeight: 400 },
  "title-md": {
    fontSize: "1.6rem",
    lineHeight: "2.4rem",
    fontWeight: 500,
    letterSpacing: "0.01rem",
  },
  "title-sm": {
    fontSize: "1.4rem",
    lineHeight: "2rem",
    fontWeight: 500,
    letterSpacing: "0.01rem",
  },

  "label-lg": {
    fontSize: "1.4rem",
    lineHeight: "2rem",
    fontWeight: 500,
    letterSpacing: "0.01rem",
  },
  "label-md": {
    fontSize: "1.2rem",
    lineHeight: "1.6rem",
    fontWeight: 500,
    letterSpacing: "0.05rem",
  },
  "label-sm": {
    fontSize: "1.1rem",
    lineHeight: "1.6rem",
    fontWeight: 500,
    letterSpacing: "0.05rem",
  },

  "body-lg": {
    fontSize: "1.6rem",
    lineHeight: "2.4rem",
    fontWeight: 400,
    letterSpacing: "0.05rem",
  },
  "body-md": {
    fontSize: "1.4rem",
    lineHeight: "2rem",
    fontWeight: 400,
    letterSpacing: "0.025rem",
  },
  "body-sm": {
    fontSize: "1.2rem",
    lineHeight: "1.6rem",
    fontWeight: 400,
    letterSpacing: "0.04rem",
  },
};
