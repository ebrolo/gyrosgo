'use client';

import React, { useRef } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';
import { SiteDictionary } from '@/data/siteData';
import SocialLinks from '@/components/SocialLinks';

interface AboutSectionProps {
  dict: SiteDictionary;
}

export default function AboutSection({ dict }: AboutSectionProps) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  // Subtle GPU parallax on background interior & floating die-cut stickers
  const bgY = useTransform(scrollYProgress, [0, 1], ['-6%', '6%']);
  const stickerGyrosY = useTransform(scrollYProgress, [0, 1], [24, -24]);
  const stickerBurgerY = useTransform(scrollYProgress, [0, 1], [-18, 22]);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative py-24 sm:py-32 bg-[#0A0B0E] overflow-hidden border-b border-white/10"
    >
      {/* Full-Bleed Darkened Restaurant Interior Hero Backdrop with Subtle Parallax */}
      <motion.div
        aria-hidden="true"
        style={{ y: bgY }}
        className="pointer-events-none absolute -inset-y-12 inset-x-0 z-0"
      >
        <Image
          src="/images/brand/interior.jpg"
          alt=""
          fill
          sizes="100vw"
          className="object-cover object-center scale-105"
        />
        {/* Atmospheric Darkening + Readability Vignette (keeps warm backlit wall logo visible!) */}
        <div className="absolute inset-0 bg-[#0A0B0E]/68" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0A0B0E]/92 via-[#0A0B0E]/72 to-[#0A0B0E]/55" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0A0B0E] via-transparent to-[#0A0B0E]" />
      </motion.div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-center">
          {/* Left Column: Clean Editorial Story + Social Follow CTA + Unboxed Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.45 }}
            className="lg:col-span-6 space-y-7"
          >
            <div>
              <span className="text-xs font-mono font-bold uppercase tracking-[0.24em] text-[#FF6B00] block mb-2">
                {dict.about.badge}
              </span>
              <h2 className="font-display text-4xl sm:text-6xl font-black uppercase tracking-tight text-white leading-[1.06] drop-shadow-[0_6px_24px_rgba(0,0,0,0.8)]">
                {dict.about.title}
              </h2>
            </div>

            <p className="font-display text-2xl sm:text-3xl font-bold uppercase tracking-wide text-[#FFB800]">
              {dict.about.lead}
            </p>

            <div className="space-y-3 text-zinc-200 text-base leading-relaxed max-w-xl">
              {dict.about.paragraphs.map((p, idx) => (
                <p key={idx}>{p}</p>
              ))}
            </div>

            {/* Social Media Buttons + Short Follow Text */}
            <div className="pt-1">
              <SocialLinks promptText={dict.about.socialPrompt} />
            </div>

            {/* Unboxed Monumental Stats Strip */}
            <div className="pt-7 border-t border-white/15 grid grid-cols-2 sm:grid-cols-4 gap-6">
              {dict.about.stats.map((stat, idx) => (
                <div key={idx}>
                  <div className="font-display text-3xl sm:text-4xl font-black text-white leading-none">
                    {stat.value}
                  </div>
                  <div className="text-xs font-mono uppercase tracking-widest text-zinc-400 mt-1.5">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right Column: Interactive Thick-Outlined Cutout Food Stickers */}
          <div className="lg:col-span-6 relative min-h-[340px] sm:min-h-[430px] flex items-center justify-center">
            {/* Sticker 1: Authentic Nagy Gyros Tál with Thick Cream-White Vinyl Outline */}
            <motion.div
              style={{ y: stickerGyrosY }}
              initial={{ opacity: 0, scale: 0.88, rotate: -6 }}
              whileInView={{ opacity: 1, scale: 1, rotate: -5 }}
              whileHover={{ scale: 1.06, rotate: -1.5, zIndex: 30 }}
              whileTap={{ scale: 0.97 }}
              drag
              dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
              dragElastic={0.18}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ type: 'spring', stiffness: 320, damping: 24 }}
              className="relative z-20 w-[64%] sm:w-[60%] -ml-6 sm:-ml-12 -mt-8 sm:-mt-12 select-none cursor-grab active:cursor-grabbing"
            >
              <Image
                src="/images/stickers/sticker-gyros-tal.webp"
                alt={dict.about.stickerCaptions.gyros}
                width={760}
                height={589}
                sizes="(max-width: 768px) 58vw, 340px"
                draggable={false}
                className="w-full h-auto object-contain drop-shadow-[0_24px_45px_rgba(0,0,0,0.85)]"
              />
            </motion.div>

            {/* Sticker 2: Authentic Dupla Smash Burger with Thick Cream-White Vinyl Outline */}
            <motion.div
              style={{ y: stickerBurgerY }}
              initial={{ opacity: 0, scale: 0.88, rotate: 7 }}
              whileInView={{ opacity: 1, scale: 1, rotate: 6 }}
              whileHover={{ scale: 1.07, rotate: 2, zIndex: 30 }}
              whileTap={{ scale: 0.97 }}
              drag
              dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
              dragElastic={0.18}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ type: 'spring', stiffness: 320, damping: 24, delay: 0.08 }}
              className="relative z-25 w-[58%] sm:w-[54%] -ml-14 sm:-ml-18 mt-20 sm:mt-28 select-none cursor-grab active:cursor-grabbing"
            >
              <Image
                src="/images/stickers/sticker-smash-burger.webp"
                alt={dict.about.stickerCaptions.burger}
                width={720}
                height={491}
                sizes="(max-width: 768px) 52vw, 310px"
                draggable={false}
                className="w-full h-auto object-contain drop-shadow-[0_24px_45px_rgba(0,0,0,0.88)]"
              />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
