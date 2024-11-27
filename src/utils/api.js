import axios from "axios";

const MAPBOX_API_KEY = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN;
const categories = ['hotel', 'restaurant', 'supermarket', 'hospital', 'place', 'locality', 'region', 'country'];

export const fetchPlaces = async (lon, lat) => {
  try {
    // Buat array promise untuk setiap kategori
    const promises = categories.map((category) =>
      axios.get(`https://api.mapbox.com/geocoding/v5/mapbox.places/${category}.json`, {
        params: {
          access_token: MAPBOX_API_KEY,
          proximity: `${lon},${lat}`,
          limit: 10,
          types: 'poi',
        },
      })
    );

    // Tunggu semua request selesai
    const responses = await Promise.all(promises);

    // Gabungkan hasil dari setiap kategori
    const allPlaces = responses.flatMap((response) => response.data.features);

    console.log('All Places:', allPlaces);

    return allPlaces;
  } catch (error) {
    console.error('Error fetching places by categories:', error.response?.data || error.message);
    throw error;
  }
};

export const fetchCoordinates = async (locationName) => {
  try {
    const response = await axios.get(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(locationName)}.json`,
      {
        params: {
          access_token: MAPBOX_API_KEY,
          limit: 10,
          bbox: [95.0, -11.0, 141.0, 6.0].join(","),
        },
      }
    );
    const data = response.data.features;
    console.log(data);
    return data;
  } catch (error) {
    console.error("Error fetching coordinates:", error);
    throw error;
  }
};


