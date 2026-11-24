import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, Plus, Eye, Check } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { formatCurrency } from '../../utils/currency';
import { Link } from 'react-router-dom';

export const ProductGrid = ({ products }) => {
  const { openProductModal, wishlist, toggleWishlist, addToCart } = useCart();
  const [hoveredCard, setHoveredCard] = useState(null);
  const [justAddedId, setJustAddedId] = useState(null);

  const handleQuickAdd = (e, prod) => {
    e.stopPropagation();
    const color = prod.colors[0];
    const size = prod.availableSizes[0] || 'M';
    addToCart(prod, { color, size, quantity: 1, openDrawer: true });
    setJustAddedId(prod.id);
    setTimeout(() => setJustAddedId(null), 1200);
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
      {products.map((product) => {
        const isHovered = hoveredCard === product.id;
        const isSaved = wishlist.includes(product.id);
        const defaultColor = product.colors[product.defaultColorIndex || 0];
        const displayImage = isHovered && defaultColor.backImage ? defaultColor.backImage : defaultColor.frontImage;

        return (
          <motion.div
            key={product.id}
            onMouseEnter={() => setHoveredCard(product.id)}
            onMouseLeave={() => setHoveredCard(null)}
            onClick={() => openProductModal(product)}
            className="group relative flex flex-col bg-white rounded-2xl border border-luxury-border/60 hover:border-black/20 p-4 transition-all duration-300 hover:shadow-float cursor-pointer"
          >
            {/* Top Badges & Wishlist */}
            <div className="flex items-center justify-between w-full mb-2">
              <span className="text-[10px] font-mono tracking-widest text-luxury-muted uppercase">
                {product.code}
              </span>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleWishlist(product.id);
                }}
                className="p-1.5 rounded-full hover:bg-black/5 text-luxury-black transition-colors"
                aria-label="Save to wishlist"
              >
                <Heart className={`w-4 h-4 ${isSaved ? 'fill-black text-black' : 'text-luxury-muted'}`} />
              </button>
            </div>

            {/* Product Image Frame */}
            <div className="relative w-full aspect-[3/4] bg-cream-50/70 rounded-xl overflow-hidden flex items-center justify-center p-4">
              <img
                src={displayImage}
                alt={product.name}
                loading="lazy"
                className="w-full h-full object-contain filter drop-shadow-md transition-all duration-500 group-hover:scale-105"
              />

              {/* Hover Floating Action Pill */}
              <div className="absolute bottom-3 inset-x-3 flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                <button
                  onClick={(e) => handleQuickAdd(e, product)}
                  className="flex-1 py-2 px-3 rounded-full bg-luxury-black text-white text-[11px] font-semibold tracking-wider uppercase flex items-center justify-center space-x-1.5 shadow-md hover:bg-black transition-colors"
                >
                  {justAddedId === product.id ? (
                    <>
                      <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                      <span>Added</span>
                    </>
                  ) : (
                    <>
                      <Plus className="w-3.5 h-3.5" />
                      <span>Quick Add</span>
                    </>
                  )}
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    openProductModal(product);
                  }}
                  className="p-2 rounded-full bg-white text-luxury-black border border-luxury-border shadow-sm hover:bg-cream-100"
                  aria-label="Inspect details"
                >
                  <Eye className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Product Meta */}
            <div className="mt-4 flex flex-col flex-grow justify-between">
              <div>
                <p className="text-[10px] font-mono uppercase tracking-widest text-luxury-muted">
                  {product.categoryName}
                </p>
                <h3 className="text-sm font-semibold text-luxury-black tracking-tight mt-0.5 group-hover:text-luxury-muted transition-colors">
                  {product.name}
                </h3>
              </div>

              <div className="mt-3 flex items-center justify-between pt-2 border-t border-luxury-border/40">
                <span className="text-xs font-mono font-bold text-luxury-black">
                  {formatCurrency(product.price)}
                </span>
                <span className="text-[10px] font-mono text-luxury-muted">
                  {product.sizes.join(' · ')}
                </span>
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};
