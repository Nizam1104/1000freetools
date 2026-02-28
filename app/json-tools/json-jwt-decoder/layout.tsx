import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "JWT Decoder – Decode JWT Tokens Online",
  description: "Decode JWT headers and payloads into readable JSON without signature verification. Our free JWT Decoder is the fastest way to inspect token claims during development and debugging.",
  alternates: {
    canonical: "https://1000freetools.com/json-tools/json-jwt-decoder",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
