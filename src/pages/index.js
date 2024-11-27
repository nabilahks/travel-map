import React, { useEffect } from "react";
import PlaceList from "../components/PlaceList";
import { Box, CircularProgress, Container, Grid, Grid2, Typography } from "@mui/material";
import MapboxMap from "@/components/MapBox";
import PlaceFilter from "@/components/PlaceFilter";
import { observer } from "mobx-react-lite";
import { placeStore } from "@/stores/placeStore";
import Loader from "@/components/Loader";
import LocationSearch from "@/components/LocationSearch";

const Home = observer(() => {
  useEffect(() => {
    const initialize = async () => {
      placeStore.setIsLoading(true)
      if (navigator.geolocation) {
        await placeStore.loadUserLocation();

        // Validasi jika userLocation tersedia
        if (placeStore.userLocation) {
          const { longitude, latitude } = placeStore.userLocation;

          if (longitude && latitude) {
            await placeStore.loadPlaces(longitude, latitude);
          }
        } else {
          // Fallback ke lokasi default (Jakarta)
          await placeStore.loadPlaces(106.8272, -6.1751);
        }
      } else {
        // Jika geolokasi tidak tersedia
        await placeStore.loadPlaces(106.8272, -6.1751);
        alert("Browser Anda tidak mendukung geolocation. Default ke Jakarta.");
      }
      placeStore.setIsLoading(false)
    };
    initialize();
  }, []);

  // Kondisi jika masih loading
  if (placeStore.isLoading === true) {
    return (
      <Container>
        <Loader/>
      </Container>
    );
  }

  return (
    <Container>
      <Typography variant="h2" style={{textAlign:"center", margin:"40px 0"}}>
        Nearby Places
      </Typography>
      <LocationSearch/>
      <PlaceFilter />
      <Box>
        <Grid container spacing={2}>
          <Grid item xs={4}>
            {placeStore.filteredPlaces ? (
              <PlaceList currentPlaces={placeStore.filteredPlaces}/>
            ): "-"}
          </Grid>
          <Grid item xs={8}>
            <MapboxMap userLocation={placeStore.userLocation} places={placeStore.filteredPlaces} />
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
});

export default Home;
