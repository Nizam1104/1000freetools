import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "JSON to PHP Array Converter – Free Online",
  description: "Convert JSON into PHP associative array syntax instantly. Our free JSON to PHP Array tool makes it easy to use JSON data directly in your PHP scripts and applications.",
  alternates: {
    canonical: "https://1000freetools.com/json-tools/json-to-php",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
