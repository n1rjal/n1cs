"use client";

import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { useEffect, useState } from "react";

import GradientText from "./GradientText";

export default function Testimonials() {
  const [testimonials, setTestimonials] = useState([]);

  useEffect(() => {
    fetch("/testimonials.json")
      .then((res) => res.json())
      .then((data) => setTestimonials(data));
  }, []);

  return (
    <Box
      sx={{
        bgcolor: "background.default",
        pt: 8,
        pb: 6,
      }}
    >
      <Container maxWidth="md">
        <Typography component="h2" variant="h4" align="center" gutterBottom>
          <GradientText>Testimonials</GradientText>
        </Typography>
        <Grid container spacing={4} sx={{ mt: 4 }}>
          {testimonials.map((testimonial: any, index) => (
            <Grid key={index}>
              <Card sx={{ height: "100%" }}>
                <CardContent>
                  <Typography variant="body1" sx={{ fontStyle: "italic" }}>
                    “{testimonial.quote}”
                  </Typography>
                  <Box sx={{ display: "flex", alignItems: "center", mt: 2 }}>
                    <Avatar sx={{ bgcolor: "secondary.main", mr: 2 }}>
                      {testimonial.author.charAt(0)}
                    </Avatar>
                    <Box>
                      <Typography variant="subtitle1">
                        {testimonial.author}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {testimonial.date}{" "}
                        {testimonial.verified && " - Verified"}
                      </Typography>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
