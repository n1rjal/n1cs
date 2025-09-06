"use client";
import DownloadIcon from "@mui/icons-material/Download";
import { Box, Button, Modal, Stack, Typography } from "@mui/material";
import type React from "react";

interface ResumeDownloadModalProps {
  open: boolean;
  onClose: () => void;
}

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const ResumeDownloadModal: React.FC<ResumeDownloadModalProps> = ({
  open,
  onClose,
}) => {
  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography
          id="modal-modal-title"
          variant="h6"
          component="h2"
          gutterBottom
        >
          Download Resume
        </Typography>
        <Typography id="modal-modal-description" sx={{ mt: 2, mb: 3 }}>
          I am skilled equally in both Python and Javascript/Typescript, Please
          select a CV customized for one
        </Typography>
        <Stack direction="column" spacing={2}>
          <Button
            variant="contained"
            color="primary"
            href="/Nirjal_Resume_5_years_javascript.pdf"
            target="_blank"
            rel="noopener noreferrer"
            download
            startIcon={<DownloadIcon />}
            onClick={onClose}
          >
            JavaScript Resume
          </Button>
          <Button
            variant="contained"
            color="secondary"
            href="/Nirjal_Resume_5_years_python.pdf"
            target="_blank"
            rel="noopener noreferrer"
            download
            startIcon={<DownloadIcon />}
            onClick={onClose}
          >
            Python Resume
          </Button>
        </Stack>
      </Box>
    </Modal>
  );
};

export default ResumeDownloadModal;
