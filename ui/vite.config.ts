import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, process.cwd());
    return {
        plugins: [react(), tsconfigPaths()],
        resolve: {
            alias: {
                src: '/src',
                components: '/src/components',
                assets: '/src/assets',
                lib: '/src/lib',
                features: '/src/features',
            },
        },
        server: {
            proxy: {
                '/api': {
                    target: env.VITE_SOURCE, // Backend server
                    changeOrigin: true,
                    rewrite: (path) => path.replace(/^\/api/, ''), // Optional: Remove '/api' prefix
                },
            },
        },
    };
});
