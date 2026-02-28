import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "JSON to Swift Struct Generator Online",
  description: "Generate Swift structs conforming to Codable protocol from JSON. Our free JSON to Swift converter is perfect for iOS developers building type-safe data models quickly.",
  alternates: {
    canonical: "https://1000freetools.com/json-tools/json-to-swift",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
