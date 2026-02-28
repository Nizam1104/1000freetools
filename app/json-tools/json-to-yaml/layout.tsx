import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "JSON to YAML Converter – Free Online Tool",
  description: "Convert JSON to YAML with clean indentation and human-readable syntax. Our free JSON to YAML Converter is perfect for configuration files, CI/CD pipelines, and DevOps workflows.",
  alternates: {
    canonical: "https://1000freetools.com/json-tools/json-to-yaml",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
