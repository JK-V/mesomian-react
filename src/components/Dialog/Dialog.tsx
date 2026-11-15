import { useEffect, useRef, useCallback, useState, type ReactNode, type MouseEventHandler, type KeyboardEventHandler } from "react";
import { useTheme, useColorTokens } from "../../ThemeContext";

interface DialogProps {
  isOpen: boolean;
  onClose: () => void;
  title?: ReactNode;
  description?: ReactNode;
  children: ReactNode;
  className?: { overlay?: string; dialog?: string };
  style?: { overlay?: React.CSSProperties; dialog?: React.CSSProperties };
  closeOnOverlayClick?: boolean;
  closeOnEscape?: boolean;
}

function focusableElements(container: HTMLElement | null) {
  if (!container) return [];
  return container.querySelectorAll(
    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"]), details, summary'
  );
}

const Dialog = ({
  isOpen,
  onClose,
  title,
  description,
  children,
  className,
  style = {},
  closeOnOverlayClick = true,
  closeOnEscape = true,
}: DialogProps) => {
  const theme = useTheme();
  const c = useColorTokens();
  const overlayRef = useRef<HTMLDivElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const previousFocus = useRef<HTMLElement | null>(null);
  const [mounted, setMounted] = useState(false);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape" && closeOnEscape) {
        onClose();
      }
      if (e.key === "Tab" && dialogRef.current) {
        const focusables = focusableElements(dialogRef.current);
        const first = focusables[0] as HTMLElement | null;
        const last = focusables[focusables.length - 1] as HTMLElement | null;
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last?.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first?.focus();
        }
      }
    },
    [closeOnEscape, onClose]
  );

  useEffect(() => {
    if (isOpen) {
      previousFocus.current = document.activeElement as HTMLElement | null;
      setMounted(true);
      document.body.style.overflow = "hidden";
      document.addEventListener("keydown", handleKeyDown);
      requestAnimationFrame(() => {
        if (!dialogRef.current) return;
        const focusables = focusableElements(dialogRef.current);
        if (focusables.length) (focusables[0] as HTMLElement).focus();
        else dialogRef.current.focus();
      });
    } else {
      setMounted(false);
      document.body.style.overflow = "";
      document.removeEventListener("keydown", handleKeyDown);
      if (previousFocus.current) previousFocus.current.focus();
    }
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", handleKeyDown);
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

  const dialogStyles: React.CSSProperties = {
    background: c.surface,
    border: `1px solid ${c.border}`,
    borderRadius: theme.radius.lg,
    boxShadow: theme.shadows.lg,
    padding: theme.spacing["6"],
    minWidth: "320px",
    maxWidth: "560px",
    maxHeight: "90vh",
    overflow: "auto",
    outline: "none",
    position: "relative",
    ...style.dialog,
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
          aria-label="Close dialog"
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0, 0, 0, 0.5)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 9999,
            ...style.overlay,
          } as React.CSSProperties}
          className={className?.overlay ?? ""}
        />
      )}
      {mounted && (
        <div
          ref={dialogRef}
          role="dialog"
          aria-modal="true"
          aria-labelledby={title ? "mesomian-dialog-title" : undefined}
          aria-describedby={description ? "mesomian-dialog-desc" : undefined}
          style={dialogStyles}
          className={className?.dialog ?? ""}
        >
          {title && (
            <h2 id="mesomian-dialog-title" style={{ margin: 0, fontSize: theme.typography.fontSize.lg, fontWeight: theme.typography.fontWeight.semibold }}>
              {title}
            </h2>
          )}
          {description && (
            <p id="mesomian-dialog-desc" style={{ margin: "0.5rem 0 0", color: c.textMuted, fontSize: theme.typography.fontSize.sm }}>
              {description}
            </p>
          )}
          <div style={{ marginTop: theme.spacing["4"] }}>{children}</div>
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
            aria-label="Close dialog"
          >
            &times;
          </button>
        </div>
      )}
    </>
  );
};

Dialog.displayName = "MesomianDialog";

export default Dialog;
