'use client';

import { createContext, useContext, useState } from 'react';

const UrlContext = createContext();

export function useAppContext() {
  const ctx = useContext(UrlContext);

  if (!ctx) {
    throw new Error(
      'Wrap required Component inside the UrlContext Provider Component'
    );
  }

  return ctx;
}

export default function ContextComponent({ children }) {
  const [playStatus, setPlayStatus] = useState(undefined);

  const contextValue = {
    playStatus,
    setPlayStatus,
  };

  return (
    <UrlContext.Provider value={contextValue}>{children}</UrlContext.Provider>
  );
}
