'use client';

import React, { useRef, useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
  useSpring,
  useMotionValueEvent,
} from 'framer-motion';
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
import SeaSpongeIcon from '@/components/SeaSpongeIcon';

interface HeroSectionProps {
  dict: SiteDictionary;
  getCartQty: (key: string) => number;
  onAddHeroSlide: (slide: HeroSlide) => void;
  onUpdateQty: (key: string, delta: number) => void;
  onTriggerSecret: () => void;
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
      yStart: '-26.5%',
      yEnd: '-56%',
      rotEnd: -2.6,
      scaleStart: 0.94,
      scaleEnd: 0.89,
    },
    {
      src: '/images/hero/layer-2-bacon-pickles.webp',
      w: 900,
      h: 313,
      zIndex: 40,
      yStart: '-13%',
      yEnd: '-28%',
      rotEnd: 2.1,
      scaleStart: 0.95,
      scaleEnd: 0.9,
    },
    {
      src: '/images/hero/layer-3-patty-cheddar.webp',
      w: 900,
      h: 324,
      zIndex: 30,
      yStart: '-0.5%',
      yEnd: '0%',
      rotEnd: -1.2,
      scaleStart: 0.95,
      scaleEnd: 0.91,
    },
    {
      src: '/images/hero/layer-4-patty-sauce.webp',
      w: 900,
      h: 338,
      zIndex: 20,
      yStart: '13%',
      yEnd: '28%',
      rotEnd: 1.6,
      scaleStart: 0.95,
      scaleEnd: 0.9,
    },
    {
      src: '/images/hero/layer-5-bottom-bun.webp',
      w: 900,
      h: 281,
      zIndex: 10,
      yStart: '26.5%',
      yEnd: '55%',
      rotEnd: -1.4,
      scaleStart: 0.94,
      scaleEnd: 0.89,
    },
  ],
  'smash-box-6db': [
    {
      src: '/images/hero/box-layer-1-top-burgers.webp',
      w: 920,
      h: 231,
      zIndex: 25,
      yStart: '-20%',
      yEnd: '-49%',
      rotEnd: -2.2,
      scaleStart: 0.9,
      scaleEnd: 0.9,
    },
    {
      src: '/images/hero/box-layer-2-mid-burgers.webp',
      w: 920,
      h: 250,
      zIndex: 35,
      yStart: '-3.5%',
      yEnd: '-16.5%',
      rotEnd: 1.8,
      scaleStart: 0.93,
      scaleEnd: 0.92,
    },
    {
      src: '/images/hero/box-layer-3-fries-sauces.webp',
      w: 920,
      h: 219,
      zIndex: 45,
      yStart: '13%',
      yEnd: '15%',
      rotEnd: -1.1,
      scaleStart: 0.92,
      scaleEnd: 0.93,
    },
    {
      src: '/images/hero/box-layer-4-tray.webp',
      w: 920,
      h: 336,
      zIndex: 15,
      yStart: '19.5%',
      yEnd: '47%',
      rotEnd: 1.2,
      scaleStart: 1.02,
      scaleEnd: 0.94,
    },
  ],
  'cheddar-sajtos-burger': [
    {
      src: '/images/hero/cheddar-layer-1-crown.webp',
      w: 920,
      h: 420,
      zIndex: 55,
      yStart: '-27.5%',
      yEnd: '-51%',
      rotEnd: -2.2,
      scaleStart: 0.78,
      scaleEnd: 0.76,
    },
    {
      src: '/images/hero/cheddar-layer-2-molten-wave.webp',
      w: 920,
      h: 444,
      zIndex: 46,
      yStart: '-5.5%',
      yEnd: '-21%',
      rotEnd: 1.3,
      scaleStart: 0.96,
      scaleEnd: 0.91,
      isMoltenSauce: true,
    },
    {
      src: '/images/hero/cheddar-layer-3-bacon-jam.webp',
      w: 920,
      h: 252,
      zIndex: 34,
      yStart: '5.5%',
      yEnd: '5%',
      rotEnd: -1.6,
      scaleStart: 0.92,
      scaleEnd: 0.9,
    },
    {
      src: '/images/hero/cheddar-layer-4-patty.webp',
      w: 920,
      h: 262,
      zIndex: 24,
      yStart: '14%',
      yEnd: '28.5%',
      rotEnd: 1.4,
      scaleStart: 0.93,
      scaleEnd: 0.91,
    },
    {
      src: '/images/hero/cheddar-layer-5-heel.webp',
      w: 920,
      h: 260,
      zIndex: 14,
      yStart: '24%',
      yEnd: '52%',
      rotEnd: -1.3,
      scaleStart: 0.89,
      scaleEnd: 0.88,
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

  return (
    <motion.div
      style={{
        y,
        rotate,
        scale,
        zIndex: layer.zIndex,
        transformOrigin: '50% 50%',
      }}
      className="absolute inset-0 flex items-center justify-center pointer-events-none will-change-transform"
    >
      {layer.isMoltenSauce ? (
        <div className="relative w-full flex items-center justify-center">
          <div className="w-full relative">
            <Image
              src={layer.src}
              alt={alt}
              width={layer.w}
              height={layer.h}
              sizes="(max-width: 640px) 220px, (max-width: 1024px) 340px, 460px"
              priority
              draggable={false}
              className="w-full h-auto object-contain drop-shadow-[0_18px_28px_rgba(0,0,0,0.78)]"
            />

            {/* Animated Gooey Creamy-Cheddar Drips falling directly from the real crown-pour lobes */}
            <svg
              viewBox="0 0 400 193"
              className="absolute inset-0 w-full h-full pointer-events-none overflow-visible"
              aria-hidden="true"
            >
              <defs>
                <linearGradient id="moltenCheddarGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#F5CE69" />
                  <stop offset="60%" stopColor="#E9B244" />
                  <stop offset="100%" stopColor="#D6972A" />
                </linearGradient>
                <filter id="cheddarGoo">
                  <feGaussianBlur in="SourceGraphic" stdDeviation="2.8" result="blur" />
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
                {/* Anchor nibs tucked cleanly inside the two real yellow cheddar drip tips (zero overlap on toasted brioche!) */}
                <ellipse cx="44" cy="103" rx="4.2" ry="6.5" fill="url(#moltenCheddarGrad)" />
                <ellipse cx="335" cy="179" rx="5.5" ry="8.5" fill="url(#moltenCheddarGrad)" />

                {/* Drip 1 (Far-left yellow cheddar lip edge) */}
                <motion.ellipse
                  cx="44"
                  rx="3.8"
                  fill="url(#moltenCheddarGrad)"
                  animate={{
                    cy: [103, 122, 156],
                    ry: [5, 7.6, 3.8],
                    opacity: [0.95, 1, 0],
                  }}
                  transition={{
                    duration: 2.75,
                    repeat: Infinity,
                    ease: [0.4, 0, 0.85, 1],
                    delay: 0.85,
                  }}
                />

                {/* Drip 2 (Main Right hanging cheddar cascade — matching the real photo's bottom-right drop!) */}
                <motion.ellipse
                  cx="335"
                  rx="5.2"
                  fill="url(#moltenCheddarGrad)"
                  animate={{
                    cy: [179, 205, 248],
                    ry: [7, 10, 5],
                    opacity: [0.95, 1, 0],
                  }}
                  transition={{
                    duration: 2.35,
                    repeat: Infinity,
                    ease: [0.4, 0, 0.85, 1],
                    delay: 0.1,
                  }}
                />
              </g>
            </svg>
          </div>
        </div>
      ) : (
        <Image
          src={layer.src}
          alt={alt}
          width={layer.w}
          height={layer.h}
          sizes="(max-width: 640px) 220px, (max-width: 1024px) 340px, 460px"
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
  onTriggerSecret,
}: HeroSectionProps) {
  const containerRef = useRef<HTMLElement | null>(null);
  const slides = dict.hero.slides;
  const [[activeIdx, direction], setSlideState] = useState<[number, number]>([0, 1]);
  const [activeIngIdx, setActiveIngIdx] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const safeIdx = activeIdx % slides.length;
  const heroSlide = slides[safeIdx];
  const activeLayers = SLIDE_LAYER_MAP[heroSlide.id] || SLIDE_LAYER_MAP['dupla-smash-burger'];

  const heroCartKey = `${heroSlide.id}__base__single`;
  const heroItemQty = getCartQty(heroCartKey);

  // Reset scroll to the very top of #home so the new dish starts assembled at progress=0
  const resetHeroScrollToTop = useCallback(() => {
    setActiveIngIdx(0);
    if (typeof window === 'undefined') return;
    if (window.scrollY > 2) {
      if (window.__lenis) {
        window.__lenis.scrollTo(0, { duration: 0.55 });
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  }, []);

  const paginateManual = useCallback(
    (dir: -1 | 1) => {
      resetHeroScrollToTop();
      setSlideState(([prev]) => [(prev + dir + slides.length) % slides.length, dir]);
    },
    [slides.length, resetHeroScrollToTop]
  );

  const goToSlide = useCallback(
    (targetIdx: number) => {
      resetHeroScrollToTop();
      if (targetIdx === safeIdx) return;
      setSlideState([targetIdx, targetIdx > safeIdx ? 1 : -1]);
    },
    [safeIdx, resetHeroScrollToTop]
  );

  // 10-second Auto-Advance (only when near top of Hero and user is not hovering/interacting)
  useEffect(() => {
    if (isPaused) return;
    const timer = window.setInterval(() => {
      if (document.hidden) return;
      if (window.scrollY > 45) return;
      setActiveIngIdx(0);
      setSlideState(([prev]) => [(prev + 1) % slides.length, 1]);
    }, 10000);
    return () => window.clearInterval(timer);
  }, [slides.length, activeIdx, isPaused]);

  // Keyboard Left / Right navigation when hero is visible
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (window.scrollY > window.innerHeight * 1.4) return;
      if (
        document.activeElement &&
        ['INPUT', 'TEXTAREA'].includes(document.activeElement.tagName)
      ) {
        return;
      }
      if (e.key === 'ArrowLeft') paginateManual(-1);
      if (e.key === 'ArrowRight') paginateManual(1);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [paginateManual]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 180,
    damping: 28,
    mass: 0.25,
  });

  // Sequentially cycle through heroSlide.layerLabels one-by-one as user scrolls down #home
  const totalIngCount = Math.max(1, heroSlide.layerLabels.length);
  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    const clamped = Math.max(0, Math.min(0.82, latest));
    const nextIdx = Math.min(
      totalIngCount - 1,
      Math.floor((clamped / 0.82) * totalIngCount)
    );
    setActiveIngIdx((prev) => (prev === nextIdx ? prev : nextIdx));
  });

  const currentIngredient =
    heroSlide.layerLabels[Math.min(activeIngIdx, totalIngCount - 1)] ||
    heroSlide.layerLabels[0];

  const bgWordY = useTransform(smoothProgress, [0, 1], ['0%', '-8%']);
  const bgWordScale = useTransform(smoothProgress, [0, 1], [1, 1.05]);
  const titleLine1Y = useTransform(smoothProgress, [0, 0.88], ['0%', '-24%']);
  const titleLine1X = useTransform(smoothProgress, [0, 0.88], ['0%', '-3%']);
  const titleAccentY = useTransform(smoothProgress, [0, 0.88], ['0%', '-12%']);
  const titleAccentX = useTransform(smoothProgress, [0, 0.88], ['0%', '4.5%']);
  const titleAccentScale = useTransform(smoothProgress, [0, 0.88], [1, 1.05]);
  const leftMetaY = useTransform(smoothProgress, [0, 0.88], [0, -10]);
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

        {/* Left & Right Edge Pagination Arrows (resets scroll to top on click!) */}
        <motion.button
          type="button"
          onClick={() => paginateManual(-1)}
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
          onClick={() => paginateManual(1)}
          whileHover={{ scale: 1.08, x: 2 }}
          whileTap={{ scale: 0.92 }}
          aria-label={dict.hero.nextSlideAria}
          title={dict.hero.nextSlideAria}
          className="absolute right-2 sm:right-4 lg:right-6 top-[56%] lg:top-1/2 -translate-y-1/2 z-30 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-black/55 hover:bg-[#FFB800] border border-white/15 hover:border-[#FFB800] backdrop-blur-md text-white hover:text-black flex items-center justify-center shadow-xl transition-colors cursor-pointer"
        >
          <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 stroke-[2.5]" />
        </motion.button>

        {/* Main Wide Full-Viewport Hero Grid */}
        <div
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          className="relative z-10 w-full max-w-[1860px] mx-auto px-10 sm:px-16 lg:px-24 2xl:px-28 my-auto"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-10 items-center">
            {/* Left Column: Minimalist Monumental Headline + Scroll-Cycling Ingredient + Pure Price & Icons */}
            <div className="lg:col-span-6 min-w-0 space-y-3 sm:space-y-5 text-left relative z-20">
              <AnimatePresence mode="wait" custom={direction}>
                <motion.div
                  key={heroSlide.id}
                  initial={{ opacity: 0, x: direction * 24, filter: 'blur(4px)' }}
                  animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                  exit={{ opacity: 0, x: direction * -24, filter: 'blur(4px)' }}
                  transition={{ duration: 0.26, ease: [0.22, 1, 0.36, 1] }}
                  className="space-y-3 sm:space-y-4"
                >
                  <h1 className="font-display font-black uppercase tracking-tight leading-[0.95] text-[2.45rem] sm:text-7xl xl:text-[5.5rem] 2xl:text-[6.2rem] text-white drop-shadow-[0_8px_30px_rgba(0,0,0,0.9)]">
                    <motion.span
                      style={{ y: titleLine1Y, x: titleLine1X }}
                      className="block will-change-transform"
                    >
                      {heroSlide.titleLine1}
                    </motion.span>
                    <motion.span
                      style={{
                        y: titleAccentY,
                        x: titleAccentX,
                        scale: titleAccentScale,
                        transformOrigin: '0% 50%',
                      }}
                      className="block pt-1.5 -mt-1 text-transparent bg-clip-text bg-gradient-to-r from-[#FF6B00] via-[#FF8C00] to-[#FFB800] will-change-transform"
                    >
                      {heroSlide.titleAccent}
                    </motion.span>
                  </h1>

                  {/* Scroll-Cycling Sequential Ingredient Ticker (Zero numbering — pure clean motion!) */}
                  <motion.div
                    style={{ y: leftMetaY }}
                    className="h-8 sm:h-10 flex items-center gap-2.5 overflow-hidden will-change-transform"
                  >
                    <span
                      aria-hidden="true"
                      className="w-2 h-2 rounded-full bg-[#FFB800] shadow-[0_0_10px_#FFB800] shrink-0"
                    />

                    <div className="relative flex-1 h-full flex items-center overflow-hidden">
                      <AnimatePresence mode="wait">
                        <motion.span
                          key={`${heroSlide.id}-${activeIngIdx}`}
                          initial={{ opacity: 0, y: 16, filter: 'blur(4px)' }}
                          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                          exit={{ opacity: 0, y: -16, filter: 'blur(4px)' }}
                          transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
                          className="font-display text-sm sm:text-xl font-bold uppercase tracking-wider text-zinc-100 truncate drop-shadow-[0_4px_14px_rgba(0,0,0,0.95)]"
                        >
                          {currentIngredient}
                        </motion.span>
                      </AnimatePresence>
                    </div>
                  </motion.div>
                </motion.div>
              </AnimatePresence>

              {/* Unboxed Monumental Price + Pure Icon Controls (Zero clutter text underneath!) */}
              <div className="pt-1 sm:pt-2 flex items-center justify-between sm:justify-start gap-4 sm:gap-7">
                <div className="font-display text-3xl sm:text-5xl xl:text-6xl font-black text-[#FFB800] leading-none tracking-tight">
                  {heroSlide.priceValue}
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
                    if (info.offset.x < -55) paginateManual(1);
                    else if (info.offset.x > 55) paginateManual(-1);
                  }}
                  className="relative w-[min(215px,35dvh)] sm:w-[min(330px,43dvh)] lg:w-[min(425px,44dvh)] aspect-square flex items-center justify-center select-none cursor-grab active:cursor-grabbing"
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

        {/* Subtle Scroll Chevron + Peeking Sea-Sponge Easter Egg + Kinetic Ticker Strip */}
        <div className="relative z-20 w-full">
          <motion.div
            style={{ opacity: scrollHintOpacity }}
            className="flex items-center justify-center gap-1.5 pb-2 text-[10px] font-mono uppercase tracking-[0.25em] text-zinc-400 pointer-events-none"
          >
            <span>{dict.hero.scrollHint}</span>
            <ChevronDown className="w-3.5 h-3.5 text-[#FFB800] animate-bounce" />
          </motion.div>

          {/* Subtle Hidden Peeking Yellow Sea-Sponge Easter Egg Button */}
          <button
            type="button"
            onClick={onTriggerSecret}
            aria-label={dict.hero.secretTriggerAria}
            title={dict.hero.secretTriggerAria}
            className="group/sponge absolute right-4 sm:right-10 bottom-7 z-10 translate-y-2.5 hover:translate-y-0 opacity-45 hover:opacity-100 transition-all duration-300 cursor-pointer p-1"
          >
            <SeaSpongeIcon className="w-7 h-7 sm:w-8 sm:h-8 rotate-6 group-hover/sponge:rotate-0 drop-shadow-[0_4px_14px_rgba(255,216,20,0.5)] transition-transform duration-300" />
          </button>

          <div className="relative z-20 w-full border-y border-white/10 bg-[#0D0F14]/95 backdrop-blur-md h-10 overflow-hidden">
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
