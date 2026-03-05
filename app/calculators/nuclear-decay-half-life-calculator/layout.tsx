import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";

export const metadata: Metadata = {
  title: "Nuclear Decay Half-Life Calculator – Radioactive Decay",
  description: "Calculate radioactive decay using half-life. Find remaining amount after time, or calculate time needed for specific decay.",
  alternates: {
    canonical: "https://1000freetools.com/calculators/nuclear-decay-half-life-calculator",
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
    "name": "Radiation Dose Calculator",
    "description": "Radiation Dose Calculator – Estimate Radiation Exposure",
    "href": "/radiation-dose-calculator"
  },
  {
    "name": "Richter Scale To Energy Calculator",
    "description": "Richter Scale to Energy Calculator – Convert Earthquake Magnitude to Energy",
    "href": "/richter-scale-to-energy-calculator"
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
  }
];

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-y-4">
            <header className="max-w-3xl">
        <h1 className="text-3xl font-bold mb-3">Nuclear Decay Half-Life Calculator – Radioactive Decay</h1>
        <p className="text-muted-foreground">Calculate radioactive decay using half-life. Find remaining amount after time, or calculate time needed for specific decay.</p>
      </header>
      {children}
      <div className="mt-16 max-w-6xl">
        <h2 className="text-2xl font-semibold mb-6 text-center">Other Free Tools</h2>
        <ToolLinkCards tools={tools} />
      </div>
    </div>
  );
}
