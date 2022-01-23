import { AppBar, Box, Fab } from "@mui/material";
import React from "react";

interface Props {
  open: boolean;
  toggleDrawer: Function;
}

function Header({ open, toggleDrawer }: Props) {
  return (
    <AppBar position="relative">
      <Box component="section">
        <Fab
          size="small"
          aria-label="more"
          onClick={() => toggleDrawer()}
        ></Fab>
      </Box>
    </AppBar>
  );
}

export default Header;
