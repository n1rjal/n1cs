"use client";

import * as React from "react";
import Link, { LinkProps } from "next/link";
import { styled } from "@mui/material/styles";
import { keyframes } from "@emotion/react";
import { getRandomNeonColor } from "../utils/colors";
import LaunchIcon from "@mui/icons-material/Launch";

// Define keyframes for underline glow animation
const underlineGlow = keyframes`
  0% { box-shadow: 0 0 0px rgba(255, 255, 255, 0); }
  50% { box-shadow: 0 0 8px rgba(255, 255, 255, 0.8), 0 0 12px rgba(255, 255, 255, 0.6); }
  100% { box-shadow: 0 0 0px rgba(255, 255, 255, 0); }
`;

// Define a styled component for the glowing link
const StyledGlowedLink = styled(Link)<LinkProps>(({ theme }) => {
  // Pass LinkProps as generic
  const randomColor = React.useMemo(() => getRandomNeonColor(), []); // Get a random color once per component instance

  return {
    textDecoration: "none",
    position: "relative", // Needed for pseudo-element positioning
    display: "inline-block",
    transition: "color 0.3s ease-in-out", // Only transition color

    // Base color for the text
    color: theme.palette.text.primary,

    "&::after": {
      content: '""',
      position: "absolute",
      left: 0,
      bottom: "0px", // Position below text
      width: "100%",
      height: "2px", // Underline thickness
      backgroundColor: randomColor, // Random color for underline
      borderRadius: "1px",
      opacity: 0.8,
      transition: "all 0.3s ease-in-out",
      animation: `${underlineGlow} 2s infinite alternate`, // Apply glow animation
    },

    "&:hover": {
      color: theme.palette.text.primary,
      "&::after": {
        height: "3px", // Slightly thicker on hover
        opacity: 1,
        boxShadow: `0 0 10px ${randomColor}, 0 0 20px ${randomColor}`, // Intensify glow on hover
        animation: "none", // Stop animation on hover to show intensified glow
      },
    },
  };
});

interface GlowedLinkProps extends LinkProps {
  children: React.ReactNode;
}

export default function GlowedLink({ children, ...props }: GlowedLinkProps) {
  const shouldRenderLaunchIcon = props.target === "_blank";

  return (
    <StyledGlowedLink {...props}>
      {children}
      {shouldRenderLaunchIcon && (
        <LaunchIcon sx={{ fontSize: "0.8em", ml: 0.5 }} />
      )}
    </StyledGlowedLink>
  );
}
