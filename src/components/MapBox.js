import React, { useRef, useState } from "react";
import Map, { Marker, Popup } from "react-map-gl";
import { observer } from "mobx-react-lite";
import { placeStore } from "@/stores/placeStore";
import { IconButton } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import MyLocationIcon from "@mui/icons-material/MyLocation";

const MapboxMap = observer(({ places }) => {
  const mapRef = useRef(null);
  const [selectedPlace, setSelectedPlace] = useState(null);

  const { viewport, userLocation } = placeStore;

  const handleFlyToLocation = () => {
    if (userLocation && mapRef.current) {
      mapRef.current.flyTo({
        center: [userLocation.longitude, userLocation.latitude],
        zoom: 13,
        essential: true,
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

  const handleMarkerClick = async (place) => {
    await placeStore.loadPlaceDetails(place.xid)
    setSelectedPlace(place);
  };

  const handlePopupClose = () => {
    setSelectedPlace(null);
  };

  return (
    <>
      <Map
        ref={mapRef}
        initialViewState={viewport}
        style={{ height: "500px", border: "4px solid #fff", borderRadius: "20px" }}
        mapStyle="mapbox://styles/mapbox/streets-v11"
        mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN}
        onMove={(evt) => {
          placeStore.setViewport(evt.viewState);
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
              onClick={() => handleMarkerClick(place)}
            >
              <div
                style={{
                  backgroundColor: "blue",
                  width: "10px",
                  height: "10px",
                  borderRadius: "50%",
                  cursor: "pointer",
                }}
              ></div>
            </Marker>
          ))}

        {selectedPlace && (
          <Popup
            longitude={selectedPlace.point.lon}
            latitude={selectedPlace.point.lat}
            anchor="top"
            closeButton={true}
            closeOnClick={false} 
            onClose={handlePopupClose} 
            style={{
              borderRadius: "20px",
              border: "none",
            }}
          >
            <div
              style={{
                color: "black",
                fontSize: "14px",
                fontWeight: "bold",
                background: "transparant",
                boxShadow: "none"
              }}
            >
              <p style={{ margin: 0 }}>{selectedPlace.name}</p>
              <p style={{ margin: "5px 0", fontSize: "12px", color: "#555" }}>
                Longitude: {selectedPlace.point.lon.toFixed(6)}
              </p>
              <p style={{ margin: 0, fontSize: "12px", color: "#555" }}>
                Latitude: {selectedPlace.point.lat.toFixed(6)}
              </p>
            </div>
          </Popup>
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
