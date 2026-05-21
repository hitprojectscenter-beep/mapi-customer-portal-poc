"use client";

import { useEffect, useRef, useState } from "react";

interface Props {
  value: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
  className?: string;
  format?: "number" | "compact";
}

export default function WowCounter({
  value,
  suffix = "",
  prefix = "",
  duration = 1800,
  className = "",
  format = "compact"
}: Props) {
  const [display, setDisplay] = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const obs = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting && !started) {
            setStarted(true);
            obs.disconnect();
          }
        }
      },
      { threshold: 0.4 }
    );
    obs.observe(ref.current);
    return () => obs.disconnect();
  }, [started]);

  useEffect(() => {
    if (!started) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      setDisplay(value);
      return;
    }
    const start = performance.now();
    let raf = 0;
    const animate = (t: number) => {
      const progress = Math.min((t - start) / duration, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(value * eased);
      if (progress < 1) {
        raf = requestAnimationFrame(animate);
      } else {
        setDisplay(value);
      }
    };
    raf = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(raf);
  }, [started, value, duration]);

  const formatted = (() => {
    if (format === "compact") {
      if (value >= 1_000_000) return (display / 1_000_000).toFixed(display === value ? 1 : 1) + "M";
      if (value >= 1_000) return Math.round(display / 1_000) + "K";
    }
    return Math.round(display).toLocaleString();
  })();

  return (
    <span ref={ref} className={className}>
      {prefix}
      {formatted}
      {suffix}
    </span>
  );
}
