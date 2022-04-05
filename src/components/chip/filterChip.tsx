import { Typography } from "@mui/material";
import { Button } from "src/components/button";

interface FilterChipProps {
  label: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  active?: boolean;
  endIcon?: React.ReactElement;
  badge?: string;
}

export const FilterChip: React.FC<FilterChipProps> = ({
  label,
  badge,
  onClick,
  endIcon,
  active = false,
}) => {
  return (
    <Button
      disableElevation
      size="small"
      color={active ? "secondary" : "inherit"}
      variant={active ? "contained" : "outlined"}
      startIcon={active ? <i className="bx bx-check bx-md" /> : undefined}
      endIcon={endIcon}
      onClick={onClick}
      sx={{
        borderRadius: "8px",
        borderColor: active ? undefined : "rgba(27, 27, 27, 0.12)",
        ".badge": {
          ml: 1,
          width: "23px",
          height: "16px",
          borderRadius: "100px",
          bgcolor: "primary.main",
          display: "flex",
          color: "white",
          justifyContent: "center",
          alignItems: "center",
        },
      }}
    >
      {label}
      {badge && (
        <span className="badge">
          <Typography variant="label-sm">{badge}</Typography>
        </span>
      )}
    </Button>
  );
};
