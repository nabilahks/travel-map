import React, { useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import { placeStore } from "../stores/placeStore";
import { CircularProgress, List, ListItem, ListItemText, Pagination, Box } from "@mui/material";

const PlaceList = observer(() => {
  const [userLocation, setUserLocation] = useState({ lon: 106.8272, lat: -6.1751 }); // Default ke Jakarta
  const [currentPage, setCurrentPage] = useState(1); // Halaman aktif
  const itemsPerPage = 10; // Jumlah item per halaman

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

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentPlaces = placeStore.filteredPlaces.slice(indexOfFirstItem, indexOfLastItem);
  console.log(currentPlaces)

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  return (
    <Box>
      <List>
        {currentPlaces.map((place, index) => (
          <ListItem key={index}>
            <ListItemText primary={place.name || "Unnamed place"} secondary={place.kinds} />
          </ListItem>
        ))}
      </List>

      {/* Pagination controls */}
      <Pagination
        count={Math.ceil(placeStore.filteredPlaces.length / itemsPerPage)} // Total halaman
        page={currentPage} // Halaman aktif
        onChange={handlePageChange}
        sx={{ marginTop: 2, display: "flex", justifyContent: "center" }}
      />
    </Box>
  );
});

export default PlaceList;
