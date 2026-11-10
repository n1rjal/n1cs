"use client";

import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";
import * as React from "react";

const StyledGlowBox = styled(Box)(({ theme }) => ({
  borderRadius: theme.shape.borderRadius,
  backgroundColor: theme.palette.background.paper,
  border: `1px solid ${theme.palette.divider}`,
  padding: theme.spacing(2),
  textAlign: "center",
  transition: "border-color 0.2s ease, box-shadow 0.2s ease",
  "&:hover, &:focus-visible": {
    borderColor: theme.palette.secondary.main,
    boxShadow: theme.shadows[4],
  },
}));

interface GlowBoxProps {
  children: React.ReactNode;
  onClick?: () => void;
}

export default function GlowBox({ children, onClick }: GlowBoxProps) {
  return (
    <StyledGlowBox
      onClick={onClick}
      {...(onClick
        ? { role: "button", tabIndex: 0, sx: { cursor: "pointer" } }
        : {})}
    >
      {children}
    </StyledGlowBox>
  );
}
