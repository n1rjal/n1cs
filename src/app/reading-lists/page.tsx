import { Metadata } from "next";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import { getReadingListItems, ReadingListItem } from "@/lib/notion";
import {
  Typography,
  Box,
  Container,
  TextField,
  Button,
  Grid,
  Stack,
} from "@mui/material";
import { format } from "date-fns";
import GradientText from "@/components/GradientText";
import ReadingListCard from "@/components/ReadingListCard";

export const metadata: Metadata = {
  title: "Reading List",
  description:
    "Explore the books, articles, and resources that Nirjal Paudel is currently reading or has read.",
};

type ReadingListGrouped = { [key: string]: ReadingListItem[] };

export default async function ReadingListPage({
  searchParams,
}: {
  searchParams: Promise<{
    query: string;
    startDate: string;
    endDate: string;
  }>;
}) {
  const { startDate, endDate, query } = await searchParams;

  const readingList = await getReadingListItems(startDate, endDate, query);

  const groupedByDate: ReadingListGrouped = readingList.reduce((acc, item) => {
    const date = format(new Date(item.date), "MMMM yyyy");
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(item);
    return acc;
  }, {} as ReadingListGrouped);

  // Sort dates in descending order (e.g., "December 2023" before "November 2023")
  const sortedDates = Object.keys(groupedByDate).sort((a, b) => {
    const [monthA, yearA] = a.split(" ");
    const [monthB, yearB] = b.split(" ");

    const dateA = new Date(`${monthA} 1, ${yearA}`);
    const dateB = new Date(`${monthB} 1, ${yearB}`);

    return dateB.getTime() - dateA.getTime();
  });

  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h3" component="h1" gutterBottom>
        <GradientText>Reading List</GradientText>
      </Typography>

      <Typography component="p" color="textSecondary" gutterBottom>
        I like to keep a curated collection of articles, essays, and resources
        that catch my attention — things I find worth reading, learning from, or
        sharing. This reading list reflects my curiosity, interests, and the
        ideas that inspire me, offering a glimpse into the content that shapes
        my thinking and growth.
      </Typography>

      <Box component="hr" my="2rem" />

      <Box
        component="form"
        sx={{ mb: 4, display: "flex", gap: 2, flexWrap: "wrap" }}
      >
        <TextField
          label="Search Query"
          name="query"
          defaultValue={query}
          variant="outlined"
          size="small"
          sx={{ flexGrow: 1, minWidth: { xs: "100%", sm: "auto" } }}
        />
        <TextField
          label="Start Date"
          name="startDate"
          type="date"
          defaultValue={startDate}
          InputLabelProps={{ shrink: true }}
          variant="outlined"
          size="small"
          sx={{ flexGrow: 1, minWidth: { xs: "100%", sm: "auto" } }}
        />
        <TextField
          label="End Date"
          name="endDate"
          type="date"
          defaultValue={endDate}
          InputLabelProps={{ shrink: true }}
          variant="outlined"
          size="small"
          sx={{ flexGrow: 1, minWidth: { xs: "100%", sm: "auto" } }}
        />
        <Button variant="contained" color="secondary" type="submit">
          Search
        </Button>
      </Box>

      <Stack direction="column" rowGap="1rem">
        {sortedDates.length === 0 ? (
          <Typography variant="body1">No reading list items found.</Typography>
        ) : (
          sortedDates.map((date) => (
            <Box key={date} sx={{ my: 4 }}>
              <Typography variant="h5" component="h2" gutterBottom>
                <GradientText>{date}</GradientText>
              </Typography>
              <Grid container spacing="10px">
                {groupedByDate[date].map((item) => (
                  <Grid
                    size={{
                      xs: 12,
                      sm: 12,
                      md: 4,
                      lg: 4,
                      xl: 4,
                    }}
                    key={item.id}
                  >
                    <ReadingListCard {...{ item }} />
                  </Grid>
                ))}
              </Grid>
            </Box>
          ))
        )}
      </Stack>
    </Container>
  );
}
