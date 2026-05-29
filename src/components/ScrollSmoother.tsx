import { useEffect } from "react";

function hasScrollableParent(node: HTMLElement | null): boolean {
  let current = node;
  while (current && current !== document.body) {
    const style = window.getComputedStyle(current);
    const canScroll = /(auto|scroll)/.test(style.overflowY);
    if (canScroll && current.scrollHeight > current.clientHeight) {
      return true;
    }
    current = current.parentElement;
  }
  return false;
}

export function ScrollSmoother() {
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) {
      return;
    }

    const root = document.scrollingElement || document.documentElement;
    let current = window.scrollY;
    let target = current;
    let rafId = 0;

    const speed = 0.55;
    const easing = 0.12;

    const animate = () => {
      current += (target - current) * easing;

      if (Math.abs(target - current) < 0.5) {
        current = target;
        window.scrollTo(0, current);
        rafId = 0;
        return;
      }

      window.scrollTo(0, current);
      rafId = window.requestAnimationFrame(animate);
    };

    const onWheel = (event: WheelEvent) => {
      if (event.ctrlKey || event.metaKey) {
        return;
      }

      const targetElement = event.target as HTMLElement | null;
      if (targetElement && hasScrollableParent(targetElement)) {
        return;
      }

      event.preventDefault();

      const maxScroll = root.scrollHeight - window.innerHeight;
      target = Math.max(0, Math.min(maxScroll, target + event.deltaY * speed));

      if (!rafId) {
        current = window.scrollY;
        rafId = window.requestAnimationFrame(animate);
      }
    };

    window.addEventListener("wheel", onWheel, { passive: false });

    return () => {
      window.removeEventListener("wheel", onWheel);
      if (rafId) {
        window.cancelAnimationFrame(rafId);
      }
    };
  }, []);

  return null;
}
