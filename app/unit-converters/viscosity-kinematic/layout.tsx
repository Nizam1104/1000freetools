import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Kinematic Viscosity Converter",
  description: "Convert kinematic viscosity units — m²/s, centistokes, stokes, ft²/s, and more. Accurate online kinematic viscosity converter for fluid dynamics, oil analysis, and hydraulic systems.",
  alternates: {
    canonical: "https://1000freetools.com/unit-converters/viscosity-kinematic",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
