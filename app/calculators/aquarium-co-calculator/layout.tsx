import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";

export const metadata: Metadata = {
  title: "Aquarium CO₂ Calculator – Calculate CO₂ Injection Rate for Planted Tanks",
  description: "Optimize plant growth in your aquarium with our CO₂ Calculator.            Enter tank volume, target CO₂ concentration, and current pH and KH levels            to calculate the required CO₂ injection rate — essential for serious            planted tank enthusiasts.",
  alternates: {
    canonical: "https://1000freetools.com/calculators/aquarium-co-calculator",
  },
};

const tools = [
  {
    "name": "Aquarium Filtration Calculator",
    "description": "Aquarium Filtration Calculator – Find the Right Filter Size for Your Fish Tank",
    "href": "/aquarium-filtration-calculator"
  },
  {
    "name": "Aquarium Volume Calculator",
    "description": "Aquarium Volume Calculator – Calculate Fish Tank Water Capacity",
    "href": "/aquarium-volume-calculator"
  },
  {
    "name": "Bird Cage Size Calculator",
    "description": "Bird Cage Size Calculator – Find the Minimum Cage Size for Your Bird",
    "href": "/bird-cage-size-calculator"
  },
  {
    "name": "Cat Calorie Calculator",
    "description": "Cat Calorie Calculator – Calculate Your Cat&apos;s Daily Calorie Requirements",
    "href": "/cat-calorie-calculator"
  },
  {
    "name": "Dog Calorie Calculator",
    "description": "Dog Calorie Calculator – Find Out How Many Calories Your Dog Needs Per Day",
    "href": "/dog-calorie-calculator"
  },
  {
    "name": "Water Requirement Calculator",
    "description": "Water Intake Calculator – How Much Water Should You Drink Per Day?",
    "href": "/water-requirement-calculator"
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
