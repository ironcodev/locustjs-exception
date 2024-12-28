const { getBabelOutputPlugin } = require("@rollup/plugin-babel");

module.exports = {
  input: "src/index.js",
  plugins: [
    getBabelOutputPlugin({
      presets: ["@babel/preset-env"],
    }),
  ],
  output: [
    { file: "dist/index.cjs.js", format: "cjs" },
    { file: "dist/index.esm.js", format: "es" },
  ],
};
