import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import type { Metadata } from "next";
import GradientText from "@/components/GradientText";
import ProjectCard from "@/components/ProjectCard";
import ResponsiveGrid from "@/components/ResponsiveGrid";
import { getProjects } from "@/lib/notion";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Explore a collection of projects developed by Nirjal Paudel, showcasing expertise in various technologies and problem-solving.",
};

export default async function ProjectsPage() {
  const notionProjects = await getProjects();
  const dummyProjects = [
    {
      name: "My Awesome Project (Dummy)",
      description:
        "A brief description of my awesome project. It does amazing things and solves real-world problems.",
      liveUrl: "https://example.com",
      githubUrl: "https://github.com/n1rjal/n1cs",
      tags: ["tag1", "tag2"],
    },
    {
      name: "Another Cool Project (Dummy)",
      description:
        "This project is also very cool. It demonstrates my skills in various technologies.",
      liveUrl: "https://another-example.com",
      githubUrl: "https://github.com/mui/material-ui",
      tags: ["tag1", "tag2"],
    },
    {
      name: "Simple CLI Tool (Dummy)",
      description:
        "A command-line interface tool for automating daily tasks. Written in Python.",
      githubUrl: "https://github.com/pallets/flask",
      tags: ["tag1", "tag2"],
    },
    {
      name: "Personal Website (Dummy)",
      description:
        "This is my personal website, built with Next.js and Material-UI.",
      liveUrl: "https://nirjalpaudel.com.np",
      githubUrl: "https://github.com/n1rjal/n1cs",
      tags: ["tag1", "tag2"],
    },
  ];

  const projects = notionProjects.length > 0 ? notionProjects : dummyProjects;

  return (
    <ResponsiveGrid>
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          <GradientText>My Projects</GradientText>
        </Typography>
        <Typography variant="body1" paragraph>
          Here are some of the projects I&apos;ve worked on. Click on them to
          learn more!
        </Typography>
      </Box>
      <Grid container spacing={4}>
        {projects.map((project: any) => (
          <Grid key={project.id || project.name}>
            <ProjectCard {...project} />
          </Grid>
        ))}
      </Grid>
    </ResponsiveGrid>
  );
}
