'use client';

import React, { useState, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Language, HeroSlide, siteData } from '@/data/siteData';
import SmoothScrollProvider from '@/components/SmoothScrollProvider';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import MenuSection from '@/components/MenuSection';
import PromosSection from '@/components/PromosSection';
import AboutSection from '@/components/AboutSection';
import ReviewsSection from '@/components/ReviewsSection';
import ContactFooterSection from '@/components/ContactFooterSection';
import CartDrawer, { CartItem } from '@/components/CartDrawer';

const BUBBLE_PARTICLES = [
  { id: 0, left: '10%', size: 18, delay: 0.02, dur: 1.35, color: '#FFD814' },
  { id: 1, left: '22%', size: 26, delay: 0.12, dur: 1.5, color: '#67E8F9' },
  { id: 2, left: '34%', size: 14, delay: 0.05, dur: 1.25, color: '#A5F3FC' },
  { id: 3, left: '47%', size: 32, delay: 0.16, dur: 1.6, color: '#FFD814' },
  { id: 4, left: '58%', size: 20, delay: 0.08, dur: 1.4, color: '#67E8F9' },
  { id: 5, left: '70%', size: 28, delay: 0.18, dur: 1.55, color: '#FFB800' },
  { id: 6, left: '82%', size: 16, delay: 0.04, dur: 1.3, color: '#67E8F9' },
  { id: 7, left: '90%', size: 24, delay: 0.14, dur: 1.45, color: '#FFD814' },
];

export default function HomePage() {
  const [lang, setLang] = useState<Language>('hu');
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [secretTriggerCount, setSecretTriggerCount] = useState(0);
  const [bubbleBurstId, setBubbleBurstId] = useState<number | null>(null);

  const dict = siteData[lang];

  const qtyMap = useMemo(() => {
    const map: Record<string, number> = {};
    for (const item of cartItems) {
      map[item.key] = item.quantity;
    }
    return map;
  }, [cartItems]);

  const getCartQty = useCallback((key: string) => qtyMap[key] || 0, [qtyMap]);

  const handleAddToCart = useCallback(
    (newItem: {
      id: string;
      name: string;
      variantLabel?: string;
      isCombo?: boolean;
      unitPrice: number;
      unitKcal: number;
      unitProteinG: number;
      unitCarbsG: number;
      unitFatG: number;
      image?: string;
      isCutoutDrink?: boolean;
    }) => {
      const key = `${newItem.id}__${newItem.variantLabel || 'base'}__${
        newItem.isCombo ? 'combo' : 'single'
      }`;

      setCartItems((prev) => {
        const existingIdx = prev.findIndex((item) => item.key === key);
        if (existingIdx > -1) {
          const updated = [...prev];
          updated[existingIdx] = {
            ...updated[existingIdx],
            quantity: updated[existingIdx].quantity + 1,
          };
          return updated;
        }
        return [
          ...prev,
          {
            key,
            id: newItem.id,
            name: newItem.name,
            variantLabel: newItem.variantLabel,
            isCombo: newItem.isCombo,
            unitPrice: newItem.unitPrice,
            unitKcal: newItem.unitKcal,
            unitProteinG: newItem.unitProteinG,
            unitCarbsG: newItem.unitCarbsG,
            unitFatG: newItem.unitFatG,
            quantity: 1,
            image: newItem.image,
            isCutoutDrink: newItem.isCutoutDrink,
          },
        ];
      });
    },
    []
  );

  const handleUpdateQty = useCallback((key: string, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((item) =>
          item.key === key
            ? { ...item, quantity: Math.max(0, item.quantity + delta) }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  }, []);

  const handleRemoveItem = useCallback((key: string) => {
    setCartItems((prev) => prev.filter((item) => item.key !== key));
  }, []);

  const handleClearCart = useCallback(() => {
    setCartItems([]);
  }, []);

  const handleAddHeroSlide = useCallback(
    (slide: HeroSlide) => {
      handleAddToCart({
        id: slide.id,
        name: `${slide.titleLine1} ${slide.titleAccent}`,
        unitPrice: slide.numericPrice,
        unitKcal: slide.kcal,
        unitProteinG: slide.proteinG,
        unitCarbsG: slide.carbsG,
        unitFatG: slide.fatG,
        image: slide.image,
      });
    },
    [handleAddToCart]
  );

  const handleTriggerSecret = useCallback(() => {
    const burstKey = Date.now();
    setBubbleBurstId(burstKey);
    setSecretTriggerCount((c) => c + 1);
    setTimeout(() => {
      setBubbleBurstId((curr) => (curr === burstKey ? null : curr));
    }, 1700);

    setTimeout(() => {
      const target =
        (document.getElementById('item-herkentyu-burger') as HTMLElement | null) ||
        (document.getElementById('menu') as HTMLElement | null);
      if (!target) return;
      if (window.__lenis) {
        window.__lenis.scrollTo(target, { offset: -145, duration: 0.85 });
      } else {
        target.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }, 120);
  }, []);

  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <SmoothScrollProvider>
      <main className="min-h-screen bg-[#0A0B0E] text-white overflow-x-clip selection:bg-[#FF6B00] selection:text-black">
        <Navbar
          lang={lang}
          setLang={setLang}
          dict={dict}
          cartCount={cartCount}
          onOpenCart={() => setCartOpen(true)}
          onTriggerSecret={handleTriggerSecret}
        />

        {/* Celebratory Sea-Sponge Underwater Bubble Burst Overlay */}
        <AnimatePresence>
          {bubbleBurstId && (
            <motion.div
              key={bubbleBurstId}
              initial={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 pointer-events-none overflow-hidden"
              aria-hidden="true"
            >
              {BUBBLE_PARTICLES.map((b) => (
                <motion.span
                  key={b.id}
                  initial={{ y: '105vh', x: 0, opacity: 0.95, scale: 0.6 }}
                  animate={{
                    y: '-15vh',
                    x: b.id % 2 === 0 ? [0, 18, -12, 8] : [0, -18, 14, -6],
                    opacity: [0.95, 0.9, 0],
                    scale: [0.6, 1.15, 0.9],
                  }}
                  transition={{
                    duration: b.dur,
                    delay: b.delay,
                    ease: 'easeOut',
                  }}
                  style={{
                    left: b.left,
                    width: b.size,
                    height: b.size,
                    borderColor: b.color,
                    boxShadow: `0 0 18px ${b.color}66`,
                  }}
                  className="absolute top-0 rounded-full border-2 bg-white/10 backdrop-blur-[1px]"
                />
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Smooth Micro-Transition Wrapper on Language Switch */}
        <motion.div
          key={lang}
          initial={{ opacity: 0.55 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.26, ease: [0.22, 1, 0.36, 1] }}
        >
          <HeroSection
            dict={dict}
            getCartQty={getCartQty}
            onAddHeroSlide={handleAddHeroSlide}
            onUpdateQty={handleUpdateQty}
            onTriggerSecret={handleTriggerSecret}
          />
          <MenuSection
            dict={dict}
            getCartQty={getCartQty}
            onAddToCart={handleAddToCart}
            onUpdateQty={handleUpdateQty}
            secretTriggerCount={secretTriggerCount}
          />
          <PromosSection dict={dict} />
          <AboutSection dict={dict} />
          <ReviewsSection dict={dict} />
          <ContactFooterSection dict={dict} />
        </motion.div>

        <CartDrawer
          dict={dict}
          items={cartItems}
          isOpen={cartOpen}
          onOpen={() => setCartOpen(true)}
          onClose={() => setCartOpen(false)}
          onUpdateQty={handleUpdateQty}
          onRemove={handleRemoveItem}
          onClear={handleClearCart}
        />
      </main>
    </SmoothScrollProvider>
  );
}
