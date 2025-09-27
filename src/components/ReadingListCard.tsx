"use client";

import { ReadingListItem } from "@/lib/notion";
import { Card, CardContent, Chip, Link, Typography } from "@mui/material";
import { format } from "date-fns";
import React from "react";

interface ReadingListCardProps {
  item: ReadingListItem;
}

function ReadingListCard({ item: { title, url, date } }: ReadingListCardProps) {
  const getHostNameFromUrl = (link: string) => {
    const url = new URL(link);
    return url.hostname;
  };

  return (
    <Link
      href={url}
      target="_blank"
      rel="noopener"
      sx={{
        textDecoration: "none",
        fontSize: "15px",
      }}
    >
      <Card sx={{ px: "10px", py: "20px", width: "100%", height: "100%" }}>
        <CardContent>
          <Typography component="h3" variant="h6">
            {title}
          </Typography>

          <Chip
            size="small"
            sx={{ my: "10px" }}
            label={getHostNameFromUrl(url)}
            variant="outlined"
          />

          <Typography component="p" variant="body2" color="textSecondary">
            Added {format(date, "yyyy-MM-dd")}
          </Typography>
        </CardContent>
      </Card>
    </Link>
  );
}

export default ReadingListCard;
