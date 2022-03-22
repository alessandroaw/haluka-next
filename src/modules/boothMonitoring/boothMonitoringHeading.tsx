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
import {
  kBorderColor,
  kCustomContainerLight,
  kErrorContainerLight,
} from "src/utils/styles";
import { useBatchPayment } from "./useBatchPayment";
// import { useBoothFocus as useBatchPayment } from "./useBoothFocus";

export const BoothMonitoringHeading = () => (
  <>
    <Typography variant="headline-lg">Monitoring KBU</Typography>
    <BoothsIndicator />
    <Divider sx={{ borderWidth: "1px", borderColor: kBorderColor }} />
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

  const selectedBoothId = useBatchPayment((state) => state.selectedBoothId);
  const setSelectedBooth = useBatchPayment((state) => state.setSelectedBooth);
  const clearBatch = useBatchPayment((state) => state.clearBatch);

  React.useEffect(() => {
    if (bills) {
      const hasActiveBill = bills.some((bill) => bill.status === 1);
      const hasPendingBill = bills.some((bill) => bill.status === 2);

      setIndicators({ active: hasActiveBill, pending: hasPendingBill });
    }
  }, [bills]);

  const handleClick = () => {
    setSelectedBooth(boothId === selectedBoothId ? "" : boothId);
    clearBatch();
  };

  const handleClickAway = () => {
    if (boothId === selectedBoothId) {
      // setSelectedBooth("");
    }
  };

  const renderIndicator = () => {
    if (!bills) {
      return <Skeleton variant="circular" width={22} height={22} />;
    }

    const selected = selectedBoothId === boothId;

    return (
      <>
        {/* {!selected && !indicators.active && !indicators.pending && (
          <Box width="2.2rem" height="2.2rem" />
        )} */}
        <IndicatorIcon
          iconClassName="bx bx-phone"
          backgroundColor={kCustomContainerLight}
          showCondition={!selected && indicators.active}
          fromRight
        />
        <IndicatorIcon
          iconClassName="bx bx-receipt"
          backgroundColor={kErrorContainerLight}
          showCondition={!selected && indicators.pending}
          fromRight
        />
      </>
    );
  };

  const selected = selectedBoothId === boothId;
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
          <Stack
            direction="row"
            justifyContent="center"
            spacing={
              (selected ||
                (!selected && indicators.pending) ||
                (!selected && indicators.active)) &&
              !(!selected && indicators.active && indicators.pending)
                ? 0
                : 0.5
            }
          >
            <IndicatorIcon
              backgroundColor="primary.main"
              iconClassName="bx bx-check"
              color="white"
              showCondition={selected}
            />
            {renderIndicator()}
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
  showCondition?: boolean;
  fromRight?: boolean;
}

const IndicatorIcon: React.FC<IndicatorIconProps> = ({
  iconClassName,
  backgroundColor,
  color = "black",
  showCondition = true,
  fromRight = false,
}) => {
  return (
    <Box
      sx={{
        bgcolor: backgroundColor,
        borderRadius: "50%",
        color,
        width: showCondition ? "2.2rem" : "0",
        height: "2.2rem",
        opacity: showCondition ? 1 : 0,
        transform: showCondition
          ? "unset"
          : `translateX(${fromRight ? "" : "-"}100%)`,
        position: "relative",
        visibiliity: showCondition ? "visible" : "hidden",
        transition:
          "visibility 0.3s ease-in-out, opacity 0.3s ease-in-out, transform 0.3s ease-in-out",
        i: {
          visibility: showCondition ? "visible" : "hidden",
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
