import { useLanguage } from '@/context/LanguageContext';
import { Globe } from 'lucide-react';

interface LanguageToggleProps {
  isScrolled?: boolean;
  isHomePage?: boolean;
}

const LanguageToggle = ({ isScrolled = false, isHomePage = true }: LanguageToggleProps) => {
  const { language, setLanguage } = useLanguage();

  // Logic: Use white text when scrolled (green bg) or on other pages.
  // Use primary green when NOT scrolled on the home page (white bg).
  const textColor = isScrolled || !isHomePage 
    ? 'text-white' 
    : 'text-primary';

  return (
    <div className={`flex items-center gap-1 ${textColor} transition-colors duration-300`}>
      <Globe className="w-4 h-4" />
      
      <button
        onClick={() => setLanguage('te')}
        className={`px-2 py-1 text-sm font-medium rounded transition-colors ${
          language === 'te'
            ? 'bg-primary text-white' // Active button always green with white text
            : isScrolled || !isHomePage
            ? 'hover:bg-white/20'
            : 'hover:bg-primary/10'
        }`}
      >
        తెలుగు
      </button>

      <span className="opacity-50">|</span>

      <button
        onClick={() => setLanguage('en')}
        className={`px-2 py-1 text-sm font-medium rounded transition-colors ${
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