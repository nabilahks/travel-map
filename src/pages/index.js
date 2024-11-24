import React, { useEffect } from "react";
import PlaceList from "../components/PlaceList";
import { CircularProgress, Container, Typography } from "@mui/material";
import MapboxMap from "@/components/MapBox";
import PlaceFilter from "@/components/PlaceFilter";
import { observer } from "mobx-react-lite";
import { placeStore } from "@/stores/placeStore";
import Loader from "@/components/Loader";

const Home = observer(() => {
  useEffect(() => {
    const initialize = async () => {
      placeStore.setIsLoading(true)
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
      placeStore.setIsLoading(false)
    };
    initialize();
  }, []);

  // Kondisi jika masih loading
  console.log(placeStore.isLoading)
  if (placeStore.isLoading === true) {
    return (
      <Container>
        <Loader/>
      </Container>
    );
  }

  return (
    <Container>
      <Typography variant="h4" gutterBottom style={{textAlign:"center", margin:"40px 0"}}>
        Nearby Places
      </Typography>
      <PlaceFilter />
      <MapboxMap userLocation={placeStore.userLocation} places={placeStore.filteredPlaces} />
      {placeStore.filteredPlaces && (
        <PlaceList currentPlaces={placeStore.filteredPlaces}/>
      )}
    </Container>
  );
});

export default Home;
