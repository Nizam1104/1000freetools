import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "JSON Formatter & Beautifier Online",
  description: "Format and beautify raw JSON instantly with our free online JSON Formatter. Customize indentation, collapse nodes, and download clean, readable JSON in one click.",
  alternates: {
    canonical: "https://1000freetools.com/json-tools/json-formatter-beautifier",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
