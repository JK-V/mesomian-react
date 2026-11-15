import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { axe } from "jest-axe";
import "jest-axe/extend-expect";
import { ThemeProvider } from "../../ThemeContext";
import Button from "./Button";
import type { MesomianTheme } from "../../theme";

describe("MesomianButton", () => {
  test("renders children and default variant", () => {
    render(
      <ThemeProvider>
        <Button>Click me</Button>
      </ThemeProvider>
    );
    expect(screen.getByRole("button", { name: /click me/i })).toBeInTheDocument();
  });

  test("applies aria-label", () => {
    render(
      <ThemeProvider>
        <Button aria-label="Submit form">Go</Button>
      </ThemeProvider>
    );
    expect(screen.getByRole("button", { name: "Submit form" })).toBeInTheDocument();
  });

  test("disabled button is disabled and aria-disabled", () => {
    render(
      <ThemeProvider>
        <Button disabled>Disabled</Button>
      </ThemeProvider>
    );
    const btn = screen.getByRole("button", { name: /disabled/i });
    expect(btn).toBeDisabled();
    expect(btn).toHaveAttribute("aria-disabled", "true");
  });

  test("calls onClick when enabled", () => {
    const handleClick = jest.fn();
    render(
      <ThemeProvider>
        <Button onClick={handleClick}>Trigger</Button>
      </ThemeProvider>
    );
    fireEvent.click(screen.getByRole("button", { name: /trigger/i }));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  test("does not call onClick when disabled", () => {
    const handleClick = jest.fn();
    render(
      <ThemeProvider>
        <Button disabled onClick={handleClick}>Blocked</Button>
      </ThemeProvider>
    );
    fireEvent.click(screen.getByRole("button", { name: /blocked/i }));
    expect(handleClick).not.toHaveBeenCalled();
  });

  test("meets accessibility standards", async () => {
    const { container } = render(
      <ThemeProvider>
        <Button variant="danger" size="lg">Delete</Button>
      </ThemeProvider>
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  test("supports custom theme colors", () => {
    const fullTokens = {
      primary: "#ff0000",
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
      borderFocus: "#2563eb",
      error: "#dc2626",
      errorHover: "#b91c1c",
      success: "#059669",
      warning: "#d97706",
      focusRing: "rgba(37, 99, 235, 0.4)",
    };
    const customTheme = {
      mode: "light" as const,
      colors: {
        light: fullTokens,
        dark: fullTokens,
      },
    } as Partial<MesomianTheme>;
    render(
      <ThemeProvider theme={customTheme}>
        <Button>Styled</Button>
      </ThemeProvider>
    );
    const btn = screen.getByRole("button", { name: /styled/i });
    expect(btn.style.backgroundColor).toBe("rgb(255, 0, 0)");
  });
});
