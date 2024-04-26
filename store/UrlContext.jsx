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
  const [playList, setPlayList] = useState(
    'https://saavn.dev/api/playlists?link=https://www.jiosaavn.com/featured/best-indian-lo-fi-hits/yh7x7lXtCVkGSw2I1RxdhQ__&limit=40'
  );

  function setPlaylistContext(input) {
    setPlayList(`https://saavn.dev/api/playlists?link=${input}&limit=40`);
  }

  const contextValue = {
    playlist: playList,
    setPlaylistContext,
  };

  return (
    <UrlContext.Provider value={contextValue}>{children}</UrlContext.Provider>
  );
}
