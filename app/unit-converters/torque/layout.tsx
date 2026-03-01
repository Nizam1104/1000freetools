import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Torque Converter",
  description: "Convert torque units instantly — newton-meters, pound-feet, kilogram-force centimeters, and more. Accurate online torque converter for automotive, mechanical, and industrial engineering.",
  alternates: {
    canonical: "https://1000freetools.com/unit-converters/torque",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
