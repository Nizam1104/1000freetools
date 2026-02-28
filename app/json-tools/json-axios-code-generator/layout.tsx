import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "JSON to Axios Code Generator Online",
  description: "Generate Axios request code from JSON input with proper headers, methods, and body. Our free JSON to Axios generator helps developers scaffold HTTP calls in seconds.",
  alternates: {
    canonical: "https://1000freetools.com/json-tools/json-axios-code-generator",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
