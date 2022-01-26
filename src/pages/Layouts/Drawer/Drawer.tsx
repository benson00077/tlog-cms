import { Fragment, useState } from "react";
import { Avatar, Box } from "@mui/material";
import { ArrowRightRounded, Face, Home } from "@mui/icons-material";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import * as S from "./styles";
import { classes } from "./styles";
import { NavLink } from "react-router-dom";
import routes from '../../../routes'
import ParentItem from "./ParentItem";
import ChildItem from "./ChildItem";

import "./style.scss";

interface Props {
  open: boolean;
}

/**
 * TODO: use SCSS..... would be easier~
 */
function Drawer({ open }: Props) {


  const [selectedFold, setSelectFold] = useState('')
  const [hoverOver, setHoverover] = useState(false)

  const selectedFoldHandler = (name: string) => {
    if (selectedFold === name) {
      setSelectFold('')
    } else {
      setSelectFold(name)
    }
  }

  const isCollaspe = (open: boolean, hoverOver: boolean) => {
    if (open) {
      return false
    } else {
      return !hoverOver
    }
  }


  return (
    <menu
      className={`menu ${open ? "expand" : "collaspe"}`}
      onMouseEnter={() => setHoverover(true)}
      onMouseLeave={() => setHoverover(false)}>
      <div
        style={{ display: 'flex' }}
        className={isCollaspe(open, hoverOver) ? "iconCollaspe" : "iconExtend"}>
        <Home sx={{ mr: "20px", ml: "12px", width: "24px" }} />
        <div className={isCollaspe(open, hoverOver) ? "captionCollaspe" : "captionExtend"}>
          <span>BLOG TITLE</span>
        </div>
      </div>

      <div
        className={`drawerUser ${isCollaspe(open, hoverOver) ? "iconCollaspe" : "iconExtend"}`}>
        <Avatar sx={{ width: '34px', height: '34px', ml: '8px', mr: '12px' }} alt="user-avatar">
          <Face />
        </Avatar>
        <div className={isCollaspe(open, hoverOver) ? "captionCollaspe" : "captionExtend"}>
          <span style={{ fontSize: '14px', fontWeight: 300 }}> UserName </span>
          <KeyboardArrowDownIcon
            sx={{
              position: 'absolute',
              right: '20px',
              transform: open ? 'rotate(0deg)' : 'rotate(180deg)',
              transition: open ? 'transform 300ms ease 0ms' : 'transform 300ms ease 0ms'
            }} />
        </div>
      </div>

      {routes.map((route) => (
        <Fragment key={route.name}>
          {route.routes &&
            !route.routes.some((childRoute) => childRoute.hideInMenu === true)
            ? (
              <a
                className={`formatAnchorTag ${isCollaspe(open, hoverOver) ? "linkCollaspe" : "linkExtend"}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <ParentItem
                  open={open}
                  route={route}
                  isCollaspe={() => isCollaspe(open, hoverOver)}
                  selectedFoldHandler={selectedFoldHandler} />
              </a>
            )
            : (
              <NavLink
                to={route.path}
                className={({ isActive }) => {
                  let className = `formatAnchorTag ${isCollaspe(open, hoverOver) ? "linkCollaspe" : "linkExtend"}`
                  if (isActive) {
                    // className += ` linkActive ${isCollaspe(open, hoverOver) ? "linkCollaspe" : "linkExtend"}`
                    // className += ` ${isCollaspe(open, hoverOver) ? "linkActiveCollaspe" : ""}`
                    className += ` linkActive `
                  }
                  return className
                }}
              >
                <ParentItem
                  open={open}
                  route={route}
                  isCollaspe={() => isCollaspe(open, hoverOver)}
                />
              </NavLink>
            )
          }


          <div
            className={`childrenGroup ${selectedFold === route.name ? "undfoldChildren" : ''}`}
            style={{
              maxHeight: `${selectedFold === route.name
                ? route.routes && 50 * route.routes.length
                : 0
                }px`,
            }}
          >
            {route.routes &&
              !route.routes.some(
                (childRoute) => childRoute.hideInMenu === true,
              ) &&
              route.routes.map((childRoute) =>
                childRoute.isExternalLink ? (
                  <a
                    className={`formatAnchorTag ${isCollaspe(open, hoverOver) ? "linkCollaspe" : "linkExtend"}`}
                    href={childRoute.path}
                    key={childRoute.name}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <ChildItem open={open} childRoute={childRoute} isCollaspe={() => isCollaspe(open, hoverOver)} />
                  </a>
                ) : (
                  <NavLink
                    key={childRoute.name}
                    to={childRoute.path}
                    className={({ isActive }) => {
                      // let className = "formatAnchorTag"
                      let className = `formatAnchorTag ${isCollaspe(open, hoverOver) ? "linkCollaspe" : "linkExtend"}`
                      if (isActive) {
                        // className += ` linkActive ${isCollaspe(open, hoverOver) ? "linkCollaspe" : "linkExtend"}`
                        className += ` linkActive `
                      }
                      return className
                    }}
                  >
                    <ChildItem open={open} childRoute={childRoute} isCollaspe={() => isCollaspe(open, hoverOver)} />
                  </NavLink>
                ),
              )}
          </div>
        </Fragment>
      ))}
    </menu>
  );
}

export default Drawer;
