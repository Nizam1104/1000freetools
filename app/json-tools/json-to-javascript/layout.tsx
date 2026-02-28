import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "JSON to JavaScript Object Converter",
  description: "Convert JSON into properly formatted JavaScript object notation instantly. Our free tool is ideal for developers embedding JSON data directly into JavaScript or Node.js code.",
  alternates: {
    canonical: "https://1000freetools.com/json-tools/json-to-javascript",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
