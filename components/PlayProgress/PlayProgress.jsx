import { useEffect, useState } from 'react';

const TIME_LABEL = {
  0: { current: 'elapsed', total: true },
  1: { current: 'remaining', total: true },
  2: { current: 'elapsed', total: false },
  3: { current: 'remaining', total: false },
};

export default function PlayProgress({
  currentDuration,
  srcUrl,
  index,
  isLayerHidden,
  handleProgressBarClick,
}) {
  const [timeLabelIndex, setTimeLabelIndex] = useState(0);
  const [timeLabel, setTimerLabel] = useState(TIME_LABEL[timeLabelIndex]);

  function toggleTimerLabel(e) {
    e.stopPropagation();
    console.log(timeLabelIndex);
    setTimeLabelIndex(
      (prevIndex) => (prevIndex + 1) % Object.keys(TIME_LABEL).length
    );
  }

  useEffect(() => {
    console.log(timeLabelIndex);
    setTimerLabel(TIME_LABEL[timeLabelIndex]);
  }, [timeLabelIndex]);

  return (
    <>
      <div
        htmlFor="progress"
        className={`relative top-1 block text-red-100 bg-slate-700 rounded-full mx-0 z-20 w-full h-full transition-all overflow-hidden`}
        onClick={handleProgressBarClick}
      >
        <div
          className={`absolute left-4 top-1/2 -translate-y-1/2 h-fit text-xs/3 bg-slate-400 rounded-full px-2 py-[0.1rem] text-orange-900 dark:text-slate-900 ${
            isLayerHidden ? 'mix-blend-overlay' : 'mix-blend-difference'
          } z-30 cursor-default select-none pointer-events-all`}
          onClick={toggleTimerLabel}
        >
          {timeLabel.current === 'remaining' &&
            `00${Math.floor(
              (srcUrl[index].duration - currentDuration) / 60
            )}`.slice(-2) +
              ' : ' +
              `00${(srcUrl[index].duration - currentDuration) % 60}`.slice(-2)}
          {timeLabel.current === 'elapsed' &&
            `00${Math.floor(currentDuration / 60)}`.slice(-2) +
              ' : ' +
              `00${currentDuration % 60}`.slice(-2)}

          {timeLabel.total &&
            ' / ' +
              `00${Math.floor(srcUrl[index].duration / 60)}`.slice(-2) +
              ' : ' +
              `00${srcUrl[index].duration % 60}`.slice(-2)}
        </div>

        <span
          className={`block h-full transition ease-in-out pointer-events-none duration-300 ${
            isLayerHidden ? 'opacity-50' : 'opacity-100'
          }`}
          style={{
            width: `${(currentDuration / srcUrl[index].duration) * 100}%`,
          }}
        >
          <span className="relative block progress h-full bg-green-400 dark:bg-red-400 transition ease-in-out duration-300 pointer-events-none overflow-hidden">
            <span className="block invisible max-w-0">.</span>
          </span>
        </span>
      </div>
    </>
  );
}
