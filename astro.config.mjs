// import { defineConfig } from "astro/config";
import react from "@astrojs/react";
// import nekoweb from "@indiefellas/astro-adapter-nekoweb";
// import { loadEnv } from "vite";
//
// const env = loadEnv(process.env.NODE_ENV, process.cwd(), "");
// // https://astro.build/config
// export default defineConfig({
//   integrations: [react()],
//   adapter: nekoweb({
//     apiKey: env.NEKOWEB_API_KEY,
//     // cookie: 'your nekoweb cookie for recently updated support (optional)',
//     folder: "dist",
//   }),
// });
import { defineConfig } from 'astro/config';

export default defineConfig({
  integrations: [react()],
  output: 'static'
});
