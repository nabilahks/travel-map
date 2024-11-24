import React, { useState, useEffect, useRef } from "react";
import Map, { Marker } from "react-map-gl";
import { fetchPlaces } from "../utils/api"; // Fungsi fetch OpenTripMap API

const MapboxMap = () => {
  const mapRef = useRef(null); // Referensi untuk Mapbox instance
  const [viewport, setViewport] = useState({
    longitude: 106.8272, // Default: Jakarta
    latitude: -6.1751,
    zoom: 13,
  });

  const [userLocation, setUserLocation] = useState(null);
  const [places, setPlaces] = useState([]); // Data dari OpenTripMap

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const { latitude, longitude } = pos.coords;

          // Update lokasi pengguna
          setUserLocation({ latitude, longitude });
          setViewport({
            longitude: longitude,
            latitude: latitude,
            zoom: 13,
          });

          // Pindahkan viewport ke lokasi pengguna dengan animasi
          if (mapRef.current) {
            mapRef.current.flyTo({
              center: [longitude, latitude],
              zoom: 13,
              essential: true, // Animation is essential
            });
          }

          // Fetch tempat menarik di sekitar lokasi pengguna
          fetchPlaces(longitude, latitude, 5000).then((data) => {
            setPlaces(data);
          });
        },
        (err) => {
          console.error("Error getting geolocation:", err);

          // Fallback ke lokasi default (Jakarta)
          setViewport({
            longitude: 106.8272,
            latitude: -6.1751,
            zoom: 13,
          });

          fetchPlaces(106.8272, -6.1751, 5000).then((data) => {
            setPlaces(data);
          });

          alert("Kami tidak dapat mengakses lokasi Anda. Default ke Jakarta.");
        },
        { enableHighAccuracy: true }
      );
    } else {
      // Jika geolocation tidak didukung, fallback ke lokasi default (Jakarta)
      setViewport({
        longitude: 106.8272,
        latitude: -6.1751,
        zoom: 13,
      });

      fetchPlaces(106.8272, -6.1751, 5000).then((data) => {
        setPlaces(data);
      });

      alert("Browser Anda tidak mendukung geolocation. Default ke Jakarta.");
    }
  }, []);

  console.log("User Location:", userLocation);
  console.log("Places:", places);

  return (
    <>
      <Map
        ref={mapRef}
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
                width: "15px",
                height: "15px",
                borderRadius: "50%",
              }}
            ></div>
          </Marker>
        )}

        {/* Marker untuk tempat menarik */}
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
};

export default MapboxMap;
