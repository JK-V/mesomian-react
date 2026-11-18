import {
  useEffect,
  useRef,
  useCallback,
  useState,
  type ReactNode,
  type CSSProperties,
  type MouseEventHandler,
  type KeyboardEventHandler,
} from "react";
import { useTheme, useColorTokens } from "../../ThemeContext";

interface DrawerSheetProps {
  isOpen: boolean;
  onClose: () => void;
  title?: ReactNode;
  description?: ReactNode;
  children: ReactNode;
  placement?: "left" | "right" | "top" | "bottom";
  size?: "sm" | "md" | "lg" | "full";
  closeOnOverlayClick?: boolean;
  closeOnEscape?: boolean;
  className?: { overlay?: string; drawer?: string };
  style?: { overlay?: CSSProperties; drawer?: CSSProperties };
}

const placementStyles: Record<string, CSSProperties> = {
  left: { inset: "0 100% 0 0", transform: "translateX(-100%)" },
  right: { inset: "0 0 0 100%", transform: "translateX(100%)" },
  top: { inset: "100% 0 0 0", transform: "translateY(-100%)" },
  bottom: { inset: "0 0 100% 0", transform: "translateY(100%)" },
};

const sizeWidths: Record<string, string> = {
  sm: "320px",
  md: "480px",
  lg: "640px",
  full: "100%",
};

const DrawerSheet = ({
  isOpen,
  onClose,
  title,
  description,
  children,
  placement = "right",
  size = "md",
  closeOnOverlayClick = true,
  closeOnEscape = true,
  className,
  style = {},
}: DrawerSheetProps) => {
  const theme = useTheme();
  const c = useColorTokens();
  const overlayRef = useRef<HTMLDivElement>(null);
  const drawerRef = useRef<HTMLDivElement>(null);
  const previousFocus = useRef<HTMLElement | null>(null);
  const [mounted, setMounted] = useState(false);

  const handleKeyDown: KeyboardEventHandler<HTMLDivElement> = useCallback(
    (e) => {
      if (e.key === "Escape" && closeOnEscape) {
        onClose();
      }
    },
    [closeOnEscape, onClose]
  );

  useEffect(() => {
    if (isOpen) {
      previousFocus.current = document.activeElement as HTMLElement | null;
      setMounted(true);
      document.body.style.overflow = "hidden";
      document.addEventListener("keydown", handleKeyDown as unknown as (e: KeyboardEvent) => void);
      requestAnimationFrame(() => {
        drawerRef.current?.focus();
      });
    } else {
      setMounted(false);
      document.body.style.overflow = "";
      document.removeEventListener("keydown", handleKeyDown as unknown as (e: KeyboardEvent) => void);
      if (previousFocus.current) previousFocus.current.focus();
    }
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", handleKeyDown as unknown as (e: KeyboardEvent) => void);
    };
  }, [isOpen, handleKeyDown]);

  const handleOverlayClick: MouseEventHandler<HTMLDivElement> = useCallback(
    (e) => {
      if (closeOnOverlayClick && e.target === e.currentTarget) {
        onClose();
      }
    },
    [closeOnOverlayClick, onClose]
  );

  const handleOverlayKeyDown: KeyboardEventHandler<HTMLDivElement> = useCallback(
    (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        if (closeOnOverlayClick) onClose();
      }
    },
    [closeOnEscape, closeOnOverlayClick, onClose]
  );

  if (!isOpen && !mounted) return null;

  const drawerWidth = sizeWidths[size];
  const drawerStyles: CSSProperties = {
    ...placementStyles[placement],
    position: "fixed",
    inset: 0,
    width: placement === "left" || placement === "right" ? drawerWidth : "100%",
    height: placement === "top" || placement === "bottom" ? drawerWidth : "100%",
    background: c.surface,
    border: placement === "left" || placement === "right" ? `1px solid ${c.border}` : "none",
    boxShadow: theme.shadows.lg,
    transform: mounted ? "translateX(0%) translateY(0%)" : placementStyles[placement].transform,
    transition: "transform 0.3s ease-out",
    zIndex: 9999,
    ...style.drawer,
  };

  return (
    <>
      {mounted && (
        <div
          ref={overlayRef}
          onClick={handleOverlayClick}
          onKeyDown={handleOverlayKeyDown}
          role="button"
          tabIndex={0}
          aria-label="Close backdrop"
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0, 0, 0, 0.5)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 9998,
            ...style.overlay,
          } as CSSProperties}
          className={className?.overlay ?? ""}
        />
      )}
      {mounted && (
        <div
          ref={drawerRef}
          role="dialog"
          aria-modal="true"
          aria-labelledby={title ? "mesomian-drawer-title" : undefined}
          aria-describedby={description ? "mesomian-drawer-desc" : undefined}
          style={drawerStyles}
          className={className?.drawer ?? ""}
          tabIndex={-1}
        >
          {title && (
            <h2 id="mesomian-drawer-title" style={{ margin: 0, padding: theme.spacing["4"], fontSize: theme.typography.fontSize.lg, fontWeight: theme.typography.fontWeight.semibold }}>
              {title}
            </h2>
          )}
          {description && (
            <p id="mesomian-drawer-desc" style={{ margin: 0, padding: `0 ${theme.spacing["4"]} ${theme.spacing["2"]}`, color: c.textMuted, fontSize: theme.typography.fontSize.sm }}>
              {description}
            </p>
          )}
          <div style={{ padding: theme.spacing["4"], overflow: "auto" }}>{children}</div>
          <button
            type="button"
            onClick={onClose}
            style={{
              position: "absolute",
              top: theme.spacing["3"],
              right: theme.spacing["3"],
              background: "none",
              border: "none",
              fontSize: theme.typography.fontSize.xl,
              color: c.textMuted,
              cursor: "pointer",
              lineHeight: 1,
              padding: theme.spacing["1"],
              borderRadius: theme.radius.sm,
            }}
            aria-label="Close drawer"
          >
            &times;
          </button>
        </div>
      )}
    </>
  );
};

DrawerSheet.displayName = "MesomianDrawerSheet";

export default DrawerSheet;
