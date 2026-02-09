import { useState, type ReactNode } from 'react';
import { Heart } from 'lucide-react';

interface EnterWebsiteGateProps {
  children: ReactNode;
}

export default function EnterWebsiteGate({ children }: EnterWebsiteGateProps) {
  const [hasEntered, setHasEntered] = useState(false);

  const handleEnter = () => {
    setHasEntered(true);
  };

  if (hasEntered) {
    return <>{children}</>;
  }

  return (
    <div className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-gradient-to-br from-pink-500 via-rose-400 to-red-500">
      {/* Animated hearts background */}
      <div className="absolute inset-0 overflow-hidden">
        <Heart className="animate-float-heart-1 absolute text-white/20" size={48} style={{ left: '10%', top: '20%' }} />
        <Heart className="animate-float-heart-2 absolute text-white/30" size={64} style={{ left: '80%', top: '30%' }} />
        <Heart className="animate-float-heart-3 absolute text-pink-200/40" size={40} style={{ left: '20%', top: '70%' }} />
        <Heart className="animate-float-heart-4 absolute text-rose-200/30" size={56} style={{ left: '70%', top: '60%' }} />
        <Heart className="animate-float-heart-5 absolute text-white/25" size={44} style={{ left: '50%', top: '15%' }} />
        <Heart className="animate-float-heart-6 absolute text-pink-100/35" size={52} style={{ left: '30%', top: '50%' }} />
        <Heart className="animate-pulse-heart absolute text-red-300/40" size={72} style={{ left: '60%', top: '80%' }} />
        <Heart className="animate-float-heart-1 absolute text-white/20" size={36} style={{ left: '85%', top: '10%' }} />
        <Heart className="animate-float-heart-3 absolute text-rose-100/30" size={48} style={{ left: '15%', top: '85%' }} />
      </div>

      {/* Gradient overlay for depth */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-black/10" />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center gap-8 px-6 text-center">
        <div className="animate-pulse-heart">
          <Heart className="text-white drop-shadow-2xl" size={80} fill="currentColor" />
        </div>
        <h1 className="animate-fade-in font-david text-5xl text-white drop-shadow-lg md:text-6xl lg:text-7xl">
          Welcome
        </h1>
        <p className="animate-fade-in font-emily text-lg text-white drop-shadow-md md:text-xl lg:text-2xl">
          A special message awaits you
        </p>
        <button
          onClick={handleEnter}
          className="animate-delayed-fade-in rounded-full bg-white px-12 py-4 font-emily text-2xl text-rose-600 shadow-2xl transition-all hover:scale-105 hover:bg-rose-50 hover:shadow-rose-300/50 md:px-16 md:py-5 md:text-3xl"
        >
          Enter the Website
        </button>
      </div>
    </div>
  );
}
