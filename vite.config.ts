import { defineConfig } from 'vite';

export default defineConfig({
  base: "./",
  build: {
    rollupOptions: {
      input: {
        main: 'index.html',
        game: 'src/pages/game.html',
        settings: 'src/pages/settings.html',
      },
    },
  },
});