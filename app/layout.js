import { Inter } from 'next/font/google';
import './globals.css';
import Header from '@/components/Header/Header';
import ContextComponent from '@/store/UrlContext';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'LoFi Playlist',
  description: 'LofI Playlist - Shailendra Kumar',
  themeColorDark: '#000000',
  themeColorLight: '#334155',
};

export default function RootLayout({ children }) {
  return (
    <ContextComponent>
      <html lang="en">
        <head>
          <meta
            name="theme-color"
            media="(prefers-color-scheme: light)"
            content={metadata.themeColorLight}
          />
          <meta
            name="theme-color"
            media="(prefers-color-scheme: dark)"
            content={metadata.themeColorDark}
          />
        </head>
        <body className={inter.className}>
          <div id="entry-root" className="flex flex-col min-h-screen">
            <div id="player-progress"></div>
            <Header />
            {children}
          </div>
          <footer id="footer"></footer>
        </body>
      </html>
    </ContextComponent>
  );
}
