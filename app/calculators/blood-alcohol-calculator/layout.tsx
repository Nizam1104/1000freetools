import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";

export const metadata: Metadata = {
  title: "Blood Alcohol Content Calculator – Estimate Your BAC Level",
  description: "Use our BAC calculator to estimate your blood alcohol content based on the number of drinks, your body weight, and time elapsed. Stay safe and make informed decisions.",
  alternates: {
    canonical: "https://1000freetools.com/calculators/blood-alcohol-calculator",
  },
};

const tools = [
  {
    "name": "Cholesterol Ratio Calculator",
    "description": "Cholesterol Ratio Calculator – Free Heart Health Risk Assessment",
    "href": "/cholesterol-ratio-calculator"
  },
  {
    "name": "Blood Sugar Converter",
    "description": "Blood Sugar Converter – Free Glucose Unit Converter mg/dL to mmol/L",
    "href": "/blood-sugar-converter"
  },
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
    "name": "Kidney Function Egfr Calculator",
    "description": "Kidney Function eGFR Calculator – Free CKD-EPI Calculator",
    "href": "/kidney-function-egfr-calculator"
  }
];

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-y-4">
            <header className="max-w-3xl">
        <h1 className="text-3xl font-bold mb-3">Blood Alcohol Content Calculator – Estimate Your BAC Level</h1>
        <p className="text-muted-foreground">Use our BAC calculator to estimate your blood alcohol content based on the number of drinks, your body weight, and time elapsed. Stay safe and make informed decisions.</p>
      </header>
      {children}
      <div className="mt-16 max-w-6xl">
        <h2 className="text-2xl font-semibold mb-6 text-center">Other Free Tools</h2>
        <ToolLinkCards tools={tools} />
      </div>
    </div>
  );
}
