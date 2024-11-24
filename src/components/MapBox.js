import React, { useRef } from "react";
import Map, { Marker } from "react-map-gl";
import { observer } from "mobx-react-lite";
import { placeStore } from "@/stores/placeStore";
import { IconButton } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import MyLocationIcon from "@mui/icons-material/MyLocation";

const MapboxMap = observer(({ places }) => {
  const mapRef = useRef(null); // Referensi untuk Mapbox instance

  const { viewport, userLocation } = placeStore; // Ambil viewport dan userLocation dari placeStore

  const handleFlyToLocation = () => {
    if (userLocation && mapRef.current) {
      mapRef.current.flyTo({
        center: [userLocation.longitude, userLocation.latitude],
        zoom: 13,
        essential: true, // Animasi penting
      });
    } else {
      alert("Lokasi Anda belum tersedia. Mohon aktifkan layanan lokasi.");
    }
  };
  
  const handleZoomIn = () => {
    if (mapRef.current) {
      const currentZoom = mapRef.current.getZoom();
      mapRef.current.zoomTo(currentZoom + 1);
    }
  };

  const handleZoomOut = () => {
    if (mapRef.current) {
      const currentZoom = mapRef.current.getZoom();
      mapRef.current.zoomTo(currentZoom - 1);
    }
  };
  return (
    <>
      <Map
        ref={mapRef}
        initialViewState={viewport} // Gunakan viewport dari placeStore
        style={{ width: "100%", height: "500px", border: "4px solid black", borderRadius:"20px" }}
        mapStyle="mapbox://styles/mapbox/streets-v11"
        mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN}
        onMove={(evt) => {
          placeStore.setViewport(evt.viewState); // Gunakan aksi untuk memperbarui viewport
        }}
      >
        {/* Marker untuk lokasi pengguna */}
        {userLocation && (
          <Marker longitude={userLocation.longitude} latitude={userLocation.latitude}>
            <div
              style={{
                backgroundColor: "red",
                width: "15px",
                height: "15px",
                borderRadius: "50%",
              }}
            ></div>
          </Marker>
        )}

        {/* Marker untuk tempat menarik */}
        {places &&
          places.map((place, index) => (
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
          )
        )}

        {/* Tombol "Ke Lokasi Saya" */}
        <IconButton
          onClick={handleFlyToLocation}
          sx={{
            position: "absolute",
            top: "10px",
            right: "10px",
            zIndex: 1000,
            backgroundColor: "#fff",
            "&:hover": {
              backgroundColor: "#e0e0e0",
            },
            boxShadow: 2,
          }}
        >
          <MyLocationIcon />
        </IconButton>

        {/* Tombol Zoom In */}
        <IconButton
          onClick={handleZoomIn}
          sx={{
            position: "absolute",
            top: "60px",
            right: "10px",
            zIndex: 1000,
            backgroundColor: "#fff",
            "&:hover": {
              backgroundColor: "#e0e0e0",
            },
            boxShadow: 2,
          }}
        >
          <AddIcon />
        </IconButton>

        {/* Tombol Zoom Out */}
        <IconButton
          onClick={handleZoomOut}
          sx={{
            position: "absolute",
            top: "110px",
            right: "10px",
            zIndex: 1000,
            backgroundColor: "#fff",
            "&:hover": {
              backgroundColor: "#e0e0e0",
            },
            boxShadow: 2,
          }}
        >
          <RemoveIcon />
        </IconButton>

      </Map>
    </>
  );
});

export default MapboxMap;
