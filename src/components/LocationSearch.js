import React, { useState } from "react";
import { observer } from "mobx-react-lite";
import { placeStore } from "../stores/placeStore";
import { TextField, Button, Box } from "@mui/material";

const LocationSearch = observer(() => {
  const [location, setLocation] = useState("");

  const handleSearch = () => {
    if (location.trim() !== "") {
      placeStore.searchLocation(location); // Gunakan fungsi searchLocation di store
    }
  };

  return (
    <Box sx={{ display: "flex", alignItems: "center", marginBottom: 2 }}>
      <TextField
        fullWidth
        label="Search Location"
        variant="outlined"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        sx={{
          marginRight: 2,
          borderRadius: "20px",
          "& .MuiOutlinedInput-root": {
            borderRadius: "20px",
          },
        }}
      />
      <Button
        variant="contained"
        onClick={handleSearch}
        sx={{ height: "56px", borderRadius: "20px" }}
      >
        Search
      </Button>
    </Box>
  );
});

export default LocationSearch;
