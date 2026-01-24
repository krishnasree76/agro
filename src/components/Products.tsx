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
    <div className={`product-card group border rounded-xl transition ${product.inStock ? 'border-primary/30' : 'border-gray-300 opacity-90'}`}>
      {/* Image */}
      <div className="relative h-48 bg-muted overflow-hidden">
        <img
          src={product.image}
          alt={t(product.nameKey)}
          className={`w-full h-full object-contain p-4 transition-transform duration-300 group-hover:scale-110 ${!product.inStock ? 'grayscale' : ''}`}
        />

        {/* Category Badge */}
        <span className={`absolute top-3 left-3 ${product.category === 'Seeds' ? 'badge-seeds' : 'badge-pesticides'}`}>
          {product.category === 'Seeds' ? t('products.seeds') : t('products.pesticides')}
        </span>

        {/* Discount Badge */}
        {product.discountPercent && (
          <span className="absolute top-3 right-3 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
            {product.discountPercent}% OFF
          </span>
        )}

        {/* Out of Stock Badge */}
        {!product.inStock && (
          <span className="absolute bottom-3 right-3 bg-gray-900 text-white text-xs font-bold px-2 py-1 rounded-full">
            Out of Stock
          </span>
        )}
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="font-bold text-lg text-foreground mb-2 line-clamp-1">
          {t(product.nameKey)}
        </h3>
        <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
          {t(product.descKey)}
        </p>

        <div className="flex items-center justify-between">
          <div>
            <span className="text-2xl font-bold text-primary">{product.price}</span>
            <span className="text-muted-foreground text-sm"> / {product.unit}</span>
          </div>

          <button
            onClick={handleAddToCart}
            disabled={!product.inStock}
            className={`text-sm py-2 px-4 flex items-center gap-2 rounded-lg transition ${
              product.inStock
                ? 'btn-accent'
                : 'bg-gray-300 text-gray-600 cursor-not-allowed'
            }`}
          >
            <ShoppingCart className="w-4 h-4" />
            {product.inStock ? t('products.addToCart') : 'Out of Stock'}
          </button>
        </div>
      </div>
    </div>
  );
};

const Products = () => {
  const { t } = useLanguage();

  return (
    <section id="products" className="py-20 bg-muted/30">
      <div className="container">
        <div className="text-center mb-14">
          <span className="inline-block px-4 py-1 bg-primary/10 text-primary font-semibold rounded-full text-sm mb-4">
            {t('products.badge')}
          </span>
          <h2 className="section-heading">{t('products.title')}</h2>
          <p className="section-subheading">{t('products.subtitle')}</p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product, index) => (
            <div key={product.id} className="animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Products;
