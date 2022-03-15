import {
  Avatar,
  ListItemIcon,
  Menu,
  MenuItem,
  Stack,
  Typography,
} from "@mui/material";
import React from "react";
import { getInitials } from "src/utils/helper";
import { RoundedButton } from ".";

export interface AvatarButtonProps {
  anchorHorizontal?: "left" | "right";
}

export const AvatarButton: React.FC<AvatarButtonProps> = ({
  anchorHorizontal,
}) => {
  // const { user } = useUser();

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const isMenuOpen = Boolean(anchorEl);
  const handleAccountMenuClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    setAnchorEl(event.currentTarget);
  };

  const handleAccountMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <RoundedButton
        color="inherit"
        aria-controls="basic-menu"
        aria-haspopup="true"
        aria-expanded={isMenuOpen ? "true" : undefined}
        variant="text"
        onClick={handleAccountMenuClick}
        startIcon={
          <Avatar sx={{ backgroundColor: "primary.main" }}>
            {getInitials("Nama User")}
          </Avatar>
        }
        endIcon={<i className="bx bx-chevron-down" />}
      >
        <Typography variant="label-lg">Nama User</Typography>
      </RoundedButton>
      <Menu
        id="basic-menu"
        transformOrigin={{
          horizontal: anchorHorizontal ?? "left",
          vertical: "top",
        }}
        anchorOrigin={{
          horizontal: anchorHorizontal ?? "left",
          vertical: "bottom",
        }}
        anchorEl={anchorEl}
        open={isMenuOpen}
        onClose={handleAccountMenuClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
        sx={{
          "& .MuiPaper-root": {
            borderRadius: "16px",
          },
        }}
      >
        <AccountMenu handleClose={handleAccountMenuClose} />
      </Menu>
    </>
  );
};

export interface AccountMenuProps {
  handleClose: () => void;
}

export const AccountMenu: React.FC<AccountMenuProps> = ({ handleClose }) => {
  // const { user, mutate } = useUser();
  const handleLogout = async () => {
    try {
      // await logout();
      // mutate();
    } catch (e) {
    } finally {
      handleClose();
    }
  };

  return (
    <>
      <MenuItem>
        <Stack direction="row" spacing={2} alignItems="center">
          <ListItemIcon>
            <Avatar
              sx={{
                height: "48px",
                width: "48px",
                backgroundColor: "primary.main",
              }}
            >
              {getInitials("Nama User")}
            </Avatar>
          </ListItemIcon>
          <Stack>
            <Typography variant="overline" color="neutral.disabled">
              Role
            </Typography>
            <Typography variant="label-lg">Nama User</Typography>
            <Typography variant="caption" color="neutral.disabled">
              Email User
            </Typography>
          </Stack>
        </Stack>
      </MenuItem>
      <MenuItem
        sx={{ color: "error.main", "& i": { color: "error.main" } }}
        onClick={handleLogout}
      >
        <ListItemIcon>
          <i className="bx bx-log-out bx-md" />
        </ListItemIcon>
        Keluar
      </MenuItem>
    </>
  );
};
