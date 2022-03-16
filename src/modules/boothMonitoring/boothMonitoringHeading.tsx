import { Box, Divider, Skeleton, Stack, Typography } from "@mui/material";
import React from "react";
import { GenericErrorAlert } from "src/components/alert";
import { useBoothBills } from "src/swr-cache/useBoothBills";
import { useUserBooths } from "src/swr-cache/useUserBooths";
import { kCustomContainerLight, kErrorContainerLight } from "src/utils/styles";

export const BoothMonitoringHeading = () => (
  <>
    <Typography variant="headline-lg">Monitoring KBU</Typography>
    <BoothsIndicator />
    <Divider />
  </>
);

const BoothsIndicator: React.FC = () => {
  const { booths, loading, error } = useUserBooths();

  if (loading) {
    return (
      <Stack direction="row" spacing={1.5} my={3}>
        <Skeleton variant="rectangular" width={90} height={90} />
        <Skeleton variant="rectangular" width={90} height={90} />
        <Skeleton variant="rectangular" width={90} height={90} />
      </Stack>
    );
  }

  if (error || !booths) {
    return (
      <Stack direction="row" spacing={1.5} my={3}>
        <GenericErrorAlert />
      </Stack>
    );
  }

  return (
    <Stack direction="row" spacing={1.5} my={3}>
      {booths.map((booth) => (
        <IndicatorBox
          key={booth.id}
          id={booth.id}
          boothNumber={booth.boothNumber}
        />
      ))}
    </Stack>
  );
};

interface IndicatorBoxProps {
  id: string;
  boothNumber: number;
}

const IndicatorBox: React.FC<IndicatorBoxProps> = ({ id, boothNumber }) => {
  const { bills } = useBoothBills(id);
  const [indicators, setIndicators] = React.useState<{
    active: boolean;
    pending: boolean;
  }>({ active: false, pending: false });

  React.useEffect(() => {
    if (bills) {
      const hasActiveBill = bills.some((bill) => bill.status === 1);
      const hasPendingBill = bills.some((bill) => bill.status === 2);

      setIndicators({ active: hasActiveBill, pending: hasPendingBill });
    }
  }, [bills]);

  const renderIndicator = () => {
    if (!bills) {
      return (
        <>
          <Skeleton variant="circular" width={22} height={22} />
          <Skeleton variant="circular" width={22} height={22} />
        </>
      );
    }

    return (
      <>
        {!indicators.active && !indicators.pending && (
          <Box width="2.2rem" height="2.2rem" />
        )}
        {indicators.active && (
          <IndicatorIcon
            iconClassName="bx bx-phone"
            backgroundColor={kCustomContainerLight}
          />
        )}
        {indicators.pending && (
          <IndicatorIcon
            iconClassName="bx bx-receipt"
            backgroundColor={kErrorContainerLight}
          />
        )}
      </>
    );
  };

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
        <Typography variant="headline-md">{boothNumber}</Typography>
        <Stack direction="row" justifyContent="center" spacing={0.5}>
          {renderIndicator()}
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
