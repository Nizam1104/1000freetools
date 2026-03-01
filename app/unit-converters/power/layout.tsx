import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Power Converter",
  description: "Convert power units including watts, kilowatts, horsepower, megawatts, and more. Accurate online power converter for mechanical, electrical, and engineering calculations.",
  alternates: {
    canonical: "https://1000freetools.com/unit-converters/power",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
