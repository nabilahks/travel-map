import React, { useRef } from "react";
import Map, { Marker } from "react-map-gl";
import { observer } from "mobx-react-lite";
import { placeStore } from "@/stores/placeStore";

const MapboxMap = observer(({ places }) => {
  const mapRef = useRef(null); // Referensi untuk Mapbox instance

  const { viewport, userLocation } = placeStore; // Ambil viewport dan userLocation dari placeStore

  return (
    <>
      <Map
        ref={mapRef}
        initialViewState={viewport} // Gunakan viewport dari placeStore
        style={{ width: "100%", height: "500px" }}
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
          ))}
      </Map>

      {/* Tombol Ke Lokasi Saya */}
      <button
        onClick={() => {
          if (userLocation && mapRef.current) {
            mapRef.current.flyTo({
              center: [userLocation.longitude, userLocation.latitude],
              zoom: 13,
              essential: true, // Animation is essential
            });
          } else {
            alert("Lokasi Anda belum tersedia. Mohon aktifkan layanan lokasi.");
          }
        }}
        style={{
          position: "absolute",
          top: "10px",
          right: "10px",
          zIndex: 1000,
          padding: "10px",
          backgroundColor: "#fff",
          border: "1px solid #ccc",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        Ke Lokasi Saya
      </button>
    </>
  );
});

export default MapboxMap;
