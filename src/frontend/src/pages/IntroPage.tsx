import { useNavigate } from '@tanstack/react-router';
import { useEffect, useState } from 'react';
import FullscreenBackground from '../components/FullscreenBackground';
import EnterWebsiteGate from '../components/EnterWebsiteGate';
import { staticAssets } from '../assets/staticAssets';

export default function IntroPage() {
  const navigate = useNavigate();
  const [showCTA, setShowCTA] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowCTA(true);
    }, 10000);

    return () => clearTimeout(timer);
  }, []);

  const handleCTAClick = () => {
    navigate({ to: '/proposal' });
  };

  return (
    <EnterWebsiteGate>
      <FullscreenBackground imageSrc={staticAssets.bgPage1}>
        <div className="relative z-10 flex min-h-screen flex-col items-center justify-center px-6 py-12">
          {/* Title - upper-middle */}
          <div className="absolute top-[20%] w-full text-center">
            <h1 className="animate-fade-in font-david text-5xl text-wine md:text-6xl lg:text-7xl">
              Nitia...
            </h1>
          </div>

          {/* Paragraph - centered middle */}
          <div className="max-w-3xl text-center">
            <p className="animate-fade-in font-emily text-lg leading-relaxed text-unicorn-silver md:text-xl lg:text-2xl">
              Baby genuinely thank you soo much meri life me aane ke liye aur usse itna acha banane ke
              liye ye toh bass choti si cheez hai aap ke liye bahut kuch kar sakta hun mei meri jaan I
              love you sooo much hope so aap ko pasand aayega mwahh 😘
            </p>
          </div>

          {/* CTA Box - bottom-right */}
          {showCTA && (
            <div
              onClick={handleCTAClick}
              className="animate-delayed-fade-in fixed bottom-8 right-8 cursor-pointer rounded-lg bg-black/60 p-4 backdrop-blur-sm transition-transform hover:scale-105 md:p-6"
              style={{ maxWidth: '200px' }}
            >
              <p className="animate-shine-blink font-times text-xs text-honey-gold md:text-sm">
                nitiaa baby ab apne pyaare haatho se next page ko open kar lo✨
              </p>
            </div>
          )}
        </div>
      </FullscreenBackground>
    </EnterWebsiteGate>
  );
}
