import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mass Flux Density Converter",
  description: "Convert mass flux density units — kg/(m²·s), lb/(ft²·s), and more. Free online mass flux converter for chemical engineering, filtration, and membrane technology.",
  alternates: {
    canonical: "https://1000freetools.com/unit-converters/mass-flux-density",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
