import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  server: {
    proxy: {
      '/update-prompt': {
        target: 'http://149.56.130.98:5014',
        changeOrigin: true,
        configure: (proxy, _options) => {
          proxy.on('error', (err, _req, _res) => {
            console.log('proxy error', err);
          });
          proxy.on('proxyReq', (_proxyReq, req, _res) => {
            console.log('Sending Request to the Target:', req.method, req.url);
          });
          proxy.on('proxyRes', (proxyRes, req, _res) => {
            console.log('Received Response from the Target:', proxyRes.statusCode, req.url);
            if (proxyRes.statusCode === 200) {
              console.log('\x1b[32m%s\x1b[0m', '✅ [Terminal] Prompt updated successfully !');
            }
          });
        },
      },
      '/view-prompt': {
        target: 'http://149.56.130.98:5014',
        changeOrigin: true,
      },
    },
  },
});
