import { useEffect, useState } from "react";
import { ShoppingCart } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useLanguage } from "@/context/LanguageContext";
import { toast } from "@/hooks/use-toast";

export interface Category {
  id: number;
  name: string;
}

export interface ProductQuantity {
  id: number;
  value: string;   // e.g. "1", "5", "500"
  unit: string;    // e.g. "ltr", "ml"
  mrp: string;
  price: string;
  discount: string; // auto-calculated in backend
}

export interface Product {
  id: number;
  name: string;
  description: string;
  category: Category;
  image: string;
  in_stock: boolean;
  quantities: ProductQuantity[];
}

const ProductCard = ({ product }: { product: Product }) => {
  const { addToCart } = useCart();
  const { t } = useLanguage();

  const [selectedQty, setSelectedQty] = useState<ProductQuantity>(
    product.quantities[0]
  );

  const handleAddToCart = () => {
    if (!product.in_stock) return;

    addToCart({
      id: product.id,
      name: `${product.name} (${selectedQty.value} ${selectedQty.unit})`,
      price: Number(selectedQty.price),
      unit: `${selectedQty.value} ${selectedQty.unit}`,
      quantity: 1,
    });

    toast({
      title: t("products.addedToCart"),
      description: `${product.name} (${selectedQty.value} ${selectedQty.unit}) added.`,
      duration: 2000,
    });
  };

  return (
    <div
      className={`group border rounded-xl overflow-hidden transition-all duration-300 bg-white flex flex-col h-full ${
        product.in_stock
          ? "border-primary/20 hover:shadow-lg"
          : "border-gray-200 opacity-90"
      }`}
    >
      {/* Image */}
      <div className="relative h-32 md:h-48 bg-muted/30 overflow-hidden shrink-0">
        <img
          src={`http://127.0.0.1:8000${product.image}`}
          alt={product.name}
          className={`w-full h-full object-contain p-4 transition-transform duration-500 group-hover:scale-110 ${
            !product.in_stock ? "grayscale" : ""
          }`}
        />

        <span className="absolute top-2 left-2 text-xs px-2 py-0.5 rounded-full font-bold bg-white/80 backdrop-blur-sm border shadow-sm">
          {product.category.name}
        </span>

        {Number(selectedQty.discount) > 0 && (
          <span className="absolute top-2 right-2 bg-red-600 text-white text-xs font-bold px-2 py-0.5 rounded shadow-sm">
            ₹{selectedQty.discount} OFF
          </span>
        )}
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col flex-1">
        <h3 className="font-bold text-lg text-foreground mb-1 line-clamp-1">
          {product.name}
        </h3>
        <p className="text-muted-foreground text-sm mb-3 line-clamp-2">
          {product.description}
        </p>

        <div className="mt-auto flex flex-col gap-3">
          {/* Pack Size Selector */}
          <div>
            <span className="text-xs text-muted-foreground font-semibold uppercase tracking-wider">
              Variant
            </span>
            <select
              value={selectedQty.id}
              onChange={(e) => {
                const qty = product.quantities.find(
                  (q) => q.id === Number(e.target.value)
                );
                if (qty) setSelectedQty(qty);
              }}
              className="w-full border border-gray-200 rounded-md px-2 py-1.5 text-sm font-medium text-foreground bg-white focus:ring-1 focus:ring-primary focus:border-primary outline-none"
            >
              {product.quantities.map((q) => (
                <option key={q.id} value={q.id}>
                  {q.value} {q.unit}
                </option>
              ))}
            </select>
          </div>

          {/* Price */}
          <div>
            {Number(selectedQty.discount) > 0 && (
              <p className="text-sm text-red-500 font-medium line-through">
                ₹{Number(selectedQty.mrp).toFixed(2)}
              </p>
            )}
            <p className="text-xl font-bold text-primary">
              ₹{Number(selectedQty.price).toFixed(2)}
              <span className="text-muted-foreground text-sm font-normal">
                {" "} / {selectedQty.value} {selectedQty.unit}
              </span>
            </p>
          </div>

          {/* Button */}
          <button
            onClick={handleAddToCart}
            disabled={!product.in_stock}
            className={`w-full py-2 flex items-center justify-center gap-2 rounded-lg font-bold transition-all ${
              product.in_stock
                ? "bg-primary text-white hover:bg-green-700 shadow-sm active:scale-95"
                : "bg-gray-200 text-gray-500 cursor-not-allowed"
            }`}
          >
            <ShoppingCart className="w-4 h-4" />
            {product.in_stock ? t("products.addToCart") : "OUT OF STOCK"}
          </button>
        </div>
      </div>
    </div>
  );
};

const Products = () => {
  const { t } = useLanguage();
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/products/")
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.error("API Error:", err));
  }, []);

  return (
    <section id="products" className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
            {t("products.title")}
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {t("products.subtitle")}
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
