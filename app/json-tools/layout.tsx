import { Metadata } from "next";

export const metadata: Metadata = {
  title: "JSON Tools - Free Online JSON Utilities | 1000 Free Tools",
  description:
    "Free online JSON tools: validate, format, minify, convert, search, and analyze JSON data. All tools run in your browser—fast, secure, and privacy-focused.",
  alternates: {
    canonical: "https://1000freetools.com/json-tools",
  },
  openGraph: {
    title: "JSON Tools - Free Online JSON Utilities",
    description:
      "Comprehensive JSON tools for developers: validator, formatter, converter, searcher, and more.",
    type: "website",
  },
};

export default function JSONToolsPageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
