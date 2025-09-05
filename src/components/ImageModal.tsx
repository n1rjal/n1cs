"use client";

import { Box, IconButton, Modal, Slider, Typography } from "@mui/material";
import dynamic from "next/dynamic";
import type React from "react";
import { useEffect, useState } from "react";

const CloseIcon = dynamic(() => import("@mui/icons-material/Close"), {
  ssr: false,
});
const ZoomInIcon = dynamic(() => import("@mui/icons-material/ZoomIn"), {
  ssr: false,
});
const ZoomOutIcon = dynamic(() => import("@mui/icons-material/ZoomOut"), {
  ssr: false,
});

interface ImageModalProps {
  src: string;
  alt: string;
  open: boolean;
  onClose: () => void;
  originalWidth: number;
  originalHeight: number;
}

const ImageModal: React.FC<ImageModalProps> = ({
  src,
  alt,
  open,
  onClose,
  originalWidth,
  originalHeight,
}) => {
  const [zoom, setZoom] = useState(100);
  const [imageDimensions, setImageDimensions] = useState({
    width: originalWidth,
    height: originalHeight,
  });

  useEffect(() => {
    if (open) {
      // Calculate initial dimensions to fit within 1000px
      let newWidth = originalWidth;
      let newHeight = originalHeight;

      if (originalWidth > 1000 || originalHeight > 1000) {
        if (originalWidth > originalHeight) {
          newWidth = 1000;
          newHeight = (originalHeight / originalWidth) * 1000;
        } else {
          newHeight = 1000;
          newWidth = (originalWidth / originalHeight) * 1000;
        }
      }
      setImageDimensions({ width: newWidth, height: newHeight });
    }
  }, [open, originalWidth, originalHeight]);

  const handleZoomChange = (event: Event, newValue: number | number[]) => {
    setZoom(newValue as number);
  };

  const handleCloseClick = (event: React.MouseEvent) => {
    // Close only if clicking on the backdrop (whitespace)
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  const scaledWidth = imageDimensions.width * (zoom / 100);
  const scaledHeight = imageDimensions.height * (zoom / 100);

  return (
    <Modal
      open={open}
      onClose={handleCloseClick}
      aria-labelledby="image-modal-title"
      aria-describedby="image-modal-description"
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        bgcolor: "rgba(0, 0, 0, 0.8)", // Dark overlay
      }}
    >
      <Box
        width={{
          lg: "50%",
          sm: "100%",
          md: "75%",
        }}
        maxWidth={{
          lg: "50%",
          sm: "100%",
          md: "75%",
        }}
        sx={{
          position: "relative",
          outline: "none",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            top: 8,
            right: 8,
            color: "white",
            zIndex: 1200,
          }}
        >
          {CloseIcon && <CloseIcon />}
        </IconButton>
        <Box
          component="img"
          src={src}
          alt={alt}
          sx={{
            display: "block",
            margin: "auto",
            cursor: "grab",

            width: {
              xs: "90%", // mobile: take 90% of screen width
              sm: "75%", // tablet
              md: "60%", // desktop
            },
            maxWidth: "100%", // never overflow container width
            height: "auto", // preserve aspect ratio
            maxHeight: {
              xs: "80vh", // mobile: max 80% of viewport height
              md: "100vh", // desktop: max 100% of viewport height
            },
          }}
        />
        <Box
          sx={{
            position: "absolute",
            bottom: "20px",
            width: "200px",
            mt: 2,
            display: "flex",
            alignItems: "center",
            gap: 1,
          }}
        >
          <IconButton
            onClick={() => setZoom((prev) => Math.max(10, prev - 10))}
          >
            {ZoomOutIcon && <ZoomOutIcon sx={{ color: "white" }} />}
          </IconButton>
          <Slider
            value={zoom}
            min={10}
            max={200}
            step={10}
            onChange={handleZoomChange}
            aria-labelledby="zoom-slider"
            sx={{ color: "white" }}
          />
          <IconButton
            onClick={() => setZoom((prev) => Math.min(200, prev + 10))}
          >
            {ZoomInIcon && <ZoomInIcon sx={{ color: "white" }} />}
          </IconButton>
          <Typography variant="body2" sx={{ color: "white", ml: 1 }}>
            {zoom}%
          </Typography>
        </Box>
      </Box>
    </Modal>
  );
};

export default ImageModal;
