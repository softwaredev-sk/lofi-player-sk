import { Inter } from 'next/font/google';
import './globals.css';
import Header from '@/components/Header/Header';
import ContextComponent from '@/store/UrlContext';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'LoFi Playlist',
  description: 'LofI Playlist - Shailendra Kumar',
};

export const viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#334155' },
    { media: '(prefers-color-scheme: dark)', color: '#000000' },
  ],
};

export default function RootLayout({ children }) {
  return (
    <ContextComponent>
      <html lang="en">
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
