import { useAppContext } from '@/store/UrlContext';
import ParticlesContainer from './Particles';

export default function PraticlesProvider({ children }) {
  const { playStatus } = useAppContext();
  return (
    <div
      className={`fixed top-0 right-0 bottom-0 left-0 -z-10 ${
        playStatus ? 'animate-unfade' : 'animate-fade'
      }`}
    >
      {children}
    </div>
  );
}
