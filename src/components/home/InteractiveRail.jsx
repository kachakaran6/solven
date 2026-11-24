import React, { useState, useRef, useEffect } from 'react';
import { motion, useMotionValue, animate, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { HangerSvg } from './HangerSvg';
import { PriceTag } from './PriceTag';
import { ChevronLeft, ChevronRight, ArrowRight, RotateCw, X } from 'lucide-react';
import { formatCurrency } from '../../utils/currency';

export const InteractiveRail = ({
  products,
  sectionLabel = 'NEW COLLECTION',
  activeCategoryTitle = 'PREMIUM STREETWEAR',
}) => {
  const navigate = useNavigate();

  const [flippedId, setFlippedId] = useState(null);
  const [focusedIndex, setFocusedIndex] = useState(0);
  const isDraggingRef = useRef(false);

  const containerRef = useRef(null);
  const trackRef = useRef(null);
  const itemRefs = useRef([]);
  const x = useMotionValue(0);

  const slotWidth = 132;
  const totalItems = products.length;
  const maxDrag = 160;
  const minDrag = -(Math.max(0, totalItems - 1) * slotWidth + 80);

  useEffect(() => {
    setFlippedId(null);
    setFocusedIndex(0);
    animate(x, 0, { type: 'spring', stiffness: 320, damping: 32 });
  }, [products, x]);

  // Smoothly glide any clicked garment right into the exact horizontal center of the viewport
  const centerIndexInView = (index) => {
    const container = containerRef.current;
    const itemEl = itemRefs.current[index];
    if (!container || !itemEl) return;

    const containerRect = container.getBoundingClientRect();
    const itemRect = itemEl.getBoundingClientRect();
    const currentX = x.get();

    const containerCenter = containerRect.left + containerRect.width / 2;
    const itemCenter = itemRect.left + itemRect.width / 2;
    const delta = containerCenter - itemCenter;

    animate(x, currentX + delta, {
      type: 'spring',
      stiffness: 260,
      damping: 28,
      mass: 0.8,
    });
  };

  const handlePrev = (e) => {
    e.stopPropagation();
    const nextIdx = Math.max(0, focusedIndex - 1);
    setFocusedIndex(nextIdx);
    centerIndexInView(nextIdx);
  };

  const handleNext = (e) => {
    e.stopPropagation();
    const nextIdx = Math.min(totalItems - 1, focusedIndex + 1);
    setFocusedIndex(nextIdx);
    centerIndexInView(nextIdx);
  };

  // Two-step interaction:
  // 1st click -> Smoothly glides garment to center & flips forward (0deg)
  // 2nd click -> Opens that garment's dedicated Product Page (/product/:id)
  const handleGarmentClick = (e, product, index) => {
    e.stopPropagation();
    if (isDraggingRef.current) return;

    if (flippedId === product.id) {
      navigate(`/product/${product.id}`);
    } else {
      setFlippedId(product.id);
      setFocusedIndex(index);
      centerIndexInView(index);
    }
  };

  const activeProduct = products.find((p) => p.id === flippedId) || products[focusedIndex] || products[0];

  return (
    <section
      onClick={() => setFlippedId(null)}
      style={{ overflowX: 'clip' }}
      className="relative w-full bg-gradient-to-b from-white via-cream-50/60 to-white pt-5 pb-9 select-none border-b border-luxury-border/40"
    >
      {/* Editorial Rail Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 mb-4 flex flex-wrap items-center justify-between sm:justify-center gap-1">
        <div className="flex flex-wrap items-center space-x-1.5 text-[10px] sm:text-xs font-semibold tracking-[0.14em] sm:tracking-[0.24em] uppercase text-luxury-muted">
          <span>{sectionLabel}</span>
          <span className="text-luxury-subtle">•</span>
          <span className="text-luxury-black font-bold">{activeCategoryTitle}</span>
        </div>
        <span className="text-[10px] font-mono text-luxury-muted sm:hidden">
          {products.length} PCS
        </span>
      </div>

      {/* Rail + Garments Stage */}
      <div className="relative w-full">
        {/* Curved Steel Bar across the top of the rack */}
        <div className="relative w-full max-w-5xl mx-auto h-6 flex items-center justify-center px-2 z-20 pointer-events-none">
          <svg
            viewBox="0 0 1000 32"
            className="w-full h-full overflow-visible"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <linearGradient id="railGrad3D" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#D8D8D8" stopOpacity="0.35" />
                <stop offset="20%" stopColor="#9E9E9E" />
                <stop offset="50%" stopColor="#353535" />
                <stop offset="80%" stopColor="#9E9E9E" />
                <stop offset="100%" stopColor="#D8D8D8" stopOpacity="0.35" />
              </linearGradient>
            </defs>

            <path
              d="M 10 14 Q 500 26 990 14"
              stroke="url(#railGrad3D)"
              strokeWidth="6"
              strokeLinecap="round"
            />
            <path
              d="M 16 12.5 Q 500 24.5 984 12.5"
              stroke="rgba(255,255,255,0.75)"
              strokeWidth="1.2"
              strokeLinecap="round"
            />
          </svg>
        </div>

        {/* Desktop Left/Right Arrows */}
        <div className="absolute top-1/2 -translate-y-1/2 left-3 right-3 hidden md:flex items-center justify-between pointer-events-none z-30 max-w-6xl mx-auto">
          <button
            onClick={handlePrev}
            disabled={focusedIndex === 0}
            className={`pointer-events-auto w-9 h-9 rounded-full glass-sheet border border-luxury-border flex items-center justify-center text-luxury-black transition-transform ${
              focusedIndex === 0 ? 'opacity-25 cursor-not-allowed' : 'hover:scale-105 active:scale-95 shadow-sm'
            }`}
            aria-label="Scroll left"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={handleNext}
            disabled={focusedIndex === totalItems - 1}
            className={`pointer-events-auto w-9 h-9 rounded-full glass-sheet border border-luxury-border flex items-center justify-center text-luxury-black transition-transform ${
              focusedIndex === totalItems - 1 ? 'opacity-25 cursor-not-allowed' : 'hover:scale-105 active:scale-95 shadow-sm'
            }`}
            aria-label="Scroll right"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Draggable GPU-Accelerated Rack */}
        <div
          ref={containerRef}
          style={{ overflowX: 'clip' }}
          className="relative w-full cursor-grab active:cursor-grabbing -mt-4 pt-0 pb-3"
        >
          <motion.div
            ref={trackRef}
            drag="x"
            dragConstraints={{ left: minDrag, right: maxDrag }}
            dragElastic={0.12}
            onDragStart={() => {
              isDraggingRef.current = true;
            }}
            onDragEnd={() => {
              setTimeout(() => {
                isDraggingRef.current = false;
              }, 70);
            }}
            style={{ x, willChange: 'transform' }}
            className={`flex items-start pl-6 sm:pl-16 ${
              products.length <= 5 ? 'md:justify-center md:pl-0' : 'md:pl-20'
            } select-none`}
          >
            {products.map((product, idx) => {
              const isFlipped = flippedId === product.id;
              const defaultColor = product.colors[product.defaultColorIndex || 0];
              const swayDelay = `${-(idx * 1.15) % 4.8}s`;
              const swayDuration = `${4.4 + (idx % 3) * 0.55}s`;

              return (
                <div
                  key={product.id}
                  ref={(el) => (itemRefs.current[idx] = el)}
                  style={{ perspective: 900 }}
                  className={`flex-shrink-0 w-[132px] sm:w-[155px] flex justify-center ${
                    isFlipped ? 'z-30' : 'z-10'
                  }`}
                >
                  <motion.div
                    onClick={(e) => handleGarmentClick(e, product, idx)}
                    style={{
                      transformStyle: 'preserve-3d',
                      transformOrigin: 'top center',
                      willChange: 'transform',
                    }}
                    animate={{
                      rotateY: isFlipped ? 0 : -56,
                      scale: isFlipped ? 1.12 : 0.94,
                    }}
                    transition={{
                      type: 'spring',
                      stiffness: 320,
                      damping: 26,
                      mass: 0.75,
                    }}
                    className="relative flex flex-col items-center group cursor-pointer"
                  >
                    <div
                      style={{
                        animationDelay: swayDelay,
                        animationDuration: swayDuration,
                      }}
                      className={`flex flex-col items-center ${
                        isFlipped ? 'animate-hanger-paused' : 'animate-hanger-sway'
                      }`}
                    >
                      {/* Wooden Hanger */}
                      <div className="relative w-[160px] sm:w-[180px] flex justify-center">
                        <HangerSvg tone={product.hangerTone} />
                      </div>

                      {/* Attached Monochrome Price Tag */}
                      <div
                        style={{
                          transform: isFlipped ? 'translateZ(18px)' : 'rotateY(56deg) translateZ(18px)',
                        }}
                        className="absolute top-8 right-2 sm:right-3 z-30 pointer-events-none"
                      >
                        <PriceTag price={product.price} />
                      </div>

                      {/* Isolated Transparent Garment Image */}
                      <div className="relative -mt-4 w-[165px] sm:w-[190px] h-[210px] sm:h-[245px] flex items-start justify-center pointer-events-none">
                        <img
                          src={defaultColor.frontImage}
                          alt={product.name}
                          loading={idx < 6 ? 'eager' : 'lazy'}
                          decoding="async"
                          draggable={false}
                          className={`w-full h-full object-contain object-top select-none transition-opacity duration-200 ${
                            isFlipped ? 'opacity-100' : 'opacity-95 group-hover:opacity-100'
                          }`}
                        />
                      </div>

                      {/* Subtle edition number */}
                      <div className="mt-1 text-center">
                        <span className="text-[9px] font-mono tracking-widest text-luxury-muted uppercase">
                          {product.code}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                </div>
              );
            })}
          </motion.div>
        </div>
      </div>

      {/* Clean Lower Status Bar */}
      <div className="max-w-md mx-auto mt-1 px-4 text-center">
        <AnimatePresence mode="wait">
          {flippedId ? (
            <motion.div
              key={`flipped-${activeProduct.id}`}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.18 }}
              className="flex flex-col items-center space-y-1.5"
            >
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  navigate(`/product/${activeProduct.id}`);
                }}
                className="inline-flex items-center space-x-2.5 bg-luxury-black text-white px-5 py-2.5 rounded-full shadow-md hover:bg-black transition-transform active:scale-95"
              >
                <span className="text-xs font-semibold truncate max-w-[180px]">{activeProduct.name}</span>
                <span className="text-white/40">•</span>
                <span className="text-xs font-mono font-bold">{formatCurrency(activeProduct.price)}</span>
                <ArrowRight className="w-3.5 h-3.5 flex-shrink-0" />
              </button>

              <div className="flex items-center space-x-2.5">
                <span className="text-[10px] font-mono text-luxury-muted">
                  Tap garment again to view full product page
                </span>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setFlippedId(null);
                  }}
                  className="p-1 rounded-full text-luxury-muted hover:text-black border border-luxury-border"
                  aria-label="Return to rack"
                >
                  <X className="w-3 h-3" />
                </button>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="tilted-hint"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-wrap items-center justify-center gap-1.5 text-[10px] font-mono uppercase tracking-[0.1em] sm:tracking-widest text-luxury-muted/80"
            >
              <RotateCw className="w-3 h-3 flex-shrink-0" />
              <span>Tap piece to flip • Tap again to view</span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};
