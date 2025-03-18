// @ts-check
import { defineConfig } from "astro/config";

import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
  site: "https://hello.zdk.tsukuba.ac.jp",
  integrations: [sitemap()]
});