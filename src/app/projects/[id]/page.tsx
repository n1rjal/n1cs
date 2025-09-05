import { Typography, Container, Box } from "@mui/material";
import { Metadata } from "next";
import { getPostContent, getSingleProject } from "@/lib/notion";
import ContentWrapper from "@/components/ContentWrapper";
import ResponsiveGrid from "@/components/ResponsiveGrid";
import ProjectHeader from "@/components/ProjectHeader";
import ReadingProgressBar from "@/components/ReadingProgressBar";

interface ProjectDetailPageProps {
  params: { id: string };
  searchParams?: { [key: string]: string | string[] | undefined };
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const project = await getSingleProject(id);

  if (!project) {
    return {
      title: "Project Not Found",
      description: "The project you are looking for does not exist.",
    };
  }

  return {
    title: project.name,
    description: project.description,
    openGraph: {
      images: [{ url: project.imageUrl }], // must be array of objects
    },
  };
}
export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const project = await getSingleProject(id);
  const { content, headings } = await getPostContent(id);

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
    <ResponsiveGrid py="20px">
      <ReadingProgressBar />
      <Box my="40px">
        <ProjectHeader project={project} renderGradient />
        <ContentWrapper content={content} headings={headings} />
      </Box>
    </ResponsiveGrid>
  );
}
