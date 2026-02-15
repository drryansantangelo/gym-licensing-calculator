import { useEffect, useRef, useCallback } from 'react';

const STORAGE_KEY = 'exit_intent_dismissed_at';
const COOLDOWN_DAYS = 7;
const MOBILE_SCROLL_DEPTH_THRESHOLD = 0.5;
const MOBILE_TIMEOUT_MS = 60_000;

interface UseExitIntentOptions {
  /** Whether any form on the page has been submitted */
  hasSubmittedForm: boolean;
  /** Whether the calculator has active inputs (suppress during engagement) */
  isCalculatorActive: boolean;
  /** Whether another modal is currently open */
  isOtherModalOpen: boolean;
}

export function useExitIntent(
  onTrigger: () => void,
  options: UseExitIntentOptions
) {
  const hasTriggered = useRef(false);
  const maxScrollDepth = useRef(0);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const shouldSuppress = useCallback(() => {
    if (hasTriggered.current) return true;
    if (options.hasSubmittedForm) return true;
    if (options.isCalculatorActive) return true;
    if (options.isOtherModalOpen) return true;

    const dismissedAt = localStorage.getItem(STORAGE_KEY);
    if (dismissedAt) {
      const elapsed = Date.now() - Number(dismissedAt);
      if (elapsed < COOLDOWN_DAYS * 24 * 60 * 60 * 1000) return true;
    }

    return false;
  }, [options.hasSubmittedForm, options.isCalculatorActive, options.isOtherModalOpen]);

  const fire = useCallback(() => {
    if (shouldSuppress()) return;
    hasTriggered.current = true;
    onTrigger();
  }, [shouldSuppress, onTrigger]);

  useEffect(() => {
    const isMobile = window.matchMedia('(pointer: coarse)').matches || window.innerWidth < 768;

    if (isMobile) {
      let lastScrollY = window.scrollY;
      let scrollUpDistance = 0;

      const handleScroll = () => {
        const currentY = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const currentDepth = docHeight > 0 ? currentY / docHeight : 0;
        maxScrollDepth.current = Math.max(maxScrollDepth.current, currentDepth);

        if (currentY < lastScrollY) {
          scrollUpDistance += lastScrollY - currentY;
        } else {
          scrollUpDistance = 0;
        }

        if (
          maxScrollDepth.current >= MOBILE_SCROLL_DEPTH_THRESHOLD &&
          scrollUpDistance > 200
        ) {
          fire();
        }

        lastScrollY = currentY;
      };

      // Timeout fallback — only fire if they've scrolled at least 25% (showing some engagement)
      timeoutRef.current = setTimeout(() => {
        if (maxScrollDepth.current >= 0.25) {
          fire();
        }
      }, MOBILE_TIMEOUT_MS);

      window.addEventListener('scroll', handleScroll, { passive: true });
      return () => {
        window.removeEventListener('scroll', handleScroll);
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
      };
    } else {
      // Desktop: mouse leaves viewport toward top
      const handleMouseLeave = (e: MouseEvent) => {
        if (e.clientY <= 0) {
          fire();
        }
      };

      document.addEventListener('mouseout', handleMouseLeave);
      return () => {
        document.removeEventListener('mouseout', handleMouseLeave);
      };
    }
  }, [fire]);
}

/** Call this when the user dismisses or submits the exit modal */
export function markExitIntentDismissed() {
  localStorage.setItem(STORAGE_KEY, String(Date.now()));
}
