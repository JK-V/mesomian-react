import { createContext, useContext } from "react";
import PropTypes from "prop-types";
import { defaultTheme } from "./theme";

const ThemeContext = createContext(defaultTheme);

export function ThemeProvider({ children, theme }) {
  const mergedTheme = theme ? deepMerge(defaultTheme, theme) : defaultTheme;
  const modeColors = mergedTheme.colors[mergedTheme.mode] ?? mergedTheme.colors.light;
  const resolvedTheme = { ...mergedTheme, colors: modeColors };
  return <ThemeContext.Provider value={resolvedTheme}>{children}</ThemeContext.Provider>;
}

ThemeProvider.propTypes = {
  children: PropTypes.node.isRequired,
  theme: PropTypes.object,
};

export function useTheme() {
  return useContext(ThemeContext);
}

function deepMerge(target, source) {
  const output = { ...target };
  if (isObject(target) && isObject(source)) {
    Object.keys(source).forEach((key) => {
      if (isObject(source[key])) {
        if (!(key in target)) Object.assign(output, { [key]: source[key] });
        else output[key] = deepMerge(target[key], source[key]);
      } else {
        Object.assign(output, { [key]: source[key] });
      }
    });
  }
  return output;
}

function isObject(item) {
  return item && typeof item === "object" && !Array.isArray(item);
}
