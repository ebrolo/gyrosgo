'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Phone } from 'lucide-react';
import { SiteDictionary, businessInfo } from '@/data/siteData';

interface PromosSectionProps {
  dict: SiteDictionary;
}

function RespondersOpenStage({ labels }: { labels: string[] }) {
  return (
    <div className="relative w-full py-4 select-none">
      {/* Open Ambient Floor Glows — ZERO boxes, ZERO borders */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-[8%] top-1/2 -translate-y-1/2 w-36 h-36 rounded-full bg-sky-500/14 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-[44%] top-1/2 -translate-y-1/2 w-44 h-44 rounded-full bg-[#FF6B00]/16 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-[12%] top-1/2 -translate-y-1/2 w-36 h-36 rounded-full bg-emerald-500/14 blur-3xl"
      />

      <div className="relative z-10 grid grid-cols-3 gap-4 sm:gap-8 items-end">
        {/* 1. POLICE OFFICER + ALTERNATING STROBE SIREN LIGHTBAR */}
        <motion.div
          whileHover={{ y: -6, scale: 1.05 }}
          transition={{ type: 'spring', stiffness: 360, damping: 20 }}
          className="flex flex-col items-center text-center gap-2.5"
        >
          <svg
            viewBox="0 0 120 120"
            className="w-24 h-24 sm:w-28 sm:h-28 overflow-visible"
            fill="none"
            aria-hidden="true"
          >
            {/* Soft Ground Shadow */}
            <ellipse cx="60" cy="112" rx="34" ry="5" fill="#38BDF8" fillOpacity="0.16" />

            {/* Alternating Police Emergency Beacon + Radiating Flash Rays Above Cap */}
            <g>
              {/* Blue Left Strobe Flash Rays */}
              <motion.g
                animate={{ opacity: [1, 0.15, 1] }}
                transition={{ duration: 0.85, repeat: Infinity, ease: 'easeInOut' }}
              >
                <line x1="34" y1="14" x2="26" y2="8" stroke="#38BDF8" strokeWidth="2.4" strokeLinecap="round" />
                <line x1="44" y1="9" x2="42" y2="1" stroke="#38BDF8" strokeWidth="2.4" strokeLinecap="round" />
                <path d="M40 20C40 14.5 44 11 49 11H57V20H40Z" fill="#38BDF8" />
              </motion.g>

              {/* Red Right Strobe Flash Rays */}
              <motion.g
                animate={{ opacity: [0.15, 1, 0.15] }}
                transition={{ duration: 0.85, repeat: Infinity, ease: 'easeInOut' }}
              >
                <line x1="86" y1="14" x2="94" y2="8" stroke="#FB7185" strokeWidth="2.4" strokeLinecap="round" />
                <line x1="76" y1="9" x2="78" y2="1" stroke="#FB7185" strokeWidth="2.4" strokeLinecap="round" />
                <path d="M80 20C80 14.5 76 11 71 11H63V20H80Z" fill="#F43F5E" />
              </motion.g>

              {/* Center Chrome Lightbar Divider & Base */}
              <rect x="57" y="11" width="6" height="9" rx="1.5" fill="#E2E8F0" />
              <rect x="37" y="19.5" width="46" height="3" rx="1.5" fill="#94A3B8" />
            </g>

            {/* Gentle Patrol Breathing Group */}
            <motion.g
              animate={{ y: [0, -2.5, 0] }}
              transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
            >
              {/* Uniformed Shoulders & Collar */}
              <path
                d="M22 106C22 86 38 76 60 76C82 76 98 86 98 106H22Z"
                fill="#0F2942"
                stroke="#38BDF8"
                strokeWidth="2.4"
                strokeLinejoin="round"
              />
              {/* Gold Epaulets on Shoulders */}
              <rect x="27" y="82" width="13" height="4.5" rx="2.2" transform="rotate(-16 27 82)" fill="#FFB800" />
              <rect x="80" y="78.5" width="13" height="4.5" rx="2.2" transform="rotate(16 80 78.5)" fill="#FFB800" />
              {/* Shirt V-Neck & Tie */}
              <path d="M51 76L60 89L69 76" fill="#E0F2FE" />
              <path d="M58 81H62L63 102L60 106L57 102L58 81Z" fill="#0284C7" />

              {/* Shiny Gold Shield Badge on Chest */}
              <motion.path
                d="M76 86L83 88.5V93.5C83 97.5 80 100.2 76 101.5C72 100.2 69 97.5 69 93.5V88.5L76 86Z"
                fill="#FFB800"
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
                style={{ transformOrigin: '76px 94px' }}
              />

              {/* Head & Aviator Sunglasses */}
              <circle cx="60" cy="57" r="15.5" fill="#FDBA74" />
              {/* Aviator Glasses */}
              <rect x="47" y="52" width="11" height="7" rx="3" fill="#090D16" stroke="#38BDF8" strokeWidth="1.4" />
              <rect x="62" y="52" width="11" height="7" rx="3" fill="#090D16" stroke="#38BDF8" strokeWidth="1.4" />
              <path d="M58 54.5H62" stroke="#38BDF8" strokeWidth="1.5" />

              {/* Peaked Police Officer Cap + Visor + Star Crest */}
              <path
                d="M36 42L60 28L84 42L79 49H41L36 42Z"
                fill="#0284C7"
                stroke="#7DD3FC"
                strokeWidth="2.2"
                strokeLinejoin="round"
              />
              <path
                d="M41 48H79C79 52.5 71 55 60 55C49 55 41 52.5 41 48Z"
                fill="#090D16"
                stroke="#38BDF8"
                strokeWidth="1.8"
              />
              {/* Cap Gold Star */}
              <circle cx="60" cy="39.5" r="4.2" fill="#FFB800" />
            </motion.g>
          </svg>
          <span className="text-[11px] font-mono font-bold uppercase tracking-[0.18em] text-sky-300/90">
            {labels[0]}
          </span>
        </motion.div>

        {/* 2. FIREFIGHTER + FLOWING WATER STREAM TAMING LIVE FLICKERING FLAME */}
        <motion.div
          whileHover={{ y: -6, scale: 1.05 }}
          transition={{ type: 'spring', stiffness: 360, damping: 20 }}
          className="flex flex-col items-center text-center gap-2.5"
        >
          <svg
            viewBox="0 0 130 120"
            className="w-26 h-24 sm:w-30 sm:h-28 overflow-visible"
            fill="none"
            aria-hidden="true"
          >
            <ellipse cx="62" cy="112" rx="38" ry="5" fill="#FF6B00" fillOpacity="0.2" />

            <motion.g
              animate={{ y: [0, -2.5, 0] }}
              transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut', delay: 0.25 }}
            >
              {/* Firefighter Turnout Coat + High-Vis Reflective Safety Stripes */}
              <path
                d="M20 106C20 86 35 76 56 76C77 76 92 86 92 106H20Z"
                fill="#2A1610"
                stroke="#FF6B00"
                strokeWidth="2.4"
                strokeLinejoin="round"
              />
              {/* Lime-Yellow Reflective Turnout Stripes */}
              <path d="M25 95H87" stroke="#FACC15" strokeWidth="4" strokeLinecap="round" />
              <path d="M44 77V106M68 77V106" stroke="#FACC15" strokeWidth="3" strokeOpacity="0.85" />

              {/* Face & Chinstrap */}
              <circle cx="56" cy="57" r="15" fill="#FDBA74" />
              {/* Protective Visor */}
              <rect x="43" y="50" width="26" height="8.5" rx="4" fill="#38BDF8" fillOpacity="0.35" stroke="#BAE6FD" strokeWidth="1.5" />

              {/* Classic Wide-Brim Ribbed Firefighter Helmet + 105 Shield */}
              <path
                d="M36 47C36 33 44.5 24 56 24C67.5 24 76 33 76 47"
                fill="#EA580C"
                stroke="#FFB800"
                strokeWidth="2.3"
              />
              {/* Top Comb Ridge */}
              <path d="M56 19V25" stroke="#FFB800" strokeWidth="4.5" strokeLinecap="round" />
              {/* Front Gold Shield Crest */}
              <path d="M51 32H61L59.5 43L56 45L52.5 43L51 32Z" fill="#FFB800" />
              {/* Swept Wide Helmet Brim */}
              <path
                d="M27 47.5C38 44 74 44 85 47.5C87 50 81 52 74 52H38C31 52 25 50 27 47.5Z"
                fill="#FF6B00"
                stroke="#FFB800"
                strokeWidth="2"
              />

              {/* Brass Fire Hose Nozzle */}
              <path d="M68 89L86 81" stroke="#FBBF24" strokeWidth="5" strokeLinecap="round" />
            </motion.g>

            {/* Animated Spraying Water Arc Hitting the Flame */}
            <motion.path
              d="M87 80C95 73 102 72 108 77"
              stroke="#38BDF8"
              strokeWidth="3.2"
              strokeLinecap="round"
              strokeDasharray="5 5"
              animate={{ strokeDashoffset: [20, 0] }}
              transition={{ duration: 0.55, repeat: Infinity, ease: 'linear' }}
            />

            {/* Living Multi-Layered Flickering Fire Flame on Right */}
            <motion.g
              animate={{
                scaleY: [1, 1.16, 0.94, 1.12, 1],
                scaleX: [1, 0.93, 1.06, 0.96, 1],
                rotate: [-2, 3, -3, 2, -2],
              }}
              transition={{ duration: 1.1, repeat: Infinity, ease: 'easeInOut' }}
              style={{ transformOrigin: '109px 104px' }}
            >
              <path
                d="M109 64C116 74 123 81 123 91C123 99.5 116.8 106 109 106C101.2 106 95 99.5 95 91C95 84 99 78.5 103 74C103.5 78.5 106 80.5 106 80.5C105 74 106.5 68.5 109 64Z"
                fill="#FF6B00"
              />
              <path
                d="M109 78C113 83.5 116.5 87.5 116.5 93C116.5 97.8 113.2 102 109 102C104.8 102 101.5 97.8 101.5 93C101.5 88.5 105 83.5 109 78Z"
                fill="#FACC15"
              />
            </motion.g>
          </svg>
          <span className="text-[11px] font-mono font-bold uppercase tracking-[0.18em] text-[#FFB800]">
            {labels[1]}
          </span>
        </motion.div>

        {/* 3. PARAMEDIC / AMBULANCE EMS + STETHOSCOPE & LIVE ECG HEARTBEAT PULSE */}
        <motion.div
          whileHover={{ y: -6, scale: 1.05 }}
          transition={{ type: 'spring', stiffness: 360, damping: 20 }}
          className="flex flex-col items-center text-center gap-2.5"
        >
          <svg
            viewBox="0 0 120 120"
            className="w-24 h-24 sm:w-28 sm:h-28 overflow-visible"
            fill="none"
            aria-hidden="true"
          >
            <ellipse cx="60" cy="112" rx="34" ry="5" fill="#10B981" fillOpacity="0.18" />

            <motion.g
              animate={{ y: [0, -2.5, 0] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut', delay: 0.45 }}
            >
              {/* EMS Paramedic Jacket */}
              <path
                d="M22 106C22 86 38 76 60 76C82 76 98 86 98 106H22Z"
                fill="#06392F"
                stroke="#34D399"
                strokeWidth="2.4"
                strokeLinejoin="round"
              />
              {/* Stethoscope Draped Around Neck */}
              <path
                d="M46 76C46 90 52 95 60 95C68 95 74 90 74 76"
                stroke="#CBD5E1"
                strokeWidth="3"
                strokeLinecap="round"
              />
              <circle cx="72" cy="94" r="4.5" fill="#E2E8F0" stroke="#34D399" strokeWidth="1.8" />

              {/* Head & EMS Cap with Medical Cross */}
              <circle cx="60" cy="57" r="15" fill="#FDBA74" />
              <path
                d="M43 50C43 39 50.5 32 60 32C69.5 32 77 39 77 50H43Z"
                fill="#10B981"
                stroke="#6EE7B7"
                strokeWidth="2"
              />
              <path d="M42 50H82" stroke="#6EE7B7" strokeWidth="3" strokeLinecap="round" />

              {/* Pulsing Medical Cross above Paramedic */}
              <motion.g
                animate={{ scale: [1, 1.18, 1] }}
                transition={{ duration: 1.15, repeat: Infinity, ease: 'easeInOut' }}
                style={{ transformOrigin: '60px 18px' }}
              >
                <path
                  d="M56.5 9H63.5V14.5H69V21.5H63.5V27H56.5V21.5H51V14.5H56.5V9Z"
                  fill="#34D399"
                />
              </motion.g>
            </motion.g>

            {/* Live Traveling Glowing ECG Heartbeat Wave Across Chest */}
            <path
              d="M14 96H41L47 83L55 107L63 79L69 101L74 96H106"
              stroke="#10B981"
              strokeOpacity="0.28"
              strokeWidth="2.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <motion.path
              d="M14 96H41L47 83L55 107L63 79L69 101L74 96H106"
              stroke="#6EE7B7"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ pathLength: 0, opacity: 0.2 }}
              animate={{ pathLength: [0, 1, 1], opacity: [0.3, 1, 0] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
            />
          </svg>
          <span className="text-[11px] font-mono font-bold uppercase tracking-[0.18em] text-emerald-300/90">
            {labels[2]}
          </span>
        </motion.div>
      </div>
    </div>
  );
}

function GroupDealOpenStage({ labels }: { labels: string[] }) {
  return (
    <div className="relative w-full py-4 space-y-8 select-none">
      {/* Open Ambient Gold Glow — ZERO boxes, ZERO borders */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-[10%] top-1/2 -translate-y-1/2 w-52 h-52 rounded-full bg-[#FFB800]/14 blur-3xl"
      />

      {/* VISUAL EQUATION 1: 5 Diners + 6th Crowned Golden Diner ──► Half-Sliced Burger (-50%) */}
      <div className="relative z-10 flex flex-wrap sm:flex-nowrap items-center gap-3 sm:gap-5">
        <div className="flex items-end gap-1.5 sm:gap-2.5 shrink-0">
          {/* 5 Friends Holding Mini Burgers (Sequential Wave) */}
          {[0, 1, 2, 3, 4].map((idx) => (
            <motion.div
              key={idx}
              animate={{ y: [0, -4.5, 0] }}
              transition={{
                duration: 2.0,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: idx * 0.15,
              }}
              className="flex flex-col items-center"
            >
              <span className="font-mono text-[10px] font-bold text-zinc-400 mb-0.5">
                {idx + 1}
              </span>
              <svg viewBox="0 0 32 42" className="w-7 h-9 sm:w-8 sm:h-11" fill="none" aria-hidden="true">
                <circle cx="16" cy="10" r="6" fill="#CBD5E1" />
                <path d="M5 36C5 29 9.8 24 16 24C22.2 24 27 29 27 36V39H5V36Z" fill="#64748B" />
                {/* Mini Warm Burger Held in Hand */}
                <path d="M18.5 30C18.5 27.5 21 26 24 26C27 26 29.5 27.5 29.5 30H18.5Z" fill="#F59E0B" />
                <rect x="18.5" y="30.5" width="11" height="2.2" rx="1" fill="#78350F" />
                <rect x="19" y="33.2" width="10" height="2.2" rx="1" fill="#FBBF24" />
              </svg>
            </motion.div>
          ))}

          {/* Plus Sign */}
          <span className="font-display text-xl font-black text-zinc-400 pb-2.5 px-0.5">+</span>

          {/* 6th Golden VIP Friend with Floating Crown! */}
          <motion.div
            animate={{ y: [0, -6, 0], scale: [1, 1.07, 1] }}
            transition={{ duration: 1.9, repeat: Infinity, ease: 'easeInOut' }}
            className="flex flex-col items-center"
          >
            {/* Floating Golden Crown */}
            <svg viewBox="0 0 24 14" className="w-6 h-4 mb-0.5" fill="none" aria-hidden="true">
              <path d="M2 12L4.5 3L12 8.5L19.5 3L22 12H2Z" fill="#FFB800" />
            </svg>
            <svg
              viewBox="0 0 34 42"
              className="w-8 h-10 sm:w-9 sm:h-12 drop-shadow-[0_0_18px_rgba(255,184,0,0.6)]"
              fill="none"
              aria-hidden="true"
            >
              <circle cx="17" cy="10" r="6.5" fill="#FFB800" />
              <path d="M5 36C5 28.5 10.2 23.5 17 23.5C23.8 23.5 29 28.5 29 36V39H5V36Z" fill="#FF6B00" />
              <text x="17" y="35" textAnchor="middle" fill="#090A0F" fontSize="10.5" fontWeight="900" fontFamily="monospace">
                6.
              </text>
            </svg>
          </motion.div>
        </div>

        {/* Animated Flowing Golden Stream Connecting 6th Person -> Half-Priced Burger */}
        <div className="hidden sm:flex flex-1 min-w-[28px] items-center" aria-hidden="true">
          <svg viewBox="0 0 120 16" className="w-full h-4 overflow-visible" fill="none">
            <motion.line
              x1="2"
              y1="8"
              x2="112"
              y2="8"
              stroke="#FFB800"
              strokeOpacity="0.65"
              strokeWidth="2.4"
              strokeDasharray="6 6"
              animate={{ strokeDashoffset: [24, 0] }}
              transition={{ duration: 0.9, repeat: Infinity, ease: 'linear' }}
            />
            <path d="M108 3L116 8L108 13" stroke="#FFB800" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>

        {/* Animated Half-Sliced Burger Visual Metaphor (-50% = Pay Only Half!) */}
        <div className="flex items-center gap-3.5 shrink-0 ml-auto sm:ml-0">
          <svg viewBox="0 0 68 54" className="w-16 h-13 sm:w-20 sm:h-16 overflow-visible" fill="none" aria-hidden="true">
            {/* Solid Paid Left Half of Burger */}
            <g>
              <path d="M6 25C6 14 15 8 29 8V25H6Z" fill="#FFB800" />
              <rect x="5" y="27" width="24" height="5" rx="2" fill="#92400E" />
              <path d="M6 34H29V42H11C8 42 6 39.5 6 36.5V34Z" fill="#F59E0B" />
            </g>

            {/* Right Half Gently Separating & Fading = "-50% FREE HALF!" */}
            <motion.g
              animate={{ x: [2, 9, 2], y: [0, -3.5, 0], opacity: [0.65, 0.25, 0.65] }}
              transition={{ duration: 2.1, repeat: Infinity, ease: 'easeInOut' }}
            >
              <path
                d="M33 8C47 8 56 14 56 25H33V8Z"
                stroke="#FFB800"
                strokeWidth="2.2"
                strokeDasharray="3 3"
              />
              <rect x="33" y="27" width="24" height="5" rx="2" stroke="#FF6B00" strokeWidth="2" strokeDasharray="3 3" />
              <path
                d="M33 34H56V36.5C56 39.5 54 42 51 42H33V34Z"
                stroke="#FFB800"
                strokeWidth="2.2"
                strokeDasharray="3 3"
              />
            </motion.g>

            {/* Animated Diagonal Slice Slash */}
            <motion.line
              x1="31"
              y1="3"
              x2="31"
              y2="48"
              stroke="#FFFFFF"
              strokeWidth="2.4"
              strokeLinecap="round"
              animate={{ opacity: [0.45, 1, 0.45] }}
              transition={{ duration: 2.1, repeat: Infinity, ease: 'easeInOut' }}
            />
          </svg>

          <div className="text-right">
            <div className="font-display text-2xl sm:text-3xl font-black text-[#FFB800] leading-none">
              -50%
            </div>
            <div className="text-[10px] font-mono font-bold uppercase tracking-wider text-zinc-400 mt-0.5">
              {labels[0]}
            </div>
          </div>
        </div>
      </div>

      {/* Hairline Breath Divider (No Box!) */}
      <div className="h-px w-full bg-gradient-to-r from-white/12 via-white/6 to-transparent" />

      {/* VISUAL EQUATION 2: Cheering 10+ Squad Crowd ──► Full Burger + Fries + Drink Feast (-20%) */}
      <div className="relative z-10 flex flex-wrap sm:flex-nowrap items-center gap-3 sm:gap-5">
        {/* Open Cheering 10+ Crowd Cluster */}
        <div className="flex items-center gap-2.5 shrink-0">
          <div className="flex items-end -space-x-2">
            {Array.from({ length: 10 }).map((_, idx) => {
              const isFront = idx % 2 === 0;
              return (
                <motion.svg
                  key={idx}
                  viewBox="0 0 28 38"
                  animate={{ y: isFront ? [0, -4, 0] : [-2, 2, -2] }}
                  transition={{
                    duration: 1.8,
                    repeat: Infinity,
                    ease: 'easeInOut',
                    delay: idx * 0.1,
                  }}
                  className={`w-7 h-9 sm:w-8 sm:h-11 drop-shadow-[0_4px_8px_rgba(0,0,0,0.75)] ${
                    isFront ? 'z-20 text-[#FFB800]' : 'z-10 text-[#FF6B00]/85'
                  }`}
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <circle cx="14" cy="9" r="5" />
                  {/* Celebratory Raised Arms on Every 3rd Person */}
                  {idx % 3 === 1 && (
                    <path
                      d="M4 17L9 23M24 17L19 23"
                      stroke="currentColor"
                      strokeWidth="2.8"
                      strokeLinecap="round"
                    />
                  )}
                  <path d="M5 34C5 27.8 9 23.5 14 23.5C19 23.5 23 27.8 23 34V36H5V34Z" />
                </motion.svg>
              );
            })}
          </div>

          <motion.span
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
            className="font-display text-2xl sm:text-3xl font-black text-white pl-1"
          >
            10+
          </motion.span>
        </div>

        {/* Animated Flowing Orange-Gold Stream Connecting 10+ Crowd -> Feast */}
        <div className="hidden sm:flex flex-1 min-w-[28px] items-center" aria-hidden="true">
          <svg viewBox="0 0 120 16" className="w-full h-4 overflow-visible" fill="none">
            <motion.line
              x1="2"
              y1="8"
              x2="112"
              y2="8"
              stroke="#FF6B00"
              strokeOpacity="0.7"
              strokeWidth="2.4"
              strokeDasharray="6 6"
              animate={{ strokeDashoffset: [24, 0] }}
              transition={{ duration: 0.9, repeat: Infinity, ease: 'linear' }}
            />
            <path d="M108 3L116 8L108 13" stroke="#FF6B00" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>

        {/* Shared Feast (Fries + Steaming Smash Burger + Drink) + -20% */}
        <div className="flex items-center gap-3.5 shrink-0 ml-auto sm:ml-0">
          {/* Unboxed Shared Feast Illustration (Fries + Smash Burger + Drink with Straw + Steam) */}
          <motion.svg
            viewBox="0 0 74 56"
            animate={{ y: [0, -3.5, 0] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
            className="w-16 h-13 sm:w-20 sm:h-16 overflow-visible"
            fill="none"
            aria-hidden="true"
          >
            {/* Animated Sizzling Steam Wisps Rising Above Burger */}
            <motion.path
              d="M33 15C31 11 35 8 33 4M41 16C39 12 43 9 41 5"
              stroke="#FDE68A"
              strokeWidth="2"
              strokeLinecap="round"
              animate={{ y: [2, -4], opacity: [0.85, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: 'easeOut' }}
            />

            {/* Crispy Golden Fries Fan on Left */}
            <rect x="6" y="16" width="4" height="16" rx="1.5" transform="rotate(-12 6 16)" fill="#FACC15" />
            <rect x="12" y="13" width="4" height="18" rx="1.5" fill="#FFB800" />
            <rect x="18" y="15" width="4" height="16" rx="1.5" transform="rotate(10 18 15)" fill="#F59E0B" />
            <path d="M5 27H23L20.5 47H7.5L5 27Z" fill="#EA580C" />

            {/* Cold Drink Cup + Angled Straw on Right */}
            <path d="M55 9L60 5V21" stroke="#38BDF8" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M50 21H68L65.5 47H52.5L50 21Z" fill="#1E293B" stroke="#94A3B8" strokeWidth="1.8" />
            <path d="M48.5 21H69.5" stroke="#F8FAFC" strokeWidth="2.6" strokeLinecap="round" />

            {/* Center Foreground Smash Burger */}
            <path d="M21 34C21 26 28 22 37 22C46 22 53 26 53 34H21Z" fill="#FFB800" />
            <rect x="20" y="35.5" width="34" height="4.5" rx="2" fill="#78350F" />
            <path d="M23 36H51L48 40L44 36H23Z" fill="#FACC15" />
            <rect x="21.5" y="41.5" width="31" height="5.5" rx="2.7" fill="#F59E0B" />
          </motion.svg>

          <div className="text-right">
            <div className="font-display text-2xl sm:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#FF6B00] to-[#FFB800] leading-none">
              -20%
            </div>
            <div className="text-[10px] font-mono font-bold uppercase tracking-wider text-zinc-400 mt-0.5">
              {labels[1]}
            </div>
          </div>
        </div>
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
      <div className="w-full max-w-[1860px] mx-auto px-4 sm:px-8 lg:px-12 2xl:px-16">
        {/* Clean Unboxed Header (Zero eyebrow above ÁLLANDÓ AKCIÓK) */}
        <div className="mb-14 sm:mb-16">
          <h2 className="font-display text-4xl sm:text-6xl font-black uppercase tracking-tight text-white leading-none">
            {dict.promos.title}
          </h2>
        </div>

        {/* Completely Frameless Open Two-Column Layout (Zero Boxes, Zero Card Borders) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
          {dict.promos.cards.map((card, idx) => (
            <motion.div
              key={card.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.45, delay: idx * 0.1 }}
              className="flex flex-col justify-between space-y-6"
            >
              <div className="space-y-6">
                <div className="flex items-baseline justify-between gap-4">
                  <div>
                    <span className="text-xs font-mono font-bold uppercase tracking-[0.2em] text-[#FF6B00] block mb-1">
                      {card.badge}
                    </span>
                    <h3 className="font-display text-2xl sm:text-4xl font-black uppercase text-white tracking-tight">
                      {card.title}
                    </h3>
                  </div>

                  {/* Huge Unboxed Discount Number */}
                  <span className="font-display text-4xl sm:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-br from-[#FF6B00] to-[#FFB800] leading-none shrink-0">
                    {card.discountText}
                  </span>
                </div>

                {/* Self-Explanatory Animated Open Stage (Zero Boxes!) */}
                {card.visualType === 'responders' ? (
                  <RespondersOpenStage labels={card.visualLabels} />
                ) : (
                  <GroupDealOpenStage labels={card.visualLabels} />
                )}

                {/* Crisp Unboxed Highlights */}
                <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-zinc-300 font-medium">
                  {card.highlights.map((h, i) => (
                    <span key={i} className="inline-flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#FFB800] shrink-0" />
                      <span>{h}</span>
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-2 flex items-center justify-between gap-4 text-xs font-mono text-zinc-500 uppercase tracking-wider">
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
