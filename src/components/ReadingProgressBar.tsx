"use client";

import React, { useEffect, useState } from "react";
import { Box, LinearProgress, useTheme } from "@mui/material";

const ReadingProgressBar: React.FC = () => {
  const [progress, setProgress] = useState(0);
  const theme = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const scrollPosition = window.scrollY;
      if (totalHeight > 0) {
        const currentProgress = (scrollPosition / totalHeight) * 100;
        setProgress(currentProgress);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <Box
      sx={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        zIndex: 1100,
      }}
    >
      <LinearProgress
        variant="determinate"
        value={progress}
        color="secondary"
        sx={{
          height: 5,
          backgroundColor: "transparent",
          "& .MuiLinearProgress-bar": {
            backgroundColor: theme.palette.secondary.light,
          },
        }}
      />
    </Box>
  );
};

export default ReadingProgressBar;
