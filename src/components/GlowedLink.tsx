"use client";

import LaunchIcon from "@mui/icons-material/Launch";
import { styled } from "@mui/material/styles";
import Link, { type LinkProps } from "next/link";
import * as React from "react";

const StyledGlowedLink = styled("span")(({ theme }) => ({
  position: "relative",
  display: "inline-block",
  color: theme.palette.text.primary,
  fontWeight: 500,
  backgroundImage: `linear-gradient(${theme.palette.secondary.main}, ${theme.palette.secondary.main})`,
  backgroundRepeat: "no-repeat",
  backgroundPosition: "0 100%",
  backgroundSize: "100% 2px",
  paddingBottom: 1,
  transition: "background-size 0.2s ease, color 0.2s ease",
  "a:hover > &, a:focus-visible > &": {
    color: theme.palette.secondary.main,
    backgroundSize: "100% 100%",
    backgroundImage: "none",
    textDecoration: "underline",
    textUnderlineOffset: "4px",
    textDecorationThickness: "2px",
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
  const external = target === "_blank";

  return (
    <Link
      {...props}
      target={target}
      rel={external ? "noopener noreferrer" : undefined}
      style={{ textDecoration: "none" }}
    >
      <StyledGlowedLink>
        {children}
        {external && (
          <>
            <LaunchIcon
              aria-hidden
              sx={{ fontSize: "0.8em", ml: 0.5, verticalAlign: "baseline" }}
            />
            <span
              style={{
                position: "absolute",
                width: 1,
                height: 1,
                overflow: "hidden",
                clip: "rect(0 0 0 0)",
              }}
            >
              {" "}
              (opens in a new tab)
            </span>
          </>
        )}
      </StyledGlowedLink>
    </Link>
  );
}
