import { action, flow, makeObservable, observable } from "mobx";
import { fetchCoordinates, fetchPlaceByXid, fetchPlaces } from "../utils/api";

class PlaceStore {
  places = [];
  userLocation = null;
  viewport = {
    longitude: 106.8272,
    latitude: -6.1751,
    zoom: 13,
  };
  isLoading = null;
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
      searchLocation: flow,
      setFilterCategory: action,
      setViewport: action,
      setIsLoading: action,
    });
  }

  loadPlaces = flow(function* (lon, lat) {
    try {
      const data = yield fetchPlaces(lon, lat);
      this.places = data;
    } catch (error) {
      console.error("Failed to load places:", error);
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

      this.userLocation = { latitude, longitude };
      this.viewport = {
        longitude,
        latitude,
        zoom: 13,
      };
    } catch (error) {
      console.error("Error getting geolocation:", error);

      this.userLocation = null;
      this.viewport = {
        longitude: 106.8272,
        latitude: -6.1751,
        zoom: 13,
      };
    }
  });

  searchLocation = flow(function* (locationName) {
    this.isLoading = true;
    try {
      // Fetch coordinates based on location name
      const coordinates = yield fetchCoordinates(locationName);

      // Update viewport to the new coordinates
      this.viewport = {
        longitude: coordinates[0].center[0],
        latitude: coordinates[0].center[1],
        zoom: 5,
      };
      this.places = coordinates
    } catch (error) {
      console.error("Failed to search location:", error);
    } finally {
      this.isLoading = false;
    }
  });

  setViewport(viewState) {
    this.viewport = viewState;
  }

  setIsLoading(data) {
    this.isLoading = data;
  }

  setFilterCategory(category) {
    this.filterCategory = category;
  }

  get filteredPlaces() {
    if (!this.filterCategory) return this.places;
    return this.places.filter((place) => place.properties.category?.includes(this.filterCategory));
  }

  get uniqueKinds() {
    const allKinds = this.places
      .map((place) => place.properties.category)
      .filter(Boolean)
      .flatMap((kinds) => kinds.split(","));

    return Array.from(new Set(allKinds));
  }
}

export const placeStore = new PlaceStore();
