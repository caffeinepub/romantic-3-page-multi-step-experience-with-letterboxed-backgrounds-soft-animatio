import { type ReactNode, useEffect, useRef, useState } from 'react';
import { staticAssets } from '../assets/staticAssets';

interface BackgroundAudioProviderProps {
  children: ReactNode;
}

export default function BackgroundAudioProvider({ children }: BackgroundAudioProviderProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [userInteracted, setUserInteracted] = useState(false);

  useEffect(() => {
    // Create audio element
    const audio = new Audio(staticAssets.backgroundMusic);
    audio.loop = true;
    audio.volume = 0.5;
    audioRef.current = audio;

    // Try to autoplay
    const playPromise = audio.play();

    if (playPromise !== undefined) {
      playPromise.catch(() => {
        // Autoplay was prevented, wait for user interaction
        console.log('Autoplay prevented, waiting for user interaction');
      });
    }

    return () => {
      audio.pause();
      audio.src = '';
    };
  }, []);

  useEffect(() => {
    // Handle user interaction fallback
    const handleInteraction = () => {
      if (!userInteracted && audioRef.current) {
        audioRef.current.play().catch(() => {
          console.log('Failed to play audio on interaction');
        });
        setUserInteracted(true);
      }
    };

    document.addEventListener('click', handleInteraction, { once: true });
    document.addEventListener('touchstart', handleInteraction, { once: true });

    return () => {
      document.removeEventListener('click', handleInteraction);
      document.removeEventListener('touchstart', handleInteraction);
    };
  }, [userInteracted]);

  return <>{children}</>;
}
