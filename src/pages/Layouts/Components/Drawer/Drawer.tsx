import React from "react";
import { Box } from "@mui/material";
import { Face, Home } from "@mui/icons-material";
import { DRAWER_WIDTH, SIDEBAR_IMG_PATH } from "../../../../shared/constants";
import { S_transition } from "../../styles";

interface Props {
  open: boolean;
}

function Drawer({ open }: Props) {
  return (
    <Box
      component="menu"
      sx={{
        position: "fixed",
        m: 0,
        p: "22px 15px",
        minWidth: `${DRAWER_WIDTH}px`,
        minHeight: "100vh",
        background: `url(${SIDEBAR_IMG_PATH}) no-repeat center center`,
        boxShadow:
          "0 10px 30px -12px rgba(0, 0, 0, 0.42), 0 4px 25px 0px rgba(0, 0, 0, 0.12), 0 8px 10px -5px rgba(0, 0, 0, 0.2)",
        userSelect: "none",
        zIndex: 9999,
        "&::before": {
          position: "absolute",
          content: '""',
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          background: "rgba(0,0,0,0.8)",
          zIndex: -1,
        },
        // TODO: 
        '&:hover': {
          color: "red",
          transform: 'translateX(0)',
          transition: S_transition('transform'),
        },
      }}
    >
      <div style={{ display: "flex" }}>
        <Home sx={{ mr: "20px", ml: "12px", width: "24px" }}></Home>
        <Box
          sx={[
            {
              display: "flex",
              alignItems: "center",
            },
            open && {
              opacity: 1,
              visibility: "visible",
              transition: "visibility 300ms ease 0ms, opacity 300ms ease 0ms",
            },
            !open && {
              opacity: 0,
              visibility: "hidden",
              transition: "visibility 300ms ease 0ms, opacity 300ms ease 0ms",
            },
          ]}
        >
          <span style={{fontSize: '18px', fontWeight: 400}}>BLOG TITLE</span>
        </Box>
      </div>
    </Box>
  );
}

export default Drawer;
