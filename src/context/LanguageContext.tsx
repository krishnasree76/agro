import { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'te' | 'en';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations: Record<Language, Record<string, string>> = {
  te: {
    // Navbar
    'brand.name': 'అమూల్య ఆగ్రో ఏజెన్సీస్',
    'nav.home': 'హోమ్',
    'nav.products': 'ఉత్పత్తులు',
    'nav.gallery': 'గ్యాలరీ',
    'nav.about': 'మా గురించి',
    'nav.contact': 'సంప్రదించండి',
    'nav.callNow': 'ఇప్పుడు కాల్ చేయండి',
    'nav.cart': 'కార్ట్',
    
    // Hero
    'hero.badge': 'వరంగల్ రైతులచే విశ్వసనీయం',
    'hero.title1': 'నాణ్యమైన విత్తనాలు &',
    'hero.title2': 'విశ్వసనీయ పురుగుమందులు',
    'hero.subtitle': 'వరంగల్‌లో ప్రీమియం వ్యవసాయ ఇన్‌పుట్‌లతో రైతులకు సేవ. మెరుగైన దిగుబడి మరియు ఆరోగ్యకరమైన పంటల కోసం మీ భాగస్వామి.',
    'hero.viewProducts': 'ఉత్పత్తులు చూడండి',
    'hero.contactUs': 'సంప్రదించండి',
    'hero.happyFarmers': 'సంతోషకరమైన రైతులు',
    'hero.products': 'ఉత్పత్తులు',
    'hero.yearsExperience': 'సంవత్సరాల అనుభవం',
    
    // Products
    'products.badge': 'మా ఉత్పత్తులు',
    'products.title': 'నాణ్యమైన వ్యవసాయ ఉత్పత్తులు',
    'products.subtitle': 'మెరుగైన దిగుబడి మరియు ఆరోగ్యకరమైన పంటల కోసం ప్రీమియం విత్తనాలు మరియు విశ్వసనీయ పురుగుమందులు',
    'products.addToCart': 'కార్ట్‌కు జోడించండి',
    'products.addedToCart': 'కార్ట్‌కు జోడించబడింది',
    'products.addedDesc': 'మీ కార్ట్‌కు జోడించబడింది.',
    'products.seeds': 'విత్తనాలు',
    'products.pesticides': 'పురుగుమందులు',
    'products.outOfStockLabel': 'స్టాక్ లేదు',
    
    // Product Names
    'product.paddy': 'వరి విత్తనాలు (BPT 5204)',
    'product.paddyDesc': 'అధిక దిగుబడి వరి సాగు కోసం ప్రీమియం నాణ్యత విత్తనాలు',
    'product.cotton': 'పత్తి విత్తనాలు (Bt Hybrid)',
    'product.cottonDesc': 'మెరుగైన ఫైబర్ నాణ్యత కోసం వ్యాధి-నిరోధక విత్తనాలు',
    'product.chilli': 'మిర్చి విత్తనాలు (తేజ)',
    'product.chilliDesc': 'మసాలా ఉత్పత్తి కోసం అధిక దిగుబడి రకం',
    'product.maize': 'మొక్కజొన్న విత్తనాలు (Hybrid)',
    'product.maizeDesc': 'మేత మరియు ధాన్యం కోసం ప్రీమియం హైబ్రిడ్ విత్తనాలు',
    'product.neem': 'వేప నూనె పురుగుమందు',
    'product.neemDesc': 'పర్యావరణ అనుకూల వ్యవసాయం కోసం సేంద్రీయ పురుగుమందు',
    'product.insecticide': 'కీటకనాశిని స్ప్రే',
    'product.insecticideDesc': 'అన్ని రకాల పంటలకు సమర్థవంతమైన కీటక నియంత్రణ',
    'product.fungicide': 'శిలీంధ్రనాశిని పౌడర్',
    'product.fungicideDesc': 'శక్తివంతమైన ఫంగల్ వ్యాధి నివారణ మరియు చికిత్స',
    'product.herbicide': 'హెర్బిసైడ్ లిక్విడ్',
    'product.herbicideDesc': 'పంటలను హాని చేయకుండా కలుపు నియంత్రణ',
    
    // About
    'about.badge': 'మా గురించి',
    'about.title': 'వ్యవసాయంలో మీ విశ్వసనీయ భాగస్వామి',
    'about.desc1': 'అమూల్య ఆగ్రో ఏజెన్సీస్ మెరుగైన దిగుబడి మరియు ఆరోగ్యకరమైన పంటలతో రైతులకు సహాయపడేందుకు నాణ్యమైన విత్తనాలు మరియు విశ్వసనీయ పురుగుమందులను అందిస్తుంది. స్టేషన్ రోడ్, వరంగల్‌లో ఉన్న మేము అసలు వ్యవసాయ ఉత్పత్తులు మరియు నిపుణుల మార్గదర్శకత్వాన్ని నిర్ధారిస్తాము.',
    'about.desc2': 'వరంగల్ మరియు చుట్టుపక్కల ప్రాంతాలలో వ్యవసాయ సమాజానికి పదేళ్ళకు పైగా సేవ అందించిన అనుభవంతో, విశ్వసనీయత, నాణ్యత మరియు రైతు-మొదటి సేవలో మేము మంచి పేరు సంపాదించాము.',
    'about.authorizedDealer': 'అధీకృత డీలర్',
    'about.qualityAssured': 'నాణ్యత హామీ',
    'about.genuineProducts': 'అసలు ఉత్పత్తులు',
    'about.genuineDesc': 'అన్ని ఉత్పత్తులు నేరుగా అధీకృత తయారీదారుల నుండి సేకరించబడ్డాయి',
    'about.bestPrices': 'ఉత్తమ ధరలు',
    'about.bestPricesDesc': 'సహేతుకమైన ఇన్‌పుట్‌లతో రైతులకు సహాయపడేందుకు పోటీ ధరలు',
    'about.farmerSupport': 'రైతు మద్దతు',
    'about.farmerSupportDesc': 'అన్ని వినియోగదారులకు నిపుణుల మార్గదర్శకత్వం మరియు అమ్మకాల తర్వాత మద్దతు',
    
    // Contact
    'contact.badge': 'సంప్రదించండి',
    'contact.title': 'మాతో సంప్రదించండి',
    'contact.subtitle': 'ప్రశ్నలు ఉన్నాయా? మేము సహాయం చేయడానికి ఇక్కడ ఉన్నాము. ఎప్పుడైనా మమ్మల్ని సంప్రదించండి.',
    'contact.phoneNumbers': 'ఫోన్ నంబర్లు',
    'contact.email': 'ఇమెయిల్',
    'contact.address': 'చిరునామా',
    'contact.businessHours': 'వ్యాపార సమయాలు',
    'contact.hours': 'ఎప్పుడూ తెరిచి ఉంటుంది (24/7 అందుబాటులో)',

    'contact.sendMessage': 'మాకు సందేశం పంపండి',
    'contact.yourName': 'మీ పేరు',
    'contact.enterName': 'మీ పేరు నమోదు చేయండి',
    'contact.phoneNumber': 'ఫోన్ నంబర్',
    'contact.enterPhone': 'మీ ఫోన్ నంబర్ నమోదు చేయండి',
    'contact.message': 'సందేశం',
    'contact.howCanWeHelp': 'మేము మీకు ఎలా సహాయం చేయగలము?',
    'contact.send': 'సందేశం పంపండి',
    'contact.sending': 'పంపుతోంది...',
    'contact.nearHeadPost': '(హెడ్ పోస్ట్ ఆఫీస్ దగ్గర, RS Brothers దగ్గర)',
    'contact.teluguAddress': 'అమూల్య ఆగ్రో ఏజెన్సీస్, స్టేషన్ రోడ్ వరంగల్',
    
    // Footer
    'footer.tagline': 'నాణ్యమైన విత్తనాలు మరియు పురుగుమందుల కోసం మీ విశ్వసనీయ భాగస్వామి. వరంగల్ రైతులకు అసలు వ్యవసాయ ఉత్పత్తులతో సేవ.',
    'footer.products': 'ఉత్పత్తులు',
    'footer.seeds': 'విత్తనాలు',
    'footer.pesticides': 'పురుగుమందులు',
    'footer.aboutUs': 'మా గురించి',
    'footer.contactUs': 'సంప్రదించండి',
    'footer.contactInfo': 'సంప్రదింపు సమాచారం',
    'footer.copyright': '© {year} అమూల్య ఆగ్రో ఏజెన్సీస్. అన్ని హక్కులు రిజర్వ్ చేయబడ్డాయి.',
    'footer.servingFarmers': 'నాణ్యమైన వ్యవసాయ ఉత్పత్తులతో వరంగల్ రైతులకు సేవ',
    
    // Cart
    'cart.title': 'మీ కార్ట్',
    'cart.items': 'ఐటమ్‌లు',
    'cart.empty': 'మీ కార్ట్ ఖాళీగా ఉంది',
    'cart.addProducts': 'ప్రారంభించడానికి ఉత్పత్తులను జోడించండి',
    'cart.clearCart': 'కార్ట్ క్లియర్ చేయండి',
    'cart.orderViaWhatsApp': 'WhatsApp ద్వారా ఆర్డర్ చేయండి',
    'cart.orderMessage': 'హాయ్, నేను ఈ క్రింది ఉత్పత్తులను ఆర్డర్ చేయాలనుకుంటున్నాను:\n\n{items}\n\nదయచేసి అందుబాటు మరియు మొత్తం ధరను నిర్ధారించండి.',
    
    // Gallery
    'gallery.badge': 'గ్యాలరీ',
    'gallery.title': 'మా ఫోటో గ్యాలరీ',
    'gallery.subtitle': 'మా దుకాణం, ఉత్పత్తులు మరియు సంతోషకరమైన రైతులను అన్వేషించండి',
    'gallery.image': 'చిత్రం',
    'gallery.addImage': 'మీ చిత్రం జోడించండి',
    'gallery.comingSoon': 'గ్యాలరీ త్వరలో వస్తుంది!',
    'gallery.comingSoonDesc': 'మా దుకాణం, ఉత్పత్తులు మరియు సంతృప్త రైతుల చిత్రాలు ఇక్కడ జోడించబడతాయి.',
  },
  en: {
    // Navbar
    'brand.name': 'Amulya Agro Agencies',
    'nav.home': 'Home',
    'nav.products': 'Products',
    'nav.gallery': 'Gallery',
    'nav.about': 'About Us',
    'nav.contact': 'Contact Us',
    'nav.callNow': 'Call Now',
    'nav.cart': 'Cart',
    
    // Hero
    'hero.badge': 'Trusted by Warangal Farmers',
    'hero.title1': 'Quality Seeds &',
    'hero.title2': 'Trusted Pesticides',
    'hero.subtitle': 'Serving farmers with premium agricultural inputs in Warangal. Your partner for better yield and healthy crops.',
    'hero.viewProducts': 'View Products',
    'hero.contactUs': 'Contact Us',
    'hero.happyFarmers': 'Happy Farmers',
    'hero.products': 'Products',
    'hero.yearsExperience': 'Years Experience',
    
    // Products
    'products.badge': 'Our Products',
    'products.title': 'Quality Agricultural Products',
    'products.subtitle': 'Premium seeds and trusted pesticides for better yield and healthy crops',
    'products.addToCart': 'Add to Cart',
    'products.addedToCart': 'Added to Cart',
    'products.addedDesc': 'has been added to your cart.',
    'products.seeds': 'Seeds',
    'products.pesticides': 'Pesticides',
    'products.outOfStockLabel': 'Out of Stock',
    
    // Product Names
    'product.paddy': 'Paddy Seeds (BPT 5204)',
    'product.paddyDesc': 'Premium quality paddy seeds for high yield rice cultivation',
    'product.cotton': 'Cotton Seeds (Bt Hybrid)',
    'product.cottonDesc': 'Disease-resistant cotton seeds for better fiber quality',
    'product.chilli': 'Chilli Seeds (Teja)',
    'product.chilliDesc': 'High-yielding red chilli variety for spice production',
    'product.maize': 'Maize Seeds (Hybrid)',
    'product.maizeDesc': 'Premium hybrid maize seeds for fodder and grain',
    'product.neem': 'Neem Oil Pesticide',
    'product.neemDesc': 'Organic neem-based pesticide for eco-friendly farming',
    'product.insecticide': 'Insecticide Spray',
    'product.insecticideDesc': 'Effective insect control for all crop types',
    'product.fungicide': 'Fungicide Powder',
    'product.fungicideDesc': 'Powerful fungal disease prevention and treatment',
    'product.herbicide': 'Herbicide Liquid',
    'product.herbicideDesc': 'Selective weed control without harming crops',
    
    // About
    'about.badge': 'About Us',
    'about.title': 'Your Trusted Partner in Agriculture',
    'about.desc1': 'Amulya Agro Agencies provides high-quality seeds and trusted pesticides to support farmers with better yield and healthy crops. Located at Station Road, Warangal, we ensure genuine agricultural products and expert guidance.',
    'about.desc2': 'With over a decade of experience serving the farming community of Warangal and surrounding areas, we have built a reputation for reliability, quality, and farmer-first service. Our commitment is to empower every farmer with the best agricultural inputs available.',
    'about.authorizedDealer': 'Authorized Dealer',
    'about.qualityAssured': 'Quality Assured',
    'about.genuineProducts': 'Genuine Products',
    'about.genuineDesc': 'All products are sourced directly from authorized manufacturers',
    'about.bestPrices': 'Best Prices',
    'about.bestPricesDesc': 'Competitive pricing to support farmers with affordable inputs',
    'about.farmerSupport': 'Farmer Support',
    'about.farmerSupportDesc': 'Expert guidance and after-sales support for all customers',
    
    // Contact
    'contact.badge': 'Contact Us',
    'contact.title': 'Get In Touch With Us',
    'contact.subtitle': 'Have questions? We\'re here to help. Reach out to us anytime.',
    'contact.phoneNumbers': 'Phone Numbers',
    'contact.email': 'Email',
    'contact.address': 'Address',
    'contact.businessHours': 'Business Hours',
    'contact.hours': 'Always Open (24/7 Available)',
    'contact.sendMessage': 'Send Us a Message',
    'contact.yourName': 'Your Name',
    'contact.enterName': 'Enter your name',
    'contact.phoneNumber': 'Phone Number',
    'contact.enterPhone': 'Enter your phone number',
    'contact.message': 'Message',
    'contact.howCanWeHelp': 'How can we help you?',
    'contact.send': 'Send Message',
    'contact.sending': 'Sending...',
    'contact.nearHeadPost': '(Near Head Post Office, Near RS Brothers)',
    'contact.teluguAddress': 'అమూల్య ఆగ్రో ఏజెన్సీస్, స్టేషన్ రోడ్ వరంగల్',
    
    // Footer
    'footer.tagline': 'Your trusted partner for quality seeds and pesticides. Serving farmers in Warangal with genuine agricultural products.',
    'footer.products': 'Products',
    'footer.seeds': 'Seeds',
    'footer.pesticides': 'Pesticides',
    'footer.aboutUs': 'About Us',
    'footer.contactUs': 'Contact Us',
    'footer.contactInfo': 'Contact Info',
    'footer.copyright': '© {year} Amulya Agro Agencies. All rights reserved.',
    'footer.servingFarmers': 'Serving Warangal farmers with quality agricultural products',
    
    // Cart
    'cart.title': 'Your Cart',
    'cart.items': 'items',
    'cart.empty': 'Your cart is empty',
    'cart.addProducts': 'Add products to get started',
    'cart.clearCart': 'Clear Cart',
    'cart.orderViaWhatsApp': 'Order via WhatsApp',
    'cart.orderMessage': 'Hi, I would like to order the following products:\n\n{items}\n\nPlease confirm availability and total price.',
    
    // Gallery
    'gallery.badge': 'Gallery',
    'gallery.title': 'Our Photo Gallery',
    'gallery.subtitle': 'Explore our store, products, and happy farmers',
    'gallery.image': 'Image',
    'gallery.addImage': 'Add your image',
    'gallery.comingSoon': 'Gallery Coming Soon!',
    'gallery.comingSoonDesc': 'Images of our store, products, and satisfied farmers will be added here.',
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>('te'); // Default to Telugu

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
