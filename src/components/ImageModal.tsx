"use client";

import React, { useState, useEffect, useRef } from "react";
import { Modal, Box, IconButton, Slider, Typography } from "@mui/material";
import dynamic from "next/dynamic"; // Import dynamic

// Dynamically import Material-UI icons
const CloseIcon = dynamic(() => import("@mui/icons-material/Close"), {
  ssr: false,
});
const ZoomInIcon = dynamic(() => import("@mui/icons-material/ZoomIn"), {
  ssr: false,
});
const ZoomOutIcon = dynamic(() => import("@mui/icons-material/ZoomOut"), {
  ssr: false,
});

import Image from "next/image";

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
        sx={{
          position: "relative",
          outline: "none",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          maxWidth: "90vw",
          maxHeight: "90vh",
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
        <img
          src={src}
          alt={alt}
          width={scaledWidth}
          height={scaledHeight}
          style={{
            cursor: "grab",
            maxWidth: "80%",
            maxHeight: "80%",
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
