import React, { useEffect } from "react";
import PlaceList from "../components/PlaceList";
import { Container, Typography } from "@mui/material";
import MapboxMap from "@/components/MapBox";
import PlaceFilter from "@/components/PlaceFilter";
import { observer } from "mobx-react-lite";
import { placeStore } from "@/stores/placeStore";

const Home = observer(() => {
  useEffect(() => {
    const initialize = async () => {
      if (navigator.geolocation) {
        await placeStore.loadUserLocation();
        console.log("User Location di store:", placeStore.userLocation);
        console.log("Viewport di store:", placeStore.viewport);

        // Validasi jika userLocation tersedia
        if (placeStore.userLocation) {
          const { longitude, latitude } = placeStore.userLocation;

          if (longitude && latitude) {
            await placeStore.loadPlaces(longitude, latitude, 5000);
          }
        } else {
          // Fallback ke lokasi default (Jakarta)
          await placeStore.loadPlaces(106.8272, -6.1751, 5000);
        }
      } else {
        // Jika geolokasi tidak tersedia
        await placeStore.loadPlaces(106.8272, -6.1751, 5000);
        alert("Browser Anda tidak mendukung geolocation. Default ke Jakarta.");
      }
    };

    initialize();
  }, []);

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Nearby Places
      </Typography>
      <MapboxMap userLocation={placeStore.userLocation} places={placeStore.places} />
      <PlaceFilter />
      {placeStore.filteredPlaces && (
        <PlaceList/>
      )}
    </Container>
  );
});

export default Home;
