import api from "@/lib/service";
import { TrackInteractionRequest } from "../types/tracking.type";

export async function trackInteraction(payload: TrackInteractionRequest) {
  try {
    const response = await api.post("/api/Tracking/events", payload);
    return response.data;
  } catch (error) {
    console.error("TRACKING ERROR:", error);
  }
}