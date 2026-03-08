import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";

export const metadata: Metadata = {
  title: "Bacterial Growth Calculator – Model Microbial Population Growth",
  description: "Model bacterial population growth using exponential growth equations with our bacterial growth calculator. Input initial population, growth rate, and time to predict colony size. Perfect for microbiology, food science, and infectious disease studies.",
  alternates: {
    canonical: "https://1000freetools.com/calculators/bacterial-growth-calculator",
  },
};

const tools = [
  {
    "name": "Dna Base Count Calculator",
    "description": "DNA Base Count Calculator – Count Nucleotides and GC Content",
    "href": "/calculators/dna-base-count-calculator"
  },
  {
    "name": "Nuclear Decay Half Life Calculator",
    "description": "Nuclear Decay Half-Life Calculator – Radioactive Decay",
    "href": "/calculators/nuclear-decay-half-life-calculator"
  },
  {
    "name": "Punnett Square Calculator",
    "description": "Punnett Square Calculator – Predict Genetic Cross Outcomes",
    "href": "/calculators/punnett-square-calculator"
  },
  {
    "name": "0 100 Acceleration Estimator",
    "description": "0-100 Acceleration Estimator – Calculate 0 to 100 km/h Time",
    "href": "/calculators/0-100-acceleration-estimator"
  },
  {
    "name": "1rm Calculator",
    "description": "1RM Calculator – Calculate Your One Rep Max for Any Lift",
    "href": "/calculators/1rm-calculator"
  },
  {
    "name": "4 Percent Rule Retirement Calculator",
    "description": "4% Rule Retirement Calculator",
    "href": "/calculators/4-percent-rule-retirement-calculator"
  }
];

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-y-4">
            <header className="max-w-3xl">
        <h1 className="text-3xl font-bold mb-3">Bacterial Growth Calculator – Model Microbial Population Growth</h1>
        <p className="text-muted-foreground">Model bacterial population growth using exponential growth equations with our bacterial growth calculator. Input initial population, growth rate, and time to predict colony size. Perfect for microbiology, food science, and infectious disease studies.</p>
      </header>
      {children}
      <div className="mt-16 max-w-6xl">
        <h2 className="text-2xl font-semibold mb-6 text-center">Other Free Tools</h2>
        <ToolLinkCards tools={tools} />
      </div>
    </div>
  );
}
