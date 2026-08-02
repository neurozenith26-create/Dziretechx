import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { imagetools } from 'vite-imagetools'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    // Images imported from src/assets can carry query params (?w=, ?format=,
    // ?as=srcset) and are resized/re-encoded at build time. Files in public/
    // are copied verbatim and never pass through here.
    imagetools(),
  ],
})
