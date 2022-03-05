import { Box } from "@mui/material";
import Image from "next/image";
import LoadingButton, { LoadingButtonProps } from "@mui/lab/LoadingButton";
import logoImg from "public/images/png/logo.png";
import { styled } from "@mui/system";
import { kBorderRadius } from "src/utils/constant";

interface Props extends LoadingButtonProps {
  component?: string;
}

export const Button: React.FC<Props> = (props) => (
  <LoadingButton {...props} sx={{ textTransform: "initial", ...props.sx }} />
);

export const RoundedButton = styled(Button)({
  borderRadius: kBorderRadius,
  textTransform: "initial",
});

interface ImageButtonProps {
  height: number;
}
