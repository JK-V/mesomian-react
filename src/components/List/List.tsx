import { type ReactNode, type CSSProperties } from "react";
import { useTheme, useColorTokens } from "../../ThemeContext";

interface ListProps {
  items: ReactNode[];
  variant?: "default" | "numbered" | "bulleted";
  size?: "sm" | "md" | "lg";
  className?: string;
  style?: CSSProperties;
  "aria-label"?: string;
}

const itemPadding: Record<string, string> = {
  sm: "0.5rem",
  md: "0.75rem",
  lg: "1rem",
};

const List = ({
  items,
  variant = "default",
  size = "md",
  className,
  style,
  "aria-label": ariaLabel,
}: ListProps) => {
  const theme = useTheme();
  const c = useColorTokens();
  const isOrdered = variant === "numbered";
  const Tag = isOrdered ? "ol" : "ul";

  return (
    <Tag
      role="list"
      aria-label={ariaLabel}
      className={className ?? ""}
      style={{
        display: "flex",
        flexDirection: "column",
        gap: theme.spacing["2"],
        margin: 0,
        padding: 0,
        listStyle: isOrdered ? "decimal" : "disc",
        color: c.text,
        fontFamily: theme.typography.fontFamily.sans,
        fontSize: theme.typography.fontSize.base,
        lineHeight: theme.typography.lineHeight.normal,
        ...style,
      } as CSSProperties}
    >
      {items.map((item, index) => (
        <li
          key={index}
          style={{
            padding: itemPadding[size],
            borderBottom: `1px solid ${c.border}`,
            color: c.text,
          } as CSSProperties}
        >
          {item}
        </li>
      ))}
    </Tag>
  );
};

List.displayName = "MesomianList";

export default List;
