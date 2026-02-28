import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "JSON to Plain Text Converter Online",
  description: "Flatten JSON into readable plain text key-value pairs for reports, logs, or documentation. Our free JSON to Text Converter makes complex JSON data human-readable in seconds.",
  alternates: {
    canonical: "https://1000freetools.com/json-tools/json-to-text",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
