import { CheckCircle, Award, IndianRupee, Users } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

const About = () => {
  const { t } = useLanguage();

  const highlights = [
    {
      icon: CheckCircle,
      titleKey: 'about.genuineProducts',
      descKey: 'about.genuineDesc',
    },
    {
      icon: IndianRupee,
      titleKey: 'about.bestPrices',
      descKey: 'about.bestPricesDesc',
    },
    {
      icon: Users,
      titleKey: 'about.farmerSupport',
      descKey: 'about.farmerSupportDesc',
    },
  ];

  return (
    <section id="about" className="py-20 bg-white">
      <div className="container">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-6">
            <span className="inline-block px-4 py-1 bg-primary/10 text-primary font-semibold rounded-full text-sm">
              {t('about.badge')}
            </span>
            <h2 className="section-heading !text-left !mb-6">
              {t('about.title')}
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed">
              <strong className="text-foreground">Amulya Agro Agencies</strong> {t('about.desc1').replace('Amulya Agro Agencies ', '')}
            </p>
            <p className="text-muted-foreground leading-relaxed">
              {t('about.desc2')}
            </p>

            {/* Awards/Trust Badges */}
            <div className="flex items-center gap-4 pt-4">
              <div className="flex items-center gap-2 bg-secondary/20 px-4 py-2 rounded-full">
                <Award className="w-5 h-5 text-primary" />
                <span className="text-sm font-medium text-foreground">{t('about.authorizedDealer')}</span>
              </div>
              <div className="flex items-center gap-2 bg-secondary/20 px-4 py-2 rounded-full">
                <CheckCircle className="w-5 h-5 text-primary" />
                <span className="text-sm font-medium text-foreground">{t('about.qualityAssured')}</span>
              </div>
            </div>
          </div>

          {/* Right - Highlight Cards */}
          <div className="space-y-6">
            {highlights.map((item, index) => (
              <div
                key={item.titleKey}
                className="highlight-card flex items-start gap-5 text-left animate-fade-in"
                style={{ animationDelay: `${index * 0.15}s` }}
              >
                <div className="flex-shrink-0 w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center">
                  <item.icon className="w-7 h-7 text-primary" />
                </div>
                <div>
                  <h3 className="font-bold text-lg text-foreground mb-1">{t(item.titleKey)}</h3>
                  <p className="text-muted-foreground">{t(item.descKey)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
