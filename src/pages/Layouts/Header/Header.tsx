import { Dashboard, MoreVert, Notifications, Search, ViewList } from "@mui/icons-material";
import { AppBar, Badge, Fab, IconButton, Input, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { fabPrimary } from "./styles";

interface Props {
  open: boolean;
  toggleDrawer: Function;
}

function Header({ open, toggleDrawer }: Props) {
  return (
    <AppBar
      position="relative"
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
        padding: '12px 24px 48px',
        background: 'transparent',
        boxShadow: 'none',
      }}>
      <section style={{ display: "flex", alignItems: "center" }}>
        <Fab
          size="small"
          aria-label="more"
          onClick={() => toggleDrawer()}
          sx={fabPrimary}
        >

          {open ? <MoreVert /> : <ViewList />}
        </Fab>
        <Typography variant="h6" noWrap>
          CMS
        </Typography>
      </section>
      <section >
        <Input placeholder="Search..." />
        <Fab
          size="small" aria-label="search"
          sx={{ ...fabPrimary, marginRight: '24px' }}
        >
          <Search />
        </Fab>
        <Link to="/">
          <IconButton>
            <Dashboard />
          </IconButton>
        </Link>

        <IconButton>
          <Badge showZero badgeContent={0} color="secondary">
            <Notifications />
          </Badge>
        </IconButton>
        
      </section>
    </AppBar>
  );
}

export default Header;
