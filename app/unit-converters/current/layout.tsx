import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Electric Current Converter",
  description: "Convert electric current units — amperes, milliamperes, microamperes, kiloamperes, and more. Free online current converter for electronics, electrical engineering, and circuit design.",
  alternates: {
    canonical: "https://1000freetools.com/unit-converters/current",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
