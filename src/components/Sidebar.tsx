"use client";

import * as React from "react";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Link from "next/link";
import { useTheme } from "@mui/material/styles";
import { useContext } from "react";
import { ColorModeContext } from "../app/ThemeRegistry";
import { usePathname } from "next/navigation"; // Import usePathname

import HomeIcon from "@mui/icons-material/Home";
import WorkIcon from "@mui/icons-material/Work";
import ArticleIcon from "@mui/icons-material/Article";
import Switch from "@mui/material/Switch";
import GitHubIcon from "@mui/icons-material/GitHub";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import FacebookIcon from "@mui/icons-material/Facebook";
import LaunchIcon from "@mui/icons-material/Launch";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import PersonIcon from "@mui/icons-material/Person";
import ListSubheader from "@mui/material/ListSubheader";

const drawerWidth = 240;

interface Props {
  window?: () => Window;
  children: React.ReactNode;
}

export default function Sidebar(props: Props) {
  const { children } = props;

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

  const drawer = (
    <Box
      sx={{
        px: 2,
        bgcolor: theme.palette.background.default,
        height: "100%",
      }}
    >
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: 64,
          borderBottom: `1px solid ${theme.palette.divider}`,
          py: 2,
        }}
      >
        <Typography variant="h6" noWrap component="div" color="text.primary">
          Nirjal&apos;s Blog
        </Typography>
      </Toolbar>
      <Divider />
      <List>
        {[
          {
            text: "Home",
            icon: <HomeIcon />,
            href: "/",
          },
          {
            text: "About Me",
            icon: <PersonIcon />,
            href: "/about",
          },
          {
            text: "Projects",
            icon: <WorkIcon />,
            href: "/projects",
          },
          {
            text: "Blog",
            icon: <ArticleIcon />,
            href: "/blog",
          },
          {
            text: "Reading List",
            icon: <MenuBookIcon />,
            href: "/reading-list",
          },
        ].map((item) => (
          <ListItem key={item.text} disablePadding dense>
            <ListItemButton
              component={Link}
              href={item.href}
              selected={pathname === item.href}
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

  return (
    <Box sx={{ display: "flex" }}>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            bgcolor: theme.palette.background.default,

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
          m: 0,
          p: 0,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        {children}
      </Box>
    </Box>
  );
}
