'use client';

import React, { useState, useRef } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Star, ExternalLink, ChevronLeft, ChevronRight, PenLine } from 'lucide-react';
import { SiteDictionary, businessInfo } from '@/data/siteData';

interface ReviewsSectionProps {
  dict: SiteDictionary;
}

export default function ReviewsSection({ dict }: ReviewsSectionProps) {
  const [expandedMap, setExpandedMap] = useState<Record<string, boolean>>({});
  const sliderRef = useRef<HTMLDivElement | null>(null);
  const isDraggingRef = useRef(false);
  const startXRef = useRef(0);
  const scrollLeftRef = useRef(0);

  const toggleExpand = (id: string) => {
    setExpandedMap((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const scrollByStep = (dir: -1 | 1) => {
    if (!sliderRef.current) return;
    const cardWidth = window.innerWidth < 640 ? 310 : 410;
    sliderRef.current.scrollBy({
      left: dir * cardWidth,
      behavior: 'smooth',
    });
  };

  // PC Mouse Drag-to-Scroll on Single-Row Slider
  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!sliderRef.current) return;
    isDraggingRef.current = true;
    startXRef.current = e.pageX - sliderRef.current.offsetLeft;
    scrollLeftRef.current = sliderRef.current.scrollLeft;
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDraggingRef.current || !sliderRef.current) return;
    e.preventDefault();
    const x = e.pageX - sliderRef.current.offsetLeft;
    const walk = (x - startXRef.current) * 1.4;
    sliderRef.current.scrollLeft = scrollLeftRef.current - walk;
  };

  const stopMouseDrag = () => {
    isDraggingRef.current = false;
  };

  return (
    <section
      id="reviews"
      className="relative py-20 sm:py-28 bg-[#0D0F14] overflow-x-clip border-b border-white/10"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Clean Unboxed Header + Rating + Arrow Controls */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
          <div>
            <span className="text-xs font-mono font-bold uppercase tracking-[0.24em] text-[#FF6B00] block mb-2">
              {dict.reviews.badge}
            </span>
            <div className="flex flex-wrap items-baseline gap-4">
              <h2 className="font-display text-4xl sm:text-6xl font-black uppercase tracking-tight text-white leading-none">
                {dict.reviews.title}
              </h2>
              <div className="inline-flex flex-wrap items-center gap-2.5">
                <span className="font-display text-2xl sm:text-3xl font-black text-[#FFB800]">
                  {dict.reviews.ratingScore}
                </span>
                <div className="flex items-center gap-0.5" aria-hidden="true">
                  {[0, 1, 2, 3].map((i) => (
                    <Star
                      key={i}
                      className="w-3.5 h-3.5 text-[#FFB800] fill-[#FFB800]"
                    />
                  ))}
                  <Star className="w-3.5 h-3.5 text-[#FFB800]/50 fill-[#FFB800]/30" />
                </div>
                <span className="px-2.5 py-0.5 rounded-full bg-white/6 border border-white/10 text-[11px] font-mono text-zinc-300">
                  {dict.reviews.reviewCountBadge}
                </span>
              </div>
            </div>
          </div>

          {/* Pure Icon Navigation Arrows + Google Links */}
          <div className="flex items-center gap-2.5 shrink-0">
            <motion.button
              whileHover={{ scale: 1.06 }}
              whileTap={{ scale: 0.94 }}
              type="button"
              onClick={() => scrollByStep(-1)}
              aria-label="Previous review"
              className="w-11 h-11 rounded-full bg-white/8 hover:bg-white/18 text-white flex items-center justify-center transition-colors cursor-pointer"
            >
              <ChevronLeft className="w-5 h-5" />
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.06 }}
              whileTap={{ scale: 0.94 }}
              type="button"
              onClick={() => scrollByStep(1)}
              aria-label="Next review"
              className="w-11 h-11 rounded-full bg-white/8 hover:bg-[#FFB800] text-white hover:text-black flex items-center justify-center transition-colors cursor-pointer"
            >
              <ChevronRight className="w-5 h-5" />
            </motion.button>

            <span className="w-[1px] h-6 bg-white/10 mx-1" />

            <motion.a
              whileHover={{ scale: 1.06 }}
              whileTap={{ scale: 0.94 }}
              href={businessInfo.googleReviewsUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={dict.reviews.viewAllLabel}
              title={dict.reviews.viewAllLabel}
              className="w-11 h-11 rounded-full bg-white/8 hover:bg-white/18 text-white flex items-center justify-center transition-colors"
            >
              <ExternalLink className="w-4 h-4 text-[#FFB800]" />
            </motion.a>

            <motion.a
              whileHover={{ scale: 1.06 }}
              whileTap={{ scale: 0.94 }}
              href={businessInfo.googleReviewsUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={dict.reviews.writeReviewLabel}
              title={dict.reviews.writeReviewLabel}
              className="w-11 h-11 rounded-full bg-[#FF6B00] hover:bg-[#FFB800] text-black flex items-center justify-center transition-colors"
            >
              <PenLine className="w-4 h-4" />
            </motion.a>
          </div>
        </div>

        {/* Single-Row Horizontal Slider */}
        <div
          ref={sliderRef}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={stopMouseDrag}
          onMouseLeave={stopMouseDrag}
          className="flex gap-8 overflow-x-auto no-scrollbar snap-x snap-mandatory pb-4 cursor-grab active:cursor-grabbing select-none"
        >
          {dict.reviews.items.map((rev) => {
            const isExpanded = expandedMap[rev.id] ?? false;
            const isLong = rev.text.length > 165;
            const displayedText =
              !isLong || isExpanded ? rev.text : `${rev.text.slice(0, 165)}...`;

            return (
              <article
                key={rev.id}
                className="min-w-[295px] sm:min-w-[365px] max-w-[390px] shrink-0 snap-start pt-6 border-t border-white/15 flex flex-col justify-between space-y-5"
              >
                <div className="space-y-4">
                  {/* Reviewer Header */}
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="relative w-10 h-10 rounded-full overflow-hidden bg-zinc-800 shrink-0">
                        <Image
                          src={rev.avatar}
                          alt={rev.name}
                          fill
                          sizes="40px"
                          draggable={false}
                          className="object-cover pointer-events-none"
                        />
                      </div>
                      <div>
                        <h3 className="font-bold text-white text-sm">{rev.name}</h3>
                        <div className="flex items-center gap-0.5 mt-0.5">
                          {[...Array(rev.rating)].map((_, i) => (
                            <Star
                              key={i}
                              className="w-3 h-3 text-[#FFB800] fill-[#FFB800]"
                            />
                          ))}
                        </div>
                      </div>
                    </div>

                    <a
                      href={rev.googleLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Google Maps"
                      onClick={(e) => e.stopPropagation()}
                      className="text-zinc-500 hover:text-[#FFB800] transition-colors"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </div>

                  {/* Review Body */}
                  <div className="text-sm text-zinc-300 leading-relaxed">
                    <p>“{displayedText}”</p>
                    {isLong && (
                      <button
                        type="button"
                        onClick={() => toggleExpand(rev.id)}
                        className="mt-1.5 text-xs font-mono font-bold uppercase tracking-wider text-[#FFB800] hover:underline cursor-pointer"
                      >
                        {isExpanded ? dict.reviews.lessLabel : dict.reviews.moreLabel}
                      </button>
                    )}
                  </div>
                </div>

                {/* Unboxed Sub-ratings */}
                {rev.extras && rev.extras.length > 0 && (
                  <div className="pt-2 flex flex-wrap gap-x-4 gap-y-1 text-[11px] font-mono text-zinc-500">
                    {rev.extras.map((ex, i) => (
                      <span key={i}>
                        {ex.label}: <strong className="text-zinc-300">{ex.value}</strong>
                      </span>
                    ))}
                  </div>
                )}
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
