import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Thread Count Converter",
  description: "Convert and compare thread count values across different measurement standards for bed sheets and fabrics. Free online thread count converter for textile buyers and bedding shoppers.",
  alternates: {
    canonical: "https://1000freetools.com/unit-converters/thread-count-converter",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
