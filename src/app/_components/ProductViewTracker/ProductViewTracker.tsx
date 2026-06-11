// app/_components/ProductViewTracker/ProductViewTracker.tsx
"use client";

import { useEffect, useRef } from "react";
import { getOrCreateSession, trackEvent } from "@/app/api/userBehavior.api";

interface ProductViewTrackerProps {
  productId: number;
  categoryId?: number;
  brandId?: number;
}

export default function ProductViewTracker({
  productId,
  categoryId,
  brandId,
}: ProductViewTrackerProps) {
  const hasTracked = useRef(false);

  useEffect(() => {
    const trackView = async () => {
      const sessionId = await getOrCreateSession();
      if (!sessionId) return;

      const eventData: any = {
        sessionId,
        actionType: "view",
        sourcePage: "product_details",
      };

      if (productId && productId > 0) eventData.productId = productId;
      if (categoryId && categoryId > 0) eventData.categoryId = categoryId;
      if (brandId && brandId > 0) eventData.brandId = brandId;

      await trackEvent(eventData);
    };

    if (!hasTracked.current) {
      hasTracked.current = true;
      trackView();
    }
  }, [productId, categoryId, brandId]);

  return null;
}