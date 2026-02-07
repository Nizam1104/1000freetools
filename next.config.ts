import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  output: "export",
  turbopack: {}, // Empty turbopack config to silence Next.js 16 warning
  webpack: (config, { isServer }) => {
    // Handle web workers
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        path: false,
        os: false,
      };

      // Handle worker files
      config.module.rules.push({
        test: /\.worker\.js$/,
        use: { loader: "worker-loader" },
      });
      config.module.rules.push({
        test: /\.wasm$/,
        type: "webassembly/async",
      });

      // Exclude TypeScript files in workers directory from being processed by Next.js
      const tsRule = config.module.rules.find(
        (rule: any) => rule.test && rule.test.toString().includes("ts"),
      );
      if (tsRule && tsRule.exclude) {
        if (Array.isArray(tsRule.exclude)) {
          tsRule.exclude.push(/public\/workers/);
        } else {
          tsRule.exclude = [tsRule.exclude, /public\/workers/];
        }
      } else if (tsRule) {
        tsRule.exclude = /public\/workers/;
      }
    }

    return config;
  },
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
