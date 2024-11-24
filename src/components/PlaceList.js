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

  // Membagi item ke dalam dua kolom
  const leftColumn = paginatedPlaces.slice(0, Math.ceil(paginatedPlaces.length / 2));
  const rightColumn = paginatedPlaces.slice(Math.ceil(paginatedPlaces.length / 2));

  return (
    <Box>
      <Grid container spacing={2}>
        {/* Kolom Kiri */}
        <Grid item xs={6}>
          <List>
            {leftColumn.map((place, index) => (
              <ListItem key={index}>
                <ListItemText
                  primary={place.name || "Unnamed place"}
                  secondary={""}
                />
              </ListItem>
            ))}
          </List>
        </Grid>

        {/* Kolom Kanan */}
        <Grid item xs={6}>
          <List>
            {rightColumn.map((place, index) => (
              <ListItem key={index}>
                <ListItemText
                  primary={place.name || "Unnamed place"}
                  secondary={""}
                />
              </ListItem>
            ))}
          </List>
        </Grid>
      </Grid>

      {/* Pagination Controls */}
      <Pagination
        count={Math.ceil(currentPlaces.length / itemsPerPage)} // Total halaman
        page={currentPage} // Halaman aktif
        onChange={handlePageChange} // Fungsi untuk perubahan halaman
        sx={{ marginTop: 2, display: "flex", justifyContent: "center" }}
      />
    </Box>
  );
};

export default PlaceList;
