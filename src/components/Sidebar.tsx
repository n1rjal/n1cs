"use client";

import ArticleIcon from "@mui/icons-material/Article";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import CloseIcon from "@mui/icons-material/Close"; // Import CloseIcon
import FacebookIcon from "@mui/icons-material/Facebook";
import GitHubIcon from "@mui/icons-material/GitHub";
import HomeIcon from "@mui/icons-material/Home";
import InstagramIcon from "@mui/icons-material/Instagram";
import LaunchIcon from "@mui/icons-material/Launch";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import MenuIcon from "@mui/icons-material/Menu"; // Import MenuIcon
import MenuBookIcon from "@mui/icons-material/MenuBook";
import PersonIcon from "@mui/icons-material/Person";
import WorkIcon from "@mui/icons-material/Work";
import AppBar from "@mui/material/AppBar"; // Import AppBar
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton"; // Import IconButton
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ListSubheader from "@mui/material/ListSubheader";
import Switch from "@mui/material/Switch";
import { useTheme } from "@mui/material/styles";
import Toolbar from "@mui/material/Toolbar";
import Link from "next/link";
import { usePathname } from "next/navigation"; // Import usePathname
import * as React from "react";
import { useContext } from "react";
import { ColorModeContext } from "../app/ThemeRegistry";
import NirjalsBlog from "./NirjalsBlog";

const drawerWidth = 240;

interface Props {
  window?: () => Window;
  children: React.ReactNode;
}

export default function Sidebar(props: Props) {
  const { window, children } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false); // State for mobile drawer
  const [isClosing, setIsClosing] = React.useState(false);

  const handleDrawerClose = () => {
    setIsClosing(true);
    setMobileOpen(false);
  };

  const handleDrawerTransitionEnd = () => {
    setIsClosing(false);
  };

  const handleDrawerToggle = () => {
    if (!isClosing) {
      setMobileOpen(!mobileOpen);
    }
  };

  const theme = useTheme();
  const colorMode = useContext(ColorModeContext);
  const pathname = usePathname(); // Get current path

  const socialMediaLinks = [
    {
      text: "GitHub",
      icon: <GitHubIcon />,
      href: "https://github.com/n1rjal",
    },
    {
      text: "Instagram",
      icon: <InstagramIcon />,
      href: "https://instagram.com/n1rjal",
    },
    {
      text: "LinkedIn",
      icon: <LinkedInIcon />,
      href: "https://linkedin.com/in/nirjalpaudel",
    },
    {
      text: "Facebook",
      icon: <FacebookIcon />,
      href: "https://facebook.com/n1rjal",
    },
  ];

  const links = [
    {
      text: "Home",
      icon: <HomeIcon />,
      href: "/",
    },
    {
      text: "About Me",
      icon: <PersonIcon />,
      href: "/about-me",
    },
    {
      text: "Projects",
      icon: <WorkIcon />,
      href: "/projects",
    },
    {
      text: "Blog",
      icon: <ArticleIcon />,
      href: "/blogs",
    },
    {
      text: "Reading List",
      icon: <MenuBookIcon />,
      href: "/reading-lists",
    },
  ];

  const drawer = (
    <Box
      sx={{
        px: 2,
        bgcolor: theme.palette.background.paper,
        height: "100%",
      }}
    >
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between", // Changed to space-between
          alignItems: "center",
          minHeight: 64,
          borderBottom: `1px solid ${theme.palette.divider}`,
          py: 2,
        }}
      >
        <NirjalsBlog />
        <IconButton
          aria-label="close drawer"
          edge="end"
          onClick={handleDrawerClose}
          sx={{
            display: { sm: "none" },
            color: theme.palette.mode === "light" ? "#000000" : "inherit",
          }} // Only show on mobile
        >
          <CloseIcon />
        </IconButton>
      </Toolbar>
      <Divider />
      <List>
        {links.map((item) => (
          <ListItem key={item.text} disablePadding dense>
            <ListItemButton
              component={Link}
              href={item.href}
              selected={pathname === item.href}
              onClick={handleDrawerClose}
              sx={{
                fontSize: "14px",
                p: "2px",
                mx: "5px",
                my: "3px",
                borderRadius: "5px",
                "&.Mui-selected": {
                  borderRight: `4px solid ${theme.palette.secondary.main}`,
                  "& .MuiListItemIcon-root, & .MuiListItemText-primary": {
                    color: theme.palette.secondary.main,
                  },
                  "&:hover": {
                    color: theme.palette.secondary.main,
                  },
                },
                "&:hover": {
                  "& .MuiListItemIcon-root, & .MuiListItemText-primary": {
                    color: theme.palette.secondary.main,
                  },
                },
              }}
            >
              <ListItemIcon
                sx={{
                  color: theme.palette.text.secondary,
                }}
              >
                {item.icon}
              </ListItemIcon>
              <ListItemText
                primary={item.text}
                sx={{
                  fontSize: "14px",
                  color: theme.palette.text.secondary,
                }}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {" "}
        {/* New List for Social Media */}
        <ListSubheader
          component="div" // Changed to div
          sx={{
            bgcolor: "transparent",
            fontWeight: "bold",
            color: theme.palette.text.primary,
            py: 1, // Added vertical padding
            px: 2, // Added horizontal padding
            fontSize: "0.85rem", // Slightly increased font size
          }}
        >
          Connect On
        </ListSubheader>
        {socialMediaLinks.map((item) => (
          <ListItem key={item.text} disablePadding dense>
            <ListItemButton
              component={Link}
              href={item.href}
              target="_blank" // Open in new tab
              rel="noopener noreferrer" // Security best practice
              sx={{
                fontSize: "14px",
                p: "2px",
                mx: "5px",
                my: "3px",
                borderRadius: "5px",
                "&:hover": {
                  bgcolor: theme.palette.action.hover,
                },
              }}
            >
              <ListItemIcon
                sx={{
                  color: theme.palette.text.secondary,
                }}
              >
                {item.icon}
              </ListItemIcon>
              <ListItemText
                primary={item.text}
                sx={{
                  fontSize: "14px",
                  color: theme.palette.text.secondary,
                }}
              />
              <LaunchIcon
                sx={{
                  fontSize: "0.9rem",
                  ml: 1,
                  color: theme.palette.text.secondary,
                }}
              />{" "}
              {/* New tab icon */}
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <List sx={{ mt: "auto" }}>
        <ListItem
          disablePadding
          dense
          sx={{
            fontSize: "14px",
            p: "4px", // Increased padding
            mx: "8px", // Increased horizontal margin
            my: "5px", // Increased vertical margin
            borderRadius: "5px",
            "&:hover": {
              bgcolor: theme.palette.action.hover,
            },
          }}
        >
          <ListItemText
            primary="Dark Mode"
            sx={{
              fontSize: "14px",
              color: theme.palette.text.secondary,
            }}
          />
          <Switch
            edge="end"
            onChange={colorMode.toggleColorMode}
            checked={theme.palette.mode === "dark"}
            inputProps={{
              "aria-label":
                theme.palette.mode === "dark" ? "Light mode" : "Dark mode",
            }}
          />
        </ListItem>
      </List>
    </Box>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex" }}>
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
          display: { sm: "none" }, // Only show AppBar on mobile
          bgcolor: theme.palette.background.paper,
          boxShadow: theme.shadows[1],
        }}
      >
        <Toolbar>
          <IconButton
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{
              mr: 2,
              display: { sm: "none" },

              color: theme.palette.mode === "light" ? "#000000" : "inherit",
            }}
          >
            <MenuIcon />
          </IconButton>
          <NirjalsBlog />
          <Box sx={{ flexGrow: 1 }} />
          <IconButton
            sx={{
              ml: 1,

              color: theme.palette.mode === "light" ? "#000000" : "inherit",
            }}
            onClick={colorMode.toggleColorMode}
          >
            {theme.palette.mode === "dark" ? (
              <Brightness7Icon />
            ) : (
              <Brightness4Icon />
            )}
          </IconButton>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onTransitionEnd={handleDrawerTransitionEnd}
          onClose={handleDrawerClose}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: mobileOpen ? "100vw" : drawerWidth, // Full screen on mobileOpen
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            bgcolor: theme.palette.background.paper,

            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
              boxShadow: theme.shadows[6], // Longer shadow
              borderRight: `1px solid ${theme.palette.divider}`, // Subtle right border
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          mt: { xs: "60px", sm: "0" },
        }}
      >
        {children}
      </Box>
    </Box>
  );
}
