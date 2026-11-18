import React from "react";
import ReactDOM from "react-dom/client";
import { Button, Dialog, ThemeProvider } from "@mesomian/ui";
import { useState } from "react";

function App() {
  const [open, setOpen] = useState(false);
  return (
    <ThemeProvider>
      <div style={{ padding: "2rem" }}>
        <Button onClick={() => setOpen(true)}>Open dialog</Button>
        <Dialog
          isOpen={open}
          onClose={() => setOpen(false)}
          title="Confirm"
        >
          <p>Are you sure?</p>
        </Dialog>
      </div>
    </ThemeProvider>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root")!);
root.render(<App />);
