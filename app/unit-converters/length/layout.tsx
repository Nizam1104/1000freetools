import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Length Converter",
  description: "Instantly convert between all units of length and distance — meters, feet, inches, kilometers, miles, yards, and more. Free online length converter for everyday and scientific use.",
  alternates: {
    canonical: "https://1000freetools.com/unit-converters/length",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
