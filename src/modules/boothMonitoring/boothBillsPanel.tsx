import { Box, Skeleton, Stack, Typography } from "@mui/material";
import { GenericErrorAlert } from "src/components/alert";
import { RoundedButton } from "src/components/button";
import { useMonitoringContext } from "src/context/monitoringContext";
import { useBoothBills } from "src/swr-cache/useBoothBills";
import { useUserBooths } from "src/swr-cache/useUserBooths";
import { Bill, Booth, Call } from "src/types/models";
import { calculateCallDuration, numberToRupiahString } from "src/utils/helper";

export const BoothBillPanels: React.FC = () => {
  const { booths, loading, error } = useUserBooths();
  const { selectedBoothId } = useMonitoringContext();

  if (loading) {
    return (
      <Stack direction="row" spacing={1.5}>
        <Skeleton variant="rectangular" width={204} height="30vh" />
        <Skeleton variant="rectangular" width={204} height="30vh" />
        <Skeleton variant="rectangular" width={204} height="30vh" />
        <Skeleton variant="rectangular" width={204} height="30vh" />
      </Stack>
    );
  }

  if (error || !booths) {
    return <GenericErrorAlert />;
  }

  return (
    <Stack direction="row" spacing={1.5} alignItems="flex-start">
      <BoothBox booth={booths[0]} lowEmphasis />
      {booths.map((booth) => (
        <BoothBox
          key={booth.id}
          booth={booth}
          lowEmphasis={selectedBoothId !== "" && booth.id !== selectedBoothId}
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
  const { bills, loading, error } = useBoothBills(booth.id);

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
        <Typography variant="title-md" sx={{ px: 0.5, mt: 1 }}>
          KBU {booth.boothNumber}
        </Typography>
        <Stack mt={1} spacing={1}>
          {[0, 1, 2].map((x, index) => (
            <Skeleton key={index} variant="rectangular" height={50} />
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
          display: lowEmphasis ? "block" : "none",
          backgroundColor: "#FFF",
          opacity: lowEmphasis ? 0.63 : 0,
          borderRadius: "16px",
          zIndex: 1000,
        },
      }}
    >
      <Typography variant="title-md" sx={{ px: 0.5, mt: 1 }}>
        KBU {booth.boothNumber}
      </Typography>
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
    </Box>
  );
};

interface BillBoxProps {
  bill: Bill;
}

const BillBox: React.FC<BillBoxProps> = ({ bill }) => {
  const handleBillPayment = () => {
    console.log("bill paid");
  };

  return (
    <Box
      p={1}
      sx={{
        bgcolor: "#FFF",
        borderRadius: "12px",
      }}
    >
      {/* Label by status */}
      <Typography color="GrayText" display="block" variant="body-sm">
        {bill.status === 1 ? "Aktif" : "Belum dibayar"}
      </Typography>
      {/* Total if any */}
      {bill.total > 0 && (
        <Typography display="block" variant="title-sm">
          {numberToRupiahString(bill.total)}
        </Typography>
      )}
      {/* List of call */}
      <Stack spacing={1} mt={1}>
        {bill.calls.map((call) => (
          <CallBox key={call.id} call={call} />
        ))}
        {bill.status === 2 && (
          <RoundedButton
            onClick={handleBillPayment}
            variant="contained"
            disableElevation
          >
            Bayar
          </RoundedButton>
        )}
      </Stack>
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
