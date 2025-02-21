'use client';
import AudioComponent from '@/components/AudioComponent/AudioComponent';
import { useEffect, useRef, useState } from 'react';
import { useAppContext } from '@/store/UrlContext';
import PlayProgress from '../PlayProgress/PlayProgress';
import Attribution from '../Attribution/Attribution';
import { createPortal } from 'react-dom';
import dynamic from 'next/dynamic';

const ClientRandomFactComponent = dynamic(
  () => import('../RandomFact/RandomFact'),
  {
    ssr: false,
  }
);

export default function Main() {
  const ref = useRef();
  let interval = useRef();
  let idleTimer = useRef();
  let clickTimeout = useRef();
  let lastTouchX = useRef();

  const [hideLayer, setHideLayer] = useState(false);
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [error, setError] = useState(false);
  const [startX, setStartX] = useState(0);

  const [index, setIndex] = useState(-1);
  const { playStatus, setPlayStatus } = useAppContext(undefined);
  const [currentDuration, setCurrentDuration] = useState(0);
  const [songCount, setSongCount] = useState(5);
  const [srcUrl, setSrcUrl] = useState([{}]);

  useEffect(() => {
    (async () => {
      try {
        const songData = await fetch('/api/playlist');
        const songsResponseData = await songData.json();
        if (!songsResponseData.success) {
          throw new Error('Something went wrong!');
        }
        if (!songsResponseData.data) {
          return window.alert('Invalid Playlist');
        }

        const srcUrlData = songsResponseData.data.songs;
        setSrcUrl(srcUrlData);
        const songCount = songsResponseData.data.songs.length;

        setSongCount(songCount);
        setTimeout(() => {
          setIndex(Math.floor(Math.random() * songCount));
        }, 1000);
        if (playStatus === undefined) {
          setPlayStatus(false);
        } else {
          setPlayStatus(true);
        }
      } catch (err) {
        setError(err);
      }
    })();
  }, []);

  useEffect(() => {
    if (index < 0) return;
    if (!playStatus) {
      ref.current.pause();
      document.title = 'LoFi Playlist';
    } else {
      ref.current.play();
      document.title = srcUrl[index].name;
      if (!ref.current.currentTime) {
        ref.current.currentTime = 0;
      }
      interval.current = setInterval(() => {
        interval.current = null;
        if (ref.current) {
          setCurrentDuration(Math.floor(ref.current.currentTime));
        }
      }, 200);
    }
    return () => {
      clearInterval(interval.current);
    };
  }, [playStatus, index]);

  useEffect(() => {
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('touchmove', handleMouseMove);

    idleTimer.current = setTimeout(() => {
      idleTimer.current = null;
      setHideLayer(true);
    }, 2000);

    return () => {
      setHideLayer(false);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('touchmove', handleMouseMove);
      clearTimeout(idleTimer.current);
    };
  }, []);

  function handleDoubleClick() {
    let ind = Math.floor(Math.random() * songCount) % songCount;
    setIndex(ind);
    clearTimeout(clickTimeout.current);
    setPlayStatus(true);
  }

  function handleClick(e) {
    if (index < 0) return;
    const isMiddleButton = e.button === 1 && e.buttons === 4;
    const isContextMenu = e.button === 2;
    if (isContextMenu) {
      return;
    }
    if (clickTimeout.current) {
      clearTimeout(clickTimeout.current);
    }
    if (!isMiddleButton) {
      clickTimeout.current = setTimeout(() => {
        clickTimeout.current = null;
        setPlayStatus((prevState) => !prevState);
      }, 200);
      handleMouseMove();
    } else {
      lastTouchX.current = e.clientX;
      setStartX(e.clientX);
      setIsMouseDown(true);
    }
  }

  function handleMouseMove() {
    setHideLayer(false);
    clearTimeout(idleTimer.current);
    idleTimer.current = setTimeout(() => {
      idleTimer.current = null;
      setHideLayer(true);
    }, 2000);
  }

  function handleProgressBarClick(e) {
    e.stopPropagation();
    const maxTime = srcUrl[index].duration;
    const clickTime = (e.nativeEvent.offsetX / e.target.offsetWidth) * maxTime;
    ref.current.currentTime = clickTime;
    setCurrentDuration(clickTime);
  }

  function handleSongTimeChange(e) {
    if (e.type === 'wheel') {
      if (e.deltaY < 0) {
        ref.current.currentTime -= 0.01 * (Math.abs(e.deltaY) * 2);
      } else {
        ref.current.currentTime += 0.01 * (Math.abs(e.deltaY) * 2);
      }
      setCurrentDuration(ref.current.currentTime);
      handleMouseMove();
    } else if (e.type === 'touchmove') {
      setCurrentTrackDuration(e.touches[0].clientX, 2.5);
    } else if (isMouseDown) {
      setCurrentTrackDuration(e.clientX);
    }
  }

  function handleTouchStart(e) {
    lastTouchX.current = e.touches[0].clientX;
  }

  function setCurrentTrackDuration(clientX, factor = 5) {
    const leftSwipe = lastTouchX.current > clientX;
    const rightSwipe = lastTouchX.current < clientX;
    const swipeDistance = Math.abs(startX - clientX);
    if (leftSwipe) {
      ref.current.currentTime -= 0.01 * (swipeDistance / factor);
      setCurrentDuration(ref.current.currentTime);
    } else if (rightSwipe) {
      ref.current.currentTime += 0.01 * (swipeDistance / factor);
      setCurrentDuration(ref.current.currentTime);
    } else {
      // setStartX(clientX);
    }
    console.log(swipeDistance, lastTouchX.current, clientX);
    lastTouchX.current = clientX;
  }

  if (index < 0) {
    return (
      <>
        <ClientRandomFactComponent />
        <p className="text-slate-200 ml-4 text-xs">Preparing playlists...</p>
      </>
    );
  }

  if (error) {
    return (
      <>
        <ClientRandomFactComponent />
        <p className="text-slate-200 ml-4">
          Something went wrong! Please try again later.
        </p>
      </>
    );
  }

  return (
    <main
      className={`relative flex-auto z-40 bg-transparent ${
        hideLayer ? 'animate-fadeout' : 'animate-fadein'
      }`}
    >
      {/* {isLoaded && */}
      {index > -1 &&
        createPortal(
          <PlayProgress
            currentDuration={currentDuration}
            srcUrl={srcUrl}
            index={index}
            isLayerHidden={hideLayer}
            handleProgressBarClick={handleProgressBarClick}
          />,
          document.getElementById('player-progress')
        )}
      <div
        className={`absolute inset-0 [text-shadow:_1px_1px_1px_rgb(255_0_0_/_100%)] text-white px-2 select-none ${
          isMouseDown ? 'cursor-ew-resize' : 'cursor-default'
        }`}
        onDoubleClick={handleDoubleClick}
        onMouseMove={handleSongTimeChange}
        onTouchMove={handleSongTimeChange}
        onMouseDown={handleClick}
        onWheel={handleSongTimeChange}
        onTouchStart={handleTouchStart}
        onMouseUp={() => setIsMouseDown(false)}
        onTouchCancel={() => setIsMouseDown(false)}
        onTouchEnd={() => setIsMouseDown(false)}
        onMouseLeave={() => setIsMouseDown(false)}
      >
        {!playStatus && (
          <>
            <p className="">Click Once to Play/Pause.</p>
            <p>Double Click to Change Track.</p>
            <p>Double Click 'Home' to toggle Fullscreen.</p>
            <p className="mobile-only">
              Swipte left/right to adjust playback time
            </p>
            <p className="desktop-only">
              Use mousewheel or middle click and drag mouse to adjust playback
              time
            </p>
          </>
        )}
        {playStatus && (
          <p dangerouslySetInnerHTML={{ __html: srcUrl[index].name }}></p>
        )}
      </div>
      {index > -1 && (
        <AudioComponent
          src={srcUrl[index].url}
          ref={ref}
          onSelect={handleDoubleClick}
        />
      )}
      {createPortal(
        <Attribution isLayerHidden={hideLayer} />,
        document.getElementById('footer')
      )}
    </main>
  );
}
