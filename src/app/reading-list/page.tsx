import { getReadingListItems } from "@/lib/notion";
import { Typography, Box, Container, TextField, Button, Link as MuiLink } from "@mui/material";
import { format } from "date-fns";
import { useState } from "react";

export default async function ReadingListPage({
  searchParams,
}: {
  searchParams: { startDate?: string; endDate?: string; query?: string };
}) {
  const { startDate, endDate, query } = searchParams;
  const readingList = await getReadingListItems(startDate, endDate, query);

  const groupedByDate: { [key: string]: typeof readingList } = readingList.reduce(
    (acc, item) => {
      const date = format(new Date(item.date), "yyyy-MM-dd");
      if (!acc[date]) {
        acc[date] = [];
      }
      acc[date].push(item);
      return acc;
    },
    {},
  );

  const sortedDates = Object.keys(groupedByDate).sort((a, b) => b.localeCompare(a));

  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h3" component="h1" gutterBottom>
        Reading List
      </Typography>

      <Box component="form" sx={{ mb: 4, display: "flex", gap: 2, flexWrap: "wrap" }}>
        <TextField
          label="Search"
          name="query"
          defaultValue={query}
          variant="outlined"
          size="small"
        />
        <TextField
          label="Start Date"
          name="startDate"
          type="date"
          defaultValue={startDate}
          InputLabelProps={{ shrink: true }}
          variant="outlined"
          size="small"
        />
        <TextField
          label="End Date"
          name="endDate"
          type="date"
          defaultValue={endDate}
          InputLabelProps={{ shrink: true }}
          variant="outlined"
          size="small"
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
              {format(new Date(date), "MMMM d, yyyy")}
            </Typography>
            <Box>
              {groupedByDate[date].map((item) => (
                <Box key={item.id} sx={{ mb: 2 }}>
                  <Typography variant="h6" component="h3">
                    <MuiLink href={item.url} target="_blank" rel="noopener" sx={{ textDecoration: "none" }}>
                      {item.title}
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
