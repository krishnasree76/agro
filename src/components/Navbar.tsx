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
      <div className="container mx-auto flex items-center justify-between px-4">
        {/* Logo & Brand Name - prevent it from taking 100% width on small screens */}
        <a href={isHomePage ? "#home" : "/"} className="flex items-center gap-2 group max-w-[55%] md:max-w-none shrink-0">
          <img src={logo} alt="Logo" className="w-8 h-8 md:w-10 md:h-10 object-contain shrink-0" />
          <span
            className={`text-sm md:text-xl font-bold truncate transition-colors ${
              isScrolled ? 'text-white' : 'text-primary'
            }`}
          >
            {t('brand.name')}
          </span>
        </a>

        {/* Desktop & Mobile Actions Group */}
        <div className="flex items-center gap-2 md:gap-6 shrink-0">
          
          <div className="flex items-center gap-2 md:gap-6">
            <LanguageToggle isScrolled={isScrolled} isHomePage={isHomePage} />
            
            <div className="hidden md:flex items-center gap-6">
              {navLinks.map((link) => (
                <a 
                  key={link.name} 
                  href={link.href} 
                  className={`font-medium transition-colors ${isScrolled ? 'text-white/90 hover:text-white' : 'text-primary hover:text-green-700'}`}
                >
                  {link.name}
                </a>
              ))}
            </div>
          </div>

          {/* Cart Component */}
          <Cart isScrolled={isScrolled} />

          {/* Desktop Only Call Button - RED */}
          <div className="hidden md:block">
            <a 
              href="tel:8008419933" 
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors font-semibold"
            >
              <Phone className="w-4 h-4" />
              {t('nav.callNow')}
            </a>
          </div>

          {/* Mobile Hamburger Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={`md:hidden p-2 rounded-lg transition-colors ${isScrolled ? 'text-white hover:bg-white/10' : 'text-primary hover:bg-gray-100'}`}
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white border-t shadow-xl p-4 flex flex-col gap-2">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href} 
              onClick={() => setIsMobileMenuOpen(false)} 
              className="text-primary font-medium py-3 px-2 border-b border-gray-50"
            >
              {link.name}
            </a>
          ))}
          {/* Mobile Call Button - RED */}
          <a 
            href="tel:8008419933" 
            className="mt-2 bg-red-600 hover:bg-red-700 text-white flex items-center justify-center gap-2 py-4 rounded-lg font-bold transition-colors"
          >
            <Phone className="w-5 h-5" />
            {t('nav.callNow')}
          </a>
        </div>
      )}
    </nav>
  );
};

export default Navbar;