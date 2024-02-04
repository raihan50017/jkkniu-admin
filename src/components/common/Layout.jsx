import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import { Card, Grid, Stack } from "@mui/material";
const pages = ["Products", "Pricing", "Blog"];
const settings = ["Profile", "Account", "Dashboard", "Logout"];
import { forwardRef } from "react";
import { Link } from "react-router-dom";
import { useMemo } from "react";
import { useLocation } from "react-router-dom";
import { HomeOutlined } from "@mui/icons-material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import SettingsIcon from "@mui/icons-material/Settings";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import SchoolIcon from "@mui/icons-material/School";

export default function Layout({ children }) {
  const RouterLink = forwardRef(({ href, ...other }, ref) => (
    <Link ref={ref} to={href} {...other} />
  ));

  function usePathname() {
    const { pathname } = useLocation();

    return useMemo(() => pathname, [pathname]);
  }

  const pathname = usePathname();

  const active = true;

  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const [state, setState] = React.useState(false);

  const toggleDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState(open);
  };

  const sideMenu = () => (
    <Box
      sx={{ width: 1, height: 1 }}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List>
        {["Inbox", "Starred", "Send email", "Drafts"].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {["All mail", "Trash", "Spam"].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  const list = () => (
    <Box
      sx={{ width: 250 }}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List>
        {["Inbox", "Starred", "Send email", "Drafts"].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {["All mail", "Trash", "Spam"].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <>
      <AppBar
        sx={{ boxShadow: 0, backgroundColor: "#008080" }}
        position="sticky"
      >
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="#app-bar-with-responsive-menu"
              sx={{
                mr: 2,
                display: { xs: "none", md: "flex" },
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              <img style={{ width: "50px" }} src="logo.png"></img>
            </Typography>

            <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={toggleDrawer(true)}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: "block", md: "none" },
                }}
              >
                {pages.map((page) => (
                  <MenuItem key={page} onClick={handleCloseNavMenu}>
                    <Typography textAlign="center">{page}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
            <Typography
              variant="h5"
              noWrap
              component="a"
              href="#app-bar-with-responsive-menu"
              sx={{
                mr: 2,
                display: { xs: "flex", md: "none" },
                flexGrow: 1,
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              <img style={{ width: "50px" }} src="logo.png"></img>
            </Typography>
            <Box
              sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}
            ></Box>

            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {settings.map((setting) => (
                  <MenuItem key={setting} onClick={handleCloseUserMenu}>
                    <Typography textAlign="center">{setting}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      <Drawer anchor="left" open={state} onClose={toggleDrawer(false)}>
        {list()}
      </Drawer>
      <Box xs={{ height: 1 }}>
        <Grid container>
          <Grid
            sx={{
              position: "fixed",
              top: "0",
              left: "0",
              right: "0",
              bottom: "0",
            }}
            item
            xs={12}
            md={2}
          >
            <Box sx={{ display: { xs: "none", md: "block" }, height: "100%" }}>
              <Box
                sx={{
                  backgroundColor: "white",
                  height: "100%",
                  boxShadow: 0,
                  borderRight: "1px solid rgba(0,0,0,.2)",
                  paddingTop: "70px",
                }}
              >
                <Stack component="nav" spacing={0.5} sx={{ px: 0 }}>
                  <ListItemButton
                    component={RouterLink}
                    href="/"
                    sx={{
                      minHeight: 44,
                      borderRadius: 0.75,
                      typography: "body2",
                      color: "text.secondary",
                      textTransform: "capitalize",
                      fontWeight: "fontWeightMedium",
                      ...(active && {
                        color: "primary.main",
                        fontWeight: "fontWeightSemiBold",
                        bgcolor: "white",
                        "&:hover": {
                          bgcolor: "#D5E5FA",
                        },
                      }),
                    }}
                  >
                    <Box component="span" sx={{ width: 24, height: 24, mr: 1 }}>
                      <DashboardIcon></DashboardIcon>
                    </Box>

                    <Box component="span">Home </Box>
                  </ListItemButton>

                  <ListItemButton
                    component={RouterLink}
                    href="/teacher"
                    sx={{
                      minHeight: 44,
                      borderRadius: 0.75,
                      typography: "body2",
                      color: "text.secondary",
                      textTransform: "capitalize",
                      fontWeight: "fontWeightMedium",
                      ...(active && {
                        color: "primary.main",
                        fontWeight: "fontWeightSemiBold",
                        bgcolor: "white",
                        "&:hover": {
                          bgcolor: "#D5E5FA",
                        },
                      }),
                    }}
                  >
                    <Box component="span" sx={{ width: 24, height: 24, mr: 1 }}>
                      <PeopleAltIcon></PeopleAltIcon>
                    </Box>
                    <Box component="span">Teacher</Box>
                  </ListItemButton>

                  <ListItemButton
                    component={RouterLink}
                    href="/faculty"
                    sx={{
                      minHeight: 44,
                      borderRadius: 0.75,
                      typography: "body2",
                      color: "text.secondary",
                      textTransform: "capitalize",
                      fontWeight: "fontWeightMedium",
                      ...(active && {
                        color: "primary.main",
                        fontWeight: "fontWeightSemiBold",
                        bgcolor: "white",
                        "&:hover": {
                          bgcolor: "#D5E5FA",
                        },
                      }),
                    }}
                  >
                    <Box component="span" sx={{ width: 24, height: 24, mr: 1 }}>
                      <SchoolIcon></SchoolIcon>
                    </Box>

                    <Box component="span">Faculty </Box>
                  </ListItemButton>

                  <ListItemButton
                    component={RouterLink}
                    href="/department"
                    sx={{
                      minHeight: 44,
                      borderRadius: 0.75,
                      typography: "body2",
                      color: "text.secondary",
                      textTransform: "capitalize",
                      fontWeight: "fontWeightMedium",
                      ...(active && {
                        color: "primary.main",
                        fontWeight: "fontWeightSemiBold",
                        bgcolor: "white",
                        "&:hover": {
                          bgcolor: "#D5E5FA",
                        },
                      }),
                    }}
                  >
                    <Box component="span" sx={{ width: 24, height: 24, mr: 1 }}>
                      <SchoolIcon></SchoolIcon>
                    </Box>

                    <Box component="span">Department </Box>
                  </ListItemButton>
                </Stack>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12} md={2}></Grid>
          <Grid p={2} item xs={12} md={10}>
            {children}
          </Grid>
        </Grid>
      </Box>
    </>
  );
}
