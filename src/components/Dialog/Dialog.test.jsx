import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import { axe } from "jest-axe";
import { ThemeProvider } from "../../ThemeContext";
import Dialog from "./Dialog";
import "jest-axe/extend-expect";

describe("MesomianDialog", () => {
  test("renders dialog when open", () => {
    render(
      <ThemeProvider>
        <Dialog isOpen onClose={jest.fn()} title="Save changes">
          <p>Are you sure?</p>
        </Dialog>
      </ThemeProvider>
    );
    expect(screen.getByRole("dialog")).toBeInTheDocument();
    expect(screen.getByRole("dialog")).toHaveAttribute("aria-modal", "true");
    expect(screen.getByText("Save changes")).toBeInTheDocument();
    expect(screen.getByText("Are you sure?")).toBeInTheDocument();
  });

  test("does not render when closed", () => {
    render(
      <ThemeProvider>
        <Dialog isOpen={false} onClose={jest.fn()} title="X">
          <p>Y</p>
        </Dialog>
      </ThemeProvider>
    );
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  test("calls onClose on escape key", () => {
    const onClose = jest.fn();
    render(
      <ThemeProvider>
        <Dialog isOpen onClose={onClose} title="Close me">
          <p>content</p>
        </Dialog>
      </ThemeProvider>
    );
    fireEvent.keyDown(document, { key: "Escape" });
    expect(onClose).toHaveBeenCalled();
  });

  test("meets accessibility standards when open", async () => {
    const { container } = render(
      <ThemeProvider>
        <Dialog isOpen onClose={jest.fn()} title="Modal">
          <button>Confirm</button>
        </Dialog>
      </ThemeProvider>
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  test("announces dialog title via aria-labelledby", () => {
    render(
      <ThemeProvider>
        <Dialog isOpen onClose={jest.fn()} title="Delete account">
          <p>This cannot be undone.</p>
        </Dialog>
      </ThemeProvider>
    );
    const dialog = screen.getByRole("dialog");
    expect(dialog).toHaveAttribute("aria-labelledby", "mesomian-dialog-title");
  });
});
