import party from 'party-js';

export default function Attribution({ isLayerHidden }) {
  function handleClick(e) {
    const target = document.body;
    if (!target) return;
    const randInt = Math.floor(Math.random() * 360);
    const repeat = randInt % 8 || 2;
    const overridePartyOptions = {
      count: party.variation.range(20, 60),
      size: party.variation.range(0.4, 0.5),
      spread: party.variation.range(2, 80),
    };
    for (let i = 0; i < repeat; i++) {
      setTimeout(() => {
        console.log(repeat);
        if (randInt % 3 === 0) {
          party.sparkles(target, overridePartyOptions);
        } else {
          party.confetti(target, overridePartyOptions);
        }
      }, i * 200);
    }
  }
  return (
    <p
      className={`fixed bottom-2 left-4 py-1 px-2 border-2 border-red-100 transition-all rounded-full select-none z-50 ${
        isLayerHidden ? 'opacity-25' : 'opacity-100'
      }`}
      onClick={handleClick}
    >
      with 💖 by SK
    </p>
  );
}
