import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";

export const metadata: Metadata = {
  title: "Waist-to-Height Ratio Calculator – Assess Your Health Risk",
  description: "The waist-to-height ratio is a powerful predictor of health risks. Use our calculator to see where you stand and get insights on cardiovascular and metabolic health.",
  alternates: {
    canonical: "https://1000freetools.com/calculators/waist-to-height-ratio-calculator",
  },
};

const tools = [
  {
    "name": "Bmi Calculator",
    "description": "BMI Calculator – Free Body Mass Index Calculator Online",
    "href": "/bmi-calculator"
  },
  {
    "name": "Body Fat Calculator",
    "description": "Body Fat Percentage Calculator – Estimate Your Body Fat Instantly",
    "href": "/body-fat-calculator"
  },
  {
    "name": "Body Surface Area Calculator",
    "description": "Body Surface Area Calculator – BSA Calculation for Medical Use",
    "href": "/body-surface-area-calculator"
  },
  {
    "name": "Ideal Weight Calculator",
    "description": "Ideal Weight Calculator – What Is Your Ideal Body Weight?",
    "href": "/ideal-weight-calculator"
  },
  {
    "name": "Lean Body Mass Calculator",
    "description": "Lean Body Mass Calculator – Find Your Fat-Free Mass Instantly",
    "href": "/lean-body-mass-calculator"
  },
  {
    "name": "Waist To Hip Ratio Calculator",
    "description": "Waist-to-Hip Ratio Calculator – Check Your Body Shape & Health Risk",
    "href": "/waist-to-hip-ratio-calculator"
  }
];

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-y-4">
            <header className="max-w-3xl">
        <h1 className="text-3xl font-bold mb-3">Waist-to-Height Ratio Calculator – Assess Your Health Risk</h1>
        <p className="text-muted-foreground">The waist-to-height ratio is a powerful predictor of health risks. Use our calculator to see where you stand and get insights on cardiovascular and metabolic health.</p>
      </header>
      {children}
      <div className="mt-16 max-w-6xl">
        <h2 className="text-2xl font-semibold mb-6 text-center">Other Free Tools</h2>
        <ToolLinkCards tools={tools} />
      </div>
    </div>
  );
}
