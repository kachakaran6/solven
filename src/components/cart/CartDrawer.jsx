import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Plus, Minus, Trash2, ArrowRight, Tag, Check, Sparkles } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { formatCurrency } from '../../utils/currency';
import { Link, useNavigate } from 'react-router-dom';

export const CartDrawer = () => {
  const {
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
    updateQuantity,
    removeFromCart,
    isCartOpen,
    closeCart,
  } = useCart();

  const [isDiscountOpen, setIsDiscountOpen] = useState(false);
  const [discountError, setDiscountError] = useState('');
  const navigate = useNavigate();

  const handleApplyDiscount = (e) => {
    e.preventDefault();
    if (!discountCode) return;
    const res = applyDiscount(discountCode);
    if (!res.success) {
      setDiscountError(res.message);
    } else {
      setDiscountError('');
      setDiscountCode('');
    }
  };

  const handleProceedCheckout = () => {
    closeCart();
    navigate('/checkout');
  };

  if (!isCartOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-hidden">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={closeCart}
          className="fixed inset-0 bg-black/40 backdrop-blur-sm transition-opacity"
        />

        {/* Drawer Container (Bottom Sheet on Mobile, Right Panel on Desktop) */}
        <div className="fixed inset-0 flex justify-end items-end sm:items-stretch pointer-events-none">
          <motion.div
            initial={{ y: '100%', opacity: 0.9 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: '100%', opacity: 0.9 }}
            transition={{ type: 'spring', damping: 30, stiffness: 320 }}
            className="pointer-events-auto w-full sm:max-w-md bg-white rounded-t-3xl sm:rounded-none sm:rounded-l-3xl shadow-2xl flex flex-col max-h-[92vh] sm:max-h-screen h-full z-10"
          >
            {/* Header matching Frame 20 in reference video */}
            <div className="px-6 py-5 border-b border-luxury-border/60 flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <h2 className="text-xl font-bold tracking-tight text-luxury-black">
                  Cart
                </h2>
                <span className="text-base font-semibold text-luxury-muted">
                  {totalCount}
                </span>
              </div>

              {/* Circular close button matching reference video ( X ) */}
              <button
                onClick={closeCart}
                className="w-8 h-8 rounded-full border border-luxury-border flex items-center justify-center text-luxury-black hover:bg-black/5 transition-colors"
                aria-label="Close Cart"
              >
                <X className="w-4 h-4 stroke-[2]" />
              </button>
            </div>

            {/* Cart Items List */}
            <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4 no-scrollbar divide-y divide-luxury-border/40">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center py-16 text-center">
                  <div className="w-16 h-16 rounded-full bg-cream-100 flex items-center justify-center text-luxury-muted mb-4">
                    <X className="w-6 h-6 stroke-[1.5]" />
                  </div>
                  <p className="text-sm font-medium text-luxury-black">Your bag is empty</p>
                  <p className="text-xs text-luxury-muted mt-1 max-w-[220px]">
                    Explore the 2027 collection and add items to your personal wardrobe.
                  </p>
                  <button
                    onClick={closeCart}
                    className="mt-6 px-6 py-2.5 rounded-full bg-luxury-black text-white text-xs uppercase tracking-wider font-semibold hover:bg-black transition-colors"
                  >
                    Browse Collection
                  </button>
                </div>
              ) : (
                items.map((item) => (
                  <div key={item.key} className="pt-4 first:pt-0 flex items-center justify-between space-x-4">
                    {/* Item Thumbnail */}
                    <div className="w-18 h-20 sm:w-20 sm:h-22 rounded-xl bg-cream-100 flex-shrink-0 p-1 overflow-hidden border border-luxury-border/50">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-contain filter drop-shadow-sm"
                      />
                    </div>

                    {/* Item Meta & Quantity controls */}
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-semibold text-luxury-black truncate">
                        {item.name}
                      </h4>
                      <div className="text-xs text-luxury-muted mt-0.5 space-x-2">
                        <span>Size: <strong className="text-luxury-black">{item.size}</strong></span>
                        {item.color?.name && (
                          <span>• {item.color.name}</span>
                        )}
                      </div>
                      <div className="text-xs font-mono font-medium text-luxury-black mt-1">
                        {formatCurrency(item.price)}
                      </div>

                      {/* Quantity Stepper & Trash matching reference video */}
                      <div className="flex items-center space-x-3 mt-2">
                        <div className="inline-flex items-center border border-luxury-border rounded-lg bg-cream-50/80 px-2 py-0.5 space-x-3">
                          <button
                            onClick={() => updateQuantity(item.key, item.quantity - 1)}
                            className="text-luxury-muted hover:text-luxury-black p-0.5 transition-colors"
                            aria-label="Decrease quantity"
                          >
                            <Minus className="w-3 h-3 stroke-[2.5]" />
                          </button>
                          <span className="text-xs font-mono font-semibold text-luxury-black min-w-[12px] text-center">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.key, item.quantity + 1)}
                            className="text-luxury-muted hover:text-luxury-black p-0.5 transition-colors"
                            aria-label="Increase quantity"
                          >
                            <Plus className="w-3 h-3 stroke-[2.5]" />
                          </button>
                        </div>

                        {/* Trash Button */}
                        <button
                          onClick={() => removeFromCart(item.key)}
                          className="p-1 text-luxury-muted hover:text-rose-600 transition-colors"
                          aria-label="Remove item"
                        >
                          <Trash2 className="w-3.5 h-3.5 stroke-[1.8]" />
                        </button>
                      </div>
                    </div>

                    {/* Item Total */}
                    <div className="text-right flex-shrink-0">
                      <span className="text-sm font-mono font-semibold text-luxury-black">
                        {formatCurrency(item.price * item.quantity)}
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Footer Summary matching Frame 20 of reference video */}
            {items.length > 0 && (
              <div className="px-6 py-5 border-t border-luxury-border/60 bg-cream-50/50 space-y-3">
                {/* Discount Code Accordion */}
                <div className="border-b border-luxury-border/50 pb-2">
                  <button
                    onClick={() => setIsDiscountOpen(!isDiscountOpen)}
                    className="w-full flex items-center justify-between text-xs font-medium text-luxury-black hover:text-luxury-muted transition-colors py-1"
                  >
                    <span className="flex items-center space-x-1.5">
                      <Tag className="w-3.5 h-3.5" />
                      <span>Discount code</span>
                    </span>
                    <span className="font-mono text-sm">{isDiscountOpen ? '−' : '+'}</span>
                  </button>

                  <AnimatePresence>
                    {isDiscountOpen && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="pt-2 overflow-hidden"
                      >
                        {activeDiscount ? (
                          <div className="flex items-center justify-between bg-emerald-50 border border-emerald-200 text-emerald-800 px-3 py-2 rounded-lg text-xs">
                            <div>
                              <span className="font-mono font-bold uppercase">{activeDiscount.code}</span>
                              <span className="ml-2 text-[11px]">({activeDiscount.label})</span>
                            </div>
                            <button
                              onClick={removeDiscount}
                              className="text-emerald-900 hover:text-emerald-700 font-semibold"
                            >
                              Remove
                            </button>
                          </div>
                        ) : (
                          <form onSubmit={handleApplyDiscount} className="flex space-x-2">
                            <input
                              type="text"
                              value={discountCode}
                              onChange={(e) => setDiscountCode(e.target.value)}
                              placeholder="e.g. SOLVEN20"
                              className="flex-1 uppercase text-xs px-3 py-2 rounded-lg border border-luxury-border bg-white focus:outline-none focus:ring-1 focus:ring-black"
                            />
                            <button
                              type="submit"
                              className="px-4 py-2 bg-luxury-black text-white text-xs font-medium rounded-lg hover:bg-black transition-colors"
                            >
                              Apply
                            </button>
                          </form>
                        )}
                        {discountError && (
                          <p className="text-[11px] text-rose-500 mt-1">{discountError}</p>
                        )}
                        <p className="text-[10px] text-luxury-muted mt-1.5 font-mono">
                          Try code: <span className="font-bold text-luxury-black">SOLVEN20</span> for 20% off
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Subtotal & Discount rows */}
                {discountAmount > 0 && (
                  <div className="flex items-center justify-between text-xs text-emerald-700">
                    <span>Discount Privilege</span>
                    <span className="font-mono font-medium">-{formatCurrency(discountAmount)}</span>
                  </div>
                )}

                {/* Estimated Total */}
                <div className="flex items-baseline justify-between pt-1">
                  <span className="text-xs uppercase tracking-wider text-luxury-muted font-medium">
                    Estimated total
                  </span>
                  <div className="text-right">
                    <span className="text-lg font-bold font-mono text-luxury-black">
                      {formatCurrency(total)}
                    </span>
                    <span className="text-xs font-mono text-luxury-muted ml-1">INR</span>
                  </div>
                </div>

                {/* Disclaimer matching reference video */}
                <p className="text-[11px] text-luxury-muted text-center sm:text-left">
                  Taxes and shipping calculated at checkout.
                </p>

                {/* Primary Checkout Button matching reference video */}
                <button
                  onClick={handleProceedCheckout}
                  className="w-full py-4 rounded-full bg-luxury-black hover:bg-black text-white font-medium text-sm transition-all duration-300 flex items-center justify-center space-x-2 shadow-lg hover:scale-[1.01] active:scale-[0.99]"
                >
                  <span>Check out</span>
                  <ArrowRight className="w-4 h-4 stroke-[2]" />
                </button>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </AnimatePresence>
  );
};
