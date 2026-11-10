"use client";

import { styled } from "@mui/material/styles";

const GradientText = styled("span")(({ theme }) => ({
  color: theme.palette.secondary.main, // fallback if background-clip unsupported
  background: `linear-gradient(45deg, ${theme.palette.secondary.main} 30%, ${theme.palette.text.primary} 90%)`,
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
}));

export default GradientText;
