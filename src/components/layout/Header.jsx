import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, ShoppingBag, Heart, Menu, X, Sparkles, User } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { motion, AnimatePresence } from 'framer-motion';

export const Header = () => {
  const { totalCount, openCart, openSearch, wishlist, isMobileMenuOpen, setIsMobileMenuOpen } = useCart();
  const location = useLocation();

  const navLinks = [
    { label: 'Rail 2027', path: '/' },
    { label: 'Collections', path: '/#collections' },
    { label: 'Editorial Lookbook', path: '/lookbook' },
    { label: 'Atelier Manifesto', path: '/#manifesto' },
  ];

  return (
    <>
      <header className="sticky top-0 z-40 w-full glass-nav border-b border-luxury-border/60 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-18 flex items-center justify-between">
          
          {/* Left: Brand Logo / Wordmark */}
          <div className="flex items-center space-x-3">
            <Link to="/" className="group flex items-center space-x-2.5">
              {/* Bespoke architectural hexagon-monolith emblem for SOLVEN */}
              <div className="w-8 h-8 rounded-full bg-luxury-black flex items-center justify-center text-white transition-transform duration-300 group-hover:scale-105">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="square" strokeLinejoin="miter">
                  <polygon points="12 2.5 20.5 7.25 20.5 16.75 12 21.5 3.5 16.75 3.5 7.25" />
                  <line x1="12" y1="2.5" x2="12" y2="21.5" />
                  <line x1="3.5" y1="7.25" x2="20.5" y2="16.75" />
                </svg>
              </div>
              <div className="flex flex-col">
                <span className="font-display tracking-[0.32em] text-sm sm:text-base font-extrabold uppercase text-luxury-black">
                  SOLVEN
                </span>
                <span className="text-[9px] uppercase tracking-[0.32em] text-luxury-muted font-medium -mt-0.5 hidden sm:block">
                  Paris · Tokyo
                </span>
              </div>
            </Link>
          </div>

          {/* Center: Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.label}
                  to={link.path}
                  className={`text-xs uppercase tracking-[0.2em] font-medium transition-colors duration-200 relative py-1 ${
                    isActive ? 'text-luxury-black font-semibold' : 'text-luxury-muted hover:text-luxury-black'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <motion.div
                      layoutId="navIndicator"
                      className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-luxury-black"
                      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Right: Actions (Search, Wishlist, Bag, Menu) */}
          <div className="flex items-center space-x-2 sm:space-x-4">
            {/* Search Trigger */}
            <button
              onClick={openSearch}
              aria-label="Search Collection"
              className="p-2 text-luxury-black hover:text-black hover:bg-black/5 rounded-full transition-colors relative group"
            >
              <Search className="w-5 h-5 stroke-[1.8]" />
              <span className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 bg-black rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
            </button>

            {/* Wishlist Link */}
            <Link
              to="/#wishlist"
              aria-label="Saved Items"
              className="p-2 text-luxury-black hover:text-black hover:bg-black/5 rounded-full transition-colors relative hidden sm:flex"
            >
              <Heart className={`w-5 h-5 stroke-[1.8] ${wishlist.length > 0 ? 'fill-black' : ''}`} />
              {wishlist.length > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-black rounded-full" />
              )}
            </Link>

            {/* Profile / Account Placeholder */}
            <button
              aria-label="User Account"
              className="p-2 text-luxury-black hover:text-black hover:bg-black/5 rounded-full transition-colors hidden sm:flex"
            >
              <User className="w-5 h-5 stroke-[1.8]" />
            </button>

            {/* Shopping Bag Button with Animated Badge (Matching reference video) */}
            <button
              onClick={openCart}
              aria-label="Shopping Cart"
              className="p-2 text-luxury-black hover:text-black hover:bg-black/5 rounded-full transition-all relative flex items-center justify-center"
            >
              <ShoppingBag className="w-5 h-5 stroke-[1.8]" />
              <AnimatePresence>
                {totalCount > 0 && (
                  <motion.span
                    key={totalCount}
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.5, opacity: 0 }}
                    className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] px-1 bg-luxury-black text-white text-[10px] font-mono font-semibold rounded-full flex items-center justify-center shadow-sm"
                  >
                    {totalCount}
                  </motion.span>
                )}
              </AnimatePresence>
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle Navigation Menu"
              className="p-2 text-luxury-black hover:bg-black/5 rounded-full md:hidden"
            >
              {isMobileMenuOpen ? (
                <X className="w-5 h-5 stroke-[2]" />
              ) : (
                <Menu className="w-5 h-5 stroke-[2]" />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden glass-sheet border-b border-luxury-border fixed top-16 left-0 right-0 z-30 px-6 py-6 overflow-hidden"
          >
            <div className="flex flex-col space-y-4">
              <span className="text-[10px] tracking-[0.25em] uppercase text-luxury-muted font-semibold">
                Navigation
              </span>
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  to={link.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-lg font-medium text-luxury-black hover:text-luxury-muted transition-colors py-1 flex items-center justify-between"
                >
                  <span>{link.label}</span>
                  <span className="text-xs font-mono text-luxury-muted">→</span>
                </Link>
              ))}
              <div className="pt-4 border-t border-luxury-border flex items-center justify-between">
                <span className="text-xs text-luxury-muted font-mono">EDITION FW 2027</span>
                <span className="text-xs font-semibold uppercase tracking-wider text-luxury-black">CURATED READY-TO-WEAR</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
