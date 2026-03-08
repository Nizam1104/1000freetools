import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";

export const metadata: Metadata = {
  title: "BMR Calculator",
  description: "Calculate your Basal Metabolic Rate - the calories your body burns at complete rest. Enter your details to find your BMR using the Mifflin-St Jeor equation.",
  alternates: {
    canonical: "https://1000freetools.com/calculators/bmr-calculator",
  },
};

const tools = [
  {
    "name": "Bmi Calculator",
    "description": "BMI Calculator – Free Body Mass Index Calculator Online",
    "href": "/calculators/bmi-calculator"
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
    "name": "Tdee Calculator",
    "description": "TDEE Calculator – Calculate Your Total Daily Energy Expenditure",
    "href": "/calculators/tdee-calculator"
  }
];

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-y-4">
            <header className="max-w-3xl">
        <h1 className="text-3xl font-bold mb-3">BMR Calculator</h1>
        <p className="text-muted-foreground">Calculate your Basal Metabolic Rate - the calories your body burns at complete rest. Enter your details to find your BMR using the Mifflin-St Jeor equation.</p>
      </header>
      {children}
      <div className="mt-16 max-w-6xl">
        <h2 className="text-2xl font-semibold mb-6 text-center">Other Free Tools</h2>
        <ToolLinkCards tools={tools} />
      </div>
    </div>
  );
}
