import { type ReactNode } from 'react';

interface RomanticButtonProps {
  onClick: () => void;
  children: ReactNode;
}

export default function RomanticButton({ onClick, children }: RomanticButtonProps) {
  return (
    <button
      onClick={onClick}
      className="rounded-full bg-wine/80 px-12 py-4 font-emily text-2xl text-white backdrop-blur-sm transition-all hover:scale-105 hover:bg-wine md:px-16 md:py-5 md:text-3xl"
    >
      {children}
    </button>
  );
}
