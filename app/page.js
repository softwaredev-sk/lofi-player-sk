'use client';
import Main from '@/components/Main/Main';
import ParticlesContainer from '@/components/Particles/Particles';

export default function Home() {
  return (
    <>
      <Main />
      <ParticlesContainer className="fixed top-0 right-0 bottom-0 left-0 -z-10" />
    </>
  );
}
