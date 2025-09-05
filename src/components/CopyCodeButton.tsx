"use client";

import React, { useState } from "react";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import DoneIcon from "@mui/icons-material/Done";
import { useTheme } from "@mui/material/styles";

interface CopyCodeButtonProps {
  code: string;
}

const CopyCodeButton: React.FC<CopyCodeButtonProps> = ({ code }) => {
  const [copied, setCopied] = useState(false);
  const theme = useTheme();

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000); // Reset after 2 seconds
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
  };

  return (
    <Box
      sx={{
        position: "absolute",
        top: 1,
        right: 1,
        display: "inline-block",
        zIndex: 1,
      }}
    >
      <Button
        variant="contained"
        size="small"
        onClick={handleCopy}
        disabled={copied}
        sx={{
          minWidth: "auto",
          padding: theme.spacing(0.5, 1),
          backgroundColor: copied
            ? theme.palette.success.main
            : theme.palette.primary.main,
          "&:hover": {
            backgroundColor: copied
              ? theme.palette.success.dark
              : theme.palette.primary.dark,
          },
        }}
      >
        {copied ? (
          <DoneIcon fontSize="small" sx={{ mr: 0.5 }} />
        ) : (
          <ContentCopyIcon fontSize="small" sx={{ mr: 0.5 }} />
        )}
        {copied ? "Copied!" : "Copy"}
      </Button>
    </Box>
  );
};

export default CopyCodeButton;
