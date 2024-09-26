'use client';

import Link from 'next/link';

export default function Credits() {
  return (
    <div className="fixed top-0 bottom-0 left-0 mt-12 mx-4">
      <b>Songs from JioSaavn Playlists:</b>
      <ul className="my-8">
        <li>
          <div>
            <Link
              href="https://www.jiosaavn.com/featured/best-indian-lo-fi-hits/yh7x7lXtCVkGSw2I1RxdhQ__"
              className="text-bold"
            >
              Best Indian Lo-Fi Hits
            </Link>
          </div>
        </li>
        <li>
          <div>
            <Link
              href="https://www.jiosaavn.com/featured/chill-maaro-lo-fi-mix/mAA3xzx2Asqm0KYf4sgO,Q__"
              className="text-bold"
            >
              Chill Maaro: Lo-Fi Mix
            </Link>
          </div>
        </li>
        <li>
          <div>
            <Link
              href="https://www.jiosaavn.com/featured/monsoon-lofi-beats/68cGlQtgV9-b5bdQKACHDA__"
              className="text-bold"
            >
              Monsoon Lofi Beats
            </Link>
          </div>
        </li>
      </ul>
    </div>
  );
}
