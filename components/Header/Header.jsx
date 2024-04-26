'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

export default function Header() {
  const [fullscreen, setFullscreen] = useState(false);
  function handleFullscreen() {
    if (!fullscreen) {
      document.documentElement.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
    setFullscreen((prevState) => !prevState);
  }
  const path = usePathname();
  return (
    <header
      className="fixed top-2 right-0 w-full p-2 mt-1 z-40"
      onDoubleClick={handleFullscreen}
    >
      <nav>
        <ul className="flex gap-6 justify-end mx-4 text-red-900">
          <li
            className={`hover:text-blue-lofi ${
              path === '/' ? 'text-white  text-bold' : ''
            }`}
          >
            <Link href="/">Home</Link>
          </li>
          <li
            className={`hover:text-blue-lofi ${
              path === '/credits' ? 'text-white  text-bold' : ''
            }`}
          >
            <Link href="/credits">Credits</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
