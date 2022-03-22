import {
  Box,
  ClickAwayListener,
  Divider,
  Fade,
  Skeleton,
  Slide,
  Stack,
  Theme,
  Typography,
} from "@mui/material";
import React from "react";
import { GenericErrorAlert } from "src/components/alert";
import { useBoothBills } from "src/swr-cache/useBoothBills";
import { useUserBooths } from "src/swr-cache/useUserBooths";
import { kCustomContainerLight, kErrorContainerLight } from "src/utils/styles";
import { useBatchPayment } from "./useBatchPayment";
import { useBoothFocus } from "./useBoothFocus";

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
        {Array.from(Array(5).keys()).map((x, index) => (
          <Skeleton
            key={x}
            sx={{ borderRadius: "12px" }}
            variant="rectangular"
            width={90}
            height={90}
          />
        ))}
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
          boothId={booth.id}
          boothNumber={booth.boothNumber}
        />
      ))}
    </Stack>
  );
};

interface IndicatorBoxProps {
  boothId: string;
  boothNumber: number;
}

const IndicatorBox: React.FC<IndicatorBoxProps> = ({
  boothId,
  boothNumber,
}) => {
  const { bills } = useBoothBills(boothId);
  const [indicators, setIndicators] = React.useState<{
    active: boolean;
    pending: boolean;
  }>({ active: false, pending: false });

  const selectedBoothId = useBoothFocus((state) => state.selectedBoothId);
  const setSelectedBooth = useBoothFocus((state) => state.setSelectedBooth);
  const clearBatch = useBatchPayment((state) => state.clearBatch);

  React.useEffect(() => {
    if (bills) {
      const hasActiveBill = bills.some((bill) => bill.status === 1);
      const hasPendingBill = bills.some((bill) => bill.status === 2);

      setIndicators({ active: hasActiveBill, pending: hasPendingBill });
    }
  }, [bills]);

  const handleClick = () => {
    if (selectedBoothId === "") {
      clearBatch();
    }
    setSelectedBooth(boothId === selectedBoothId ? "" : boothId);
  };

  const handleClickAway = () => {
    if (boothId === selectedBoothId) {
      setSelectedBooth("");
    }
  };

  const renderIndicator = () => {
    if (!bills) {
      return (
        <>
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
    <ClickAwayListener onClickAway={handleClickAway}>
      <Box
        width={90}
        height={90}
        onClick={handleClick}
        sx={{
          borderRadius: "12px",
          borderWidth: boothId === selectedBoothId ? "2px" : "1px",
          borderStyle: "solid",
          borderColor: boothId === selectedBoothId ? "primary.main" : "#73777F",
          cursor: "pointer",
        }}
      >
        <Stack alignItems="center" justifyContent="center" height="100%">
          <Typography variant="headline-md">{boothNumber}</Typography>
          <Stack direction="row" justifyContent="center" spacing={0.5}>
            {selectedBoothId === boothId ? (
              <IndicatorIcon
                backgroundColor="primary.main"
                iconClassName="bx bx-check"
                color="white"
              />
            ) : (
              renderIndicator()
            )}
          </Stack>
        </Stack>
      </Box>
    </ClickAwayListener>
  );
};

interface IndicatorIconProps {
  iconClassName: string;
  backgroundColor: string;
  color?: string;
}

const IndicatorIcon: React.FC<IndicatorIconProps> = ({
  iconClassName,
  backgroundColor,
  color = "black",
}) => {
  return (
    <Box
      sx={{
        bgcolor: backgroundColor,
        borderRadius: "50%",
        color,
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
