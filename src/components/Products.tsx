import { ShoppingCart } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useLanguage } from '@/context/LanguageContext';
import { toast } from '@/hooks/use-toast';
import paddySeeds from '@/assets/paddy-seeds.png';
import cottonSeeds from '@/assets/cotton-seeds.png';
import chilliSeeds from '@/assets/chilli-seeds.png';
import maizeSeeds from '@/assets/maize-seeds.png';
import neemOil from '@/assets/neem-oil.png';
import insecticide from '@/assets/insecticide.png';
import fungicide from '@/assets/fungicide.png';
import herbicide from '@/assets/herbicide.png';

interface Product {
  id: number;
  nameKey: string;
  descKey: string;
  category: 'Seeds' | 'Pesticides';
  price: string;
  unit: string;
  image: string;
  inStock: boolean; // ✅ NEW
  discountPercent?: number; // ✅ NEW
}

const products: Product[] = [
  { id: 1, nameKey: 'product.paddy', descKey: 'product.paddyDesc', category: 'Seeds', price: '₹1,250', unit: 'bag', image: paddySeeds, inStock: true, discountPercent: 10 },
  { id: 2, nameKey: 'product.cotton', descKey: 'product.cottonDesc', category: 'Seeds', price: '₹950', unit: 'pack', image: cottonSeeds, inStock: true, discountPercent: 12 },
  { id: 3, nameKey: 'product.chilli', descKey: 'product.chilliDesc', category: 'Seeds', price: '₹680', unit: 'pack', image: chilliSeeds, inStock: false, discountPercent: 15 }, // OUT
  { id: 4, nameKey: 'product.maize', descKey: 'product.maizeDesc', category: 'Seeds', price: '₹1,100', unit: 'bag', image: maizeSeeds, inStock: true },
  { id: 5, nameKey: 'product.neem', descKey: 'product.neemDesc', category: 'Pesticides', price: '₹320', unit: 'litre', image: neemOil, inStock: true, discountPercent: 20 },
  { id: 6, nameKey: 'product.insecticide', descKey: 'product.insecticideDesc', category: 'Pesticides', price: '₹480', unit: 'bottle', image: insecticide, inStock: true, discountPercent: 12 },
  { id: 7, nameKey: 'product.fungicide', descKey: 'product.fungicideDesc', category: 'Pesticides', price: '₹560', unit: 'pack', image: fungicide, inStock: false }, // OUT
  { id: 8, nameKey: 'product.herbicide', descKey: 'product.herbicideDesc', category: 'Pesticides', price: '₹740', unit: 'bottle', image: herbicide, inStock: true },
];

const ProductCard = ({ product }: { product: Product }) => {
  const { addToCart } = useCart();
  const { t } = useLanguage();

  const handleAddToCart = () => {
    if (!product.inStock) {
      toast({
        title: "Out of Stock",
        description: `${t(product.nameKey)} is currently unavailable.`,
        variant: "destructive",
      });
      return;
    }

    addToCart({
      id: product.id,
      name: t(product.nameKey),
      price: product.price,
      unit: product.unit,
    });

    toast({
      title: t('products.addedToCart'),
      description: `${t(product.nameKey)} ${t('products.addedDesc')}`,
    });
  };

  return (
    <div className={`product-card group border rounded-xl overflow-hidden transition-all duration-300 bg-white ${product.inStock ? 'border-primary/20 hover:shadow-md' : 'border-gray-200 opacity-90'}`}>
      {/* Image Container - Slightly shorter on mobile */}
      <div className="relative h-32 xs:h-40 md:h-48 bg-muted/50 overflow-hidden">
        <img
          src={product.image}
          alt={t(product.nameKey)}
          className={`w-full h-full object-contain p-2 md:p-4 transition-transform duration-300 group-hover:scale-110 ${!product.inStock ? 'grayscale' : ''}`}
        />

        {/* Category Badge - Smaller on mobile */}
        <span className={`absolute top-2 left-2 text-[10px] md:text-xs px-2 py-0.5 rounded-full font-medium ${product.category === 'Seeds' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'}`}>
          {product.category === 'Seeds' ? t('products.seeds') : t('products.pesticides')}
        </span>

        {/* Discount Badge */}
        {product.discountPercent && product.inStock && (
          <span className="absolute top-2 right-2 bg-red-500 text-white text-[10px] md:text-xs font-bold px-1.5 py-0.5 rounded-md">
            {product.discountPercent}%
          </span>
        )}
      </div>

      {/* Content Container - Reduced padding on mobile */}
      <div className="p-3 md:p-5">
        <h3 className="font-bold text-sm md:text-lg text-foreground mb-1 line-clamp-1">
          {t(product.nameKey)}
        </h3>
        
        {/* Description - Hidden or very short on mobile to prevent congestion */}
        <p className="text-muted-foreground text-[11px] md:text-sm mb-3 line-clamp-1 md:line-clamp-2">
          {t(product.descKey)}
        </p>

        <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
          <div className="flex items-baseline gap-1">
            <span className="text-base md:text-xl font-bold text-primary">{product.price}</span>
            <span className="text-muted-foreground text-[10px] md:text-sm">/{product.unit}</span>
          </div>

          <button
            onClick={handleAddToCart}
            disabled={!product.inStock}
            className={`w-full md:w-auto text-[11px] md:text-sm py-1.5 md:py-2 px-3 flex items-center justify-center gap-1.5 rounded-lg transition-all ${
              product.inStock
                ? 'bg-primary text-white hover:bg-primary-hover shadow-sm active:scale-95'
                : 'bg-gray-200 text-gray-500 cursor-not-allowed'
            }`}
          >
            <ShoppingCart className="w-3.5 h-3.5" />
            <span className="whitespace-nowrap">
               {product.inStock ? t('products.addToCart') : 'Out'}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

const Products = () => {
  const { t } = useLanguage();

  return (
    <section id="products" className="py-12 md:py-20 bg-muted/30">
      <div className="container px-4">
        <div className="text-center mb-8 md:mb-14">
          <span className="inline-block px-3 py-1 bg-primary/10 text-primary font-semibold rounded-full text-[12px] md:text-sm mb-3">
            {t('products.badge')}
          </span>
          <h2 className="text-2xl md:text-4xl font-bold text-foreground mb-2">{t('products.title')}</h2>
          <p className="text-sm md:text-base text-muted-foreground max-w-2xl mx-auto">{t('products.subtitle')}</p>
        </div>

        {/* Updated Grid: 2 columns on mobile, 4 on desktop */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6">
          {products.map((product, index) => (
            <div key={product.id} className="animate-fade-in" style={{ animationDelay: `${index * 0.05}s` }}>
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Products;