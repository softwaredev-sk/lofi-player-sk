import { forwardRef } from 'react';

export default Audio = forwardRef(function Audio({ src, onSelect }, ref) {
  return (
    <div className="">
      <audio autoplay id="audio" onEnded={onSelect} src={src} ref={ref}></audio>
    </div>
  );
});
