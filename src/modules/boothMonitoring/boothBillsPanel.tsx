import {
  Box,
  Button,
  Checkbox,
  Skeleton,
  Stack,
  Typography,
} from "@mui/material";
import React from "react";
import { GenericErrorAlert } from "src/components/alert";
import { RoundedButton } from "src/components/button";
import { useBoothBills } from "src/swr-cache/useBoothBills";
import { useUserBooths } from "src/swr-cache/useUserBooths";
import { Bill, Booth, Call } from "src/types/models";
import { calculateCallDuration, numberToRupiahString } from "src/utils/helper";
import { kHalukaContainerPadding } from "src/utils/styles";
import shallow from "zustand/shallow";
import { PaymentConfirmationDialog } from "./paymentConfirmationDialog";
import { isBillInBatch, useBatchPayment } from "./useBatchPayment";
// import { useBoothFocus as useBatchPayment } from "./useBoothFocus";

export const BoothBillPanels: React.FC = () => {
  const { booths, loading, error } = useUserBooths();
  const selectedBoothId = useBatchPayment((state) => state.selectedBoothId);
  const batchBoothId = useBatchPayment((state) => state.batchBoothId);

  if (loading) {
    return (
      <Stack direction="row" mt={3} spacing={1.5} alignItems="flex-start">
        {Array.from(Array(5).keys()).map((x, index) => (
          <Skeleton
            key={index}
            variant="rectangular"
            sx={{ borderRadius: "16px" }}
            width={204}
            height="30vh"
          />
        ))}
      </Stack>
    );
  }

  if (error || !booths) {
    return <GenericErrorAlert />;
  }

  return (
    <Stack
      direction="row"
      spacing={1.5}
      mt={3}
      ml={kHalukaContainerPadding}
      mr={1.5}
      alignItems="flex-start"
      pb={3}
      sx={{
        overflowX: "scroll",
      }}
    >
      {booths.map((booth) => (
        <BoothBox
          key={booth.id}
          booth={booth}
          lowEmphasis={
            (selectedBoothId !== "" && booth.id !== selectedBoothId) ||
            (batchBoothId !== "" && batchBoothId !== booth.id)
          }
        />
      ))}
    </Stack>
  );
};

interface BoothBoxProps {
  booth: Booth;
  lowEmphasis?: boolean;
}

export const BoothBox: React.FC<BoothBoxProps> = ({
  booth,
  lowEmphasis = false,
}) => {
  const [isPaymentDialogOpen, setIsPaymentDialogOpen] = React.useState(false);
  const { bills, loading, error } = useBoothBills(booth.id);
  const { billBatch, batchBoothId } = useBatchPayment(
    (state) => ({
      billBatch: state.billBatch,
      batchBoothId: state.batchBoothId,
    }),
    shallow
  );

  const handleBatchPayment = () => {
    setIsPaymentDialogOpen(true);
  };

  const handleClose = () => {
    setIsPaymentDialogOpen(false);
  };

  if (loading) {
    return (
      <Box
        p={1}
        flexShrink={0}
        sx={{
          width: "204px",
          borderRadius: "16px",
          backgroundColor: (theme) => theme.palette.secondary.light,
        }}
      >
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          sx={{ px: 0.5, mt: 1 }}
        >
          <Typography variant="title-md">KBU {booth.boothNumber}</Typography>
          <Box height="33px" />
        </Stack>
        <Stack mt={1} spacing={1}>
          {[0, 1, 2].map((x, index) => (
            <Skeleton
              key={index}
              variant="rectangular"
              sx={{ borderRadius: "12px" }}
              height={50}
            />
          ))}
        </Stack>
      </Box>
    );
  }

  if (error || !bills) {
    return <GenericErrorAlert />;
  }

  return (
    <Box
      p={1}
      flexShrink={0}
      id={`booth-${booth.boothNumber}`}
      mb={5}
      sx={{
        width: "204px",
        borderRadius: "16px",
        backgroundColor: (theme) => theme.palette.secondary.light,
        position: "relative",
        // Give overlay effect using before
        ":before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          height: lowEmphasis ? "auto" : 0,
          // display: "block",
          display: "block",
          backgroundColor: "#FFF",
          opacity: lowEmphasis ? 0.63 : 0,
          transition: "opacity .3s ease-in-out",
          borderRadius: "16px",
          zIndex: 1000,
        },
      }}
    >
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        sx={{ px: 0.5, mt: 1 }}
      >
        <Typography variant="title-md">KBU {booth.boothNumber}</Typography>

        {/* Weird error persist if using rounded button */}
        <Button
          onClick={handleBatchPayment}
          disableElevation
          size="small"
          variant="contained"
          disabled={batchBoothId !== booth.id}
          sx={{
            opacity: batchBoothId === booth.id ? 1 : 0,
            transition: "opacity .3s ease-in-out",
            borderRadius: "100px",
            textTransform: "initial",
          }}
        >
          Bayar ({billBatch.length})
        </Button>
      </Stack>
      {bills.length === 0 ? (
        <Box mt={1} px={0.5}>
          <Typography variant="body-sm" color="GrayText">
            Tidak terdapat sesi atau panggilan aktif
          </Typography>
        </Box>
      ) : (
        <Stack mt={1} spacing={1}>
          {bills.map((bill: Bill) => (
            <BillBox key={bill.id} bill={bill} />
          ))}
        </Stack>
      )}
      <PaymentConfirmationDialog
        onClose={handleClose}
        bills={billBatch}
        open={isPaymentDialogOpen}
      />
    </Box>
  );
};

interface BillBoxProps {
  bill: Bill;
}

const BillBox: React.FC<BillBoxProps> = ({ bill }) => {
  const [isPaymentDialogOpen, setIsPaymentDialogOpen] = React.useState(false);

  const handleBillPayment = () => {
    setIsPaymentDialogOpen(true);
  };

  const handleClose = () => {
    setIsPaymentDialogOpen(false);
  };

  const { addBillToBatch, removeBillFromBatch, billBatch, batchBoothId } =
    useBatchPayment(
      (state) => ({
        addBillToBatch: state.addBillToBatch,
        removeBillFromBatch: state.removeBillFromBatch,
        billBatch: state.billBatch,
        batchBoothId: state.batchBoothId,
      }),
      shallow
    );

  const [isChecked, setIsChecked] = React.useState(false);

  React.useEffect(() => {
    setIsChecked(isBillInBatch(bill, batchBoothId, billBatch));
  }, [bill, batchBoothId, billBatch]);

  const handleSelection = (event: React.ChangeEvent<HTMLInputElement>) => {
    const checked = event.target.checked;

    if (checked) {
      addBillToBatch(bill);
    } else {
      removeBillFromBatch(bill);
    }
  };

  return (
    <Box
      p={1}
      sx={{
        bgcolor: "#FFF",
        borderRadius: "12px",
        outline: isChecked ? "2px solid" : "unset",
        outlineColor: isChecked
          ? (theme) => theme.palette.primary.main
          : "unset",
      }}
    >
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Box>
          <Typography color="GrayText" display="block" variant="body-sm">
            {bill.status === 1 ? "Aktif" : "Belum dibayar"}
          </Typography>
          {bill.total > 0 && (
            <Typography display="block" variant="title-sm">
              {numberToRupiahString(bill.total)}
            </Typography>
          )}
        </Box>
        {/* Create rounded material ui checkbox */}
        {bill.status === 2 && (
          <Checkbox
            color="primary"
            inputProps={{ "aria-label": "primary checkbox" }}
            checked={isChecked}
            onChange={handleSelection}
            sx={{
              i: {
                fontSize: "2.4rem",
              },
            }}
            icon={<i className="bx bx-circle" />}
            checkedIcon={<i className="bx bxs-check-circle" />}
          />
        )}
      </Stack>
      {/* List of call */}
      <Stack spacing={1} mt={1}>
        {bill.calls.map((call) => (
          <CallBox key={call.id} call={call} />
        ))}
        {bill.status === 2 && (
          <RoundedButton
            onClick={handleBillPayment}
            disabled={billBatch.length > 0}
            variant="contained"
            disableElevation
          >
            Bayar
          </RoundedButton>
        )}
      </Stack>
      <PaymentConfirmationDialog
        onClose={handleClose}
        bills={[bill]}
        open={isPaymentDialogOpen}
      />
    </Box>
  );
};

interface CallBoxProps {
  call: Call;
}

const CallBox: React.FC<CallBoxProps> = ({ call }) => {
  return (
    <Stack
      direction="row"
      spacing={1}
      alignItems="center"
      sx={{
        px: 1.5,
        py: "11px",
        borderRadius: "12px",
        backgroundColor: (theme) =>
          theme.palette[call.status === 1 ? "success" : "error"].light,
        "i.phone-down": {
          transform: "rotate(135deg)",
        },
      }}
    >
      <i
        className={`bx bx-phone bx-md ${call.status === 1 ? "" : "phone-down"}`}
      />
      <Stack>
        <Typography variant="body-sm">{call.callNumber}</Typography>
        {call.status === 2 && (
          <Typography variant="label-sm" color="GrayText">
            {calculateCallDuration(call.duration ?? 0)}
          </Typography>
        )}
      </Stack>
    </Stack>
  );
};
