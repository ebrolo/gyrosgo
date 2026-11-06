'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { businessInfo } from '@/data/siteData';

interface SocialLinksProps {
  promptText?: string;
  size?: 'sm' | 'md';
  align?: 'left' | 'center';
}

const SOCIAL_ITEMS = [
  {
    id: 'facebook',
    label: 'Facebook',
    href: businessInfo.facebookUrl,
    hoverBg: 'hover:bg-[#1877F2] hover:border-[#1877F2] hover:text-white',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4" aria-hidden="true">
        <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
      </svg>
    ),
  },
  {
    id: 'instagram',
    label: 'Instagram',
    href: businessInfo.instagramUrl,
    hoverBg: 'hover:bg-gradient-to-tr hover:from-[#F58529] hover:via-[#DD2A7B] hover:to-[#8134AF] hover:border-transparent hover:text-white',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4" aria-hidden="true">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
      </svg>
    ),
  },
  {
    id: 'tiktok',
    label: 'TikTok',
    href: businessInfo.tiktokUrl,
    hoverBg: 'hover:bg-white hover:border-white hover:text-black',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4" aria-hidden="true">
        <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
      </svg>
    ),
  },
];

export default function SocialLinks({
  promptText,
  size = 'md',
  align = 'left',
}: SocialLinksProps) {
  const btnDim = size === 'sm' ? 'w-9 h-9' : 'w-11 h-11';

  return (
    <div
      className={`flex flex-wrap items-center gap-3 ${
        align === 'center' ? 'justify-center' : 'justify-start'
      }`}
    >
      <div className="flex items-center gap-2.5">
        {SOCIAL_ITEMS.map((soc) => (
          <motion.a
            key={soc.id}
            href={soc.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={soc.label}
            title={soc.label}
            whileHover={{ scale: 1.1, y: -2 }}
            whileTap={{ scale: 0.92 }}
            transition={{ type: 'spring', stiffness: 450, damping: 24 }}
            className={`${btnDim} rounded-full bg-white/8 border border-white/15 text-zinc-200 flex items-center justify-center transition-colors shadow-lg ${soc.hoverBg}`}
          >
            {soc.icon}
          </motion.a>
        ))}
      </div>
      {promptText && (
        <span className="text-xs sm:text-sm font-medium text-zinc-300 tracking-wide">
          {promptText}
        </span>
      )}
    </div>
  );
}

