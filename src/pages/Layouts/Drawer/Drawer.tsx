import { Fragment, useState } from "react";
import { Avatar, Box, Tooltip } from "@mui/material";
import { Face, Home } from "@mui/icons-material";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import * as S from "./styles"
import { NavLink } from "react-router-dom";
import routes from '../../../routes'
import ParentItem from "./ParentItem";
import ChildItem from "./ChildItem";

interface Props {
  open: boolean;
}

function Drawer({ open }: Props) {

  const [selectedFold, setSelectFold] = useState('')

  const selectedFoldHandler = (name: string) => {
    if (selectedFold === name) {
      setSelectFold('')
    } else {
      setSelectFold(name)
    }
  }

  return (
    <Box
      component="menu"
      sx={[S.menu, open && S.menu_expand, !open && S.menu_collapse]}
    >
      <div style={{ display: "flex" }}>
        <Home sx={{ mr: "20px", ml: "12px", width: "24px" }}></Home>
        <S.Detail open={open}>
          <span style={{ fontSize: '18px', fontWeight: 400 }}>BLOG TITLE</span>
        </S.Detail>
      </div>

      <Box sx={{
        display: 'flex',
        alignItems: 'center',
        position: 'relative',
        margin: '24px 0',
        padding: '20px 0',
        '&::before': {
          position: 'absolute',
          content: '""',
          top: '0',
          width: '100%',
          height: '1px',
          backgroundColor: 'rgba(255, 255, 255, .3)',
        },
        '&::after': {
          position: 'absolute',
          content: '""',
          bottom: 0,
          width: '100%',
          height: '1px',
          backgroundColor: 'rgba(255, 255, 255, .3)',
        },
      }}>

        <Avatar alt="user-avatar">
          <Face />
        </Avatar>

        <S.Detail open={open}>
          <span style={{ fontSize: '14px', fontWeight: 300 }}> UserName </span>
          <KeyboardArrowDownIcon
            sx={[
              {
                position: 'absolute',
                right: '20px',
              },
              open ? {
                transform: 'rotate(0deg)',
                transition: 'transform 300ms ease 0ms'
              } : {
                transform: 'rotate(180deg)',
                transition: 'transform 300ms ease 0ms',
              }
            ]} />
        </S.Detail>
      </Box>


      {routes.map((route) => (
        <Fragment key={route.name}>
          {route.routes &&
            !route.routes.some((childRoute) => childRoute.hideInMenu === true)
            ? (
              <ParentItem open={open} route={route} selectedFoldHandler={selectedFoldHandler} />
            )
            : (
              <NavLink
                to={route.path}
                style={({ isActive }) => {
                  return isActive ?  S.LinkActive : {}
                }}
              >
                <ParentItem open={open} route={route} />
              </NavLink>  
            )
          }

          <S.Fold isSelected={selectedFold === route.name} innerFold={route.routes}>
            {route.routes
              && !route.routes.some(childRoute => childRoute.hideInMenu === true)
              && route.routes.map(childRoute => childRoute.isExternalLink
                ? (
                  <a><ChildItem open={open} childRoute={childRoute} /></a>
                )
                : (
                  <NavLink
                    key={childRoute.name}
                    to={childRoute.path}
                    style={({ isActive }) => {
                      return isActive ?  S.LinkActive : {}
                    }}
                  >
                    <ChildItem open={open} childRoute={childRoute} />
                  </NavLink>
                )

              )}

          </S.Fold>
        </Fragment>

      ))}

    </Box>
  );
}

export default Drawer;
