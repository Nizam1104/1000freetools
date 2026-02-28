import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "JSON Encode & Decode Tool Online",
  description: "Safely encode and decode JSON strings for transport or storage. Our free JSON Encode Decode Tool handles special characters and ensures your data survives serialization correctly.",
  alternates: {
    canonical: "https://1000freetools.com/json-tools/json-encode-decode",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
