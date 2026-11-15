import { forwardRef, type ButtonHTMLAttributes } from "react";
import { useTheme, useColorTokens } from "../../ThemeContext";
import type { DesignTokens } from "../../../tokens";

type ButtonVariant = "primary" | "secondary" | "ghost" | "danger";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "size"> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  disabled?: boolean;
}

const variantStyles = (variant: ButtonVariant, c: DesignTokens["colors"][keyof DesignTokens["colors"]]) => {
  const base = {
    primary: {
      backgroundColor: c.primary,
      color: "#ffffff",
      border: `1px solid ${c.primary}`,
      hover: c.primaryHover,
      active: c.primaryActive,
    },
    secondary: {
      backgroundColor: "transparent",
      color: c.text,
      border: `1px solid ${c.border}`,
      hover: c.surfaceAlt,
      active: c.border,
    },
    ghost: {
      backgroundColor: "transparent",
      color: c.textMuted,
      border: "transparent",
      hover: c.surfaceAlt,
      active: c.border,
    },
    danger: {
      backgroundColor: c.error,
      color: "#ffffff",
      border: `1px solid ${c.error}`,
      hover: c.errorHover,
      active: c.error,
    },
  };
  return base[variant];
};

const sizeStyles: Record<ButtonSize, React.CSSProperties> = {
  sm: { padding: "0.5rem 0.75rem", fontSize: "0.875rem", borderRadius: "0.375rem" },
  md: { padding: "0.625rem 1rem", fontSize: "1rem", borderRadius: "0.375rem" },
  lg: { padding: "0.75rem 1.5rem", fontSize: "1.125rem", borderRadius: "0.5rem" },
};

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
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
    },
    ref
  ) => {
    const theme = useTheme();
    const c = useColorTokens();
    const v = variantStyles(variant, c);
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
        } as React.CSSProperties}
        {...rest}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "MesomianButton";

export default Button;
