import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { DealsSection } from './components/DealsSection';
import { MenuSection } from './components/MenuSection';
import { ServicesSection } from './components/ServicesSection';
import { Footer } from './components/Footer';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { OrderSlipModal } from './components/OrderSlipModal';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { MenuItem, CartItem, OrderSlipData } from './types';
import { ShoppingBag, ArrowRight } from 'lucide-react';

const CART_STORAGE_KEY = 'northern_cuisine_cart_v1';
const RECENT_SLIP_STORAGE_KEY = 'northern_cuisine_last_slip_v1';

export default function App() {
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem(CART_STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [orderType, setOrderType] = useState<'delivery' | 'takeaway'>('delivery');
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [activeSlip, setActiveSlip] = useState<OrderSlipData | null>(null);
  const [addedItemId, setAddedItemId] = useState<string | null>(null);

  // Sync cart to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems));
    } catch (e) {
      console.error('Failed to save cart:', e);
    }
  }, [cartItems]);

  // Load last slip if available in session
  useEffect(() => {
    try {
      const lastSlip = localStorage.getItem(RECENT_SLIP_STORAGE_KEY);
      if (lastSlip) {
        // Can be reopened if needed
      }
    } catch {}
  }, []);

  const totalCartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const handleAddToCart = (item: MenuItem, variantName?: string) => {
    const lineId = variantName ? `${item.id}-${variantName}` : item.id;
    const finalPrice = variantName && item.variants
      ? item.variants.find((v) => v.name === variantName)?.price || item.price
      : item.price;

    setCartItems((prev) => {
      const existing = prev.find((i) => i.id === lineId);
      if (existing) {
        return prev.map((i) =>
          i.id === lineId ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [
        ...prev,
        {
          id: lineId,
          menuItemId: item.id,
          name: item.name,
          price: finalPrice,
          quantity: 1,
          selectedVariant: variantName,
          category: item.category,
          image: item.image,
        },
      ];
    });

    // Visual button feedback
    setAddedItemId(lineId);
    setTimeout(() => {
      setAddedItemId(null);
    }, 1200);
  };

  const handleUpdateQuantity = (lineId: string, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((item) => {
          if (item.id === lineId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter((i): i is CartItem => i !== null)
    );
  };

  const handleRemoveItem = (lineId: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== lineId));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  const handleProceedToCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  const handleOrderGenerated = (slip: OrderSlipData) => {
    setIsCheckoutOpen(false);
    setActiveSlip(slip);
    // Clear cart once order is confirmed and slip generated
    setCartItems([]);
    try {
      localStorage.setItem(RECENT_SLIP_STORAGE_KEY, JSON.stringify(slip));
    } catch {}
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 flex flex-col font-sans selection:bg-emerald-600 selection:text-white">
      {/* Header */}
      <Header
        cartCount={totalCartCount}
        cartTotal={subtotal}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenDeals={() => scrollToSection('deals-section')}
        onOpenMenu={() => scrollToSection('menu-section')}
        onOpenCatering={() => scrollToSection('catering-section')}
        onOpenLocation={() => scrollToSection('location-section')}
      />

      {/* Main Content */}
      <main className="flex-1">
        <Hero
          onOrderNow={() => scrollToSection('menu-section')}
          onExploreDeals={() => scrollToSection('deals-section')}
        />

        <DealsSection
          onAddToCart={handleAddToCart}
          addedItemId={addedItemId}
        />

        <MenuSection
          onAddToCart={handleAddToCart}
          addedItemId={addedItemId}
        />

        <ServicesSection />
      </main>

      {/* Footer */}
      <Footer />

      {/* Floating WhatsApp Contact Button */}
      <FloatingWhatsApp />

      {/* Mobile Sticky Cart Bar (appears when items are present, <=10% viewport) */}
      {totalCartCount > 0 && !isCartOpen && !isCheckoutOpen && !activeSlip && (
        <div className="fixed bottom-0 inset-x-0 z-30 sm:hidden p-3 bg-neutral-950/95 backdrop-blur-md border-t border-neutral-800">
          <button
            onClick={() => setIsCartOpen(true)}
            className="w-full py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm flex items-center justify-between shadow-lg shadow-emerald-950/60 active:scale-98 transition-all cursor-pointer"
          >
            <div className="flex items-center gap-2">
              <div className="relative">
                <ShoppingBag className="w-5 h-5" />
                <span className="absolute -top-2 -right-2 bg-red-600 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-mono">
                  {totalCartCount}
                </span>
              </div>
              <span className="font-mono text-emerald-100 tabular-nums">
                Rs. {subtotal.toLocaleString()}/-
              </span>
            </div>

            <div className="flex items-center gap-1 text-xs">
              <span>View Cart & Order Slip</span>
              <ArrowRight className="w-4 h-4" />
            </div>
          </button>
        </div>
      )}

      {/* Cart Slide-over Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
        onProceedToCheckout={handleProceedToCheckout}
        orderType={orderType}
        setOrderType={setOrderType}
      />

      {/* Customer Info & Checkout Modal */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        items={cartItems}
        orderType={orderType}
        onOrderGenerated={handleOrderGenerated}
      />

      {/* Order Slip & WhatsApp Dispatch Modal */}
      <OrderSlipModal
        slip={activeSlip}
        onClose={() => setActiveSlip(null)}
        onNewOrder={() => {
          setActiveSlip(null);
          scrollToSection('menu-section');
        }}
      />
    </div>
  );
}
