import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import serve from "rollup-plugin-serve";

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
    !production &&
      serve({
        contentBase: ["public", "."],
        port: 8080,
        open: true,
      }),
  ],
};
