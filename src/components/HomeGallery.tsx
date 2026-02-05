import { useLanguage } from '@/context/LanguageContext';
import image from '@/assets/image.png';
import image1 from '@/assets/image1.png';

const HomeGallery = () => {
  const { t } = useLanguage();

  const images = [image, image1];

  return (
    <section id="gallery" className="py-20 bg-background">
      <div className="container">
        {/* Section Header */}
        <div className="text-center mb-14">
          <span className="inline-block px-4 py-1 bg-primary/10 text-primary font-semibold rounded-full text-sm mb-4">
            {t('gallery.badge')}
          </span>
          <h2 className="section-heading">{t('gallery.title')}</h2>
          <p className="section-subheading">{t('gallery.subtitle')}</p>
        </div>

        {/* Image Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-10 justify-items-center">
  {images.map((img, index) => (
    <div
      key={index}
      className="bg-white p-4 rounded-2xl shadow-md hover:shadow-xl transition w-full max-w-md"
    >
      <div className="border-[6px] border-yellow-500 rounded-xl p-2">
        <img
          src={img}
          alt={`Gallery ${index + 1}`}
          className="w-full h-[420px] object-contain rounded-lg bg-white"
        />
      </div>
    </div>
  ))}
</div>

      </div>
    </section>
  );
};

export default HomeGallery;