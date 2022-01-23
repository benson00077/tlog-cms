import React, { useState } from "react";
import Drawer from "./Components/Drawer/Drawer";
import Header from "./Components/Drawer/Header/Header";
import Mains from "./Components/Drawer/Mains/Mains";
import Footer from "./Components/Drawer/Footer/Footer";
import { S_transition } from "./styles";
import { Box } from "@mui/material";
import { DRAWER_WIDTH, FOLDER_DRAWER_WIDTH } from "../../shared/constants";

function Layouts() {
  const [open, setOpen] = useState(true);

  function toggleDrawer() {
    setOpen(!open);
  }

  return (
    <Box sx={{ display: "flex", overflowX: "hidden" }}>
      <Drawer open={open} />
      <Box
        component="section"
        sx={{
          ml: `${open ? DRAWER_WIDTH : FOLDER_DRAWER_WIDTH}px`,
          transition: S_transition("margin-left"),
          display: "flex",
          flexDirection: "column",
          minWidth: `calc(100% - ${DRAWER_WIDTH}px)`,
          width: `calc(100% - ${FOLDER_DRAWER_WIDTH}px)`,
          minHeight: "100vh",
        }}
      >
        <Header open={open} toggleDrawer={toggleDrawer} />
        <Mains />
        <Footer />
      </Box>
    </Box>
  );
}

export default Layouts;
