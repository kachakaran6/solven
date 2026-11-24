import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Check, ArrowRight, ShieldCheck, Truck, RefreshCw } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { HangerSvg } from '../home/HangerSvg';
import { formatCurrency } from '../../utils/currency';
import { Link } from 'react-router-dom';

export const ProductQuickModal = () => {
  const { activeProductModal, closeProductModal, addToCart } = useCart();
  const product = activeProductModal;

  const [selectedColorIndex, setSelectedColorIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState('M');
  const [viewSide, setViewSide] = useState('front'); // 'front' | 'back'
  const [isAdding, setIsAdding] = useState(false);
  const [addedSuccess, setAddedSuccess] = useState(false);

  // Reset state when modal opens with a new product
  useEffect(() => {
    if (product) {
      setSelectedColorIndex(product.defaultColorIndex || 0);
      setSelectedSize(product.availableSizes?.[0] || 'M');
      setViewSide('front');
      setIsAdding(false);
      setAddedSuccess(false);
    }
  }, [product]);

  // Handle ESC key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') closeProductModal();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [closeProductModal]);

  if (!product) return null;

  const currentColor = product.colors[selectedColorIndex] || product.colors[0];
  const currentImage = viewSide === 'front' ? currentColor.frontImage : currentColor.backImage;

  const handleAddToCart = () => {
    if (isAdding) return;
    setIsAdding(true);

    setTimeout(() => {
      addToCart(product, {
        color: currentColor,
        size: selectedSize,
        quantity: 1,
        openDrawer: true,
      });
      setIsAdding(false);
      setAddedSuccess(true);
      setTimeout(() => {
        setAddedSuccess(false);
        closeProductModal();
      }, 500);
    }, 450);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-0 sm:p-4 overflow-y-auto">
        
        {/* Backdrop blur */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={closeProductModal}
          className="fixed inset-0 bg-black/40 backdrop-blur-md transition-opacity"
        />

        {/* Modal Sheet matching Frame 12 of the reference video */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 20 }}
          transition={{ type: 'spring', damping: 28, stiffness: 350 }}
          className="relative w-full max-w-lg bg-white rounded-t-3xl sm:rounded-3xl shadow-2xl p-6 sm:p-8 z-10 flex flex-col items-center max-h-[96vh] overflow-y-auto no-scrollbar"
        >
          {/* Top Header: Close button (Close X) matching reference video */}
          <div className="w-full flex items-center justify-between pb-2 border-b border-luxury-border/40">
            <span className="text-[10px] font-mono tracking-widest text-luxury-muted uppercase">
              {product.code || 'ATELIER 2027'}
            </span>
            <button
              onClick={closeProductModal}
              className="text-xs font-medium text-luxury-black hover:text-black transition-colors flex items-center space-x-1 p-1"
              aria-label="Close modal"
            >
              <span>Close</span>
              <X className="w-4 h-4 stroke-[2]" />
            </button>
          </div>

          {/* Centered Suspended Hanger & Garment */}
          <div className="relative w-full max-w-[280px] sm:max-w-[320px] flex flex-col items-center mt-2 mb-4">
            {/* Wooden/Metallic Hanger */}
            <div className="w-full flex justify-center">
              <HangerSvg tone={product.hangerTone} />
            </div>

            {/* Garment Image with Front/Back transition */}
            <div className="relative -mt-4 w-full aspect-[3/4] flex items-center justify-center overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.img
                  key={`${product.id}-${currentColor.id}-${viewSide}`}
                  src={currentImage}
                  alt={`${product.name} ${viewSide} view`}
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.28, ease: 'easeOut' }}
                  className="w-full h-full object-contain filter drop-shadow-hanger select-none"
                />
              </AnimatePresence>
            </div>

            {/* Front / Back View Switcher (matching reference video) */}
            <div className="flex items-center space-x-4 mt-2">
              <button
                onClick={() => setViewSide('front')}
                className={`text-[11px] uppercase tracking-wider font-medium transition-colors ${
                  viewSide === 'front'
                    ? 'text-luxury-black font-bold border-b border-black'
                    : 'text-luxury-muted hover:text-luxury-black'
                }`}
              >
                Front
              </button>
              <span className="text-luxury-subtle">|</span>
              <button
                onClick={() => setViewSide('back')}
                className={`text-[11px] uppercase tracking-wider font-medium transition-colors ${
                  viewSide === 'back'
                    ? 'text-luxury-black font-bold border-b border-black'
                    : 'text-luxury-muted hover:text-luxury-black'
                }`}
              >
                Back
              </button>
            </div>
          </div>

          {/* Product Info (matching reference video) */}
          <div className="w-full text-center space-y-1 mb-4">
            <span className="text-[10px] font-mono tracking-widest text-luxury-muted uppercase">
              {product.code}
            </span>
            <h2 className="text-lg sm:text-xl font-semibold tracking-tight text-luxury-black">
              {product.name}
            </h2>
            <div className="text-base sm:text-lg font-mono font-medium text-luxury-black">
              {formatCurrency(product.price)}
            </div>
          </div>

          {/* Colorways Selector */}
          {product.colors?.length > 1 && (
            <div className="w-full flex flex-col items-center mb-4">
              <span className="text-[10px] font-mono uppercase tracking-widest text-luxury-muted mb-2">
                Color: {currentColor.name}
              </span>
              <div className="flex items-center space-x-3">
                {product.colors.map((c, i) => (
                  <button
                    key={c.id}
                    onClick={() => setSelectedColorIndex(i)}
                    className={`w-7 h-7 rounded-full p-0.5 transition-all ${
                      selectedColorIndex === i
                        ? 'ring-2 ring-luxury-black ring-offset-2'
                        : 'hover:scale-110 opacity-80 hover:opacity-100'
                    }`}
                    aria-label={`Select color ${c.name}`}
                  >
                    <span
                      className="w-full h-full rounded-full block border border-black/10 shadow-inner"
                      style={{ backgroundColor: c.hex }}
                    />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Size Selector matching circular buttons in reference video */}
          <div className="w-full flex flex-col items-center mb-6">
            <span className="text-[10px] font-mono uppercase tracking-widest text-luxury-muted mb-2">
              SIZE
            </span>
            <div className="flex items-center justify-center space-x-3">
              {product.sizes.map((sz) => {
                const isSelected = selectedSize === sz;
                const isAvailable = product.availableSizes.includes(sz);

                return (
                  <button
                    key={sz}
                    disabled={!isAvailable}
                    onClick={() => setSelectedSize(sz)}
                    className={`w-10 h-10 rounded-full flex items-center justify-center text-xs font-mono font-medium transition-all ${
                      !isAvailable
                        ? 'opacity-30 border border-luxury-border line-through cursor-not-allowed'
                        : isSelected
                        ? 'bg-luxury-black text-white shadow-md scale-105'
                        : 'border border-luxury-border text-luxury-black hover:border-luxury-black/60'
                    }`}
                  >
                    {sz}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Primary "Add to cart" Pill Button matching reference video */}
          <div className="w-full max-w-sm mb-4">
            <button
              onClick={handleAddToCart}
              disabled={isAdding}
              className={`w-full py-3.5 px-6 rounded-full font-medium text-sm transition-all duration-300 flex items-center justify-center space-x-2 shadow-lg ${
                addedSuccess
                  ? 'bg-emerald-600 text-white'
                  : 'bg-luxury-black hover:bg-black text-white hover:scale-[1.02] active:scale-[0.98]'
              }`}
            >
              {isAdding ? (
                <div className="w-5 h-5 border-2 border-white/40 border-t-white rounded-full animate-spin" />
              ) : addedSuccess ? (
                <>
                  <Check className="w-4 h-4 stroke-[2.5]" />
                  <span>Added to Cart</span>
                </>
              ) : (
                <span>Add to cart</span>
              )}
            </button>
          </div>

          {/* View Full Product Page link */}
          <Link
            to={`/product/${product.id}`}
            onClick={closeProductModal}
            className="text-xs uppercase tracking-widest text-luxury-muted hover:text-luxury-black transition-colors font-medium flex items-center space-x-1.5 py-1"
          >
            <span>View product page</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>

        </motion.div>
      </div>
    </AnimatePresence>
  );
};
