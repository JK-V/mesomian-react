import {
  useEffect,
  useRef,
  useState,
  useCallback,
  type ReactNode,
  type CSSProperties,
  type KeyboardEventHandler,
} from "react";
import { useTheme, useColorTokens } from "../../ThemeContext";

interface CarouselProps {
  slides: ReactNode[];
  defaultIndex?: number;
  onSlideChange?: (index: number) => void;
  autoplay?: boolean;
  interval?: number;
  showControls?: boolean;
  showIndicators?: boolean;
  "aria-label"?: string;
  className?: string;
  style?: CSSProperties;
}

const Carousel = ({
  slides,
  defaultIndex = 0,
  onSlideChange,
  autoplay = false,
  interval = 5000,
  showControls = true,
  showIndicators = true,
  "aria-label": ariaLabel,
  className,
  style,
}: CarouselProps) => {
  const theme = useTheme();
  const c = useColorTokens();
  const [current, setCurrent] = useState(defaultIndex);
  const [isPaused, setIsPaused] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const lastIndex = slides.length - 1;

  const goTo = useCallback(
    (index: number) => {
      const next = Math.max(0, Math.min(lastIndex, index));
      if (next !== current) {
        setCurrent(next);
        onSlideChange?.(next);
      }
    },
    [current, lastIndex, onSlideChange]
  );

  const next = useCallback(() => goTo(current === lastIndex ? 0 : current + 1), [current, lastIndex, goTo]);
  const prev = useCallback(() => goTo(current === 0 ? lastIndex : current - 1), [current, lastIndex, goTo]);

  const handleKeyDown: KeyboardEventHandler<HTMLDivElement> = useCallback(
    (e) => {
      if (e.key === "ArrowRight") {
        e.preventDefault();
        next();
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        prev();
      }
    },
    [next, prev]
  );

  useEffect(() => {
    if (!autoplay || slides.length <= 1) return;
    const start = () => {
      timerRef.current = setTimeout(() => {
        if (!isPaused) next();
        start();
      }, interval);
    };
    start();
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [autoplay, interval, slides.length, next, isPaused]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    el.addEventListener("mouseenter", () => setIsPaused(true));
    el.addEventListener("mouseleave", () => setIsPaused(false));
    el.addEventListener("focusin", () => setIsPaused(true));
    el.addEventListener("focusout", () => setIsPaused(false));
    return () => {
      el.removeEventListener("mouseenter", () => setIsPaused(true));
      el.removeEventListener("mouseleave", () => setIsPaused(false));
      el.removeEventListener("focusin", () => setIsPaused(true));
      el.removeEventListener("focusout", () => setIsPaused(false));
    };
  }, []);

  return (
    <div
      ref={containerRef}
      role="region"
      aria-roledescription="carousel"
      aria-label={ariaLabel ?? "Carousel"}
      onKeyDown={handleKeyDown}
      className={className ?? ""}
      style={{
        position: "relative",
        display: "flex",
        flexDirection: "column",
        gap: theme.spacing["3"],
        ...style,
      } as CSSProperties}
    >
      <div
        style={{
          position: "relative",
          overflow: "hidden",
          borderRadius: theme.radius.lg,
          border: `1px solid ${c.border}`,
          background: c.surface,
          minHeight: "200px",
        } as CSSProperties}
      >
        <div
          style={{
            display: "flex",
            transition: "transform 0.3s ease",
            transform: `translateX(-${current * 100}%)`,
          } as CSSProperties}
        >
          {slides.map((slide, index) => (
            <div
              key={index}
              style={{
                flex: "0 0 100%",
                maxWidth: "100%",
                padding: theme.spacing["4"],
              } as CSSProperties}
            >
              {slide}
            </div>
          ))}
        </div>
      </div>

      {showControls && slides.length > 1 && (
        <div style={{ display: "flex", justifyContent: "space-between", gap: theme.spacing["2"] }}>
          <button
            type="button"
            onClick={prev}
            disabled={!autoplay && current === 0}
            aria-label="Previous slide"
            style={{
              background: c.primary,
              color: "#ffffff",
              border: `1px solid ${c.primary}`,
              padding: `${theme.spacing["2"]} ${theme.spacing["4"]}`,
              borderRadius: theme.radius.md,
              cursor: "pointer",
              fontFamily: theme.typography.fontFamily.sans,
              fontSize: theme.typography.fontSize.sm,
            }}
          >
            &#9664;
          </button>
          <button
            type="button"
            onClick={next}
            disabled={!autoplay && current === lastIndex}
            aria-label="Next slide"
            style={{
              background: c.primary,
              color: "#ffffff",
              border: `1px solid ${c.primary}`,
              padding: `${theme.spacing["2"]} ${theme.spacing["4"]}`,
              borderRadius: theme.radius.md,
              cursor: "pointer",
              fontFamily: theme.typography.fontFamily.sans,
              fontSize: theme.typography.fontSize.sm,
            }}
          >
            &#9654;
          </button>
        </div>
      )}

      {showIndicators && slides.length > 1 && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: theme.spacing["1"],
          }}
        >
          {slides.map((_, index) => (
            <button
              key={index}
              type="button"
              onClick={() => goTo(index)}
              aria-label={`Go to slide ${index + 1}`}
              aria-current={current === index ? "true" : undefined}
              style={{
                background: current === index ? c.primary : c.border,
                color: current === index ? "#ffffff" : c.textMuted,
                border: "none",
                width: theme.spacing["2"],
                height: theme.spacing["2"],
                borderRadius: theme.radius.full,
                cursor: "pointer",
                padding: 0,
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
};

Carousel.displayName = "MesomianCarousel";

export default Carousel;
