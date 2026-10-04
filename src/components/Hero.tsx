import React from 'react';
import { Sparkles, UtensilsCrossed, ShieldCheck, Clock, ArrowRight, Bike } from 'lucide-react';
import { RESTAURANT_INFO } from '../data/menuData';

interface HeroProps {
  onOrderNow: () => void;
  onExploreDeals: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOrderNow, onExploreDeals }) => {
  return (
    <section className="relative overflow-hidden pt-6 pb-12 sm:pt-10 sm:pb-16 lg:py-20 border-b border-neutral-800/80 bg-gradient-to-b from-neutral-900/60 via-neutral-950 to-neutral-950">
      {/* Background subtle radial glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-emerald-950/20 blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Headlines & Actions */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            {/* Top kicker */}
            <div className="inline-flex items-center gap-2 text-xs sm:text-sm font-medium text-emerald-400 bg-emerald-950/40 border border-emerald-800/50 px-3.5 py-1.5 rounded-full">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Make Your Choice Worth · Make Your Choice Reasonable</span>
            </div>

            {/* Main Display Headline */}
            <h1 className="font-heading font-extrabold text-3xl sm:text-5xl lg:text-6xl text-white tracking-tight leading-[1.1] text-balance">
              Savor The Best <br className="hidden sm:inline" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-amber-200">
                Hygienic Chinese
              </span>{' '}
              Cuisine
            </h1>

            {/* Sub-prose */}
            <p className="text-neutral-300 text-sm sm:text-base lg:text-lg max-w-2xl mx-auto lg:mx-0 leading-relaxed font-normal">
              Order your favorite chicken chowmein, sizzling gravies, beef platters, and couple deals online. Instant computerized receipt slip is generated and sent directly to WhatsApp for rapid order confirmation and hot delivery.
            </p>

            {/* Primary Action Buttons */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 sm:gap-4 pt-2">
              <button
                onClick={onOrderNow}
                className="flex items-center gap-2 px-6 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-sm sm:text-base transition-all duration-200 shadow-lg shadow-emerald-950/50 active:scale-95 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
              >
                <span>Order Now Online</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onExploreDeals}
                className="flex items-center gap-2 px-5 py-3.5 rounded-xl bg-neutral-800/90 hover:bg-neutral-800 text-neutral-200 hover:text-white font-medium text-sm sm:text-base border border-neutral-700/60 transition-all duration-200 active:scale-95 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
              >
                <UtensilsCrossed className="w-4 h-4 text-emerald-400" />
                <span>View Special Deals</span>
              </button>
            </div>

            {/* Trust and Key Info Strip */}
            <div className="pt-4 grid grid-cols-2 sm:grid-cols-4 gap-3 border-t border-neutral-800/80 text-left">
              <div className="flex items-center gap-2.5">
                <Bike className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-400 shrink-0" />
                <div className="text-xs">
                  <p className="font-semibold text-neutral-200">Standard DC</p>
                  <p className="text-neutral-400 font-mono tabular-nums">Rs. 100/- Only</p>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <ShieldCheck className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-400 shrink-0" />
                <div className="text-xs">
                  <p className="font-semibold text-neutral-200">100% Hygienic</p>
                  <p className="text-neutral-400">Fresh Preparation</p>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-400 shrink-0" />
                <div className="text-xs">
                  <p className="font-semibold text-neutral-200">Instant Slip</p>
                  <p className="text-neutral-400">Direct WhatsApp</p>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <UtensilsCrossed className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-400 shrink-0" />
                <div className="text-xs">
                  <p className="font-semibold text-neutral-200">Event Catering</p>
                  <p className="text-neutral-400">Outdoor & Hall</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Showcase Card */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl overflow-hidden border border-neutral-800 bg-neutral-900 shadow-2xl shadow-black/80 aspect-4/3 sm:aspect-16/10 lg:aspect-4/3 group">
              <img
                src={RESTAURANT_INFO.heroImage}
                alt="Northern Cuisine banquet feast"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/90 via-neutral-950/20 to-transparent" />

              {/* Float badge at bottom */}
              <div className="absolute bottom-4 left-4 right-4 p-3 sm:p-4 rounded-xl bg-neutral-950/80 backdrop-blur-md border border-neutral-800 flex items-center justify-between">
                <div>
                  <p className="text-xs text-emerald-400 font-medium">Chef's Signature</p>
                  <p className="text-sm sm:text-base font-bold text-white">Chowmein, Manchurian & Rice</p>
                </div>
                <div className="text-right">
                  <span className="text-xs text-neutral-400">Couple Deals From</span>
                  <p className="text-sm sm:text-base font-bold font-mono text-emerald-300">Rs. 1,070/-</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
