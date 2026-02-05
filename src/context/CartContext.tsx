import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface CartItem {
  id: number;
  name: string;
  price: number;
  unit: string;   // e.g. "1 ltr", "500 ml"
  quantity: number;
}

interface CartContextType {
  items: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: number, unit: string) => void;
  updateQuantity: (id: number, unit: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState<CartItem[]>(() => {
    const savedCart = localStorage.getItem('amulya_cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  useEffect(() => {
    localStorage.setItem('amulya_cart', JSON.stringify(items));
  }, [items]);

  // ✅ Add to cart (id + unit unique)
  const addToCart = (newItem: CartItem) => {
    setItems((prev) => {
      const existing = prev.find(
        (i) => i.id === newItem.id && i.unit === newItem.unit
      );

      if (existing) {
        return prev.map((i) =>
          i.id === newItem.id && i.unit === newItem.unit
            ? { ...i, quantity: i.quantity + newItem.quantity }
            : i
        );
      }
      return [...prev, newItem];
    });
  };

  const removeFromCart = (id: number, unit: string) => {
    setItems((prev) => prev.filter((item) => !(item.id === id && item.unit === unit)));
  };

  const updateQuantity = (id: number, unit: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(id, unit);
      return;
    }
    setItems((prev) =>
      prev.map((item) =>
        item.id === id && item.unit === unit ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => setItems([]);

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <CartContext.Provider
      value={{ items, addToCart, removeFromCart, updateQuantity, clearCart, totalItems, totalPrice }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used within a CartProvider');
  return context;
};
