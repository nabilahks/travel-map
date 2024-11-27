import React, { useState } from "react";
import { Grid, List, ListItem, ListItemText, Box, Pagination } from "@mui/material";

const PlaceList = ({ currentPlaces }) => {
  const [currentPage, setCurrentPage] = useState(1); // Halaman aktif
  const itemsPerPage = 10; // Jumlah item per halaman (5 kiri + 5 kanan)

  // Fungsi untuk menangani perubahan halaman
  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  // Hitung item yang akan ditampilkan berdasarkan halaman
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedPlaces = currentPlaces.slice(startIndex, startIndex + itemsPerPage);

  return (
    <Box>
      <List>
        {paginatedPlaces.map((place, index) => (
          <ListItem key={index}>
            <ListItemText
              primary={place.name || "Unnamed place"}
              secondary={""}
            />
          </ListItem>
        ))}
      </List>

      {/* Pagination Controls */}
      <Pagination
        count={Math.ceil(currentPlaces.length / itemsPerPage)} // Total halaman
        page={currentPage} // Halaman aktif
        onChange={handlePageChange} // Fungsi untuk perubahan halaman
        sx={{ marginTop: 2, display: "flex", justifyContent: "center", color: "#fff"}}
      />
    </Box>
  );
};

export default PlaceList;
