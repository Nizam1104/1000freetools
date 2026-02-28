import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dark & Light Mode Color Preview",
  description: "Preview how your colors look in both dark and light UI modes side by side. Test your palette's versatility before committing to a design direction.",
  alternates: {
    canonical: "https://1000freetools.com/color-tools/dark-light-mode-preview",
  },
};

export default function DarkLightModePreviewLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
