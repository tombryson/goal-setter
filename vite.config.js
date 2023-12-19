import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    hmr: {
      // Enable and configure HMR
      protocol: 'ws', // Using WebSocket (ws) for HMR, can also be 'wss' for secure WebSocket
      host: 'localhost', // Hostname for HMR WebSocket connections
      port: 3000, // Port for HMR WebSocket connections (should be your dev server port)
      // Additional HMR options can be specified here
    },
  },
});
