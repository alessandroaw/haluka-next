import { FormControl, Menu } from "@mui/material";
import React from "react";
import { DateRangeState, HalukaDateRange } from "../dateRange";

interface DateRangeMenuProps {
  open: boolean;
  onClose: () => void;
  anchorEl: null | HTMLElement;
  onFinish: (range: DateRangeState) => void;
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

  const handleClose = () => {
    if (touched && range) {
      onFinish(range);
    }
    onClose();
  };

  return (
    <FormControl>
      <Menu open={open} anchorEl={anchorEl} onClose={handleClose}>
        <HalukaDateRange onChange={handleChange} initialValue={initialValue} />
      </Menu>
    </FormControl>
  );
};
