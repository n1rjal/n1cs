"use client";

import { keyframes } from "@emotion/react";
import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";
import * as React from "react";
import { getRandomNeonColor } from "../utils/colors"; // Import random color utility

// Define keyframes for box glow animation
const boxGlow = keyframes`
  0% { box-shadow: 0 0 5px rgba(255, 255, 255, 0.5); }
  50% { box-shadow: 0 0 20px rgba(255, 255, 255, 0.8), 0 0 30px rgba(255, 255, 255, 0.6); }
  100% { box-shadow: 0 0 5px rgba(255, 255, 255, 0.5); }
`;

const StyledGlowBox = styled(Box)(({ theme }) => {
  const randomColor = React.useMemo(() => getRandomNeonColor(), []); // Get a random color once per component instance

  return {
    position: "relative",
    overflow: "hidden", // Ensure glow doesn't spill out
    borderRadius: theme.shape.borderRadius, // Use theme's border radius
    backgroundColor: theme.palette.background.paper, // Use paper background
    padding: theme.spacing(2), // Some internal padding
    textAlign: "center",
    cursor: "pointer", // Indicate it's interactive

    // Initial glow
    boxShadow: `0 0 5px ${randomColor}, 0 0 10px ${randomColor}`,
    animation: `${boxGlow} 3s infinite alternate`, // Apply glow animation

    "&:hover": {
      boxShadow: `0 0 15px ${randomColor}, 0 0 25px ${randomColor}, 0 0 35px ${randomColor}`, // Intensify glow on hover
      animation: "none", // Stop animation on hover
    },

    // Optional: Add a subtle border that glows
    "&::before": {
      content: '""',
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      borderRadius: "inherit",
      border: `1px solid ${randomColor}`,
      opacity: 0.7,
      transition: "all 0.3s ease-in-out",
    },
    "&:hover::before": {
      opacity: 1,
      border: `2px solid ${randomColor}`,
    },
  };
});

interface GlowBoxProps {
  children: React.ReactNode;
  onClick?: () => void;
}

export default function GlowBox({ children, onClick }: GlowBoxProps) {
  return <StyledGlowBox onClick={onClick}>{children}</StyledGlowBox>;
}
