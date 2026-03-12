import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";

export const metadata: Metadata = {
  title: "Venn Diagram Tool – Create 2 & 3 Set Venn Diagrams Online",
  description: "Create interactive Venn diagrams for 2 or 3 sets with our free online tool. Visualize union, intersection, and set differences with customizable labels and shading.",
  alternates: {
    canonical: "https://1000freetools.com/math-tools/venn-diagram-tool",
  },
  openGraph: {
    title: "Venn Diagram Tool – Create 2 & 3 Set Venn Diagrams Online",
    description: "Create interactive Venn diagrams for 2 or 3 sets with our free online tool. Visualize union, intersection, and set differences with customizable labels and shading.",
    type: "website",
    url: "https://1000freetools.com/math-tools/venn-diagram-tool",
    siteName: "1000 Free Tools",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Venn Diagram Tool – Create 2 & 3 Set Venn Diagrams Online",
    description: "Create interactive Venn diagrams for 2 or 3 sets with our free online tool. Visualize union, intersection, and set differences with customizable labels and shading.",
  },
};

const tools = [
  {
    "name": "Union of Sets Calculator – Find A ∪ B Online",
    "description": "Calculate the union of any two or more sets with our free online union calculator. Returns all unique elements combined from each set with clear set notation.",
    "href": "/math-tools/union-of-sets-calculator"
  },
  {
    "name": "Intersection of Sets Calculator – Find A ∩ B Online",
    "description": "Find the intersection of any two or more sets with our free online intersection calculator. Identifies all common elements shared between sets with clear notation.",
    "href": "/math-tools/intersection-of-sets-calculator"
  },
  {
    "name": "Set Difference Calculator – Find A − B Online",
    "description": "Calculate the difference between any two sets with our free online set difference calculator. Find all elements that are in set A but not in set B instantly.",
    "href": "/math-tools/difference-of-sets-calculator"
  },
  {
    "name": "Complement of a Set Calculator – Find Set Complement Online",
    "description": "Find the complement of any set with respect to a universal set using our free online complement calculator. Get all elements in the universal set not present in the given set.",
    "href": "/math-tools/complement-of-set-calculator"
  },
  {
    "name": "Subset Checker – Check if A is a Subset of B Online",
    "description": "Check whether a set is a subset or proper subset of another set with our free online subset checker. Instantly verify set containment relationships with clear explanations.",
    "href": "/math-tools/subset-checker"
  },
  {
    "name": "Power Set Generator – Find All Subsets of a Set Online",
    "description": "Generate the complete power set (all subsets) of any set with our free online power set generator. Lists every possible subset from empty set to the complete set.",
    "href": "/math-tools/power-set-generator"
  },
  {
    "name": "Cartesian Product Calculator – Find A × B Online",
    "description": "Calculate the Cartesian product of any two sets with our free online calculator. Lists all ordered pairs in A × B for set theory, relations, and combinatorics applications.",
    "href": "/math-tools/cartesian-product-calculator"
  },
  {
    "name": "Histogram Generator – Create Histograms Online Free",
    "description": "Create professional histograms from any dataset with our free online histogram generator. Customize bin sizes and view frequency distributions as visual bar charts instantly.",
    "href": "/math-tools/histogram-generator"
  }
];

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-y-4 max-w-6xl">
      {children}
      <div className="mt-16 max-w-6xl">
        <h2 className="text-2xl font-semibold mb-6 text-center">Other Free Tools</h2>
        <ToolLinkCards tools={tools} />
      </div>
    </div>
  );
}
