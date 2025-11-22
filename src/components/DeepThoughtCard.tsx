"use client";

import {
    Box,
    Stack,
    Typography,
} from "@mui/material";
import { format } from "date-fns";
import Link from "next/link";
import type { DeepThought } from "@/lib/notion";
import getRelativeDuration from "@/utils/getRelativeDuration";

interface DeepThoughtCardProps {
    thought: DeepThought;
}

function DeepThoughtCard({ thought }: DeepThoughtCardProps) {
    return (
        <Link
            href={`/deep-thoughts/${thought.id}`}
            style={{ textDecoration: "none" }}
        >
            <Stack
                alignItems="center"
                direction="row"
                useFlexGap
                borderBottom="1px dotted"
                py="10px"
                borderColor="divider"
                justifyContent="space-between"
            >
                <Typography
                    variant="body1"
                    component="h2"
                    className="thought-title"
                    sx={{
                        color: "text.primary",
                        transition: "color 0.2s",
                        fontWeight: 400,
                    }}
                >
                    {thought.title || "Untitled"}
                </Typography>
                <Typography
                    variant="body1"
                    color="text.secondary"
                    gutterBottom
                    my={0}
                    component="p"
                >
                    {getRelativeDuration(new Date(thought.createdTime))}
                </Typography>
            </Stack>
        </Link>
    );
}
export default DeepThoughtCard;
