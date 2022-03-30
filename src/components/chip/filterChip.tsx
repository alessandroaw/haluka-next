import { Chip } from "@mui/material";

interface FilterChipProps {
  label: string;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
  active?: boolean;
  endIcon?: React.ReactElement;
}

export const FilterChip: React.FC<FilterChipProps> = ({
  label,
  onClick,
  endIcon,
  active = false,
}) => {
  return (
    <Chip
      label={label}
      color={active ? "secondary" : "default"}
      variant={active ? "filled" : "outlined"}
      icon={active ? <i className="bx bx-check bx-md" /> : undefined}
      deleteIcon={endIcon}
      onDelete={endIcon ? () => {} : undefined}
      onClick={onClick}
      sx={{
        borderRadius: "8px",
      }}
    />
  );
};
