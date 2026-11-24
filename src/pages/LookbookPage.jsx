import React from 'react';
import { PRODUCTS } from '../data/products';
import { useCart } from '../context/CartContext';
import { formatCurrency } from '../utils/currency';
import { motion } from 'framer-motion';
import { ArrowUpRight, Sparkles, Plus, Eye } from 'lucide-react';
import { Link } from 'react-router-dom';

export const LookbookPage = () => {
  const { openProductModal } = useCart();

  const LOOKS = [
    {
      id: 'look-01',
      title: 'Monolithic Heavyweight Layering',
      season: 'LOOK 01 // FW27 CAPSULE',
      image: 'https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?q=80&w=1200&auto=format&fit=crop',
      description: 'An architectural union of our 480GSM Heather Ash Graphic Hoodie paired beneath the Carbon Wool Modular Bomber, anchored by double-pleated charcoal trousers.',
      featuredProductIds: ['hoodie-atheist-grey', 'outerwear-bomber-carbon', 'trousers-pleated-charcoal']
    },
    {
      id: 'look-02',
      title: 'Brutalist Minimalist Silhouette',
      season: 'LOOK 02 // FW27 CAPSULE',
      image: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=1200&auto=format&fit=crop',
      description: 'The raw architectural Oat Pullover combined with the full-grain Nero Black leather sling for uncompromised utilitarian luxury.',
      featuredProductIds: ['pullover-oat-sand', 'accessory-crossbody-leather']
    },
    {
      id: 'look-03',
      title: 'Total Pitch Obsidian Study',
      season: 'LOOK 03 // FW27 CAPSULE',
      image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1200&auto=format&fit=crop',
      description: 'Exploring monochromatic depth with 500GSM Suvin cotton, eliminating visual excess to celebrate sculptural structure and seam tension.',
      featuredProductIds: ['hoodie-obsidian-core', 'tshirt-box-monolith']
    }
  ];

  return (
    <div className="w-full min-h-screen bg-white py-10 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Lookbook Header */}
        <div className="max-w-3xl mb-16">
          <span className="text-[10px] font-mono tracking-[0.3em] uppercase text-luxury-muted block mb-2">
            EDITORIAL LOOKBOOK // 2027
          </span>
          <h1 className="text-3xl sm:text-5xl font-serif tracking-tight text-luxury-black">
            The Shape of Modern Expression
          </h1>
          <p className="text-sm text-luxury-muted mt-4 leading-relaxed font-light max-w-xl">
            A photographic exploration of weight, tactile tension, and futuristic minimalist tailoring. Tap on any curated look to inspect and acquire the individual pieces.
          </p>
        </div>

        {/* Looks List */}
        <div className="space-y-24 sm:space-y-32">
          {LOOKS.map((look, index) => {
            const isReversed = index % 2 === 1;

            return (
              <div
                key={look.id}
                className={`grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center ${
                  isReversed ? 'lg:flex-row-reverse' : ''
                }`}
              >
                {/* Hero Editorial Photography */}
                <div className={`lg:col-span-7 ${isReversed ? 'lg:order-2' : 'lg:order-1'}`}>
                  <div className="relative rounded-3xl overflow-hidden aspect-[4/5] bg-cream-100 shadow-float group">
                    <img
                      src={look.image}
                      alt={look.title}
                      className="w-full h-full object-cover object-center filter grayscale contrast-105 group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="glass-pill px-3 py-1 rounded-full text-[10px] font-mono uppercase tracking-widest text-luxury-black">
                        {look.season}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Coordinated Garments Details */}
                <div className={`lg:col-span-5 ${isReversed ? 'lg:order-1' : 'lg:order-2'} flex flex-col justify-center`}>
                  <span className="text-[10px] font-mono tracking-widest uppercase text-luxury-muted block mb-1">
                    {look.season}
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-serif text-luxury-black font-normal">
                    {look.title}
                  </h2>
                  <p className="text-xs sm:text-sm text-luxury-muted mt-3 leading-relaxed font-light">
                    {look.description}
                  </p>

                  {/* Featured Products in this look */}
                  <div className="mt-8 pt-6 border-t border-luxury-border/60 space-y-3">
                    <span className="text-[10px] font-mono tracking-widest uppercase text-luxury-black font-semibold block mb-2">
                      PIECES FEATURED IN THIS LOOK
                    </span>

                    {look.featuredProductIds.map((pId) => {
                      const prod = PRODUCTS.find((p) => p.id === pId);
                      if (!prod) return null;

                      return (
                        <div
                          key={prod.id}
                          onClick={() => openProductModal(prod)}
                          className="p-3 rounded-2xl border border-luxury-border/60 hover:border-black/30 hover:bg-cream-50/70 transition-all flex items-center justify-between cursor-pointer group"
                        >
                          <div className="flex items-center space-x-3 min-w-0">
                            <div className="w-12 h-14 rounded-lg bg-cream-50 p-1 flex-shrink-0">
                              <img
                                src={prod.colors[0].frontImage}
                                alt={prod.name}
                                className="w-full h-full object-contain"
                              />
                            </div>
                            <div className="min-w-0">
                              <h4 className="text-xs font-semibold text-luxury-black truncate group-hover:text-luxury-muted transition-colors">
                                {prod.name}
                              </h4>
                              <p className="text-[10px] font-mono text-luxury-muted">
                                {formatCurrency(prod.price)}
                              </p>
                            </div>
                          </div>

                          <div className="flex items-center space-x-1.5 text-xs font-medium text-luxury-black group-hover:translate-x-1 transition-transform">
                            <span className="text-[11px] uppercase tracking-wider font-semibold">Inspect</span>
                            <ArrowUpRight className="w-3.5 h-3.5" />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="mt-24 pt-16 border-t border-luxury-border/60 text-center">
          <h3 className="text-2xl font-serif text-luxury-black">Experience the 2027 Clothes Rail</h3>
          <p className="text-xs text-luxury-muted mt-2 max-w-md mx-auto">
            Interact with the curved virtual clothes rack and customize garments in real time.
          </p>
          <Link
            to="/"
            className="mt-6 inline-flex px-8 py-3.5 rounded-full bg-luxury-black text-white text-xs font-semibold uppercase tracking-wider hover:bg-black transition-colors"
          >
            Go to 2027 Rail
          </Link>
        </div>

      </div>
    </div>
  );
};
