// components/SessionInitializer.tsx
"use client";

import { useEffect } from "react";
import { getOrCreateSession } from "@/app/api/userBehavior.api";

export default function SessionInitializer() {
  useEffect(() => {
    getOrCreateSession();
  }, []);
  return null;
}