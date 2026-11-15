import { createContext, useContext, useMemo, type ReactNode } from "react";
import type { MesomianTheme } from "./theme";
import type { ColorTokens } from "../tokens";
import { defaultTheme, deepMerge, getColorTokens } from "./theme";

const ThemeContext = createContext<MesomianTheme | undefined>(undefined);

export function ThemeProvider({ children, theme }: { children: ReactNode; theme?: Partial<MesomianTheme> }) {
  const ctx = useContext(ThemeContext);
  const baseTheme = ctx ?? defaultTheme;
  const mergedTheme = useMemo(() => {
    const merged = theme ? deepMerge(baseTheme, theme) : baseTheme;
    return merged;
  }, [baseTheme, theme]);

  return <ThemeContext.Provider value={mergedTheme}>{children}</ThemeContext.Provider>;
}

export function useTheme(): MesomianTheme {
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return ctx;
}

export function useColorTokens(): ColorTokens {
  const theme = useTheme();
  return getColorTokens(theme);
}
