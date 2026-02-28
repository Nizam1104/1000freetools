import { Metadata } from "next";

export const metadata: Metadata = {
  title: "CSS Color Name to HEX, RGB & HSL Converter",
  description: "Convert any CSS color name like 'tomato' or 'steelblue' to its HEX, RGB, and HSL equivalents. Quickly look up and translate named CSS colors.",
  alternates: {
    canonical: "https://1000freetools.com/color-tools/css-color-name-converter",
  },
};

export default function CssColorNameConverterLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
