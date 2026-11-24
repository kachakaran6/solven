import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { Header } from './components/layout/Header';
import { MobileNavigation } from './components/layout/MobileNavigation';
import { Footer } from './components/layout/Footer';
import { ProductQuickModal } from './components/product/ProductQuickModal';
import { CartDrawer } from './components/cart/CartDrawer';
import { SearchOverlay } from './components/search/SearchOverlay';

import { Home } from './pages/Home';
import { ProductPage } from './pages/ProductPage';
import { CheckoutPage } from './pages/CheckoutPage';
import { LookbookPage } from './pages/LookbookPage';

// Scroll to top on route change
function ScrollToTop() {
  const { pathname } = useLocation();

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

export function App() {
  return (
    <CartProvider>
      <Router>
        <ScrollToTop />
        <div className="flex flex-col min-h-screen w-full overflow-x-hidden bg-white text-luxury-black font-sans selection:bg-black selection:text-white">
          
          {/* Universal Header */}
          <Header />

          {/* Main Routing Stage */}
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/product/:id" element={<ProductPage />} />
              <Route path="/checkout" element={<CheckoutPage />} />
              <Route path="/lookbook" element={<LookbookPage />} />
              <Route path="*" element={<Home />} />
            </Routes>
          </main>

          {/* Global Modals & Drawers */}
          <ProductQuickModal />
          <CartDrawer />
          <SearchOverlay />

          {/* Floating Mobile Bottom Navigation */}
          <MobileNavigation />

          {/* Universal Footer */}
          <Footer />

        </div>
      </Router>
    </CartProvider>
  );
}

export default App;
