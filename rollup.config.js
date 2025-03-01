import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import serve from "rollup-plugin-serve";
import copy from "rollup-plugin-copy";

const production = !process.env.ROLLUP_WATCH;

export default {
  input: "src/index.js",
  output: {
    file: "dist/bundle.js",
    format: "iife",
    name: "qrApp",
    sourcemap: true,
  },
  plugins: [
    resolve(),
    commonjs(),
    copy({
      targets: [{ src: "public/index.html", dest: "dist" }],
    }),
    !production &&
      serve({
        contentBase: ["public", "."],
        port: 8080,
        open: true,
      }),
  ],
};
