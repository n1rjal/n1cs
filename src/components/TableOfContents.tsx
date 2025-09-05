"use client";

import { Box, List, ListItem, ListItemText, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import Link from "next/link";
import type React from "react";

interface Heading {
  id: string;
  text: string;
  level: number;
}

interface TableOfContentsProps {
  headings: Heading[];
}

const TableOfContents: React.FC<TableOfContentsProps> = ({ headings }) => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        position: "sticky",
        top: 100, // Adjust as needed to position below header
        maxHeight: "calc(100vh - 200px)", // Adjust height as needed
        overflowY: "auto",
        py: 2,
        borderRadius: 2,
        color: theme.palette.text.primary,
      }}
    >
      <Typography
        variant="h6"
        gutterBottom
        sx={{ color: theme.palette.warning.main }}
      >
        Table of Contents
      </Typography>
      <List dense>
        {headings.map((heading) => (
          <ListItem
            key={heading.id}
            disablePadding
            sx={{
              mb: 0.5,
              pl: Math.max((heading.level - 2) * 2, 0),
            }}
          >
            <Link href={`#${heading.id}`} passHref>
              <ListItemText
                primary={heading.text}
                primaryTypographyProps={{
                  variant: "body2",
                  sx: {
                    fontWeight: heading.level === 1 ? "bold" : "normal",
                    color: theme.palette.text.primary,
                  },
                }}
              />
            </Link>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default TableOfContents;
