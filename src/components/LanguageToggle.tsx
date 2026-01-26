import { useLanguage } from '@/context/LanguageContext';
import { Globe } from 'lucide-react';

interface LanguageToggleProps {
  isScrolled: boolean;
  isHomePage: boolean;
}

const LanguageToggle = ({ isScrolled }: LanguageToggleProps) => {
  const { language, setLanguage } = useLanguage();

  // Determine the color based on scroll state (matches your brand name logic)
  const textColor = isScrolled ? 'text-white' : 'text-primary';

  return (
    <button
      onClick={() => setLanguage(language === 'en' ? 'te' : 'en')}
      className={`flex items-center gap-1.5 px-2 py-1 rounded-md transition-all hover:bg-black/5 ${textColor}`}
    >
      <Globe className="w-4 h-4" />
      <span className="text-xs md:text-sm font-bold uppercase tracking-wider">
        {/* If current is English, show 'తెలుగు'. If current is Telugu, show 'EN' */}
        {language === 'en' ? 'తెలుగు' : 'ENGLISH'}
      </span>
    </button>
  );
};

export default LanguageToggle;