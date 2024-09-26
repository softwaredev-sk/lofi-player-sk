'use client';
import Main from '@/components/Main/Main';
import ParticlesContainer from '@/components/Particles/Particles';

import PraticlesProvider from '@/components/Particles/PraticlesProvider';

export default function Home() {
  return (
    <>
      <Main />
      <PraticlesProvider>
        <ParticlesContainer />
      </PraticlesProvider>
    </>
  );
}
