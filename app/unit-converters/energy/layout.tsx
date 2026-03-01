import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Energy Converter",
  description: "Convert energy units instantly — joules, calories, kilowatt-hours, BTU, electronvolts, and more. Use our free energy converter for physics, nutrition, and engineering needs.",
  alternates: {
    canonical: "https://1000freetools.com/unit-converters/energy",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
