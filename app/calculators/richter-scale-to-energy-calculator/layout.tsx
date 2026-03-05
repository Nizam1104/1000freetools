import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";

export const metadata: Metadata = {
  title: "Richter Scale to Energy Calculator – Convert Earthquake Magnitude to Energy",
  description: "Understand the true power of earthquakes with our Richter Scale to Energy Calculator.            Enter a magnitude value to see the equivalent energy release in joules and TNT            equivalent — putting seismic events into a real-world perspective.",
  alternates: {
    canonical: "https://1000freetools.com/calculators/richter-scale-to-energy-calculator",
  },
};

const tools = [
  {
    "name": "Nuclear Decay Half Life Calculator",
    "description": "Nuclear Decay Half-Life Calculator – Radioactive Decay",
    "href": "/nuclear-decay-half-life-calculator"
  },
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
      {children}
      <div className="mt-16 max-w-6xl">
        <h2 className="text-2xl font-semibold mb-6 text-center">Other Free Tools</h2>
        <ToolLinkCards tools={tools} />
      </div>
    </div>
  );
}
