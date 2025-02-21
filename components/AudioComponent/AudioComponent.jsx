import { forwardRef } from 'react';

const AudioComponent = forwardRef(function AudioComponent(
  { src, onSelect },
  ref
) {
  return (
    <div className="hidden">
      <audio
        autoPlay={false}
        id="audio"
        onEnded={onSelect}
        src={src}
        ref={ref}
      ></audio>
    </div>
  );
});

export default AudioComponent;
