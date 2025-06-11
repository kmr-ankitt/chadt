// bun.build.js
await Bun.build({
  entrypoints: ['./src/server.ts'],
  outdir: './dist',
  target: 'bun', // or 'browser' for client-side code
});
