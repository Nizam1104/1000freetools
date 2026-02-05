const path = require("path");

module.exports = [
  {
    target: "webworker",
    entry: "./public/workers/fileZipper.ts",
    output: {
      filename: "fileZipper.bundle.js",
      path: path.resolve(__dirname, "public/workers"),
      globalObject: "self",
    },
    resolve: {
      extensions: [".ts", ".js"],
    },
    module: {
      rules: [
        {
          test: /\.ts$/,
          use: {
            loader: "ts-loader",
            options: {
              configFile: "tsconfig.worker.json",
            },
          },
          exclude: /node_modules/,
        },
      ],
    },
    mode: "production",
    optimization: {
      splitChunks: false, // Disable splitChunks to avoid conflicts
    },
  },
  {
    target: "webworker",
    entry: "./public/workers/imageCompressor.ts",
    output: {
      filename: "imageCompressor.bundle.js",
      path: path.resolve(__dirname, "public/workers"),
      globalObject: "self",
    },
    resolve: {
      extensions: [".ts", ".js"],
    },
    module: {
      rules: [
        {
          test: /\.ts$/,
          use: {
            loader: "ts-loader",
            options: {
              configFile: "tsconfig.worker.json",
            },
          },
          exclude: /node_modules/,
        },
        {
          test: /\.wasm$/,
          type: "asset/resource",
        },
      ],
    },
    externals: {
      // Ignore WASM files as they're loaded dynamically from CDN
      "mozjpeg_enc.wasm": "commonjs2 mozjpeg_enc.wasm",
      "webp_enc.wasm": "commonjs2 webp_enc.wasm",
      "avif_enc.wasm": "commonjs2 avif_enc.wasm",
      "qoi_enc.wasm": "commonjs2 qoi_enc.wasm",
      "jxl_enc.wasm": "commonjs2 jxl_enc.wasm",
      "wp2_enc.wasm": "commonjs2 wp2_enc.wasm",
    },
    mode: "production",
    optimization: {
      splitChunks: false,
    },
  },
];
