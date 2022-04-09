import {
  Avatar,
  ListItemIcon,
  Menu,
  MenuItem,
  Stack,
  Typography,
} from "@mui/material";
import React from "react";
import { useUser } from "src/swr-cache/useUser";
import { getInitials } from "src/utils/helper";
import { RoundedButton } from ".";
import { logout } from "src/repositories/auth";

export interface AvatarButtonProps {
  anchorHorizontal?: "left" | "right";
}

export const AvatarButton: React.FC<AvatarButtonProps> = ({
  anchorHorizontal,
}) => {
  const { user } = useUser();

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
            {user && getInitials(user.name)}
          </Avatar>
        }
        endIcon={<i className="bx bx-chevron-down" />}
      >
        <Typography variant="label-lg">{user && user.name}</Typography>
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
  const { user, mutate } = useUser();
  const handleLogout = async () => {
    try {
      // TODO: Implement logout
      await logout();
      mutate();
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
              {user && getInitials(user.name)}
            </Avatar>
          </ListItemIcon>
          <Stack>
            <Typography variant="overline" color="neutral.disabled">
              {user?.role === 1 ? "Admin" : "Kasir"}
            </Typography>
            <Typography variant="label-lg">{user && user.name}</Typography>
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
