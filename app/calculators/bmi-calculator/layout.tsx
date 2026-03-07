import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";

export const metadata: Metadata = {
  title: "BMI Calculator – Free Body Mass Index Calculator Online",
  description: "Use our free BMI calculator to instantly find your Body Mass Index. Enter your height and weight to check if you're in a healthy weight range. Supports both metric and imperial units.",
  alternates: {
    canonical: "https://1000freetools.com/calculators/bmi-calculator",
  },
};

const tools = [
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
    "name": "Lean Body Mass Calculator",
    "description": "Lean Body Mass Calculator – Find Your Fat-Free Mass Instantly",
    "href": "/calculators/lean-body-mass-calculator"
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
        <h1 className="text-3xl font-bold mb-3">BMI Calculator – Free Body Mass Index Calculator Online</h1>
        <p className="text-muted-foreground">Use our free BMI calculator to instantly find your Body Mass Index. Enter your height and weight to check if you're in a healthy weight range. Supports both metric and imperial units.</p>
      </header>
      {children}
      <div className="mt-16 max-w-6xl">
        <h2 className="text-2xl font-semibold mb-6 text-center">Other Free Tools</h2>
        <ToolLinkCards tools={tools} />
      </div>
    </div>
  );
}
