import React from 'react';
import { formatCurrency } from '../../utils/currency';

export const PriceTag = ({ price, className = '' }) => {
  return (
    <div className={`relative flex flex-col items-center select-none pointer-events-none ${className}`}>
      {/* Delicate suspension thread */}
      <div className="w-[1px] h-4 bg-luxury-subtle/60" />
      
      {/* Modern Luxury Retail Tag */}
      <div className="bg-white border border-luxury-border/90 px-2 py-0.5 rounded shadow-sm text-center transform -rotate-1 group-hover:rotate-0 transition-transform duration-300">
        <span className="text-[10px] sm:text-[11px] font-mono font-semibold tracking-tight text-luxury-black">
          {formatCurrency(price)}
        </span>
      </div>
    </div>
  );
};
