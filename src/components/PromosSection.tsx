'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Phone } from 'lucide-react';
import { SiteDictionary, businessInfo } from '@/data/siteData';

interface PromosSectionProps {
  dict: SiteDictionary;
}

function RespondersScene({ labels }: { labels: string[] }) {
  return (
    <div className="relative w-full py-6 px-4 sm:px-6 rounded-3xl bg-gradient-to-br from-white/[0.04] to-white/[0.01] border border-white/10 overflow-hidden group/scene">
      {/* Subtle Ambient Glows */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-8 -top-8 w-36 h-36 rounded-full bg-sky-500/12 blur-2xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 w-40 h-40 rounded-full bg-[#FF6B00]/15 blur-2xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-8 -bottom-8 w-36 h-36 rounded-full bg-emerald-500/12 blur-2xl"
      />

      <div className="relative z-10 grid grid-cols-3 gap-3 sm:gap-5 items-center">
        {/* 1. Police Figure & Shield */}
        <motion.div
          whileHover={{ y: -5, scale: 1.04 }}
          transition={{ type: 'spring', stiffness: 400, damping: 22 }}
          className="flex flex-col items-center text-center gap-2"
        >
          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-sky-500/10 border border-sky-400/25 flex items-center justify-center shadow-lg">
            <svg viewBox="0 0 64 64" className="w-11 h-11 sm:w-13 sm:h-13" fill="none">
              {/* Peaked Police Cap + Officer Silhouette + Star Shield */}
              <path
                d="M14 23L32 13L50 23L46 28H18L14 23Z"
                fill="#38BDF8"
                fillOpacity="0.25"
                stroke="#38BDF8"
                strokeWidth="2.4"
                strokeLinejoin="round"
              />
              <path
                d="M19 28H45V31C45 33 40 34 32 34C24 34 19 33 19 31V28Z"
                fill="#0284C7"
                stroke="#38BDF8"
                strokeWidth="2.2"
              />
              {/* Shield Emblem */}
              <path
                d="M32 36L44 40V47C44 53.5 38.8 57.8 32 60C25.2 57.8 20 53.5 20 47V40L32 36Z"
                fill="#0EA5E9"
                fillOpacity="0.2"
                stroke="#7DD3FC"
                strokeWidth="2.4"
                strokeLinejoin="round"
              />
              <path
                d="M32 42L33.6 45.4L37.3 45.9L34.6 48.5L35.3 52.2L32 50.4L28.7 52.2L29.4 48.5L26.7 45.9L30.4 45.4L32 42Z"
                fill="#FFB800"
              />
            </svg>
          </div>
          <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-sky-300">
            {labels[0]}
          </span>
        </motion.div>

        {/* 2. Firefighter Helmet & Flame Figure */}
        <motion.div
          whileHover={{ y: -6, scale: 1.06 }}
          transition={{ type: 'spring', stiffness: 400, damping: 22 }}
          className="flex flex-col items-center text-center gap-2"
        >
          <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-[#FF6B00]/15 border border-[#FF6B00]/40 flex items-center justify-center shadow-[0_8px_25px_rgba(255,107,0,0.2)]">
            <svg viewBox="0 0 64 64" className="w-11 h-11 sm:w-13 sm:h-13" fill="none">
              {/* Firefighter Helmet Dome + Ridge + Brim + Flame Crest */}
              <path
                d="M16 32C16 21.5 23 14 32 14C41 14 48 21.5 48 32"
                fill="#FF6B00"
                fillOpacity="0.28"
                stroke="#FF8C00"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
              <path
                d="M32 11V16"
                stroke="#FFB800"
                strokeWidth="3.2"
                strokeLinecap="round"
              />
              <path
                d="M10 33C18 30.5 46 30.5 54 33C55 35.5 51 37 46 37H18C13 37 9 35.5 10 33Z"
                fill="#FFB800"
                fillOpacity="0.25"
                stroke="#FFB800"
                strokeWidth="2.3"
              />
              {/* Flame Badge Below */}
              <path
                d="M32 39C35.5 43 39 46.2 39 50.5C39 54.6 35.9 58 32 58C28.1 58 25 54.6 25 50.5C25 47.6 26.8 45.2 28.4 43.4C28.9 45.3 30.2 46.2 30.2 46.2C29.8 43.3 30.8 40.9 32 39Z"
                fill="#FF6B00"
                stroke="#FFB800"
                strokeWidth="2"
                strokeLinejoin="round"
              />
            </svg>
            <span className="absolute -top-2 -right-2 px-1.5 py-0.5 rounded-full bg-[#FFB800] text-black font-mono text-[10px] font-black shadow">
              -10%
            </span>
          </div>
          <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#FFB800]">
            {labels[1]}
          </span>
        </motion.div>

        {/* 3. Paramedic / Ambulance EMS Figure */}
        <motion.div
          whileHover={{ y: -5, scale: 1.04 }}
          transition={{ type: 'spring', stiffness: 400, damping: 22 }}
          className="flex flex-col items-center text-center gap-2"
        >
          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-emerald-500/10 border border-emerald-400/25 flex items-center justify-center shadow-lg">
            <svg viewBox="0 0 64 64" className="w-11 h-11 sm:w-13 sm:h-13" fill="none">
              {/* Responder Circle + Medical Cross + Pulse Line */}
              <circle
                cx="32"
                cy="30"
                r="17"
                fill="#10B981"
                fillOpacity="0.18"
                stroke="#34D399"
                strokeWidth="2.4"
              />
              <path
                d="M29 20H35V27H42V33H35V40H29V33H22V27H29V20Z"
                fill="#34D399"
              />
              {/* Heartbeat Lifeline */}
              <path
                d="M14 53H24L27.5 47L32 57L36 50L38.5 53H50"
                stroke="#6EE7B7"
                strokeWidth="2.4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-emerald-300">
            {labels[2]}
          </span>
        </motion.div>
      </div>
    </div>
  );
}

function GroupDealScene({ labels }: { labels: string[] }) {
  return (
    <div className="relative w-full py-5 px-4 sm:px-6 rounded-3xl bg-gradient-to-br from-white/[0.04] to-white/[0.01] border border-white/10 overflow-hidden space-y-4">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-0 top-0 w-44 h-44 rounded-full bg-[#FFB800]/12 blur-2xl"
      />

      {/* Visual Tier 1: 5 Regular Diners + 6th Golden "-50%" Diner */}
      <div className="relative z-10 flex items-center justify-between gap-3 pb-3.5 border-b border-white/8">
        <div className="flex items-end gap-1.5 sm:gap-2.5">
          {[0, 1, 2, 3, 4].map((idx) => (
            <motion.div
              key={idx}
              whileHover={{ y: -3 }}
              className="flex flex-col items-center"
            >
              <svg viewBox="0 0 28 36" className="w-5 h-7 sm:w-6 sm:h-8 text-zinc-400" fill="currentColor">
                <circle cx="14" cy="9" r="5.5" />
                <path d="M4 31c0-5.8 4.5-10 10-10s10 4.2 10 10v2H4v-2Z" />
              </svg>
            </motion.div>
          ))}

          {/* 6th Highlighted Organizer Figure with Floating -50% Badge */}
          <motion.div
            animate={{ y: [0, -3, 0] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
            className="relative flex flex-col items-center ml-1"
          >
            <span className="mb-0.5 px-1.5 py-0.5 rounded-full bg-[#FFB800] text-black font-mono text-[9px] font-black leading-none shadow">
              -50%
            </span>
            <svg viewBox="0 0 28 36" className="w-6 h-8 sm:w-7 sm:h-9 text-[#FFB800] drop-shadow-[0_0_12px_rgba(255,184,0,0.5)]" fill="currentColor">
              <circle cx="14" cy="9" r="6" />
              <path d="M3 31c0-6.2 4.9-10.5 11-10.5S25 24.8 25 31v2H3v-2Z" />
            </svg>
          </motion.div>
        </div>

        <span className="px-2.5 py-1 rounded-full bg-[#FFB800]/15 border border-[#FFB800]/30 text-[#FFB800] font-mono text-[11px] font-bold uppercase whitespace-nowrap">
          {labels[0]}
        </span>
      </div>

      {/* Visual Tier 2: 10+ Squad Unlocking -20% Total */}
      <div className="relative z-10 flex items-center justify-between gap-3">
        <div className="flex items-center -space-x-1.5 sm:-space-x-1">
          {Array.from({ length: 10 }).map((_, idx) => (
            <div
              key={idx}
              className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-gradient-to-tr from-[#FF6B00] to-[#FFB800] p-[1.5px] shadow"
            >
              <div className="w-full h-full rounded-full bg-[#12151E] flex items-center justify-center">
                <svg viewBox="0 0 20 20" className="w-3.5 h-3.5 text-[#FFB800]" fill="currentColor">
                  <circle cx="10" cy="6.5" r="3.2" />
                  <path d="M4.5 16.5c0-3 2.5-5.2 5.5-5.2s5.5 2.2 5.5 5.2H4.5Z" />
                </svg>
              </div>
            </div>
          ))}
          <span className="w-7 h-7 rounded-full bg-[#FF6B00] text-black font-mono text-[10px] font-black flex items-center justify-center shadow ml-1">
            10+
          </span>
        </div>

        <span className="px-2.5 py-1 rounded-full bg-[#FF6B00]/20 border border-[#FF6B00]/40 text-white font-mono text-[11px] font-bold uppercase whitespace-nowrap">
          {labels[1]}
        </span>
      </div>
    </div>
  );
}

export default function PromosSection({ dict }: PromosSectionProps) {
  return (
    <section
      id="promos"
      className="relative py-20 sm:py-28 bg-[#0A0B0E] overflow-x-clip border-b border-white/10"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Clean Unboxed Header */}
        <div className="mb-14">
          <span className="text-xs font-mono font-bold uppercase tracking-[0.24em] text-[#FFB800] block mb-2">
            {dict.promos.badge}
          </span>
          <h2 className="font-display text-4xl sm:text-6xl font-black uppercase tracking-tight text-white leading-none">
            {dict.promos.title}
          </h2>
        </div>

        {/* Open Two-Column Layout with Custom Self-Explanatory Vector Scenes */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {dict.promos.cards.map((card, idx) => (
            <motion.div
              key={card.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.45, delay: idx * 0.1 }}
              className="flex flex-col justify-between space-y-6 pt-6 border-t border-white/15"
            >
              <div className="space-y-5">
                <div className="flex items-baseline justify-between gap-4">
                  <div>
                    <span className="text-xs font-mono font-bold uppercase tracking-[0.2em] text-[#FF6B00] block mb-1">
                      {card.badge}
                    </span>
                    <h3 className="font-display text-2xl sm:text-3xl font-black uppercase text-white tracking-tight">
                      {card.title}
                    </h3>
                  </div>

                  {/* Huge Unboxed Discount Number */}
                  <span className="font-display text-4xl sm:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-br from-[#FF6B00] to-[#FFB800] leading-none shrink-0">
                    {card.discountText}
                  </span>
                </div>

                {/* Self-Explanatory Custom Vector Figure Scene */}
                {card.visualType === 'responders' ? (
                  <RespondersScene labels={card.visualLabels} />
                ) : (
                  <GroupDealScene labels={card.visualLabels} />
                )}

                {/* Crisp Highlights */}
                <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-zinc-300 font-medium">
                  {card.highlights.map((h, i) => (
                    <span key={i} className="inline-flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#FFB800] shrink-0" />
                      <span>{h}</span>
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-4 flex items-center justify-between gap-4 text-xs font-mono text-zinc-500 uppercase tracking-wider">
                <span>{card.footnote}</span>
                {card.id === 'promo-group' && (
                  <motion.a
                    whileHover={{ scale: 1.08 }}
                    whileTap={{ scale: 0.92 }}
                    href={businessInfo.phoneTel}
                    aria-label={businessInfo.phoneDisplay}
                    title={businessInfo.phoneDisplay}
                    className="w-10 h-10 rounded-full bg-white/10 hover:bg-[#FFB800] text-[#FFB800] hover:text-black flex items-center justify-center shrink-0 transition-colors"
                  >
                    <Phone className="w-4 h-4" />
                  </motion.a>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
