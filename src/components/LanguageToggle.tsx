import { useLanguage } from '@/context/LanguageContext';
import { Globe } from 'lucide-react';

interface LanguageToggleProps {
  isScrolled?: boolean;
  isHomePage?: boolean;
}

const LanguageToggle = ({ isScrolled = false, isHomePage = true }: LanguageToggleProps) => {
  const { language, setLanguage } = useLanguage();

  // Ensure visibility: Green text on white bg, White text on green bg
  const textColor = isScrolled || !isHomePage 
    ? 'text-white' 
    : 'text-primary';

  return (
    <div className={`flex items-center gap-0.5 md:gap-1 ${textColor} transition-colors duration-300`}>
      <Globe className="w-3 h-3 md:w-4 md:h-4 shrink-0" />
      
      <button
        onClick={() => setLanguage('te')}
        className={`px-1 md:px-2 py-0.5 text-[10px] md:text-sm font-medium rounded transition-colors ${
          language === 'te'
            ? 'bg-primary text-white' 
            : isScrolled || !isHomePage
            ? 'hover:bg-white/20'
            : 'hover:bg-primary/10'
        }`}
      >
        తెలుగు
      </button>

      <span className="opacity-30 text-[10px]">|</span>

      <button
        onClick={() => setLanguage('en')}
        className={`px-1 md:px-2 py-0.5 text-[10px] md:text-sm font-medium rounded transition-colors ${
          language === 'en'
            ? 'bg-primary text-white'
            : isScrolled || !isHomePage
            ? 'hover:bg-white/20'
            : 'hover:bg-primary/10'
        }`}
      >
        EN
      </button>
    </div>
  );
};

export default LanguageToggle;