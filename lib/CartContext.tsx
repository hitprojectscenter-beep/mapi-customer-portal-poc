"use client";

import React, { createContext, useContext, useEffect, useState, useCallback } from "react";
import type { Service } from "./data";

export interface CartLine {
  slug: string;
  name: string;
  icon: string;
  priceUnit: string;
  unitPrice: number;
  quantity: number;
  variant?: string;
  addedAt: number;
}

interface CartState {
  lines: CartLine[];
  isOpen: boolean;
  add: (service: Service, opts?: { quantity?: number; variant?: string }) => void;
  remove: (slug: string, variant?: string) => void;
  updateQty: (slug: string, quantity: number, variant?: string) => void;
  clear: () => void;
  open: () => void;
  close: () => void;
  toggle: () => void;
  itemCount: number;
  subtotal: number;
  taxTotal: number;
  grandTotal: number;
}

const CartCtx = createContext<CartState | undefined>(undefined);
const STORAGE_KEY = "mapi_cart_v1";

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setLines(JSON.parse(raw));
    } catch { /* ignore */ }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(lines));
    } catch { /* ignore */ }
  }, [lines, hydrated]);

  const add = useCallback((service: Service, opts?: { quantity?: number; variant?: string }) => {
    const qty = opts?.quantity ?? 1;
    const variant = opts?.variant;
    setLines(prev => {
      const idx = prev.findIndex(l => l.slug === service.slug && l.variant === variant);
      if (idx >= 0) {
        const next = [...prev];
        next[idx] = { ...next[idx], quantity: next[idx].quantity + qty };
        return next;
      }
      return [...prev, {
        slug: service.slug,
        name: service.name,
        icon: service.icon,
        priceUnit: service.priceUnit,
        unitPrice: service.priceFrom,
        quantity: qty,
        variant,
        addedAt: Date.now()
      }];
    });
    setIsOpen(true);
  }, []);

  const remove = useCallback((slug: string, variant?: string) => {
    setLines(prev => prev.filter(l => !(l.slug === slug && l.variant === variant)));
  }, []);

  const updateQty = useCallback((slug: string, quantity: number, variant?: string) => {
    if (quantity <= 0) return remove(slug, variant);
    setLines(prev => prev.map(l =>
      l.slug === slug && l.variant === variant ? { ...l, quantity } : l
    ));
  }, [remove]);

  const clear = useCallback(() => setLines([]), []);
  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);
  const toggle = useCallback(() => setIsOpen(o => !o), []);

  const itemCount = lines.reduce((s, l) => s + l.quantity, 0);
  const subtotal = lines.reduce((s, l) => s + (l.unitPrice * l.quantity), 0);
  const taxTotal = Math.round(subtotal * 0.17 * 100) / 100;
  const grandTotal = subtotal + taxTotal;

  return (
    <CartCtx.Provider value={{
      lines, isOpen, add, remove, updateQty, clear, open, close, toggle,
      itemCount, subtotal, taxTotal, grandTotal
    }}>
      {children}
    </CartCtx.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartCtx);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
