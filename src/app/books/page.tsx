import { Box, Grid, Typography } from "@mui/material";
import type { Metadata } from "next";
import BookCard from "@/components/BookCard";
import GradientText from "@/components/GradientText";
import ResponsiveGrid from "@/components/ResponsiveGrid";
import InView from "@/components/motion/InView";
import { getBooks } from "@/lib/notion";

export const metadata: Metadata = {
    title: "Books I Read",
    description:
        "A tracking of books I've read or am currently reading, with my personal notes and reviews.",
};

export default async function BooksPage() {
    const books = await getBooks();

    return (
        <ResponsiveGrid>
            <Box sx={{ my: "10px" }}>
                <InView>
                    <Box my="20px" mb="30px">
                        <Typography
                            component="h3"
                            variant="h3"
                            color="textSecondary"
                            gutterBottom
                        >
                            <GradientText>Books I Read</GradientText>
                        </Typography>

                        <Typography variant="body1" color="textSecondary">
                            Books that I have read, am reading, or plan to read. Includes my
                            personal ratings, notes, and progress.
                        </Typography>
                    </Box>
                </InView>

                <InView stagger={0.08}>
                    <Box>
                        {books.length === 0 ? (
                            <Typography variant="body1">No books found.</Typography>
                        ) : (
                            <Grid container spacing={4} sx={{ mt: 0 }}>
                                {books.map((book) => (
                                    <Grid size={{ xs: 12 }} key={book.id} sx={{ width: "100%" }} component="div">
                                        <BookCard book={book} />
                                    </Grid>
                                ))}
                            </Grid>
                        )}
                    </Box>
                </InView>
            </Box>
        </ResponsiveGrid>
    );
}
