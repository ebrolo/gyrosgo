'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import {
  MapPin,
  Phone,
  MessageCircle,
  Clock,
  Navigation,
  X,
  FileText,
  ShieldCheck,
} from 'lucide-react';
import { SiteDictionary, businessInfo } from '@/data/siteData';
import { useScrollLock } from '@/components/SmoothScrollProvider';
import SocialLinks from '@/components/SocialLinks';

interface ContactFooterSectionProps {
  dict: SiteDictionary;
}

export default function ContactFooterSection({ dict }: ContactFooterSectionProps) {
  const [legalModal, setLegalModal] = useState<'terms' | 'privacy' | null>(null);

  useScrollLock(legalModal !== null);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    const el = document.querySelector(targetId) as HTMLElement | null;
    if (!el) return;
    if (window.__lenis) {
      window.__lenis.scrollTo(el, { offset: -80, duration: 0.75 });
    } else {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* Contact & Location Section */}
      <section
        id="contact"
        className="relative py-20 sm:py-28 bg-[#0A0B0E] overflow-x-clip border-b border-white/10"
      >
        <div className="w-full max-w-[1860px] mx-auto px-4 sm:px-8 lg:px-12 2xl:px-16">
          {/* Clean Unboxed Header */}
          <div className="mb-14">
            <span className="text-xs font-mono font-bold uppercase tracking-[0.24em] text-[#FF6B00] block mb-2">
              {dict.contact.badge}
            </span>
            <h2 className="font-display text-4xl sm:text-6xl font-black uppercase tracking-tight text-white leading-none">
              {dict.contact.title}
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Left Column: Open Contact Channels, Social Links & Hours */}
            <div className="lg:col-span-5 space-y-8">
              {/* Direct Contact Channels (Unboxed Hairline List + Pure Icon Buttons) */}
              <div className="divide-y divide-white/10 border-t border-b border-white/10">
                {/* Phone */}
                <div className="py-5 flex items-center justify-between gap-4">
                  <div>
                    <div className="text-xs font-mono uppercase tracking-widest text-zinc-500">
                      {dict.contact.phoneLabel}
                    </div>
                    <a
                      href={businessInfo.phoneTel}
                      className="font-display text-3xl font-black text-[#FFB800] hover:text-white transition-colors"
                    >
                      {dict.contact.phoneDisplay}
                    </a>
                  </div>
                  <motion.a
                    whileHover={{ scale: 1.08 }}
                    whileTap={{ scale: 0.92 }}
                    href={businessInfo.phoneTel}
                    className="w-11 h-11 rounded-full bg-[#FF6B00] text-black flex items-center justify-center shrink-0 shadow-[0_6px_20px_rgba(255,107,0,0.3)]"
                    aria-label={dict.contact.phoneLabel}
                  >
                    <Phone className="w-4 h-4 fill-current" />
                  </motion.a>
                </div>

                {/* Address */}
                <div className="py-5 flex items-center justify-between gap-4">
                  <div>
                    <div className="text-xs font-mono uppercase tracking-widest text-zinc-500">
                      {dict.contact.addressLabel}
                    </div>
                    <div className="font-display text-xl font-bold uppercase text-white mt-0.5">
                      {dict.contact.addressValue}
                    </div>
                  </div>
                  <motion.a
                    whileHover={{ scale: 1.08 }}
                    whileTap={{ scale: 0.92 }}
                    href={businessInfo.googleMapsDirectionsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={dict.contact.directionsCta}
                    title={dict.contact.directionsCta}
                    className="w-11 h-11 rounded-full bg-white/8 hover:bg-[#FFB800] text-[#FFB800] hover:text-black flex items-center justify-center shrink-0 transition-colors"
                  >
                    <Navigation className="w-4 h-4" />
                  </motion.a>
                </div>

                {/* Inquiries / Facebook Messenger (Fixed: Zero duplicate "Messenger" label!) */}
                <div className="py-5 flex items-center justify-between gap-4">
                  <div>
                    <div className="text-xs font-mono uppercase tracking-widest text-zinc-500">
                      {dict.contact.messengerLabel}
                    </div>
                    <div className="font-display text-xl font-bold uppercase text-white mt-0.5">
                      {dict.contact.messengerValue}
                    </div>
                  </div>
                  <motion.a
                    whileHover={{ scale: 1.08 }}
                    whileTap={{ scale: 0.92 }}
                    href={businessInfo.messengerUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={dict.contact.messengerCta}
                    title={dict.contact.messengerCta}
                    className="w-11 h-11 rounded-full bg-white/8 hover:bg-[#FF6B00] text-white hover:text-black flex items-center justify-center shrink-0 transition-colors"
                  >
                    <MessageCircle className="w-4 h-4" />
                  </motion.a>
                </div>
              </div>

              {/* Social Media Buttons Row */}
              <div className="space-y-2.5">
                <div className="text-xs font-mono uppercase tracking-widest text-zinc-500">
                  {dict.contact.socialLabel}
                </div>
                <SocialLinks promptText={dict.contact.socialSub} />
              </div>

              {/* Opening Hours */}
              <div className="pt-1">
                <div className="flex items-center gap-2 mb-4">
                  <Clock className="w-4 h-4 text-[#FFB800]" />
                  <h3 className="font-display text-xl font-extrabold uppercase tracking-wide text-white">
                    {dict.contact.hoursTitle}
                  </h3>
                </div>
                <div className="divide-y divide-white/8">
                  {dict.contact.hoursRows.map((row, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between py-2.5 text-sm"
                    >
                      <span className="text-zinc-300 font-medium">{row.day}</span>
                      <span
                        className={`font-mono font-bold ${
                          row.isClosed ? 'text-red-400' : 'text-[#FFB800]'
                        }`}
                      >
                        {row.time}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column: Interactive Map */}
            <div className="lg:col-span-7 relative min-h-[420px] sm:min-h-[500px] rounded-3xl overflow-hidden bg-zinc-900">
              <iframe
                title="Nyírbátori Gyros & Go Térkép"
                src="https://maps.google.com/maps?q=4300%20Ny%C3%ADrb%C3%A1tor,%20Szentv%C3%A9r%20%C3%BAt%2019.&t=&z=16&ie=UTF8&iwloc=&output=embed"
                className="w-full h-[420px] sm:h-[500px] border-0 contrast-125 grayscale-[20%]"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#07080A] pt-14 pb-10 text-zinc-400">
        <div className="w-full max-w-[1860px] mx-auto px-4 sm:px-8 lg:px-12 2xl:px-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-white/10">
            {/* Brand Column + Social Icons */}
            <div className="lg:col-span-5 space-y-4">
              <a
                href="#home"
                onClick={(e) => handleNavClick(e, '#home')}
                className="relative block w-28 h-20"
                aria-label={businessInfo.name}
              >
                <Image
                  src="/images/brand/logo.png"
                  alt={businessInfo.name}
                  fill
                  sizes="112px"
                  className="object-contain object-left"
                />
              </a>
              <p className="text-sm text-zinc-400 max-w-sm">
                {dict.footer.tagline}
              </p>
              <div className="pt-1">
                <SocialLinks size="sm" />
              </div>
            </div>

            {/* Quick Links */}
            <div className="lg:col-span-3 space-y-3">
              <h4 className="font-display text-sm font-bold uppercase tracking-widest text-white">
                {dict.footer.quickLinksTitle}
              </h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <a
                    href="#menu"
                    onClick={(e) => handleNavClick(e, '#menu')}
                    className="hover:text-[#FFB800] transition-colors"
                  >
                    {dict.nav.menu}
                  </a>
                </li>
                <li>
                  <a
                    href="#promos"
                    onClick={(e) => handleNavClick(e, '#promos')}
                    className="hover:text-[#FFB800] transition-colors"
                  >
                    {dict.nav.promos}
                  </a>
                </li>
                <li>
                  <a
                    href="#about"
                    onClick={(e) => handleNavClick(e, '#about')}
                    className="hover:text-[#FFB800] transition-colors"
                  >
                    {dict.nav.about}
                  </a>
                </li>
                <li>
                  <a
                    href="#reviews"
                    onClick={(e) => handleNavClick(e, '#reviews')}
                    className="hover:text-[#FFB800] transition-colors"
                  >
                    {dict.nav.reviews}
                  </a>
                </li>
              </ul>
            </div>

            {/* Contact & Legal */}
            <div className="lg:col-span-4 space-y-3">
              <h4 className="font-display text-sm font-bold uppercase tracking-widest text-white">
                {dict.footer.contactTitle}
              </h4>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-[#FF6B00] shrink-0" />
                  <span>{businessInfo.address}</span>
                </li>
                <li className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-[#FFB800] shrink-0" />
                  <a
                    href={businessInfo.phoneTel}
                    className="text-white font-bold hover:text-[#FFB800] transition-colors"
                  >
                    {businessInfo.phoneDisplay}
                  </a>
                </li>
              </ul>

              <div className="pt-3 flex flex-wrap gap-4 text-xs">
                <button
                  type="button"
                  onClick={() => setLegalModal('terms')}
                  className="hover:text-white underline underline-offset-4 transition-colors cursor-pointer"
                >
                  {dict.footer.termsLabel}
                </button>
                <button
                  type="button"
                  onClick={() => setLegalModal('privacy')}
                  className="hover:text-white underline underline-offset-4 transition-colors cursor-pointer"
                >
                  {dict.footer.privacyLabel}
                </button>
              </div>
            </div>
          </div>

          {/* Mandatory E-Brolo Demonstration Notice & Clickable Copyright */}
          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-500">
            <p>
              © {new Date().getFullYear()}{' '}
              <a
                href="https://ebrolo.hu/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#FF6B00] font-semibold hover:underline"
              >
                E-Brolo
              </a>
              . {dict.footer.rightsReserved}
            </p>

            <div className="px-4 py-1.5 rounded-full bg-white/[0.04] text-zinc-400 text-center">
              {dict.footer.demoNotice}
            </div>
          </div>
        </div>
      </footer>

      {/* Animated Legal Modal (ÁSZF / Privacy Policy) with Scroll-Lock */}
      <AnimatePresence>
        {legalModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setLegalModal(null)}
            data-lenis-prevent
            className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 sm:p-6"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 12 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 12 }}
              transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="bg-[#12151E] border border-white/15 rounded-3xl max-w-2xl w-full max-h-[85vh] flex flex-col overflow-hidden shadow-2xl"
            >
              <div className="p-6 border-b border-white/10 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {legalModal === 'terms' ? (
                    <FileText className="w-5 h-5 text-[#FF6B00]" />
                  ) : (
                    <ShieldCheck className="w-5 h-5 text-[#FFB800]" />
                  )}
                  <div>
                    <h3 className="font-display text-xl font-bold uppercase text-white">
                      {legalModal === 'terms'
                        ? dict.legal.termsTitle
                        : dict.legal.privacyTitle}
                    </h3>
                    <p className="text-xs text-zinc-400 font-mono">
                      {legalModal === 'terms'
                        ? dict.legal.termsUpdated
                        : dict.legal.privacyUpdated}
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setLegalModal(null)}
                  aria-label={dict.legal.closeLabel}
                  className="w-9 h-9 rounded-full bg-white/5 hover:bg-white/15 text-zinc-300 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div
                data-lenis-prevent
                className="p-6 overflow-y-auto space-y-6 text-sm text-zinc-300 leading-relaxed"
              >
                {(legalModal === 'terms'
                  ? dict.legal.termsSections
                  : dict.legal.privacySections
                ).map((sec, i) => (
                  <div key={i} className="space-y-2">
                    <h4 className="font-bold text-white text-base">{sec.heading}</h4>
                    {sec.body.map((p, j) => (
                      <p key={j} className="text-zinc-400">
                        {p}
                      </p>
                    ))}
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
