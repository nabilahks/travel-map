import { makeAutoObservable } from "mobx";
import { fetchPlaces } from "../utils/api";

class PlaceStore {
  places = [];
  isLoading = false;

  constructor() {
    makeAutoObservable(this);
  }

  async loadPlaces(lon, lat, radius) {
    this.isLoading = true;
    try {
      const data = await fetchPlaces(lon, lat, radius);
      this.places = data;
    } catch (error) {
      console.error("Failed to load places:", error);
    } finally {
      this.isLoading = false;
    }
  }
}

export const placeStore = new PlaceStore();
