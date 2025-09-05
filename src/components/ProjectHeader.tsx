import { Project } from "@/lib/notion";
import { Box, Chip, Typography } from "@mui/material";
import GradientText from "./GradientText";

interface BlogHeaderProps {
  project: Project;
  renderGradient?: boolean;
}

const ProjectHeader = ({ project, renderGradient }: BlogHeaderProps) => (
  <>
    {renderGradient ? (
      <Typography variant="h3" component="h1" my={0} gutterBottom>
        <GradientText>{project.name}</GradientText>
      </Typography>
    ) : (
      <Typography variant="h3" component="h1" my={0} gutterBottom>
        {project.name}
      </Typography>
    )}

    <Typography component="p" my={2}>
      {project.description}
    </Typography>

    <Box sx={{ mb: 3, display: "flex", gap: 1 }}>
      {project.liveUrl && (
        <Chip
          label="Live Demo"
          component="a"
          href={project.liveUrl}
          target="_blank"
          clickable
          color="primary"
          variant="outlined"
        />
      )}
      {project.githubUrl && (
        <Chip
          label="GitHub"
          component="a"
          href={project.githubUrl}
          target="_blank"
          clickable
          color="secondary"
          variant="outlined"
        />
      )}
    </Box>
  </>
);

export default ProjectHeader;
