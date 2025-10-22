"use client";

import { Card, CardContent, Chip, Link, Typography } from "@mui/material";
import { motion, useReducedMotion } from "framer-motion";
import { format } from "date-fns";
import type { ReadingListItem } from "@/lib/notion";
import { hoverLiftSubtle, tapPress } from "./motion/MotionUtils";

interface ReadingListCardProps {
  item: ReadingListItem;
}

function ReadingListCard({ item: { title, url, date } }: ReadingListCardProps) {
  const shouldReduceMotion = useReducedMotion();
  
  const getHostNameFromUrl = (link: string) => {
    const url = new URL(link);
    return url.hostname;
  };

  return (
    <motion.div
      whileHover={shouldReduceMotion ? {} : hoverLiftSubtle}
      whileTap={shouldReduceMotion ? {} : tapPress}
      style={{ height: "100%" }}
    >
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
    </motion.div>
  );
}

export default ReadingListCard;
