"use client";

import { keyframes } from "@emotion/react";
import LaunchIcon from "@mui/icons-material/Launch";
import { styled } from "@mui/material/styles";
import { Url } from "next/dist/shared/lib/router/router";
import Link, { type LinkProps } from "next/link";
import * as React from "react";
import { getRandomNeonColor } from "../utils/colors";

// Glow animation for underline
const underlineGlow = keyframes`
  0% { box-shadow: 0 0 0px rgba(255, 255, 255, 0); }
  50% { box-shadow: 0 0 8px rgba(255, 255, 255, 0.8), 0 0 12px rgba(255, 255, 255, 0.6); }
  100% { box-shadow: 0 0 0px rgba(255, 255, 255, 0); }
`;

const StyledGlowedLink = styled("span")(({ theme }) => ({
  textDecoration: "none",
  position: "relative",
  display: "inline-block",
  transition: "color 0.3s ease-in-out",
  color: theme.palette.text.primary,

  "&::after": {
    content: '""',
    position: "absolute",
    left: 0,
    bottom: 0,
    width: "100%",
    height: "2px",
    borderRadius: "1px",
    opacity: 0.8,
    transition: "all 0.3s ease-in-out",
    animation: `${underlineGlow} 2s infinite alternate`,
  },

  "&:hover": {
    "&::after": {
      height: "3px",
      opacity: 1,
      animation: "none",
    },
  },
}));

interface GlowedLinkProps extends LinkProps {
  children?: React.ReactNode;
  target?: React.HTMLAttributeAnchorTarget;
  className?: string;
  href: string | LinkProps["href"];
}

export default function GlowedLink({
  children,
  target,
  ...props
}: GlowedLinkProps) {
  // pick color per component instance
  const randomColor = React.useMemo(() => getRandomNeonColor(), []);

  const shouldRenderLaunchIcon = target === "_blank";

  return (
    <Link {...props} target={target} style={{ textDecoration: "none" }}>
      <StyledGlowedLink
        sx={{
          "&::after": {
            backgroundColor: randomColor,
            boxShadow: `0 0 6px ${randomColor}`,
          },
          "&:hover::after": {
            boxShadow: `0 0 10px ${randomColor}, 0 0 20px ${randomColor}`,
          },
        }}
      >
        {children ? children : null}
        {shouldRenderLaunchIcon && (
          <LaunchIcon sx={{ fontSize: "0.8em", ml: 0.5 }} />
        )}
      </StyledGlowedLink>
    </Link>
  );
}
