import { Chip } from "@mui/material";

interface FilterChipProps {
  label: string;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
  active?: boolean;
}

export const FilterChip: React.FC<FilterChipProps> = ({
  label,
  onClick,
  active = false,
}) => {
  return (
    <Chip
      label={label}
      color={active ? "secondary" : "default"}
      variant={active ? "filled" : "outlined"}
      icon={active ? <i className="bx bx-check bx-md" /> : undefined}
      onClick={onClick}
      sx={{
        borderRadius: "8px",
      }}
    />
  );
};
