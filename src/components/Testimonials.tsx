import FormatQuoteIcon from "@mui/icons-material/FormatQuote";
import { Stack } from "@mui/material";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import testimonials from "@/constants/testomonials";
import GradientText from "./GradientText";
import InView from "./motion/InView";

export default function Testimonials() {
  return (
    <Box
      sx={{
        bgcolor: "background.default",
        pt: 8,
        pb: 6,
      }}
    >
      <Container maxWidth="md">
        <InView>
          <Typography component="h2" variant="h4" align="center" gutterBottom>
            <GradientText>Testimonials</GradientText>
          </Typography>

        <Typography variant="body1" color="textSecondary">
          The best reflections of my work come from the people I&apos;ve worked with.
          Their words capture the craft, collaboration, and impact behind every
          project. Here are some of their experiences.
        </Typography>
        </InView>
        
        <InView stagger={0.1}>
          <Grid container spacing={4} sx={{ mt: 4 }}>
            {testimonials.map((testimonial: any, index) => (
              <Grid key={index}>
                <Card sx={{ height: "100%" }}>
                  <CardContent>
                    <Stack
                      p={4}
                      direction="column"
                      justifyContent="center"
                      alignItems="center"
                    >
                      <FormatQuoteIcon
                        color="secondary"
                        sx={{ fontSize: "5rem" }}
                      />
                      <Typography variant="body1" fontWeight={600}>
                        {testimonial.quote}
                      </Typography>
                    </Stack>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        mt: 2,
                        flexDirection: "column",
                      }}
                    >
                      <Typography
                        variant="subtitle1"
                        color="text.primary"
                        fontSize="1.3rem"
                      >
                        {testimonial.author}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {testimonial.position}
                      </Typography>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </InView>
      </Container>
    </Box>
  );
}
