import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { axe } from "jest-axe";
import { ThemeProvider } from "../../ThemeContext";
import Button from "./Button";
import "jest-axe/extend-expect";

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
    const customTheme = {
      colors: {
        light: { primary: "#ff0000" },
      },
    };
    render(
      <ThemeProvider theme={customTheme}>
        <Button>Styled</Button>
      </ThemeProvider>
    );
    const btn = screen.getByRole("button", { name: /styled/i });
    expect(btn.style.backgroundColor).toBe("rgb(255, 0, 0)");
  });
});
