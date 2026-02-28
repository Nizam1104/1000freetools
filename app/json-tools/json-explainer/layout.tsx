import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "JSON Explainer – Understand JSON in Plain English",
  description: "Understand any JSON structure explained in simple, human-readable language. Our free JSON Explainer is perfect for beginners, non-developers, and anyone learning to work with JSON.",
  alternates: {
    canonical: "https://1000freetools.com/json-tools/json-explainer",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
