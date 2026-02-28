import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "JSON to .env Converter – Export Config as ENV",
  description: "Convert JSON configuration objects into .env key-value format instantly. Our free JSON Env Converter makes it easy to migrate app settings between JSON configs and environment variables.",
  alternates: {
    canonical: "https://1000freetools.com/json-tools/json-env-converter",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
