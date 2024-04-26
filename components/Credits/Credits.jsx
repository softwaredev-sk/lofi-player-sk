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
              href="https://www.jiosaavn.com/featured/chill-maaro-lo-fi-mix/mAA3xzx2Asqm0KYf4sgO,Q__"
              className="text-bold"
            >
              Chill Maaro: Lo-Fi Mix
            </Link>
            {playlist.includes(
              'https://www.jiosaavn.com/featured/chill-maaro-lo-fi-mix/mAA3xzx2Asqm0KYf4sgO,Q__'
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
                      'https://www.jiosaavn.com/featured/chill-maaro-lo-fi-mix/mAA3xzx2Asqm0KYf4sgO,Q__'
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
              href="https://www.jiosaavn.com/featured/monsoon-lofi-beats/68cGlQtgV9-b5bdQKACHDA__"
              className="text-bold"
            >
              Monsoon Lofi Beats
            </Link>
            {playlist.includes(
              'https://www.jiosaavn.com/featured/monsoon-lofi-beats/68cGlQtgV9-b5bdQKACHDA__'
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
                      'https://www.jiosaavn.com/featured/monsoon-lofi-beats/68cGlQtgV9-b5bdQKACHDA__'
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
