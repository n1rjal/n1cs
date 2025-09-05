"use client";

import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { styled } from "@mui/material/styles";
import CodeIcon from "@mui/icons-material/Code";
import WorkIcon from "@mui/icons-material/Work";
import SchoolIcon from "@mui/icons-material/School";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import { Chip, List, ListItem, Collapse, IconButton } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import GradientText from "./GradientText";

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function AboutPageClient() {
  const [aboutData, setAboutData] = useState<any>(null);
  const [expanded, setExpanded] = useState({});

  useEffect(() => {
    fetch("/about.json")
      .then((res) => res.json())
      .then((data) => setAboutData(data));
  }, []);

  const handleExpandClick = (id) => {
    setExpanded((prev) => ({ ...prev, [id]: !prev[id] }));
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
          <Typography variant="h5" color="text.secondary" paragraph>
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
                  {skills.map((skill) => (
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
              {aboutData.experience.map((exp, index) => (
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
                        {exp.points.map((point, i) => (
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
              {aboutData.events.map((event, index) => (
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
              {aboutData.accomplishments.map((acc, index) => (
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
