import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Free Site SEO Auditor - Full Site Crawl & SEO Audit Tool",
  description:
    "Crawl and audit your entire website for SEO issues. Find broken links, missing meta tags, duplicate content, redirect chains, and more. Free comprehensive SEO site auditor.",
  keywords:
    "seo auditor, site seo audit, website seo checker, seo crawler, broken link checker, seo analysis tool, technical seo audit, on-page seo checker, site health score, seo issues finder",
  openGraph: {
    title: "Free Site SEO Auditor - Full Site Crawl & SEO Audit Tool",
    description:
      "Crawl and audit your entire website for SEO issues. Find broken links, missing meta tags, duplicate content, redirect chains, and more.",
    type: "website",
    url: "https://1000freetools.com/seo-tools/site-seo-auditor",
    images: [
      {
        url: "/seo-auditor-screen-shot.png",
        alt: "Site SEO Auditor Dashboard showing crawl stats, health score, and issues breakdown",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Site SEO Auditor - Full Site Crawl & SEO Audit Tool",
    description:
      "Crawl and audit your entire website for SEO issues. Find broken links, missing meta tags, duplicate content, and more.",
    images: ["/seo-auditor-screen-shot.png"],
  },
  alternates: {
    canonical: "https://1000freetools.com/seo-tools/site-seo-auditor",
  },
};

export default function SEOAuditorPageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <main>{children}</main>;
}