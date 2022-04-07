import LoadingButton, { LoadingButtonProps } from "@mui/lab/LoadingButton";
import { styled } from "@mui/system";

interface Props extends LoadingButtonProps {
  component?: string;
}

export const Button: React.FC<Props> = (props) => (
  <LoadingButton {...props} sx={{ textTransform: "initial", ...props.sx }} />
);

export const RoundedButton = styled(Button)({
  borderRadius: "100px",
  textTransform: "initial",
});

interface ImageButtonProps {
  height: number;
}
