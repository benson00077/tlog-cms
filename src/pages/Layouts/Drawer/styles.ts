import { Box, styled } from "@mui/material";
import { RouteChildren } from "../../../routes";
import {
  DRAWER_WIDTH,
  FOLDER_DRAWER_WIDTH,
  SIDEBAR_IMG_PATH,
} from "../../../shared/constants";
import { S_transition } from "../styles";


/**
 *  Shared 
 */
const HiddenItem = {
  width: '48px',
  whiteSpace: 'nowrap',
  transform: `translateX(${(DRAWER_WIDTH - FOLDER_DRAWER_WIDTH) / 2}px)`,
  textAlign: 'center',
  transition: 'transform 300ms ease 0ms',
}


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
    color: "red",
    transform: "translateX(0)",
    transition: S_transition("transform"),
    width: 'auto',
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
 *  see https://stackoverflow.com/a/69677803
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
 *  if active that route
 */
export const LinkActive = {
  display: "block",
  borderRadius: "3px",
  background: "#4caf50",
  boxShadow: `0 12px 20px -10px rgba(76, 175, 80, 0.28),
  0 4px 20px 0 rgba(0, 0, 0, 0.12), 0 7px 8px -5px rgba(76, 175, 80,  0.2)`,
  "&:hover": {
    backgroundColor: "rgba(76, 175, 80, 1)",
  },
};

export const FoldActive = {
  width: '48px',
  transform: `translateX(${DRAWER_WIDTH - FOLDER_DRAWER_WIDTH}px)`,
}


/**
 *  Fold
 */
type foldProps = {
  isSelected: boolean;
  innerFold?: RouteChildren[];
}

export const Fold = styled(Box)<foldProps>(({ isSelected, innerFold })=> ({
  heigth: 'auto', 
  overflow: 'hidden',
  transition: 'max-heigth 300ms ease 0ms',
  maxHeight: isSelected 
    ? `${innerFold && 50 * innerFold.length}px` 
    : 0,
}))
