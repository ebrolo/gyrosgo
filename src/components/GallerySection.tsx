'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react';
import { SiteDictionary } from '@/data/siteData';
import { useScrollLock } from '@/components/SmoothScrollProvider';

interface GallerySectionProps {
  dict: SiteDictionary;
}

const slideVariants: Variants = {
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
      x: { duration: 0.3, ease: [0.16, 1, 0.3, 1] },
      opacity: { duration: 0.2 },
      scale: { duration: 0.25 },
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

const swipeConfidenceThreshold = 8000;
const swipePower = (offset: number, velocity: number) => Math.abs(offset) * velocity;

export default function GallerySection({ dict }: GallerySectionProps) {
  const items = dict.gallery.items;
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [direction, setDirection] = useState<number>(1);
  const thumbRefs = useRef<(HTMLButtonElement | null)[]>([]);

  // Lock background page scroll (both Lenis and native overflow) while Lightbox is open
  useScrollLock(activeIndex !== null);

  const closeLightbox = useCallback(() => {
    setActiveIndex(null);
  }, []);

  const paginate = useCallback(
    (newDirection: number) => {
      if (activeIndex === null || !items.length) return;
      setDirection(newDirection);
      const total = items.length;
      const nextIndex = (activeIndex + newDirection + total) % total;
      setActiveIndex(nextIndex);
    },
    [activeIndex, items.length]
  );

  const selectThumbnail = (targetIdx: number) => {
    if (activeIndex === null || targetIdx === activeIndex) return;
    setDirection(targetIdx > activeIndex ? 1 : -1);
    setActiveIndex(targetIdx);
  };

  // Preload adjacent images & keep active thumbnail centered in the bottom filmstrip
  useEffect(() => {
    if (activeIndex === null || !items.length) return;
    const total = items.length;
    const nextImg = new window.Image();
    nextImg.src = items[(activeIndex + 1) % total].src;
    const prevImg = new window.Image();
    prevImg.src = items[(activeIndex - 1 + total) % total].src;

    const activeThumb = thumbRefs.current[activeIndex];
    if (activeThumb) {
      activeThumb.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'center',
      });
    }
  }, [activeIndex, items]);

  // Keyboard navigation
  useEffect(() => {
    if (activeIndex === null) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') paginate(-1);
      if (e.key === 'ArrowRight') paginate(1);
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [activeIndex, closeLightbox, paginate]);

  return (
    <section
      id="gallery"
      className="relative py-20 sm:py-28 bg-[#0A0B0E] overflow-x-clip border-b border-white/10"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Clean Unboxed Header */}
        <div className="mb-12">
          <span className="text-xs font-mono font-bold uppercase tracking-[0.24em] text-[#FF6B00] block mb-2">
            {dict.gallery.badge}
          </span>
          <h2 className="font-display text-4xl sm:text-6xl font-black uppercase tracking-tight text-white leading-none">
            {dict.gallery.title}
          </h2>
        </div>

        {/* Clean 4-Column Photo Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3.5 sm:gap-5">
          {items.map((item, idx) => (
            <motion.button
              whileHover={{ y: -3 }}
              whileTap={{ scale: 0.98 }}
              key={item.id}
              type="button"
              onClick={() => {
                setDirection(1);
                setActiveIndex(idx);
              }}
              className="group relative aspect-square rounded-2xl overflow-hidden bg-zinc-900 text-left focus:outline-none cursor-pointer"
            >
              <Image
                src={item.src}
                alt={item.title}
                fill
                sizes="(max-width: 768px) 48vw, 24vw"
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/65 backdrop-blur-md text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <Maximize2 className="w-3.5 h-3.5" />
              </div>
              <div className="absolute bottom-3 left-3.5 right-3.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="font-display text-base font-bold uppercase text-white">
                  {item.title}
                </div>
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Fullscreen Lightbox Modal with PC Drag, Touch Swipe, Scroll-Lock & Bottom Filmstrip */}
      <AnimatePresence>
        {activeIndex !== null && items[activeIndex] && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={closeLightbox}
            data-lenis-prevent
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-2xl flex flex-col items-center justify-between p-4 sm:p-6 select-none overflow-hidden"
          >
            {/* Top Bar: Counter & Close Icon */}
            <div
              className="w-full max-w-6xl flex items-center justify-between z-50 mx-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <span className="text-xs font-mono font-bold text-zinc-300 bg-white/8 px-3.5 py-1.5 rounded-full">
                {activeIndex + 1} / {items.length}
              </span>
              <button
                type="button"
                onClick={closeLightbox}
                aria-label="Close lightbox"
                className="w-11 h-11 rounded-full bg-white/10 hover:bg-[#FF6B00] hover:text-black text-white flex items-center justify-center transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Main Interactive Draggable Stage (PC Mouse Grab + Mobile Swipe) */}
            <div
              className="relative w-full max-w-6xl flex-1 my-3 flex items-center justify-center mx-auto px-12 sm:px-20 overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Left Outside Arrow */}
              <button
                type="button"
                onClick={() => paginate(-1)}
                aria-label="Previous image"
                className="absolute left-1 sm:left-3 top-1/2 -translate-y-1/2 z-50 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-white/10 hover:bg-[#FFB800] text-white hover:text-black flex items-center justify-center transition-colors cursor-pointer"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>

              {/* Right Outside Arrow */}
              <button
                type="button"
                onClick={() => paginate(1)}
                aria-label="Next image"
                className="absolute right-1 sm:right-3 top-1/2 -translate-y-1/2 z-50 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-white/10 hover:bg-[#FFB800] text-white hover:text-black flex items-center justify-center transition-colors cursor-pointer"
              >
                <ChevronRight className="w-6 h-6" />
              </button>

              {/* Draggable Slide Card */}
              <AnimatePresence initial={false} custom={direction}>
                <motion.div
                  key={activeIndex}
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  drag="x"
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={0.85}
                  onDragEnd={(_, { offset, velocity }) => {
                    const swipe = swipePower(offset.x, velocity.x);
                    if (swipe < -swipeConfidenceThreshold || offset.x < -55) {
                      paginate(1);
                    } else if (swipe > swipeConfidenceThreshold || offset.x > 55) {
                      paginate(-1);
                    }
                  }}
                  className="absolute inset-0 flex flex-col items-center justify-center cursor-grab active:cursor-grabbing px-12 sm:px-20 touch-pan-y"
                >
                  <div className="relative w-full h-full max-w-4xl rounded-2xl overflow-hidden flex items-center justify-center">
                    <Image
                      src={items[activeIndex].src}
                      alt={items[activeIndex].title}
                      fill
                      sizes="90vw"
                      draggable={false}
                      className="object-contain pointer-events-none select-none"
                      priority
                    />
                  </div>
                  <div className="mt-3 text-center pointer-events-none">
                    <h4 className="font-display text-lg sm:text-xl font-bold uppercase text-white tracking-wide">
                      {items[activeIndex].title}
                    </h4>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Bottom Clickable Thumbnail Filmstrip (`galériasáv`) */}
            <div
              className="w-full max-w-4xl z-50 pb-1 flex justify-center mx-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center gap-2.5 overflow-x-auto py-2 px-3 rounded-2xl bg-white/[0.06] backdrop-blur-xl border border-white/10 max-w-full no-scrollbar">
                {items.map((item, thumbIdx) => {
                  const isCurrent = thumbIdx === activeIndex;
                  return (
                    <button
                      key={item.id}
                      ref={(el) => {
                        thumbRefs.current[thumbIdx] = el;
                      }}
                      type="button"
                      onClick={() => selectThumbnail(thumbIdx)}
                      aria-label={item.title}
                      className={`relative w-14 sm:w-18 h-12 sm:h-14 rounded-xl overflow-hidden shrink-0 transition-all duration-200 cursor-pointer ${
                        isCurrent
                          ? 'ring-2 ring-[#FFB800] opacity-100 scale-105'
                          : 'opacity-40 hover:opacity-85'
                      }`}
                    >
                      <Image
                        src={item.src}
                        alt={item.title}
                        fill
                        sizes="72px"
                        draggable={false}
                        className="object-cover pointer-events-none"
                      />
                    </button>
                  );
                })}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
