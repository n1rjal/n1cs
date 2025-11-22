"use client";

import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { useTheme } from "@mui/material/styles";
import React, { useState } from "react";
import ImageModal from "@/components/ImageModal";
import MarkdownRenderer from "@/components/MarkdownRenderer";

interface Heading {
  id: string;
  text: string;
  level: number;
}

interface ContentWrapperProps {
  content: string;
  headings: Heading[];
  displayHr?: boolean;
}

const ContentWrapper: React.FC<ContentWrapperProps> = ({ content, headings, displayHr = true }) => {
  const theme = useTheme();
  const [openModal, setOpenModal] = useState(false);
  const [modalImageSrc, setModalImageSrc] = useState("");
  const [modalImageAlt, setModalImageAlt] = useState("");
  const [modalImageOriginalWidth, setModalImageOriginalWidth] = useState(0);
  const [modalImageOriginalHeight, setModalImageOriginalHeight] = useState(0);

  const handleImageClick = (
    src: string,
    alt: string,
    naturalWidth: number,
    naturalHeight: number,
  ) => {
    setModalImageSrc(src);
    setModalImageAlt(alt);
    setModalImageOriginalWidth(naturalWidth);
    setModalImageOriginalHeight(naturalHeight);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  return (
    <Grid container my={4}>
      <Grid>
        <Box
          sx={{
            py: 3,
            px: {
              sm: 2,
              lg: 0,
              xl: 0,
            },
            borderRadius: 2,
            color: theme.palette.text.primary,
            maxWidth: {
              xl: "md",
              lg: "md",
              md: "lg",
              sm: "100%",
            },
          }}
        >
          {displayHr && <Box component="hr" />}
          <Box sx={{ pt: 4 }}>
            <MarkdownRenderer content={content} onImageClick={handleImageClick} />
          </Box>
        </Box>
      </Grid>

      <ImageModal
        src={modalImageSrc}
        alt={modalImageAlt}
        open={openModal}
        onClose={handleCloseModal}
        originalWidth={modalImageOriginalWidth}
        originalHeight={modalImageOriginalHeight}
      />
    </Grid>
  );
};

export default ContentWrapper;
