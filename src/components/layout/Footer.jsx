import React, { useState } from 'react';
import { ArrowRight, Check } from 'lucide-react';

export const Footer = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
    setTimeout(() => {
      setEmail('');
    }, 2000);
  };

  return (
    <footer className="w-full bg-luxury-black text-white pt-16 pb-24 sm:pb-16 border-t border-luxury-charcoal">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Newsletter & Brand Statement */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pb-16 border-b border-luxury-charcoal">
          <div className="lg:col-span-6 space-y-4">
            <span className="font-display tracking-[0.35em] text-lg font-bold uppercase text-white block">
              SOLVEN
            </span>
            <p className="text-xs sm:text-sm text-neutral-400 max-w-md font-light leading-relaxed">
              Pioneering the intersection of sculptural tailoring, tactile luxury materials, and spatial digital commerce. Designed in Paris & Tokyo.
            </p>
          </div>

          <div className="lg:col-span-6 flex flex-col justify-end">
            <span className="text-[10px] font-mono tracking-widest uppercase text-neutral-400 block mb-2">
              PRIVATE ATELIER DISPATCH
            </span>
            {subscribed ? (
              <div className="inline-flex items-center space-x-2 text-emerald-400 text-xs py-2">
                <Check className="w-4 h-4" />
                <span>You are registered for Private Drop 08 previews.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex max-w-md">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  required
                  className="flex-1 bg-neutral-900 border border-neutral-800 rounded-l-full px-4 py-3 text-xs text-white placeholder:text-neutral-500 focus:outline-none focus:border-white transition-colors"
                />
                <button
                  type="submit"
                  className="bg-white text-black px-6 py-3 rounded-r-full text-xs font-semibold uppercase tracking-wider hover:bg-neutral-200 transition-colors flex items-center space-x-1"
                >
                  <span>Join</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </form>
            )}
            <p className="text-[10px] text-neutral-500 mt-2 font-mono">
              Exclusive drop access · No promotional spam · Unsubscribe at any time.
            </p>
          </div>
        </div>

        {/* Links Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-12 text-xs">
          <div>
            <h4 className="font-mono uppercase tracking-widest text-neutral-400 mb-4 text-[11px]">
              Collection
            </h4>
            <ul className="space-y-2.5 text-neutral-300">
              <li><a href="#rail" className="hover:text-white transition-colors">2027 Virtual Rail</a></li>
              <li><a href="#collections" className="hover:text-white transition-colors">Heavyweight Hoodies</a></li>
              <li><a href="#collections" className="hover:text-white transition-colors">Streetwear Basics</a></li>
              <li><a href="#collections" className="hover:text-white transition-colors">Outerwear & Bombers</a></li>
              <li><a href="#collections" className="hover:text-white transition-colors">Accessories & Slings</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-mono uppercase tracking-widest text-neutral-400 mb-4 text-[11px]">
              Atelier
            </h4>
            <ul className="space-y-2.5 text-neutral-300">
              <li><a href="#manifesto" className="hover:text-white transition-colors">Design Manifesto</a></li>
              <li><span className="text-neutral-400 cursor-default">480GSM Textile Engineering</span></li>
              <li><span className="text-neutral-400 cursor-default">Portuguese Craftsmanship</span></li>
              <li><span className="text-neutral-400 cursor-default">Zero-Waste Archival Program</span></li>
            </ul>
          </div>

          <div>
            <h4 className="font-mono uppercase tracking-widest text-neutral-400 mb-4 text-[11px]">
              Client Care
            </h4>
            <ul className="space-y-2.5 text-neutral-300">
              <li><span className="text-neutral-400 cursor-default">Complimentary Courier</span></li>
              <li><span className="text-neutral-400 cursor-default">Carbon-Neutral Returns</span></li>
              <li><span className="text-neutral-400 cursor-default">Garment Lifetime Repair</span></li>
              <li><span className="text-neutral-400 cursor-default">Size & Fit Consultation</span></li>
            </ul>
          </div>

          <div>
            <h4 className="font-mono uppercase tracking-widest text-neutral-400 mb-4 text-[11px]">
              Edition
            </h4>
            <div className="space-y-2 text-neutral-400 font-mono text-[11px]">
              <p>SPEC: SHOPIFY IN 2027</p>
              <p>BUILD: NEXT-GEN INTERACTIVE</p>
              <p>FRAMEWORK: REACT + FRAMER MOTION</p>
              <div className="pt-2 flex items-center space-x-2 text-emerald-400">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-[10px]">ALL SYSTEMS OPERATIONAL</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-luxury-charcoal flex flex-col sm:flex-row items-center justify-between text-[11px] text-neutral-500 space-y-4 sm:space-y-0">
          <div className="flex flex-col items-center sm:items-start space-y-0.5">
            <p className="text-neutral-300 font-medium tracking-wide">
              Designed &amp; Developed by Karan Kacha
            </p>
            <p className="text-[10px] text-neutral-500 tracking-wider">
              Software Engineer | Creative Developer
            </p>
          </div>

          <p className="text-[11px] text-neutral-500 tracking-wide">
            © 2026 SOLVEN. All rights reserved.
          </p>
        </div>

      </div>
    </footer>
  );
};
