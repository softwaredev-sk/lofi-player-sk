const RANDOM_FACTS = [
  'Music is physically good for your heart.',
  `Identical twins don't have the same fingerprints.`,
  `Venus is the only planet to spin clockwise`,
  `Bananas Are Berries, But Strawberries Aren't!`,
  `Lo-fi Hindi music saw a rise in popularity during the COVID-19 pandemic as people sought calming, stress-relieving music`,
  `Did you know? The slow, repetitive rhythms in lo-fi Hindi music can put your brain in a relaxed state similar to meditation.`,
  `People love listening to Lo-Fi Hindi tracks before sleep because of their calming effect.`,
  `Many people use Lo-Fi Hindi songs as background music while working or coding.`,
  `Black holes can be smaller than an atom but have the mass of a mountain!`,
  `The smell of fresh popcorn is so strong that some cinemas release artificial popcorn scent in their lobbies.`,
  `The human brain produces enough electricity to power a small lightbulb!`,
];

const randomFact =
  RANDOM_FACTS[Math.floor(Math.random() * RANDOM_FACTS.length)];

export default function RandomFact() {
  return (
    <p className="fixed left-1/2 top-1/2 -translate-x-1/2 m-0 p-4 -translate-y-1/2 text-center w-full text-sky-100 dark:text-gray-50 text-2xl">
      {randomFact}
    </p>
  );
}
