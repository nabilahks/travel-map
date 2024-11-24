import React, { useEffect } from "react";
import { observer } from "mobx-react-lite";
import { placeStore } from "../stores/placeStore";
import { CircularProgress, List, ListItem, ListItemText } from "@mui/material";

const PlaceList = observer(({ lon, lat, radius = 1000 }) => {
  useEffect(() => {
    placeStore.loadPlaces(lon, lat, radius);
  }, [lon, lat, radius]);

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
