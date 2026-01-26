import farmerHero from '@/assets/farmer-hero.png';
import { useLanguage } from '@/context/LanguageContext';

const Hero = () => {
  const { t } = useLanguage();

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center bg-hero-gradient overflow-hidden"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-40 h-40 rounded-full bg-secondary blur-3xl" />
        <div className="absolute bottom-20 right-20 w-60 h-60 rounded-full bg-secondary blur-3xl" />
      </div>

      <div className="container relative z-10 py-20 pt-32">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="text-white space-y-6 animate-fade-in">
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
              <span className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
              <span className="text-sm font-medium">{t('hero.badge')}</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight">
              {t('hero.title1')}<br />
              <span className="text-secondary">{t('hero.title2')}</span>
            </h1>
            
            <p className="text-lg md:text-xl text-white/80 max-w-lg">
              {t('hero.subtitle')}
            </p>
            
            <div className="flex flex-wrap gap-4 pt-4">
              <a href="#products" className="btn-accent">
                {t('hero.viewProducts')}
              </a>
              <a href="#contact" className="btn-outline-hero">
                {t('hero.contactUs')}
              </a>
            </div>

            {/* Stats */}
            <div className="flex gap-8 pt-6">
              <div>
                <div className="text-3xl font-bold text-secondary">500+</div>
                <div className="text-white/70 text-sm">{t('hero.happyFarmers')}</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-secondary">50+</div>
                <div className="text-white/70 text-sm">{t('hero.products')}</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-secondary">25+</div>
                <div className="text-white/70 text-sm">{t('hero.yearsExperience')}</div>
              </div>
            </div>
          </div>

          {/* Right Content - Farmer Image */}
          <div className="relative flex justify-center md:justify-end animate-slide-in-right">
            <div className="relative">
              {/* Decorative circle */}
              <div className="absolute -inset-4 bg-secondary/20 rounded-full blur-2xl" />
              <img
                src={farmerHero}
                alt="Traditional Indian farmer ploughing with oxen"
                className="relative w-full max-w-md md:max-w-lg animate-float drop-shadow-2xl"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Wave Bottom */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z"
            fill="hsl(0 0% 100%)"
          />
        </svg>
      </div>
    </section>
  );
};

export default Hero;
