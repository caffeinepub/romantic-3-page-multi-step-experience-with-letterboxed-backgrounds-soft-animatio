import React, { createContext, useContext, useEffect, useRef, useState } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import CornerAudioPicker from './CornerAudioPicker';

interface AudioContextType {
  isPlaying: boolean;
  isMuted: boolean;
  toggleMute: () => void;
  play: () => void;
  playFromGesture: () => Promise<void>;
  selectLocalAudioFile: (file: File) => void;
  statusMessage: string;
  hasPlayableSource: boolean;
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
  const objectUrlRef = useRef<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [showPlayButton, setShowPlayButton] = useState(false);
  const [statusMessage, setStatusMessage] = useState('');
  const [hasPlayableSource, setHasPlayableSource] = useState(true);
  const gestureAttemptedRef = useRef(false);

  useEffect(() => {
    // Create audio element once
    const audio = new Audio('/assets/background-music.mp3');
    audio.loop = true;
    audio.volume = 1.0; // Set to 100% volume (loud)
    audioRef.current = audio;

    // Log the audio source for debugging
    console.log('[BackgroundAudio] Audio element created with src:', audio.src);

    // Sync isPlaying state with actual audio playback
    const handlePlaying = () => {
      console.log('[BackgroundAudio] Audio started playing');
      setIsPlaying(true);
      setShowPlayButton(false);
      setStatusMessage('');
      setHasPlayableSource(true);
    };

    const handlePause = () => {
      console.log('[BackgroundAudio] Audio paused');
      setIsPlaying(false);
      // Show play button if gesture was attempted
      if (gestureAttemptedRef.current) {
        setShowPlayButton(true);
      }
    };

    const handleEnded = () => {
      console.log('[BackgroundAudio] Audio ended');
      setIsPlaying(false);
    };

    const handleVolumeChange = () => {
      setIsMuted(audio.muted);
    };

    // Listen for load events to verify asset is available
    audio.addEventListener('loadeddata', () => {
      console.log('[BackgroundAudio] Audio loaded successfully, duration:', audio.duration);
      setHasPlayableSource(true);
      setStatusMessage('');
    });

    audio.addEventListener('error', (e) => {
      console.error('[BackgroundAudio] Audio loading error:', {
        error: e,
        src: audio.src,
        currentSrc: audio.currentSrc,
        networkState: audio.networkState,
        readyState: audio.readyState
      });
      setHasPlayableSource(false);
      setStatusMessage('Default audio unavailable. Please choose a song file to play.');
    });

    // Add event listeners for state sync
    audio.addEventListener('playing', handlePlaying);
    audio.addEventListener('pause', handlePause);
    audio.addEventListener('ended', handleEnded);
    audio.addEventListener('volumechange', handleVolumeChange);

    // Attempt autoplay immediately
    const attemptAutoplay = async () => {
      try {
        console.log('[BackgroundAudio] Attempting autoplay...');
        await audio.play();
        console.log('[BackgroundAudio] Autoplay succeeded');
      } catch (error) {
        const err = error as Error;
        console.log('[BackgroundAudio] Autoplay blocked:', {
          name: err.name,
          message: err.message,
          reason: 'Browser autoplay policy - will retry on user gesture'
        });
        // Don't show play button yet - wait for user gesture attempt
      }
    };

    attemptAutoplay();

    // Cleanup
    return () => {
      if (audioRef.current) {
        audioRef.current.removeEventListener('playing', handlePlaying);
        audioRef.current.removeEventListener('pause', handlePause);
        audioRef.current.removeEventListener('ended', handleEnded);
        audioRef.current.removeEventListener('volumechange', handleVolumeChange);
        audioRef.current.pause();
        audioRef.current.src = '';
      }
      // Revoke object URL on unmount
      if (objectUrlRef.current) {
        URL.revokeObjectURL(objectUrlRef.current);
        objectUrlRef.current = null;
      }
    };
  }, []);

  const selectLocalAudioFile = (file: File) => {
    const audio = audioRef.current;
    if (!audio) return;

    // Revoke previous object URL if exists
    if (objectUrlRef.current) {
      URL.revokeObjectURL(objectUrlRef.current);
    }

    // Create new object URL for the selected file
    const objectUrl = URL.createObjectURL(file);
    objectUrlRef.current = objectUrl;

    console.log('[BackgroundAudio] Switching to local file:', file.name);

    // Pause current playback
    audio.pause();

    // Set new source
    audio.src = objectUrl;
    audio.load();

    setHasPlayableSource(true);
    setStatusMessage('');

    // Attempt to play the new file
    audio.play().catch((error) => {
      const err = error as Error;
      console.log('[BackgroundAudio] Play after file selection failed:', err.message);
      setShowPlayButton(true);
    });
  };

  const play = async () => {
    const audio = audioRef.current;
    if (!audio) return;

    // Check if we have a playable source
    if (!audio.src || audio.networkState === HTMLMediaElement.NETWORK_NO_SOURCE) {
      setStatusMessage('No audio source available. Please choose a song file to play.');
      console.log('[BackgroundAudio] Play attempted with no valid source');
      return;
    }

    // Check actual audio element state, not just React state
    if (audio.paused || audio.ended) {
      try {
        console.log('[BackgroundAudio] Manual play attempt, audio state:', {
          paused: audio.paused,
          ended: audio.ended,
          currentTime: audio.currentTime,
          readyState: audio.readyState,
          networkState: audio.networkState,
          muted: audio.muted,
          volume: audio.volume,
          src: audio.src,
          currentSrc: audio.currentSrc
        });
        await audio.play();
        console.log('[BackgroundAudio] Manual play succeeded');
        setStatusMessage('');
      } catch (error) {
        const err = error as Error;
        console.error('[BackgroundAudio] Manual play failed:', {
          name: err.name,
          message: err.message,
          audioState: {
            paused: audio.paused,
            ended: audio.ended,
            currentTime: audio.currentTime,
            readyState: audio.readyState,
            networkState: audio.networkState,
            muted: audio.muted,
            volume: audio.volume,
            src: audio.src,
            currentSrc: audio.currentSrc
          }
        });
        setStatusMessage('Unable to play audio. Please try choosing a different song file.');
      }
    } else {
      console.log('[BackgroundAudio] Audio already playing, skipping play attempt');
    }
  };

  const playFromGesture = async () => {
    const audio = audioRef.current;
    if (!audio) return;

    gestureAttemptedRef.current = true;

    // Check if we have a playable source
    if (!audio.src || audio.networkState === HTMLMediaElement.NETWORK_NO_SOURCE) {
      setStatusMessage('No audio source available. Please choose a song file to play.');
      setShowPlayButton(true);
      console.log('[BackgroundAudio] Play from gesture attempted with no valid source');
      return;
    }

    // Check actual audio element state
    if (audio.paused || audio.ended) {
      try {
        console.log('[BackgroundAudio] Attempting play from user gesture, audio state:', {
          paused: audio.paused,
          ended: audio.ended,
          currentTime: audio.currentTime,
          readyState: audio.readyState
        });
        await audio.play();
        console.log('[BackgroundAudio] Play from gesture succeeded');
        setStatusMessage('');
      } catch (error) {
        const err = error as Error;
        console.error('[BackgroundAudio] Play from gesture failed:', {
          name: err.name,
          message: err.message,
          audioState: {
            paused: audio.paused,
            ended: audio.ended,
            currentTime: audio.currentTime,
            readyState: audio.readyState,
            networkState: audio.networkState,
            muted: audio.muted,
            volume: audio.volume,
            src: audio.src,
            currentSrc: audio.currentSrc
          }
        });
        // Show play button for retry
        setShowPlayButton(true);
        setStatusMessage('Unable to play audio. Please try choosing a song file.');
      }
    } else {
      console.log('[BackgroundAudio] Audio already playing from gesture, skipping');
    }
  };

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  return (
    <AudioContext.Provider value={{ 
      isPlaying, 
      isMuted, 
      toggleMute, 
      play, 
      playFromGesture, 
      selectLocalAudioFile,
      statusMessage,
      hasPlayableSource
    }}>
      {children}
      
      {/* Corner audio picker */}
      <CornerAudioPicker />

      {/* Play button - shown when audio is not playing and gesture was attempted */}
      {showPlayButton && !isPlaying && (
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
      {isPlaying && (
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
