import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Color Palette Export Tool",
  description: "Export your color palette as CSS variables, JSON, or plain text. Seamlessly transfer your colors into code, design tools, or documentation.",
  alternates: {
    canonical: "https://1000freetools.com/color-tools/palette-export-tool",
  },
};

export default function PaletteExportToolLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
