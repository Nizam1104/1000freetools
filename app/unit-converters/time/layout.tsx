import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Time Converter",
  description: "Convert time units instantly — seconds, minutes, hours, days, weeks, months, and years. Simple and accurate online time unit converter for everyday and scientific use.",
  alternates: {
    canonical: "https://1000freetools.com/unit-converters/time",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
