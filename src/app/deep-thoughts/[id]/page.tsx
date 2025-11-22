import { Alert, Box, Container, Typography } from "@mui/material";
import WarningAmberOutlinedIcon from "@mui/icons-material/WarningAmberOutlined";
import { format } from "date-fns";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ContentWrapper from "@/components/ContentWrapper";
import GradientText from "@/components/GradientText";
import { getPostContent, getSingleDeepThought } from "@/lib/notion";
import MarkdownRenderer from "@/components/MarkdownRenderer";

export const revalidate = 3600; // Revalidate every hour

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const thought = await getSingleDeepThought(id);

  if (!thought) {
    return {
      title: "Deep Thought Not Found",
    };
  }

  return {
    title: `${thought.title} | Deep Thoughts`,
    description: thought.content.substring(0, 160),
  };
}

export default async function DeepThoughtPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const thought = await getSingleDeepThought(id);

  if (!thought) {
    notFound();
  }

  const { headings } = await getPostContent(thought.id);

  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 8 }}>
      <Box mb={2}>
        <Typography variant="h3" component="h1" gutterBottom fontWeight="bold">
          <GradientText>{thought.title}</GradientText>
        </Typography>
        <Typography variant="subtitle1" color="text.secondary">
          {format(new Date(thought.createdTime), "MMMM d, yyyy")}
        </Typography>
      </Box>


      <Box component="hr" my={2} sx={{ borderColor: "divider" }} />

      <MarkdownRenderer content={thought.content} />

      <Alert
        severity="warning"
        variant="outlined"
        icon={<WarningAmberOutlinedIcon fontSize="small" />}
        sx={{
          my: 2,
          borderRadius: 2,
          backgroundColor: 'transparent',
          '& .MuiAlert-message': {
            width: '100%',
          },
          '& .MuiAlert-icon': {
            opacity: 0.7,
          }
        }}
      >
        <Typography variant="body2" sx={{ fontStyle: 'italic', opacity: 0.85 }}>
          This is a thought of mine — it can change over time, and I&apos;m only human after all.
          I evolve, may disagree with you now, but hopefully we may agree on a few things.
        </Typography>
      </Alert>
    </Container>
  );
}

