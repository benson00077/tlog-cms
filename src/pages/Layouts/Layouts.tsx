import { useState } from "react";
import Drawer from "./Drawer/Drawer";
import Header from ".//Header/Header";
import Mains from ".//Mains/Mains";
import Footer from ".//Footer/Footer";
import { S_transition } from "./styles";
import { Box } from "@mui/material";
import { DRAWER_WIDTH, FOLDER_DRAWER_WIDTH } from "../../shared/constants";
import { Outlet } from "react-router-dom";

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
        <main style={{ display: 'flex', flex: 1, padding: '0 24px 24px', }}>
          <Outlet />
        </main>
        <Footer />
      </Box>
    </Box>
  );
}

export default Layouts;
