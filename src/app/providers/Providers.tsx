"use client";
import React, { ReactNode } from "react";
import { Provider } from "react-redux";
import { createStore, PreloadedState } from "../store/store";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

type ProvidersProps = {
  children: ReactNode;
  preloadedState: PreloadedState;
};

export default function Providers({
  children,
  preloadedState,
}: ProvidersProps) {
  const store = createStore(preloadedState);
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>{children}</Provider>
    </QueryClientProvider>
  );
}
