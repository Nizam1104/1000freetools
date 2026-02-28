import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "JSON to Fetch Code Generator – Generate JS Fetch",
  description: "Generate JavaScript Fetch API code snippets from JSON request definitions. Our free tool saves development time by auto-generating ready-to-use HTTP request code.",
  alternates: {
    canonical: "https://1000freetools.com/json-tools/json-fetch-code-generator",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
