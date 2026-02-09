import { type ReactNode } from 'react';

interface FullscreenBackgroundProps {
  imageSrc: string;
  children: ReactNode;
}

export default function FullscreenBackground({ imageSrc, children }: FullscreenBackgroundProps) {
  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      {/* Background image with letterbox/contain behavior */}
      <div
        className="fixed inset-0 bg-black bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${imageSrc})`,
          backgroundSize: 'contain',
        }}
      />

      {/* Black transparent overlay */}
      <div className="fixed inset-0 bg-black/50" />

      {/* Content */}
      {children}
    </div>
  );
}
