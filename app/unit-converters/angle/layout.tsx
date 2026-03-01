import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Angle Converter",
  description: "Convert angle units including degrees, radians, gradians, arcminutes, arcseconds, and more. Accurate online angle converter for geometry, trigonometry, and engineering.",
  alternates: {
    canonical: "https://1000freetools.com/unit-converters/angle",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
