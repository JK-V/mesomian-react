import { useEffect, useRef, useCallback, useState } from "react";
import { useTheme } from "../../ThemeContext";

function focusableElements(container) {
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
}) => {
  const theme = useTheme();
  const overlayRef = useRef(null);
  const dialogRef = useRef(null);
  const previousFocus = useRef(null);
  const [mounted, setMounted] = useState(false);

  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === "Escape" && closeOnEscape) {
        onClose();
      }
      if (e.key === "Tab" && dialogRef.current) {
        const focusables = focusableElements(dialogRef.current);
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    },
    [closeOnEscape, onClose]
  );

  useEffect(() => {
    if (isOpen) {
      previousFocus.current = document.activeElement;
      setMounted(true);
      document.body.style.overflow = "hidden";
      document.addEventListener("keydown", handleKeyDown);
      requestAnimationFrame(() => {
        if (!dialogRef.current) return;
        const focusables = focusableElements(dialogRef.current);
        if (focusables.length) focusables[0].focus();
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

  const handleOverlayClick = useCallback(
    (e) => {
      if (closeOnOverlayClick && e.target === e.currentTarget) {
        onClose();
      }
    },
    [closeOnOverlayClick, onClose]
  );

  if (!isOpen && !mounted) return null;

  return (
    <>
      {mounted && (
        <div
          ref={overlayRef}
          onClick={handleOverlayClick}
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0, 0, 0, 0.5)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 9999,
            ...(style.overlay ?? {}),
          }}
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
          style={{
            background: theme.colors.surface,
            border: `1px solid ${theme.colors.border}`,
            borderRadius: theme.radius.lg,
            boxShadow: theme.shadows.lg,
            padding: theme.spacing[6],
            minWidth: "320px",
            maxWidth: "560px",
            maxHeight: "90vh",
            overflow: "auto",
            outline: "none",
            position: "relative",
            ...(style.dialog ?? {}),
          }}
          className={className?.dialog ?? ""}
        >
          {title && (
            <h2 id="mesomian-dialog-title" style={{ margin: 0, fontSize: theme.typography.fontSize.lg, fontWeight: theme.typography.fontWeight.semibold }}>
              {title}
            </h2>
          )}
          {description && (
            <p id="mesomian-dialog-desc" style={{ margin: "0.5rem 0 0", color: theme.colors.textMuted, fontSize: theme.typography.fontSize.sm }}>
              {description}
            </p>
          )}
          <div style={{ marginTop: theme.spacing[4] }}>{children}</div>
          <button
            type="button"
            onClick={onClose}
            style={{
              position: "absolute",
              top: theme.spacing[3],
              right: theme.spacing[3],
              background: "none",
              border: "none",
              fontSize: theme.typography.fontSize.xl,
              color: theme.colors.textMuted,
              cursor: "pointer",
              lineHeight: 1,
              padding: theme.spacing[1],
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
