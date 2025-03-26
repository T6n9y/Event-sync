import { create } from "zustand";

export interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  source: string;
  image: string;
}

interface EventStore {
  events: Event[];
  searchQuery: string;
  location: { lat: number; lng: number } | null;
  setEvents: (events: Event[]) => void;
  setSearchQuery: (query: string) => void;
  setLocation: (location: { lat: number; lng: number }) => void;
  fetchEvents: () => Promise<void>;
}

export const useEventStore = create<EventStore>((set, get) => ({
  events: [],
  searchQuery: "",
  location: null,
  setEvents: (events) => set({ events }),
  setSearchQuery: (query) => set({ searchQuery: query }),
  setLocation: (location) => set({ location }),
  fetchEvents: async () => {
    const { location, searchQuery } = get();
    // Build API URL with optional location and query parameters
    let apiUrl = "/api/events/suggest";
    const params: string[] = [];
    if (location) {
      params.push(`lat=${location.lat}`, `lng=${location.lng}`);
    }
    if (searchQuery) {
      params.push(`q=${encodeURIComponent(searchQuery)}`);
    }
    if (params.length > 0) {
      apiUrl += "?" + params.join("&");
    }
    try {
      const res = await fetch(apiUrl);
      if (!res.ok) throw new Error("Failed to fetch events");
      const data = await res.json();
      set({ events: data });
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  },
}));
