"use client";

import { Box, Button } from "@mui/material";
import Stack from "@mui/material/Stack";
import Lottie from "lottie-react";
import animationData from "@/constants/404.json";

const NotFoundAnimation = () => (
  <Stack
    maxWidth="90vw"
    mx="auto"
    height={{ xs: "80vh", sm: "50vh", md: "60vh" }}
    alignItems="center"
    justifyContent="center"
    flexDirection="column"
    rowGap="5"
  >
    <Lottie
      animationData={animationData}
      loop={true}
      autoplay={true}
      style={{
        width: "70%",
        height: "70%",
      }}
    />
    <Box textAlign="center">
      <Box my={2}>We couldn&apos;t find the resource you are looking for</Box>
      <Button variant="contained" color="secondary" href="/">
        Go Home
      </Button>
    </Box>
  </Stack>
);

export default NotFoundAnimation;
