export function getImageUrl(url: string): string {
  if (!url) return "/placeholder.png";
  
  if (url.startsWith("http")) return url;
  
  return `https://brands-system-production-c110.up.railway.app${url}`;
}