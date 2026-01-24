import { useState, useEffect } from 'react';
import { Menu, X, Phone } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import Cart from './Cart';
import LanguageToggle from './LanguageToggle';
import { useLanguage } from '@/context/LanguageContext';
import logo from '@/assets/logo.png';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const isHomePage = location.pathname === '/';
  const { t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: t('nav.home'), href: isHomePage ? '#home' : '/', isRoute: !isHomePage },
    { name: t('nav.products'), href: isHomePage ? '#products' : '/#products', isRoute: !isHomePage },
    { name: t('nav.gallery'), href: isHomePage ? '#gallery' : '/#gallery', isRoute: !isHomePage },
    { name: t('nav.about'), href: isHomePage ? '#about' : '/#about', isRoute: !isHomePage },
    { name: t('nav.contact'), href: isHomePage ? '#contact' : '/#contact', isRoute: !isHomePage },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-primary shadow-navbar py-2' : 'bg-white py-3'
      }`}
    >
      <div className="container mx-auto flex items-center justify-between px-2 md:px-4">
        {/* Logo & Brand Name - Compact on Mobile */}
        <a href={isHomePage ? "#home" : "/"} className="flex items-center gap-1.5 md:gap-3 group min-w-0">
          <img src={logo} alt="Logo" className="w-7 h-7 md:w-10 md:h-10 object-contain shrink-0" />
          <span
            className={`text-sm md:text-xl font-bold whitespace-nowrap transition-colors ${
              isScrolled ? 'text-white' : 'text-primary'
            }`}
          >
            {t('brand.name')}
          </span>
        </a>

        {/* Desktop & Mobile Actions Group */}
        <div className="flex items-center gap-1.5 md:gap-6 shrink-0">
          
          {/* Toggle and Nav Links (Links hidden on Mobile) */}
          <div className="flex items-center gap-1.5 md:gap-6">
            <LanguageToggle isScrolled={isScrolled} isHomePage={isHomePage} />
            
            <div className="hidden md:flex items-center gap-6">
              {navLinks.map((link) => (
                link.isRoute ? (
                  <Link 
                    key={link.name} 
                    to={link.href} 
                    className={`font-medium transition-colors ${isScrolled ? 'text-white/90 hover:text-white' : 'text-primary hover:text-green-700'}`}
                  >
                    {link.name}
                  </Link>
                ) : (
                  <a 
                    key={link.name} 
                    href={link.href} 
                    className={`font-medium transition-colors ${isScrolled ? 'text-white/90 hover:text-white' : 'text-primary hover:text-green-700'}`}
                  >
                    {link.name}
                  </a>
                )
              ))}
            </div>
          </div>

          <Cart />

          {/* Desktop Only Call Button */}
          <div className="hidden md:block">
            <a href="tel:8008419933" className="btn-accent flex items-center gap-2">
              <Phone className="w-4 h-4" />
              {t('nav.callNow')}
            </a>
          </div>

          {/* Mobile Hamburger Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={`md:hidden p-1.5 rounded-lg ${isScrolled ? 'text-white' : 'text-primary'}`}
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown (Nav Links only) */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white border-t shadow-lg p-4 flex flex-col gap-4">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href} 
              onClick={() => setIsMobileMenuOpen(false)} 
              className="text-primary font-medium py-2 border-b border-gray-100"
            >
              {link.name}
            </a>
          ))}
          <a href="tel:8008419933" className="btn-accent flex items-center justify-center gap-2 py-3">
            <Phone className="w-4 h-4" />
            {t('nav.callNow')}
          </a>
        </div>
      )}
    </nav>
  );
};

export default Navbar;