import { useNavigate } from '@tanstack/react-router';
import FullscreenBackground from '../components/FullscreenBackground';
import RomanticButton from '../components/RomanticButton';
import { staticAssets } from '../assets/staticAssets';

export default function ProposalPage() {
  const navigate = useNavigate();

  const handleYesClick = () => {
    navigate({ to: '/final' });
  };

  return (
    <FullscreenBackground imageSrc={staticAssets.bgPage2}>
      <div className="relative z-10 flex min-h-screen flex-col items-center justify-center gap-12 px-6 py-12">
        {/* Question text - centered */}
        <h1 className="animate-fade-in font-emily text-4xl text-wine md:text-5xl lg:text-6xl">
          Will you marry me ?
        </h1>

        {/* YES button - below question */}
        <RomanticButton onClick={handleYesClick}>YES</RomanticButton>
      </div>
    </FullscreenBackground>
  );
}
