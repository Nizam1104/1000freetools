import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";

export const metadata: Metadata = {
  title: "Livestock Feed Calculator – Calculate Daily Feed Requirements for Farm Animals",
  description: "Ensure your animals get proper nutrition with our Livestock Feed Calculator. Enter            animal type, live weight, and production stage (growth, lactation, etc.) to calculate            optimal daily feed quantities and reduce feed wastage on your farm.",
  alternates: {
    canonical: "https://1000freetools.com/calculators/livestock-feed-calculator",
  },
};

const tools = [
  {
    "name": "Horse Feed Calculator",
    "description": "Horse Feed Calculator – Calculate Daily Feed Requirements for Your Horse",
    "href": "/calculators/horse-feed-calculator"
  },
  {
    "name": "Dog Calorie Calculator",
    "description": "Dog Calorie Calculator – Find Out How Many Calories Your Dog Needs Per Day",
    "href": "/calculators/dog-calorie-calculator"
  },
  {
    "name": "Cat Calorie Calculator",
    "description": "Cat Calorie Calculator – Calculate Your Cat&apos;s Daily Calorie Requirements",
    "href": "/calculators/cat-calorie-calculator"
  },
  {
    "name": "Bird Cage Size Calculator",
    "description": "Bird Cage Size Calculator – Find the Minimum Cage Size for Your Bird",
    "href": "/calculators/bird-cage-size-calculator"
  },
  {
    "name": "Pet Age Calculator",
    "description": "Pet Age Calculator – Convert Dog & Cat Age to Human Years",
    "href": "/calculators/pet-age-calculator"
  },
  {
    "name": "0 100 Acceleration Estimator",
    "description": "0-100 Acceleration Estimator – Calculate 0 to 100 km/h Time",
    "href": "/calculators/0-100-acceleration-estimator"
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
