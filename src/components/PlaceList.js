import React, { useRef, useState } from "react";
import { Grid, List, ListItem, ListItemText, Box, Pagination } from "@mui/material";
import { placeStore } from "@/stores/placeStore";

const PlaceList = ({ currentPlaces, mapRef }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Fungsi untuk menangani perubahan halaman
  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  // Hitung item yang akan ditampilkan berdasarkan halaman
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedPlaces = currentPlaces.slice(startIndex, startIndex + itemsPerPage);

  const handlePlaceClick = (place) => {
    placeStore.setSelectedPlace(place);

    const [longitude, latitude] = place.center;
    if (mapRef.current) {
      mapRef.current.flyTo({
        center: [longitude, latitude],
        zoom: 13,
        essential: true,
      });
    } else {
      console.error("mapRef.current is null. Make sure it's connected to the Mapbox instance.");
    }
  };

  return (
    <Box>
      <List>
        {paginatedPlaces.map((place, index) => (
          <ListItem
            button="true"
            key={index}
            onClick={() => handlePlaceClick(place)}
            sx={{cursor:"pointer"}}
          >
            <ListItemText
              primary={place.text || "Unnamed place"}
              secondary={""}
            />
          </ListItem>
        ))}
      </List>

      {/* Pagination Controls */}
      <Pagination
        count={Math.ceil(currentPlaces.length / itemsPerPage)}
        page={currentPage} 
        onChange={handlePageChange}
        sx={{ marginTop: 2, display: "flex", justifyContent: "center", color: "#fff"}}
      />
    </Box>
  );
};

export default PlaceList;
