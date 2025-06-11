// bun.build.js
await Bun.build({
  entrypoints: ['./src/index.ts'],
  outdir: './dist',
  target: 'bun', // or 'browser' for client-side code
});
