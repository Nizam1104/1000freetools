import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";

export const metadata: Metadata = {
  title: "Cat Calorie Calculator – Calculate Your Cat&apos;s Daily Calorie Requirements",
  description: "Ensure proper nutrition for your feline companion with our Cat Calorie Calculator.            Enter your cat&apos;s weight, age, and lifestyle to calculate exact daily caloric needs —            ideal for preventing feline obesity and maintaining healthy weight.",
  alternates: {
    canonical: "https://1000freetools.com/calculators/cat-calorie-calculator",
  },
};

const tools = [
  {
    "name": "Dog Calorie Calculator",
    "description": "Dog Calorie Calculator – Find Out How Many Calories Your Dog Needs Per Day",
    "href": "/dog-calorie-calculator"
  },
  {
    "name": "Bird Cage Size Calculator",
    "description": "Bird Cage Size Calculator – Find the Minimum Cage Size for Your Bird",
    "href": "/bird-cage-size-calculator"
  },
  {
    "name": "Horse Feed Calculator",
    "description": "Horse Feed Calculator – Calculate Daily Feed Requirements for Your Horse",
    "href": "/horse-feed-calculator"
  },
  {
    "name": "Livestock Feed Calculator",
    "description": "Livestock Feed Calculator – Calculate Daily Feed Requirements for Farm Animals",
    "href": "/livestock-feed-calculator"
  },
  {
    "name": "Pet Age Calculator",
    "description": "Pet Age Calculator – Convert Dog & Cat Age to Human Years",
    "href": "/pet-age-calculator"
  },
  {
    "name": "0 100 Acceleration Estimator",
    "description": "0-100 Acceleration Estimator – Calculate 0 to 100 km/h Time",
    "href": "/0-100-acceleration-estimator"
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
