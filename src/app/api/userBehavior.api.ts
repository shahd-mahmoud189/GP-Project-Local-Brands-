// api/userBehavior.api.ts
import axios from "axios";
import Cookies from "js-cookie";

const BASE_URL =
  "https://graduationprojectclean-production.up.railway.app/api/UserBehavior";

export async function createSession() {
  const { data } = await axios.get(`${BASE_URL}/session`);

  if (data?.sessionId) {
    Cookies.set("sessionId", data.sessionId, { expires: 7 });
  }
  return data;
}


export async function getOrCreateSession(): Promise<string | null> {
 
  let sessionId = Cookies.get("sessionId");
  if (sessionId) return sessionId;

  try {
    const sessionData = await createSession();
    return sessionData?.sessionId || null;
  } catch (error) {
    console.error("Failed to create session:", error);
    return null;
  }
}


export async function trackEvent(values: {
  sessionId: string;
  actionType: string;
  productId?: number;
  categoryId?: number;
  brandId?: number;
  searchQuery?: string;
  sourcePage?: string;
}) {
  const { data } = await axios.post(`${BASE_URL}/track`, values);
  return data;
}