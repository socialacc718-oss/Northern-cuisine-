import React from 'react';
import { Plus, Check, Flame, Users, Sparkles } from 'lucide-react';
import { MenuItem } from '../types';
import { MENU_ITEMS } from '../data/menuData';

interface DealsSectionProps {
  onAddToCart: (item: MenuItem, variant?: string) => void;
  addedItemId: string | null;
}

export const DealsSection: React.FC<DealsSectionProps> = ({ onAddToCart, addedItemId }) => {
  const coupleDeals = MENU_ITEMS.filter((item) => item.category === 'deals' && item.dealType === 'couple');
  const familyDeals = MENU_ITEMS.filter((item) => item.category === 'deals' && item.dealType === 'family');

  return (
    <section id="deals-section" className="py-12 sm:py-16 bg-neutral-950 border-b border-neutral-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-emerald-400 bg-emerald-950/50 border border-emerald-800/60 px-3 py-1 rounded-full">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Value Packed Specials</span>
          </div>
          <h2 className="font-heading font-extrabold text-2xl sm:text-4xl text-white tracking-tight">
            Special Deals & Feasts
          </h2>
          <p className="text-neutral-400 text-sm sm:text-base">
            Handcrafted combo meals with authentic Chinese gravies, seasoned chowmein noodles, fragrant rice, and chilled drinks.
          </p>
        </div>

        {/* 1. Couple Deals Showcase (Picture Highlight Cards) */}
        <div className="space-y-6">
          <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
            <div className="flex items-center gap-2.5">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
              <h3 className="font-heading font-bold text-xl sm:text-2xl text-white">
                Couple Deals
              </h3>
            </div>
            <span className="text-xs sm:text-sm text-neutral-400 font-mono">
              Flat Rs. 1,070/- Each
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {coupleDeals.map((deal) => {
              const isJustAdded = addedItemId === deal.id;
              return (
                <div
                  key={deal.id}
                  className="group rounded-2xl bg-gradient-to-b from-amber-950/20 via-neutral-900 to-neutral-950 border border-amber-500/30 hover:border-amber-400 transition-all duration-300 flex flex-col overflow-hidden shadow-xl shadow-black/60 hover:-translate-y-1"
                >
                  {/* Deal Image Slot */}
                  <div className="relative aspect-16/10 bg-neutral-950 overflow-hidden">
                    <img
                      src={deal.image}
                      alt={deal.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 via-transparent to-black/30" />

                    {/* Price Badge */}
                    <div className="absolute top-3 left-3 bg-gradient-to-r from-red-600 to-rose-600 text-white font-heading font-extrabold text-xs px-3 py-1 rounded-lg shadow-lg border border-red-400/40">
                      Rs. {deal.price}/-
                    </div>

                    {deal.isSpicy && (
                      <div className="absolute top-3 right-3 bg-neutral-950/80 backdrop-blur-md text-amber-300 text-xs px-2.5 py-1 rounded-lg flex items-center gap-1 border border-amber-500/40 font-semibold shadow">
                        <Flame className="w-3.5 h-3.5 text-red-400 fill-current" />
                        <span>Spicy</span>
                      </div>
                    )}
                  </div>

                  {/* Deal Content */}
                  <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-3">
                    <div className="space-y-1.5">
                      <div className="flex items-start justify-between gap-2">
                        <h4 className="font-heading font-bold text-base sm:text-lg text-white group-hover:text-amber-300 transition-colors">
                          {deal.name}
                        </h4>
                        <span className="text-xs text-amber-400/90 whitespace-nowrap flex items-center gap-1 font-medium bg-amber-950/50 border border-amber-800/40 px-2 py-0.5 rounded-md">
                          <Users className="w-3.5 h-3.5 text-amber-400" />
                          <span>2 Persons</span>
                        </span>
                      </div>
                      <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed line-clamp-2">
                        {deal.description}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-neutral-800/80 flex items-center justify-between">
                      <div className="flex flex-col">
                        <span className="text-[10px] text-neutral-400 uppercase font-mono">Deal Price</span>
                        <span className="font-mono font-bold text-base sm:text-xl text-emerald-400">
                          Rs. {deal.price.toLocaleString()}/-
                        </span>
                      </div>

                      <button
                        onClick={() => onAddToCart(deal)}
                        className={`flex items-center gap-1.5 px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all duration-200 cursor-pointer active:scale-95 ${
                          isJustAdded
                            ? 'bg-emerald-500 text-white shadow-emerald-500/40'
                            : 'bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white shadow-lg shadow-emerald-950/50'
                        }`}
                      >
                        {isJustAdded ? (
                          <>
                            <Check className="w-4 h-4" />
                            <span>Added!</span>
                          </>
                        ) : (
                          <>
                            <Plus className="w-4 h-4" />
                            <span>Add Deal</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* 2. Family Deals Showcase */}
        <div className="space-y-6 pt-6">
          <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
            <div className="flex items-center gap-2.5">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
              <h3 className="font-heading font-bold text-xl sm:text-2xl text-white">
                Family Deals
              </h3>
            </div>
            <span className="text-xs sm:text-sm text-neutral-400 font-mono">
              Flat Rs. 1,500/- (Serves 3-4)
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {familyDeals.map((deal) => {
              const isJustAdded = addedItemId === deal.id;
              return (
                <div
                  key={deal.id}
                  className="rounded-2xl bg-gradient-to-b from-amber-950/25 via-neutral-900 to-neutral-950 border border-amber-500/40 p-4 sm:p-5 hover:border-amber-400 transition-all flex flex-col justify-between space-y-3 hover:-translate-y-1 shadow-lg shadow-black/50"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-amber-300 bg-amber-950/70 border border-amber-600/50 px-2.5 py-0.5 rounded-lg shadow-sm">
                        👑 Family Feast
                      </span>
                      <span className="text-xs text-amber-400 font-mono flex items-center gap-1">
                        <Users className="w-3.5 h-3.5 text-amber-400" />
                        <span>3-4 Persons</span>
                      </span>
                    </div>

                    <h4 className="font-heading font-bold text-base sm:text-lg text-white">
                      {deal.name}
                    </h4>

                    <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
                      {deal.description}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-neutral-800/80 flex items-center justify-between">
                    <div className="flex flex-col">
                      <span className="text-[10px] text-neutral-400 uppercase font-mono">Total Price</span>
                      <span className="font-mono font-bold text-base sm:text-xl text-amber-400">
                        Rs. {deal.price.toLocaleString()}/-
                      </span>
                    </div>

                    <button
                      onClick={() => onAddToCart(deal)}
                      className={`flex items-center gap-1.5 px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all duration-200 cursor-pointer active:scale-95 ${
                        isJustAdded
                          ? 'bg-amber-400 text-neutral-950 font-extrabold shadow-amber-500/40'
                          : 'bg-amber-500/20 hover:bg-amber-500 text-amber-300 hover:text-neutral-950 border border-amber-500/50 shadow-md'
                      }`}
                    >
                      {isJustAdded ? (
                        <>
                          <Check className="w-4 h-4" />
                          <span>Added!</span>
                        </>
                      ) : (
                        <>
                          <Plus className="w-4 h-4" />
                          <span>Add Deal</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
