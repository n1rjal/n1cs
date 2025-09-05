import { Typography, Box, Container, Chip } from "@mui/material";
import { Metadata } from 'next';
import { getPostContent, getSingleProject } from "@/lib/notion";
import Image from "next/image";
import ContentWrapper from "@/components/ContentWrapper";

interface ProjectDetailPageProps {
  params: { id: string };
}

export async function generateMetadata({ params }: ProjectDetailPageProps): Promise<Metadata> {
  const project = await getSingleProject(params.id);

  if (!project) {
    return {
      title: 'Project Not Found',
      description: 'The project you are looking for does not exist.',
    };
  }

  return {
    title: project.name,
    description: project.description,
    openGraph: {
      images: [project.imageUrl],
    },
  };
}

export default async function ProjectDetailPage({
  params,
}: ProjectDetailPageProps) {
  const project = await getSingleProject(params.id);
  const { content, headings } = await getPostContent(params.id);

  if (!project || !content) {
    return (
      <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
        <Typography variant="h5" color="error">
          Project not found.
        </Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
      <Box sx={{ my: 4 }}>
        <Typography variant="h3" component="h1" gutterBottom>
          {project.name}
        </Typography>
        {project.imageUrl && (
          <Box sx={{ mb: 3 }}>
            <Image
              src={project.imageUrl}
              alt={project.name}
              width={700}
              height={400}
              layout="responsive"
              objectFit="cover"
              style={{ borderRadius: "8px" }}
            />
          </Box>
        )}
        <Typography variant="body1" paragraph>
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

        <ContentWrapper content={content} headings={headings} />
      </Box>
    </Container>
  );
}
