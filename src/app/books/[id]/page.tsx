import { Box, Chip, Container, Typography } from "@mui/material";
import { format } from "date-fns";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ContentWrapper from "@/components/ContentWrapper";
import GradientText from "@/components/GradientText";
import { getPostContent, getSingleBook } from "@/lib/notion";
import MarkdownRenderer from "@/components/MarkdownRenderer";

export const revalidate = 3600; // Revalidate every hour

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const book = await getSingleBook(id);

  if (!book) {
    return {
      title: "Book Not Found",
    };
  }

  return {
    title: `${book.title} | Books I Read`,
    description: book.summary || `Notes on ${book.title} by ${book.author}`,
  };
}

export default async function BookDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const book = await getSingleBook(id);

  if (!book) {
    notFound();
  }

  const { headings } = await getPostContent(book.id);

  // Determine progress color
  const getProgressColor = (percentage: number) => {
    if (percentage >= 100) return "success";
    if (percentage > 0) return "info";
    return "default";
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 8 }}>
      <Box mb={4}>
        <Typography variant="h3" component="h1" gutterBottom fontWeight="bold">
          <GradientText>{book.title}</GradientText>
        </Typography>

        <Box display="flex" alignItems="center" gap={2} mb={2} flexWrap="wrap">
          <Typography variant="h6" color="text.primary">
            by {book.author}
          </Typography>

          <Chip
            label={`${book.readPercentage}% complete`}
            size="small"
            color={getProgressColor(book.readPercentage)}
            variant={getProgressColor(book.readPercentage) === "default" ? "outlined" : "filled"}
          />
        </Box>

        {book.dateRead && (
          <Typography variant="subtitle1" color="text.secondary" gutterBottom>
            Read on {format(new Date(book.dateRead), "MMMM d, yyyy")}
          </Typography>
        )}

        {book.summary && (
          <Typography
            variant="body1"
            color="text.secondary"
            sx={{ fontStyle: "italic", mt: 2, borderLeft: "4px solid", borderColor: "divider", pl: 2 }}
          >
            {book.summary}
          </Typography>
        )}
      </Box>

      <Box component="hr" my={4} />

      <MarkdownRenderer content={book.content} />
    </Container>
  );
}

