import React from "react";
import { observer } from "mobx-react-lite";
import { placeStore } from "../stores/placeStore";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";

const PlaceFilter = observer(() => {
  const handleChange = (event) => {
    const selectedCategory = event.target.value;
    placeStore.setFilterCategory(selectedCategory);
  };

  return (
    <FormControl fullWidth sx={{ marginTop: 2, marginBottom: 2}}>
      <InputLabel id="category-filter-label">Filter by Category</InputLabel>
      <Select
        labelId="category-filter-label"
        value={placeStore.filterCategory}
        label="Filter by Category"
        onChange={handleChange}
        sx={{
          borderRadius: "20px", 
          borderColor: "#000", 
        }}
      >
        <MenuItem value="">All Categories</MenuItem>
        {placeStore.uniqueKinds.map((kind, index) => (
          <MenuItem key={index} value={kind}>
            {kind.replace(/_/g, " ")}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
});

export default PlaceFilter;
