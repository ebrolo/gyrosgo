'use client';

import React, { useState, useCallback, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Language, HeroSlide, siteData } from '@/data/siteData';
import SmoothScrollProvider from '@/components/SmoothScrollProvider';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import MenuSection from '@/components/MenuSection';
import PromosSection from '@/components/PromosSection';
import AboutSection from '@/components/AboutSection';
import GallerySection from '@/components/GallerySection';
import ReviewsSection from '@/components/ReviewsSection';
import ContactFooterSection from '@/components/ContactFooterSection';
import CartDrawer, { CartItem } from '@/components/CartDrawer';

export default function HomePage() {
  const [lang, setLang] = useState<Language>('hu');
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [cartOpen, setCartOpen] = useState(false);

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
      image?: string;
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
            quantity: 1,
            image: newItem.image,
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
        image: slide.image,
      });
    },
    [handleAddToCart]
  );

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
        />

        {/* Smooth Micro-Transition Wrapper on Language Switch (preserves scroll & sticky physics!) */}
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
          />
          <MenuSection
            dict={dict}
            getCartQty={getCartQty}
            onAddToCart={handleAddToCart}
            onUpdateQty={handleUpdateQty}
          />
          <PromosSection dict={dict} />
          <AboutSection dict={dict} />
          <GallerySection dict={dict} />
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
