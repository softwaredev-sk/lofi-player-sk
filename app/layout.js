import { Inter } from 'next/font/google';
import './globals.css';
import Header from '@/components/Header/Header';
import ContextComponent from '@/store/UrlContext';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'LoFi Playlist',
  description: 'LofI Playlist - Shailendra Kumar',
};

export default function RootLayout({ children }) {
  return (
    <ContextComponent>
      <html lang="en">
        <body className={inter.className}>
          <Header />
          {children}
        </body>
      </html>
    </ContextComponent>
  );
}
