import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "JSON Error Explainer – Fix JSON Errors Online",
  description: "Get clear, plain-language explanations of JSON parsing errors and how to fix them. Our free JSON Error Explanation Tool helps developers and beginners debug invalid JSON fast.",
  alternates: {
    canonical: "https://1000freetools.com/json-tools/json-error-explanation",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
