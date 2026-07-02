"use client";

interface Props {
  value: number;
  size?: "sm" | "md" | "lg";
  showValue?: boolean;
  count?: number;
}

export default function StarRating({ value, size = "md", showValue = false, count }: Props) {
  const px = size === "sm" ? 14 : size === "lg" ? 22 : 18;
  const stars = [1, 2, 3, 4, 5].map(i => {
    const full = value >= i;
    const half = !full && value >= i - 0.5;
    return { i, full, half };
  });
  return (
    <div className="inline-flex items-center gap-1" aria-label={`דירוג ${value} מתוך 5`}>
      <div className="flex flex-row-reverse" style={{ direction: "ltr" }}>
        {stars.map(s => (
          <span
            key={s.i}
            className="material-symbols-outlined"
            style={{
              fontSize: px,
              color: s.full || s.half ? "#F59E0B" : "#D1D5DB",
              fontVariationSettings: s.full ? "'FILL' 1" : "'FILL' 0",
              lineHeight: 1
            }}
          >
            {s.half ? "star_half" : "star"}
          </span>
        ))}
      </div>
      {showValue && (
        <span className="text-sm font-semibold text-primary ms-1" dir="ltr">
          {value.toFixed(1)}
        </span>
      )}
      {typeof count === "number" && (
        <span className="text-xs text-on-surface-variant ms-1" dir="ltr">
          ({count})
        </span>
      )}
    </div>
  );
}
