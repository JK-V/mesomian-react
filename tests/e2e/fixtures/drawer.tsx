import React from "react";
import ReactDOM from "react-dom/client";
import { DrawerSheet, Button } from "@mesomian/ui";
import { useState } from "react";

function App() {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ padding: "2rem" }}>
      <Button onClick={() => setOpen(true)}>Open drawer</Button>
      <DrawerSheet
        isOpen={open}
        onClose={() => setOpen(false)}
        title="Settings"
      >
        <p>Configure your preferences.</p>
      </DrawerSheet>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root")!);
root.render(<App />);
