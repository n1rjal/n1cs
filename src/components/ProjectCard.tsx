"use client";

import GitHubIcon from "@mui/icons-material/GitHub";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import StarIcon from "@mui/icons-material/Star";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Link,
  Typography,
} from "@mui/material";
import CardMedia from "@mui/material/CardMedia";
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
    <Card
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        py: 1.25,
        px: 1.875,
        borderRadius: "5px",
        width: "100%",
      }}
    >
      {imageUrl && (
        <CardMedia
          component="img"
          height="140"
          image={imageUrl}
          alt={name}
          sx={{ borderRadius: "5px", mb: 2 }}
        />
      )}

      <Link href={`/projects/${id}`} style={{ textDecoration: "none" }}>
        <CardContent sx={{ flexGrow: 1, p: 0, m: 0 }}>
          <Typography
            gutterBottom
            my="7px"
            variant="h4"
            fontWeight="600"
            component="h2"
          >
            {name}
          </Typography>
          <Typography variant="body1" color="textSecondary">
            {description}
          </Typography>
          {tags && tags.length > 0 && (
            <Stack direction="row" spacing={1} sx={{ mt: 1, flexWrap: "wrap" }}>
              {tags.map((tag) => (
                <Chip key={tag} label={tag} size="small" variant="outlined" />
              ))}
            </Stack>
          )}
        </CardContent>
      </Link>
      <CardActions sx={{ justifyContent: "flex-start", flexWrap: "wrap" }}>
        {githubUrl && (
          <Box sx={{ display: "flex", alignItems: "center", mr: 2 }}>
            <Button
              size="small"
              component={Link}
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              startIcon={<GitHubIcon fontSize="small" />}
            >
              Github
            </Button>
            {loadingStars && (
              <Typography variant="body1" color="text.secondary" sx={{ ml: 1 }}>
                Loading...
              </Typography>
            )}
            {errorStars && (
              <Typography variant="body1" color="error" sx={{ ml: 1 }}>
                Error
              </Typography>
            )}
            {stars !== null && !loadingStars && !errorStars && (
              <Box sx={{ display: "flex", alignItems: "center", ml: 1 }}>
                <StarIcon
                  sx={{
                    mx: 0.2,
                    color: "gold",
                  }}
                  fontSize="small"
                />
                <Typography variant="body1" color="text.secondary">
                  {stars}
                </Typography>
              </Box>
            )}
          </Box>
        )}
        {liveUrl && (
          <Button
            size="small"
            component={Link}
            href={liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            startIcon={<OpenInNewIcon fontSize="small" />}
          >
            Live Demo
          </Button>
        )}
      </CardActions>
    </Card>
  );
};

export default ProjectCard;
