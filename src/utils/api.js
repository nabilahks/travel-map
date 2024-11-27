import axios from "axios";

const API_KEY = process.env.NEXT_PUBLIC_API_KEY;
const BASE_URL = "https://api.opentripmap.com/0.1/en/places";

export const fetchPlaces = async (lon, lat, radius = 1000) => {
  try {
    const response = await axios.get(`${BASE_URL}/radius`, {
      params: {
        lon,
        lat,
        radius,
        format: "json",
        apikey: API_KEY,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching places:", error);
    throw error;
  }
};

export const fetchPlaceByXid = async (xid) => {
  try {
    const response = await axios.get(`${BASE_URL}/xid/${xid}`, {
      params: {
        apikey: API_KEY,
      },
    });
    return response.data; // Mengembalikan detail tempat
  } catch (error) {
    console.error("Error fetching place by xid:", error);
    throw error;
  }
};

