import { StartClient } from "@tanstack/react-start/client";
import { Buffer } from "buffer";
import { StrictMode } from "react";
import { hydrateRoot } from "react-dom/client";

// Polyfill Node.js Buffer for gray-matter in the browser
(globalThis as typeof globalThis & { Buffer: typeof Buffer }).Buffer = Buffer;

hydrateRoot(
  document,
  <StrictMode>
    <StartClient />
  </StrictMode>
);
