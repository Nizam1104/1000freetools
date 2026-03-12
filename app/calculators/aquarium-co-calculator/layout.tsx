import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

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
    "href": "/calculators/aquarium-filtration-calculator"
  },
  {
    "name": "Aquarium Volume Calculator",
    "description": "Aquarium Volume Calculator – Calculate Fish Tank Water Capacity",
    "href": "/calculators/aquarium-volume-calculator"
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
      <div>
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="/calculators">Calculators</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="/calculators/aquarium-co-calculator">Aquarium Co Calculator</BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      {children}
      <div className="mt-16 max-w-6xl">
        <h2 className="text-2xl font-semibold mb-6 text-center">Other Free Tools</h2>
        <ToolLinkCards tools={tools} />
      </div>
    </div>
  );
}
