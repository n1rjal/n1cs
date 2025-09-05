"use client";

import DownloadIcon from "@mui/icons-material/Download";
import Button from "@mui/material/Button";
import React from "react";
import ResumeDownloadModal from "./ResumeDownloadModal";

const ResumeDownloadButton: React.FC = () => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <Button
        variant="outlined"
        color="secondary"
        onClick={handleOpen}
        startIcon={<DownloadIcon />}
      >
        Resume
      </Button>
      <ResumeDownloadModal open={open} onClose={handleClose} />
    </>
  );
};

export default ResumeDownloadButton;
