import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['esm'],
  clean: true,
  splitting: true,
  treeshake: true,
  target: 'es2022',
  minify: true,
  platform: 'node',
  esbuildOptions(options) {
    options.charset = 'utf8';
    options.define = {
      'process.env.VERSION': `"${require('./package.json').version}"`,
      'process.env.IS_BUILD': "true"
    }
  }
})