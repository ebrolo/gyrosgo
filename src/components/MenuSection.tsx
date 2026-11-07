'use client';

import React, { useState, useMemo, useRef, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import {
  Search,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Flame,
  Plus,
  Minus,
  Check,
  X,
  ArrowUp,
  ArrowUpDown,
  Info,
} from 'lucide-react';
import { SiteDictionary, MenuItem, ExtraAddon } from '@/data/siteData';
import { useScrollLock } from '@/components/SmoothScrollProvider';
import SeaSpongeIcon from '@/components/SeaSpongeIcon';

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
    unitProteinG: number;
    unitCarbsG: number;
    unitFatG: number;
    image?: string;
    isCutoutDrink?: boolean;
  }) => void;
  onUpdateQty: (key: string, delta: number) => void;
  secretTriggerCount: number;
}

type FilterKey = 'smashBeef' | 'cheeseLover' | 'spicy' | 'poultry' | 'secretRecipe';
type SortMode = 'name-asc' | 'name-desc' | 'price-asc' | 'price-desc';

const INITIAL_VISIBLE_COUNT = 16;

const lightboxSlideVariants: Variants = {
  enter: (direction: number) => ({
    x: direction > 0 ? '55%' : '-55%',
    opacity: 0,
    scale: 0.96,
  }),
  center: {
    zIndex: 1,
    x: '0%',
    opacity: 1,
    scale: 1,
    transition: {
      x: { duration: 0.28, ease: [0.16, 1, 0.3, 1] },
      opacity: { duration: 0.2 },
      scale: { duration: 0.24 },
    },
  },
  exit: (direction: number) => ({
    zIndex: 0,
    x: direction < 0 ? '55%' : '-55%',
    opacity: 0,
    scale: 0.96,
    transition: {
      x: { duration: 0.26, ease: [0.16, 1, 0.3, 1] },
      opacity: { duration: 0.18 },
      scale: { duration: 0.22 },
    },
  }),
};

const swipeConfidenceThreshold = 9000;
const swipePower = (offset: number, velocity: number) => Math.abs(offset) * velocity;

function FilterIcon({ type }: { type: FilterKey }) {
  switch (type) {
    case 'smashBeef':
      return (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.1"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-4 h-4 shrink-0"
          aria-hidden="true"
        >
          <path d="M5 10c0-3.5 3.4-6 7.5-6 4.4 0 7.5 2.5 7.5 6 0 4.2-3.5 7.5-8.5 7.5-3.8 0-6.5-2.3-6.5-5.5Z" />
          <path d="M5 12v2.5C5 17.8 7.7 20 11.5 20c5 0 8.5-3.1 8.5-7v-3" />
          <circle cx="11" cy="10" r="1.6" />
        </svg>
      );
    case 'cheeseLover':
      return (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.1"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-4 h-4 shrink-0"
          aria-hidden="true"
        >
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
      return (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.1"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-4 h-4 shrink-0"
          aria-hidden="true"
        >
          <path d="M15.4 15.63a7.875 6 135 1 1 6.23-6.23 4.5 3.43 135 0 0-6.23 6.23" />
          <path d="m8.29 12.71-2.6 2.6a2.5 2.5 0 1 0 1.65 4.65A2.5 2.5 0 1 0 11.99 18.3l2.6-2.6" />
        </svg>
      );
    case 'secretRecipe':
      return <SeaSpongeIcon className="w-4 h-4 shrink-0" />;
  }
}

export default function MenuSection({
  dict,
  getCartQty,
  onAddToCart,
  onUpdateQty,
  secretTriggerCount,
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
  const [activeKcalPopoverId, setActiveKcalPopoverId] = useState<string | null>(null);
  const [addedAddonId, setAddedAddonId] = useState<string | null>(null);
  const [showFloatingJump, setShowFloatingJump] = useState(false);
  const [isStickyDocked, setIsStickyDocked] = useState(false);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [lightboxDir, setLightboxDir] = useState<number>(0);

  useScrollLock(lightboxIndex !== null);

  const sectionRef = useRef<HTMLElement | null>(null);
  const headingRef = useRef<HTMLHeadingElement | null>(null);
  const menuAnchorRef = useRef<HTMLDivElement | null>(null);
  const searchInputRef = useRef<HTMLInputElement | null>(null);
  const filmstripRef = useRef<HTMLDivElement | null>(null);
  const didInitMobileCollapse = useRef(false);

  // On mobile (<768px), default only the 1st category open to eliminate excessive scroll fatigue
  useEffect(() => {
    if (didInitMobileCollapse.current) return;
    didInitMobileCollapse.current = true;
    if (window.innerWidth < 768) {
      const mobileMap: Record<string, boolean> = {};
      dict.menuSection.categories.forEach((cat, index) => {
        mobileMap[cat.id] = index === 0;
      });
      setOpenCategories(mobileMap);
    }
  }, [dict.menuSection.categories]);

  // Activate Secret Herkentyű Burger filter when Easter egg is clicked in Hero or Navbar
  useEffect(() => {
    if (secretTriggerCount <= 0) return;
    setSearchQuery('');
    setActiveCategory('ALL');
    setActiveFilters(['secretRecipe']);
    setOpenCategories((prev) => ({ ...prev, hamburgerek: true }));
  }, [secretTriggerCount]);

  // Close mobile tap kcal popover when clicking anywhere outside
  useEffect(() => {
    if (!activeKcalPopoverId) return;
    const closePopover = () => setActiveKcalPopoverId(null);
    window.addEventListener('click', closePopover);
    return () => window.removeEventListener('click', closePopover);
  }, [activeKcalPopoverId]);

  // Track scroll for Floating Jump button AND Docking "ÉTLAP" Sticky Title
  useEffect(() => {
    const onScroll = () => {
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect();
        const insideMenu = rect.top < -280 && rect.bottom > 450;
        setShowFloatingJump(insideMenu);
      }
      if (headingRef.current) {
        const hRect = headingRef.current.getBoundingClientRect();
        setIsStickyDocked(hRect.bottom < 72);
      }
    };
    onScroll();
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
    if (catId === 'ALL') {
      setActiveFilters((prev) => prev.filter((f) => f !== 'secretRecipe'));
    } else {
      setOpenCategories((prev) => ({ ...prev, [catId]: true }));
    }
    scrollToMenuTop(false);
  };

  const toggleFilter = (key: FilterKey) => {
    setActiveFilters((prev) => {
      const exists = prev.includes(key);
      if (key === 'secretRecipe') {
        if (!exists) {
          setOpenCategories((curr) => ({ ...curr, hamburgerek: true }));
          return ['secretRecipe'];
        }
        return [];
      }
      const withoutSecret = prev.filter((k) => k !== 'secretRecipe');
      return exists ? withoutSecret.filter((k) => k !== key) : [...withoutSecret, key];
    });
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

  const lightboxItems = useMemo(
    () => filteredCategories.flatMap((cat) => cat.items),
    [filteredCategories]
  );

  const openLightboxForItem = useCallback(
    (itemId: string) => {
      const idx = lightboxItems.findIndex((it) => it.id === itemId);
      if (idx >= 0) {
        setLightboxDir(0);
        setLightboxIndex(idx);
      }
    },
    [lightboxItems]
  );

  const closeLightbox = useCallback(() => setLightboxIndex(null), []);

  const paginateLightbox = useCallback(
    (dir: number) => {
      if (lightboxIndex === null || lightboxItems.length === 0) return;
      setLightboxDir(dir);
      const total = lightboxItems.length;
      setLightboxIndex((lightboxIndex + dir + total) % total);
    },
    [lightboxIndex, lightboxItems.length]
  );

  const selectLightboxThumb = useCallback(
    (targetIdx: number) => {
      if (lightboxIndex === null || targetIdx === lightboxIndex) return;
      setLightboxDir(targetIdx > lightboxIndex ? 1 : -1);
      setLightboxIndex(targetIdx);
    },
    [lightboxIndex]
  );

  // Preload adjacent dish photos & auto-center active thumbnail in filmstrip
  useEffect(() => {
    if (lightboxIndex === null || lightboxItems.length === 0) return;
    const safeIdx = Math.min(lightboxIndex, lightboxItems.length - 1);
    const total = lightboxItems.length;
    const nextImg = new window.Image();
    nextImg.src = lightboxItems[(safeIdx + 1) % total].image;
    const prevImg = new window.Image();
    prevImg.src = lightboxItems[(safeIdx - 1 + total) % total].image;

    if (filmstripRef.current) {
      const thumbEl = filmstripRef.current.querySelector(
        `[data-thumb-idx="${safeIdx}"]`
      ) as HTMLElement | null;
      thumbEl?.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
    }
  }, [lightboxIndex, lightboxItems]);

  // Keyboard navigation when Menu Lightbox is open
  useEffect(() => {
    if (lightboxIndex === null) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowRight') paginateLightbox(1);
      if (e.key === 'ArrowLeft') paginateLightbox(-1);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [lightboxIndex, closeLightbox, paginateLightbox]);

  const filterChips: { key: FilterKey; label: string }[] = [
    { key: 'smashBeef', label: dict.menuSection.filterLabels.smashBeef },
    { key: 'cheeseLover', label: dict.menuSection.filterLabels.cheeseLover },
    { key: 'spicy', label: dict.menuSection.filterLabels.spicy },
    { key: 'poultry', label: dict.menuSection.filterLabels.poultry },
    { key: 'secretRecipe', label: dict.menuSection.filterLabels.secretRecipe },
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
    const finalProteinG =
      item.proteinG + (isCombo ? dict.menuSection.nutrition.comboBonusProteinG : 0);
    const finalCarbsG =
      item.carbsG + (isCombo ? dict.menuSection.nutrition.comboBonusCarbsG : 0);
    const finalFatG =
      item.fatG + (isCombo ? dict.menuSection.nutrition.comboBonusFatG : 0);
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
      finalProteinG,
      finalCarbsG,
      finalFatG,
      key,
    };
  };

  const handleAddItem = (item: MenuItem) => {
    const {
      variantObj,
      isCombo,
      finalUnitPrice,
      finalUnitKcal,
      finalProteinG,
      finalCarbsG,
      finalFatG,
    } = resolveItemCartInfo(item);
    onAddToCart({
      id: item.id,
      name: item.name,
      variantLabel: variantObj?.label,
      isCombo,
      unitPrice: finalUnitPrice,
      unitKcal: finalUnitKcal,
      unitProteinG: finalProteinG,
      unitCarbsG: finalCarbsG,
      unitFatG: finalFatG,
      image: item.image,
      isCutoutDrink: item.isCutoutDrink,
    });
  };

  const handleAddAddon = (addon: ExtraAddon) => {
    onAddToCart({
      id: addon.id,
      name: addon.name,
      unitPrice: addon.price,
      unitKcal: addon.kcal,
      unitProteinG: addon.proteinG,
      unitCarbsG: addon.carbsG,
      unitFatG: addon.fatG,
    });
    setAddedAddonId(addon.id);
    setTimeout(() => setAddedAddonId(null), 900);
  };

  const isSecretActive = activeFilters.includes('secretRecipe');
  const activeTransitionKey = `${activeCategory}__${activeFilters.join(',')}`;
  const compactMobileSearch = isStickyDocked && !mobileSearchOpen && !searchQuery;

  return (
    <section
      id="menu"
      ref={sectionRef}
      className="relative py-16 sm:py-26 bg-[#0D0F14] overflow-x-clip border-b border-white/10"
    >
      <div className="w-full max-w-[1860px] mx-auto px-4 sm:px-8 lg:px-12 2xl:px-16">
        {/* Clean Unboxed Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-8 sm:mb-10">
          <div>
            <span className="text-xs font-mono font-bold uppercase tracking-[0.24em] text-[#FF6B00] block mb-2">
              {dict.menuSection.badge}
            </span>
            <h2
              ref={headingRef}
              className="font-display text-4xl sm:text-6xl font-black uppercase tracking-tight text-white leading-none"
            >
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

        {/* Sticky Filter, Sort, Search & Docking "ÉTLAP" Control Bar */}
        <div className="sticky top-[56px] sm:top-[64px] z-30 w-full max-w-full bg-[#0D0F14]/95 backdrop-blur-xl py-2.5 sm:py-3.5 border-y border-white/10 mb-8 sm:mb-12 space-y-2.5 sm:space-y-3">
          <div className="flex flex-col lg:flex-row gap-2.5 lg:gap-3 items-stretch lg:items-center justify-between min-w-0">
            {/* Left Cluster: Docking "ÉTLAP" Heading + Search Bar */}
            <div className="flex items-center gap-2.5 sm:gap-3 flex-1 min-w-0">
              <AnimatePresence initial={false}>
                {isStickyDocked && (
                  <motion.button
                    type="button"
                    initial={{ opacity: 0, x: -14, width: 0 }}
                    animate={{ opacity: 1, x: 0, width: 'auto' }}
                    exit={{ opacity: 0, x: -14, width: 0 }}
                    transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
                    onClick={() => scrollToMenuTop(true)}
                    className="overflow-hidden shrink-0 flex items-center gap-2 pr-2.5 border-r border-white/15 cursor-pointer group"
                  >
                    <span className="w-2 h-2 rounded-full bg-[#FF6B00] shrink-0" />
                    <span className="font-display text-xl sm:text-2xl font-black uppercase tracking-tight text-white group-hover:text-[#FFB800] whitespace-nowrap transition-colors">
                      {dict.menuSection.title}
                    </span>
                  </motion.button>
                )}
              </AnimatePresence>

              {/* Mobile Compact Search Trigger when Docked vs Full Search Input */}
              {compactMobileSearch ? (
                <button
                  type="button"
                  onClick={() => {
                    setMobileSearchOpen(true);
                    setTimeout(() => searchInputRef.current?.focus(), 60);
                  }}
                  aria-label={dict.menuSection.searchPlaceholder}
                  className="lg:hidden h-9 px-3 rounded-full bg-white/8 hover:bg-white/15 text-zinc-300 inline-flex items-center gap-1.5 text-xs font-mono cursor-pointer shrink-0"
                >
                  <Search className="w-3.5 h-3.5 text-[#FFB800]" />
                </button>
              ) : null}

              <div
                className={`relative flex-1 max-w-md min-w-0 ${
                  compactMobileSearch ? 'hidden lg:block' : 'block'
                }`}
              >
                <Search className="w-4 h-4 text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  ref={searchInputRef}
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onBlur={() => {
                    if (!searchQuery) setMobileSearchOpen(false);
                  }}
                  placeholder={dict.menuSection.searchPlaceholder}
                  className="w-full pl-10 pr-9 py-2 rounded-full bg-white/6 border border-white/10 text-xs sm:text-sm text-white placeholder:text-zinc-500 focus:outline-none focus:border-[#FF6B00] transition-colors"
                />
                {(searchQuery || mobileSearchOpen) && (
                  <button
                    type="button"
                    onClick={() => {
                      setSearchQuery('');
                      setMobileSearchOpen(false);
                    }}
                    aria-label="Clear search"
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-white cursor-pointer"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>

            {/* Right Controls: Hover-Expandable Icon Filters (incl. Sea-Sponge!) + Within-Category Sort */}
            <div className="flex flex-wrap items-center justify-between lg:justify-end gap-2 min-w-0">
              {/* Hover-Expandable Icon Filter Chips */}
              <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar min-w-0">
                {filterChips.map((chip) => {
                  const active = activeFilters.includes(chip.key);
                  const isSponge = chip.key === 'secretRecipe';
                  return (
                    <motion.button
                      whileTap={{ scale: 0.94 }}
                      key={chip.key}
                      type="button"
                      onClick={() => toggleFilter(chip.key)}
                      aria-label={chip.label}
                      className={`group/filter h-8 sm:h-9 px-2.5 rounded-full text-xs font-bold uppercase tracking-wider whitespace-nowrap shrink-0 transition-all duration-300 inline-flex items-center cursor-pointer ${
                        active
                          ? isSponge
                            ? 'bg-gradient-to-r from-[#FFD814] to-[#67E8F9] text-black shadow-[0_4px_18px_rgba(255,216,20,0.45)]'
                            : 'bg-[#FF6B00] text-black shadow-[0_4px_15px_rgba(255,107,0,0.35)]'
                          : isSponge
                          ? 'bg-[#FFD814]/12 border border-[#FFD814]/30 text-[#FFD814] hover:bg-[#FFD814]/22'
                          : 'bg-white/7 text-zinc-300 hover:bg-white/15 hover:text-white'
                      }`}
                    >
                      <FilterIcon type={chip.key} />
                      <span
                        className={`overflow-hidden transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                          active
                            ? 'max-w-[130px] opacity-100 ml-1.5 pr-0.5'
                            : 'max-w-0 opacity-0 group-hover/filter:max-w-[130px] group-hover/filter:opacity-100 group-hover/filter:ml-1.5 group-hover/filter:pr-0.5'
                        }`}
                      >
                        {chip.label}
                      </span>
                    </motion.button>
                  );
                })}
              </div>

              {/* Within-Category Sort Switcher (`A–Z`, `Z–A`, `Ár ↑`, `Ár ↓`) */}
              <div className="flex items-center rounded-full bg-white/6 border border-white/10 p-0.5 sm:p-1 shrink-0">
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
                      className={`relative z-10 px-2 sm:px-2.5 py-1 rounded-full text-[10px] sm:text-[11px] font-mono font-bold uppercase tracking-wider transition-colors cursor-pointer whitespace-nowrap ${
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
              className={`relative z-10 px-3.5 sm:px-4 py-1 sm:py-1.5 rounded-full text-xs font-display font-bold uppercase tracking-wider whitespace-nowrap shrink-0 transition-colors cursor-pointer ${
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
                  className={`relative z-10 px-3.5 sm:px-4 py-1 sm:py-1.5 rounded-full text-xs font-display font-bold uppercase tracking-wider whitespace-nowrap shrink-0 transition-colors cursor-pointer ${
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

        {/* Zero-Layout-Shift Menu Catalog Container */}
        <div className="min-h-[520px]">
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
                className="space-y-10 sm:space-y-14"
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
                    <div key={cat.id} className="space-y-4 sm:space-y-6">
                      {/* Clean Unboxed Category Header */}
                      <button
                        type="button"
                        onClick={() => toggleAccordion(cat.id)}
                        className="w-full pb-3 border-b border-white/15 flex items-baseline justify-between text-left group cursor-pointer"
                      >
                        <div className="flex flex-wrap items-baseline gap-2.5 sm:gap-4">
                          <h3 className="font-display text-2xl sm:text-4xl font-black uppercase tracking-tight text-white group-hover:text-[#FFB800] transition-colors">
                            {cat.title}
                          </h3>
                          <span className="text-[11px] sm:text-xs font-mono uppercase tracking-widest text-zinc-500 hidden sm:inline">
                            {cat.subtitle}
                          </span>
                        </div>
                        <div className="flex items-center gap-2.5 sm:gap-3 shrink-0">
                          <span className="text-xs font-mono text-zinc-400">
                            {cat.items.length} {dict.menuSection.itemsCountLabel}
                          </span>
                          <ChevronDown
                            className={`w-5 h-5 text-zinc-400 transition-transform duration-300 ${
                              isOpen ? 'rotate-180 text-[#FFB800]' : ''
                            }`}
                          />
                        </div>
                      </button>

                      {/* Animated Category Grid (Compact Horizontal Rows on Mobile, 4–5 Col Showcase Cards on Desktop!) */}
                      <AnimatePresence initial={false}>
                        {isOpen && (
                          <motion.div
                            initial={{ opacity: 0, y: -6 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -6 }}
                            transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
                            className="overflow-visible"
                          >
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 2xl:grid-cols-5 gap-y-4 md:gap-x-6 md:gap-y-10 pt-1">
                              {visibleItems.map((item) => {
                                const {
                                  selectedVarId,
                                  variantObj,
                                  isCombo,
                                  basePrice,
                                  finalUnitKcal,
                                  finalProteinG,
                                  finalCarbsG,
                                  finalFatG,
                                  key: cartKey,
                                } = resolveItemCartInfo(item);

                                const displayPrice = isCombo
                                  ? `${(basePrice + 700).toLocaleString('hu-HU')} Ft`
                                  : variantObj
                                  ? variantObj.priceDisplay
                                  : item.price;

                                const qty = getCartQty(cartKey);
                                const isKcalOpen = activeKcalPopoverId === item.id;
                                const isSecretCard = Boolean(item.secretRecipe && isSecretActive);

                                return (
                                  <motion.article
                                    layout="position"
                                    transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
                                    id={`item-${item.id}`}
                                    key={item.id}
                                    className={`group relative flex flex-col justify-between pb-4 md:pb-0 border-b border-white/8 md:border-none ${
                                      isSecretCard
                                        ? 'p-4 rounded-3xl bg-gradient-to-br from-[#FFD814]/12 via-[#0D0F14] to-[#67E8F9]/12 ring-2 ring-[#FFD814]/60 shadow-[0_0_35px_rgba(255,216,20,0.22)] md:col-span-2'
                                        : ''
                                    }`}
                                  >
                                    {/* Top Area: Wolt-Style Row-Reverse on Mobile (<md), Vertical Stack on Desktop (md:) */}
                                    <div className="flex flex-row-reverse md:flex-col items-start md:items-stretch justify-between gap-3.5 md:gap-0">
                                      {/* Self-Explanatory Clickable Dish Photo -> Opens Fullscreen Menu Lightbox */}
                                      <button
                                        type="button"
                                        onClick={() => openLightboxForItem(item.id)}
                                        aria-label={item.name}
                                        className={`relative block text-left w-24 h-24 sm:w-28 sm:h-28 md:w-full md:h-auto md:aspect-[4/3] shrink-0 rounded-2xl overflow-hidden md:mb-3.5 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FFB800] ${
                                          item.isCutoutDrink ? 'bg-transparent' : 'bg-zinc-900'
                                        }`}
                                      >
                                        <Image
                                          src={item.image}
                                          alt={item.name}
                                          fill
                                          sizes="(max-width: 768px) 112px, (max-width: 1200px) 45vw, 20vw"
                                          className={
                                            item.isCutoutDrink
                                              ? 'object-contain p-1.5 sm:p-2 drop-shadow-[0_14px_24px_rgba(0,0,0,0.8)] group-hover:scale-108 transition-transform duration-500'
                                              : 'object-cover group-hover:scale-105 transition-transform duration-500'
                                          }
                                        />
                                        {item.spicy && (
                                          <span
                                            title={dict.menuSection.filterLabels.spicy}
                                            className="absolute top-1.5 right-1.5 md:top-2.5 md:right-2.5 w-6 h-6 md:w-7 md:h-7 rounded-full bg-red-600/90 text-white flex items-center justify-center shadow pointer-events-none"
                                          >
                                            <Flame className="w-3 h-3 md:w-3.5 md:h-3.5 fill-current" />
                                          </span>
                                        )}
                                        {item.secretRecipe && (
                                          <span
                                            title={dict.menuSection.filterLabels.secretRecipe}
                                            className="absolute bottom-1.5 right-1.5 md:bottom-2.5 md:right-2.5 w-6 h-6 md:w-7 md:h-7 rounded-full bg-black/75 backdrop-blur-md flex items-center justify-center shadow pointer-events-none"
                                          >
                                            <SeaSpongeIcon className="w-4 h-4" />
                                          </span>
                                        )}
                                      </button>

                                      {/* Text Column */}
                                      <div className="flex-1 min-w-0">
                                        <div className="flex flex-col md:flex-row md:items-start justify-between gap-0.5 md:gap-2">
                                          <h4 className="font-display text-base sm:text-lg font-extrabold uppercase tracking-wide text-white group-hover:text-[#FFB800] transition-colors leading-snug">
                                            {item.name}
                                          </h4>
                                          <span className="font-display text-lg sm:text-xl font-black text-[#FFB800] whitespace-nowrap shrink-0">
                                            {displayPrice}
                                          </span>
                                        </div>

                                        <p className="text-xs text-zinc-400 leading-relaxed mt-1 line-clamp-2 md:line-clamp-none">
                                          {item.description}
                                        </p>
                                      </div>
                                    </div>

                                    {/* Bottom Action Row: Variants + Menu Upgrade + Hover/Tap Kcal Info Bubble + Stepper */}
                                    <div className="pt-2.5 mt-2.5 md:pt-3 md:mt-3 md:border-t md:border-white/8 flex items-center justify-between gap-2">
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

                                        {/* Hover (Desktop) / Tap (Mobile) Floating Kcal & Macro Info Popover */}
                                        <div
                                          className="relative inline-flex"
                                          onMouseEnter={() => {
                                            if (
                                              typeof window !== 'undefined' &&
                                              window.matchMedia('(hover: hover)').matches
                                            ) {
                                              setActiveKcalPopoverId(item.id);
                                            }
                                          }}
                                          onMouseLeave={() => {
                                            if (
                                              typeof window !== 'undefined' &&
                                              window.matchMedia('(hover: hover)').matches
                                            ) {
                                              setActiveKcalPopoverId((curr) =>
                                                curr === item.id ? null : curr
                                              );
                                            }
                                          }}
                                        >
                                          <button
                                            type="button"
                                            onClick={(e) => {
                                              e.stopPropagation();
                                              setActiveKcalPopoverId((curr) =>
                                                curr === item.id ? null : item.id
                                              );
                                            }}
                                            aria-expanded={isKcalOpen}
                                            className={`px-2 py-1 rounded-full text-[10px] font-mono uppercase tracking-wider transition-all cursor-pointer inline-flex items-center gap-1 ${
                                              isKcalOpen
                                                ? 'bg-[#FFB800] text-black font-bold'
                                                : 'bg-white/[0.05] text-zinc-400 hover:text-white hover:bg-white/12'
                                            }`}
                                          >
                                            <Info className="w-3 h-3 shrink-0" />
                                            <span>{dict.menuSection.nutrition.toggleLabel}</span>
                                          </button>

                                          <AnimatePresence>
                                            {isKcalOpen && (
                                              <motion.div
                                                initial={{ opacity: 0, y: 6, scale: 0.95 }}
                                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                                exit={{ opacity: 0, y: 6, scale: 0.95 }}
                                                transition={{ duration: 0.16, ease: 'easeOut' }}
                                                onClick={(e) => e.stopPropagation()}
                                                className="absolute bottom-full left-0 mb-2 z-40 w-[235px] sm:w-[250px] p-3 rounded-2xl bg-[#131620]/98 backdrop-blur-xl border border-white/15 shadow-[0_18px_40px_rgba(0,0,0,0.85)] text-[11px] font-mono pointer-events-auto"
                                              >
                                                <div className="grid grid-cols-4 gap-1 text-center">
                                                  <div>
                                                    <div className="text-[9px] uppercase text-zinc-400">
                                                      {dict.menuSection.nutrition.energy}
                                                    </div>
                                                    <div className="text-[#FFB800] font-bold mt-0.5">
                                                      ~{finalUnitKcal}
                                                    </div>
                                                  </div>
                                                  <div>
                                                    <div className="text-[9px] uppercase text-zinc-400">
                                                      {dict.menuSection.nutrition.protein}
                                                    </div>
                                                    <div className="text-emerald-300 font-bold mt-0.5">
                                                      {finalProteinG}g
                                                    </div>
                                                  </div>
                                                  <div>
                                                    <div className="text-[9px] uppercase text-zinc-400">
                                                      {dict.menuSection.nutrition.carbs}
                                                    </div>
                                                    <div className="text-sky-300 font-bold mt-0.5">
                                                      {finalCarbsG}g
                                                    </div>
                                                  </div>
                                                  <div>
                                                    <div className="text-[9px] uppercase text-zinc-400">
                                                      {dict.menuSection.nutrition.fat}
                                                    </div>
                                                    <div className="text-amber-300 font-bold mt-0.5">
                                                      {finalFatG}g
                                                    </div>
                                                  </div>
                                                </div>
                                                <div className="text-[9.5px] text-zinc-400 text-center pt-1.5 mt-1.5 border-t border-white/10 leading-snug">
                                                  {dict.menuSection.nutrition.disclaimer}
                                                </div>
                                              </motion.div>
                                            )}
                                          </AnimatePresence>
                                        </div>
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
          showFloatingJump && lightboxIndex === null
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

      {/* Integrated Fullscreen Menu Dish Lightbox Modal (Scroll-Locked + PC/Mobile Drag + Bottom Filmstrip) */}
      <AnimatePresence>
        {lightboxIndex !== null && lightboxItems.length > 0 && (() => {
          const safeIdx = Math.min(lightboxIndex, lightboxItems.length - 1);
          const activeDish = lightboxItems[safeIdx];
          return (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              data-lenis-prevent
              onClick={closeLightbox}
              className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex flex-col items-center justify-between p-3 sm:p-6 select-none overflow-hidden"
            >
              {/* Top Bar: Counter + Close Button */}
              <div
                onClick={(e) => e.stopPropagation()}
                className="w-full max-w-6xl flex items-center justify-between z-50 pt-1 px-2 mx-auto"
              >
                <span className="text-xs font-mono text-[#FFB800] font-bold bg-white/8 px-3.5 py-1.5 rounded-full border border-white/10">
                  {safeIdx + 1} / {lightboxItems.length}
                </span>
                <button
                  type="button"
                  onClick={closeLightbox}
                  aria-label={dict.menuSection.lightboxCloseAria}
                  className="w-10 h-10 rounded-full bg-white/10 hover:bg-[#FF6B00] text-white hover:text-black flex items-center justify-center transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Main Stage with Padded Outside Navigation Arrows & PC/Touch Drag */}
              <div
                onClick={(e) => e.stopPropagation()}
                className="relative w-full max-w-6xl h-[56vh] sm:h-[68vh] flex items-center justify-center mx-auto my-auto px-12 sm:px-20 overflow-hidden"
              >
                <button
                  type="button"
                  onClick={() => paginateLightbox(-1)}
                  aria-label={dict.menuSection.lightboxPrevAria}
                  className="absolute left-1 sm:left-3 top-1/2 -translate-y-1/2 z-50 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/10 hover:bg-[#FFB800] text-white hover:text-black border border-white/15 flex items-center justify-center shadow-2xl transition-colors cursor-pointer"
                >
                  <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 stroke-[2.5]" />
                </button>

                <button
                  type="button"
                  onClick={() => paginateLightbox(1)}
                  aria-label={dict.menuSection.lightboxNextAria}
                  className="absolute right-1 sm:right-3 top-1/2 -translate-y-1/2 z-50 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/10 hover:bg-[#FFB800] text-white hover:text-black border border-white/15 flex items-center justify-center shadow-2xl transition-colors cursor-pointer"
                >
                  <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 stroke-[2.5]" />
                </button>

                <AnimatePresence initial={false} custom={lightboxDir}>
                  <motion.div
                    key={activeDish.id}
                    custom={lightboxDir}
                    variants={lightboxSlideVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    drag="x"
                    dragConstraints={{ left: 0, right: 0 }}
                    dragElastic={0.85}
                    onDragEnd={(_, { offset, velocity }) => {
                      const swipe = swipePower(offset.x, velocity.x);
                      if (swipe < -swipeConfidenceThreshold || offset.x < -55) {
                        paginateLightbox(1);
                      } else if (swipe > swipeConfidenceThreshold || offset.x > 55) {
                        paginateLightbox(-1);
                      }
                    }}
                    className="absolute inset-0 flex flex-col items-center justify-center cursor-grab active:cursor-grabbing px-12 sm:px-20"
                  >
                    <div className="relative w-full flex-1 max-w-4xl mx-auto">
                      <Image
                        src={activeDish.image}
                        alt={activeDish.name}
                        fill
                        sizes="(max-width: 768px) 85vw, 900px"
                        className="object-contain pointer-events-none drop-shadow-[0_20px_45px_rgba(0,0,0,0.85)]"
                        priority
                      />
                    </div>
                    <div className="pt-3 pb-1 text-center pointer-events-none">
                      <h4 className="font-display text-lg sm:text-2xl font-black uppercase tracking-wide text-white">
                        {activeDish.name}
                      </h4>
                      <span className="font-display text-sm sm:text-base font-extrabold text-[#FFB800]">
                        {activeDish.price}
                      </span>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Clickable Bottom Thumbnail Filmstrip (Galériasáv) */}
              <div
                onClick={(e) => e.stopPropagation()}
                className="w-full max-w-5xl z-50 pb-1 px-2 flex flex-col items-center mx-auto"
              >
                <div
                  ref={filmstripRef}
                  data-lenis-prevent
                  className="flex items-center gap-2 overflow-x-auto py-2 px-3 rounded-2xl bg-[#12141C]/85 border border-white/10 backdrop-blur-md max-w-full no-scrollbar"
                >
                  {lightboxItems.map((thumb, thumbIdx) => {
                    const isCurrent = thumbIdx === safeIdx;
                    return (
                      <button
                        key={thumb.id}
                        type="button"
                        data-thumb-idx={thumbIdx}
                        onClick={() => selectLightboxThumb(thumbIdx)}
                        aria-label={thumb.name}
                        title={thumb.name}
                        className={`relative w-14 sm:w-18 h-11 sm:h-14 rounded-xl overflow-hidden shrink-0 transition-all cursor-pointer ${
                          isCurrent
                            ? 'border-2 border-[#FFB800] opacity-100 scale-105 shadow-[0_0_16px_rgba(255,184,0,0.4)]'
                            : 'border border-white/10 opacity-40 hover:opacity-90'
                        } ${thumb.isCutoutDrink ? 'bg-zinc-900/80' : 'bg-zinc-900'}`}
                      >
                        <Image
                          src={thumb.image}
                          alt={thumb.name}
                          fill
                          sizes="72px"
                          className={thumb.isCutoutDrink ? 'object-contain p-1' : 'object-cover'}
                        />
                      </button>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          );
        })()}
      </AnimatePresence>
    </section>
  );
}
