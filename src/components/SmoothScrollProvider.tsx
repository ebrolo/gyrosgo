'use client';

import React, { useEffect } from 'react';
import Lenis from 'lenis';

let activeLockCount = 0;

function applyScrollLockState() {
  if (typeof window === 'undefined') return;
  if (activeLockCount > 0) {
    window.__lenis?.stop();
    document.documentElement.style.overflow = 'hidden';
    document.body.style.overflow = 'hidden';
  } else {
    document.documentElement.style.overflow = '';
    document.body.style.overflow = '';
    window.__lenis?.start();
  }
}

export function useScrollLock(isLocked: boolean) {
  useEffect(() => {
    if (!isLocked) return;
    activeLockCount += 1;
    applyScrollLockState();
    return () => {
      activeLockCount = Math.max(0, activeLockCount - 1);
      applyScrollLockState();
    };
  }, [isLocked]);
}

export default function SmoothScrollProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.09,
      smoothWheel: true,
    });

    window.__lenis = {
      scrollTo: (target, options) => {
        lenis.scrollTo(target as Parameters<typeof lenis.scrollTo>[0], options);
      },
      stop: () => lenis.stop(),
      start: () => lenis.start(),
    };

    if (activeLockCount > 0) {
      lenis.stop();
    }

    let rafId = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      delete window.__lenis;
    };
  }, []);

  return <>{children}</>;
}

