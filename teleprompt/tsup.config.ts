import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['src/index.ts', 'src/plugins/esbuild.ts', 'src/plugins/vite.ts'],
  format: ['cjs', 'esm'],
  splitting: false,
  dts: true,
  sourcemap: false,
  clean: true,
})
