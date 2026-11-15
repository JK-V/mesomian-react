import { forwardRef } from "react";
import { useTheme } from "../../ThemeContext";

const variantStyles = {
  primary: (t) => ({
    backgroundColor: t.colors.primary,
    color: "#ffffff",
    border: `1px solid ${t.colors.primary}`,
    hover: t.colors.primaryHover,
    active: t.colors.primaryActive,
  }),
  secondary: (t) => ({
    backgroundColor: "transparent",
    color: t.colors.text,
    border: `1px solid ${t.colors.border}`,
    hover: t.colors.surfaceAlt,
    active: t.colors.border,
  }),
  ghost: (t) => ({
    backgroundColor: "transparent",
    color: t.colors.textMuted,
    border: "transparent",
    hover: t.colors.surfaceAlt,
    active: t.colors.border,
  }),
  danger: (t) => ({
    backgroundColor: t.colors.error,
    color: "#ffffff",
    border: `1px solid ${t.colors.error}`,
    hover: t.colors.errorHover,
    active: t.colors.error,
  }),
};

const sizeStyles = {
  sm: { padding: "0.5rem 0.75rem", fontSize: "0.875rem", borderRadius: "0.375rem" },
  md: { padding: "0.625rem 1rem", fontSize: "1rem", borderRadius: "0.375rem" },
  lg: { padding: "0.75rem 1.5rem", fontSize: "1.125rem", borderRadius: "0.5rem" },
};

const Button = forwardRef(
  ({
    children,
    variant = "primary",
    size = "md",
    disabled = false,
    onClick,
    className,
    style,
    type = "button",
    "aria-label": ariaLabel,
    ...rest
  }, ref) => {
    const theme = useTheme();
    const v = variantStyles[variant] ? variantStyles[variant](theme) : variantStyles.primary(theme);
    const s = sizeStyles[size] ?? sizeStyles.md;

    return (
      <button
        ref={ref}
        type={type}
        disabled={disabled}
        onClick={disabled ? undefined : onClick}
        aria-disabled={disabled || undefined}
        aria-label={ariaLabel}
        className={className}
        style={{
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: disabled ? "not-allowed" : "pointer",
          fontFamily: theme.typography.fontFamily.sans,
          fontWeight: theme.typography.fontWeight.medium,
          lineHeight: theme.typography.lineHeight.normal,
          textDecoration: "none",
          borderStyle: "solid",
          borderWidth: "1px",
          outline: "none",
          transition: "background-color 0.15s ease, border-color 0.15s ease, box-shadow 0.15s ease",
          ...s,
          ...v,
          ...style,
        }}
        {...rest}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "MesomianButton";

export default Button;
