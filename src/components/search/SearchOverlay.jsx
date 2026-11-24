import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, ArrowRight, Sparkles, TrendingUp } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { PRODUCTS } from '../../data/products';
import { formatCurrency } from '../../utils/currency';
import { Link } from 'react-router-dom';

export const SearchOverlay = () => {
  const { isSearchOpen, closeSearch, openProductModal } = useCart();
  const [query, setQuery] = useState('');
  const inputRef = useRef(null);

  const POPULAR_SEARCHES = ['Heavyweight Hoodie', 'Obsidian', 'Streetwear', 'Italian Wool', 'French Terry', 'Trousers'];

  useEffect(() => {
    if (isSearchOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    } else {
      setQuery('');
    }
  }, [isSearchOpen]);

  // Filter products based on query
  const filteredProducts = query.trim()
    ? PRODUCTS.filter((p) => {
        const text = `${p.name} ${p.category} ${p.tagline} ${p.description}`.toLowerCase();
        return text.includes(query.toLowerCase());
      })
    : [];

  if (!isSearchOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-hidden flex flex-col justify-start">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={closeSearch}
          className="fixed inset-0 bg-black/40 backdrop-blur-md"
        />

        {/* Search Panel */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="relative w-full max-w-3xl mx-auto mt-4 sm:mt-12 bg-white rounded-2xl shadow-2xl overflow-hidden z-10 border border-luxury-border/60 mx-4"
        >
          {/* Search Input Bar */}
          <div className="p-4 sm:p-6 border-b border-luxury-border/60 flex items-center space-x-3">
            <Search className="w-5 h-5 text-luxury-muted flex-shrink-0" />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search garments, materials, silhouettes..."
              className="w-full text-base sm:text-lg bg-transparent text-luxury-black placeholder:text-luxury-muted focus:outline-none"
            />
            {query && (
              <button
                onClick={() => setQuery('')}
                className="p-1 text-luxury-muted hover:text-black rounded-full"
                aria-label="Clear search"
              >
                <X className="w-4 h-4" />
              </button>
            )}
            <button
              onClick={closeSearch}
              className="text-xs font-mono uppercase tracking-wider text-luxury-muted hover:text-black px-2 py-1"
            >
              ESC
            </button>
          </div>

          {/* Results / Suggestions Container */}
          <div className="p-4 sm:p-6 max-h-[60vh] overflow-y-auto no-scrollbar">
            {query.trim() === '' ? (
              <div className="space-y-6">
                <div>
                  <span className="text-[10px] font-mono tracking-widest uppercase text-luxury-muted flex items-center space-x-1.5 mb-3">
                    <TrendingUp className="w-3.5 h-3.5" />
                    <span>Popular Searches</span>
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {POPULAR_SEARCHES.map((term) => (
                      <button
                        key={term}
                        onClick={() => setQuery(term)}
                        className="px-3 py-1.5 rounded-full bg-cream-100 hover:bg-cream-200 text-xs font-medium text-luxury-black transition-colors"
                      >
                        {term}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="pt-2 border-t border-luxury-border/40">
                  <span className="text-[10px] font-mono tracking-widest uppercase text-luxury-muted block mb-3">
                    Featured Drops
                  </span>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {PRODUCTS.slice(0, 3).map((prod) => (
                      <div
                        key={prod.id}
                        onClick={() => {
                          closeSearch();
                          openProductModal(prod);
                        }}
                        className="p-2 rounded-xl border border-luxury-border/60 hover:border-black/30 cursor-pointer transition-all flex items-center space-x-3 bg-cream-50/50"
                      >
                        <img
                          src={prod.colors[0].frontImage}
                          alt={prod.name}
                          className="w-12 h-12 object-contain"
                        />
                        <div className="min-w-0">
                          <p className="text-xs font-semibold text-luxury-black truncate">{prod.name}</p>
                          <p className="text-[11px] font-mono text-luxury-muted">{formatCurrency(prod.price)}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : filteredProducts.length === 0 ? (
              <div className="py-12 text-center">
                <p className="text-sm font-medium text-luxury-black">No pieces found matching "{query}"</p>
                <p className="text-xs text-luxury-muted mt-1">Try searching for "hoodie", "streetwear", or "wool".</p>
              </div>
            ) : (
              <div className="space-y-2">
                <span className="text-[10px] font-mono tracking-widest uppercase text-luxury-muted block mb-2">
                  {filteredProducts.length} Results
                </span>
                {filteredProducts.map((prod) => (
                  <div
                    key={prod.id}
                    onClick={() => {
                      closeSearch();
                      openProductModal(prod);
                    }}
                    className="p-3 rounded-xl hover:bg-cream-100/70 flex items-center justify-between cursor-pointer transition-colors border border-transparent hover:border-luxury-border/40"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="w-14 h-14 rounded-lg bg-cream-50 p-1 flex-shrink-0">
                        <img
                          src={prod.colors[0].frontImage}
                          alt={prod.name}
                          className="w-full h-full object-contain"
                        />
                      </div>
                      <div>
                        <h4 className="text-sm font-semibold text-luxury-black">{prod.name}</h4>
                        <p className="text-xs text-luxury-muted">{prod.tagline}</p>
                      </div>
                    </div>
                    <div className="text-right flex items-center space-x-3">
                      <span className="text-xs font-mono font-bold text-luxury-black">
                        {formatCurrency(prod.price)}
                      </span>
                      <ArrowRight className="w-4 h-4 text-luxury-muted" />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
