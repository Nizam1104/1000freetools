import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Magnetic Flux Density Converter",
  description: "Convert magnetic flux density units — tesla, millitesla, gauss, microtesla, and more. Free online B-field converter for MRI, motor design, and electromagnetic engineering.",
  alternates: {
    canonical: "https://1000freetools.com/unit-converters/magnetic-flux-density",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
