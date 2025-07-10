import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path';

export default defineConfig({
  server:{
    host: true,
    port:5173,
    allowedHosts:true,
    // watch
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          // Separa bibliotecas grandes em chunks separados
          react: ['react', 'react-dom'],
          vendor: ['lodash', 'axios'],
        },
      },
    },
    chunkSizeWarningLimit: 1000, // Aumenta o limite de aviso para 1000 KB
  },
  plugins: [
    react(),
  ],
});
