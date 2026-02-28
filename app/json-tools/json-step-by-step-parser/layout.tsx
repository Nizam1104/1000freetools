import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "JSON Step-by-Step Parser – Learn JSON Parsing",
  description: "See how JSON is parsed token by token in a visual, step-by-step walkthrough. Our free JSON Step by Step Parser is the ideal learning tool for understanding JSON structure and syntax.",
  alternates: {
    canonical: "https://1000freetools.com/json-tools/json-step-by-step-parser",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
