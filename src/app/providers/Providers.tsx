"use client";
import React, { ReactNode } from 'react'
import { Provider } from 'react-redux'
import { createStore, PreloadedState } from '../store/store';

type ProvidersProps = {
    children: ReactNode,
    preloadedState: PreloadedState
}

export default function Providers({children,preloadedState}:ProvidersProps) {
  const store = createStore(preloadedState)
  return (
    <Provider store={store}>
      {children}
    </Provider>
  )
}
