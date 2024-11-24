import React, { useState, useEffect } from "react";
import Map, { Marker } from "react-map-gl";
import { fetchPlaces } from "../utils/api"; // Fungsi fetch OpenTripMap API

const MapboxMap = () => {
  const [viewport, setViewport] = useState({
    longitude: 106.8272, // Default: Jakarta
    latitude: -6.1751,  // Default: Jakarta
    zoom: 13,
  });

  const [userLocation, setUserLocation] = useState(null);
  const [places, setPlaces] = useState([]); // Data dari OpenTripMap

  useEffect(() => {
    // Dapatkan lokasi pengguna
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const { latitude, longitude } = pos.coords;
          setViewport({
            longitude,
            latitude,
            zoom: 13,
          });
          setUserLocation({ latitude, longitude });

          // Fetch tempat menarik dari OpenTripMap
          fetchPlaces(longitude, latitude, 5000).then((data) => {
            setPlaces(data);
          });
        },
        (err) => console.error("Error getting geolocation:", err),
        { enableHighAccuracy: true }
      );
    }
  }, []);

  return (
    <Map
      initialViewState={viewport}
      style={{ width: "100%", height: "500px" }}
      mapStyle="mapbox://styles/mapbox/streets-v11"
      mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN}
      onMove={(evt) => setViewport(evt.viewState)}
    >
      {/* Marker untuk lokasi pengguna */}
      {userLocation && (
        <Marker longitude={userLocation.longitude} latitude={userLocation.latitude}>
          <div
            style={{
              backgroundColor: "red",
              width: "12px",
              height: "12px",
              borderRadius: "50%",
            }}
          ></div>
        </Marker>
      )}

      {/* Marker untuk tempat dari OpenTripMap */}
      {places.map((place, index) => (
        <Marker
          key={index}
          longitude={place.point.lon}
          latitude={place.point.lat}
        >
          <div
            style={{
              backgroundColor: "blue",
              width: "10px",
              height: "10px",
              borderRadius: "50%",
            }}
          ></div>
        </Marker>
      ))}
    </Map>
  );
};

export default MapboxMap;
