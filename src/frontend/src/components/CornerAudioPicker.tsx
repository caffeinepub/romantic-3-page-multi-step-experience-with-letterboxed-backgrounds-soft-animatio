import { useRef, useState } from 'react';
import { Music, Upload } from 'lucide-react';
import { useBackgroundAudio } from './BackgroundAudioProvider';

export default function CornerAudioPicker() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedFileName, setSelectedFileName] = useState<string>('');
  const { selectLocalAudioFile, statusMessage } = useBackgroundAudio();

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Validate it's an audio file
      if (file.type.startsWith('audio/')) {
        console.log('[CornerAudioPicker] File selected:', file.name, file.type);
        setSelectedFileName(file.name);
        selectLocalAudioFile(file);
      } else {
        console.warn('[CornerAudioPicker] Invalid file type:', file.type);
        alert('Please select a valid audio file (mp3, wav, m4a, ogg, etc.)');
      }
    }
  };

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="fixed top-4 left-4 z-50 flex flex-col gap-2">
      {/* File picker button */}
      <button
        onClick={handleButtonClick}
        className="bg-wine/90 hover:bg-wine text-white px-4 py-3 rounded-full shadow-lg transition-all duration-300 flex items-center gap-2 font-emily"
        aria-label="Choose a song file"
      >
        <Music className="w-5 h-5" />
        <Upload className="w-4 h-4" />
        <span className="hidden sm:inline">Choose Song</span>
      </button>

      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="audio/*,audio/mpeg,audio/mp3,audio/wav,audio/ogg,audio/mp4,audio/x-m4a"
        onChange={handleFileSelect}
        className="hidden"
        aria-label="Select audio file"
      />

      {/* Status messages */}
      {statusMessage && (
        <div className="bg-wine/95 text-white px-3 py-2 rounded-lg shadow-lg text-sm font-emily max-w-xs">
          {statusMessage}
        </div>
      )}

      {/* Selected file name */}
      {selectedFileName && (
        <div className="bg-honey-gold/90 text-wine px-3 py-2 rounded-lg shadow-lg text-sm font-emily max-w-xs truncate">
          Playing: {selectedFileName}
        </div>
      )}
    </div>
  );
}
