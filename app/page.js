'use client';
import Audio from '@/components/Audio/Audio';
import { useEffect, useRef, useState } from 'react';
import ParticlesContainer from '@/components/Particles/Particles';

export default function Home() {
  const ref = useRef();
  const [index, setIndex] = useState(0);
  const [playStatus, setPlayStatus] = useState(true);
  const [currentDuration, setCurrentDuration] = useState(0);
  const [srcUrl, setSrcUrl] = useState([
    {
      url: 'https://aac.saavncdn.com/259/1ee450f9addeccd7bb00e8ab19d9d3f4_320.mp4',
      duration: '242',
    },
  ]);

  useEffect(() => {
    (async () => {
      const songData = await fetch(
        'https://saavn.dev/api/playlists?link=https://www.jiosaavn.com/featured/best-indian-lo-fi-hits/yh7x7lXtCVkGSw2I1RxdhQ__&limit=40'
      );
      const SongsResponseData = await songData.json();
      let srcUrlData = [];
      SongsResponseData.data.songs.forEach((song) => {
        srcUrlData.push({
          name: song.name,
          url: song.downloadUrl.at(-1).url,
          duration: song.duration,
        });
      });
      setSrcUrl(srcUrlData);
      setIndex(Math.floor(Math.random() * 40));
    })();
  }, []);

  useEffect(() => {
    if (playStatus) {
      ref.current.pause();
    } else {
      ref.current.play();
    }
  }, [playStatus, index]);

  useEffect(() => {
    let i = 0;
    if (!ref.current.currentTime) {
      ref.current.currentTime = 0;
    }
    const interval = setInterval(() => {
      setCurrentDuration(Math.floor(ref.current.currentTime));
    }, 400);

    return () => {
      clearInterval(interval);
    };
  }, [index]);

  function handleDoubleClick(e) {
    let ind = Math.floor(Math.random() * 40);
    setIndex(ind);
  }

  function handleClick(e) {
    setPlayStatus((prevState) => !prevState);
  }

  return (
    <>
      <main
        className="fixed top-0 right-0 bottom-0 left-0 z-10 bg-transparent"
        onClick={(e) => handleClick(e)}
        onDoubleClick={(e) => handleDoubleClick(e)}
      >
        <p className="fixed bottom-2 left-4 p-1 border-2 border-red-100 rounded-full">
          with 💖 by SK
        </p>
        <progress
          id="progress"
          value={currentDuration}
          max={srcUrl[index].duration}
          className="bg-white text-black w-full"
        ></progress>
        <label
          htmlFor="progress"
          className="text-red-100 [text-shadow:_1px_1px_1px_rgb(255_0_0_/_100%)] bg-slate-700 py-1 px-2 rounded-full mx-2"
        >
          {`00${Math.floor(
            (srcUrl[index].duration - currentDuration) / 60
          )}`.slice(-2) +
            ' : ' +
            `00${(srcUrl[index].duration - currentDuration) % 60}`.slice(-2)}
        </label>
        <div className="[text-shadow:_1px_1px_1px_rgb(255_0_0_/_100%)] text-white px-2">
          {playStatus && (
            <>
              <p className="">Click Once to Play/Pause.</p>
              <p>Double Click to Change Track.</p>
              <p>Double Click 'Home' to go Fullscreen.</p>
            </>
          )}
          {!playStatus && srcUrl[index].name}
        </div>
        <Audio src={srcUrl[index].url} ref={ref} onSelect={handleDoubleClick} />
      </main>
      <ParticlesContainer className="absolute top-0 right-0 bottom-0 left-0 -z-10" />
    </>
  );
}
