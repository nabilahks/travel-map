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
      loadPlaceDetails: flow, // Tambahkan loadPlaceDetails
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
      this.isLoading = true;
      const data = yield fetchPlaceByXid(xid); 
      this.placeDetails = data;
    } catch (error) {
      console.error("Failed to load place details:", error);
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
    console.log(data)
    this.isLoading = data;
  }

  setFilterCategory(category) {
    console.log("Setting category:", category);
    this.filterCategory = category;
  }

  get filteredPlaces() {
    if (!this.filterCategory) return this.places;
    return this.places.filter((place) => place.kinds?.includes(this.filterCategory));
  }
}

export const placeStore = new PlaceStore();
