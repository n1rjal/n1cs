"use client";

import AutoStoriesIcon from "@mui/icons-material/AutoStories";
import LightbulbIcon from "@mui/icons-material/Lightbulb";
import { Box, Container, Grid, Stack, Typography } from "@mui/material";
import Link from "next/link";
import type { Book, DeepThought } from "@/lib/notion";
import GradientText from "./GradientText";
import ViewAllLink from "./ViewAllLink";
import InView from "./motion/InView";
import getRelativeDuration from "@/utils/getRelativeDuration";
import { format } from "date-fns";

interface DeepThoughtsAndBooksSectionProps {
    deepThoughts: DeepThought[];
    books: Book[];
}

export default function DeepThoughtsAndBooksSection({
    deepThoughts,
    books,
}: DeepThoughtsAndBooksSectionProps) {
    return (
        <Box sx={{ bgcolor: "background.paper", py: 8 }}>
            <Container maxWidth="lg">
                <InView>
                    <Typography
                        variant="h3"
                        component="h2"
                        gutterBottom
                        mb={6}
                    >
                        <GradientText>Thoughts & Reading</GradientText>
                    </Typography>
                </InView>

                <Grid container spacing={6}>
                    {/* Deep Thoughts Column */}
                    <Grid size={{ xs: 12, md: 6 }}>
                        <InView>
                            <Box>
                                <Stack
                                    direction="row"
                                    alignItems="center"
                                    spacing={1}
                                    mb={2}
                                >
                                    <LightbulbIcon color="secondary" />
                                    <Typography variant="h5" component="h3">
                                        <GradientText>Deep Thoughts</GradientText>
                                    </Typography>
                                </Stack>
                                <Typography
                                    variant="body1"
                                    color="text.secondary"
                                    paragraph
                                    mb={3}
                                >
                                    Weekly logs, random musings, and ideas that I&apos;m exploring. A
                                    space for unfiltered thoughts and updates.
                                </Typography>

                                {/* Latest Deep Thoughts List */}
                                <Box>
                                    {deepThoughts.slice(0, 5).map((thought) => (
                                        <Link
                                            key={thought.id}
                                            href={`/deep-thoughts/${thought.id}`}
                                            style={{ textDecoration: "none" }}
                                        >
                                            <Stack
                                                direction="row"
                                                justifyContent="space-between"
                                                alignItems="center"
                                                py={1.5}
                                                borderBottom="1px dotted"
                                                borderColor="divider"
                                                sx={{
                                                    "&:hover .thought-title": {
                                                        color: "secondary.main",
                                                    },
                                                }}
                                            >
                                                <Typography
                                                    className="thought-title"
                                                    variant="body1"
                                                    color="text.primary"
                                                    sx={{
                                                        transition: "color 0.2s",
                                                        fontWeight: 400,
                                                        overflow: "hidden",
                                                        textOverflow: "ellipsis",
                                                        whiteSpace: "nowrap",
                                                        maxWidth: "70%",
                                                    }}
                                                >
                                                    {thought.title || "Untitled"}
                                                </Typography>
                                                <Typography
                                                    variant="body2"
                                                    color="text.secondary"
                                                    sx={{ whiteSpace: "nowrap", fontSize: "0.85rem" }}
                                                >
                                                    {getRelativeDuration(new Date(thought.createdTime))}
                                                </Typography>
                                            </Stack>
                                        </Link>
                                    ))}
                                </Box>

                                {deepThoughts.length > 5 && (
                                    <ViewAllLink href="/deep-thoughts" label="View all deep thoughts" />
                                )}
                            </Box>
                        </InView>
                    </Grid>

                    {/* Books Column */}
                    <Grid size={{ xs: 12, md: 6 }}>
                        <InView>
                            <Box>
                                <Stack
                                    direction="row"
                                    alignItems="center"
                                    spacing={1}
                                    mb={2}
                                >
                                    <AutoStoriesIcon color="secondary" />
                                    <Typography variant="h5" component="h3">
                                        <GradientText>Books I Read</GradientText>
                                    </Typography>
                                </Stack>
                                <Typography
                                    variant="body1"
                                    color="text.secondary"
                                    paragraph
                                    mb={3}
                                >
                                    Books that I have read, am reading, or plan to read. Tracking
                                    my reading journey with notes and progress.
                                </Typography>

                                {/* Latest Books List */}
                                <Box>
                                    {books.slice(0, 5).map((book) => (
                                        <Link
                                            key={book.id}
                                            href={`/books/${book.id}`}
                                            style={{ textDecoration: "none" }}
                                        >
                                            <Stack
                                                direction="row"
                                                justifyContent="space-between"
                                                alignItems="center"
                                                py={1.5}
                                                borderBottom="1px dotted"
                                                borderColor="divider"
                                                sx={{
                                                    "&:hover .book-title": {
                                                        color: "secondary.main",
                                                    },
                                                }}
                                            >
                                                <Typography
                                                    className="book-title"
                                                    variant="body1"
                                                    color="text.primary"
                                                    sx={{
                                                        transition: "color 0.2s",
                                                        fontWeight: 400,
                                                        overflow: "hidden",
                                                        textOverflow: "ellipsis",
                                                        whiteSpace: "nowrap",
                                                        maxWidth: "70%",
                                                    }}
                                                >
                                                    {book.title}
                                                </Typography>
                                                <Typography
                                                    variant="body2"
                                                    color="text.secondary"
                                                    sx={{ whiteSpace: "nowrap", fontSize: "0.85rem" }}
                                                >
                                                    {book.readPercentage}% read
                                                </Typography>
                                            </Stack>
                                        </Link>
                                    ))}
                                </Box>

                                {books.length > 5 && (
                                    <ViewAllLink href="/books" label="View all books" />
                                )}
                            </Box>
                        </InView>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
}

