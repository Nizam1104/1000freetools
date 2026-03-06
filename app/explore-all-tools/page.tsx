import type { Metadata } from "next";
import Link from "next/link";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import calculators from "@/json-assets/calculators-links.json";
import unitConvertersLinks from "@/json-assets/unit-converters-links.json";
import colorToolsLinks from "@/json-assets/color-tools-links.json";
import jsonToolLinks from "@/json-assets/json-tools-links.json";
import videoToolLinks from "@/json-assets/video-tool-links.json";
import imageToolLinks from "@/json-assets/image-tool-links.json";
import mathToolsData from "@/json-assets/math-tools-links.json";

import ToolLinkCards from "@/components/utils/ToolLinkCards";

export const metadata: Metadata = {
  title: "Explore All Tools - 1000 Free Online Tools",
  description:
    "Browse all free online tools including image compressors, design utilities, developer tools and more. All tools run directly in your browser with no registration required.",
  openGraph: {
    title: "Explore All Tools - 1000 Free Online Tools",
    description:
      "Browse all free online tools including image compressors, design utilities, developer tools and more. All tools run directly in your browser with no registration required.",
    type: "website",
  },
  alternates: {
    canonical: "https://1000freetools.com/explore-all-tools",
  },
};

// All tools data grouped by category
const toolsByCategory = [
  {
    categoryName: "Image Tools",
    tools: imageToolLinks,
  },
  {
    categoryName: "Design Tools",
    tools: [
      {
        name: "Favicon Generator",
        description:
          "Create Professional Looking Favicon for Free, supports text, image, and emojis",
        href: "/design-tools/favicon-generator",
      },
    ],
  },
  {
    categoryName: "Developer Tools",
    tools: [
      {
        name: "Mock Data Generator",
        description:
          "Generate realistic test data for your applications to speed up development and testing.",
        href: "/developer-tools/mock-data-generator",
      },
      {
        name: "Javascript Online Playground",
        description:
          "Write, run, and test JavaScript code directly in your browser",
        href: "/developer-tools/js-online-compiler",
      },
    ],
  },
  {
    categoryName: "Video Tools",
    tools: videoToolLinks,
  },
  {
    categoryName: "JSON Tools",
    tools: jsonToolLinks,
  },
  {
    categoryName: "Color Tools",
    tools: colorToolsLinks,
  },
  {
    categoryName: "Math Tools",
    tools: mathToolsData.tools,
  },
  {
    categoryName: "Unit Converters",
    tools: unitConvertersLinks,
  },
  {
    categoryName: "Calculators",
    tools: calculators,
  },
];

export default function ExploreAllToolsPage() {
  return (
    <div className="min-h-screen max-w-6xl mx-auto w-full">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
            Explore All Tools
          </h1>
          <p className="text-muted-foreground text-base md:text-lg max-w-3xl mx-auto">
            Browse our comprehensive collection of free online tools that run
            directly in your browser.
          </p>
        </div>
      </section>

      {/* Accordion Categories */}
      <section className=" mx-auto px-4 pb-12 w-full">
        <Accordion type="multiple" className="w-full">
          {toolsByCategory.map((category, categoryIndex) => (
            <AccordionItem key={categoryIndex} value={`item-${categoryIndex}`}>
              <AccordionTrigger className="text-xl md:text-2xl font-bold">
                {category.categoryName}
              </AccordionTrigger>

              <AccordionContent>
                <ToolLinkCards tools={category.tools} />
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>
    </div>
  );
}
