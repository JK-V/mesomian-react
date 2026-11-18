import React from "react";
import ReactDOM from "react-dom/client";
import { Carousel } from "@mesomian/ui";

const slides = [
  <div key="1">Slide 1</div>,
  <div key="2">Slide 2</div>,
  <div key="3">Slide 3</div>,
];

const root = ReactDOM.createRoot(document.getElementById("root")!);
root.render(<Carousel slides={slides} showControls showIndicators />);
