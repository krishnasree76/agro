import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Products from '@/components/Products';
import About from '@/components/About';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import HomeGallery from '@/components/HomeGallery'; // ✅ NEW

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <Products />
      <HomeGallery /> {/* ✅ Gallery now appears on Home */}
      <About />
      <Contact />
      <Footer />
    </div>
  );
};

export default Index;
