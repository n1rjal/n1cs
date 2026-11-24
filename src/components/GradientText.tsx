"use client";

import { styled } from "@mui/material/styles";

const GradientText = styled("span")(({ theme }) => ({
  color: theme.palette.secondary.main, // fallback if background-clip unsupported
  // peach midpoint (60/40 orange/white) so orange eases into white instead of jumping
  background: `linear-gradient(45deg, ${theme.palette.secondary.main} 15%, color-mix(in oklab, ${theme.palette.secondary.main} 60%, ${theme.palette.text.primary}) 50%, ${theme.palette.text.primary} 95%)`,
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
}));

export default GradientText;
