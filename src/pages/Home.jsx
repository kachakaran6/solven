import React, { useState, useMemo } from 'react';
import { CategoryCircles } from '../components/home/CategoryCircles';
import { InteractiveRail } from '../components/home/InteractiveRail';
import { ProductGrid } from '../components/home/ProductGrid';
import { EditorialSection } from '../components/home/EditorialSection';
import { PRODUCTS } from '../data/products';
import { CATEGORIES } from '../data/categories';
import { useCart } from '../context/CartContext';
import { motion, AnimatePresence } from 'framer-motion';
import { LayoutGrid, Compass, Heart } from 'lucide-react';

const BOUTIQUE_RAILS = [
  {
    id: 'hoodies',
    sectionLabel: 'RAIL 01 // NEW COLLECTION',
    title: 'HEAVYWEIGHT HOODIES',
  },
  {
    id: 'ladies-tops',
    sectionLabel: "RAIL 02 // WOMEN'S ATELIER",
    title: 'LADIES TOPS',
  },
  {
    id: 'baggy-jeans',
    sectionLabel: 'RAIL 03 // STREET DENIM',
    title: 'BAGGY JEANS',
  },
  {
    id: 'formal-shirts',
    sectionLabel: 'RAIL 04 // TAILORED ARCHIVE',
    title: "MEN'S FORMAL SHIRTS",
  },
];

export const Home = () => {
  const [activeCategory, setActiveCategory] = useState('new-arrivals');
  const [viewMode, setViewMode] = useState('rail'); // 'rail' | 'grid'
  const { wishlist } = useCart();

  // Filter products based on active category
  const filteredProducts = useMemo(() => {
    if (activeCategory === 'new-arrivals') {
      return PRODUCTS;
    }
    if (activeCategory === 'trending') {
      return PRODUCTS.filter((p) => p.isTrending);
    }
    return PRODUCTS.filter((p) => p.category === activeCategory);
  }, [activeCategory]);

  const activeCategoryObj = CATEGORIES.find((c) => c.id === activeCategory);
  const activeCategoryTitle = activeCategoryObj ? activeCategoryObj.name.toUpperCase() : 'PREMIUM STREETWEAR';

  const wishlistProducts = useMemo(() => {
    return PRODUCTS.filter((p) => wishlist.includes(p.id));
  }, [wishlist]);

  return (
    <div className="w-full min-h-screen bg-white">
      {/* Category Circles Row */}
      <CategoryCircles
        activeCategory={activeCategory}
        onSelectCategory={(id) => setActiveCategory(id)}
      />

      {/* View Switcher Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-4 pb-1 flex items-center justify-between gap-2">
        <div className="flex items-center space-x-2">
          <span className="text-[10px] font-mono tracking-widest uppercase text-luxury-muted hidden sm:inline">
            VIEW:
          </span>
          <div className="inline-flex p-1 rounded-full bg-cream-100 border border-luxury-border/60">
            <button
              onClick={() => setViewMode('rail')}
              className={`px-3 py-1 rounded-full text-[11px] sm:text-xs font-medium transition-all flex items-center space-x-1.5 whitespace-nowrap ${
                viewMode === 'rail'
                  ? 'bg-white text-luxury-black shadow-sm font-semibold'
                  : 'text-luxury-muted hover:text-luxury-black'
              }`}
            >
              <Compass className="w-3.5 h-3.5 flex-shrink-0" />
              <span>2027 Rails</span>
            </button>
            <button
              onClick={() => setViewMode('grid')}
              className={`px-3 py-1 rounded-full text-[11px] sm:text-xs font-medium transition-all flex items-center space-x-1.5 whitespace-nowrap ${
                viewMode === 'grid'
                  ? 'bg-white text-luxury-black shadow-sm font-semibold'
                  : 'text-luxury-muted hover:text-luxury-black'
              }`}
            >
              <LayoutGrid className="w-3.5 h-3.5 flex-shrink-0" />
              <span>Grid</span>
            </button>
          </div>
        </div>

        <div className="text-[11px] font-mono text-luxury-muted whitespace-nowrap">
          {filteredProducts.length} PIECES
        </div>
      </div>

      {/* Main Product Discovery Area */}
      <AnimatePresence mode="wait">
        {viewMode === 'rail' ? (
          <motion.div
            key={`rail-${activeCategory}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            {activeCategory === 'new-arrivals' ? (
              /* Render all 4 Dedicated Boutique Rails */
              <div className="divide-y divide-luxury-border/40">
                {BOUTIQUE_RAILS.map((rail) => {
                  const railProducts = PRODUCTS.filter((p) => p.category === rail.id);
                  return (
                    <InteractiveRail
                      key={rail.id}
                      products={railProducts}
                      sectionLabel={rail.sectionLabel}
                      activeCategoryTitle={rail.title}
                    />
                  );
                })}
              </div>
            ) : (
              /* Focused single category rail */
              <InteractiveRail
                products={filteredProducts.length > 0 ? filteredProducts : PRODUCTS}
                sectionLabel="CURATED RACK"
                activeCategoryTitle={activeCategoryTitle}
              />
            )}
          </motion.div>
        ) : (
          <motion.div
            key={`grid-${activeCategory}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10"
          >
            <div className="mb-6 flex items-center justify-between">
              <div>
                <span className="text-[10px] font-mono tracking-widest uppercase text-luxury-muted">
                  CURRENT CATALOG
                </span>
                <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-luxury-black">
                  {activeCategoryTitle}
                </h2>
              </div>
            </div>
            <ProductGrid products={filteredProducts.length > 0 ? filteredProducts : PRODUCTS} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Complete Collection Grid Section */}
      <section id="collections" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 border-t border-luxury-border/60">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10">
          <div>
            <span className="text-[10px] font-mono tracking-[0.25em] uppercase text-luxury-muted block mb-1">
              THE FULL CAPSULE
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-luxury-black">
              All Ready-To-Wear Editions
            </h2>
          </div>
          <p className="mt-2 sm:mt-0 text-xs sm:text-sm text-luxury-muted max-w-sm">
            Curated garments engineered with boxy silhouettes, heavy gauge organic weaves, and architectural seam lines.
          </p>
        </div>

        <ProductGrid products={PRODUCTS} />
      </section>

      {/* Saved Wishlist Section */}
      {wishlistProducts.length > 0 && (
        <section id="wishlist" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 border-t border-luxury-border/60">
          <div className="flex items-center space-x-2 mb-8">
            <Heart className="w-5 h-5 fill-black text-black" />
            <h3 className="text-xl font-bold tracking-tight text-luxury-black">
              Your Saved Pieces ({wishlistProducts.length})
            </h3>
          </div>
          <ProductGrid products={wishlistProducts} />
        </section>
      )}

      {/* Editorial Storytelling Section */}
      <EditorialSection />
    </div>
  );
};
