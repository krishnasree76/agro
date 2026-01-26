import { useState } from 'react';
import { ShoppingCart } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useLanguage } from '@/context/LanguageContext';
import { toast } from '@/hooks/use-toast';

// Asset Imports
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
  price: number;
  unit: string;
  image: string;
  inStock: boolean;
  discountPercent?: number;
}

const products: Product[] = [
  { id: 1, nameKey: 'product.paddy', descKey: 'product.paddyDesc', category: 'Seeds', price: 1250, unit: 'bag', image: paddySeeds, inStock: true, discountPercent: 10 },
  { id: 2, nameKey: 'product.cotton', descKey: 'product.cottonDesc', category: 'Seeds', price: 950, unit: 'pack', image: cottonSeeds, inStock: true, discountPercent: 12 },
  { id: 3, nameKey: 'product.chilli', descKey: 'product.chilliDesc', category: 'Seeds', price: 680, unit: 'pack', image: chilliSeeds, inStock: false, discountPercent: 15 },
  { id: 4, nameKey: 'product.maize', descKey: 'product.maizeDesc', category: 'Seeds', price: 1100, unit: 'bag', image: maizeSeeds, inStock: true },
  { id: 5, nameKey: 'product.neem', descKey: 'product.neemDesc', category: 'Pesticides', price: 320, unit: 'litre', image: neemOil, inStock: true, discountPercent: 20 },
  { id: 6, nameKey: 'product.insecticide', descKey: 'product.insecticideDesc', category: 'Pesticides', price: 480, unit: 'bottle', image: insecticide, inStock: true, discountPercent: 12 },
  { id: 7, nameKey: 'product.fungicide', descKey: 'product.fungicideDesc', category: 'Pesticides', price: 560, unit: 'pack', image: fungicide, inStock: false },
  { id: 8, nameKey: 'product.herbicide', descKey: 'product.herbicideDesc', category: 'Pesticides', price: 740, unit: 'bottle', image: herbicide, inStock: true },
];

const ProductCard = ({ product }: { product: Product }) => {
  const { addToCart } = useCart();
  const { t } = useLanguage();
  const [qty, setQty] = useState(1);

  const discountAmount = product.discountPercent
    ? (product.price * product.discountPercent) / 100
    : 0;

  const finalPrice = product.price - discountAmount;

  const handleAddToCart = () => {
    if (!product.inStock) return;
    addToCart({
      id: product.id,
      name: t(product.nameKey),
      price: finalPrice,
      unit: product.unit,
      quantity: qty,
    });
    toast({
      title: t("products.addedToCart"),
      description: `${qty} ${product.unit}(s) of ${t(product.nameKey)} added.`,
      duration: 2000,
    });
  };

  return (
    <div
      className={`group border rounded-xl overflow-hidden transition-all duration-300 bg-white flex flex-col h-full ${
        product.inStock
          ? "border-primary/20 hover:shadow-lg"
          : "border-gray-200 opacity-90"
      }`}
    >
      {/* Image Container */}
      <div className="relative h-28 xs:h-36 md:h-48 bg-muted/30 overflow-hidden shrink-0">
        <img
          src={product.image}
          alt={t(product.nameKey)}
          className={`w-full h-full object-contain p-2 md:p-4 transition-transform duration-500 group-hover:scale-110 ${
            !product.inStock ? "grayscale" : ""
          }`}
        />
        <span className="absolute top-1.5 left-1.5 text-[8px] md:text-xs px-1.5 py-0.5 rounded-full font-bold bg-white/80 backdrop-blur-sm border shadow-sm">
          {product.category === "Seeds" ? t("products.seeds") : t("products.pesticides")}
        </span>
        {product.discountPercent && product.inStock && (
          <span className="absolute top-1.5 right-1.5 bg-red-600 text-white text-[8px] md:text-xs font-bold px-1.5 py-0.5 rounded shadow-sm">
            {product.discountPercent}% OFF
          </span>
        )}
      </div>

      {/* Content */}
      <div className="p-2.5 md:p-4 flex flex-col flex-1">
        <h3 className="font-bold text-[13px] md:text-lg text-foreground mb-0.5 line-clamp-1">
          {t(product.nameKey)}
        </h3>
        <p className="text-muted-foreground text-[10px] md:text-sm mb-2 line-clamp-1">
          {t(product.descKey)}
        </p>

        <div className="mt-auto flex flex-col gap-2">
          {/* Quantity Selector - Styled to match global font */}
          <div className="flex flex-col gap-1">
            <span className="text-[9px] text-muted-foreground font-semibold uppercase tracking-wider">
              {t('cart.quantity') || 'Qty'}
            </span>
            <div className="relative">
              <select
                value={qty}
                disabled={!product.inStock}
                onChange={(e) => setQty(Number(e.target.value))}
                className="w-full border border-gray-200 rounded-md px-2 py-1.5 text-[11px] md:text-sm font-medium text-foreground bg-white appearance-none focus:ring-1 focus:ring-primary focus:border-primary outline-none transition-colors"
                style={{ fontFamily: 'inherit' }} // Force inheritance of website font
              >
                {[1, 2, 3, 4, 5, 10].map((q) => (
                  <option key={q} value={q} className="font-medium">
                    {q} {product.unit}(s)
                  </option>
                ))}
              </select>
              {/* Custom arrow icon for a cleaner look */}
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none text-muted-foreground">
                <svg className="w-3 h-3 fill-current" viewBox="0 0 20 20">
                  <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                </svg>
              </div>
            </div>
          </div>

          {/* Price Section */}
          <div className="py-1">
            {product.discountPercent && (
              <p className="text-[9px] md:text-xs text-red-500 font-medium line-through">
                ₹{product.price.toFixed(0)}
              </p>
            )}
            <p className="text-sm md:text-xl font-bold text-primary">
              ₹{finalPrice.toFixed(0)}
              <span className="text-muted-foreground text-[9px] md:text-xs font-normal">
                /{product.unit}
              </span>
            </p>
          </div>

          <button
            onClick={handleAddToCart}
            disabled={!product.inStock}
            className={`w-full py-2 flex items-center justify-center gap-1.5 rounded-lg font-bold transition-all ${
              product.inStock
                ? "bg-primary text-white hover:bg-green-700 shadow-sm active:scale-95"
                : "bg-gray-200 text-gray-500 cursor-not-allowed"
            }`}
          >
            <ShoppingCart className="w-3 h-3 md:w-4 md:h-4" />
            <span className="text-[10px] md:text-sm uppercase tracking-tight">
              {product.inStock ? t("products.addToCart") : "OUT OF STOCK"}
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
    <section id="products" className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
            {t('products.title')}
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {t('products.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Products;