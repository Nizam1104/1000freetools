import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";

export const metadata: Metadata = {
  title: "Diaper Usage Estimator – Calculate Monthly Diaper Costs for Your Baby",
  description: "Budget for baby with our Diaper Usage Estimator. Enter your baby&apos;s age            and diaper usage to calculate monthly usage and total diaper expenses —            helping new parents plan their budgets confidently.",
  alternates: {
    canonical: "https://1000freetools.com/calculators/diaper-usage-estimator",
  },
};

const tools = [
  {
    "name": "Baby Age Calculator",
    "description": "Baby Age Calculator – Free Infant Age Calculator in Weeks and Months",
    "href": "/calculators/baby-age-calculator"
  },
  {
    "name": "Baby Feeding Chart Calculator",
    "description": "Baby Feeding Chart Calculator – How Much & How Often to Feed Your Baby",
    "href": "/calculators/baby-feeding-chart-calculator"
  },
  {
    "name": "Child Height Predictor",
    "description": "Child Height Predictor – Free Adult Height Calculator",
    "href": "/calculators/child-height-predictor"
  },
  {
    "name": "Toddler Growth Chart Calculator",
    "description": "Toddler Growth Chart Calculator – Track Height & Weight Percentiles for Your Child",
    "href": "/calculators/toddler-growth-chart-calculator"
  },
  {
    "name": "Pet Age Calculator",
    "description": "Pet Age Calculator – Convert Dog & Cat Age to Human Years",
    "href": "/calculators/pet-age-calculator"
  },
  {
    "name": "Baby Sleep Schedule Calculator",
    "description": "Baby Sleep Schedule Calculator – Create the Perfect Sleep Routine for Your Baby",
    "href": "/calculators/baby-sleep-schedule-calculator"
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
