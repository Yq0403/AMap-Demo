// See https://umijs.org/docs/api/config for more about umi configurations.

import { defineConfig } from "umi";

import routes from "./routes";

export default defineConfig({
  hash: true,
  routes,
  // outputPath: path.resolve("../../output/build/dist"),
});
