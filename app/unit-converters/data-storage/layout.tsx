import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Data Storage Converter",
  description: "Convert digital storage units — bytes, kilobytes, megabytes, gigabytes, terabytes, and beyond. Free online data storage converter for computing, cloud storage, and IT professionals.",
  alternates: {
    canonical: "https://1000freetools.com/unit-converters/data-storage",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
