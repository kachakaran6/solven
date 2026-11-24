import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { DISCOUNT_CODES } from '../utils/currency';

const CartContext = createContext(null);

const CART_STORAGE_KEY = 'solven_cart_v2';
const WISHLIST_STORAGE_KEY = 'solven_wishlist_v2';

export const CartProvider = ({ children }) => {
  // Load initial cart from localStorage (starts empty; only holds user-added items)
  const [items, setItems] = useState(() => {
    try {
      const saved = localStorage.getItem(CART_STORAGE_KEY);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error('Failed to load cart from storage', e);
    }
    return [];
  });

  // Wishlist
  const [wishlist, setWishlist] = useState(() => {
    try {
      const saved = localStorage.getItem(WISHLIST_STORAGE_KEY);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return ['hoodie-obsidian-core'];
  });

  // UI States
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeProductModal, setActiveProductModal] = useState(null);
  const [discountCode, setDiscountCode] = useState('');
  const [activeDiscount, setActiveDiscount] = useState(null);
  const [lastAddedItem, setLastAddedItem] = useState(null);

  // Save to localStorage on change
  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
    } catch (e) {
      console.error('Failed to save cart to storage', e);
    }
  }, [items]);

  useEffect(() => {
    try {
      localStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(wishlist));
    } catch (e) {
      console.error('Failed to save wishlist to storage', e);
    }
  }, [wishlist]);

  // Actions
  const addToCart = (product, { color, size, quantity = 1, openDrawer = true }) => {
    if (!product || !color || !size) {
      console.warn('Missing product, color, or size for cart addition');
      return false;
    }

    const key = `${product.id}-${color.id}-${size}`;
    const newItem = {
      key,
      productId: product.id,
      name: product.name,
      price: product.price,
      color: { id: color.id, name: color.name, hex: color.hex },
      size,
      image: color.frontImage || product.colors?.[0]?.frontImage,
      quantity,
    };

    setItems(prevItems => {
      const existingIndex = prevItems.findIndex(i => i.key === key);
      if (existingIndex > -1) {
        const updated = [...prevItems];
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: updated[existingIndex].quantity + quantity,
        };
        return updated;
      }
      return [...prevItems, newItem];
    });

    setLastAddedItem(newItem);
    if (openDrawer) {
      setIsCartOpen(true);
    }
    return true;
  };

  const updateQuantity = (key, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(key);
      return;
    }
    setItems(prev =>
      prev.map(item => (item.key === key ? { ...item, quantity: newQuantity } : item))
    );
  };

  const removeFromCart = (key) => {
    setItems(prev => prev.filter(item => item.key !== key));
  };

  const clearCart = () => {
    setItems([]);
  };

  const toggleWishlist = (productId) => {
    setWishlist(prev =>
      prev.includes(productId) ? prev.filter(id => id !== productId) : [...prev, productId]
    );
  };

  const applyDiscount = (code) => {
    const trimmed = code.trim().toUpperCase();
    if (DISCOUNT_CODES[trimmed]) {
      setActiveDiscount({ code: trimmed, ...DISCOUNT_CODES[trimmed] });
      return { success: true, message: DISCOUNT_CODES[trimmed].label };
    }
    return { success: false, message: 'Invalid promotion code' };
  };

  const removeDiscount = () => {
    setActiveDiscount(null);
  };

  // Calculations
  const totalCount = useMemo(() => {
    return items.reduce((sum, item) => sum + item.quantity, 0);
  }, [items]);

  const subtotal = useMemo(() => {
    return items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  }, [items]);

  const discountAmount = useMemo(() => {
    if (!activeDiscount || !activeDiscount.rate) return 0;
    return subtotal * activeDiscount.rate;
  }, [subtotal, activeDiscount]);

  const shipping = useMemo(() => {
    if (items.length === 0) return 0;
    if (activeDiscount?.freeShipping || subtotal >= 2999) return 0;
    return 199;
  }, [items.length, subtotal, activeDiscount]);

  const total = useMemo(() => {
    const raw = subtotal - discountAmount + shipping;
    return Math.max(0, raw);
  }, [subtotal, discountAmount, shipping]);

  return (
    <CartContext.Provider
      value={{
        items,
        totalCount,
        subtotal,
        discountAmount,
        shipping,
        total,
        activeDiscount,
        discountCode,
        setDiscountCode,
        applyDiscount,
        removeDiscount,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        isCartOpen,
        openCart: () => setIsCartOpen(true),
        closeCart: () => setIsCartOpen(false),
        toggleCart: () => setIsCartOpen(prev => !prev),
        isSearchOpen,
        openSearch: () => setIsSearchOpen(true),
        closeSearch: () => setIsSearchOpen(false),
        isMobileMenuOpen,
        setIsMobileMenuOpen,
        activeProductModal,
        openProductModal: (prod) => setActiveProductModal(prod),
        closeProductModal: () => setActiveProductModal(null),
        wishlist,
        toggleWishlist,
        lastAddedItem,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
