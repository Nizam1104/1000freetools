import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "JSON Sensitive Data Masker – Mask JSON Fields",
  description: "Mask sensitive fields like emails, passwords, and API tokens in JSON data. Our free JSON Sensitive Data Masker makes it safe to share logs and API responses without exposing private information.",
  alternates: {
    canonical: "https://1000freetools.com/json-tools/json-sensitive-data-maser",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
