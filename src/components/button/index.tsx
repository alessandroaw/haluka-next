import LoadingButton, { LoadingButtonProps } from "@mui/lab/LoadingButton";
import { styled } from "@mui/system";

interface Props extends LoadingButtonProps {
  component?: string;
}

export const Button: React.FC<Props> = (props) => (
  <LoadingButton {...props} sx={{ textTransform: "initial", ...props.sx }} />
);

export const RoundedButton: React.FC<Props> = (props) => (
  <Button disableElevation {...props} sx={{ borderRadius: "100px" }} />
);

interface ImageButtonProps {
  height: number;
}
