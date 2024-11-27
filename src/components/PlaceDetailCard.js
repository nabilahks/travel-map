import React from "react";
import { Card, CardContent, Typography, Box } from "@mui/material";

const PlaceDetailCard = ({ placeDetails }) => {
  const { address } = placeDetails;

  return (
    <Card style={{ borderRadius: "10px", boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)" }}>
      <CardContent>
        <Typography variant="h6" style={{ marginBottom: "10px" }}>
          {placeDetails.name || "Unnamed Place"}
        </Typography>
        <Typography variant="body2">
          Longitude: {placeDetails.point.lon.toFixed(6)}, Latitude: {placeDetails.point.lat.toFixed(6)}
        </Typography>
        {address && (
          <Box style={{ marginTop: "10px" }}>
            <Typography variant="subtitle1" style={{ fontWeight: "bold", marginBottom: "5px" }}>
              Alamat
            </Typography>
            <Typography variant="body2">
              {address.road ? `Jalan: ${address.road}` : ""}
            </Typography>
            <Typography variant="body2">
              {address.village ? `Desa: ${address.village}` : ""}
            </Typography>
            <Typography variant="body2">
              {address.city ? `Kota: ${address.city}` : ""}
            </Typography>
            <Typography variant="body2">
              {address.state ? `Provinsi: ${address.state}` : ""}
            </Typography>
            <Typography variant="body2">
              {address.country ? `Negara: ${address.country}` : ""}
            </Typography>
          </Box>
        )}
      </CardContent>
    </Card>
  );
};

export default PlaceDetailCard;
