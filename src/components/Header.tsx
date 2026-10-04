import React, { useState } from 'react';
import { ShoppingBag, Menu as MenuIcon, X, Phone, MapPin, Sparkles } from 'lucide-react';
import { RESTAURANT_INFO } from '../data/menuData';

interface HeaderProps {
  cartCount: number;
  cartTotal: number;
  onOpenCart: () => void;
  onOpenDeals: () => void;
  onOpenMenu: () => void;
  onOpenCatering: () => void;
  onOpenLocation: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  cartCount,
  cartTotal,
  onOpenCart,
  onOpenDeals,
  onOpenMenu,
  onOpenCatering,
  onOpenLocation,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (callback: () => void) => {
    callback();
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-neutral-950/90 backdrop-blur-md border-b border-neutral-800 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 sm:h-20 flex items-center justify-between gap-4">
        {/* Zone 1: Brand Wordmark & Logo */}
        <a
          href="#"
          className="flex items-center gap-2.5 sm:gap-3.5 group focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 rounded-xl p-1 transition-all"
          aria-label="Northern Cuisine Home"
        >
          {/* Logo with Animated Ambient Glow Ring */}
          <div className="relative shrink-0">
            <div className="w-11 h-11 sm:w-13 sm:h-13 rounded-full overflow-hidden ring-2 ring-emerald-400/80 shadow-lg shadow-emerald-500/30 bg-white p-0.5 transition-transform duration-300 group-hover:scale-108 animate-gentle-float">
              <img
                src={RESTAURANT_INFO.logo}
                alt="Northern Cuisine Logo"
                className="w-full h-full object-contain"
                referrerPolicy="no-referrer"
              />
            </div>
            {/* Subtle live kitchen pulse dot */}
            <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-500 border-2 border-neutral-950 rounded-full animate-ping" />
            <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-500 border-2 border-neutral-950 rounded-full" />
          </div>

          {/* Ultra-Professional Animated Brand Name */}
          <div className="flex flex-col justify-center animate-gentle-float">
            <div className="flex items-center gap-1.5">
              <span className="font-heading font-black text-lg sm:text-2xl tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-amber-200 to-teal-300 animate-brand-shimmer filter drop-shadow-[0_2px_8px_rgba(16,185,129,0.3)]">
                NORTHERN
              </span>
              <Sparkles className="w-3.5 h-3.5 text-amber-300 animate-spin transition-all hidden sm:inline" style={{ animationDuration: '6s' }} />
            </div>
            <div className="flex items-center gap-1.5 -mt-0.5">
              <span className="font-heading font-black text-xs sm:text-sm tracking-[0.22em] text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-rose-300 to-emerald-300 animate-brand-shimmer">
                CUISINE
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400/80 inline-block animate-pulse" />
              <span className="text-[10px] font-mono text-neutral-400 uppercase tracking-widest hidden xs:inline">
                RESTAURANT
              </span>
            </div>
          </div>
        </a>

        {/* Zone 2: Navigation Links (Clean text, no pill badges) */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-neutral-300">
          <button
            onClick={onOpenDeals}
            className="hover:text-emerald-400 transition-colors cursor-pointer focus:outline-none focus-visible:underline"
          >
            Special Deals
          </button>
          <button
            onClick={onOpenMenu}
            className="hover:text-emerald-400 transition-colors cursor-pointer focus:outline-none focus-visible:underline"
          >
            Full Menu
          </button>
          <button
            onClick={onOpenCatering}
            className="hover:text-emerald-400 transition-colors cursor-pointer focus:outline-none focus-visible:underline"
          >
            Catering & Events
          </button>
          <button
            onClick={onOpenLocation}
            className="hover:text-emerald-400 transition-colors cursor-pointer focus:outline-none focus-visible:underline"
          >
            Location
          </button>
        </nav>

        {/* Zone 3: Actions - WhatsApp icon & Cart Button */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* WhatsApp Icon Button (No visible raw number text clutter as requested) */}
          <a
            href={`https://wa.me/${RESTAURANT_INFO.whatsappInternational}?text=${encodeURIComponent('Salam Northern Cuisine! Mujhe order place krna hai.')}`}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Chat on WhatsApp"
            title="Chat with Northern Cuisine on WhatsApp"
            className="relative flex items-center justify-center w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-emerald-600/15 border border-emerald-500/30 text-emerald-400 hover:bg-emerald-600 hover:text-white transition-all shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
          >
            <svg
              className="w-5 h-5 sm:w-6 sm:h-6 fill-current"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
            </svg>
            <span className="sr-only">Chat on WhatsApp</span>
          </a>

          {/* Cart Trigger Button */}
          <button
            onClick={onOpenCart}
            className="flex items-center gap-2.5 px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-medium text-sm transition-all shadow-md shadow-emerald-950/40 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-emerald-400 active:scale-95"
            aria-label={`Open shopping cart with ${cartCount} items`}
          >
            <div className="relative">
              <ShoppingBag className="w-4 h-4 sm:w-5 sm:h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-600 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center animate-pulse">
                  {cartCount}
                </span>
              )}
            </div>
            <span className="hidden sm:inline-block font-semibold">Cart</span>
            {cartTotal > 0 && (
              <span className="text-xs font-mono tabular-nums text-emerald-100 hidden sm:inline-block border-l border-emerald-400/40 pl-2">
                Rs. {cartTotal.toLocaleString()}
              </span>
            )}
          </button>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-xl text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-neutral-800 bg-neutral-950/95 backdrop-blur-xl px-4 py-4 space-y-3">
          <button
            onClick={() => handleNavClick(onOpenDeals)}
            className="w-full text-left px-3 py-2.5 rounded-lg text-neutral-200 hover:bg-neutral-800 hover:text-emerald-400 text-sm font-medium transition-colors"
          >
            🔥 Special Deals
          </button>
          <button
            onClick={() => handleNavClick(onOpenMenu)}
            className="w-full text-left px-3 py-2.5 rounded-lg text-neutral-200 hover:bg-neutral-800 hover:text-emerald-400 text-sm font-medium transition-colors"
          >
            🍜 Full Chinese Menu
          </button>
          <button
            onClick={() => handleNavClick(onOpenCatering)}
            className="w-full text-left px-3 py-2.5 rounded-lg text-neutral-200 hover:bg-neutral-800 hover:text-emerald-400 text-sm font-medium transition-colors"
          >
            🎉 Catering & Events
          </button>
          <button
            onClick={() => handleNavClick(onOpenLocation)}
            className="w-full text-left px-3 py-2.5 rounded-lg text-neutral-200 hover:bg-neutral-800 hover:text-emerald-400 text-sm font-medium transition-colors"
          >
            📍 Google Maps Location
          </button>

          <div className="pt-3 border-t border-neutral-800/80 flex items-center justify-between text-xs text-neutral-400">
            <span>Direct Order Slip on WhatsApp</span>
            <span className="text-emerald-400 font-medium">Fast Kitchen Service</span>
          </div>
        </div>
      )}
    </header>
  );
};
