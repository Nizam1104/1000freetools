import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Favourite Tools - 1000 Free Online Tools",
  description:
    "Access your bookmarked free online tools. Quick access to your favourite utilities that run directly in your browser.",
  openGraph: {
    title: "Favourite Tools - 1000 Free Online Tools",
    description:
      "Access your bookmarked free online tools. Quick access to your favourite utilities that run directly in your browser.",
    type: "website",
  },
  alternates: {
    canonical: "https://1000freetools.com/favourite-tools",
  },
};

export default function FavouriteToolsPageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
