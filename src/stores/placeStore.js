import { action, flow, makeObservable, observable } from "mobx";
import { fetchPlaces } from "../utils/api";

class PlaceStore {
  places = [];
  userLocation = null; // Default null jika belum ada lokasi pengguna
  viewport = {         // Default ke Jakarta
    longitude: 106.8272,
    latitude: -6.1751,
    zoom: 13,
  };
  isLoading = false;
  filterCategory = "";

  constructor() {
    makeObservable(this, {
      places: observable,
      userLocation: observable,
      viewport: observable,
      isLoading: observable,
      filterCategory: observable,
      loadPlaces: flow,
      loadUserLocation: flow,
      setFilterCategory: action,
      setViewport: action,
    });
  }
  

  loadPlaces = flow(function* (lon, lat, radius) {
    this.isLoading = true;
    try {
      const data = yield fetchPlaces(lon, lat, radius);
      this.places = data;
    } catch (error) {
      console.error("Failed to load places:", error);
    } finally {
      this.isLoading = false;
    }
  });

  loadUserLocation = flow(function* () {
    try {
      const getCurrentPosition = () =>
        new Promise((resolve, reject) =>
          navigator.geolocation.getCurrentPosition(resolve, reject, { enableHighAccuracy: true })
        );

      const pos = yield getCurrentPosition();
      const { latitude, longitude } = pos.coords;

      // Update lokasi pengguna
      this.userLocation = { latitude, longitude };
      this.viewport = {
        longitude,
        latitude,
        zoom: 13,
      };

      console.log("Geolocation berhasil:", this.userLocation);
      console.log("Viewport:", this.viewport);
    } catch (error) {
      console.error("Error getting geolocation:", error);

      // Fallback ke Jakarta
      this.userLocation = null;
      this.viewport = {
        longitude: 106.8272,
        latitude: -6.1751,
        zoom: 13,
      };

      console.log("Fallback ke Jakarta");
    }
  });

  setViewport(viewState) {
    this.viewport = viewState;
  }  

  setFilterCategory(category) {
    console.log(category)
    this.filterCategory = category;
  }

  get filteredPlaces() {
    if (!this.filterCategory) return this.places;
    return this.places.filter((place) => place.kinds?.includes(this.filterCategory));
  }
}

export const placeStore = new PlaceStore();
