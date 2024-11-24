import React from "react";
import PlaceList from "../components/PlaceList";
import { Container, Typography } from "@mui/material";

export default function Home() {
  const lon = 37.6173; // Longitude
  const lat = 55.7558; // Latitude (contoh: Moskow, Rusia)

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Nearby Places
      </Typography>
      <PlaceList lon={lon} lat={lat} radius={5000} />
    </Container>
  );
}
