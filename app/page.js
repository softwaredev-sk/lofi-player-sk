'use client';
import AudioComponent from '@/components/AudioComponent/AudioComponent';
import { useEffect, useRef, useState } from 'react';
import ParticlesContainer from '@/components/Particles/Particles';
import { useAppContext } from '@/store/UrlContext';

export default function Home() {
  const ref = useRef();
  let interval = useRef();
  const [index, setIndex] = useState(0);
  const [playStatus, setPlayStatus] = useState(undefined);
  const [currentDuration, setCurrentDuration] = useState(0);
  const [songCount, setSongCount] = useState(5);
  const [srcUrl, setSrcUrl] = useState([
    {
      name: 'Tum Mile (Lofi Flip)',
      url: 'https://aac.saavncdn.com/259/1ee450f9addeccd7bb00e8ab19d9d3f4_320.mp4',
      duration: 242,
    },
    {
      name: 'Muskurane (Lofi Flip)',
      url: 'https://aac.saavncdn.com/886/11bf4b9deef49676028fba018bd6cecf_320.mp4',
      duration: 210,
    },
    {
      name: 'Zara Sa (Lofi Flip)',
      url: 'https://aac.saavncdn.com/990/7a5f1855b914096fb5e72ec432b162a1_320.mp4',
      duration: 212,
    },
    {
      name: 'Saibo (Lofi Flip)',
      url: 'https://aac.saavncdn.com/366/155d187a9b9322a51c4ef38f01dfbf51_320.mp4',
      duration: 145,
    },
    {
      name: 'Saawariya (DJ Akhil Talreja Lofi Edit)',
      url: 'https://aac.saavncdn.com/758/1ae11d9fe2a57ac05d8bf4288331e39c_320.mp4',
      duration: 283,
    },
  ]);
  const { playlist } = useAppContext();

  useEffect(() => {
    (async () => {
      let srcUrlData = [];
      const songData = await fetch(playlist);
      const songsResponseData = await songData.json();
      if (!songsResponseData.data) {
        return window.alert('Invalid Playlist');
      }
      songsResponseData.data.songs.forEach((song) => {
        srcUrlData.push({
          name: song.name,
          url: song.downloadUrl.at(-1).url,
          duration: song.duration,
        });
      });
      setSrcUrl(srcUrlData);
      setSongCount(songsResponseData.data.songCount);
      setIndex(Math.floor(Math.random() * songCount));
      if (ref.current.paused) {
        if (playStatus === undefined) {
          setPlayStatus(false);
        } else {
          setPlayStatus(true);
        }
      }
    })();
  }, [playlist]);

  useEffect(() => {
    if (!playStatus) {
      ref.current.pause();
    } else {
      ref.current.play();
      if (!ref.current.currentTime) {
        ref.current.currentTime = 0;
      }
      interval = setInterval(() => {
        setCurrentDuration(Math.floor(ref.current.currentTime));
      }, 200);
    }
    return () => {
      clearInterval(interval);
    };
  }, [playStatus, index]);

  function handleDoubleClick() {
    let ind = Math.floor(Math.random() * songCount);
    setIndex(ind);
  }

  function handleClick() {
    setPlayStatus((prevState) => !prevState);
  }

  return (
    <>
      <main
        className="fixed top-0 right-0 bottom-0 left-0 z-10 bg-transparent"
        onClick={handleClick}
        onDoubleClick={handleDoubleClick}
      >
        <p className="fixed bottom-2 left-4 py-1 px-2 border-2 border-red-100 rounded-full select-none">
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
          className="text-red-100 [text-shadow:_1px_1px_1px_rgb(255_0_0_/_100%)] bg-slate-700 py-1 px-2 rounded-full mx-2 "
        >
          {`00${Math.floor(
            (srcUrl[index].duration - currentDuration) / 60
          )}`.slice(-2) +
            ' : ' +
            `00${(srcUrl[index].duration - currentDuration) % 60}`.slice(-2)}
        </label>
        <div className="[text-shadow:_1px_1px_1px_rgb(255_0_0_/_100%)] text-white px-2 select-none">
          {!playStatus && (
            <>
              <p className="">Click Once to Play/Pause.</p>
              <p>Double Click to Change Track.</p>
              <p>Double Click 'Home' to go Fullscreen.</p>
            </>
          )}
          {playStatus && (
            <p dangerouslySetInnerHTML={{ __html: srcUrl[index].name }}></p>
          )}
        </div>
        <AudioComponent
          src={srcUrl[index].url}
          ref={ref}
          onSelect={handleDoubleClick}
        />
      </main>
      <ParticlesContainer className="absolute top-0 right-0 bottom-0 left-0 -z-10" />
    </>
  );
}
