import { Phone, MapPin, Mail } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import logo from '@/assets/logo.png';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const { t } = useLanguage();

  return (
    <footer className="bg-primary text-white">
      <div className="container py-12">
        <div className="grid md:grid-cols-3 gap-10">
          {/* Brand */}
          <div className="space-y-4">
  <div className="flex items-center gap-3">
    <img
      src={logo}
      alt="Amulya Agro Agencies Logo"
      className="w-12 h-12 object-contain"
    />
    <span className="text-xl font-bold">
      {t('footer.brandName')}
    </span>
  </div>

  <p className="text-white/70 leading-relaxed">
    {t('footer.tagline')}
  </p>
</div>


          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-lg mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <a href="#home" className="text-white/70 hover:text-secondary transition-colors">
                  {t('nav.home')}
                </a>
              </li>
              <li>
                <a href="#products" className="text-white/70 hover:text-secondary transition-colors">
                  {t('nav.products')}
                </a>
              </li>
              <li>
                <a href="#gallery" className="text-white/70 hover:text-secondary transition-colors">
                  {t('nav.gallery')}
                </a>
              </li>
              <li>
                <a href="#about" className="text-white/70 hover:text-secondary transition-colors">
                  {t('nav.about')}
                </a>
              </li>
              <li>
                <a href="#contact" className="text-white/70 hover:text-secondary transition-colors">
                  {t('nav.contact')}
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-bold text-lg mb-4">{t('footer.contactInfo')}</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-secondary flex-shrink-0 mt-0.5" />
                <div className="text-white/70">
                  <a href="tel:8008419933" className="block hover:text-secondary transition-colors">
                    +91 8008419933
                  </a>
                  <a href="tel:7981587873" className="block hover:text-secondary transition-colors">
                    +91 7981587873
                  </a>
                </div>
              </li>

              <li className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-secondary flex-shrink-0 mt-0.5" />
                <a href="mailto:Pdesu85@gmail.com" className="text-white/70 hover:text-secondary transition-colors">
                  Pdesu85@gmail.com
                </a>
              </li>

              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-secondary flex-shrink-0 mt-0.5" />
                <span className="text-white/70">
                  Gowri Shankar Complex, 8-7-164<br />
                  Station Road, Warangal - 506002
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-10 pt-8 border-t border-white/20">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-white/60 text-sm text-center md:text-left">
              {t('footer.copyright').replace('{year}', currentYear.toString())}
            </p>

            <div className="text-white/60 text-sm text-center md:text-right flex flex-col gap-1">
              <p>{t('footer.servingFarmers')}</p>

              <p>
                Made with <span className="text-red-400">❤️</span> by{" "}
                <a
                  href="https://staffarc.in"
                  target="_blank"
                  rel="noreferrer"
                  className="text-white hover:text-secondary font-semibold underline underline-offset-4 transition-colors"
                >
                  StaffArc
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
