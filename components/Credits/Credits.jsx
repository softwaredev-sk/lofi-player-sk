'use client';
import { useAppContext } from '@/store/UrlContext';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useRef, useState } from 'react';

export default function Credits() {
  const ref = useRef();
  const router = useRouter();
  const [val, setVal] = useState('');
  const { playlist, setPlaylistContext } = useAppContext();

  function handleChange() {
    setVal(ref.current.value);
  }

  function handleOpen(listUrl) {
    setPlaylistContext(listUrl);
    router.push('/');
  }

  function handleSelect(listUrl) {
    setPlaylistContext(listUrl);
    router.push('/');
  }

  return (
    <div className="fixed top-0 bottom-0 left-0 mt-12 mx-4">
      <ul className="my-8">
        Select Playlist:
        <li>
          <div>
            <Link
              href="https://www.jiosaavn.com/featured/best-indian-lo-fi-hits/yh7x7lXtCVkGSw2I1RxdhQ__"
              className="text-bold"
            >
              Best Indian Lo-Fi Hits
            </Link>
            {playlist.includes(
              'https://www.jiosaavn.com/featured/best-indian-lo-fi-hits/yh7x7lXtCVkGSw2I1RxdhQ__'
            ) ? (
              <>
                {' '}
                <p className="inline-block text-red-500"> [Selected]</p>
              </>
            ) : (
              <>
                {' '}
                <p
                  className="inline-block cursor-pointer"
                  onClick={() =>
                    handleSelect(
                      'https://www.jiosaavn.com/featured/best-indian-lo-fi-hits/yh7x7lXtCVkGSw2I1RxdhQ__'
                    )
                  }
                >
                  [ Select ]
                </p>
              </>
            )}
          </div>
        </li>
        <li>
          <div>
            <Link
              href="https://www.jiosaavn.com/featured/hindi-hit-songs/ZodsPn39CSjwxP8tCU-flw__"
              className="text-bold"
            >
              Hindi Hit Songs
            </Link>
            {playlist.includes(
              'https://www.jiosaavn.com/featured/hindi-hit-songs/ZodsPn39CSjwxP8tCU-flw__'
            ) ? (
              <>
                {' '}
                <p className="inline-block text-red-500">[ Selected ]</p>
              </>
            ) : (
              <>
                {' '}
                <p
                  className="inline-block cursor-pointer"
                  onClick={() =>
                    handleSelect(
                      'https://www.jiosaavn.com/featured/hindi-hit-songs/ZodsPn39CSjwxP8tCU-flw__'
                    )
                  }
                >
                  [ Select ]
                </p>
              </>
            )}
          </div>
        </li>
        <li>
          <div>
            <Link
              href="https://www.jiosaavn.com/featured/lets-play-arijit-singh-hindi/Iz0pi7nkjUE_"
              className="text-bold"
            >
              Let's Play - Arijit Singh - Hindi
            </Link>
            {playlist.includes(
              'https://www.jiosaavn.com/featured/lets-play-arijit-singh-hindi/Iz0pi7nkjUE_'
            ) ? (
              <>
                {' '}
                <p className="inline-block text-red-500">[ Selected ]</p>
              </>
            ) : (
              <>
                {' '}
                <p
                  className="inline-block cursor-pointer"
                  onClick={() =>
                    handleSelect(
                      'https://www.jiosaavn.com/featured/lets-play-arijit-singh-hindi/Iz0pi7nkjUE_'
                    )
                  }
                >
                  [ Select ]
                </p>
              </>
            )}
          </div>
        </li>
      </ul>
      <input
        value={val}
        ref={ref}
        placeholder="Enter featured JioSaavn playlist URL"
        className="bg-red-100 text-black px-4 rounded-full w-[320px]"
        onChange={handleChange}
      />
      <button className="mx-2" onClick={() => handleOpen(ref.current.value)}>
        Open
      </button>
    </div>
  );
}
