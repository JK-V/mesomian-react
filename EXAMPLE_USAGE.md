# Mesomian Usage Example

## Install

```bash
npm install react react-dom
npm install -D jest jest-axe @testing-library/react @testing-library/jest-dom babel-jest
```

## Basic usage

```jsx
import { ThemeProvider, Button, Dialog } from "@mesomian/ui";

function App() {
  const [open, setOpen] = useState(false);
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

```jsx
import { ThemeProvider, Button } from "@mesomian/ui";

const projectTheme = {
  mode: "dark",
  colors: {
    light: {
      primary: "#ff4d4f",   // brand red for project A
      borderFocus: "#ff4d4f",
    },
    dark: {
      primary: "#ff7a7a",
      surface: "#1a1a1a",
    },
  },
  radius: {
    lg: "1rem",            // rounded corners for project A
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

```jsx
const theme = {
  colors: {
    light: {
      primary: "#0ea5e9",
    },
  },
  typography: {
    fontSize: {
      base: "1.125rem",
    },
  },
};
```

## Run tests

```bash
npm test
```

Accessibility assertions run on every component via `jest-axe`; they fail the build if ARIA/keyboard/contrast violations are introduced.
