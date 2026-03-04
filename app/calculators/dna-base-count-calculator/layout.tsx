import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";

export const metadata: Metadata = {
  title: "DNA Base Count Calculator – Count Nucleotides and GC Content",
  description: "Analyze any DNA sequence with our DNA base count calculator. Count adenine, thymine, guanine, and cytosine bases and calculate GC content percentage instantly. Useful for molecular biology, genetics, and bioinformatics students.",
  alternates: {
    canonical: "https://1000freetools.com/calculators/dna-base-count-calculator",
  },
};

const tools = [
  {
    "name": "Bacterial Growth Calculator",
    "description": "Bacterial Growth Calculator – Model Microbial Population Growth",
    "href": "/bacterial-growth-calculator"
  },
  {
    "name": "Nuclear Decay Half Life Calculator",
    "description": "Nuclear Decay Half-Life Calculator – Radioactive Decay",
    "href": "/nuclear-decay-half-life-calculator"
  },
  {
    "name": "Punnett Square Calculator",
    "description": "Punnett Square Calculator – Predict Genetic Cross Outcomes",
    "href": "/punnett-square-calculator"
  },
  {
    "name": "0 100 Acceleration Estimator",
    "description": "0-100 Acceleration Estimator – Calculate 0 to 100 km/h Time",
    "href": "/0-100-acceleration-estimator"
  },
  {
    "name": "1rm Calculator",
    "description": "1RM Calculator – Calculate Your One Rep Max for Any Lift",
    "href": "/1rm-calculator"
  },
  {
    "name": "4 Percent Rule Retirement Calculator",
    "description": "4% Rule Retirement Calculator",
    "href": "/4-percent-rule-retirement-calculator"
  }
];

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-y-4">
            <header className="max-w-3xl">
        <h1 className="text-3xl font-bold mb-3">DNA Base Count Calculator – Count Nucleotides and GC Content</h1>
        <p className="text-muted-foreground">Analyze any DNA sequence with our DNA base count calculator. Count adenine, thymine, guanine, and cytosine bases and calculate GC content percentage instantly. Useful for molecular biology, genetics, and bioinformatics students.</p>
      </header>
      {children}
      <div className="mt-16 max-w-6xl">
        <h2 className="text-2xl font-semibold mb-6 text-center">Other Free Tools</h2>
        <ToolLinkCards tools={tools} />
      </div>
    </div>
  );
}
