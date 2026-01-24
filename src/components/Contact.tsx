import { useState } from 'react';
import { Phone, Mail, MapPin, Send, Clock } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

const Contact = () => {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Create WhatsApp message
    const message = encodeURIComponent(
      `New Enquiry from Website:\n\nName: ${formData.name}\nPhone: ${formData.phone}\nMessage: ${formData.message}`
    );
    
    window.open(`https://wa.me/918008419933?text=${message}`, '_blank');
    
    // Reset form
    setTimeout(() => {
      setFormData({ name: '', phone: '', message: '' });
      setIsSubmitting(false);
    }, 1000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <section id="contact" className="py-20 bg-muted/30">
      <div className="container">
        {/* Section Header */}
        <div className="text-center mb-14">
          <span className="inline-block px-4 py-1 bg-primary/10 text-primary font-semibold rounded-full text-sm mb-4">
            {t('contact.badge')}
          </span>
          <h2 className="section-heading">
            {t('contact.title')}
          </h2>
          <p className="section-subheading">
            {t('contact.subtitle')}
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div className="space-y-8">
            {/* Phone Numbers */}
            <div className="highlight-card flex items-start gap-5 text-left">
              <div className="flex-shrink-0 w-14 h-14 rounded-xl bg-accent/10 flex items-center justify-center">
                <Phone className="w-7 h-7 text-accent" />
              </div>
              <div>
                <h3 className="font-bold text-lg text-foreground mb-2">{t('contact.phoneNumbers')}</h3>
                <a href="tel:8008419933" className="block text-muted-foreground hover:text-primary transition-colors">
                  +91 8008419933
                </a>
                <a href="tel:7981587873" className="block text-muted-foreground hover:text-primary transition-colors">
                  +91 7981587873
                </a>
              </div>
            </div>

            {/* Email */}
            <div className="highlight-card flex items-start gap-5 text-left">
              <div className="flex-shrink-0 w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center">
                <Mail className="w-7 h-7 text-primary" />
              </div>
              <div>
                <h3 className="font-bold text-lg text-foreground mb-2">{t('contact.email')}</h3>
                <a href="mailto:Pdesu85@gmail.com" className="text-muted-foreground hover:text-primary transition-colors">
                  Pdesu85@gmail.com
                </a>
              </div>
            </div>

            {/* Address */}
            <div className="highlight-card flex items-start gap-5 text-left">
              <div className="flex-shrink-0 w-14 h-14 rounded-xl bg-secondary/30 flex items-center justify-center">
                <MapPin className="w-7 h-7 text-primary" />
              </div>
              <div>
                <h3 className="font-bold text-lg text-foreground mb-2">{t('contact.address')}</h3>
                <p className="text-muted-foreground mb-2">
                  Gowri Shankar Complex, 8-7-164<br />
                  Shetter No: 23, Station Road<br />
                  Warangal - 506002
                </p>
                <p className="text-muted-foreground text-sm">
                  {t('contact.nearHeadPost')}
                </p>
                <p className="text-muted-foreground text-sm mt-2 font-medium">
                  {t('contact.teluguAddress')}
                </p>
              </div>
            </div>

            {/* Business Hours */}
            <div className="highlight-card flex items-start gap-5 text-left">
              <div className="flex-shrink-0 w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center">
                <Clock className="w-7 h-7 text-primary" />
              </div>
              <div>
                <h3 className="font-bold text-lg text-foreground mb-2">{t('contact.businessHours')}</h3>
                <p className="text-muted-foreground whitespace-pre-line">
                  {t('contact.hours')}
                </p>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white rounded-2xl p-8 shadow-card">
            <h3 className="font-bold text-xl text-foreground mb-6">{t('contact.sendMessage')}</h3>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                  {t('contact.yourName')}
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="contact-input"
                  placeholder={t('contact.enterName')}
                />
              </div>
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-foreground mb-2">
                  {t('contact.phoneNumber')}
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="contact-input"
                  placeholder={t('contact.enterPhone')}
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
                  {t('contact.message')}
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={4}
                  className="contact-input resize-none"
                  placeholder={t('contact.howCanWeHelp')}
                />
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="btn-accent w-full flex items-center justify-center gap-2 disabled:opacity-70"
              >
                <Send className="w-5 h-5" />
                {isSubmitting ? t('contact.sending') : t('contact.send')}
              </button>
            </form>

            {/* Map Placeholder */}
            <div className="mt-8 rounded-xl overflow-hidden border border-border">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3794.7837766073814!2d79.5920428!3d17.9689125!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a3344e9ea9cc155%3A0x1e8a12a1d5a2e0c6!2sStation%20Rd%2C%20Warangal%2C%20Telangana%20506002!5e0!3m2!1sen!2sin!4v1706000000000!5m2!1sen!2sin"
                width="100%"
                height="200"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Amulya Agro Agencies Location"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
