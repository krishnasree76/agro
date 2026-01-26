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
      <div className="relative h-32 xs:h-40 md:h-48 bg-muted/30 overflow-hidden shrink-0">
        <img
          src={product.image}
          alt={t(product.nameKey)}
          className={`w-full h-full object-contain p-4 transition-transform duration-500 group-hover:scale-110 ${
            !product.inStock ? "grayscale" : ""
          }`}
        />

        {/* Category Badge */}
        <span
          className={`absolute top-2 left-2 text-[10px] md:text-xs px-2 py-0.5 rounded-full font-bold shadow-sm ${
            product.category === "Seeds"
              ? "bg-green-100 text-green-700 border border-green-200"
              : "bg-blue-100 text-blue-700 border border-blue-200"
          }`}
        >
          {product.category === "Seeds" ? t("products.seeds") : t("products.pesticides")}
        </span>

        {/* Discount Badge */}
        {product.discountPercent && product.inStock && (
          <span className="absolute top-2 right-2 bg-red-600 text-white text-[10px] md:text-xs font-bold px-2 py-0.5 rounded shadow-sm">
            {product.discountPercent}% OFF
          </span>
        )}
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col flex-1">
        <h3 className="font-bold text-sm md:text-lg text-foreground mb-1 line-clamp-1">
          {t(product.nameKey)}
        </h3>

        <p className="text-muted-foreground text-[11px] md:text-sm mb-4 line-clamp-2 h-8 md:h-10">
          {t(product.descKey)}
        </p>

        {/* Action Row: Price & Quantity */}
        <div className="mt-auto space-y-3">
          <div className="flex items-end justify-between gap-2">
            <div>
              {product.discountPercent && (
                <p className="text-[10px] md:text-xs text-red-500 line-through">
                  ₹{product.price.toFixed(0)}
                </p>
              )}
              <p className="text-lg md:text-xl font-bold text-primary">
                ₹{finalPrice.toFixed(0)}
                <span className="text-muted-foreground text-[10px] md:text-xs font-normal">
                  /{product.unit}
                </span>
              </p>
            </div>

            <select
              value={qty}
              disabled={!product.inStock}
              onChange={(e) => setQty(Number(e.target.value))}
              className="border rounded-md px-1 py-1 text-xs md:text-sm bg-white focus:ring-1 focus:ring-primary outline-none"
            >
              {[1, 2, 3, 4, 5, 10].map((q) => (
                <option key={q} value={q}>
                  {q} {product.unit}(s)
                </option>
              ))}
            </select>
          </div>

          <button
            onClick={handleAddToCart}
            disabled={!product.inStock}
            className={`w-full py-2.5 px-4 flex items-center justify-center gap-2 rounded-lg font-semibold transition-all ${
              product.inStock
                ? "bg-primary text-white hover:bg-green-700 shadow-sm active:scale-95"
                : "bg-gray-200 text-gray-500 cursor-not-allowed"
            }`}
          >
            <ShoppingCart className="w-4 h-4" />
            <span className="text-xs md:text-sm uppercase tracking-wide">
              {product.inStock ? t("products.addToCart") : t("products.outOfStockLabel") || "Out of Stock"}
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