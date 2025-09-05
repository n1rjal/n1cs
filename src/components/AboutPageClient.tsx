"use client";

import CodeIcon from "@mui/icons-material/Code";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import SchoolIcon from "@mui/icons-material/School";
import WorkIcon from "@mui/icons-material/Work";
import {
  Chip,
  Collapse,
  IconButton,
  type IconButtonProps,
  List,
  ListItem,
} from "@mui/material";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import { useEffect, useState } from "react";

import GradientText from "./GradientText";

interface ExpandMoreProps extends IconButtonProps {
  expand?: boolean;
}

const ExpandMore = styled(({ expand, ...other }: ExpandMoreProps) => {
  return <IconButton {...other} />;
})(({ theme, expand }: { theme: any; expand?: boolean }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function AboutPageClient() {
  const [aboutData, setAboutData] = useState<any>(null);
  // ts-ignore no-explicit-any
  const [expanded, setExpanded] = useState<any>({});

  useEffect(() => {
    fetch("/about.json")
      .then((res) => res.json())
      .then((data) => setAboutData(data));
  }, []);

  const handleExpandClick = (id: string | number) => {
    setExpanded((prev: any) => ({ ...prev, [id]: !prev[id] }));
  };

  if (!aboutData) {
    return <Container>Loading...</Container>;
  }

  return (
    <Box
      sx={{
        bgcolor: "background.paper",
        pt: 8,
        pb: 6,
      }}
    >
      <Container maxWidth="md" sx={{ mt: 4 }}>
        <Box sx={{ textAlign: "center", mb: 8 }}>
          <Typography component="h1" variant="h2" gutterBottom>
            <GradientText>About Me</GradientText>
          </Typography>
          <Typography variant="h5" color="text.secondary" component="p">
            {aboutData.summary}
          </Typography>
        </Box>

        <Stack spacing={8}>
          <Box>
            <Typography
              variant="h4"
              component="h2"
              gutterBottom
              sx={{ display: "flex", alignItems: "center", gap: 1 }}
            >
              <CodeIcon color="secondary" /> <GradientText>Skills</GradientText>
            </Typography>
            {Object.entries(aboutData.skills).map(([group, skills]) => (
              <Box key={group} sx={{ my: 2 }}>
                <Typography variant="h6" component="h3" gutterBottom>
                  {group}
                </Typography>
                <Stack direction="row" spacing={1} useFlexGap flexWrap="wrap">
                  {(skills as string[]).map((skill) => (
                    <Chip
                      key={skill}
                      label={skill}
                      color="secondary"
                      variant="outlined"
                    />
                  ))}
                </Stack>
              </Box>
            ))}
          </Box>

          <Box>
            <Typography
              variant="h4"
              component="h2"
              gutterBottom
              sx={{ display: "flex", alignItems: "center", gap: 1 }}
            >
              <WorkIcon color="secondary" />{" "}
              <GradientText>Professional Experience</GradientText>
            </Typography>
            <Stack spacing={4} sx={{ mt: 4 }}>
              {(aboutData as any).experience.map((exp: any, index: number) => (
                <Card
                  key={index}
                  sx={{ borderLeft: 2, borderColor: "secondary.main" }}
                >
                  <CardContent>
                    <Typography variant="h6">{exp.title}</Typography>
                    <Typography variant="subtitle1" color="text.secondary">
                      {exp.company} | {exp.location} | {exp.date}
                    </Typography>
                    <Typography variant="body2" sx={{ mt: 1 }}>
                      {exp.description}
                    </Typography>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        cursor: "pointer",
                      }}
                      onClick={() => handleExpandClick(index)}
                    >
                      <Typography variant="caption">
                        Click to see more
                      </Typography>
                      <ExpandMore
                        expand={expanded[index]}
                        aria-expanded={expanded[index]}
                        aria-label="show more"
                      >
                        <ExpandMoreIcon />
                      </ExpandMore>
                    </Box>
                    <Collapse in={expanded[index]} timeout="auto" unmountOnExit>
                      <ul style={{ paddingLeft: "1.5rem", margin: 0 }}>
                        {exp.points.map((point: string, i: number) => (
                          <li key={i} style={{ marginBottom: "4px" }}>
                            {point}
                          </li>
                        ))}
                      </ul>
                    </Collapse>
                  </CardContent>
                </Card>
              ))}
            </Stack>
          </Box>

          <Box>
            <Typography
              variant="h4"
              component="h2"
              gutterBottom
              sx={{ display: "flex", alignItems: "center", gap: 1 }}
            >
              <SchoolIcon color="secondary" />{" "}
              <GradientText>Events</GradientText>
            </Typography>
            <Stack spacing={4} sx={{ mt: 4 }}>
              {aboutData.events.map((event: any, index: number) => (
                <Card key={index}>
                  <CardContent>
                    <Typography variant="h6">{event.title}</Typography>
                    <Typography variant="subtitle1" color="text.secondary">
                      {event.location}
                    </Typography>
                    <Typography variant="body2" sx={{ mt: 1 }}>
                      {event.description}
                    </Typography>
                  </CardContent>
                </Card>
              ))}
            </Stack>
          </Box>

          <Box>
            <Typography
              variant="h4"
              component="h2"
              gutterBottom
              sx={{ display: "flex", alignItems: "center", gap: 1 }}
            >
              <EmojiEventsIcon color="secondary" />{" "}
              <GradientText>Accomplishments</GradientText>
            </Typography>
            <List>
              {aboutData.accomplishments.map((acc: any, index: number) => (
                <ListItem key={index}>
                  <Typography variant="body1">
                    {acc.title} ({acc.year})
                  </Typography>
                </ListItem>
              ))}
            </List>
          </Box>
        </Stack>
      </Container>
    </Box>
  );
}
