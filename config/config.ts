// See https://umijs.org/docs/api/config for more about umi configurations.

import { defineConfig } from "umi";

import routes from "./routes";

export default defineConfig({
  routes,
  proxy: {
    "/api": {
      target: process.env.AMAP_API,
      changeOrigin: true,
      pathRewrite: { "^/api": "" },
    },
  },
});
