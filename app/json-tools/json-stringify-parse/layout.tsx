import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "JSON Stringify & Parse Playground Online",
  description: "Experiment with JSON.stringify and JSON.parse options interactively in your browser. Our free playground is perfect for learning JSON serialization and testing edge cases in JavaScript.",
  alternates: {
    canonical: "https://1000freetools.com/json-tools/json-stringify-parse",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
