import { Box, Divider, Stack, Typography } from "@mui/material";
import { kCustomContainerLight, kErrorContainerLight } from "src/utils/styles";

export const BoothMonitoringHeading = () => (
  <>
    <Typography variant="headline-lg">Monitoring KBU</Typography>
    <BoothsIndicator />
    <Divider />
  </>
);

const BoothsIndicator: React.FC = () => {
  return (
    <Stack direction="row" spacing={1.5} my={3}>
      <IndicatorBox />
      <IndicatorBox />
      <IndicatorBox />
    </Stack>
  );
};

const IndicatorBox: React.FC = () => {
  return (
    <Box
      width={90}
      height={90}
      sx={{
        borderRadius: "12px",
        border: "1px solid #73777F",
        cursor: "pointer",
      }}
    >
      <Stack alignItems="center" justifyContent="center" height="100%">
        <Typography variant="headline-md">1</Typography>
        <Stack direction="row" justifyContent="center" spacing={0.5}>
          <IndicatorIcon
            iconClassName="bx bx-phone"
            backgroundColor={kCustomContainerLight}
          />
          <IndicatorIcon
            iconClassName="bx bx-receipt"
            backgroundColor={kErrorContainerLight}
          />
        </Stack>
      </Stack>
    </Box>
  );
};

interface IndicatorIconProps {
  iconClassName: string;
  backgroundColor: string;
}

const IndicatorIcon: React.FC<IndicatorIconProps> = ({
  iconClassName,
  backgroundColor,
}) => {
  return (
    <Box
      sx={{
        bgcolor: backgroundColor,
        borderRadius: "50%",
        width: "2.2rem",
        height: "2.2rem",
        position: "relative",
        i: {
          fontSize: "1.5rem",
          position: "absolute",
          left: "50%",
          top: "50%",
          transform: "translate(-50%, -50%)",
        },
      }}
    >
      <i className={iconClassName} />
    </Box>
  );
};
