import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "JSON to MongoDB Document Converter Online",
  description: "Convert JSON into MongoDB-compatible document format with proper types and structure. Our free tool helps developers prepare JSON data for insertion into MongoDB collections.",
  alternates: {
    canonical: "https://1000freetools.com/json-tools/json-to-mongodb",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
