import { StartClient } from "@tanstack/react-start/client";
import { Buffer } from "buffer";
import { StrictMode, startTransition } from "react";
import { hydrateRoot } from "react-dom/client";
import "./globals.css";

// Polyfill Node.js Buffer for gray-matter in the browser
(globalThis as typeof globalThis & { Buffer: typeof Buffer }).Buffer = Buffer;

startTransition(() => {
  hydrateRoot(
    document,
    <StrictMode>
      <StartClient />
    </StrictMode>
  );
});
