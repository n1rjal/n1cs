import { Box, Container, Typography } from "@mui/material";
import type { Metadata } from "next";
import ContentWrapper from "@/components/ContentWrapper";
import NewsletterSubscribe from "@/components/NewsletterSubscribe";
import ProjectHeader from "@/components/ProjectHeader";
import ReadingProgressBar from "@/components/ReadingProgressBar";
import ResponsiveGrid from "@/components/ResponsiveGrid";
import { getPostContent, getProjects, getSingleProject } from "@/lib/notion";

export const revalidate = 3600; // 1 hour

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
      images: project.imageUrl
        ? [
            {
              url: project.imageUrl,
            },
          ]
        : [],
    },
  };
}

export async function generateStaticParams() {
  const projects = await getProjects();
  return projects.map((p) => ({ id: p.id }));
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
        <Box my="20px">
          <NewsletterSubscribe />
        </Box>
      </Box>
    </ResponsiveGrid>
  );
}
