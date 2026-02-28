import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "JSON Base64 Encoder & Decoder Online",
  description: "Encode JSON to Base64 or decode Base64 strings back to JSON instantly. Our free tool is essential for handling JWT tokens, API payloads, and data transport encoding.",
  alternates: {
    canonical: "https://1000freetools.com/json-tools/json-base64",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
