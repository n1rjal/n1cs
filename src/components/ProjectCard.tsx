"use client";

import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import StarIcon from "@mui/icons-material/Star";
import { Box, Link, Typography } from "@mui/material";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import type React from "react";
import { useEffect, useState } from "react";

interface ProjectCardProps {
  id: string;
  name: string;
  description: string;
  liveUrl?: string;
  githubUrl?: string;
  tags?: string[];
  imageUrl?: string;
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  id,
  name,
  description,
  liveUrl,
  githubUrl,
  imageUrl,
  tags = [],
}) => {
  const [stars, setStars] = useState<number | null>(null);
  const [loadingStars, setLoadingStars] = useState<boolean>(false);
  const [errorStars, setErrorStars] = useState<string | null>(null);

  useEffect(() => {
    if (githubUrl) {
      const fetchStars = async () => {
        setLoadingStars(true);
        setErrorStars(null);
        try {
          const repoPath = new URL(githubUrl).pathname.substring(1); // e.g., 'owner/repo'
          const response = await fetch(
            `https://api.github.com/repos/${repoPath}`,
          );
          if (!response.ok) {
            setErrorStars("Error");
            setStars(null);
          } else {
            const data = await response.json();
            setStars(data.stargazers_count);
          }
        } catch (error: any) {
          setErrorStars(error.message);
          console.error("Failed to fetch GitHub stars:", error);
          setStars(null);
        } finally {
          setLoadingStars(false);
        }
      };
      fetchStars();
    }
  }, [githubUrl]);

  return (
    <Box
      component="article"
      sx={{
        display: "flex",
        gap: 3,
        py: 3,
        borderBottom: (t) => `1px solid ${t.palette.divider}`,
        "&:last-of-type": { borderBottom: "none" },
      }}
    >
      <Box sx={{ flex: 1, minWidth: 0 }}>
        {/* 1. title: strongest element */}
        <Link
          href={`/projects/${id}`}
          color="text.primary"
          underline="hover"
          sx={{ display: "block" }}
        >
          <Typography
            variant="h5"
            component="h2"
            sx={{
              fontWeight: 600,
              fontSize: { xs: "1.125rem", sm: "1.25rem" },
              lineHeight: 1.3,
              mb: 1,
            }}
          >
            {name}
          </Typography>
        </Link>

        {/* 2. description: muted, clamped so rows stay even */}
        <Typography
          color="text.secondary"
          sx={{
            fontSize: "1rem",
            lineHeight: 1.6,
            display: "-webkit-box",
            WebkitLineClamp: 3,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
          {description}
        </Typography>

        {/* 3. meta: tags, then stars + links, quietest */}
        {(tags.length > 0 || githubUrl || liveUrl) && (
          <Stack
            direction="row"
            alignItems="center"
            flexWrap="wrap"
            columnGap={3}
            rowGap={1}
            sx={{ mt: 2, color: "text.secondary", typography: "body2" }}
          >
            {tags.map((tag) => (
              <Chip key={tag} label={tag} size="small" />
            ))}
            {githubUrl && (
              <Link
                href={githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                color="text.primary"
                underline="hover"
                sx={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 0.5,
                  opacity: 0.85,
                  "&:hover": { opacity: 1 },
                }}
              >
                Source code
                {stars !== null && !loadingStars && !errorStars && (
                  <Box component="span" sx={{ opacity: 0.7 }}>
                    (
                    <StarIcon
                      sx={{
                        fontSize: "0.95em",
                        verticalAlign: "-0.12em",
                        mr: "0.2em",
                      }}
                    />
                    {stars})
                  </Box>
                )}
              </Link>
            )}
            {liveUrl && (
              <Link
                href={liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                color="text.primary"
                underline="hover"
                sx={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 0.5,
                  opacity: 0.85,
                  "&:hover": { opacity: 1 },
                }}
              >
                <OpenInNewIcon sx={{ fontSize: 16 }} /> Live demo
              </Link>
            )}
          </Stack>
        )}
      </Box>

      {imageUrl && (
        <Box
          component="img"
          src={imageUrl}
          alt={name}
          sx={{
            width: { xs: 88, sm: 160 },
            height: { xs: 88, sm: 107 },
            objectFit: "cover",
            borderRadius: 1,
            flexShrink: 0,
          }}
        />
      )}
    </Box>
  );
};

export default ProjectCard;
