import React, { useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import { placeStore } from "../stores/placeStore";
import { CircularProgress, List, ListItem, ListItemText } from "@mui/material";

const PlaceList = observer(() => {
  const [userLocation, setUserLocation] = useState({ lon: 106.8272, lat: -6.1751 }); // Default ke Jakarta

  useEffect(() => {
    // Dapatkan lokasi pengguna
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const { latitude, longitude } = pos.coords;
          setUserLocation({ lat: latitude, lon: longitude });

          // Fetch tempat berdasarkan lokasi pengguna
          placeStore.loadPlaces(longitude, latitude, 5000);
        },
        (err) => console.error("Error getting geolocation:", err),
        { enableHighAccuracy: true }
      );
    }
  }, []);

  if (placeStore.isLoading) {
    return <CircularProgress />;
  }

  return (
    <List>
      {placeStore.places.map((place, index) => (
        <ListItem key={index}>
          <ListItemText primary={place.name || "Unnamed place"} secondary={place.kinds} />
        </ListItem>
      ))}
    </List>
  );
});

export default PlaceList;
