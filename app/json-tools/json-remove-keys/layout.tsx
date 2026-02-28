import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "JSON Remove Keys Tool – Delete JSON Keys Online",
  description: "Remove specified keys from JSON objects recursively with a single click. Our free JSON Remove Keys Tool is perfect for sanitizing API responses and stripping sensitive fields.",
  alternates: {
    canonical: "https://1000freetools.com/json-tools/json-remove-keys",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
