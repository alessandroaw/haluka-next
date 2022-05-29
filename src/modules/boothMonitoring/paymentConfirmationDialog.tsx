import {
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import React from "react";
import { Button, RoundedButton } from "src/components/button";
import { payBill } from "src/repositories/bills";
import { boothBillsKey } from "src/swr-cache/useBoothBills";
import { Bill, Call } from "src/types/models";
import { calculateCallDuration, numberToRupiahString } from "src/utils/helper";
import { kErrorLightAlt } from "src/utils/styles";
import { mutate } from "swr";
import { useBatchPayment } from "./useBatchPayment";
interface PaymentConfirmationDialogProps {
  open: boolean;
  onClose: () => void;
  bills: Bill[];
}

export const PaymentConfirmationDialog: React.FunctionComponent<
  PaymentConfirmationDialogProps
> = ({ open, onClose, bills }) => {
  const [loading, setLoading] = React.useState(false);
  const clearBatch = useBatchPayment((state) => state.clearBatch);
  const billsTotal = bills.reduce((acc, bill) => acc + bill.total, 0);

  const handleConfirmation = async () => {
    setLoading(true);
    try {
      const billIds = bills.map((bill) => bill.id);
      await payBill(billIds);
      mutate(boothBillsKey(bills[0].boothId));
      clearBatch();
      onClose();
    } catch (e) {
      console.error(e);
      alert("Terjadi kesalahan saat menyelesaikan pembayaran");
    }
    setLoading(false);
  };

  const handleCancelation = () => {
    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      PaperProps={{
        sx: {
          borderRadius: "16px",
          minWidth: "560px",
          px: 2,
          py: 3,
        },
      }}
    >
      <DialogTitle
        sx={{
          p: 0,
          mb: 3,
        }}
        id="alert-dialog-title"
      >
        <Stack>
          <Typography gutterBottom variant="title-md">
            {bills.length === 1
              ? "Mengonfirmasi pembayaran sesi"
              : `Mengakumulasi pembayaran ${bills.length} sesi`}
          </Typography>
          <Typography color="GrayText" variant="body-sm">
            {bills.length === 1
              ? "Apakah Anda yakin ingin mengonfirmasi pembayaran sesi ini?"
              : `Apakah Anda yakin ingin mengonfirmasi pembayaran ${bills.length} sesi
              ini sekaligus?`}
          </Typography>
        </Stack>
      </DialogTitle>
      <DialogContent
        sx={{
          p: 0,
          mb: 2,
        }}
      >
        <Stack spacing={2}>
          <Grid container columns={3} spacing={1.5}>
            {bills.map((bill) => (
              <BillDetailBox key={bill.id} bill={bill} />
            ))}
          </Grid>
          <Divider
            sx={{
              borderStyle: "dashed",
            }}
          />
          <Stack alignItems="flex-end">
            <Typography variant="body-sm" color="GrayText">
              Total akumulasi biaya sesi
            </Typography>
            <Typography variant="headline-sm">
              {numberToRupiahString(billsTotal)}
            </Typography>
          </Stack>
        </Stack>
      </DialogContent>
      <DialogActions
        sx={{
          p: 0,
          mb: 0.5,
        }}
      >
        <Stack width="100%" direction="row" spacing={1}>
          <RoundedButton
            fullWidth
            variant="outlined"
            disabled={loading}
            onClick={handleCancelation}
          >
            Batal
          </RoundedButton>
          <RoundedButton
            fullWidth
            variant="contained"
            loading={loading}
            color="primary"
            onClick={handleConfirmation}
            autoFocus
          >
            Konfirmasi Pembayaran
          </RoundedButton>
        </Stack>
      </DialogActions>
    </Dialog>
  );
};

interface BillDetailBoxProps {
  bill: Bill;
}

const BillDetailBox: React.FC<BillDetailBoxProps> = ({ bill }) => {
  return (
    <Grid item xs={1}>
      <Box
        borderRadius="12px"
        border="1px solid rgba(27, 27, 27, 0.12)"
        px={1}
        pt={1.5}
        pb={0.5}
      >
        <Typography variant="body-md">
          {numberToRupiahString(bill.total)}
        </Typography>
        <Stack mt={1} spacing={1.5}>
          {bill.calls.map((call) => (
            <CallDetailItem key={call.id} call={call} />
          ))}
        </Stack>
      </Box>
    </Grid>
  );
};

interface CallDetailItemProps {
  call: Call;
}

const CallDetailItem: React.FC<CallDetailItemProps> = ({ call }) => {
  return (
    <Stack direction="row" alignItems="center" spacing={1}>
      <Box
        sx={{
          display: "flex",
          borderRadius: "50%",
          bgcolor: kErrorLightAlt,
          p: "4px",
          i: {
            transform: "rotate(135deg)",
          },
        }}
      >
        <i className="bx bx-phone" />
      </Box>
      <Stack>
        <Typography variant="body-sm">{call.callNumber}</Typography>
        <Typography variant="label-sm" color="GrayText">
          {calculateCallDuration(call.duration ?? 0)}
        </Typography>
      </Stack>
    </Stack>
  );
};
