import { keyframes } from "@mui/material/styles";

// CSS Constants
export const kCustomContainerLight = "#92F8B5";
export const kErrorContainerLight = "#FFDAD4";
export const kBoxShadow = "0px 3px 6px 0px rgb(0 0 0 / 10%)";
export const kGridSpacingDefault = 2;
export const kBorderColor = "#F1F4FA";
export const kHalukaContainerPadding = 6;
export const kErrorLightAlt = "#FFDAD4";
export const kSuccessLightAlt = "#C0FFD3";

// CSS Keyframes
export const lowEmphasisIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 0.63;
  }
`;

export const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;
