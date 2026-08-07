/**
 * Responsive <picture> for images produced by scripts/optimize-images.mjs.
 *
 * Serves AVIF, falls back to WebP, then PNG. Always renders explicit width and
 * height so the browser can reserve the box before the bytes arrive — that is
 * what keeps Cumulative Layout Shift at zero, and it costs nothing.
 *
 * `alt` is required by the type, not optional. Decorative images should pass
 * alt="" explicitly, which is a deliberate statement rather than an omission.
 */
export function Picture({
  name,
  alt,
  widths,
  sizes,
  width,
  height,
  className,
  priority = false,
  fallbackWidth,
}: {
  /** Base filename without extension, e.g. "profile". */
  name: string;
  alt: string;
  /** Generated variant widths, ascending. */
  widths: number[];
  /** CSS `sizes` describing the rendered width at each breakpoint. */
  sizes: string;
  /** Intrinsic width/height used for the aspect-ratio box. */
  width: number;
  height: number;
  className?: string;
  /**
   * True for an above-the-fold LCP image: eager loading plus high fetch
   * priority. Everything else stays lazy — the default, and the right choice.
   */
  priority?: boolean;
  fallbackWidth?: number;
}) {
  const srcset = (ext: string) =>
    widths.map((w) => `/img/${name}-${w}.${ext} ${w}w`).join(", ");

  const fallback = fallbackWidth ?? widths[0];

  return (
    <picture>
      <source type="image/avif" srcSet={srcset("avif")} sizes={sizes} />
      <source type="image/webp" srcSet={srcset("webp")} sizes={sizes} />
      <img
        src={`/img/${name}-${fallback}.png`}
        alt={alt}
        width={width}
        height={height}
        loading={priority ? "eager" : "lazy"}
        // React 18 does not map the camelCase `fetchPriority` prop to the
        // `fetchpriority` attribute (that landed in React 19), so it warns and
        // drops it. Spreading the lowercase name emits the real attribute.
        {...{ fetchpriority: priority ? "high" : "auto" }}
        decoding={priority ? "sync" : "async"}
        className={className}
      />
    </picture>
  );
}
