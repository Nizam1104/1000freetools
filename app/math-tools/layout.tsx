import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Explore All Math Tools | 1000freetools.com",
    description: "Various Categories of math tools all in one place",
    alternates: {
        canonical: "https://1000freetools.com/math-tools",
    }
};


export default function MathToolsPageLayout({ children }: { children: React.ReactNode }) {
    return children;
}
