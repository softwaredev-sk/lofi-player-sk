import { forwardRef } from 'react';

const AudioComponent = forwardRef(function AudioComponent(
  { src, onSelect },
  ref
) {
  return (
    <div className="">
      <audio autoplay id="audio" onEnded={onSelect} src={src} ref={ref}></audio>
    </div>
  );
});

export default AudioComponent;
