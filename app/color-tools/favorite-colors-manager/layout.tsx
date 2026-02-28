import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Favorite Colors Manager",
  description: "Save, organize, and manage your favorite color swatches locally in the browser. Build a personal color library without signing up for anything.",
  alternates: {
    canonical: "https://1000freetools.com/color-tools/favorite-colors-manager",
  },
};

export default function FavoriteColorsManagerLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
