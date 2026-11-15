import type { DesignTokens, ColorTokens, ColorMode as ColorModeType } from "../tokens";
import { colors, spacing, typography, radius, shadows, breakpoints } from "../tokens";

export type ColorMode = ColorModeType;

export interface MesomianTheme extends DesignTokens {
  mode: ColorMode;
}

const defaultTheme: MesomianTheme = {
  mode: "light",
  colors,
  spacing,
  typography,
  radius,
  shadows,
  breakpoints,
};

function isPlainObject(item: unknown): item is Record<string, unknown> {
  return item !== null && typeof item === "object" && !Array.isArray(item);
}

function mergeInto(target: Record<string, unknown>, source: Record<string, unknown>): Record<string, unknown> {
  const output = { ...target };
  Object.keys(source).forEach((key) => {
    const sourceVal = source[key];
    const targetVal = output[key];
    if (isPlainObject(sourceVal) && isPlainObject(targetVal)) {
      output[key] = mergeInto(targetVal, sourceVal);
    } else if (sourceVal !== undefined) {
      output[key] = sourceVal;
    }
  });
  return output;
}

export function deepMerge(target: MesomianTheme, source: Partial<MesomianTheme>): MesomianTheme {
  return mergeInto(target as unknown as Record<string, unknown>, source as unknown as Record<string, unknown>) as unknown as MesomianTheme;
}

export function createTheme(overrides: Partial<MesomianTheme> = {}): MesomianTheme {
  return deepMerge(defaultTheme, overrides);
}

export function getColorTokens(theme: MesomianTheme): ColorTokens {
  return theme.colors[theme.mode];
}

export { defaultTheme };
