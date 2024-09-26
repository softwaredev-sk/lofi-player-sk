export default function PlayProgress({ currentDuration, srcUrl, index }) {
  return (
    <>
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
    </>
  );
}
