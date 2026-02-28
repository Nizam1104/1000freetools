import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "JSON Key Extractor – Extract All JSON Keys",
  description: "Extract every unique key from any JSON object or array with one click. Our free JSON Key Extractor outputs a clean list of all keys for quick analysis and mapping.",
  alternates: {
    canonical: "https://1000freetools.com/json-tools/json-key-extractor",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
