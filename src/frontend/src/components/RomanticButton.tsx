import { type ReactNode } from 'react';

interface RomanticButtonProps {
  onClick: () => void;
  children: ReactNode;
  size?: 'default' | 'small';
}

export default function RomanticButton({ onClick, children, size = 'default' }: RomanticButtonProps) {
  const sizeClasses = size === 'small' 
    ? 'px-8 py-3 text-xl md:px-10 md:py-4 md:text-2xl'
    : 'px-12 py-4 text-2xl md:px-16 md:py-5 md:text-3xl';

  return (
    <button
      onClick={onClick}
      className={`rounded-full bg-wine/80 font-emily text-white backdrop-blur-sm transition-all hover:scale-105 hover:bg-wine ${sizeClasses}`}
    >
      {children}
    </button>
  );
}
