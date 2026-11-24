import React from 'react';
import { CATEGORIES } from '../../data/categories';
import { motion } from 'framer-motion';

export const CategoryCircles = ({ activeCategory, onSelectCategory }) => {
  return (
    <div className="w-full py-4 border-b border-luxury-border/50 bg-white/50 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center space-x-6 sm:space-x-8 overflow-x-auto no-scrollbar scroll-smooth py-1">
          {CATEGORIES.map((cat) => {
            const isSelected = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => onSelectCategory(cat.id)}
                className="group flex flex-col items-center flex-shrink-0 cursor-pointer focus:outline-none"
                aria-label={`Filter by ${cat.name}`}
              >
                {/* Circular Avatar Ring */}
                <div className="relative">
                  <div
                    className={`w-14 h-14 sm:w-16 sm:h-16 rounded-full p-[2px] transition-all duration-300 ${
                      isSelected
                        ? 'ring-2 ring-luxury-black ring-offset-2 ring-offset-white scale-105'
                        : 'border border-luxury-border group-hover:border-luxury-black/40 group-hover:scale-102'
                    }`}
                  >
                    <div className="w-full h-full rounded-full overflow-hidden bg-cream-100">
                      <img
                        src={cat.image}
                        alt={cat.name}
                        loading="lazy"
                        className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-110"
                      />
                    </div>
                  </div>

                  {/* Tiny badge indicator if active */}
                  {isSelected && (
                    <motion.span
                      layoutId="categoryDot"
                      className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-black rounded-full"
                    />
                  )}
                </div>

                {/* Category Caption */}
                <span
                  className={`mt-2 text-[11px] sm:text-xs tracking-tight transition-colors duration-200 text-center whitespace-nowrap ${
                    isSelected
                      ? 'font-semibold text-luxury-black'
                      : 'font-normal text-luxury-muted group-hover:text-luxury-black'
                  }`}
                >
                  {cat.name}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
