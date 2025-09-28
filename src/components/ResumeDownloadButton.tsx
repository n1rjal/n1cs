"use client";

import DownloadIcon from "@mui/icons-material/Download";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import React from "react";
import ResumeDownloadModal from "./ResumeDownloadModal";

const ResumeDownloadButton: React.FC = () => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <Box width="100%">
      <Button
        variant="outlined"
        color="secondary"
        onClick={handleOpen}
        startIcon={<DownloadIcon />}
        fullWidth
      >
        Resume
      </Button>
      <ResumeDownloadModal open={open} onClose={handleClose} />
    </Box>
  );
};

export default ResumeDownloadButton;
