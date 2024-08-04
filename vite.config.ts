import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
	server: {
		cors: false,
		proxy: {
			'/api': {
				target: 'http://34.27.84.77',
				changeOrigin: true,
				secure: false,
			},
		},
	},
	plugins: [react()],
});
