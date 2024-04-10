import { defineConfig } from 'astro/config';
import icon from "astro-icon";

import netlify from "@astrojs/netlify";

// https://astro.build/config
export default defineConfig({
  site: "https://ryanjeynes.co.uk",
  vite: {
    define: {
      __linkedin: JSON.stringify("https://www.linkedin.com/in/ryanjeynes/"),
      __email: JSON.stringify("ryanjeynes@outlook.com"),
      __github: JSON.stringify("https://github.com/RynJyn/")
    },
  },
  integrations: [icon()],
  output: "server",
  adapter: netlify()
});