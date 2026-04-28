import api from "@/lib/service";

export async function acceptContract() {
  const { data } = await api.post("/api/Contract/accept");
  return data;
}