import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";

export const metadata: Metadata = {
  title: "Body Surface Area Calculator – BSA Calculation for Medical Use",
  description: "Calculate your body surface area (BSA) quickly and accurately. Useful for medication dosing, chemotherapy, and clinical assessments using the Mosteller, DuBois, or Haycock formula.",
  alternates: {
    canonical: "https://1000freetools.com/calculators/body-surface-area-calculator",
  },
};

const tools = [
  {
    "name": "Bmi Calculator",
    "description": "BMI Calculator – Free Body Mass Index Calculator Online",
    "href": "/bmi-calculator"
  },
  {
    "name": "Bmr Calculator",
    "description": "BMR Calculator",
    "href": "/bmr-calculator"
  },
  {
    "name": "Body Fat Calculator",
    "description": "Body Fat Percentage Calculator – Estimate Your Body Fat Instantly",
    "href": "/body-fat-calculator"
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
    "name": "Waist To Height Ratio Calculator",
    "description": "Waist-to-Height Ratio Calculator – Assess Your Health Risk",
    "href": "/waist-to-height-ratio-calculator"
  }
];

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-y-4">
            <header className="max-w-3xl">
        <h1 className="text-3xl font-bold mb-3">Body Surface Area Calculator – BSA Calculation for Medical Use</h1>
        <p className="text-muted-foreground">Calculate your body surface area (BSA) quickly and accurately. Useful for medication dosing, chemotherapy, and clinical assessments using the Mosteller, DuBois, or Haycock formula.</p>
      </header>
      {children}
      <div className="mt-16 max-w-6xl">
        <h2 className="text-2xl font-semibold mb-6 text-center">Other Free Tools</h2>
        <ToolLinkCards tools={tools} />
      </div>
    </div>
  );
}
