"use client";

// Unified price display: always "החל מ-" prefix + the spec disclaimer line
// "המחיר יכול להשתנות כתלות במפרט ההזמנה." (user requirement 2026-07-25).
// Use everywhere a pre-order price is shown so the messaging is consistent.

interface Props {
  amount: number;
  unit?: string;            // e.g. "₪" or "₪/חודש"
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
  /** Hide the disclaimer line (e.g. tight card footers) */
  hideNote?: boolean;
}

const SIZE: Record<string, string> = {
  sm: "text-lg",
  md: "text-2xl",
  lg: "text-3xl",
  xl: "text-4xl"
};

export const PRICE_NOTE = "המחיר יכול להשתנות כתלות במפרט ההזמנה.";

export default function PriceTag({ amount, unit = "₪", size = "md", className = "", hideNote = false }: Props) {
  const monthly = unit.includes("חודש");
  return (
    <div className={className}>
      <p className="text-[11px] text-on-surface-variant uppercase tracking-wider font-semibold">החל מ-</p>
      <p className={`${SIZE[size]} font-bold text-primary leading-tight`} dir="ltr">
        {monthly ? `${amount.toLocaleString()} ${unit}` : `${unit}${amount.toLocaleString()}`}
      </p>
      {!hideNote && (
        <p className="text-[10px] text-on-surface-variant/80 font-light mt-0.5 leading-snug">
          {PRICE_NOTE}
        </p>
      )}
    </div>
  );
}
