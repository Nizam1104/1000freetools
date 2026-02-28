import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "JSON Escape & Unescape Tool Online",
  description: "Escape or unescape special characters in JSON strings instantly. Our free JSON Escape Unescape Tool ensures your strings are safe for storage, APIs, and code embedding.",
  alternates: {
    canonical: "https://1000freetools.com/json-tools/json-escape-unescape",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
