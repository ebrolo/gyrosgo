'use client';

import React, { useRef, useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from 'framer-motion';
import {
  Phone,
  Plus,
  Minus,
  ShoppingBag,
  UtensilsCrossed,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { SiteDictionary, HeroSlide, businessInfo } from '@/data/siteData';

interface HeroSectionProps {
  dict: SiteDictionary;
  getCartQty: (key: string) => number;
  onAddHeroSlide: (slide: HeroSlide) => void;
  onUpdateQty: (key: string, delta: number) => void;
}

interface LayerSpec {
  src: string;
  w: number;
  h: number;
  zIndex: number;
  yStart: string;
  yEnd: string;
  rotEnd: number;
  scaleStart?: number;
  scaleEnd: number;
  isMoltenSauce?: boolean;
}

const SLIDE_LAYER_MAP: Record<string, LayerSpec[]> = {
  'dupla-smash-burger': [
    {
      src: '/images/hero/layer-1-top-bun.webp',
      w: 900,
      h: 341,
      zIndex: 50,
      yStart: '-29%',
      yEnd: '-65%',
      rotEnd: -3,
      scaleEnd: 1.04,
    },
    {
      src: '/images/hero/layer-2-bacon-pickles.webp',
      w: 900,
      h: 313,
      zIndex: 40,
      yStart: '-14.5%',
      yEnd: '-33%',
      rotEnd: 2.5,
      scaleEnd: 1.03,
    },
    {
      src: '/images/hero/layer-3-patty-cheddar.webp',
      w: 900,
      h: 324,
      zIndex: 30,
      yStart: '-1%',
      yEnd: '-1%',
      rotEnd: -1.2,
      scaleEnd: 1.02,
    },
    {
      src: '/images/hero/layer-4-patty-sauce.webp',
      w: 900,
      h: 338,
      zIndex: 20,
      yStart: '14%',
      yEnd: '32%',
      rotEnd: 1.8,
      scaleEnd: 1.02,
    },
    {
      src: '/images/hero/layer-5-bottom-bun.webp',
      w: 900,
      h: 281,
      zIndex: 10,
      yStart: '28.5%',
      yEnd: '63%',
      rotEnd: -1.5,
      scaleEnd: 1.03,
    },
  ],
  'smash-box-6db': [
    {
      src: '/images/hero/box-layer-1-top-burgers.webp',
      w: 920,
      h: 231,
      zIndex: 25,
      yStart: '-22%',
      yEnd: '-60%',
      rotEnd: -2.2,
      scaleStart: 0.9,
      scaleEnd: 1.02,
    },
    {
      src: '/images/hero/box-layer-2-mid-burgers.webp',
      w: 920,
      h: 250,
      zIndex: 35,
      yStart: '-4%',
      yEnd: '-22%',
      rotEnd: 1.8,
      scaleStart: 0.93,
      scaleEnd: 1.03,
    },
    {
      src: '/images/hero/box-layer-3-fries-sauces.webp',
      w: 920,
      h: 219,
      zIndex: 45,
      yStart: '14%',
      yEnd: '18%',
      rotEnd: -1.2,
      scaleStart: 0.92,
      scaleEnd: 1.02,
    },
    {
      src: '/images/hero/box-layer-4-tray.webp',
      w: 920,
      h: 336,
      zIndex: 15,
      yStart: '21%',
      yEnd: '56%',
      rotEnd: 1.2,
      scaleStart: 1.04,
      scaleEnd: 1.02,
    },
  ],
  'cheddar-sajtorulet': [
    {
      src: '/images/hero/cheddar-layer-1-crown.webp',
      w: 920,
      h: 490,
      zIndex: 50,
      yStart: '-28%',
      yEnd: '-64%',
      rotEnd: -2.8,
      scaleEnd: 1.04,
    },
    {
      src: '/images/hero/cheddar-layer-2-molten-wave.webp',
      w: 920,
      h: 398,
      zIndex: 44,
      yStart: '-7%',
      yEnd: '-25%',
      rotEnd: 1.6,
      scaleEnd: 1.05,
      isMoltenSauce: true,
    },
    {
      src: '/images/hero/cheddar-layer-3-bacon-jam.webp',
      w: 920,
      h: 252,
      zIndex: 30,
      yStart: '6%',
      yEnd: '8%',
      rotEnd: -2.0,
      scaleEnd: 1.02,
    },
    {
      src: '/images/hero/cheddar-layer-4-patty.webp',
      w: 920,
      h: 262,
      zIndex: 20,
      yStart: '17%',
      yEnd: '35%',
      rotEnd: 1.6,
      scaleEnd: 1.02,
    },
    {
      src: '/images/hero/cheddar-layer-5-heel.webp',
      w: 920,
      h: 260,
      zIndex: 10,
      yStart: '30%',
      yEnd: '63%',
      rotEnd: -1.4,
      scaleEnd: 1.03,
    },
  ],
};

function ExplodedLayerItem({
  layer,
  alt,
  smoothProgress,
}: {
  layer: LayerSpec;
  alt: string;
  smoothProgress: ReturnType<typeof useSpring>;
}) {
  const y = useTransform(smoothProgress, [0, 0.88], [layer.yStart, layer.yEnd]);
  const rotate = useTransform(smoothProgress, [0, 0.88], [0, layer.rotEnd]);
  const scale = useTransform(
    smoothProgress,
    [0, 0.88],
    [layer.scaleStart ?? 1, layer.scaleEnd]
  );
  // Extra elastic cheese stretch when scrolling on the molten cheddar wave!
  const sauceStretchY = useTransform(
    smoothProgress,
    [0, 0.55, 0.9],
    layer.isMoltenSauce ? [1, 1.18, 1.1] : [1, 1, 1]
  );

  return (
    <motion.div
      style={{
        y,
        rotate,
        scale,
        scaleY: sauceStretchY,
        zIndex: layer.zIndex,
        transformOrigin: layer.isMoltenSauce ? '50% 22%' : '50% 50%',
      }}
      className="absolute inset-0 flex items-center justify-center pointer-events-none will-change-transform"
    >
      {layer.isMoltenSauce ? (
        <div className="relative w-full flex items-center justify-center">
          {/* Continuous viscous molten cheese breathing stretch */}
          <motion.div
            animate={{ scaleY: [1, 1.075, 1] }}
            transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut' }}
            style={{ transformOrigin: '50% 20%' }}
            className="w-full relative"
          >
            <Image
              src={layer.src}
              alt={alt}
              width={layer.w}
              height={layer.h}
              sizes="(max-width: 640px) 215px, (max-width: 1024px) 330px, 420px"
              priority
              draggable={false}
              className="w-full h-auto object-contain drop-shadow-[0_16px_26px_rgba(255,140,0,0.32)]"
            />

            {/* Animated Gooey Liquid Cheddar Drips falling from the cheese wave tips */}
            <svg
              viewBox="0 0 400 220"
              className="absolute inset-x-0 top-[44%] w-full h-[68%] pointer-events-none overflow-visible"
              aria-hidden="true"
            >
              <defs>
                <linearGradient id="moltenCheddarGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#FFC82C" />
                  <stop offset="60%" stopColor="#FF9E00" />
                  <stop offset="100%" stopColor="#E87500" />
                </linearGradient>
                <filter id="cheddarGoo">
                  <feGaussianBlur in="SourceGraphic" stdDeviation="3.2" result="blur" />
                  <feColorMatrix
                    in="blur"
                    mode="matrix"
                    values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -8"
                    result="goo"
                  />
                  <feComposite in="SourceGraphic" in2="goo" operator="atop" />
                </filter>
              </defs>

              <g filter="url(#cheddarGoo)">
                {/* Anchor nibs aligned with the 3 main hanging cheese tips */}
                <ellipse cx="109" cy="48" rx="6" ry="9" fill="url(#moltenCheddarGrad)" />
                <ellipse cx="182" cy="54" rx="7" ry="10" fill="url(#moltenCheddarGrad)" />
                <ellipse cx="268" cy="58" rx="6.5" ry="10" fill="url(#moltenCheddarGrad)" />

                {/* Drip 1 (Left tip) */}
                <motion.ellipse
                  cx="109"
                  rx="5.2"
                  fill="url(#moltenCheddarGrad)"
                  animate={{
                    cy: [48, 72, 128],
                    ry: [7, 10, 5.5],
                    opacity: [0.95, 1, 0],
                  }}
                  transition={{
                    duration: 2.3,
                    repeat: Infinity,
                    ease: [0.4, 0, 0.85, 1],
                    delay: 0.1,
                  }}
                />

                {/* Drip 2 (Center tip) */}
                <motion.ellipse
                  cx="182"
                  rx="6"
                  fill="url(#moltenCheddarGrad)"
                  animate={{
                    cy: [54, 82, 146],
                    ry: [8, 11.5, 6],
                    opacity: [0.95, 1, 0],
                  }}
                  transition={{
                    duration: 2.7,
                    repeat: Infinity,
                    ease: [0.4, 0, 0.85, 1],
                    delay: 0.95,
                  }}
                />

                {/* Drip 3 (Right tip) */}
                <motion.ellipse
                  cx="268"
                  rx="5.5"
                  fill="url(#moltenCheddarGrad)"
                  animate={{
                    cy: [58, 86, 142],
                    ry: [7.5, 10.5, 5.5],
                    opacity: [0.95, 1, 0],
                  }}
                  transition={{
                    duration: 2.5,
                    repeat: Infinity,
                    ease: [0.4, 0, 0.85, 1],
                    delay: 1.65,
                  }}
                />
              </g>
            </svg>
          </motion.div>
        </div>
      ) : (
        <Image
          src={layer.src}
          alt={alt}
          width={layer.w}
          height={layer.h}
          sizes="(max-width: 640px) 215px, (max-width: 1024px) 330px, 420px"
          priority
          draggable={false}
          className="w-full h-auto object-contain drop-shadow-[0_18px_28px_rgba(0,0,0,0.78)]"
        />
      )}
    </motion.div>
  );
}

export default function HeroSection({
  dict,
  getCartQty,
  onAddHeroSlide,
  onUpdateQty,
}: HeroSectionProps) {
  const containerRef = useRef<HTMLElement | null>(null);
  const slides = dict.hero.slides;
  const [[activeIdx, direction], setSlideState] = useState<[number, number]>([0, 1]);

  const safeIdx = activeIdx % slides.length;
  const heroSlide = slides[safeIdx];
  const activeLayers = SLIDE_LAYER_MAP[heroSlide.id] || SLIDE_LAYER_MAP['dupla-smash-burger'];

  const heroCartKey = `${heroSlide.id}__base__single`;
  const heroItemQty = getCartQty(heroCartKey);

  const paginate = useCallback(
    (dir: -1 | 1) => {
      setSlideState(([prev]) => [(prev + dir + slides.length) % slides.length, dir]);
    },
    [slides.length]
  );

  const goToSlide = (targetIdx: number) => {
    if (targetIdx === safeIdx) return;
    setSlideState([targetIdx, targetIdx > safeIdx ? 1 : -1]);
  };

  // Keyboard Left / Right navigation when hero is near top of viewport
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (window.scrollY > window.innerHeight * 1.4) return;
      if (
        document.activeElement &&
        ['INPUT', 'TEXTAREA'].includes(document.activeElement.tagName)
      ) {
        return;
      }
      if (e.key === 'ArrowLeft') paginate(-1);
      if (e.key === 'ArrowRight') paginate(1);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [paginate]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 180,
    damping: 28,
    mass: 0.25,
  });

  const bgWordY = useTransform(smoothProgress, [0, 1], ['0%', '-8%']);
  const bgWordScale = useTransform(smoothProgress, [0, 1], [1, 1.05]);
  const scrollHintOpacity = useTransform(smoothProgress, [0, 0.12], [1, 0]);

  const scrollToMenu = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const el = document.querySelector('#menu') as HTMLElement | null;
    if (!el) return;
    if (window.__lenis) {
      window.__lenis.scrollTo(el, { offset: -75, duration: 0.75 });
    } else {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="home"
      ref={containerRef}
      className="relative h-[180vh] w-full max-w-[100vw] bg-[#0A0B0E]"
    >
      {/* Sticky Full-Viewport Stage */}
      <div className="sticky top-0 h-[100dvh] w-full overflow-hidden flex flex-col justify-between pt-20 sm:pt-24">
        {/* Ambient Fire Glow */}
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -top-24 -left-24 w-[460px] h-[460px] rounded-full bg-[#FF6B00]/14 blur-[140px]" />
          <div className="absolute top-1/2 right-[8%] -translate-y-1/2 w-[520px] h-[520px] rounded-full bg-[#FFB800]/16 blur-[150px]" />
        </div>

        {/* GIANT MONUMENTAL PURE WHITE BACKGROUND WORD */}
        <motion.div
          aria-hidden="true"
          style={{ y: bgWordY, scale: bgWordScale }}
          className="pointer-events-none absolute inset-x-0 top-[68%] sm:top-[62%] lg:top-[50%] -translate-y-1/2 flex items-center justify-center lg:justify-end lg:pr-[4%] select-none z-0"
        >
          <AnimatePresence mode="wait">
            <motion.span
              key={heroSlide.bgWord}
              initial={{ opacity: 0, y: 18, filter: 'blur(8px)' }}
              animate={{ opacity: 0.95, y: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, y: -18, filter: 'blur(8px)' }}
              transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
              className={`font-display font-black leading-none tracking-tighter uppercase text-white drop-shadow-[0_10px_40px_rgba(0,0,0,0.65)] whitespace-nowrap ${
                heroSlide.bgWord.length >= 7
                  ? 'text-[20vw] sm:text-[18vw] lg:text-[15.5vw]'
                  : 'text-[27vw] sm:text-[24vw] lg:text-[21vw]'
              }`}
            >
              {heroSlide.bgWord}
            </motion.span>
          </AnimatePresence>
        </motion.div>

        {/* Left & Right Edge Pagination Arrows */}
        <motion.button
          type="button"
          onClick={() => paginate(-1)}
          whileHover={{ scale: 1.08, x: -2 }}
          whileTap={{ scale: 0.92 }}
          aria-label={dict.hero.prevSlideAria}
          title={dict.hero.prevSlideAria}
          className="absolute left-2 sm:left-4 lg:left-6 top-[56%] lg:top-1/2 -translate-y-1/2 z-30 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-black/55 hover:bg-[#FFB800] border border-white/15 hover:border-[#FFB800] backdrop-blur-md text-white hover:text-black flex items-center justify-center shadow-xl transition-colors cursor-pointer"
        >
          <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 stroke-[2.5]" />
        </motion.button>

        <motion.button
          type="button"
          onClick={() => paginate(1)}
          whileHover={{ scale: 1.08, x: 2 }}
          whileTap={{ scale: 0.92 }}
          aria-label={dict.hero.nextSlideAria}
          title={dict.hero.nextSlideAria}
          className="absolute right-2 sm:right-4 lg:right-6 top-[56%] lg:top-1/2 -translate-y-1/2 z-30 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-black/55 hover:bg-[#FFB800] border border-white/15 hover:border-[#FFB800] backdrop-blur-md text-white hover:text-black flex items-center justify-center shadow-xl transition-colors cursor-pointer"
        >
          <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 stroke-[2.5]" />
        </motion.button>

        {/* Main Hero Grid */}
        <div className="relative z-10 max-w-7xl mx-auto w-full px-6 sm:px-14 lg:px-20 my-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-8 items-center">
            {/* Left Column: Crisp Animated Headline + Price + Icon-Only Actions */}
            <div className="lg:col-span-6 min-w-0 space-y-3 sm:space-y-5 text-left relative z-20">
              <AnimatePresence mode="wait" custom={direction}>
                <motion.div
                  key={heroSlide.id}
                  initial={{ opacity: 0, x: direction * 24, filter: 'blur(4px)' }}
                  animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                  exit={{ opacity: 0, x: direction * -24, filter: 'blur(4px)' }}
                  transition={{ duration: 0.26, ease: [0.22, 1, 0.36, 1] }}
                  className="space-y-2.5 sm:space-y-4"
                >
                  <div className="flex flex-wrap items-center gap-2 text-[10px] sm:text-xs font-mono uppercase tracking-[0.2em]">
                    <span className="inline-flex items-center gap-2 text-zinc-300">
                      <span className="w-2 h-2 rounded-full bg-[#FF6B00]" />
                      {dict.hero.eyebrow}
                    </span>
                    <span className="text-zinc-600">/</span>
                    <span className="text-[#FFB800] font-bold">{heroSlide.tag}</span>
                  </div>

                  <h1 className="font-display font-black uppercase tracking-tight leading-[0.96] text-[2.4rem] sm:text-7xl xl:text-[5.1rem] text-white drop-shadow-[0_8px_30px_rgba(0,0,0,0.9)]">
                    <span className="block">{heroSlide.titleLine1}</span>
                    <span className="block pt-1.5 -mt-1 text-transparent bg-clip-text bg-gradient-to-r from-[#FF6B00] via-[#FF8C00] to-[#FFB800]">
                      {heroSlide.titleAccent}
                    </span>
                  </h1>

                  <p className="text-zinc-300 text-xs sm:text-base font-medium tracking-wide max-w-md drop-shadow-[0_4px_16px_rgba(0,0,0,0.95)]">
                    {heroSlide.ingredients}
                  </p>
                </motion.div>
              </AnimatePresence>

              {/* Unboxed Monumental Price + Pure Icon Controls on a Single Clean Row */}
              <div className="pt-1 sm:pt-2 flex items-center justify-between sm:justify-start gap-4 sm:gap-7">
                <div>
                  <div className="font-display text-3xl sm:text-5xl font-black text-[#FFB800] leading-none tracking-tight">
                    {heroSlide.priceValue}
                  </div>
                  <div className="text-[10px] sm:text-[11px] font-mono uppercase tracking-wider text-zinc-400 mt-1">
                    {heroSlide.comboEligible
                      ? dict.hero.comboTag
                      : dict.hero.includedComboTag}
                  </div>
                </div>

                {/* Tactile Icon-Only Action Cluster */}
                <div className="flex items-center gap-2 sm:gap-3 shrink-0">
                  {heroItemQty === 0 ? (
                    <motion.button
                      whileHover={{ scale: 1.06 }}
                      whileTap={{ scale: 0.94 }}
                      type="button"
                      onClick={() => onAddHeroSlide(heroSlide)}
                      aria-label={dict.hero.addToCartCta}
                      title={dict.hero.addToCartCta}
                      className="w-11 h-11 sm:w-14 sm:h-14 rounded-full bg-gradient-to-tr from-[#FF6B00] to-[#FFB800] text-black flex items-center justify-center shadow-[0_12px_35px_rgba(255,107,0,0.45)] cursor-pointer relative"
                    >
                      <ShoppingBag className="w-4 h-4 sm:w-5 sm:h-5 stroke-[2.4]" />
                      <span className="absolute -top-1 -right-1 w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-white text-black flex items-center justify-center shadow-md">
                        <Plus className="w-3 h-3 sm:w-3.5 sm:h-3.5 stroke-[3]" />
                      </span>
                    </motion.button>
                  ) : (
                    <motion.div
                      layout
                      initial={{ scale: 0.9, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className="h-11 sm:h-14 px-1.5 sm:px-2 rounded-full bg-gradient-to-r from-[#FF6B00] to-[#FFB800] text-black flex items-center gap-1.5 sm:gap-2 shadow-[0_12px_35px_rgba(255,107,0,0.45)]"
                    >
                      <button
                        type="button"
                        onClick={() => onUpdateQty(heroCartKey, -1)}
                        aria-label="Decrease"
                        className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-black/15 hover:bg-black/25 flex items-center justify-center transition-colors cursor-pointer"
                      >
                        <Minus className="w-3.5 h-3.5 sm:w-4 sm:h-4 stroke-[2.8]" />
                      </button>
                      <span className="font-mono text-sm sm:text-base font-black min-w-[1.1rem] text-center">
                        {heroItemQty}
                      </span>
                      <button
                        type="button"
                        onClick={() => onUpdateQty(heroCartKey, 1)}
                        aria-label="Increase"
                        className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-black/15 hover:bg-black/25 flex items-center justify-center transition-colors cursor-pointer"
                      >
                        <Plus className="w-3.5 h-3.5 sm:w-4 sm:h-4 stroke-[2.8]" />
                      </button>
                    </motion.div>
                  )}

                  {/* Pure Icon Phone Call Button */}
                  <motion.a
                    whileHover={{ scale: 1.06 }}
                    whileTap={{ scale: 0.94 }}
                    href={businessInfo.phoneTel}
                    aria-label={businessInfo.phoneDisplay}
                    title={businessInfo.phoneDisplay}
                    className="w-11 h-11 sm:w-14 sm:h-14 rounded-full bg-white/10 hover:bg-white hover:text-black backdrop-blur-md text-white flex items-center justify-center transition-colors"
                  >
                    <Phone className="w-4 h-4 sm:w-5 sm:h-5" />
                  </motion.a>

                  {/* Pure Icon Jump-to-Menu Button */}
                  <motion.a
                    whileHover={{ scale: 1.06 }}
                    whileTap={{ scale: 0.94 }}
                    href="#menu"
                    onClick={scrollToMenu}
                    aria-label={dict.hero.menuCta}
                    title={dict.hero.menuCta}
                    className="w-11 h-11 sm:w-14 sm:h-14 rounded-full bg-white/10 hover:bg-[#FFB800] hover:text-black backdrop-blur-md text-white flex items-center justify-center transition-colors"
                  >
                    <UtensilsCrossed className="w-4 h-4 sm:w-5 sm:h-5" />
                  </motion.a>
                </div>
              </div>

              {/* Interactive Slide Selector Dots (`01 / 02 / 03`) */}
              <div className="pt-1 flex items-center gap-2">
                {slides.map((s, idx) => {
                  const isActive = idx === safeIdx;
                  return (
                    <button
                      key={s.id}
                      type="button"
                      onClick={() => goToSlide(idx)}
                      aria-label={`${s.titleLine1} ${s.titleAccent}`}
                      className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                        isActive
                          ? 'w-9 bg-gradient-to-r from-[#FF6B00] to-[#FFB800]'
                          : 'w-2.5 bg-white/25 hover:bg-white/50'
                      }`}
                    />
                  );
                })}
              </div>
            </div>

            {/* Right Column: 2.5D Scroll-Driven Multi-Slide Exploded Dish Stage */}
            <div className="lg:col-span-6 min-w-0 relative flex items-center justify-center z-10 pt-2 pb-1 lg:py-0">
              <AnimatePresence mode="wait" custom={direction}>
                <motion.div
                  key={heroSlide.id}
                  initial={{ opacity: 0, x: direction * 42, scale: 0.92, filter: 'blur(6px)' }}
                  animate={{ opacity: 1, x: 0, scale: 1, filter: 'blur(0px)' }}
                  exit={{ opacity: 0, x: direction * -42, scale: 0.92, filter: 'blur(6px)' }}
                  transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                  drag="x"
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={0.22}
                  onDragEnd={(_, info) => {
                    if (info.offset.x < -55) paginate(1);
                    else if (info.offset.x > 55) paginate(-1);
                  }}
                  className="relative w-[210px] sm:w-[325px] lg:w-[420px] aspect-square flex items-center justify-center select-none cursor-grab active:cursor-grabbing"
                >
                  {activeLayers.map((layer, idx) => (
                    <ExplodedLayerItem
                      key={layer.src}
                      layer={layer}
                      alt={heroSlide.layerLabels[idx] || heroSlide.titleAccent}
                      smoothProgress={smoothProgress}
                    />
                  ))}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* Subtle Scroll Chevron + Kinetic Ticker Strip */}
        <div className="relative z-20 w-full">
          <motion.div
            style={{ opacity: scrollHintOpacity }}
            className="flex items-center justify-center gap-1.5 pb-2 text-[10px] font-mono uppercase tracking-[0.25em] text-zinc-400 pointer-events-none"
          >
            <span>{dict.hero.scrollHint}</span>
            <ChevronDown className="w-3.5 h-3.5 text-[#FFB800] animate-bounce" />
          </motion.div>

          <div className="w-full border-y border-white/10 bg-[#0D0F14]/90 backdrop-blur-md h-10 overflow-hidden">
            <div className="animate-marquee absolute top-0 left-0 h-full flex items-center gap-8 whitespace-nowrap text-xs font-mono font-bold uppercase tracking-[0.22em] text-zinc-300">
              {[...dict.hero.marqueeItems, ...dict.hero.marqueeItems].map((item, i) => (
                <span key={i} className="inline-flex items-center gap-8">
                  <span>{item}</span>
                  <span className="text-[#FF6B00]">✦</span>
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
