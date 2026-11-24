"use client";

import Box from "@mui/material/Box";
import Link from "next/link";

// Quiet text link, left aligned under a list.
const ViewAllLink = ({ href, label }: { href: string; label: string }) => (
  <Box
    component={Link}
    href={href}
    sx={{
      display: "inline-block",
      mt: 3,
      typography: "body1",
      fontWeight: 600,
      color: "secondary.main",
      textDecoration: "none",
      transition: "color 0.2s",
      "&:hover, &:focus-visible": {
        color: "text.primary",
        textDecoration: "underline",
        "& > span": { transform: "translateX(4px)" },
      },
    }}
  >
    {label}
    <Box
      component="span"
      sx={{
        display: "inline-block",
        ml: 0.5,
        transition: "transform 0.2s ease",
      }}
    >
      →
    </Box>
  </Box>
);

export default ViewAllLink;
