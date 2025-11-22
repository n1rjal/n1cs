import { Box, Grid, Stack, Typography } from "@mui/material";
import { format } from "date-fns";
import type { Metadata } from "next";
import DeepThoughtCard from "@/components/DeepThoughtCard";
import GradientText from "@/components/GradientText";
import ResponsiveGrid from "@/components/ResponsiveGrid";
import InView from "@/components/motion/InView";
import { getDeepThoughts, type DeepThought } from "@/lib/notion";

export const metadata: Metadata = {
    title: "Deep Thoughts",
    description:
        "A collection of my weekly logs, random musings, and deep thoughts.",
};

type DeepThoughtsGrouped = { [key: string]: DeepThought[] };

export default async function DeepThoughtsPage() {
    const thoughts = await getDeepThoughts();

    const groupedByDate: DeepThoughtsGrouped = thoughts.reduce((acc, item) => {
        // Group by Month Year
        const date = format(new Date(item.createdTime), "MMMM yyyy");
        if (!acc[date]) {
            acc[date] = [];
        }
        acc[date].push(item);
        return acc;
    }, {} as DeepThoughtsGrouped);

    // Sort dates in descending order
    const sortedDates = Object.keys(groupedByDate).sort((a, b) => {
        const [monthA, yearA] = a.split(" ");
        const [monthB, yearB] = b.split(" ");

        const dateA = new Date(`${monthA} 1, ${yearA}`);
        const dateB = new Date(`${monthB} 1, ${yearB}`);

        return dateB.getTime() - dateA.getTime();
    });

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
                            <GradientText>Deep Thoughts</GradientText>
                        </Typography>

                        <Typography variant="body1" color="textSecondary">
                            Weekly logs, random musings, and ideas that I&apos;m exploring. A space
                            for unfiltered thoughts and updates.
                        </Typography>
                    </Box>
                </InView>

                <Stack direction="column" rowGap="1rem">
                    {sortedDates.length === 0 ? (
                        <Typography variant="body1">No deep thoughts found.</Typography>
                    ) : (
                        sortedDates.map((date) => (
                            <InView key={date} stagger={0.08}>
                                <Box sx={{ my: 4 }}>
                                    <Typography variant="h5" component="h2" gutterBottom>
                                        <GradientText>{date}</GradientText>
                                    </Typography>
                                    <Grid container spacing={1} sx={{ mt: 0 }}>
                                        {groupedByDate[date].map((thought) => (
                                            <Grid size={{ xs: 12 }} key={thought.id} sx={{ width: "100%" }}>
                                                <DeepThoughtCard thought={thought} />
                                            </Grid>
                                        ))}
                                    </Grid>
                                </Box>
                            </InView>
                        ))
                    )}
                </Stack>
            </Box>
        </ResponsiveGrid>
    );
}
