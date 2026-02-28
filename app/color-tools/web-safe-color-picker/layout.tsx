import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Web Safe Color Picker",
  description: "Pick from the 216 web-safe colors guaranteed to display consistently across all browsers and devices. Ideal for legacy support and cross-platform compatibility.",
  alternates: {
    canonical: "https://1000freetools.com/color-tools/web-safe-color-picker",
  },
};

export default function WebSafeColorPickerLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
