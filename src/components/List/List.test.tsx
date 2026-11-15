import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { axe } from "jest-axe";
import "jest-axe/extend-expect";
import { ThemeProvider } from "../../ThemeContext";
import List from "./List";

describe("MesomianList", () => {
  const items = ["Apple", "Banana", "Cherry"];

  test("renders list with items", () => {
    render(
      <ThemeProvider>
        <List items={items} />
      </ThemeProvider>
    );
    expect(screen.getByRole("list")).toBeInTheDocument();
    items.forEach((item) => {
      expect(screen.getByText(item)).toBeInTheDocument();
    });
  });

  test("renders ordered list for numbered variant", () => {
    render(
      <ThemeProvider>
        <List items={items} variant="numbered" />
      </ThemeProvider>
    );
    const list = screen.getByRole("list");
    expect(list.tagName).toBe("OL");
  });

  test("renders unordered list by default", () => {
    render(
      <ThemeProvider>
        <List items={items} />
      </ThemeProvider>
    );
    const list = screen.getByRole("list");
    expect(list.tagName).toBe("UL");
  });

  test("applies aria-label", () => {
    render(
      <ThemeProvider>
        <List items={items} aria-label="Fruits" />
      </ThemeProvider>
    );
    expect(screen.getByRole("list")).toHaveAttribute("aria-label", "Fruits");
  });

  test("meets accessibility standards", async () => {
    const { container } = render(
      <ThemeProvider>
        <List items={items} />
      </ThemeProvider>
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
