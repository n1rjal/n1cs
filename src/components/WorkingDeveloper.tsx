"use client";
import Lottie from "lottie-react";
import animationData from "@/constants/Developer.json";
import { Box } from "@mui/material";

const WorkingDeveloper = () => (
  <Box
    maxWidth={{
      lg: "35vw",
      xl: "35vw",
      md: "35vw",
      xs: "90vw",
      sm: "90vw",
    }}
    height={{ xs: "50vh", sm: "50vh", md: "50vh" }}
  >
    <Lottie
      animationData={animationData}
      loop={true}
      autoplay={true}
      style={{
        width: "100%",
        height: "100%",
      }}
    />
  </Box>
);

export default WorkingDeveloper;
