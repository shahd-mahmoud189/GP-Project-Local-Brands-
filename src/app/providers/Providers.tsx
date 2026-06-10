"use client";

import React, { ReactNode, useEffect, useState } from "react";
import { Provider } from "react-redux";
import { createStore, PreloadedState } from "../store/store";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Cookies from "js-cookie";
import { createSession } from "../api/userBehavior.api";

type ProvidersProps = {
  children: ReactNode;
  preloadedState: PreloadedState;
};

export default function Providers({
  children,
  preloadedState,
}: ProvidersProps) {
  const [store] = useState(() => createStore(preloadedState));
  const [queryClient] = useState(() => new QueryClient());

  useEffect(() => {
    const initSession = async () => {
      const existingSession = Cookies.get("sessionId");

      if (existingSession) return;

      const data = await createSession();

      Cookies.set("sessionId", data.sessionId, {
        expires: 30,
      });
    };

    initSession();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>{children}</Provider>
    </QueryClientProvider>
  );
}