import { ShoppingCart, X, Plus, Minus, Trash2, MessageCircle } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useLanguage } from '@/context/LanguageContext';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';

interface CartProps {
  isScrolled?: boolean;
}

const Cart = ({ isScrolled = false }: CartProps) => {
  const { items, removeFromCart, updateQuantity, clearCart, totalItems } = useCart();
  const { t } = useLanguage();

  const handleWhatsAppOrder = () => {
    if (items.length === 0) return;

    const orderList = items
      .map(
        (item) =>
          `• ${item.name} - ${item.quantity} ${item.unit}(s) @ ${item.price}/${item.unit}`
      )
      .join('\n');

    const messageTemplate = t('cart.orderMessage');
    const message = encodeURIComponent(
      messageTemplate.replace('{items}', orderList)
    );

    window.open(`https://wa.me/918008419933?text=${message}`, '_blank');
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        {/* Added shrink-0 and ensured z-index */}
        <button
          className={`relative p-2 rounded-lg transition-all shrink-0 z-10 ${
            isScrolled ? 'hover:bg-white/20' : 'hover:bg-primary/10'
          }`}
        >
          <ShoppingCart
            className={`w-6 h-6 transition-colors ${
              isScrolled ? 'text-white' : 'text-primary'
            }`}
          />

          {totalItems > 0 && (
            <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-600 text-white text-[10px] font-bold rounded-full flex items-center justify-center shadow-sm">
              {totalItems}
            </span>
          )}
        </button>
      </SheetTrigger>

      <SheetContent className="w-[90%] sm:max-w-md">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2 text-primary">
            <ShoppingCart className="w-5 h-5" />
            {t('cart.title')} ({totalItems} {t('cart.items')})
          </SheetTitle>
        </SheetHeader>

        <div className="mt-6 flex flex-col h-[calc(100vh-200px)]">
          {items.length === 0 ? (
            <div className="flex-1 flex flex-col items-center justify-center text-muted-foreground">
              <ShoppingCart className="w-16 h-16 mb-4 opacity-30" />
              <p>{t('cart.empty')}</p>
              <p className="text-sm">{t('cart.addProducts')}</p>
            </div>
          ) : (
            <>
              <div className="flex-1 overflow-y-auto space-y-4 pr-2">
                {items.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center gap-4 p-4 bg-muted/50 rounded-lg"
                  >
                    <div className="flex-1">
                      <h4 className="font-semibold text-foreground line-clamp-1">
                        {item.name}
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        {item.price} / {item.unit}
                      </p>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="p-1 rounded bg-background hover:bg-muted transition-colors border"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="w-8 text-center font-medium">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="p-1 rounded bg-background hover:bg-muted transition-colors border"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>

                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="p-2 text-destructive hover:bg-destructive/10 rounded transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>

              <div className="border-t pt-4 mt-4 space-y-3">
                <button
                  onClick={clearCart}
                  className="w-full py-2 text-sm text-muted-foreground hover:text-destructive transition-colors"
                >
                  {t('cart.clearCart')}
                </button>

                <button
                  onClick={handleWhatsAppOrder}
                  className="w-full bg-[#25D366] text-white font-bold flex items-center justify-center gap-2 py-3 rounded-lg hover:bg-[#128C7E] transition-colors"
                >
                  <MessageCircle className="w-5 h-5" />
                  {t('cart.orderViaWhatsApp')}
                </button>
              </div>
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default Cart;