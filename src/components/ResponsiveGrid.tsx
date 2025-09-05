"use client";
import Grid, { type GridProps } from "@mui/material/Grid";
import type { ReactNode } from "react";

interface IResponsiveGridProps extends GridProps {
  children: ReactNode | ReactNode[];
}

export default function ResponsiveGrid({
  children,
  ...props
}: IResponsiveGridProps) {
  return (
    <Grid
      container
      spacing={{ lg: 4, xs: 0, md: 2 }}
      justifyContent="center"
      width="100%"
      maxWidth="100%"
      minHeight="100%"
      height="fit-content"
      py={{
        lg: "10px",
        sm: "20px",
        xs: "20px",
      }}
      px="0"
      {...props}
    >
      <Grid size={{ xs: 11, sm: 10, md: 8 }} sx={{ mx: "auto" }}>
        {children}
      </Grid>
    </Grid>
  );
}
