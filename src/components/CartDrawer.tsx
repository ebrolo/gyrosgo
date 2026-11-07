'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ShoppingBag,
  X,
  Plus,
  Minus,
  Phone,
  Trash2,
  ArrowUpRight,
  ChevronDown,
  Flame,
} from 'lucide-react';
import { SiteDictionary, businessInfo } from '@/data/siteData';
import { useScrollLock } from '@/components/SmoothScrollProvider';

export interface CartItem {
  key: string;
  id: string;
  name: string;
  variantLabel?: string;
  isCombo?: boolean;
  unitPrice: number;
  unitKcal: number;
  unitProteinG: number;
  unitCarbsG: number;
  unitFatG: number;
  quantity: number;
  image?: string;
  isCutoutDrink?: boolean;
}

interface CartDrawerProps {
  dict: SiteDictionary;
  items: CartItem[];
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  onUpdateQty: (key: string, delta: number) => void;
  onRemove: (key: string) => void;
  onClear: () => void;
}

export default function CartDrawer({
  dict,
  items,
  isOpen,
  onOpen,
  onClose,
  onUpdateQty,
  onRemove,
  onClear,
}: CartDrawerProps) {
  const [discountMode, setDiscountMode] = useState<'none' | '10' | '20'>('none');
  const [kcalOpen, setKcalOpen] = useState(false);

  // Lock background page scroll while Cart Drawer is open
  useScrollLock(isOpen);

  const totalCount = items.reduce((acc, item) => acc + item.quantity, 0);
  const subtotal = items.reduce((acc, item) => acc + item.unitPrice * item.quantity, 0);
  const totalKcal = items.reduce((acc, item) => acc + item.unitKcal * item.quantity, 0);
  const totalProtein = items.reduce((acc, item) => acc + item.unitProteinG * item.quantity, 0);
  const totalCarbs = items.reduce((acc, item) => acc + item.unitCarbsG * item.quantity, 0);
  const totalFat = items.reduce((acc, item) => acc + item.unitFatG * item.quantity, 0);

  const discountRate = discountMode === '10' ? 0.1 : discountMode === '20' ? 0.2 : 0;
  const finalTotal = Math.round(subtotal * (1 - discountRate));

  const formatFt = (val: number) => `${val.toLocaleString('hu-HU')} Ft`;

  return (
    <>
      {/* Minimalist Icon + Price Floating Cart Pill (GPU-accelerated translate3d) */}
      <AnimatePresence>
        {totalCount > 0 && !isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.92 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="fixed bottom-5 inset-x-0 z-40 pointer-events-none flex justify-center px-4"
            style={{ transform: 'translate3d(0,0,0)' }}
          >
            <button
              type="button"
              onClick={onOpen}
              aria-label={dict.cart.title}
              className="pointer-events-auto flex items-center gap-3.5 pl-2.5 pr-2.5 py-2 rounded-full bg-[#12151E]/95 backdrop-blur-xl border border-[#FF6B00]/50 text-white shadow-[0_20px_50px_rgba(0,0,0,0.85)] hover:border-[#FFB800] transition-all group cursor-pointer"
            >
              <div className="relative flex items-center justify-center w-10 h-10 rounded-full bg-[#FF6B00] text-black font-black text-sm">
                <ShoppingBag className="w-4 h-4" />
                <span className="-top-1 -right-1 absolute min-w-[19px] h-[19px] px-1 rounded-full bg-[#FFB800] text-black text-[10px] font-mono font-black flex items-center justify-center">
                  {totalCount}
                </span>
              </div>
              <div className="font-display text-xl font-black text-[#FFB800] tracking-wide leading-none pr-1">
                {formatFt(finalTotal)}
              </div>
              <span className="w-9 h-9 rounded-full bg-white/10 group-hover:bg-[#FFB800] group-hover:text-black flex items-center justify-center transition-colors">
                <ArrowUpRight className="w-4 h-4" />
              </span>
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Slide-Over Cart Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            data-lenis-prevent
            className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex justify-end"
            onClick={onClose}
          >
            <motion.aside
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-md bg-[#0B0D12] border-l border-white/10 h-full flex flex-col justify-between overflow-hidden shadow-2xl"
            >
              {/* Top Header */}
              <div className="px-6 py-5 border-b border-white/10 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <ShoppingBag className="w-5 h-5 text-[#FF6B00]" />
                  <h2 className="font-display text-2xl font-black uppercase tracking-wide text-white">
                    {dict.cart.title}
                  </h2>
                  {totalCount > 0 && (
                    <span className="px-2.5 py-0.5 rounded-full bg-[#FF6B00]/20 text-[#FFB800] font-mono text-xs font-bold">
                      {totalCount}
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  {items.length > 0 && (
                    <button
                      type="button"
                      onClick={onClear}
                      className="w-9 h-9 rounded-full bg-white/5 hover:bg-red-500/20 text-zinc-400 hover:text-red-400 flex items-center justify-center transition-colors cursor-pointer"
                      title={dict.cart.clearCartLabel}
                      aria-label={dict.cart.clearCartLabel}
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={onClose}
                    className="w-9 h-9 rounded-full bg-white/5 hover:bg-white/15 flex items-center justify-center text-zinc-300 hover:text-white transition-colors cursor-pointer"
                    aria-label="Close"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Cart Items List */}
              <div
                data-lenis-prevent
                className="flex-1 overflow-y-auto px-6 py-4 divide-y divide-white/10"
              >
                {items.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center py-16">
                    <ShoppingBag className="w-12 h-12 text-zinc-700 mb-4 stroke-[1.5]" />
                    <p className="font-display text-xl font-bold uppercase text-white mb-1">
                      {dict.cart.emptyTitle}
                    </p>
                    <p className="text-sm text-zinc-500 max-w-xs">
                      {dict.cart.emptySub}
                    </p>
                  </div>
                ) : (
                  <AnimatePresence initial={false}>
                    {items.map((item) => (
                      <motion.div
                        layout
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, x: 30 }}
                        transition={{ duration: 0.2 }}
                        key={item.key}
                        className="py-4 flex items-center gap-4"
                      >
                        {item.image && (
                          <div
                            className={`relative w-14 h-14 rounded-xl overflow-hidden shrink-0 ${
                              item.isCutoutDrink ? 'bg-transparent p-1' : 'bg-zinc-900'
                            }`}
                          >
                            <Image
                              src={item.image}
                              alt={item.name}
                              fill
                              sizes="56px"
                              className={item.isCutoutDrink ? 'object-contain' : 'object-cover'}
                            />
                          </div>
                        )}
                        <div className="flex-1 min-w-0">
                          <div className="font-display text-base font-bold uppercase text-white truncate">
                            {item.name}
                          </div>
                          <div className="flex flex-wrap items-center gap-1.5 mt-0.5">
                            {item.variantLabel && (
                              <span className="text-xs font-mono text-zinc-400">
                                {item.variantLabel}
                              </span>
                            )}
                            {item.isCombo && (
                              <span className="text-[11px] font-mono font-bold text-[#FFB800]">
                                {dict.cart.comboLabel}
                              </span>
                            )}
                          </div>
                          <div className="font-display text-sm font-bold text-[#FF6B00] mt-1">
                            {formatFt(item.unitPrice * item.quantity)}
                          </div>
                        </div>

                        {/* Quantity Stepper */}
                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() =>
                              item.quantity === 1
                                ? onRemove(item.key)
                                : onUpdateQty(item.key, -1)
                            }
                            className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/15 flex items-center justify-center text-white transition-colors cursor-pointer"
                            aria-label="Decrease"
                          >
                            <Minus className="w-3.5 h-3.5" />
                          </button>
                          <span className="w-6 text-center font-mono text-sm font-bold text-white">
                            {item.quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() => onUpdateQty(item.key, 1)}
                            className="w-8 h-8 rounded-full bg-white/10 hover:bg-[#FF6B00] hover:text-black flex items-center justify-center text-white transition-colors cursor-pointer"
                            aria-label="Increase"
                          >
                            <Plus className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                )}
              </div>

              {/* Footer Calculator, Collapsible Calorie Breakdown & Direct Phone Order CTA */}
              {items.length > 0 && (
                <div className="p-6 border-t border-white/10 bg-[#0E1118] space-y-4">
                  {/* Optional Discount Toggles */}
                  <div className="flex flex-wrap gap-2">
                    <button
                      type="button"
                      onClick={() =>
                        setDiscountMode(discountMode === '10' ? 'none' : '10')
                      }
                      className={`px-3 py-1.5 rounded-full text-xs font-mono uppercase tracking-wider transition-all cursor-pointer ${
                        discountMode === '10'
                          ? 'bg-[#FF6B00] text-black font-bold'
                          : 'bg-white/5 text-zinc-400 hover:text-white'
                      }`}
                    >
                      {dict.cart.discountToggle10}
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        setDiscountMode(discountMode === '20' ? 'none' : '20')
                      }
                      className={`px-3 py-1.5 rounded-full text-xs font-mono uppercase tracking-wider transition-all cursor-pointer ${
                        discountMode === '20'
                          ? 'bg-[#FFB800] text-black font-bold'
                          : 'bg-white/5 text-zinc-400 hover:text-white'
                      }`}
                    >
                      {dict.cart.discountToggle20}
                    </button>
                  </div>

                  {/* Collapsible Complete Nutrition & Macro Table */}
                  <div className="rounded-2xl bg-white/[0.03] border border-white/8 overflow-hidden">
                    <button
                      type="button"
                      onClick={() => setKcalOpen(!kcalOpen)}
                      aria-expanded={kcalOpen}
                      className="w-full px-3.5 py-2.5 flex items-center justify-between text-xs font-mono text-zinc-300 hover:text-white transition-colors cursor-pointer"
                    >
                      <span className="inline-flex items-center gap-1.5 uppercase tracking-wider">
                        <Flame className="w-3.5 h-3.5 text-[#FFB800]" />
                        {dict.cart.kcalToggleLabel}
                      </span>
                      <span className="inline-flex items-center gap-2">
                        <strong className="text-[#FFB800]">
                          ~{totalKcal.toLocaleString('hu-HU')} kcal
                        </strong>
                        <ChevronDown
                          className={`w-3.5 h-3.5 text-zinc-400 transition-transform duration-200 ${
                            kcalOpen ? 'rotate-180' : ''
                          }`}
                        />
                      </span>
                    </button>

                    <AnimatePresence initial={false}>
                      {kcalOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
                          className="overflow-hidden"
                        >
                          <div className="px-3 pb-3 pt-2 border-t border-white/8 text-[11px] font-mono">
                            <div className="overflow-x-auto no-scrollbar">
                              <table className="w-full text-left border-collapse">
                                <thead>
                                  <tr className="border-b border-white/10 text-[10px] uppercase tracking-wider text-zinc-500">
                                    <th className="pb-1.5 pr-2 font-semibold">
                                      {dict.cart.macroHeaders.item}
                                    </th>
                                    <th className="pb-1.5 px-1.5 text-right font-semibold text-[#FFB800]">
                                      {dict.cart.macroHeaders.kcal}
                                    </th>
                                    <th className="pb-1.5 px-1.5 text-right font-semibold">
                                      {dict.cart.macroHeaders.protein}
                                    </th>
                                    <th className="pb-1.5 px-1.5 text-right font-semibold">
                                      {dict.cart.macroHeaders.carbs}
                                    </th>
                                    <th className="pb-1.5 pl-1.5 text-right font-semibold">
                                      {dict.cart.macroHeaders.fat}
                                    </th>
                                  </tr>
                                </thead>
                                <tbody className="divide-y divide-white/[0.05]">
                                  {items.map((it) => {
                                    const q = itemQtySafe(it.quantity);
                                    return (
                                      <tr key={it.key} className="text-zinc-300">
                                        <td className="py-1.5 pr-2 max-w-[135px] truncate text-zinc-200">
                                          {q}× {it.name}
                                        </td>
                                        <td className="py-1.5 px-1.5 text-right text-[#FFB800] whitespace-nowrap">
                                          {(it.unitKcal * q).toLocaleString('hu-HU')}
                                        </td>
                                        <td className="py-1.5 px-1.5 text-right whitespace-nowrap">
                                          {it.unitProteinG * q}g
                                        </td>
                                        <td className="py-1.5 px-1.5 text-right whitespace-nowrap">
                                          {it.unitCarbsG * q}g
                                        </td>
                                        <td className="py-1.5 pl-1.5 text-right whitespace-nowrap">
                                          {it.unitFatG * q}g
                                        </td>
                                      </tr>
                                    );
                                  })}
                                </tbody>
                                <tfoot>
                                  <tr className="border-t border-white/15 font-bold text-white">
                                    <td className="pt-2 pr-2 uppercase text-[10px] tracking-wider text-zinc-300">
                                      {dict.cart.kcalTotalLabel}
                                    </td>
                                    <td className="pt-2 px-1.5 text-right text-[#FFB800] whitespace-nowrap">
                                      ~{totalKcal.toLocaleString('hu-HU')}
                                    </td>
                                    <td className="pt-2 px-1.5 text-right text-emerald-300 whitespace-nowrap">
                                      {totalProtein}g
                                    </td>
                                    <td className="pt-2 px-1.5 text-right text-sky-300 whitespace-nowrap">
                                      {totalCarbs}g
                                    </td>
                                    <td className="pt-2 pl-1.5 text-right text-amber-300 whitespace-nowrap">
                                      {totalFat}g
                                    </td>
                                  </tr>
                                </tfoot>
                              </table>
                            </div>
                            <p className="text-[10px] text-zinc-500 pt-2">
                              {dict.cart.kcalDisclaimer}
                            </p>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Total Row */}
                  <div className="flex items-baseline justify-between pt-1">
                    <div>
                      <span className="text-xs font-mono uppercase tracking-widest text-zinc-400 block">
                        {dict.cart.finalTotalLabel}
                      </span>
                      {discountMode !== 'none' && (
                        <span className="text-xs text-zinc-500 line-through font-mono">
                          {formatFt(subtotal)}
                        </span>
                      )}
                    </div>
                    <div className="font-display text-4xl font-black text-[#FFB800] tracking-tight">
                      {formatFt(finalTotal)}
                    </div>
                  </div>

                  {/* Single Clean Direct Phone Call Order Button (Zero Messenger, Zero Extra Subtext) */}
                  <motion.a
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    href={businessInfo.phoneTel}
                    className="w-full py-4 px-5 rounded-full bg-gradient-to-r from-[#FF6B00] to-[#FFB800] text-black font-extrabold text-sm uppercase tracking-wider flex items-center justify-center gap-2.5 shadow-[0_12px_32px_rgba(255,107,0,0.4)] hover:brightness-110 transition-all"
                  >
                    <Phone className="w-4 h-4 fill-current shrink-0" />
                    <span>{dict.cart.callToOrderCta}</span>
                  </motion.a>
                </div>
              )}
            </motion.aside>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function itemQtySafe(q: number) {
  return Math.max(1, q);
}
