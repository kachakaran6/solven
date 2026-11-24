import React, { useState, useEffect, useMemo } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { PRODUCTS } from '../data/products';
import { useCart } from '../context/CartContext';
import { formatCurrency } from '../utils/currency';
import { ProductGrid } from '../components/home/ProductGrid';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChevronRight,
  ChevronLeft,
  Heart,
  Check,
  Plus,
  Minus,
  Truck,
  RotateCcw,
  ChevronDown,
  Star,
  ArrowLeft,
} from 'lucide-react';

// Curated editorial lookbook photography by category for rich 8-image gallery
const EDITORIAL_BY_CATEGORY = {
  hoodies: [
    'https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?q=80&w=900&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=900&auto=format&fit=crop',
  ],
  'ladies-tops': [
    'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=900&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?q=80&w=900&auto=format&fit=crop',
  ],
  'baggy-jeans': [
    'https://images.unsplash.com/photo-1542272604-787c3835535d?q=80&w=900&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?q=80&w=900&auto=format&fit=crop',
  ],
  'formal-shirts': [
    'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?q=80&w=900&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1598033129183-c4f50c736f10?q=80&w=900&auto=format&fit=crop',
  ],
  streetwear: [
    'https://images.unsplash.com/photo-1523398002811-999ca8dec234?q=80&w=900&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?q=80&w=900&auto=format&fit=crop',
  ],
};

export const ProductPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart, wishlist, toggleWishlist } = useCart();

  const product = PRODUCTS.find((p) => p.id === id) || PRODUCTS[0];

  const [selectedColorIndex, setSelectedColorIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState('M');
  const [quantity, setQuantity] = useState(1);
  const [activeSlide, setActiveSlide] = useState(0);
  const [isAdding, setIsAdding] = useState(false);
  const [addedSuccess, setAddedSuccess] = useState(false);
  const [openAccordion, setOpenAccordion] = useState('details');

  useEffect(() => {
    window.scrollTo(0, 0);
    setSelectedColorIndex(product.defaultColorIndex || 0);
    setSelectedSize(product.availableSizes[0] || 'M');
    setQuantity(1);
    setActiveSlide(0);
  }, [id, product]);

  const currentColor = product.colors[selectedColorIndex] || product.colors[0];
  const isSaved = wishlist.includes(product.id);

  // Build 8 distinct professional gallery frames (no hanger!)
  const galleryFrames = useMemo(() => {
    const front = currentColor.frontImage;
    const back = currentColor.backImage || currentColor.frontImage;
    const editorial = EDITORIAL_BY_CATEGORY[product.category] || EDITORIAL_BY_CATEGORY.hoodies;

    return [
      {
        id: 'studio-front',
        label: 'Studio Front',
        src: front,
        imgClass: 'object-contain scale-100',
        bgClass: 'bg-cream-50/70',
      },
      {
        id: 'collar-detail',
        label: 'Upper Detail',
        src: front,
        imgClass: 'object-cover object-top scale-[1.45] origin-top',
        bgClass: 'bg-cream-100/80',
      },
      {
        id: 'angled-drape',
        label: '3/4 Silhouette',
        src: front,
        imgClass: 'object-contain scale-105',
        style: { transform: 'perspective(900px) rotateY(-18deg)' },
        bgClass: 'bg-cream-50/70',
      },
      {
        id: 'fabric-macro',
        label: 'Fabric Weave',
        src: front,
        imgClass: 'object-cover object-center scale-[1.85]',
        bgClass: 'bg-cream-100',
      },
      {
        id: 'hem-finish',
        label: 'Hem & Stitch',
        src: front,
        imgClass: 'object-cover object-bottom scale-[1.45] origin-bottom',
        bgClass: 'bg-cream-50/80',
      },
      {
        id: 'back-profile',
        label: 'Rear Profile',
        src: back,
        imgClass: 'object-contain scale-100',
        style: { transform: 'perspective(900px) rotateY(16deg)' },
        bgClass: 'bg-cream-50/70',
      },
      {
        id: 'editorial-1',
        label: 'Atelier Look',
        src: editorial[0],
        imgClass: 'object-cover object-center',
        bgClass: 'bg-neutral-100',
      },
      {
        id: 'editorial-mono',
        label: 'Monochrome Study',
        src: editorial[1] || editorial[0],
        imgClass: 'object-cover object-center grayscale contrast-110',
        bgClass: 'bg-neutral-100',
      },
    ];
  }, [currentColor, product.category]);

  const activeFrame = galleryFrames[activeSlide] || galleryFrames[0];

  const handleAddToCart = () => {
    if (isAdding) return;
    setIsAdding(true);

    setTimeout(() => {
      addToCart(product, {
        color: currentColor,
        size: selectedSize,
        quantity,
        openDrawer: true,
      });
      setIsAdding(false);
      setAddedSuccess(true);
      setTimeout(() => setAddedSuccess(false), 2000);
    }, 300);
  };

  const handleBuyNow = () => {
    addToCart(product, {
      color: currentColor,
      size: selectedSize,
      quantity,
      openDrawer: false,
    });
    navigate('/checkout');
  };

  const relatedProducts = PRODUCTS.filter((p) => p.id !== product.id).slice(0, 4);

  return (
    <div className="w-full min-h-screen bg-white">
      {/* Top Breadcrumb + Back Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between gap-2">
        <nav className="flex items-center space-x-1.5 text-xs font-mono text-luxury-muted min-w-0">
          <Link to="/" className="hover:text-black transition-colors flex items-center space-x-1 flex-shrink-0">
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Rails</span>
          </Link>
          <ChevronRight className="w-3.5 h-3.5 flex-shrink-0" />
          <span className="truncate max-w-[90px] sm:max-w-none">{product.categoryName}</span>
          <ChevronRight className="w-3.5 h-3.5 flex-shrink-0" />
          <span className="text-luxury-black font-semibold truncate">{product.name}</span>
        </nav>
      </div>

      {/* Main Two-Column Layout */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 sm:py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-start">
          
          {/* Left Column: 8-Image Professional Studio Gallery (No Hanger!) */}
          <div className="lg:col-span-7 flex flex-col items-center">
            
            {/* Main Image Frame */}
            <div className={`relative w-full max-w-xl aspect-[3/4] ${activeFrame.bgClass} rounded-3xl overflow-hidden border border-luxury-border/60 shadow-subtle group flex items-center justify-center p-4 sm:p-8`}>
              
              {/* Slide Counter Pill */}
              <div className="absolute top-4 left-4 z-20 glass-pill px-3 py-1 rounded-full text-[10px] font-mono font-semibold text-luxury-black">
                0{activeSlide + 1} / 0{galleryFrames.length} · {activeFrame.label.toUpperCase()}
              </div>

              {/* Wishlist Toggle */}
              <button
                onClick={() => toggleWishlist(product.id)}
                className="absolute top-4 right-4 p-2.5 rounded-full bg-white/90 backdrop-blur-sm border border-luxury-border shadow-sm text-luxury-black hover:scale-110 transition-transform z-20"
                aria-label="Save to wishlist"
              >
                <Heart className={`w-4 h-4 ${isSaved ? 'fill-black text-black' : ''}`} />
              </button>

              {/* Main Image with smooth crossfade */}
              <AnimatePresence mode="wait">
                <motion.img
                  key={`${currentColor.id}-${activeFrame.id}`}
                  src={activeFrame.src}
                  alt={`${product.name} — ${activeFrame.label}`}
                  initial={{ opacity: 0, scale: 0.97 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.97 }}
                  transition={{ duration: 0.25 }}
                  style={activeFrame.style}
                  className={`w-full h-full rounded-2xl transition-transform duration-500 ${activeFrame.imgClass}`}
                />
              </AnimatePresence>

              {/* Prev / Next Overlay Arrows */}
              <button
                onClick={() => setActiveSlide((prev) => (prev === 0 ? galleryFrames.length - 1 : prev - 1))}
                className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/85 backdrop-blur-sm border border-luxury-border flex items-center justify-center text-luxury-black shadow-sm hover:scale-105 transition-transform z-20"
                aria-label="Previous image"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={() => setActiveSlide((prev) => (prev === galleryFrames.length - 1 ? 0 : prev + 1))}
                className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/85 backdrop-blur-sm border border-luxury-border flex items-center justify-center text-luxury-black shadow-sm hover:scale-105 transition-transform z-20"
                aria-label="Next image"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            {/* 8-Image Thumbnail Strip */}
            <div className="w-full max-w-xl mt-4 grid grid-cols-4 sm:grid-cols-8 gap-2">
              {galleryFrames.map((frame, idx) => {
                const isActive = idx === activeSlide;
                return (
                  <button
                    key={frame.id}
                    onClick={() => setActiveSlide(idx)}
                    className={`relative aspect-[3/4] rounded-xl overflow-hidden border transition-all ${
                      frame.bgClass
                    } ${
                      isActive
                        ? 'ring-2 ring-luxury-black ring-offset-1 border-luxury-black scale-[1.03]'
                        : 'border-luxury-border/70 opacity-75 hover:opacity-100'
                    }`}
                    aria-label={frame.label}
                  >
                    <img
                      src={frame.src}
                      alt={frame.label}
                      style={frame.style}
                      className={`w-full h-full ${frame.imgClass}`}
                    />
                  </button>
                );
              })}
            </div>

          </div>

          {/* Right Column: Purchasing & Deep Information */}
          <div className="lg:col-span-5 flex flex-col space-y-6">
            
            {/* Header / Title / INR Pricing */}
            <div className="border-b border-luxury-border/60 pb-5">
              <div className="flex items-center space-x-2 text-[10px] font-mono uppercase tracking-widest text-luxury-muted mb-2">
                <span>{product.code}</span>
                <span>•</span>
                <span>{product.categoryName}</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-luxury-black">
                {product.name}
              </h1>
              <p className="text-xs font-mono uppercase tracking-wider text-luxury-muted mt-1">
                {product.tagline}
              </p>

              <div className="mt-4 flex items-baseline space-x-3">
                <span className="text-2xl font-mono font-bold text-luxury-black">
                  {formatCurrency(product.price)}
                </span>
                {product.originalPrice && (
                  <span className="text-sm font-mono text-luxury-muted line-through">
                    {formatCurrency(product.originalPrice)}
                  </span>
                )}
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 font-semibold">
                  IN STOCK · INCL. ALL TAXES
                </span>
              </div>

              {/* Rating */}
              <div className="flex items-center space-x-2 mt-3 text-xs text-luxury-muted">
                <div className="flex text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-current" />
                  ))}
                </div>
                <span className="font-mono font-medium text-luxury-black">{product.rating}</span>
                <span>({product.reviewsCount} verified reviews)</span>
              </div>
            </div>

            {/* Description */}
            <p className="text-xs sm:text-sm text-luxury-muted leading-relaxed font-light">
              {product.description}
            </p>

            {/* Color Swatches */}
            <div>
              <span className="text-[11px] font-mono uppercase tracking-widest text-luxury-muted block mb-2">
                Colorway: <strong className="text-luxury-black">{currentColor.name}</strong>
              </span>
              <div className="flex items-center space-x-3">
                {product.colors.map((color, idx) => (
                  <button
                    key={color.id}
                    onClick={() => setSelectedColorIndex(idx)}
                    className={`w-9 h-9 rounded-full p-0.5 transition-all ${
                      selectedColorIndex === idx
                        ? 'ring-2 ring-black ring-offset-2'
                        : 'opacity-80 hover:opacity-100 hover:scale-105'
                    }`}
                    aria-label={color.name}
                  >
                    <span
                      className="w-full h-full rounded-full block border border-black/10 shadow-inner"
                      style={{ backgroundColor: color.hex }}
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Size Selector */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] font-mono uppercase tracking-widest text-luxury-muted">
                  Select Size
                </span>
                <span className="text-[11px] text-luxury-muted underline cursor-pointer">
                  Size & Fit Guide
                </span>
              </div>

              <div className="grid grid-cols-4 gap-2.5">
                {product.sizes.map((sz) => {
                  const isAvailable = product.availableSizes.includes(sz);
                  const isSelected = selectedSize === sz;

                  return (
                    <button
                      key={sz}
                      disabled={!isAvailable}
                      onClick={() => setSelectedSize(sz)}
                      className={`py-3 rounded-xl text-xs font-mono font-semibold transition-all ${
                        !isAvailable
                          ? 'border border-luxury-border opacity-30 line-through cursor-not-allowed'
                          : isSelected
                          ? 'bg-luxury-black text-white shadow-md'
                          : 'border border-luxury-border hover:border-black text-luxury-black bg-cream-50/40'
                      }`}
                    >
                      {sz}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Quantity Stepper */}
            <div className="flex items-center justify-between pt-2">
              <span className="text-[11px] font-mono uppercase tracking-widest text-luxury-muted">
                Quantity
              </span>
              <div className="inline-flex items-center border border-luxury-border rounded-full bg-cream-50 px-4 py-2 space-x-4">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="text-luxury-muted hover:text-black transition-colors"
                  aria-label="Decrease quantity"
                >
                  <Minus className="w-3.5 h-3.5 stroke-[2.5]" />
                </button>
                <span className="font-mono text-sm font-bold text-luxury-black min-w-[20px] text-center">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="text-luxury-muted hover:text-black transition-colors"
                  aria-label="Increase quantity"
                >
                  <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
                </button>
              </div>
            </div>

            {/* Guarantees */}
            <div className="grid grid-cols-2 gap-3 pt-2 text-xs text-luxury-muted border-t border-luxury-border/50">
              <div className="flex items-center space-x-2 pt-2">
                <Truck className="w-4 h-4 text-luxury-black flex-shrink-0" />
                <span>Free Express Delivery over ₹2,999</span>
              </div>
              <div className="flex items-center space-x-2 pt-2">
                <RotateCcw className="w-4 h-4 text-luxury-black flex-shrink-0" />
                <span>14-Day Easy Exchange</span>
              </div>
            </div>

            {/* Accordions (Specifications & Shipping) */}
            <div className="border-t border-luxury-border/60 pt-2 divide-y divide-luxury-border/50">
              <div className="py-3">
                <button
                  onClick={() => setOpenAccordion(openAccordion === 'details' ? '' : 'details')}
                  className="w-full flex items-center justify-between text-xs font-bold uppercase tracking-wider text-luxury-black py-1"
                >
                  <span>Technical Specifications</span>
                  <ChevronDown className={`w-4 h-4 transition-transform ${openAccordion === 'details' ? 'rotate-180' : ''}`} />
                </button>
                {openAccordion === 'details' && (
                  <div className="pt-3 pb-2 text-xs space-y-2">
                    {product.details?.map((d) => (
                      <div key={d.label} className="flex justify-between py-1 border-b border-luxury-border/30">
                        <span className="text-luxury-muted font-mono">{d.label}</span>
                        <span className="font-medium text-luxury-black">{d.value}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="py-3">
                <button
                  onClick={() => setOpenAccordion(openAccordion === 'shipping' ? '' : 'shipping')}
                  className="w-full flex items-center justify-between text-xs font-bold uppercase tracking-wider text-luxury-black py-1"
                >
                  <span>Packaging & Dispatch across India</span>
                  <ChevronDown className={`w-4 h-4 transition-transform ${openAccordion === 'shipping' ? 'rotate-180' : ''}`} />
                </button>
                {openAccordion === 'shipping' && (
                  <div className="pt-3 pb-2 text-xs text-luxury-muted leading-relaxed space-y-2">
                    <p>
                      Packaged in our matte black archival box with a reusable SOLVEN cotton dust bag.
                    </p>
                    <p>
                      Dispatched within 24 hours via BlueDart Air Express across Mumbai, Delhi NCR, Bengaluru, Hyderabad, and pan-India.
                    </p>
                  </div>
                )}
              </div>
            </div>

          </div>
        </div>

        {/* You May Also Admire */}
        <div className="mt-20 pt-14 border-t border-luxury-border/60 pb-28">
          <div className="mb-8">
            <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-luxury-muted block">
              COORDINATED ATELIER PIECES
            </span>
            <h3 className="text-2xl font-bold tracking-tight text-luxury-black">
              Complete The Look
            </h3>
          </div>
          <ProductGrid products={relatedProducts} />
        </div>

      </div>

      {/* Professional Sticky Bottom Action Bar: Add to Cart & Buy Now */}
      <div className="fixed bottom-0 left-0 right-0 z-40 glass-sheet border-t border-luxury-border/80 shadow-sheet px-4 py-3 sm:px-8">
        <div className="max-w-5xl mx-auto flex items-center justify-between gap-3 sm:gap-6">
          {/* Desktop Summary */}
          <div className="hidden sm:flex items-center space-x-3 min-w-0">
            <img
              src={currentColor.frontImage}
              alt={product.name}
              className="w-10 h-10 object-contain bg-cream-50 rounded-lg p-1 border border-luxury-border/50"
            />
            <div className="min-w-0">
              <p className="text-xs font-semibold text-luxury-black truncate">{product.name}</p>
              <p className="text-[11px] font-mono text-luxury-muted">
                {formatCurrency(product.price * quantity)} · Size {selectedSize} · {currentColor.name}
              </p>
            </div>
          </div>

          {/* Mobile Compact Price */}
          <div className="flex flex-col sm:hidden flex-shrink-0">
            <span className="text-[10px] font-mono uppercase text-luxury-muted">
              Size {selectedSize} · Qty {quantity}
            </span>
            <span className="text-sm font-mono font-bold text-luxury-black">
              {formatCurrency(product.price * quantity)}
            </span>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-1 sm:flex-initial items-center gap-2 sm:gap-3">
            <button
              onClick={handleAddToCart}
              disabled={isAdding}
              className={`flex-1 sm:flex-initial sm:min-w-[160px] py-3 px-4 rounded-full text-[11px] sm:text-xs font-semibold uppercase tracking-wider transition-all flex items-center justify-center space-x-1.5 border whitespace-nowrap ${
                addedSuccess
                  ? 'bg-emerald-600 border-emerald-600 text-white'
                  : 'bg-white border-luxury-black text-luxury-black hover:bg-cream-100 active:scale-[0.98]'
              }`}
            >
              {isAdding ? (
                <div className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" />
              ) : addedSuccess ? (
                <>
                  <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                  <span>Added</span>
                </>
              ) : (
                <span>Add to Cart</span>
              )}
            </button>

            <button
              onClick={handleBuyNow}
              className="flex-1 sm:flex-initial sm:min-w-[160px] py-3 px-5 rounded-full bg-luxury-black hover:bg-black text-white text-[11px] sm:text-xs font-semibold uppercase tracking-wider transition-all shadow-md hover:scale-[1.01] active:scale-[0.98] flex items-center justify-center space-x-1.5 whitespace-nowrap"
            >
              <span>Buy Now</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

    </div>
  );
};
