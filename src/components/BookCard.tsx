"use client";

import {
    Card,
    CardContent,
    Stack,
    Typography,
} from "@mui/material";
import { format } from "date-fns";
import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import type { Book } from "@/lib/notion";
import { hoverLiftSubtle, tapPress } from "./motion/MotionUtils";
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import CircleIcon from '@mui/icons-material/Circle';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';

interface BookCardProps {
    book: Book;
}

function BookCard({ book }: BookCardProps) {
    const shouldReduceMotion = useReducedMotion();

    // Determine progress color based on percentage
    const getProgressColor = (percentage: number) => {
        if (percentage >= 100) return "success.main";
        if (percentage > 0) return "info.main";
        return "text.disabled";
    };

    return (
        <motion.div
            whileHover={shouldReduceMotion ? {} : hoverLiftSubtle}
            whileTap={shouldReduceMotion ? {} : tapPress}
            style={{ height: "100%", width: "100%" }}
        >
            <Link
                href={`/books/${book.id}`}
                style={{ textDecoration: "none" }}
            >
                <Card sx={{ mt: "5px", py: "10px", px: "3px", height: "100%" }}>
                    <CardContent sx={{ m: "2px", py: "2px" }}>
                        <Typography variant="h5" component="h2" my={0} gutterBottom>
                            {book.title}
                        </Typography>

                        <Stack alignItems="center" direction="row" columnGap={"16px"} useFlexGap>
                            {book.dateRead && (
                                <Stack
                                    alignItems="center"
                                    direction="row"
                                    columnGap={"4px"}
                                    useFlexGap
                                >
                                    <CalendarTodayIcon fontSize="small" color="disabled" />
                                    <Typography
                                        variant="body1"
                                        color="text.secondary"
                                        gutterBottom
                                        my={0}
                                        mb={0.5}
                                        component="p"
                                    >
                                        {format(new Date(book.dateRead), "MMM d, yyyy")}
                                    </Typography>
                                </Stack>
                            )}

                            <Stack
                                alignItems="center"
                                direction="row"
                                columnGap={"4px"}
                                useFlexGap
                            >
                                <Typography
                                    variant="body1"
                                    color="text.secondary"
                                    gutterBottom
                                    my={0}
                                    mb={0.5}
                                    component="p"
                                >
                                    {book.readPercentage}% read
                                </Typography>
                            </Stack>

                            {book.author && (
                                <Stack
                                    alignItems="center"
                                    direction="row"
                                    columnGap={"4px"}
                                    useFlexGap
                                >
                                    <PersonOutlineIcon fontSize="small" color="disabled" />
                                    <Typography
                                        variant="body1"
                                        color="text.secondary"
                                        gutterBottom
                                        my={0}
                                        mb={0.5}
                                        component="p"
                                    >
                                        {book.author}
                                    </Typography>
                                </Stack>
                            )}

                        </Stack>

                        {book.summary && (
                            <Typography
                                component="p"
                                my={2}
                                variant="body1"
                                color="text.secondary"
                                sx={{
                                    display: "-webkit-box",
                                    WebkitLineClamp: 2,
                                    WebkitBoxOrient: "vertical",
                                    overflow: "hidden",
                                    textOverflow: "ellipsis",
                                    lineHeight: "1.5rem",
                                }}
                            >
                                {book.summary}
                            </Typography>
                        )}
                    </CardContent>
                </Card>
            </Link>
        </motion.div>
    );
}

export default BookCard;
