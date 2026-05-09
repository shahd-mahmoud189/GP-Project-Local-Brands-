export function getImageUrl(url: string | string[]): string {
  const raw = Array.isArray(url) ? url[0] : url;
  
  if (!raw) return "/placeholder.png";
  if (raw.startsWith("http")) return raw;
  
  return `https://brands-system-production-c110.up.railway.app${raw}`;
}