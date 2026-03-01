import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Magnetic Flux Converter",
  description: "Convert magnetic flux units — webers, milliwebers, maxwells, and more. Free online magnetic flux converter for transformer design, motor engineering, and electromagnetic analysis.",
  alternates: {
    canonical: "https://1000freetools.com/unit-converters/magnetic-flux",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
