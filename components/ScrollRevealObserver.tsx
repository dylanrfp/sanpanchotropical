'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export default function ScrollRevealObserver() {
  const pathname = usePathname();

  useEffect(() => {
    let observer: IntersectionObserver | null = null;
    let idleTimer: NodeJS.Timeout | null = null;

    const IDLE_TIMEOUT = 10000; // 10 seconds of no scrolling

    const handleScroll = () => {
      // Clear timer on every scroll input
      if (idleTimer) clearTimeout(idleTimer);

      // Reset off-screen elements after 10s idle so they re-animate on next scroll
      idleTimer = setTimeout(() => {
        const elements = document.querySelectorAll('.reveal-on-scroll');
        elements.forEach((el) => {
          const rect = el.getBoundingClientRect();
          const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
          if (!isVisible) {
            el.classList.remove('revealed');
            if (observer) {
              observer.unobserve(el);
              observer.observe(el);
            }
          }
        });
      }, IDLE_TIMEOUT);
    };

    const initObserver = () => {
      const elements = document.querySelectorAll('.reveal-on-scroll');
      if (elements.length === 0) return;

      const observerOptions = {
        root: null, // use the viewport
        rootMargin: '0px 0px -40px 0px', // trigger right as element reaches 40px above bottom of viewport
        threshold: 0.05,
      };

      observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
          }
        });
      }, observerOptions);

      elements.forEach((el) => observer!.observe(el));
      window.addEventListener('scroll', handleScroll, { passive: true });
    };

    // Small delay to ensure client-side DOM is rendered after route change
    const mountTimer = setTimeout(initObserver, 60);

    return () => {
      clearTimeout(mountTimer);
      if (idleTimer) clearTimeout(idleTimer);
      window.removeEventListener('scroll', handleScroll);
      if (observer) {
        observer.disconnect();
      }
    };
  }, [pathname]);

  return null;
}
