import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "JSON Schema Validator – Validate Against Schema",
  description: "Validate JSON data against any JSON Schema and get detailed error reports. Our free JSON Schema Validator ensures your data conforms to expected types and structures.",
  alternates: {
    canonical: "https://1000freetools.com/json-tools/json-schema-validator",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
