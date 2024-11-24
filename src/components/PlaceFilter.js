import React from "react";
import { observer } from "mobx-react-lite";
import { placeStore } from "../stores/placeStore";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";

const PlaceFilter = observer(() => {
  const handleChange = (event) => {
    const selectedCategory = event.target.value;
    placeStore.setFilterCategory(selectedCategory); // Pastikan metode dipanggil dengan benar
  };

  return (
    <FormControl fullWidth sx={{ marginTop: 2 }}>
      <InputLabel id="category-filter-label">Filter by Category</InputLabel>
      <Select
        labelId="category-filter-label"
        value={placeStore.filterCategory}
        label="Filter by Category"
        onChange={handleChange}
      >
        <MenuItem value="">All Categories</MenuItem>
        <MenuItem value="museums">Museums</MenuItem>
        <MenuItem value="religion">Religion</MenuItem>
        <MenuItem value="interesting_places">Interesting Places</MenuItem>
      </Select>
    </FormControl>
  );
});

export default PlaceFilter;
