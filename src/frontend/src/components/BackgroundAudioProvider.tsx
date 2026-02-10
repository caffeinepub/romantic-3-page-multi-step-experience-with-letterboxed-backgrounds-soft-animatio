import React, { createContext, useContext, useEffect, useRef, useState } from 'react';
import { Volume2, VolumeX } from 'lucide-react';

interface AudioContextType {
  isPlaying: boolean;
  isMuted: boolean;
  toggleMute: () => void;
  play: () => void;
  playFromGesture: () => Promise<void>;
}

const AudioContext = createContext<AudioContextType | null>(null);

export function useBackgroundAudio() {
  const context = useContext(AudioContext);
  if (!context) {
    throw new Error('useBackgroundAudio must be used within BackgroundAudioProvider');
  }
  return context;
}

export default function BackgroundAudioProvider({ children }: { children: React.ReactNode }) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [showFallback, setShowFallback] = useState(false);
  const gestureAttemptedRef = useRef(false);

  useEffect(() => {
    // Create audio element once
    const audio = new Audio('/assets/background-music.mp3');
    audio.loop = true;
    audio.volume = 0.5;
    audioRef.current = audio;

    // Log the audio source for debugging
    console.log('[BackgroundAudio] Audio element created with src:', audio.src);

    // Listen for load events to verify asset is available
    audio.addEventListener('loadeddata', () => {
      console.log('[BackgroundAudio] Audio loaded successfully, duration:', audio.duration);
    });

    audio.addEventListener('error', (e) => {
      console.error('[BackgroundAudio] Audio loading error:', {
        error: e,
        src: audio.src,
        currentSrc: audio.currentSrc,
        networkState: audio.networkState,
        readyState: audio.readyState
      });
    });

    // Attempt autoplay immediately
    const attemptAutoplay = async () => {
      try {
        console.log('[BackgroundAudio] Attempting autoplay...');
        await audio.play();
        console.log('[BackgroundAudio] Autoplay succeeded');
        setIsPlaying(true);
        setShowFallback(false);
      } catch (error) {
        const err = error as Error;
        console.log('[BackgroundAudio] Autoplay blocked:', {
          name: err.name,
          message: err.message,
          reason: 'Browser autoplay policy - will retry on user gesture'
        });
        // Don't show fallback immediately - wait for user gesture attempt
        setShowFallback(false);
      }
    };

    attemptAutoplay();

    // Cleanup
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.src = '';
      }
    };
  }, []);

  const play = async () => {
    if (audioRef.current && !isPlaying) {
      try {
        await audioRef.current.play();
        setIsPlaying(true);
        setShowFallback(false);
      } catch (error) {
        console.error('[BackgroundAudio] Play failed:', error);
      }
    }
  };

  const playFromGesture = async () => {
    if (audioRef.current && !isPlaying) {
      gestureAttemptedRef.current = true;
      try {
        console.log('[BackgroundAudio] Attempting play from user gesture...');
        await audioRef.current.play();
        console.log('[BackgroundAudio] Play from gesture succeeded');
        setIsPlaying(true);
        setShowFallback(false);
      } catch (error) {
        const err = error as Error;
        console.error('[BackgroundAudio] Play from gesture failed:', {
          name: err.name,
          message: err.message,
          src: audioRef.current.src,
          currentSrc: audioRef.current.currentSrc,
          readyState: audioRef.current.readyState,
          networkState: audioRef.current.networkState
        });
        // Only show fallback if gesture attempt also failed
        setShowFallback(true);
      }
    }
  };

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  return (
    <AudioContext.Provider value={{ isPlaying, isMuted, toggleMute, play, playFromGesture }}>
      {children}
      
      {/* Fallback button - only shown after gesture attempt fails */}
      {showFallback && gestureAttemptedRef.current && (
        <button
          onClick={play}
          className="fixed top-4 right-4 z-50 bg-wine/90 hover:bg-wine text-white px-4 py-2 rounded-full shadow-lg transition-all duration-300 flex items-center gap-2 font-emily"
          aria-label="Start background music"
        >
          <Volume2 className="w-5 h-5" />
          <span>Play Music</span>
        </button>
      )}

      {/* Mute/unmute control (only shown when playing) */}
      {isPlaying && !showFallback && (
        <button
          onClick={toggleMute}
          className="fixed top-4 right-4 z-50 bg-wine/90 hover:bg-wine text-white p-3 rounded-full shadow-lg transition-all duration-300"
          aria-label={isMuted ? 'Unmute music' : 'Mute music'}
        >
          {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
        </button>
      )}
    </AudioContext.Provider>
  );
}
