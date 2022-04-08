import { FormControl, Menu, Stack } from "@mui/material";
import React from "react";
import { RoundedButton } from "../button";
import { DateRangeState, HalukaDateRange } from "../dateRange";

interface DateRangeMenuProps {
  open: boolean;
  onClose: () => void;
  anchorEl: null | HTMLElement;
  onFinish: (range: DateRangeState | undefined) => void;
  initialValue?: DateRangeState;
}

export const DateRangeMenu: React.FC<DateRangeMenuProps> = ({
  open,
  anchorEl,
  onClose,
  onFinish,
  initialValue,
}) => {
  const [touched, setTouched] = React.useState(false);
  const [range, setRange] = React.useState<DateRangeState | undefined>(
    initialValue
  );

  const handleChange = (newRange: DateRangeState) => {
    setTouched(true);
    setRange(newRange);
  };

  const handleFinish = () => {
    if (touched && range) {
      onFinish(range);
    }
    onClose();
  };

  const handleReset = () => {
    onFinish(undefined);
    onClose();
  };

  return (
    <FormControl>
      <Menu
        open={open}
        anchorEl={anchorEl}
        onClose={onClose}
        PaperProps={{
          sx: {
            borderRadius: "16px",
            boxSizing: "border-box",
            display: "flex",
            "& .MuiList-root.MuiMenu-list": {
              // flex: 1,
              py: 0,
            },
          },
        }}
      >
        <HalukaDateRange onChange={handleChange} initialValue={initialValue} />
        <Stack
          direction="row"
          justifyContent="flex-end"
          px={1}
          py={1.5}
          mt={0.5}
          sx={{
            background: "#FAFAFA",
          }}
        >
          <RoundedButton variant="text" onClick={handleReset}>
            Reset
          </RoundedButton>
          <RoundedButton
            variant="contained"
            disableElevation
            onClick={handleFinish}
          >
            Lihat hasil
          </RoundedButton>
        </Stack>
      </Menu>
    </FormControl>
  );
};
