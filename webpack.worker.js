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
    entry: "./lib/workers/mockDataWorker.ts",
    output: {
      filename: "mockDataWorker.bundle.js",
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
      splitChunks: false,
    },
  },
];
