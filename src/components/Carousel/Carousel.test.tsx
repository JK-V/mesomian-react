import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { axe } from "jest-axe";
import "jest-axe/extend-expect";
import { ThemeProvider } from "../../ThemeContext";
import Carousel from "./Carousel";

const slides = [<div key="1">Slide 1</div>, <div key="2">Slide 2</div>, <div key="3">Slide 3</div>];

describe("MesomianCarousel", () => {
  test("renders region with carousel role", () => {
    render(
      <ThemeProvider>
        <Carousel slides={slides} />
      </ThemeProvider>
    );
    expect(screen.getByRole("region", { name: /carousel/i })).toBeInTheDocument();
  });

  test("renders first slide by default", () => {
    render(
      <ThemeProvider>
        <Carousel slides={slides} />
      </ThemeProvider>
    );
    expect(screen.getByText("Slide 1")).toBeInTheDocument();
  });

  test("navigates to next slide", () => {
    render(
      <ThemeProvider>
        <Carousel slides={slides} showControls />
      </ThemeProvider>
    );
    fireEvent.click(screen.getByLabelText("Next slide"));
    expect(screen.getByText("Slide 2")).toBeInTheDocument();
  });

  test("navigates to previous slide", () => {
    render(
      <ThemeProvider>
        <Carousel slides={slides} defaultIndex={1} showControls />
      </ThemeProvider>
    );
    fireEvent.click(screen.getByLabelText("Previous slide"));
    expect(screen.getByText("Slide 1")).toBeInTheDocument();
  });

  test("jumps to slide via indicator", () => {
    render(
      <ThemeProvider>
        <Carousel slides={slides} showIndicators />
      </ThemeProvider>
    );
    const indicators = screen.getAllByRole("button", { name: /go to slide/i });
    fireEvent.click(indicators[2]);
    expect(screen.getByText("Slide 3")).toBeInTheDocument();
  });

  test("applies aria-label", () => {
    render(
      <ThemeProvider>
        <Carousel slides={slides} aria-label="Product gallery" />
      </ThemeProvider>
    );
    expect(screen.getByRole("region")).toHaveAttribute("aria-label", "Product gallery");
  });

  test("meets accessibility standards", async () => {
    const { container } = render(
      <ThemeProvider>
        <Carousel slides={slides} showControls showIndicators />
      </ThemeProvider>
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  test("handles keyboard navigation", () => {
    render(
      <ThemeProvider>
        <Carousel slides={slides} />
      </ThemeProvider>
    );
    const region = screen.getByRole("region");
    fireEvent.keyDown(region, { key: "ArrowRight" });
    expect(screen.getByText("Slide 2")).toBeInTheDocument();
    fireEvent.keyDown(region, { key: "ArrowLeft" });
    expect(screen.getByText("Slide 1")).toBeInTheDocument();
  });
});
