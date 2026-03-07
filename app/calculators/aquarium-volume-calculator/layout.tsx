import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";

export const metadata: Metadata = {
  title: "Aquarium Volume Calculator – Calculate Fish Tank Water Capacity",
  description: "Calculate your aquarium's water volume instantly with our free Aquarium Volume Calculator. Enter tank dimensions to find gallons, liters, and recommended fish capacity — essential for proper stocking and water treatment.",
  alternates: {
    canonical: "https://1000freetools.com/calculators/aquarium-volume-calculator",
  },
};

const tools = [
  {
    "name": "Aquarium Co Calculator",
    "description": "Aquarium CO₂ Calculator – Calculate CO₂ Injection Rate for Planted Tanks",
    "href": "/calculators/aquarium-co-calculator"
  },
  {
    "name": "Aquarium Filtration Calculator",
    "description": "Aquarium Filtration Calculator – Find the Right Filter Size for Your Fish Tank",
    "href": "/calculators/aquarium-filtration-calculator"
  },
  {
    "name": "Bird Cage Size Calculator",
    "description": "Bird Cage Size Calculator – Find the Minimum Cage Size for Your Bird",
    "href": "/calculators/bird-cage-size-calculator"
  },
  {
    "name": "Cat Calorie Calculator",
    "description": "Cat Calorie Calculator – Calculate Your Cat&apos;s Daily Calorie Requirements",
    "href": "/calculators/cat-calorie-calculator"
  },
  {
    "name": "Dog Calorie Calculator",
    "description": "Dog Calorie Calculator – Find Out How Many Calories Your Dog Needs Per Day",
    "href": "/calculators/dog-calorie-calculator"
  },
  {
    "name": "Water Requirement Calculator",
    "description": "Water Intake Calculator – How Much Water Should You Drink Per Day?",
    "href": "/calculators/water-requirement-calculator"
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
