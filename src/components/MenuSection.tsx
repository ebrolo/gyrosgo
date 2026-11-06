'use client';

import React, { useState, useMemo, useRef, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  ChevronDown,
  Flame,
  Plus,
  Minus,
  Check,
  X,
  ArrowUp,
  ArrowUpDown,
} from 'lucide-react';
import { SiteDictionary, MenuItem, ExtraAddon } from '@/data/siteData';

interface MenuSectionProps {
  dict: SiteDictionary;
  getCartQty: (key: string) => number;
  onAddToCart: (item: {
    id: string;
    name: string;
    variantLabel?: string;
    isCombo?: boolean;
    unitPrice: number;
    unitKcal: number;
    image?: string;
  }) => void;
  onUpdateQty: (key: string, delta: number) => void;
}

type FilterKey = 'smashBeef' | 'cheeseLover' | 'spicy' | 'poultry';
type SortMode = 'name-asc' | 'name-desc' | 'price-asc' | 'price-desc';

const INITIAL_VISIBLE_COUNT = 16;

function FilterIcon({ type }: { type: FilterKey }) {
  switch (type) {
    case 'smashBeef':
      // Crisp Steak / Beef Patty Icon
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.1" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 shrink-0" aria-hidden="true">
          <path d="M5 10c0-3.5 3.4-6 7.5-6 4.4 0 7.5 2.5 7.5 6 0 4.2-3.5 7.5-8.5 7.5-3.8 0-6.5-2.3-6.5-5.5Z" />
          <path d="M5 12v2.5C5 17.8 7.7 20 11.5 20c5 0 8.5-3.1 8.5-7v-3" />
          <circle cx="11" cy="10" r="1.6" />
        </svg>
      );
    case 'cheeseLover':
      // Crisp Swiss Cheese Wedge Icon
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.1" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 shrink-0" aria-hidden="true">
          <path d="M3 12 15 4c3.5 1.5 5.6 4.4 6 8H3Z" />
          <path d="M3 12v6h18v-6" />
          <circle cx="8.5" cy="15" r="1" fill="currentColor" />
          <circle cx="14.5" cy="15.5" r="1.2" fill="currentColor" />
          <circle cx="13" cy="9.5" r="0.9" fill="currentColor" />
        </svg>
      );
    case 'spicy':
      return <Flame className="w-4 h-4 shrink-0" />;
    case 'poultry':
      // Crisp Poultry Drumstick Icon
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.1" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 shrink-0" aria-hidden="true">
          <path d="M15.4 15.63a7.875 6 135 1 1 6.23-6.23 4.5 3.43 135 0 0-6.23 6.23" />
          <path d="m8.29 12.71-2.6 2.6a2.5 2.5 0 1 0 1.65 4.65A2.5 2.5 0 1 0 11.99 18.3l2.6-2.6" />
        </svg>
      );
  }
}

export default function MenuSection({
  dict,
  getCartQty,
  onAddToCart,
  onUpdateQty,
}: MenuSectionProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('ALL');
  const [activeFilters, setActiveFilters] = useState<FilterKey[]>([]);
  const [sortMode, setSortMode] = useState<SortMode>('name-asc');
  const [openCategories, setOpenCategories] = useState<Record<string, boolean>>(() => {
    const map: Record<string, boolean> = {};
    dict.menuSection.categories.forEach((cat) => {
      map[cat.id] = true;
    });
    return map;
  });
  const [expandedCategories, setExpandedCategories] = useState<Record<string, boolean>>({});
  const [comboMap, setComboMap] = useState<Record<string, boolean>>({});
  const [variantMap, setVariantMap] = useState<Record<string, string>>({});
  const [openKcalMap, setOpenKcalMap] = useState<Record<string, boolean>>({});
  const [addedAddonId, setAddedAddonId] = useState<string | null>(null);
  const [showFloatingJump, setShowFloatingJump] = useState(false);

  const sectionRef = useRef<HTMLElement | null>(null);
  const menuAnchorRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const onScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const insideMenu = rect.top < -280 && rect.bottom > 500;
      setShowFloatingJump(insideMenu);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollToMenuTop = useCallback((force = false) => {
    const anchor = menuAnchorRef.current;
    if (!anchor) return;
    const rect = anchor.getBoundingClientRect();
    if (force || rect.top < 50) {
      if (window.__lenis) {
        window.__lenis.scrollTo(anchor, { offset: -74, duration: 0.65 });
      } else {
        const targetY = rect.top + window.scrollY - 74;
        window.scrollTo({ top: Math.max(0, targetY), behavior: 'smooth' });
      }
    }
  }, []);

  const handleSelectCategory = (catId: string) => {
    setActiveCategory(catId);
    if (catId !== 'ALL') {
      setOpenCategories((prev) => ({ ...prev, [catId]: true }));
    }
    scrollToMenuTop(false);
  };

  const toggleFilter = (key: FilterKey) => {
    setActiveFilters((prev) =>
      prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]
    );
    scrollToMenuTop(false);
  };

  const toggleAccordion = (catId: string) => {
    setOpenCategories((prev) => ({
      ...prev,
      [catId]: !prev[catId],
    }));
  };

  const toggleShowMore = (catId: string) => {
    setExpandedCategories((prev) => ({
      ...prev,
      [catId]: !prev[catId],
    }));
  };

  const toggleItemKcal = (itemId: string) => {
    setOpenKcalMap((prev) => ({
      ...prev,
      [itemId]: !prev[itemId],
    }));
  };

  // Strictly sorts INSIDE each category so categories never mix together!
  const filteredCategories = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();

    return dict.menuSection.categories
      .filter((cat) => activeCategory === 'ALL' || cat.id === activeCategory)
      .map((cat) => {
        const matchingItems = cat.items.filter((item) => {
          const matchesQuery =
            !q ||
            item.name.toLowerCase().includes(q) ||
            item.description.toLowerCase().includes(q);

          const matchesFilters = activeFilters.every((fKey) => Boolean(item[fKey]));
          return matchesQuery && matchesFilters;
        });

        const sortedItems = [...matchingItems].sort((a, b) => {
          if (sortMode === 'name-asc') {
            return a.name.localeCompare(b.name, 'hu', { numeric: true });
          }
          if (sortMode === 'name-desc') {
            return b.name.localeCompare(a.name, 'hu', { numeric: true });
          }
          if (sortMode === 'price-asc') {
            return (
              a.numericPrice - b.numericPrice ||
              a.name.localeCompare(b.name, 'hu', { numeric: true })
            );
          }
          return (
            b.numericPrice - a.numericPrice ||
            a.name.localeCompare(b.name, 'hu', { numeric: true })
          );
        });

        return {
          ...cat,
          items: sortedItems,
        };
      })
      .filter((cat) => cat.items.length > 0);
  }, [dict.menuSection.categories, activeCategory, searchQuery, activeFilters, sortMode]);

  const filterChips: { key: FilterKey; label: string }[] = [
    { key: 'smashBeef', label: dict.menuSection.filterLabels.smashBeef },
    { key: 'cheeseLover', label: dict.menuSection.filterLabels.cheeseLover },
    { key: 'spicy', label: dict.menuSection.filterLabels.spicy },
    { key: 'poultry', label: dict.menuSection.filterLabels.poultry },
  ];

  const sortOptions: { mode: SortMode; label: string }[] = [
    { mode: 'name-asc', label: dict.menuSection.sortLabels.nameAsc },
    { mode: 'name-desc', label: dict.menuSection.sortLabels.nameDesc },
    { mode: 'price-asc', label: dict.menuSection.sortLabels.priceAsc },
    { mode: 'price-desc', label: dict.menuSection.sortLabels.priceDesc },
  ];

  const resolveItemCartInfo = (item: MenuItem) => {
    const selectedVarId = variantMap[item.id] || item.variants?.[0]?.id;
    const variantObj = item.variants?.find((v) => v.id === selectedVarId);
    const basePrice = variantObj ? variantObj.price : item.numericPrice;
    const baseKcal = variantObj ? variantObj.kcal : item.kcal;
    const isCombo = Boolean(item.menuUpgradeable && comboMap[item.id]);
    const finalUnitPrice = isCombo ? basePrice + 700 : basePrice;
    const finalUnitKcal = isCombo
      ? baseKcal + dict.menuSection.nutrition.comboBonusKcal
      : baseKcal;
    const key = `${item.id}__${variantObj?.label || 'base'}__${
      isCombo ? 'combo' : 'single'
    }`;
    return {
      selectedVarId,
      variantObj,
      isCombo,
      basePrice,
      finalUnitPrice,
      finalUnitKcal,
      key,
    };
  };

  const handleAddItem = (item: MenuItem) => {
    const { variantObj, isCombo, finalUnitPrice, finalUnitKcal } = resolveItemCartInfo(item);
    onAddToCart({
      id: item.id,
      name: item.name,
      variantLabel: variantObj?.label,
      isCombo,
      unitPrice: finalUnitPrice,
      unitKcal: finalUnitKcal,
      image: item.image,
    });
  };

  const handleAddAddon = (addon: ExtraAddon) => {
    onAddToCart({
      id: addon.id,
      name: addon.name,
      unitPrice: addon.price,
      unitKcal: addon.kcal,
    });
    setAddedAddonId(addon.id);
    setTimeout(() => setAddedAddonId(null), 900);
  };

  const activeTransitionKey = `${activeCategory}__${activeFilters.join(',')}`;

  return (
    <section
      id="menu"
      ref={sectionRef}
      className="relative py-20 sm:py-28 bg-[#0D0F14] overflow-x-clip border-b border-white/10"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Clean Unboxed Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10">
          <div>
            <span className="text-xs font-mono font-bold uppercase tracking-[0.24em] text-[#FF6B00] block mb-2">
              {dict.menuSection.badge}
            </span>
            <h2 className="font-display text-4xl sm:text-6xl font-black uppercase tracking-tight text-white leading-none">
              {dict.menuSection.title}
            </h2>
          </div>

          {/* Unboxed Menu Upgrade Info + Quick Extra Addons */}
          <div className="flex flex-col sm:items-end gap-2.5">
            <div className="inline-flex items-center gap-3 text-sm">
              <span className="font-display text-2xl font-black text-[#FFB800]">
                {dict.menuSection.comboStrip.price}
              </span>
              <span className="text-zinc-300 font-bold uppercase font-display tracking-wide">
                {dict.menuSection.comboStrip.title}
              </span>
              <span className="text-zinc-500 hidden sm:inline">•</span>
              <span className="text-zinc-400 text-xs hidden sm:inline">
                {dict.menuSection.comboStrip.subtitle}
              </span>
            </div>

            {/* Interactive Extra Sauces & Sweet Potato Upgrade Pills */}
            <div className="flex flex-wrap items-center gap-1.5">
              {dict.menuSection.extraAddons.map((addon) => {
                const isAdded = addedAddonId === addon.id;
                return (
                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    key={addon.id}
                    type="button"
                    onClick={() => handleAddAddon(addon)}
                    className={`px-3 py-1 rounded-full text-xs font-mono transition-colors inline-flex items-center gap-1.5 cursor-pointer ${
                      isAdded
                        ? 'bg-emerald-500 text-black font-bold'
                        : 'bg-white/6 hover:bg-[#FF6B00] hover:text-black text-zinc-300'
                    }`}
                  >
                    {isAdded ? (
                      <Check className="w-3 h-3 stroke-[3]" />
                    ) : (
                      <Plus className="w-3 h-3 stroke-[2.8]" />
                    )}
                    <span>{addon.name}</span>
                    <span className="opacity-75">{addon.priceDisplay}</span>
                  </motion.button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Scroll Anchor for Category/Filter Resets */}
        <div ref={menuAnchorRef} className="h-0 w-full" aria-hidden="true" />

        {/* Sticky Filter, Sort & Search Control Bar */}
        <div className="sticky top-[56px] sm:top-[68px] z-30 w-full max-w-full overflow-hidden bg-[#0D0F14]/95 backdrop-blur-xl py-4 border-y border-white/10 mb-12 space-y-3.5">
          <div className="flex flex-col lg:flex-row gap-3 items-stretch lg:items-center justify-between min-w-0">
            {/* Search Input */}
            <div className="relative flex-1 max-w-md min-w-0">
              <Search className="w-4 h-4 text-zinc-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={dict.menuSection.searchPlaceholder}
                className="w-full pl-11 pr-10 py-2.5 rounded-full bg-white/6 border border-white/10 text-sm text-white placeholder:text-zinc-500 focus:outline-none focus:border-[#FF6B00] transition-colors"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  aria-label="Clear search"
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-white cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Right Controls: Hover-Expandable Icon Filters + Within-Category Sort Switcher */}
            <div className="flex flex-wrap items-center justify-between lg:justify-end gap-2.5 min-w-0">
              {/* Hover-Expandable Icon Filter Chips */}
              <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar min-w-0">
                {filterChips.map((chip) => {
                  const active = activeFilters.includes(chip.key);
                  return (
                    <motion.button
                      whileTap={{ scale: 0.94 }}
                      key={chip.key}
                      type="button"
                      onClick={() => toggleFilter(chip.key)}
                      aria-label={chip.label}
                      className={`group/filter h-9 px-2.5 rounded-full text-xs font-bold uppercase tracking-wider whitespace-nowrap shrink-0 transition-all duration-300 inline-flex items-center cursor-pointer ${
                        active
                          ? 'bg-[#FF6B00] text-black shadow-[0_4px_15px_rgba(255,107,0,0.35)]'
                          : 'bg-white/7 text-zinc-300 hover:bg-white/15 hover:text-white'
                      }`}
                    >
                      <FilterIcon type={chip.key} />
                      <span
                        className={`overflow-hidden transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                          active
                            ? 'max-w-[96px] opacity-100 ml-1.5 pr-0.5'
                            : 'max-w-0 opacity-0 group-hover/filter:max-w-[96px] group-hover/filter:opacity-100 group-hover/filter:ml-1.5 group-hover/filter:pr-0.5'
                        }`}
                      >
                        {chip.label}
                      </span>
                    </motion.button>
                  );
                })}
              </div>

              {/* Within-Category Sort Switcher (`A–Z`, `Z–A`, `Ár ↑`, `Ár ↓`) */}
              <div className="flex items-center rounded-full bg-white/6 border border-white/10 p-1 shrink-0">
                <span className="pl-2 pr-1 text-zinc-500 hidden sm:inline-flex items-center">
                  <ArrowUpDown className="w-3.5 h-3.5" />
                </span>
                {sortOptions.map((opt) => {
                  const active = sortMode === opt.mode;
                  return (
                    <button
                      key={opt.mode}
                      type="button"
                      onClick={() => setSortMode(opt.mode)}
                      className={`relative z-10 px-2.5 py-1 rounded-full text-[11px] font-mono font-bold uppercase tracking-wider transition-colors cursor-pointer whitespace-nowrap ${
                        active ? 'text-black' : 'text-zinc-400 hover:text-white'
                      }`}
                    >
                      {active && (
                        <motion.span
                          layoutId="menuSortPill"
                          transition={{ type: 'spring', stiffness: 450, damping: 32 }}
                          className="absolute inset-0 rounded-full bg-[#FFB800] -z-10"
                        />
                      )}
                      {opt.label}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Horizontal Category Pills with Sliding Spring Indicator (`layoutId`) */}
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pt-0.5 min-w-0 max-w-full">
            <button
              type="button"
              onClick={() => handleSelectCategory('ALL')}
              className={`relative z-10 px-4 py-1.5 rounded-full text-xs font-display font-bold uppercase tracking-wider whitespace-nowrap shrink-0 transition-colors cursor-pointer ${
                activeCategory === 'ALL'
                  ? 'text-black'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              {activeCategory === 'ALL' && (
                <motion.span
                  layoutId="activeMenuCatPill"
                  transition={{ type: 'spring', stiffness: 420, damping: 32 }}
                  className="absolute inset-0 rounded-full bg-white -z-10"
                />
              )}
              {dict.menuSection.allCategoriesLabel}
            </button>

            {dict.menuSection.categories.map((cat) => {
              const active = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => handleSelectCategory(cat.id)}
                  className={`relative z-10 px-4 py-1.5 rounded-full text-xs font-display font-bold uppercase tracking-wider whitespace-nowrap shrink-0 transition-colors cursor-pointer ${
                    active ? 'text-black' : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  {active && (
                    <motion.span
                      layoutId="activeMenuCatPill"
                      transition={{ type: 'spring', stiffness: 420, damping: 32 }}
                      className="absolute inset-0 rounded-full bg-[#FFB800] -z-10"
                    />
                  )}
                  {cat.title}
                </button>
              );
            })}
          </div>
        </div>

        {/* Zero-Layout-Shift Menu Catalog Container with Smooth Filter & Sort Transitions */}
        <div className="min-h-[560px]">
          <AnimatePresence mode="wait">
            {filteredCategories.length === 0 ? (
              <motion.div
                key="empty"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.2 }}
                className="py-20 text-center"
              >
                <p className="text-zinc-400 text-lg mb-4">
                  {dict.menuSection.noResultsLabel}
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setSearchQuery('');
                    setActiveCategory('ALL');
                    setActiveFilters([]);
                  }}
                  className="px-6 py-2.5 rounded-full bg-[#FF6B00] text-black font-bold text-xs uppercase tracking-wider cursor-pointer"
                >
                  {dict.menuSection.allCategoriesLabel}
                </button>
              </motion.div>
            ) : (
              <motion.div
                key={activeTransitionKey}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
                className="space-y-14"
              >
                {filteredCategories.map((cat) => {
                  const isOpen = openCategories[cat.id] ?? true;
                  const isExpanded = expandedCategories[cat.id] ?? false;
                  const isFiltering =
                    searchQuery.trim().length > 0 ||
                    activeFilters.length > 0 ||
                    activeCategory !== 'ALL';

                  const visibleItems =
                    isFiltering || isExpanded
                      ? cat.items
                      : cat.items.slice(0, INITIAL_VISIBLE_COUNT);
                  const hasMore = !isFiltering && cat.items.length > INITIAL_VISIBLE_COUNT;

                  return (
                    <div key={cat.id} className="space-y-6">
                      {/* Clean Unboxed Category Header */}
                      <button
                        type="button"
                        onClick={() => toggleAccordion(cat.id)}
                        className="w-full pb-3 border-b border-white/15 flex items-baseline justify-between text-left group cursor-pointer"
                      >
                        <div className="flex flex-wrap items-baseline gap-3 sm:gap-4">
                          <h3 className="font-display text-2xl sm:text-4xl font-black uppercase tracking-tight text-white group-hover:text-[#FFB800] transition-colors">
                            {cat.title}
                          </h3>
                          <span className="text-xs font-mono uppercase tracking-widest text-zinc-500">
                            {cat.subtitle}
                          </span>
                        </div>
                        <div className="flex items-center gap-3 shrink-0">
                          <span className="text-xs font-mono text-zinc-500">
                            {cat.items.length} {dict.menuSection.itemsCountLabel}
                          </span>
                          <ChevronDown
                            className={`w-5 h-5 text-zinc-400 transition-transform duration-300 ${
                              isOpen ? 'rotate-180 text-[#FFB800]' : ''
                            }`}
                          />
                        </div>
                      </button>

                      {/* Animated Category Grid */}
                      <AnimatePresence initial={false}>
                        {isOpen && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                            className="overflow-hidden"
                          >
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-10 pt-1">
                              {visibleItems.map((item) => {
                                const {
                                  selectedVarId,
                                  variantObj,
                                  isCombo,
                                  basePrice,
                                  finalUnitKcal,
                                  key: cartKey,
                                } = resolveItemCartInfo(item);

                                const displayPrice = isCombo
                                  ? `${(basePrice + 700).toLocaleString('hu-HU')} Ft`
                                  : variantObj
                                  ? variantObj.priceDisplay
                                  : item.price;

                                const qty = getCartQty(cartKey);
                                const isKcalOpen = Boolean(openKcalMap[item.id]);

                                return (
                                  <motion.article
                                    layout="position"
                                    transition={{ duration: 0.26, ease: [0.22, 1, 0.36, 1] }}
                                    key={item.id}
                                    className="group flex flex-col justify-between"
                                  >
                                    <div>
                                      {/* Dish Photo */}
                                      <div className="relative aspect-[4/3] w-full rounded-2xl overflow-hidden bg-zinc-900 mb-3.5">
                                        <Image
                                          src={item.image}
                                          alt={item.name}
                                          fill
                                          sizes="(max-width: 768px) 92vw, (max-width: 1200px) 45vw, 23vw"
                                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                                        />
                                        {item.badge && (
                                          <span className="absolute top-2.5 left-2.5 px-2.5 py-1 rounded-full bg-black/80 backdrop-blur-md text-[#FFB800] font-mono text-[10px] font-extrabold uppercase tracking-wider">
                                            {item.badge}
                                          </span>
                                        )}
                                        {item.spicy && (
                                          <span
                                            title={dict.menuSection.filterLabels.spicy}
                                            className="absolute top-2.5 right-2.5 w-7 h-7 rounded-full bg-red-600/90 text-white flex items-center justify-center"
                                          >
                                            <Flame className="w-3.5 h-3.5 fill-current" />
                                          </span>
                                        )}
                                      </div>

                                      {/* Title & Price Row */}
                                      <div className="flex items-start justify-between gap-2">
                                        <h4 className="font-display text-lg font-extrabold uppercase tracking-wide text-white group-hover:text-[#FFB800] transition-colors leading-snug">
                                          {item.name}
                                        </h4>
                                        <span className="font-display text-xl font-black text-[#FFB800] whitespace-nowrap shrink-0">
                                          {displayPrice}
                                        </span>
                                      </div>

                                      {/* Crisp Nominative Ingredients */}
                                      <p className="text-xs text-zinc-400 leading-relaxed mt-1">
                                        {item.description}
                                      </p>
                                    </div>

                                    <div>
                                      {/* Interactive Variant / Menu Toggle / Hidden Kcal Trigger & Pure Icon Stepper */}
                                      <div className="pt-3 mt-3 border-t border-white/8 flex items-center justify-between gap-2">
                                        <div className="flex flex-wrap items-center gap-1.5">
                                          {/* Size/Topping Variants */}
                                          {item.variants &&
                                            item.variants.map((v) => {
                                              const active = v.id === selectedVarId;
                                              return (
                                                <button
                                                  key={v.id}
                                                  type="button"
                                                  onClick={() =>
                                                    setVariantMap((prev) => ({
                                                      ...prev,
                                                      [item.id]: v.id,
                                                    }))
                                                  }
                                                  className={`px-2.5 py-1 rounded-full text-[11px] font-mono uppercase transition-all cursor-pointer ${
                                                    active
                                                      ? 'bg-white text-black font-bold'
                                                      : 'bg-white/6 text-zinc-400 hover:text-white'
                                                  }`}
                                                >
                                                  {v.label}
                                                </button>
                                              );
                                            })}

                                          {/* + Menü (+700 Ft) Toggle */}
                                          {item.menuUpgradeable && (
                                            <button
                                              type="button"
                                              onClick={() =>
                                                setComboMap((prev) => ({
                                                  ...prev,
                                                  [item.id]: !prev[item.id],
                                                }))
                                              }
                                              className={`px-2.5 py-1 rounded-full text-[11px] font-mono font-bold uppercase transition-all cursor-pointer ${
                                                isCombo
                                                  ? 'bg-[#FFB800] text-black'
                                                  : 'bg-white/6 text-zinc-400 hover:text-white'
                                              }`}
                                            >
                                              {dict.menuSection.menuUpgradeToggleLabel}
                                            </button>
                                          )}

                                          {/* Hidden Calorie Table Trigger Pill (`kcal`) */}
                                          <button
                                            type="button"
                                            onClick={() => toggleItemKcal(item.id)}
                                            aria-expanded={isKcalOpen}
                                            className={`px-2 py-1 rounded-full text-[10px] font-mono uppercase tracking-wider transition-all cursor-pointer inline-flex items-center gap-1 ${
                                              isKcalOpen
                                                ? 'bg-white/20 text-[#FFB800] font-bold'
                                                : 'bg-white/[0.04] text-zinc-500 hover:text-zinc-200 hover:bg-white/10'
                                            }`}
                                          >
                                            <span>{dict.menuSection.nutrition.toggleLabel}</span>
                                            <ChevronDown
                                              className={`w-2.5 h-2.5 transition-transform duration-200 ${
                                                isKcalOpen ? 'rotate-180' : ''
                                              }`}
                                            />
                                          </button>
                                        </div>

                                        {/* Pure Icon Add Button / Morphing Stepper */}
                                        {qty === 0 ? (
                                          <motion.button
                                            whileHover={{ scale: 1.08 }}
                                            whileTap={{ scale: 0.92 }}
                                            type="button"
                                            onClick={() => handleAddItem(item)}
                                            aria-label={dict.menuSection.addToCartLabel}
                                            title={dict.menuSection.addToCartLabel}
                                            className="w-9 h-9 rounded-full bg-white/10 hover:bg-[#FF6B00] text-white hover:text-black flex items-center justify-center shrink-0 transition-colors cursor-pointer"
                                          >
                                            <Plus className="w-4 h-4 stroke-[2.8]" />
                                          </motion.button>
                                        ) : (
                                          <motion.div
                                            layout
                                            initial={{ scale: 0.88, opacity: 0 }}
                                            animate={{ scale: 1, opacity: 1 }}
                                            className="h-9 px-1 rounded-full bg-[#FF6B00] text-black flex items-center gap-1 shrink-0 shadow-md"
                                          >
                                            <button
                                              type="button"
                                              onClick={() => onUpdateQty(cartKey, -1)}
                                              aria-label="Decrease"
                                              className="w-7 h-7 rounded-full bg-black/15 hover:bg-black/25 flex items-center justify-center transition-colors cursor-pointer"
                                            >
                                              <Minus className="w-3 h-3 stroke-[3]" />
                                            </button>
                                            <span className="font-mono text-xs font-black min-w-[1rem] text-center">
                                              {qty}
                                            </span>
                                            <button
                                              type="button"
                                              onClick={() => onUpdateQty(cartKey, 1)}
                                              aria-label="Increase"
                                              className="w-7 h-7 rounded-full bg-black/15 hover:bg-black/25 flex items-center justify-center transition-colors cursor-pointer"
                                            >
                                              <Plus className="w-3 h-3 stroke-[3]" />
                                            </button>
                                          </motion.div>
                                        )}
                                      </div>

                                      {/* Collapsible Hidden Calorie & Macro Table */}
                                      <AnimatePresence initial={false}>
                                        {isKcalOpen && (
                                          <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: 'auto', opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{
                                              duration: 0.22,
                                              ease: [0.22, 1, 0.36, 1],
                                            }}
                                            className="overflow-hidden"
                                          >
                                            <div className="mt-2.5 p-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-[11px] font-mono space-y-1.5">
                                              <div className="grid grid-cols-4 gap-1 text-center">
                                                <div>
                                                  <div className="text-[9px] uppercase text-zinc-500">
                                                    {dict.menuSection.nutrition.energy}
                                                  </div>
                                                  <div className="text-[#FFB800] font-bold">
                                                    ~{finalUnitKcal}
                                                  </div>
                                                </div>
                                                <div>
                                                  <div className="text-[9px] uppercase text-zinc-500">
                                                    {dict.menuSection.nutrition.protein}
                                                  </div>
                                                  <div className="text-zinc-200 font-bold">
                                                    {item.proteinG + (isCombo ? 5 : 0)}g
                                                  </div>
                                                </div>
                                                <div>
                                                  <div className="text-[9px] uppercase text-zinc-500">
                                                    {dict.menuSection.nutrition.carbs}
                                                  </div>
                                                  <div className="text-zinc-200 font-bold">
                                                    {item.carbsG + (isCombo ? 74 : 0)}g
                                                  </div>
                                                </div>
                                                <div>
                                                  <div className="text-[9px] uppercase text-zinc-500">
                                                    {dict.menuSection.nutrition.fat}
                                                  </div>
                                                  <div className="text-zinc-200 font-bold">
                                                    {item.fatG + (isCombo ? 16 : 0)}g
                                                  </div>
                                                </div>
                                              </div>
                                              <div className="text-[10px] text-zinc-500 text-center pt-1 border-t border-white/5">
                                                {dict.menuSection.nutrition.disclaimer}
                                              </div>
                                            </div>
                                          </motion.div>
                                        )}
                                      </AnimatePresence>
                                    </div>
                                  </motion.article>
                                );
                              })}
                            </div>

                            {/* Show More / Show Less Toggle */}
                            {hasMore && (
                              <div className="mt-8 flex justify-center">
                                <button
                                  type="button"
                                  onClick={() => toggleShowMore(cat.id)}
                                  className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white/6 hover:bg-white/12 text-xs font-mono font-bold uppercase tracking-widest text-white transition-all cursor-pointer"
                                >
                                  <span>
                                    {isExpanded
                                      ? dict.menuSection.showLessLabel
                                      : `+${cat.items.length - INITIAL_VISIBLE_COUNT}`}
                                  </span>
                                  <ChevronDown
                                    className={`w-4 h-4 transition-transform duration-300 ${
                                      isExpanded ? 'rotate-180' : ''
                                    }`}
                                  />
                                </button>
                              </div>
                            )}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* GPU-Accelerated Pure Icon Jump-to-Categories Button */}
      <div
        className={`fixed bottom-20 right-5 z-30 transition-all duration-300 ${
          showFloatingJump
            ? 'opacity-100 translate-y-0 pointer-events-auto'
            : 'opacity-0 translate-y-8 pointer-events-none'
        }`}
        style={{ transform: 'translate3d(0,0,0)' }}
      >
        <button
          type="button"
          onClick={() => scrollToMenuTop(true)}
          aria-label={dict.menuSection.jumpToCategoriesLabel}
          title={dict.menuSection.jumpToCategoriesLabel}
          className="w-11 h-11 rounded-full bg-[#161922]/90 backdrop-blur-xl border border-white/15 text-white hover:bg-[#FF6B00] hover:text-black hover:border-[#FF6B00] flex items-center justify-center shadow-2xl transition-colors cursor-pointer"
        >
          <ArrowUp className="w-4 h-4 stroke-[2.8]" />
        </button>
      </div>
    </section>
  );
}
