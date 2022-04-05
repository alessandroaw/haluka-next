import { id } from "date-fns/locale";
import React from "react";
import { DateRange, RangeKeyDict } from "react-date-range";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import themes from "src/themes";

interface HalukaDateRangeProps {
  onChange: (newDateRange: DateRangeState) => void;
  initialValue?: DateRangeState;
}

export interface DateRangeState {
  startDate?: Date;
  endDate?: Date;
}

export const HalukaDateRange: React.FC<HalukaDateRangeProps> = ({
  onChange,
  initialValue,
}) => {
  const [ranges, setRanges] = React.useState<RangeKeyDict>({
    selection: {
      startDate: initialValue?.startDate ?? new Date(),
      endDate: initialValue?.endDate ?? new Date(),
      key: "selection",
    },
  });

  const handleChange = (range: RangeKeyDict) => {
    setRanges(range);
    const { startDate, endDate } = range.selection;
    onChange({ startDate, endDate });
  };

  return (
    // Date range picker without defined ranges
    <DateRange
      locale={id}
      ranges={[ranges.selection]}
      // moveRangeOnFirstSelection={false}
      rangeColors={[themes.palette.primary.main]}
      onChange={handleChange}
    />
  );
};
