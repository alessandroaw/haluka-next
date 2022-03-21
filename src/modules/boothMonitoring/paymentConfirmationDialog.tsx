import React from "react";
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
import { Button, RoundedButton } from "src/components/button";
import { calculateCallDuration, numberToRupiahString } from "src/utils/helper";
import { Bill, Call } from "src/types/models";
import { mockBillClosed } from "src/playground/mock-data";

export const PaymentConfirmationDialogPlayground: React.FC<any> = (props) => {
  const [open, setOpen] = React.useState(false);
  const [bills, setBills] = React.useState<Bill[]>([
    mockBillClosed,
    mockBillClosed,
  ]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Box>
      <Button variant="outlined" onClick={handleClickOpen}>
        Open alert dialog
      </Button>
      <PaymentConfirmationDialog
        open={open}
        onClose={handleClose}
        bills={bills}
      />
    </Box>
  );
};

interface PaymentConfirmationDialogProps {
  open: boolean;
  onClose: () => void;
  bills: Bill[];
}

export const PaymentConfirmationDialog: React.FunctionComponent<
  PaymentConfirmationDialogProps
> = ({ open, onClose, bills }) => {
  const billsTotal = bills.reduce((acc, bill) => acc + bill.total, 0);

  const handleConfirmation = () => {
    alert("Confirmed");
    onClose();
  };

  const handleCancelation = () => {
    console.log("Rejected");
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
        },
      }}
    >
      <DialogTitle
        sx={{
          px: 2,
          py: 3,
        }}
        id="alert-dialog-title"
      >
        <Stack>
          <Typography gutterBottom variant="title-md">
            Mengakumulasi pembayaran 2 sesi
          </Typography>
          <Typography color="GrayText" variant="body-sm">
            Apakah Anda yakin ingin mengonfirmasi pembayaran 2 sesi ini
            sekaligus?
          </Typography>
        </Stack>
      </DialogTitle>
      <DialogContent
        sx={{
          px: 2,
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
          px: 2,
          pb: "20px",
        }}
      >
        <Stack width="100%" direction="row" spacing={1}>
          <RoundedButton
            fullWidth
            variant="outlined"
            onClick={handleCancelation}
          >
            Batal
          </RoundedButton>
          <RoundedButton
            fullWidth
            disableElevation
            variant="contained"
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
    <Stack direction="row" alignItems="center" justifyContent="space-between">
      <Box
        sx={{
          display: "flex",
          borderRadius: "50%",
          bgcolor: (theme) => theme.palette.error.light,
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
