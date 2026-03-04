import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";

export const metadata: Metadata = {
  title: "Punnett Square Calculator – Predict Genetic Cross Outcomes",
  description: "Generate Punnett squares for monohybrid and dihybrid genetic crosses with our free calculator. Calculate genotype and phenotype ratios and probabilities instantly. Perfect for biology students, genetics courses, and science teachers.",
  alternates: {
    canonical: "https://1000freetools.com/calculators/punnett-square-calculator",
  },
};

const tools = [
  {
    "name": "Bacterial Growth Calculator",
    "description": "Bacterial Growth Calculator – Model Microbial Population Growth",
    "href": "/bacterial-growth-calculator"
  },
  {
    "name": "Dna Base Count Calculator",
    "description": "DNA Base Count Calculator – Count Nucleotides and GC Content",
    "href": "/dna-base-count-calculator"
  },
  {
    "name": "Nuclear Decay Half Life Calculator",
    "description": "Nuclear Decay Half-Life Calculator – Radioactive Decay",
    "href": "/nuclear-decay-half-life-calculator"
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
        <h1 className="text-3xl font-bold mb-3">Punnett Square Calculator – Predict Genetic Cross Outcomes</h1>
        <p className="text-muted-foreground">Generate Punnett squares for monohybrid and dihybrid genetic crosses with our free calculator. Calculate genotype and phenotype ratios and probabilities instantly. Perfect for biology students, genetics courses, and science teachers.</p>
      </header>
      {children}
      <div className="mt-16 max-w-6xl">
        <h2 className="text-2xl font-semibold mb-6 text-center">Other Free Tools</h2>
        <ToolLinkCards tools={tools} />
      </div>
    </div>
  );
}
