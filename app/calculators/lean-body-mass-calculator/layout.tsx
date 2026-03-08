import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";

export const metadata: Metadata = {
  title: "Lean Body Mass Calculator – Find Your Fat-Free Mass Instantly",
  description: "Determine your lean body mass with our simple calculator. Enter your total weight and body fat percentage to get your fat-free mass—a key metric for fitness and nutrition planning.",
  alternates: {
    canonical: "https://1000freetools.com/calculators/lean-body-mass-calculator",
  },
};

const tools = [
  {
    "name": "Bmi Calculator",
    "description": "BMI Calculator – Free Body Mass Index Calculator Online",
    "href": "/calculators/bmi-calculator"
  },
  {
    "name": "Bmr Calculator",
    "description": "BMR Calculator",
    "href": "/calculators/bmr-calculator"
  },
  {
    "name": "Body Fat Calculator",
    "description": "Body Fat Percentage Calculator – Estimate Your Body Fat Instantly",
    "href": "/calculators/body-fat-calculator"
  },
  {
    "name": "Body Surface Area Calculator",
    "description": "Body Surface Area Calculator – BSA Calculation for Medical Use",
    "href": "/calculators/body-surface-area-calculator"
  },
  {
    "name": "Ideal Weight Calculator",
    "description": "Ideal Weight Calculator – What Is Your Ideal Body Weight?",
    "href": "/calculators/ideal-weight-calculator"
  },
  {
    "name": "Waist To Height Ratio Calculator",
    "description": "Waist-to-Height Ratio Calculator – Assess Your Health Risk",
    "href": "/calculators/waist-to-height-ratio-calculator"
  }
];

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-y-4">
            <header className="max-w-3xl">
        <h1 className="text-3xl font-bold mb-3">Lean Body Mass Calculator – Find Your Fat-Free Mass Instantly</h1>
        <p className="text-muted-foreground">Determine your lean body mass with our simple calculator. Enter your total weight and body fat percentage to get your fat-free mass—a key metric for fitness and nutrition planning.</p>
      </header>
      {children}
      <div className="mt-16 max-w-6xl">
        <h2 className="text-2xl font-semibold mb-6 text-center">Other Free Tools</h2>
        <ToolLinkCards tools={tools} />
      </div>
    </div>
  );
}
