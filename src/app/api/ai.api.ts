import api from "@/lib/service";

export async function validateImage(file: File) {
  const fd = new FormData();
  fd.append("file", file);
  const { data } = await api.post("/api/product-ai/validate-image", fd, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return data;
}

export async function predictPrice(payload: {
  productName: string;
  description: string;
  category: string;
  basePrice: number;
  file: File;
}) {
  const fd = new FormData();
  fd.append("productName", payload.productName);
  fd.append("description", payload.description);
  fd.append("category", payload.category);
  fd.append("basePrice", String(payload.basePrice));
  fd.append("file", payload.file);
  const { data } = await api.post("/api/product-ai/predict-price", fd, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return data;
}

export async function moderateText(payload: {
  productName: string;
  description: string;
  category: string;
  price: number;
}) {
  const { data } = await api.post("/api/product-ai/moderate-text", payload);
  return data;
}

export async function generateDescription(payload: {
  productName: string;
  categoryName: string;
  partialText: string;
}) {
  const { data } = await api.post("/api/Products/generate-description", payload);
  return data;
}