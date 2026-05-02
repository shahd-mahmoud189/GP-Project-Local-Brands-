export function getImageUrl(url: string): string {
  if (!url) return "/placeholder.png";
  
  // لو URL كاملة بـ https
  if (url.startsWith("http")) return url;
  
  // لو path على السيرفر زي /uploads/...
  return `https://brands-system-production-c110.up.railway.app${url}`;
}