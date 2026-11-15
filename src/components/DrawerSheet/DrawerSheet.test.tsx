import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { axe } from "jest-axe";
import "jest-axe/extend-expect";
import { ThemeProvider } from "../../ThemeContext";
import DrawerSheet from "./DrawerSheet";

describe("MesomianDrawerSheet", () => {
  test("renders dialog when open", () => {
    render(
      <ThemeProvider>
        <DrawerSheet isOpen onClose={jest.fn()} title="Settings">
          <p>Configure your preferences.</p>
        </DrawerSheet>
      </ThemeProvider>
    );
    expect(screen.getByRole("dialog")).toBeInTheDocument();
    expect(screen.getByRole("dialog")).toHaveAttribute("aria-modal", "true");
    expect(screen.getByText("Settings")).toBeInTheDocument();
    expect(screen.getByText("Configure your preferences.")).toBeInTheDocument();
  });

  test("does not render when closed", () => {
    render(
      <ThemeProvider>
        <DrawerSheet isOpen={false} onClose={jest.fn()} title="X">
          <p>Y</p>
        </DrawerSheet>
      </ThemeProvider>
    );
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  test("calls onClose on escape key", () => {
    const onClose = jest.fn();
    render(
      <ThemeProvider>
        <DrawerSheet isOpen onClose={onClose} title="Close me">
          <p>content</p>
        </DrawerSheet>
      </ThemeProvider>
    );
    fireEvent.keyDown(document, { key: "Escape" });
    expect(onClose).toHaveBeenCalled();
  });

  test("calls onClose on close button click", () => {
    const onClose = jest.fn();
    render(
      <ThemeProvider>
        <DrawerSheet isOpen onClose={onClose} title="X">
          <p>content</p>
        </DrawerSheet>
      </ThemeProvider>
    );
    const buttons = screen.getAllByRole("button");
    const closeBtn = buttons.find((b) => b.getAttribute("aria-label") === "Close drawer");
    fireEvent.click(closeBtn!);
    expect(onClose).toHaveBeenCalled();
  });

  test("applies aria-labelledby from title", () => {
    render(
      <ThemeProvider>
        <DrawerSheet isOpen onClose={jest.fn()} title="Account">
          <p>content</p>
        </DrawerSheet>
      </ThemeProvider>
    );
    const dialog = screen.getByRole("dialog");
    expect(dialog).toHaveAttribute("aria-labelledby", "mesomian-drawer-title");
  });

  test("meets accessibility standards", async () => {
    const { container } = render(
      <ThemeProvider>
        <DrawerSheet isOpen onClose={jest.fn()} title="Drawer">
          <button>Confirm</button>
        </DrawerSheet>
      </ThemeProvider>
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  test("supports left placement", () => {
    render(
      <ThemeProvider>
        <DrawerSheet isOpen onClose={jest.fn()} placement="left" title="Left">
          <p>content</p>
        </DrawerSheet>
      </ThemeProvider>
    );
    const dialog = screen.getByRole("dialog");
    expect(dialog.style.transform).toContain("translateX(0%)");
  });
});
