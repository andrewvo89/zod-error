import { configDefaults, defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    exclude: [...configDefaults.exclude, 'lib/**'],
    coverage: {
      exclude: [...(configDefaults.coverage.exclude ?? []), 'lib/**', '**/index.ts', '**/types.ts'],
    },
  },
});
