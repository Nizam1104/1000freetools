import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Molar Concentration Converter",
  description: "Convert molar concentration units — mol/L, mmol/L, mol/m³, and more. Free online molarity converter for chemistry, biochemistry, and laboratory solution preparation.",
  alternates: {
    canonical: "https://1000freetools.com/unit-converters/concentration-molar",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
