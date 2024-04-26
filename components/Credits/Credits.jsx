import Link from 'next/link';

export default function Credits() {
  return (
    <div className="fixed top-0 bottom-0 left-0 mt-12 mx-4">
      <ul>
        <li>
          Playlist:{' '}
          <Link
            href="https://www.jiosaavn.com/featured/best-indian-lo-fi-hits/yh7x7lXtCVkGSw2I1RxdhQ__"
            className="text-bold"
          >
            Best Indian Lo-Fi Hits
          </Link>
        </li>
      </ul>
    </div>
  );
}
