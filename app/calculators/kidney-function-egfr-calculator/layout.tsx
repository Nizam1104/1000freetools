import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";

export const metadata: Metadata = {
  title: "Kidney Function eGFR Calculator – Free CKD-EPI Calculator",
  description: "Calculate your estimated Glomerular Filtration Rate (eGFR) using the CKD-EPI formula. Enter serum creatinine, age, gender, and race to assess kidney function and determine CKD stage.",
  alternates: {
    canonical: "https://1000freetools.com/calculators/kidney-function-egfr-calculator",
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
    "name": "Ideal Weight Calculator",
    "description": "Ideal Weight Calculator – What Is Your Ideal Body Weight?",
    "href": "/ideal-weight-calculator"
  }
];

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-y-4">
            <header className="max-w-3xl">
        <h1 className="text-3xl font-bold mb-3">Kidney Function eGFR Calculator – Free CKD-EPI Calculator</h1>
        <p className="text-muted-foreground">Calculate your estimated Glomerular Filtration Rate (eGFR) using the CKD-EPI formula. Enter serum creatinine, age, gender, and race to assess kidney function and determine CKD stage.</p>
      </header>
      {children}
      <div className="mt-16 max-w-6xl">
        <h2 className="text-2xl font-semibold mb-6 text-center">Other Free Tools</h2>
        <ToolLinkCards tools={tools} />
      </div>
    </div>
  );
}
