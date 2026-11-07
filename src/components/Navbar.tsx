'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Phone, Menu, X, ShoppingBag } from 'lucide-react';
import { Language, SiteDictionary, businessInfo } from '@/data/siteData';
import SeaSpongeIcon from '@/components/SeaSpongeIcon';

interface NavbarProps {
  lang: Language;
  setLang: (lang: Language) => void;
  dict: SiteDictionary;
  cartCount: number;
  onOpenCart: () => void;
  onTriggerSecret: () => void;
}

export default function Navbar({
  lang,
  setLang,
  dict,
  cartCount,
  onOpenCart,
  onTriggerSecret,
}: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    setMobileOpen(false);
    const el = document.querySelector(targetId) as HTMLElement | null;
    if (!el) return;
    if (window.__lenis) {
      window.__lenis.scrollTo(el, { offset: -80, duration: 0.75 });
    } else {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const navLinks = [
    { href: '#home', label: dict.nav.home },
    { href: '#menu', label: dict.nav.menu },
    { href: '#promos', label: dict.nav.promos },
    { href: '#about', label: dict.nav.about },
    { href: '#reviews', label: dict.nav.reviews },
    { href: '#contact', label: dict.nav.contact },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 w-full max-w-[100vw] overflow-x-clip z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#0A0B0E]/92 backdrop-blur-xl border-b border-white/10 py-2'
          : 'bg-gradient-to-b from-black/85 via-black/40 to-transparent py-3'
      }`}
      style={{ transform: 'translate3d(0,0,0)' }}
    >
      <div className="w-full max-w-[1860px] mx-auto px-4 sm:px-8 lg:px-12 2xl:px-16 flex items-center justify-between gap-3">
        {/* Brand Logo ONLY — Logo speaks for itself */}
        <a
          href="#home"
          onClick={(e) => handleNavClick(e, '#home')}
          className="relative w-18 h-12 sm:w-24 sm:h-15 shrink-0 transition-transform duration-300 hover:scale-105"
          aria-label={businessInfo.name}
        >
          <Image
            src="/images/brand/logo.png"
            alt={businessInfo.name}
            fill
            sizes="96px"
            className="object-contain drop-shadow-[0_4px_16px_rgba(255,107,0,0.45)]"
            priority
          />
        </a>

        {/* Desktop Nav Links */}
        <nav className="hidden xl:flex items-center gap-6 shrink-0">
          {navLinks.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={(e) => handleNavClick(e, item.href)}
              className="relative text-xs font-bold uppercase tracking-[0.15em] text-zinc-300 hover:text-[#FFB800] whitespace-nowrap transition-colors py-1 group"
            >
              <span>{item.label}</span>
              <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-[#FFB800] transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </nav>

        {/* Actions: Animated Language Switcher + Pure Icon Cart + Pure Icon Phone */}
        <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
          {/* Animated Language Switcher (`layoutId` spring pill) */}
          <div className="relative flex items-center rounded-full bg-white/8 p-1 text-xs font-mono shrink-0">
            {(['hu', 'en'] as Language[]).map((code) => {
              const active = lang === code;
              return (
                <button
                  key={code}
                  type="button"
                  onClick={() => setLang(code)}
                  className={`relative z-10 px-2.5 py-1 rounded-full uppercase font-bold transition-colors cursor-pointer ${
                    active ? 'text-black' : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  {active && (
                    <motion.span
                      layoutId="navbarLangPill"
                      transition={{ type: 'spring', stiffness: 450, damping: 32 }}
                      className="absolute inset-0 rounded-full bg-[#FF6B00] -z-10"
                    />
                  )}
                  {code}
                </button>
              );
            })}
          </div>

          {/* Pure Icon Cart Button */}
          <motion.button
            whileHover={{ scale: 1.06 }}
            whileTap={{ scale: 0.94 }}
            type="button"
            onClick={onOpenCart}
            aria-label={dict.nav.cartLabel}
            title={dict.nav.cartLabel}
            className="relative w-10 h-10 rounded-full bg-white/10 hover:bg-white/18 text-white flex items-center justify-center shrink-0 transition-colors cursor-pointer"
          >
            <ShoppingBag className="w-4 h-4 text-[#FFB800]" />
            <AnimatePresence>
              {cartCount > 0 && (
                <motion.span
                  key={cartCount}
                  initial={{ scale: 0.4, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.4, opacity: 0 }}
                  transition={{ type: 'spring', stiffness: 500, damping: 24 }}
                  className="absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1 rounded-full bg-[#FF6B00] text-black font-mono text-[10px] font-black flex items-center justify-center leading-none shadow-md"
                >
                  {cartCount}
                </motion.span>
              )}
            </AnimatePresence>
          </motion.button>

          {/* Pure Icon Direct Call Button (Zero phone number text!) */}
          <motion.a
            whileHover={{ scale: 1.06 }}
            whileTap={{ scale: 0.94 }}
            href={businessInfo.phoneTel}
            aria-label={businessInfo.phoneDisplay}
            title={businessInfo.phoneDisplay}
            className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#FF6B00] to-[#FFB800] text-black flex items-center justify-center shrink-0 shadow-[0_6px_20px_rgba(255,107,0,0.35)]"
          >
            <Phone className="w-4 h-4 fill-current" />
          </motion.a>

          {/* Mobile Hamburger */}
          <button
            type="button"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle Menu"
            className="xl:hidden w-10 h-10 rounded-full bg-white/8 hover:bg-white/15 text-white flex items-center justify-center shrink-0 transition-colors cursor-pointer"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Animated Mobile Dropdown Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="xl:hidden relative overflow-hidden bg-[#0E1016]/98 backdrop-blur-2xl border-b border-white/10"
          >
            <div className="px-6 py-5 grid grid-cols-2 gap-3 pr-14">
              {navLinks.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className="py-2.5 text-sm font-display uppercase tracking-wider text-zinc-200 hover:text-[#FFB800] border-b border-white/5 transition-colors"
                >
                  {item.label}
                </a>
              ))}
            </div>

            {/* Subtle Hidden Peeking Sea-Sponge Easter Egg tucked at bottom-right of mobile drawer */}
            <button
              type="button"
              onClick={() => {
                setMobileOpen(false);
                onTriggerSecret();
              }}
              aria-label={dict.nav.secretLinkLabel}
              title={dict.nav.secretLinkLabel}
              className="absolute -bottom-1.5 right-4 p-2 opacity-45 hover:opacity-100 active:scale-95 transition-all rotate-[-8deg] hover:rotate-0 cursor-pointer"
            >
              <SeaSpongeIcon className="w-7 h-7 drop-shadow-[0_4px_12px_rgba(255,216,20,0.45)]" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
