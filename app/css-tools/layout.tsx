import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "List of all 40+ css tools provided by 1000freetools",
    description: "Do you need any css tool? that might be here from animation generator to flex box playgrounds, and many more will be added in future",
    alternates: {
        canonical: "https://1000freetools.com/css-tools",
    },
};


export default function CssToolsPageLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex flex-col gap-y-4 max-w-6xl">
            {children}
        </div>
    );
}
