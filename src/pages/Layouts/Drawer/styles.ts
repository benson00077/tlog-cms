import { Box, styled } from "@mui/material";
import { RouteChildren } from "../../../routes";
import {
  DRAWER_WIDTH,
  FOLDER_DRAWER_WIDTH,
  SIDEBAR_IMG_PATH,
} from "../../../shared/constants";
import { S_transition } from "../styles";

/**
 *  change child style when hover on parent menu
 */
const PREFIX = "menu";
export const classes = {
  root: `${PREFIX}-root`,
  linkActive: `${PREFIX}-linkActive`,
  foldActive: `${PREFIX}-foldActive`,
  hidenItem: `${PREFIX}-hidenItem`,
  displayItem: `${PREFIX}-displayItem`,
  hideDetail: `${PREFIX}-hideDetail`,
  formatAnchorTag: `${PREFIX}-formatAnchorTag`,
};

/**
 *  see docs https://mui.com/zh/guides/migration-v4/#migrate-from-jss
 */
type RootMenuProps = {
  open: boolean;
};

export const RootMenu = styled("menu")<RootMenuProps>(({ open }) => ({
  [`&.${classes.root}`]: {
    position: "fixed",
    margin: 0,
    padding: "22px 15px",
    minWidth: `${DRAWER_WIDTH}px`,
    minHeight: "100vh",
    color: "#ffffff",
    background: `url(${SIDEBAR_IMG_PATH}) no-repeat center center`,
    boxShadow:
      "0 10px 30px -12px rgba(0, 0, 0, 0.42), 0 4px 25px 0px rgba(0, 0, 0, 0.12), 0 8px 10px -5px rgba(0, 0, 0, 0.2)",
    userSelect: "none",
    zIndex: 9999,
    transform: open
      ? "translateX(0)"
      : `translateX(-${DRAWER_WIDTH - FOLDER_DRAWER_WIDTH}px)`,
    transition: S_transition("transform"),
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
    "&:hover": {
      transform: "translateX(0)",
      transition: S_transition("transform"),
    },

    [`&:hover .${classes.foldActive}`]: {
      width: "auto",
      transform: `translateX(0)`,
    },

    [`&:hover .${classes.hidenItem}`]: {
      width: "auto",
      transform: "translateX(0)",
    },

    [`&:hover .${classes.hideDetail}`]: {
      opacity: 1,
      visibility: "visible",
    },
  },

  [`& .${classes.linkActive}`]: {
    display: "block",
    borderRadius: "3px",
    background: "#4caf50",
    boxShadow: `0 12px 20px -10px rgba(76, 175, 80, 0.28),
    0 4px 20px 0 rgba(0, 0, 0, 0.12), 0 7px 8px -5px rgba(76, 175, 80,  0.2)`,
    "&:hover": {
      backgroundColor: "rgba(76, 175, 80, 1)",
    },
  },

  [`& .${classes.foldActive}`]: {
    width: "48px",
    transform: `translateX(${DRAWER_WIDTH - FOLDER_DRAWER_WIDTH}px)`,

    [`& .${classes.hidenItem}`]: {
      transform: 'translateX(0)'
    },
  },

  [`& .${classes.hidenItem}`]: {
    width: "48px",
    whiteSpace: "nowrap",
    transform: `translateX(${(DRAWER_WIDTH - FOLDER_DRAWER_WIDTH) / 2}px)`,
    textAlign: "center",
    transition: "transform 300ms ease 0ms",
  },

  [`& .${classes.displayItem}`]: {
    transform: `translateX(${DRAWER_WIDTH - FOLDER_DRAWER_WIDTH}px)`,
  },

  [`& .${classes.hideDetail}`]: {
    opacity: 1,
    visibility: "visible",
  },

  [`& .${classes.formatAnchorTag}`]: {
    color: "#ffffff",
    textDecoration: "none",

    "&:hover": {
      textDecoration: "none",
    },
  },
}));

/**
 *  sx type set as const
 *  see docs https://mui.com/zh/system/the-sx-prop/#typescript-usage
 */

export const menu = {
  position: "fixed",
  m: 0,
  p: "22px 15px",
  minWidth: `${DRAWER_WIDTH}px`,
  minHeight: "100vh",
  color: "#ffffff",
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
  "&:hover": {
    transform: "translateX(0)",
    transition: S_transition("transform"),
  },
} as const;

export const menu_expand = {
  transform: "translateX(0)",
  transition: S_transition("transform"),
} as const;

export const menu_collapse = {
  transform: `translateX(-${DRAWER_WIDTH - FOLDER_DRAWER_WIDTH}px)`,
  transition: S_transition("transform"),
} as const;

/**
 *  for title beside Home Icon and user name besdie Avatar Icon
 */
export const hiddenItem = {
  width: "48px",
  whiteSpace: "nowrap",
  transform: `translateX(${(DRAWER_WIDTH - FOLDER_DRAWER_WIDTH) / 2}px)`,
  textAlign: "center",
  transition: "transform 300ms ease 0ms",
};

export const displayItem = {
  transform: `translateX(${DRAWER_WIDTH - FOLDER_DRAWER_WIDTH}px)`,
};

/**
 * Detail for Home and Avatar Icon
 * see https://stackoverflow.com/a/69677803
 */
type detailProps = {
  open: boolean;
};

export const Detail = styled(Box)<detailProps>(({ open }) => ({
  display: "flex",
  alignItems: "center",
  opacity: open ? 1 : 0,
  transition: "opacity 300ms ease 0ms",
}));

/**
 *  if link active that route
 */
export const LinkActive = {
  display: "block",
  borderRadius: "3px",
  background: "#4caf50",
  boxShadow: `0 12px 20px -10px rgba(76, 175, 80, 0.28),
  0 4px 20px 0 rgba(0, 0, 0, 0.12), 0 7px 8px -5px rgba(76, 175, 80,  0.2)`,
  hover: {
    backgroundColor: "rgba(76, 175, 80, 1)",
  },
};

export const formatAnchorTag = {
  color: "#ffffff",
  textDecoration: "none",

  "&:hover": {
    textDecoration: "none",
  },
};

/**
 * TODO
 * should chnage name : not related to Fold / unfold , relaed to show when drawer not open
 */
export const FoldActive = {
  width: "48px",
  transform: `translateX(${DRAWER_WIDTH - FOLDER_DRAWER_WIDTH}px)`,
};

/**
 *  show / unshow ChildItem when click parentItem
 */
type childrenGroupProps = {
  isSelected: boolean;
  innerFold?: RouteChildren[];
};

export const childrenGroup = styled(Box)<childrenGroupProps>(
  ({ isSelected, innerFold }) => ({
    heigth: "auto",
    overflow: "hidden",
    transition: "max-heigth 300ms ease 0ms",
    maxHeight: isSelected ? `${innerFold && 50 * innerFold.length}px` : 0,
  })
);
