import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { formatCurrency } from '../utils/currency';
import { Link } from 'react-router-dom';
import confetti from 'canvas-confetti';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChevronRight,
  ChevronDown,
  ShieldCheck,
  ShoppingBag,
  PackageCheck,
  Smartphone,
  CreditCard,
  Banknote,
  Check,
  ArrowLeft,
} from 'lucide-react';

const STEPS = [
  { id: 1, label: 'Address' },
  { id: 2, label: 'Delivery' },
  { id: 3, label: 'Payment' },
  { id: 4, label: 'Confirmed' },
];

export const CheckoutPage = () => {
  const { items, subtotal, discountAmount, shipping, activeDiscount, clearCart } = useCart();

  const [step, setStep] = useState(1);
  const [mobileSummaryOpen, setMobileSummaryOpen] = useState(false);
  const [formData, setFormData] = useState({
    email: 'aarav.mehta@solven.in',
    firstName: 'Aarav',
    lastName: 'Mehta',
    phone: '+91 98201 44510',
    address: '14, Pali Hill, Bandra West',
    apartment: 'Apt 602, Sea Breeze',
    city: 'Mumbai',
    state: 'Maharashtra',
    postalCode: '400050',
    country: 'India',
    shippingMethod: 'express', // 'express' | 'priority'
    paymentMethod: 'upi', // 'upi' | 'card' | 'cod'
    upiId: 'aarav.mehta@okicici',
    cardNumber: '4242 •••• •••• 8821',
    cardExpiry: '09/29',
    cardCvc: '•••',
  });

  const [isProcessing, setIsProcessing] = useState(false);
  const [confirmedOrderId, setConfirmedOrderId] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAutoFill = () => {
    setFormData((prev) => ({
      ...prev,
      email: 'diya.sharma@solven.in',
      firstName: 'Diya',
      lastName: 'Sharma',
      phone: '+91 98110 77320',
      address: '28, Khan Market Lane',
      apartment: '2nd Floor',
      city: 'New Delhi',
      state: 'Delhi',
      postalCode: '110003',
      country: 'India',
      upiId: 'diya.sharma@okaxis',
    }));
  };

  const shippingCost = formData.shippingMethod === 'priority' ? 399 : shipping;
  const grandTotal = Math.max(0, subtotal - discountAmount + shippingCost);

  const handlePlaceOrder = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      const orderId = `SLV-2026-${Math.floor(10000 + Math.random() * 90000)}`;
      setConfirmedOrderId(orderId);
      setStep(4);
      clearCart();

      try {
        confetti({
          particleCount: 110,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#121212', '#767676', '#D7CEBE', '#FAF9F6'],
        });
      } catch (e) {
        console.log(e);
      }
    }, 1000);
  };

  if (items.length === 0 && step !== 4) {
    return (
      <div className="w-full min-h-[70vh] flex flex-col items-center justify-center p-6 text-center">
        <div className="w-16 h-16 rounded-full bg-cream-100 flex items-center justify-center text-luxury-muted mb-4">
          <ShoppingBag className="w-6 h-6 stroke-[1.5]" />
        </div>
        <h2 className="text-xl font-bold text-luxury-black">Your bag is currently empty</h2>
        <p className="text-xs text-luxury-muted mt-2 max-w-sm">
          Add garments from the SOLVEN collection before proceeding to checkout.
        </p>
        <Link
          to="/"
          className="mt-6 px-8 py-3.5 rounded-full bg-luxury-black text-white text-xs uppercase tracking-wider font-semibold hover:bg-black transition-colors"
        >
          Explore Collection
        </Link>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-cream-50/50 py-6 sm:py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Back + Brand Title */}
        <div className="flex items-center justify-between mb-6">
          <Link
            to="/"
            className="text-xs font-mono text-luxury-muted hover:text-black flex items-center space-x-1 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Store</span>
          </Link>
          <span className="font-display tracking-[0.32em] text-sm sm:text-base font-extrabold uppercase text-luxury-black">
            SOLVEN
          </span>
          <span className="text-[10px] font-mono uppercase tracking-wider text-luxury-muted">
            SECURE
          </span>
        </div>

        {/* Clean Non-Wrapping Step Progress Bar */}
        <div className="max-w-xl mx-auto mb-8">
          <div className="flex items-center justify-between relative">
            {/* Background track line */}
            <div className="absolute top-3.5 left-6 right-6 h-[1.5px] bg-luxury-border -z-0" />
            {/* Active progress line */}
            <div
              className="absolute top-3.5 left-6 h-[1.5px] bg-luxury-black transition-all duration-300 -z-0"
              style={{ width: `calc(${((step - 1) / (STEPS.length - 1)) * 100}% - 3rem)` }}
            />

            {STEPS.map((s) => {
              const isCompleted = step > s.id;
              const isCurrent = step === s.id;
              return (
                <div key={s.id} className="relative z-10 flex flex-col items-center">
                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center text-[11px] font-mono font-bold transition-all ${
                      isCompleted
                        ? 'bg-luxury-black text-white'
                        : isCurrent
                        ? 'bg-luxury-black text-white ring-4 ring-black/10'
                        : 'bg-white border border-luxury-border text-luxury-muted'
                    }`}
                  >
                    {isCompleted ? <Check className="w-3.5 h-3.5 stroke-[2.5]" /> : s.id}
                  </div>
                  <span
                    className={`mt-1.5 text-[10px] font-mono uppercase tracking-wider ${
                      isCurrent || isCompleted ? 'text-luxury-black font-semibold' : 'text-luxury-muted'
                    }`}
                  >
                    {s.label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Mobile Collapsible Order Summary Accordion */}
        {step !== 4 && (
          <div className="lg:hidden mb-5 bg-white rounded-2xl border border-luxury-border/80 overflow-hidden shadow-subtle">
            <button
              onClick={() => setMobileSummaryOpen(!mobileSummaryOpen)}
              className="w-full px-4 py-3.5 flex items-center justify-between text-xs font-medium text-luxury-black"
            >
              <span className="flex items-center space-x-2">
                <ShoppingBag className="w-4 h-4 text-luxury-black" />
                <span>Order Summary ({items.length} {items.length === 1 ? 'item' : 'items'})</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform ${mobileSummaryOpen ? 'rotate-180' : ''}`} />
              </span>
              <span className="font-mono font-bold text-sm text-luxury-black">
                {formatCurrency(grandTotal)}
              </span>
            </button>

            <AnimatePresence>
              {mobileSummaryOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="px-4 pb-4 border-t border-luxury-border/50 space-y-3 overflow-hidden"
                >
                  <div className="pt-3 space-y-2.5">
                    {items.map((item) => (
                      <div key={item.key} className="flex items-center justify-between space-x-3 text-xs">
                        <div className="flex items-center space-x-2.5 min-w-0">
                          <img src={item.image} alt={item.name} className="w-10 h-12 object-contain bg-cream-50 rounded-lg p-1" />
                          <div className="min-w-0">
                            <p className="font-semibold text-luxury-black truncate">{item.name}</p>
                            <p className="text-[10px] text-luxury-muted">Size {item.size} · Qty {item.quantity}</p>
                          </div>
                        </div>
                        <span className="font-mono font-semibold text-luxury-black flex-shrink-0">
                          {formatCurrency(item.price * item.quantity)}
                        </span>
                      </div>
                    ))}
                  </div>
                  <div className="pt-2 border-t border-luxury-border/40 text-xs space-y-1">
                    <div className="flex justify-between text-luxury-muted">
                      <span>Subtotal</span>
                      <span className="font-mono">{formatCurrency(subtotal)}</span>
                    </div>
                    <div className="flex justify-between text-luxury-muted">
                      <span>Delivery</span>
                      <span className="font-mono">{shippingCost === 0 ? 'FREE' : formatCurrency(shippingCost)}</span>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}

        {/* Confirmation Screen (Step 4) */}
        {step === 4 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-xl mx-auto bg-white rounded-3xl border border-luxury-border shadow-float p-6 sm:p-10 text-center"
          >
            <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto mb-5">
              <PackageCheck className="w-8 h-8 stroke-[1.8]" />
            </div>

            <span className="text-[10px] font-mono tracking-widest uppercase text-emerald-600 font-bold block mb-1">
              ORDER CONFIRMED
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-luxury-black">
              Thank you, {formData.firstName}.
            </h2>
            <p className="text-xs text-luxury-muted mt-2 max-w-md mx-auto leading-relaxed">
              Your SOLVEN pieces are being prepared for dispatch. Live tracking updates have been sent to <strong className="text-luxury-black">{formData.email}</strong>.
            </p>

            <div className="mt-7 bg-cream-50/70 rounded-2xl p-5 text-left border border-luxury-border/60 space-y-3 font-mono text-xs">
              <div className="flex justify-between border-b border-luxury-border/40 pb-2">
                <span className="text-luxury-muted">ORDER ID</span>
                <span className="font-bold text-luxury-black">{confirmedOrderId}</span>
              </div>
              <div className="flex justify-between border-b border-luxury-border/40 pb-2">
                <span className="text-luxury-muted">COURIER</span>
                <span className="font-medium text-luxury-black">
                  {formData.shippingMethod === 'priority' ? 'Next-Day Priority Air' : 'Express Courier (2-3 Days)'}
                </span>
              </div>
              <div className="flex justify-between border-b border-luxury-border/40 pb-2">
                <span className="text-luxury-muted">DELIVER TO</span>
                <span className="font-medium text-luxury-black truncate max-w-[190px]">
                  {formData.city}, {formData.postalCode}
                </span>
              </div>
              <div className="flex justify-between pt-1">
                <span className="text-luxury-muted">TOTAL PAID</span>
                <span className="font-bold text-luxury-black text-sm">{formatCurrency(grandTotal)} INR</span>
              </div>
            </div>

            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link
                to="/"
                className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-luxury-black text-white text-xs font-semibold uppercase tracking-wider hover:bg-black transition-colors"
              >
                Continue Shopping
              </Link>
              <Link
                to="/lookbook"
                className="w-full sm:w-auto px-8 py-3.5 rounded-full border border-luxury-border text-luxury-black text-xs font-semibold uppercase tracking-wider hover:bg-cream-100 transition-colors"
              >
                Explore Lookbook
              </Link>
            </div>
          </motion.div>
        ) : (
          /* Main Two-Column Checkout Grid */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left 7 Columns: Step Forms */}
            <div className="lg:col-span-7 bg-white rounded-3xl border border-luxury-border/80 shadow-subtle p-5 sm:p-8">
              
              {/* STEP 1: Contact & Delivery Address */}
              {step === 1 && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-5">
                  <div className="flex items-start justify-between gap-3 border-b border-luxury-border/60 pb-4">
                    <div>
                      <h3 className="text-base sm:text-lg font-bold text-luxury-black">Delivery Address</h3>
                      <p className="text-xs text-luxury-muted mt-0.5">Enter your shipping details across India.</p>
                    </div>
                    <button
                      type="button"
                      onClick={handleAutoFill}
                      className="px-3 py-1.5 rounded-full bg-cream-100 hover:bg-cream-200 text-[10px] font-mono font-semibold text-luxury-black whitespace-nowrap transition-colors"
                    >
                      Auto-Fill Sample
                    </button>
                  </div>

                  <div className="space-y-3.5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                      <div>
                        <label className="text-[10px] font-mono uppercase tracking-widest text-luxury-muted block mb-1">
                          Email
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          className="w-full px-3.5 py-2.5 rounded-xl border border-luxury-border text-sm text-luxury-black focus:outline-none focus:ring-1 focus:ring-black bg-cream-50/40"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] font-mono uppercase tracking-widest text-luxury-muted block mb-1">
                          Mobile Number
                        </label>
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          className="w-full px-3.5 py-2.5 rounded-xl border border-luxury-border text-sm text-luxury-black focus:outline-none focus:ring-1 focus:ring-black bg-cream-50/40"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3.5">
                      <div>
                        <label className="text-[10px] font-mono uppercase tracking-widest text-luxury-muted block mb-1">
                          First Name
                        </label>
                        <input
                          type="text"
                          name="firstName"
                          value={formData.firstName}
                          onChange={handleInputChange}
                          className="w-full px-3.5 py-2.5 rounded-xl border border-luxury-border text-sm text-luxury-black focus:outline-none focus:ring-1 focus:ring-black bg-cream-50/40"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] font-mono uppercase tracking-widest text-luxury-muted block mb-1">
                          Last Name
                        </label>
                        <input
                          type="text"
                          name="lastName"
                          value={formData.lastName}
                          onChange={handleInputChange}
                          className="w-full px-3.5 py-2.5 rounded-xl border border-luxury-border text-sm text-luxury-black focus:outline-none focus:ring-1 focus:ring-black bg-cream-50/40"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-[10px] font-mono uppercase tracking-widest text-luxury-muted block mb-1">
                        House / Street Address
                      </label>
                      <input
                        type="text"
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-luxury-border text-sm text-luxury-black focus:outline-none focus:ring-1 focus:ring-black bg-cream-50/40"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3.5">
                      <div>
                        <label className="text-[10px] font-mono uppercase tracking-widest text-luxury-muted block mb-1">
                          Landmark / Suite
                        </label>
                        <input
                          type="text"
                          name="apartment"
                          value={formData.apartment}
                          onChange={handleInputChange}
                          className="w-full px-3.5 py-2.5 rounded-xl border border-luxury-border text-sm text-luxury-black focus:outline-none focus:ring-1 focus:ring-black bg-cream-50/40"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] font-mono uppercase tracking-widest text-luxury-muted block mb-1">
                          City
                        </label>
                        <input
                          type="text"
                          name="city"
                          value={formData.city}
                          onChange={handleInputChange}
                          className="w-full px-3.5 py-2.5 rounded-xl border border-luxury-border text-sm text-luxury-black focus:outline-none focus:ring-1 focus:ring-black bg-cream-50/40"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3.5">
                      <div>
                        <label className="text-[10px] font-mono uppercase tracking-widest text-luxury-muted block mb-1">
                          State
                        </label>
                        <input
                          type="text"
                          name="state"
                          value={formData.state}
                          onChange={handleInputChange}
                          className="w-full px-3.5 py-2.5 rounded-xl border border-luxury-border text-sm text-luxury-black focus:outline-none focus:ring-1 focus:ring-black bg-cream-50/40"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] font-mono uppercase tracking-widest text-luxury-muted block mb-1">
                          PIN Code
                        </label>
                        <input
                          type="text"
                          name="postalCode"
                          value={formData.postalCode}
                          onChange={handleInputChange}
                          className="w-full px-3.5 py-2.5 rounded-xl border border-luxury-border text-sm text-luxury-black focus:outline-none focus:ring-1 focus:ring-black bg-cream-50/40"
                        />
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => setStep(2)}
                    className="w-full py-3.5 rounded-full bg-luxury-black text-white text-xs font-semibold uppercase tracking-wider hover:bg-black transition-colors flex items-center justify-center space-x-2 shadow-md"
                  >
                    <span>Continue to Delivery</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </motion.div>
              )}

              {/* STEP 2: Shipping Method */}
              {step === 2 && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-5">
                  <div className="border-b border-luxury-border/60 pb-4">
                    <h3 className="text-base sm:text-lg font-bold text-luxury-black">Delivery Speed</h3>
                    <p className="text-xs text-luxury-muted mt-0.5">Choose how you want your SOLVEN order delivered.</p>
                  </div>

                  <div className="space-y-3">
                    <label
                      onClick={() => setFormData((prev) => ({ ...prev, shippingMethod: 'express' }))}
                      className={`p-4 rounded-2xl border flex items-center justify-between cursor-pointer transition-all ${
                        formData.shippingMethod === 'express'
                          ? 'border-luxury-black bg-cream-50 ring-1 ring-black'
                          : 'border-luxury-border hover:border-luxury-subtle'
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                          formData.shippingMethod === 'express' ? 'border-black' : 'border-neutral-300'
                        }`}>
                          {formData.shippingMethod === 'express' && <div className="w-2 h-2 rounded-full bg-black" />}
                        </div>
                        <div>
                          <p className="text-xs font-semibold text-luxury-black">BlueDart Express Air</p>
                          <p className="text-[11px] text-luxury-muted">2–3 business days · Insured pan-India</p>
                        </div>
                      </div>
                      <span className="text-xs font-mono font-bold text-luxury-black">
                        {shipping === 0 ? 'FREE' : formatCurrency(shipping)}
                      </span>
                    </label>

                    <label
                      onClick={() => setFormData((prev) => ({ ...prev, shippingMethod: 'priority' }))}
                      className={`p-4 rounded-2xl border flex items-center justify-between cursor-pointer transition-all ${
                        formData.shippingMethod === 'priority'
                          ? 'border-luxury-black bg-cream-50 ring-1 ring-black'
                          : 'border-luxury-border hover:border-luxury-subtle'
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                          formData.shippingMethod === 'priority' ? 'border-black' : 'border-neutral-300'
                        }`}>
                          {formData.shippingMethod === 'priority' && <div className="w-2 h-2 rounded-full bg-black" />}
                        </div>
                        <div>
                          <p className="text-xs font-semibold text-luxury-black">Next-Day Metro Concierge</p>
                          <p className="text-[11px] text-luxury-muted">24-hr priority dispatch (Mumbai, Delhi, BLR)</p>
                        </div>
                      </div>
                      <span className="text-xs font-mono font-bold text-luxury-black">₹399</span>
                    </label>
                  </div>

                  <div className="flex items-center space-x-3 pt-2">
                    <button
                      onClick={() => setStep(1)}
                      className="px-6 py-3.5 rounded-full border border-luxury-border text-xs font-mono uppercase tracking-wider text-luxury-black hover:bg-cream-100 transition-colors"
                    >
                      Back
                    </button>
                    <button
                      onClick={() => setStep(3)}
                      className="flex-1 py-3.5 rounded-full bg-luxury-black text-white text-xs font-semibold uppercase tracking-wider hover:bg-black transition-colors flex items-center justify-center space-x-2 shadow-md"
                    >
                      <span>Continue to Payment</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </motion.div>
              )}

              {/* STEP 3: Payment Method (UPI / Card / COD) */}
              {step === 3 && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-5">
                  <div className="border-b border-luxury-border/60 pb-4">
                    <h3 className="text-base sm:text-lg font-bold text-luxury-black">Payment Method</h3>
                    <p className="text-xs text-luxury-muted mt-0.5">Select your preferred payment option.</p>
                  </div>

                  <div className="grid grid-cols-3 gap-2.5">
                    <button
                      onClick={() => setFormData((p) => ({ ...p, paymentMethod: 'upi' }))}
                      className={`p-3 rounded-xl border text-xs font-semibold flex flex-col items-center space-y-1.5 transition-all ${
                        formData.paymentMethod === 'upi'
                          ? 'border-black bg-black text-white shadow-sm'
                          : 'border-luxury-border text-luxury-black hover:border-black'
                      }`}
                    >
                      <Smartphone className="w-4 h-4" />
                      <span>UPI / GPay</span>
                    </button>
                    <button
                      onClick={() => setFormData((p) => ({ ...p, paymentMethod: 'card' }))}
                      className={`p-3 rounded-xl border text-xs font-semibold flex flex-col items-center space-y-1.5 transition-all ${
                        formData.paymentMethod === 'card'
                          ? 'border-black bg-black text-white shadow-sm'
                          : 'border-luxury-border text-luxury-black hover:border-black'
                      }`}
                    >
                      <CreditCard className="w-4 h-4" />
                      <span>Card</span>
                    </button>
                    <button
                      onClick={() => setFormData((p) => ({ ...p, paymentMethod: 'cod' }))}
                      className={`p-3 rounded-xl border text-xs font-semibold flex flex-col items-center space-y-1.5 transition-all ${
                        formData.paymentMethod === 'cod'
                          ? 'border-black bg-black text-white shadow-sm'
                          : 'border-luxury-border text-luxury-black hover:border-black'
                      }`}
                    >
                      <Banknote className="w-4 h-4" />
                      <span>Cash (COD)</span>
                    </button>
                  </div>

                  {formData.paymentMethod === 'upi' && (
                    <div className="p-4 rounded-2xl bg-cream-50/80 border border-luxury-border space-y-2">
                      <label className="text-[10px] font-mono uppercase tracking-widest text-luxury-muted block">
                        UPI ID (GPay / PhonePe / Paytm)
                      </label>
                      <input
                        type="text"
                        name="upiId"
                        value={formData.upiId}
                        onChange={handleInputChange}
                        placeholder="username@okicici"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-luxury-border font-mono text-xs bg-white focus:outline-none focus:ring-1 focus:ring-black"
                      />
                    </div>
                  )}

                  {formData.paymentMethod === 'card' && (
                    <div className="p-4 rounded-2xl bg-cream-50/80 border border-luxury-border space-y-3">
                      <div>
                        <label className="text-[10px] font-mono uppercase tracking-widest text-luxury-muted block mb-1">
                          Card Number (Visa / Mastercard / RuPay)
                        </label>
                        <input
                          type="text"
                          name="cardNumber"
                          value={formData.cardNumber}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2.5 rounded-lg border border-luxury-border font-mono text-xs bg-white focus:outline-none"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="text-[10px] font-mono uppercase tracking-widest text-luxury-muted block mb-1">
                            Expiry
                          </label>
                          <input
                            type="text"
                            name="cardExpiry"
                            value={formData.cardExpiry}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2.5 rounded-lg border border-luxury-border font-mono text-xs bg-white focus:outline-none"
                          />
                        </div>
                        <div>
                          <label className="text-[10px] font-mono uppercase tracking-widest text-luxury-muted block mb-1">
                            CVV
                          </label>
                          <input
                            type="text"
                            name="cardCvc"
                            value={formData.cardCvc}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2.5 rounded-lg border border-luxury-border font-mono text-xs bg-white focus:outline-none"
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {formData.paymentMethod === 'cod' && (
                    <div className="p-4 rounded-2xl bg-cream-50/80 border border-luxury-border text-xs text-luxury-muted">
                      Pay via Cash or UPI QR upon doorstep delivery. Available across all serviceable Indian PIN codes.
                    </div>
                  )}

                  <div className="flex items-center space-x-2 text-xs text-luxury-muted bg-cream-50 p-3 rounded-xl">
                    <ShieldCheck className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                    <span>256-bit encrypted checkout terminal ready for Razorpay / Stripe India integration.</span>
                  </div>

                  <div className="flex items-center space-x-3 pt-2">
                    <button
                      onClick={() => setStep(2)}
                      className="px-6 py-3.5 rounded-full border border-luxury-border text-xs font-mono uppercase tracking-wider text-luxury-black hover:bg-cream-100 transition-colors"
                    >
                      Back
                    </button>
                    <button
                      onClick={handlePlaceOrder}
                      disabled={isProcessing}
                      className="flex-1 py-3.5 rounded-full bg-luxury-black text-white text-xs font-semibold uppercase tracking-wider hover:bg-black transition-colors flex items-center justify-center space-x-2 shadow-lg"
                    >
                      {isProcessing ? (
                        <div className="w-5 h-5 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                      ) : (
                        <span>Place Order · {formatCurrency(grandTotal)}</span>
                      )}
                    </button>
                  </div>
                </motion.div>
              )}

            </div>

            {/* Right 5 Columns: Desktop Order Summary Card */}
            <div className="hidden lg:flex lg:col-span-5 bg-white rounded-3xl border border-luxury-border/80 shadow-subtle p-8 flex-col justify-between">
              <div>
                <h3 className="text-base font-bold text-luxury-black border-b border-luxury-border/60 pb-3 mb-4">
                  Order Summary ({items.length} {items.length === 1 ? 'item' : 'items'})
                </h3>

                <div className="space-y-3 max-h-72 overflow-y-auto no-scrollbar divide-y divide-luxury-border/40">
                  {items.map((item) => (
                    <div key={item.key} className="pt-3 first:pt-0 flex items-center justify-between space-x-3">
                      <div className="w-14 h-16 rounded-lg bg-cream-50 p-1 flex-shrink-0">
                        <img src={item.image} alt={item.name} className="w-full h-full object-contain" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-xs font-semibold text-luxury-black truncate">{item.name}</h4>
                        <p className="text-[11px] text-luxury-muted">
                          Size {item.size} · Qty {item.quantity}
                        </p>
                      </div>
                      <span className="text-xs font-mono font-medium text-luxury-black">
                        {formatCurrency(item.price * item.quantity)}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="mt-6 pt-4 border-t border-luxury-border/60 space-y-2 text-xs">
                  <div className="flex justify-between text-luxury-muted">
                    <span>Subtotal</span>
                    <span className="font-mono text-luxury-black">{formatCurrency(subtotal)}</span>
                  </div>
                  {discountAmount > 0 && (
                    <div className="flex justify-between text-emerald-700">
                      <span>Discount ({activeDiscount?.code})</span>
                      <span className="font-mono">-{formatCurrency(discountAmount)}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-luxury-muted">
                    <span>Courier Delivery</span>
                    <span className="font-mono text-luxury-black">
                      {shippingCost === 0 ? 'Complimentary' : formatCurrency(shippingCost)}
                    </span>
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t border-luxury-border/60 mt-6">
                <div className="flex items-baseline justify-between">
                  <span className="text-xs uppercase tracking-wider font-bold text-luxury-black">Total Due</span>
                  <div className="text-right">
                    <span className="text-xl font-mono font-extrabold text-luxury-black">
                      {formatCurrency(grandTotal)}
                    </span>
                    <span className="text-xs font-mono text-luxury-muted ml-1">INR</span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        )}
      </div>
    </div>
  );
};
