import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "JSON Depth Analyzer – Check Nesting Depth",
  description: "Calculate the maximum nesting depth of any JSON structure instantly. Our free JSON Depth Analyzer helps developers understand complexity and avoid deeply nested data issues.",
  alternates: {
    canonical: "https://1000freetools.com/json-tools/json-depth-analyzer",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
