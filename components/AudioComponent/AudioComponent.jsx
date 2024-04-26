import { forwardRef } from 'react';

export default AudioComponent = forwardRef(function Audio(
  { src, onSelect },
  ref
) {
  return (
    <div className="">
      <audio autoplay id="audio" onEnded={onSelect} src={src} ref={ref}></audio>
    </div>
  );
});
