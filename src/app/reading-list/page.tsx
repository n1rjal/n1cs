import {
  Box,
  Button,
  Container,
  Link as MuiLink,
  TextField,
  Typography,
} from "@mui/material";
import { format } from "date-fns";
import type { Metadata } from "next";
import GradientText from "@/components/GradientText";
import { getReadingListItems, type ReadingListItem } from "@/lib/notion";

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

      <Box
        component="form"
        sx={{ mb: 4, display: "flex", gap: 2, flexWrap: "wrap" }}
      >
        <TextField
          label="Search"
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
        <Button type="submit" variant="contained" color="primary">
          Apply Filters
        </Button>
      </Box>

      {sortedDates.length === 0 ? (
        <Typography variant="body1">No reading list items found.</Typography>
      ) : (
        sortedDates.map((date) => (
          <Box key={date} sx={{ mb: 4 }}>
            <Typography variant="h5" component="h2" gutterBottom>
              {date}
            </Typography>
            <Box>
              {groupedByDate[date].map((item) => (
                <Box key={item.id} sx={{ mb: 2 }}>
                  <Typography variant="h6" component="h6">
                    <MuiLink
                      href={item.url}
                      target="_blank"
                      rel="noopener"
                      sx={{
                        textDecoration: "none",
                        ml: "20px",
                        my: "2px",
                        fontSize: "15px",
                      }}
                    >
                      # {item.title}
                    </MuiLink>
                  </Typography>
                  {item.description && (
                    <Typography variant="body2" color="text.secondary">
                      {item.description}
                    </Typography>
                  )}
                </Box>
              ))}
            </Box>
          </Box>
        ))
      )}
    </Container>
  );
}
