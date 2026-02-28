import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "JSON Unflatten Tool – Restore Nested Structure",
  description: "Convert flattened dot-notation JSON back into a fully nested JSON structure. Our free JSON Unflatten Tool reverses flattening to restore your original data hierarchy.",
  alternates: {
    canonical: "https://1000freetools.com/json-tools/json-unflatten",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
