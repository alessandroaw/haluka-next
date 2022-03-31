import {
  Box,
  Checkbox,
  CircularProgress,
  FormControl,
  FormControlLabel,
  Menu,
  MenuItem,
  Skeleton,
  Stack,
} from "@mui/material";
import React from "react";
import { RoundedButton } from "src/components/button";
import { GenericErrorAlert } from "../alert";

interface FilterMenuProps<T> {
  open: boolean;
  initialSelectedIndices?: number[];
  anchorEl: null | HTMLElement;
  list: T[];
  error?: boolean;
  loading?: boolean;
  onClose: () => void;
  onFinish: (indices: number[]) => void;
  onReset: (indices: number[]) => void;
}

export const FilterMenu = <T extends {}>({
  open,
  initialSelectedIndices,
  anchorEl,
  list,
  error = false,
  loading = false,
  onClose,
  onFinish,
  onReset,
}: FilterMenuProps<T>) => {
  const [indices, setIndices] = React.useState<number[]>(
    initialSelectedIndices ?? []
  );

  const setValues = (index: number) => {
    if (indices.includes(index)) {
      setIndices(indices.filter((v) => v !== index));
    } else {
      setIndices([...indices, index]);
    }
  };

  React.useEffect(() => {
    setIndices(initialSelectedIndices ?? []);
  }, [initialSelectedIndices]);

  return (
    <FormControl>
      <Menu
        open={open}
        anchorEl={anchorEl}
        onClose={onClose}
        PaperProps={{
          sx: {
            borderRadius: "16px",
            minWidth: "200px",
            maxHeight: "360px",
            boxSizing: "border-box",
            display: "flex",
            "& .MuiList-root.MuiMenu-list": {
              flex: 1,
              padding: "8px 0 0",
            },
          },
        }}
      >
        <Stack sx={{ display: "flex", height: "100%" }}>
          <Box
            sx={{
              flex: 1,
              height: "100%",
              overflow: "overlay",
              "&::-webkit-scrollbar": {
                width: "4px",
                borderRadius: "10px",
                margin: "5px 4px",
              },
              "&::-webkit-scrollbar-track": {
                borderRadius: "10px",
                background: "transparent",
              },
              "&::-webkit-scrollbar-thumb": {
                background: "#00000061",
                borderRadius: "10px",
                margin: "0 4px",
              },
            }}
          >
            {loading && (
              <Stack
                width="100%"
                height="50px"
                px={1}
                mb={1}
                overflow="hidden"
                justifyContent="center"
                alignItems="center"
              >
                <CircularProgress />
              </Stack>
            )}
            {error && (
              <Stack
                width="100%"
                height="50px"
                px={1}
                mb={1}
                overflow="hidden"
                justifyContent="center"
                alignItems="center"
              >
                <GenericErrorAlert />
              </Stack>
            )}
            {!loading &&
              list.map((item, index) => (
                <MenuItem
                  key={index}
                  onClick={(e) => {
                    e.stopPropagation();
                    e.preventDefault();
                    setValues(index);
                  }}
                >
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={indices.includes(index)}
                        onClick={(e) => {
                          setValues(index);
                        }}
                      />
                    }
                    label={`${item}`}
                    value={index}
                  />
                </MenuItem>
              ))}
          </Box>
          {!error && (
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
              <RoundedButton
                variant="text"
                disabled={loading}
                onClick={() => {
                  onReset(indices);
                  setIndices([]);
                  onClose();
                }}
              >
                Reset
              </RoundedButton>
              <RoundedButton
                variant="contained"
                disabled={loading}
                disableElevation
                onClick={() => {
                  onFinish(indices);
                  onClose();
                }}
              >
                Lihat hasil
              </RoundedButton>
            </Stack>
          )}
        </Stack>
      </Menu>
    </FormControl>
  );
};
