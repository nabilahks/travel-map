import { action, flow, makeObservable, observable } from "mobx";
import { fetchPlaceByXid, fetchPlaces } from "../utils/api";

class PlaceStore {
  places = [];
  placeDetails = null;
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
      placeDetails: observable,
      userLocation: observable,
      viewport: observable,
      isLoading: observable,
      filterCategory: observable,
      loadPlaces: flow,
      loadPlaceDetails: flow, 
      loadUserLocation: flow,
      setFilterCategory: action,
      setViewport: action,
      setIsLoading: action,
    });
  }

  loadPlaces = flow(function* (lon, lat, radius) {
    try {
      const data = yield fetchPlaces(lon, lat, radius);
      this.places = data;
    } catch (error) {
      console.error("Failed to load places:", error);
    } 
  });
  
  // Load detail tempat berdasarkan XID
  loadPlaceDetails = flow(function* (xid) {
    try {
      const data = yield fetchPlaceByXid(xid); 
      this.placeDetails = data;
    } catch (error) {
      console.error("Failed to load place details:", error);
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
    return this.places.filter((place) => place.kinds?.includes(this.filterCategory));
  }

  get uniqueKinds() {
    const allKinds = this.places
      .map((place) => place.kinds)
      .filter(Boolean)
      .flatMap((kinds) => kinds.split(","));

    return Array.from(new Set(allKinds));
  }
}

export const placeStore = new PlaceStore();
