import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Apparent Magnitude Converter",
  description: "Convert between apparent magnitude, absolute magnitude, and stellar luminosity. Free online magnitude converter for amateur astronomers, astrophysics students, and stargazers.",
  alternates: {
    canonical: "https://1000freetools.com/unit-converters/apparent-magnitude-converter",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
