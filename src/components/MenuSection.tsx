import React, { useState, useMemo } from 'react';
import {
  Search,
  X,
  Flame,
  Plus,
  Check,
  Utensils,
  LayoutGrid,
  List,
  Sparkles,
} from 'lucide-react';
import { MenuItem } from '../types';
import { CATEGORIES, MENU_ITEMS } from '../data/menuData';

interface MenuSectionProps {
  onAddToCart: (item: MenuItem, variant?: string) => void;
  addedItemId: string | null;
}

// Category theme styling mapping for luxury culinary look
interface CategoryTheme {
  borderAccent: string;
  leftBorder: string;
  bgGradient: string;
  tagColor: string;
  badgeBg: string;
  icon: string;
  accentText: string;
}

const CATEGORY_THEMES: Record<string, CategoryTheme> = {
  starter: {
    borderAccent: 'hover:border-emerald-500/60',
    leftBorder: 'border-l-emerald-500',
    bgGradient: 'from-emerald-950/30 via-neutral-900 to-neutral-950',
    tagColor: 'text-emerald-400',
    badgeBg: 'bg-emerald-500/15 border-emerald-500/30 text-emerald-300',
    icon: '🥟',
    accentText: 'text-emerald-400',
  },
  chicken: {
    borderAccent: 'hover:border-amber-500/60',
    leftBorder: 'border-l-amber-500',
    bgGradient: 'from-amber-950/30 via-neutral-900 to-neutral-950',
    tagColor: 'text-amber-400',
    badgeBg: 'bg-amber-500/15 border-amber-500/30 text-amber-300',
    icon: '🍗',
    accentText: 'text-amber-400',
  },
  gravies: {
    borderAccent: 'hover:border-rose-500/60',
    leftBorder: 'border-l-rose-500',
    bgGradient: 'from-rose-950/30 via-neutral-900 to-neutral-950',
    tagColor: 'text-rose-400',
    badgeBg: 'bg-rose-500/15 border-rose-500/30 text-rose-300',
    icon: '🥘',
    accentText: 'text-rose-400',
  },
  beef: {
    borderAccent: 'hover:border-orange-500/60',
    leftBorder: 'border-l-orange-500',
    bgGradient: 'from-orange-950/30 via-neutral-900 to-neutral-950',
    tagColor: 'text-orange-400',
    badgeBg: 'bg-orange-500/15 border-orange-500/30 text-orange-300',
    icon: '🥩',
    accentText: 'text-orange-400',
  },
  fried_rice: {
    borderAccent: 'hover:border-yellow-500/60',
    leftBorder: 'border-l-yellow-500',
    bgGradient: 'from-yellow-950/30 via-neutral-900 to-neutral-950',
    tagColor: 'text-yellow-400',
    badgeBg: 'bg-yellow-500/15 border-yellow-500/30 text-yellow-300',
    icon: '🍚',
    accentText: 'text-yellow-400',
  },
  noodles: {
    borderAccent: 'hover:border-red-500/60',
    leftBorder: 'border-l-red-500',
    bgGradient: 'from-red-950/30 via-neutral-900 to-neutral-950',
    tagColor: 'text-red-400',
    badgeBg: 'bg-red-500/15 border-red-500/30 text-red-300',
    icon: '🍜',
    accentText: 'text-red-400',
  },
  pasta: {
    borderAccent: 'hover:border-teal-500/60',
    leftBorder: 'border-l-teal-500',
    bgGradient: 'from-teal-950/30 via-neutral-900 to-neutral-950',
    tagColor: 'text-teal-400',
    badgeBg: 'bg-teal-500/15 border-teal-500/30 text-teal-300',
    icon: '🍝',
    accentText: 'text-teal-400',
  },
  deals: {
    borderAccent: 'hover:border-amber-400/70',
    leftBorder: 'border-l-amber-400',
    bgGradient: 'from-amber-950/40 via-neutral-900 to-neutral-950',
    tagColor: 'text-amber-300',
    badgeBg: 'bg-amber-400/20 border-amber-400/40 text-amber-200',
    icon: '🔥',
    accentText: 'text-amber-300',
  },
};

export const MenuSection: React.FC<MenuSectionProps> = ({ onAddToCart, addedItemId }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [onlySpicy, setOnlySpicy] = useState<boolean>(false);
  const [selectedVariants, setSelectedVariants] = useState<Record<string, string>>({});
  // View mode: 'compact' (compact 2-col grid on mobile) vs 'list' (fast horizontal row scanning)
  const [viewMode, setViewMode] = useState<'compact' | 'list'>('compact');

  const handleSelectVariant = (itemId: string, variantName: string) => {
    setSelectedVariants((prev) => ({
      ...prev,
      [itemId]: variantName,
    }));
  };

  const filteredItems = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    return MENU_ITEMS.filter((item) => {
      // If user typed a search query, search globally or within category
      const matchesSearch =
        !query ||
        item.name.toLowerCase().includes(query) ||
        item.description.toLowerCase().includes(query) ||
        item.category.toLowerCase().includes(query) ||
        (item.dealType && item.dealType.toLowerCase().includes(query)) ||
        (item.serving && item.serving.toLowerCase().includes(query));

      // Category matching: If query is active and item matches query, show it, else respect selected category
      let matchesCategory = true;
      if (selectedCategory !== 'all') {
        matchesCategory = item.category === selectedCategory;
      } else if (item.category === 'deals' && !query) {
        // In all items view without search, exclude duplicate deal items if on general tab
        matchesCategory = true;
      }

      const matchesSpicy = onlySpicy ? item.isSpicy : true;

      return matchesCategory && matchesSearch && matchesSpicy;
    });
  }, [selectedCategory, searchQuery, onlySpicy]);

  // Category counts
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { all: 0 };
    MENU_ITEMS.forEach((item) => {
      counts.all = (counts.all || 0) + 1;
      counts[item.category] = (counts[item.category] || 0) + 1;
    });
    return counts;
  }, []);

  return (
    <section id="menu-section" className="py-10 sm:py-16 bg-neutral-950 border-b border-neutral-800/80">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 space-y-6 sm:space-y-8">
        {/* Section Heading with Glowing Badges */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Full Kitchen Menu · Freshly Cooked</span>
            </div>
            <h2 className="font-heading font-extrabold text-2xl sm:text-4xl text-white tracking-tight mt-1.5">
              Northern Authentic Cuisine
            </h2>
            <p className="text-neutral-400 text-xs sm:text-sm mt-1 max-w-xl">
              Real-time search se koi bhi dish foran dhoondein ya categories browse karein.
            </p>
          </div>

          {/* Quick Controls: Spicy Filter & View Mode */}
          <div className="flex items-center gap-2 self-start md:self-auto">
            {/* Spicy Filter Toggle */}
            <button
              onClick={() => setOnlySpicy(!onlySpicy)}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
                onlySpicy
                  ? 'bg-red-950/80 border-red-500 text-red-300 shadow-md shadow-red-950/40'
                  : 'bg-neutral-900 border-neutral-800 text-neutral-400 hover:text-white'
              }`}
            >
              <Flame className={`w-3.5 h-3.5 ${onlySpicy ? 'text-red-400 fill-current' : 'text-neutral-500'}`} />
              <span>Spicy Dishes</span>
            </button>

            {/* View Mode Toggle (Compact Grid vs Fast List) */}
            <div className="flex items-center bg-neutral-900 border border-neutral-800 rounded-xl p-0.5">
              <button
                onClick={() => setViewMode('compact')}
                className={`p-1.5 sm:px-2.5 sm:py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1 transition-all cursor-pointer ${
                  viewMode === 'compact'
                    ? 'bg-emerald-600 text-white shadow-sm'
                    : 'text-neutral-400 hover:text-white'
                }`}
                title="Compact Grid View (2 per row on phone)"
              >
                <LayoutGrid className="w-4 h-4" />
                <span className="hidden sm:inline">Grid</span>
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-1.5 sm:px-2.5 sm:py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1 transition-all cursor-pointer ${
                  viewMode === 'list'
                    ? 'bg-emerald-600 text-white shadow-sm'
                    : 'text-neutral-400 hover:text-white'
                }`}
                title="Fast List View (Ultra fast scanning)"
              >
                <List className="w-4 h-4" />
                <span className="hidden sm:inline">Fast List</span>
              </button>
            </div>
          </div>
        </div>

        {/* Dedicated Real-Time Search Bar with Suggestion Pills */}
        <div className="relative w-full max-w-4xl mx-auto space-y-2.5 bg-neutral-900/60 p-3.5 sm:p-4 rounded-2xl border border-neutral-800 shadow-xl shadow-black/40">
          <div className="relative flex items-center">
            <div className="absolute left-3.5 sm:left-4 pointer-events-none flex items-center justify-center">
              <Search className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-400" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search dishes by name or category (e.g. Chowmein, Manchurian, Beef, Soup, Deals)..."
              className="w-full pl-10 sm:pl-12 pr-10 py-3 bg-neutral-950 border border-neutral-700/80 hover:border-emerald-500/50 focus:border-emerald-500 rounded-xl text-xs sm:text-sm text-white placeholder-neutral-500 shadow-inner focus:outline-none focus:ring-2 focus:ring-emerald-500/30 transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 p-1 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors cursor-pointer"
                title="Clear search"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Quick Search Tag Suggestions */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none text-xs">
            <span className="text-neutral-500 font-medium whitespace-nowrap text-[10px] sm:text-[11px] shrink-0 mr-1">
              Popular Searches:
            </span>
            {[
              { label: '🔥 Deals', query: 'deal' },
              { label: '🍜 Chowmein', query: 'chowmein' },
              { label: '🍗 Manchurian', query: 'manchurian' },
              { label: '🥩 Beef Chilli', query: 'beef' },
              { label: '🥟 Dumplings', query: 'dumplings' },
              { label: '🍲 Soup', query: 'soup' },
              { label: '🍝 Pasta', query: 'pasta' },
              { label: '🍚 Fried Rice', query: 'rice' },
            ].map((pill) => (
              <button
                key={pill.label}
                type="button"
                onClick={() => {
                  setSearchQuery(pill.query);
                  setSelectedCategory('all');
                }}
                className={`px-2.5 py-1 rounded-lg border text-[11px] font-semibold transition-all whitespace-nowrap cursor-pointer shrink-0 ${
                  searchQuery.toLowerCase() === pill.query.toLowerCase()
                    ? 'bg-emerald-600 text-white border-emerald-400 shadow-sm'
                    : 'bg-neutral-900 border-neutral-800 hover:border-emerald-500/40 text-neutral-300 hover:text-emerald-300'
                }`}
              >
                {pill.label}
              </button>
            ))}
          </div>

          {/* Search Result Feedback */}
          {searchQuery.trim() && (
            <div className="flex items-center justify-between text-xs text-neutral-400 pt-1 border-t border-neutral-800/80 px-1">
              <span>
                Found <strong className="text-emerald-400 font-mono font-bold">{filteredItems.length}</strong> dish{filteredItems.length === 1 ? '' : 'es'} matching "<span className="text-white">{searchQuery}</span>"
              </span>
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="text-emerald-400 hover:underline cursor-pointer text-[11px]"
              >
                Reset Search
              </button>
            </div>
          )}
        </div>

        {/* Sticky/Scrollable Category Tabs with Vibrant Colors and Badges */}
        <div className="sticky top-18 sm:top-20 z-20 -mx-3 sm:-mx-6 px-3 sm:px-6 py-2.5 bg-neutral-950/95 backdrop-blur-md border-y border-neutral-800/80 overflow-x-auto scrollbar-none">
          <div className="flex items-center gap-1.5 sm:gap-2 min-w-max">
            {CATEGORIES.map((cat) => {
              const isActive = selectedCategory === cat.id;
              const count = categoryCounts[cat.id] || 0;
              const theme = CATEGORY_THEMES[cat.id];

              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 sm:px-4 sm:py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer whitespace-nowrap border ${
                    isActive
                      ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white border-emerald-400 shadow-md shadow-emerald-950/60 scale-102'
                      : 'bg-neutral-900/90 text-neutral-300 border-neutral-800 hover:border-neutral-700 hover:text-white hover:bg-neutral-805'
                  }`}
                >
                  {theme?.icon && <span>{theme.icon}</span>}
                  <span>{cat.label}</span>
                  <span
                    className={`text-[10px] font-mono px-1.5 py-0.2 rounded-full ${
                      isActive ? 'bg-white/25 text-white' : 'bg-neutral-800 text-neutral-400'
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Content Display: FAST LIST or COMPACT 2-COL GRID */}
        {filteredItems.length === 0 ? (
          <div className="py-16 text-center rounded-2xl bg-neutral-900/40 border border-neutral-800 space-y-3">
            <Utensils className="w-8 h-8 text-neutral-500 mx-auto" />
            <p className="text-neutral-300 font-medium">Koi dish match nahi hui.</p>
            <button
              onClick={() => {
                setSearchQuery('');
                setOnlySpicy(false);
                setSelectedCategory('all');
              }}
              className="text-xs text-emerald-400 hover:underline cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        ) : viewMode === 'list' ? (
          /* FAST LIST VIEW (Zero scrolling fatigue, scans 40 items in seconds!) */
          <div className="space-y-2">
            {filteredItems.map((item) => {
              const theme = CATEGORY_THEMES[item.category] || CATEGORY_THEMES.chicken;
              const hasVariants = item.variants && item.variants.length > 0;
              const selectedVariantName =
                selectedVariants[item.id] || (hasVariants ? item.variants![0].name : undefined);
              const activePrice = hasVariants
                ? item.variants!.find((v) => v.name === selectedVariantName)?.price || item.price
                : item.price;
              const isJustAdded = addedItemId === (hasVariants ? `${item.id}-${selectedVariantName}` : item.id);

              return (
                <div
                  key={item.id}
                  className={`rounded-xl bg-gradient-to-r ${theme.bgGradient} border border-neutral-800 ${theme.borderAccent} border-l-4 ${theme.leftBorder} p-2.5 sm:p-4 flex items-center justify-between gap-3 transition-all duration-150 hover:shadow-md hover:shadow-black/50`}
                >
                  {/* Left: Food thumbnail photo & info */}
                  <div className="flex items-center gap-3 flex-1 min-w-0 pr-1">
                    {item.image && (
                      <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl overflow-hidden bg-neutral-950 border border-neutral-800 shrink-0">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                    )}

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <h3 className="font-heading font-bold text-xs sm:text-base text-white truncate">
                          {item.name}
                        </h3>
                        {item.isSpicy && (
                          <span className="text-[10px] text-red-400 font-medium flex items-center gap-0.5 bg-red-950/60 border border-red-800/40 px-1.5 py-0.5 rounded">
                            <Flame className="w-2.5 h-2.5 fill-current" /> Spicy
                          </span>
                        )}
                      </div>
                      <p className="text-[11px] sm:text-xs text-neutral-400 truncate mt-0.5">
                        {item.description}
                      </p>

                      {/* Soup variant selector in list */}
                      {hasVariants && (
                        <div className="flex items-center gap-1.5 mt-1.5">
                          {item.variants!.map((v) => (
                            <button
                              key={v.name}
                              type="button"
                              onClick={() => handleSelectVariant(item.id, v.name)}
                              className={`px-2 py-0.5 rounded text-[10px] sm:text-[11px] font-medium border cursor-pointer ${
                                selectedVariantName === v.name
                                  ? 'bg-emerald-950/80 border-emerald-500 text-emerald-300'
                                  : 'bg-neutral-900 border-neutral-800 text-neutral-400'
                              }`}
                            >
                              {v.name}: Rs. {v.price}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Right Price & Add Button */}
                  <div className="flex items-center gap-2 sm:gap-3 shrink-0">
                    <div className="text-right">
                      <span className="text-[9px] text-neutral-400 block uppercase font-mono">Price</span>
                      <span className="font-mono font-bold text-xs sm:text-base text-emerald-400 tabular-nums">
                        Rs. {activePrice}/-
                      </span>
                    </div>

                    <button
                      onClick={() => onAddToCart(item, selectedVariantName)}
                      className={`flex items-center gap-1 px-2.5 py-1.5 sm:px-3 sm:py-2 rounded-xl text-xs font-bold transition-all cursor-pointer active:scale-92 ${
                        isJustAdded
                          ? 'bg-emerald-500 text-white'
                          : 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-md shadow-emerald-950/50'
                      }`}
                      aria-label={`Add ${item.name} to cart`}
                    >
                      {isJustAdded ? (
                        <>
                          <Check className="w-3.5 h-3.5" />
                          <span className="hidden sm:inline">Added!</span>
                        </>
                      ) : (
                        <>
                          <Plus className="w-3.5 h-3.5" />
                          <span>Add</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          /* COMPACT 2-COLUMN GRID (Fast scanning on mobile, fits 4-6 items on screen!) */
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-2.5 sm:gap-4">
            {filteredItems.map((item) => {
              const theme = CATEGORY_THEMES[item.category] || CATEGORY_THEMES.chicken;
              const hasVariants = item.variants && item.variants.length > 0;
              const selectedVariantName =
                selectedVariants[item.id] || (hasVariants ? item.variants![0].name : undefined);
              const activePrice = hasVariants
                ? item.variants!.find((v) => v.name === selectedVariantName)?.price || item.price
                : item.price;
              const isJustAdded = addedItemId === (hasVariants ? `${item.id}-${selectedVariantName}` : item.id);

              return (
                <div
                  key={item.id}
                  className={`rounded-2xl bg-gradient-to-b ${theme.bgGradient} border border-neutral-800/90 ${theme.borderAccent} border-t-2 ${theme.leftBorder.replace('border-l', 'border-t')} p-2.5 sm:p-4 flex flex-col justify-between transition-all duration-200 hover:-translate-y-0.5 shadow-md shadow-black/40 space-y-2 group`}
                >
                  <div className="space-y-2">
                    {/* Dish / Deal Photo (As requested by user!) */}
                    {item.image && (
                      <div className="relative w-full aspect-16/10 rounded-xl overflow-hidden bg-neutral-950 border border-neutral-800/90 shrink-0">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                          referrerPolicy="no-referrer"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/80 via-transparent to-black/20" />

                        {/* Top Category Badge */}
                        <div className="absolute top-1.5 left-1.5 bg-neutral-950/85 backdrop-blur-md px-1.5 py-0.5 rounded-md text-[9px] sm:text-[10px] font-semibold border border-neutral-700/80 text-white flex items-center gap-1 shadow">
                          <span>{theme.icon}</span>
                          <span className="truncate max-w-[65px] sm:max-w-none">{item.category.replace('_', ' ')}</span>
                        </div>

                        {item.isSpicy && (
                          <div className="absolute top-1.5 right-1.5 bg-red-950/90 text-red-300 text-[9px] sm:text-[10px] px-1.5 py-0.5 rounded-md border border-red-700 font-bold flex items-center shadow">
                            <Flame className="w-2.5 h-2.5 fill-current text-red-500 mr-0.5" />
                            <span>Spicy</span>
                          </div>
                        )}
                      </div>
                    )}

                    {/* Dish Name */}
                    <h3 className="font-heading font-bold text-xs sm:text-base text-white line-clamp-2 leading-snug">
                      {item.name}
                    </h3>

                    {/* Short Description */}
                    <p className="text-[11px] sm:text-xs text-neutral-300 line-clamp-2 leading-relaxed">
                      {item.description}
                    </p>
                  </div>

                  {/* Serving Variant Selector if item has sizes */}
                  {hasVariants && (
                    <div className="pt-1 border-t border-neutral-800/80 space-y-1">
                      <div className="grid grid-cols-2 gap-1">
                        {item.variants!.map((v) => (
                          <button
                            key={v.name}
                            type="button"
                            onClick={() => handleSelectVariant(item.id, v.name)}
                            className={`p-1 rounded text-[10px] font-semibold text-center border cursor-pointer truncate ${
                              selectedVariantName === v.name
                                ? 'bg-emerald-950/90 border-emerald-400 text-emerald-300'
                                : 'bg-neutral-900 border-neutral-800 text-neutral-400'
                            }`}
                          >
                            <div className="truncate">{v.name.replace(' Serving', '')}</div>
                            <div className="font-mono text-[9px]">Rs. {v.price}</div>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Price & Add to Cart footer */}
                  <div className="pt-2 border-t border-neutral-800/80 flex items-center justify-between gap-1.5">
                    <div>
                      <span className="text-[9px] text-neutral-400 uppercase tracking-wider block font-mono">
                        Price
                      </span>
                      <span className="font-mono font-bold text-xs sm:text-base text-emerald-400 tabular-nums">
                        Rs. {activePrice}/-
                      </span>
                    </div>

                    <button
                      onClick={() => onAddToCart(item, selectedVariantName)}
                      className={`flex items-center justify-center gap-1 px-2.5 py-1.5 sm:px-3 sm:py-2 rounded-xl text-xs font-bold transition-all cursor-pointer active:scale-90 ${
                        isJustAdded
                          ? 'bg-emerald-500 text-white'
                          : 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-md shadow-emerald-950/60'
                      }`}
                      aria-label={`Add ${item.name} to cart`}
                    >
                      {isJustAdded ? (
                        <>
                          <Check className="w-3 h-3" />
                          <span className="text-[11px]">Done</span>
                        </>
                      ) : (
                        <>
                          <Plus className="w-3.5 h-3.5" />
                          <span className="text-[11px]">Add</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};
