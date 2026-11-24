import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Compass, ShoppingBag, Heart, Search, Layers } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { motion } from 'framer-motion';

export const MobileNavigation = () => {
  const { totalCount, openCart, openSearch, wishlist } = useCart();
  const location = useLocation();

  // Hide bottom nav on Product detail and Checkout pages so action bars stay unobstructed
  if (location.pathname.startsWith('/product/') || location.pathname === '/checkout') {
    return null;
  }

  return (
    <div className="fixed bottom-4 left-4 right-4 z-30 md:hidden flex justify-center pointer-events-none">
      <nav className="pointer-events-auto w-full max-w-sm glass-sheet border border-luxury-border/80 shadow-sheet rounded-full px-3 py-2 flex items-center justify-around">
        
        {/* Rail / Discovery */}
        <Link
          to="/"
          className={`flex flex-col items-center justify-center relative p-1.5 transition-colors ${
            location.pathname === '/' ? 'text-black font-semibold' : 'text-luxury-muted hover:text-black'
          }`}
          aria-label="Interactive Rail"
        >
          <Compass className="w-5 h-5 stroke-[1.8]" />
          <span className="text-[9px] tracking-wider uppercase mt-0.5">Rail</span>
          {location.pathname === '/' && (
            <motion.div
              layoutId="mobileNavActive"
              className="absolute -bottom-1 w-1 h-1 bg-black rounded-full"
            />
          )}
        </Link>

        {/* Collections */}
        <Link
          to="/lookbook"
          className={`flex flex-col items-center justify-center relative p-1.5 transition-colors ${
            location.pathname === '/lookbook' ? 'text-black font-semibold' : 'text-luxury-muted hover:text-black'
          }`}
          aria-label="Editorial Lookbook"
        >
          <Layers className="w-5 h-5 stroke-[1.8]" />
          <span className="text-[9px] tracking-wider uppercase mt-0.5">Atelier</span>
          {location.pathname === '/lookbook' && (
            <motion.div
              layoutId="mobileNavActive"
              className="absolute -bottom-1 w-1 h-1 bg-black rounded-full"
            />
          )}
        </Link>

        {/* Search */}
        <button
          onClick={openSearch}
          className="flex flex-col items-center justify-center p-1.5 text-luxury-muted hover:text-black transition-colors"
          aria-label="Search"
        >
          <Search className="w-5 h-5 stroke-[1.8]" />
          <span className="text-[9px] tracking-wider uppercase mt-0.5">Search</span>
        </button>

        {/* Wishlist */}
        <Link
          to="/#wishlist"
          className="flex flex-col items-center justify-center relative p-1.5 text-luxury-muted hover:text-black transition-colors"
          aria-label="Wishlist"
        >
          <Heart className={`w-5 h-5 stroke-[1.8] ${wishlist.length > 0 ? 'fill-black text-black' : ''}`} />
          <span className="text-[9px] tracking-wider uppercase mt-0.5">Saved</span>
          {wishlist.length > 0 && (
            <span className="absolute top-1 right-2 w-1.5 h-1.5 bg-black rounded-full" />
          )}
        </Link>

        {/* Bag */}
        <button
          onClick={openCart}
          className="flex flex-col items-center justify-center relative p-1.5 text-luxury-muted hover:text-black transition-colors"
          aria-label="Bag"
        >
          <div className="relative">
            <ShoppingBag className="w-5 h-5 stroke-[1.8]" />
            {totalCount > 0 && (
              <span className="absolute -top-1 -right-2 min-w-[15px] h-[15px] bg-luxury-black text-white text-[9px] font-mono font-bold rounded-full flex items-center justify-center">
                {totalCount}
              </span>
            )}
          </div>
          <span className="text-[9px] tracking-wider uppercase mt-0.5">Bag</span>
        </button>

      </nav>
    </div>
  );
};
