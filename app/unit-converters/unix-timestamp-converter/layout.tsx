import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Unix Timestamp Converter",
  description: "Convert Unix timestamps to readable dates and times — and back again. Free online epoch time converter for developers, database administrators, and system engineers.",
  alternates: {
    canonical: "https://1000freetools.com/unit-converters/unix-timestamp-converter",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
