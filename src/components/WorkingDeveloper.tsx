"use client";
import { Box } from "@mui/material";
import Lottie from "lottie-react";
import animationData from "@/constants/Developer.json";

const WorkingDeveloper = () => (
  <Box
    sx={{
      maxWidth: {
        lg: "35vw",
        xl: "35vw",
        md: "35vw",
        xs: "100%",
        sm: "100%",
      },
      width: "100%",
      height: { xs: "50vh", sm: "50vh", md: "50vh" },
      px: { xs: 2, sm: 2 },
    }}
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
