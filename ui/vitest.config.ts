import { defineConfig } from 'vitest/config';

export default defineConfig({
    test: {
        globals: true,
        environment: 'jsdom',
        setupFiles: './src/tests/setup.ts',
    },
    resolve: {
        alias: {
            src: '/src',
            components: '/src/components',
            assets: '/src/assets',
            lib: '/src/lib',
            features: '/src/features',
        },
    },
});
