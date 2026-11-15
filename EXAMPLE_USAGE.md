# Mesomian Usage Example (TypeScript)

## Install

```bash
npm install react react-dom
npm install -D typescript @types/react @types/react-dom @types/jest jest jest-axe @testing-library/react @testing-library/jest-dom babel-jest @babel/preset-typescript
```

## Basic usage

```tsx
import { ThemeProvider, Button, Dialog, useTheme } from "@mesomian/ui";
import { useState } from "react";

function App() {
  const [open, setOpen] = useState(false);
  const theme = useTheme();
  return (
    <ThemeProvider>
      <Button onClick={() => setOpen(true)}>Open dialog</Button>
      <Dialog isOpen={open} onClose={() => setOpen(false)} title="Confirm">
        <p>Are you sure?</p>
      </Dialog>
    </ThemeProvider>
  );
}
```

## Per-project theming (change colors for different projects)

```tsx
import { ThemeProvider, Button, type MesomianTheme } from "@mesomian/ui";

const projectTheme: Partial<MesomianTheme> = {
  mode: "dark",
  colors: {
    light: {
      primary: "#ff4d4f",
      primaryHover: "#cc0000",
      primaryActive: "#a00000",
      secondary: "#64748b",
      secondaryHover: "#475569",
      surface: "#ffffff",
      surfaceAlt: "#f8fafc",
      background: "#f1f5f9",
      text: "#0f172a",
      textMuted: "#64748b",
      border: "#cbd5e1",
      borderFocus: "#ff4d4f",
      error: "#dc2626",
      errorHover: "#b91c1c",
      success: "#059669",
      warning: "#d97706",
      focusRing: "rgba(37, 99, 235, 0.4)",
    },
    dark: {
      primary: "#ff7a7a",
      surface: "#1a1a1a",
      primaryHover: "#ff9a9a",
      primaryActive: "#ff7a7a",
      secondary: "#94a3b8",
      secondaryHover: "#cbd5e1",
      surfaceAlt: "#1e293b",
      background: "#020617",
      text: "#f8fafc",
      textMuted: "#94a3b8",
      border: "#334155",
      borderFocus: "#ff7a7a",
      error: "#f87171",
      errorHover: "#fca5a5",
      success: "#34d399",
      warning: "#fbbf24",
      focusRing: "rgba(59, 130, 246, 0.5)",
    },
  },
  radius: {
    lg: "1rem",
  },
};

function App() {
  return (
    <ThemeProvider theme={projectTheme}>
      <Button variant="primary">Project A Button</Button>
    </ThemeProvider>
  );
}
```

## Override individual tokens

```tsx
import type { MesomianTheme } from "@mesomian/ui";

const theme: Partial<MesomianTheme> = {
  colors: {
    light: {
      primary: "#0ea5e9",
      primaryHover: "#0284c7",
      primaryActive: "#0369a1",
      secondary: "#64748b",
      secondaryHover: "#475569",
      surface: "#ffffff",
      surfaceAlt: "#f8fafc",
      background: "#f1f5f9",
      text: "#0f172a",
      textMuted: "#64748b",
      border: "#cbd5e1",
      borderFocus: "#0ea5e9",
      error: "#dc2626",
      errorHover: "#b91c1c",
      success: "#059669",
      warning: "#d97706",
      focusRing: "rgba(37, 99, 235, 0.4)",
    },
    dark: {
      primary: "#3b82f6",
      primaryHover: "#60a5fa",
      primaryActive: "#93c5fd",
      secondary: "#94a3b8",
      secondaryHover: "#cbd5e1",
      surface: "#0f172a",
      surfaceAlt: "#1e293b",
      background: "#020617",
      text: "#f8fafc",
      textMuted: "#94a3b8",
      border: "#334155",
      borderFocus: "#60a5fa",
      error: "#f87171",
      errorHover: "#fca5a5",
      success: "#34d399",
      warning: "#fbbf24",
      focusRing: "rgba(59, 130, 246, 0.5)",
    },
  },
  typography: {
    fontSize: {
      base: "1.125rem",
      xs: "0.75rem",
      sm: "0.875rem",
      lg: "1.125rem",
      xl: "1.25rem",
      "2xl": "1.5rem",
      "3xl": "1.875rem",
    },
    fontFamily: {
      sans: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
      mono: "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace",
    },
    fontWeight: {
      normal: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
    },
    lineHeight: {
      tight: 1.25,
      normal: 1.5,
      relaxed: 1.75,
    },
  },
};
```

## Run tests and typecheck

```bash
npm test        # unit + accessibility (jest-axe) tests
npm run typecheck  # tsc --noEmit
npm run lint    # eslint with @typescript-eslint
```

Accessibility assertions run on every component via `jest-axe`; they fail the build if ARIA/keyboard/contrast violations are introduced.
