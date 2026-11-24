import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Sparkles, Compass, Shield } from 'lucide-react';
import { Link } from 'react-router-dom';

export const EditorialSection = () => {
  return (
    <section id="manifesto" className="w-full py-16 sm:py-24 bg-cream-50/60 border-t border-luxury-border/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Editorial Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16">
          <div className="max-w-2xl">
            <span className="text-[10px] font-mono tracking-[0.3em] uppercase text-luxury-muted block mb-3">
              ATELIER PHILOSOPHY // 2027
            </span>
            <h2 className="text-3xl sm:text-5xl font-serif tracking-tight text-luxury-black leading-[1.1]">
              Sculptural silhouettes engineered for the next era of personal dress.
            </h2>
          </div>
          <p className="mt-4 md:mt-0 text-sm text-luxury-muted max-w-sm font-normal leading-relaxed">
            Eliminating the boundary between utilitarian streetwear and bespoke couture through brutalist geometry, heavyweight tactile cottons, and ergonomic drape.
          </p>
        </div>

        {/* Editorial 2-Column Banner */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center mb-16">
          {/* Left large photo */}
          <div className="md:col-span-7 relative rounded-3xl overflow-hidden aspect-[4/5] sm:aspect-[16/11] bg-luxury-charcoal group">
            <img
              src="https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=1200&auto=format&fit=crop"
              alt="Editorial campaign"
              className="w-full h-full object-cover object-center filter grayscale contrast-110 group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-6 sm:p-10 text-white">
              <span className="text-[10px] font-mono tracking-widest uppercase text-white/70">
                CAPSULE FW27 — PARIS / TOKYO
              </span>
              <h3 className="text-xl sm:text-3xl font-serif font-light mt-1 mb-2">
                Monolithic Weight & Precision Draping
              </h3>
              <p className="text-xs sm:text-sm text-white/80 max-w-md font-light leading-relaxed">
                Every pattern piece is mapped to body tension vectors, eliminating chafing seams while preserving structural integrity after hundreds of wears.
              </p>
            </div>
          </div>

          {/* Right Cards Stack */}
          <div className="md:col-span-5 flex flex-col space-y-6">
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-luxury-border/80 shadow-subtle flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-luxury-muted">
                  01 / FABRIC ARCHITECTURE
                </span>
                <h4 className="text-lg font-semibold text-luxury-black mt-2 mb-2">
                  480GSM Loopback Terry
                </h4>
                <p className="text-xs text-luxury-muted leading-relaxed">
                  Knitted on low-tension vintage loopwheel looms in Wakayama, Japan. Provides unmatched structural density without stiffness.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-luxury-border/50 flex items-center justify-between text-xs font-mono">
                <span>CERTIFIED ORGANIC</span>
                <span className="font-semibold text-luxury-black">GOTS COMPLIANT</span>
              </div>
            </div>

            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-luxury-border/80 shadow-subtle flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-luxury-muted">
                  02 / CIRCULAR PRODUCTION
                </span>
                <h4 className="text-lg font-semibold text-luxury-black mt-2 mb-2">
                  Zero-Waste Micro-Runs
                </h4>
                <p className="text-xs text-luxury-muted leading-relaxed">
                  Produced strictly in numbered limited batches to eradicate retail inventory excess. Unsold off-cuts are re-spun into our archival yarn blend.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-luxury-border/50 flex items-center justify-between text-xs font-mono">
                <span>LIMITED RUN</span>
                <span className="font-semibold text-luxury-black">300 UNITS PER PIECE</span>
              </div>
            </div>
          </div>
        </div>

        {/* Feature Pills */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-8 border-t border-luxury-border/60">
          <div className="flex items-start space-x-4">
            <div className="w-10 h-10 rounded-full bg-white border border-luxury-border flex items-center justify-center flex-shrink-0 text-luxury-black">
              <Compass className="w-5 h-5 stroke-[1.8]" />
            </div>
            <div>
              <h5 className="text-xs font-bold uppercase tracking-wider text-luxury-black">Global Express Courier</h5>
              <p className="text-xs text-luxury-muted mt-1 leading-relaxed">
                Carbon-neutral 48-hour delivery across North America, Europe, and Asia.
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-4">
            <div className="w-10 h-10 rounded-full bg-white border border-luxury-border flex items-center justify-center flex-shrink-0 text-luxury-black">
              <Shield className="w-5 h-5 stroke-[1.8]" />
            </div>
            <div>
              <h5 className="text-xs font-bold uppercase tracking-wider text-luxury-black">Lifetime Garment Warranty</h5>
              <p className="text-xs text-luxury-muted mt-1 leading-relaxed">
                Free repairs and complimentary seam re-binding for the entire lifespan of your garment.
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-4">
            <div className="w-10 h-10 rounded-full bg-white border border-luxury-border flex items-center justify-center flex-shrink-0 text-luxury-black">
              <Sparkles className="w-5 h-5 stroke-[1.8]" />
            </div>
            <div>
              <h5 className="text-xs font-bold uppercase tracking-wider text-luxury-black">2027 Interactive Atelier</h5>
              <p className="text-xs text-luxury-muted mt-1 leading-relaxed">
                Virtual garment rail and true-scale digital draping for effortless selection.
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
