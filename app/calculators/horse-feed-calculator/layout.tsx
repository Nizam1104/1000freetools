import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";

export const metadata: Metadata = {
  title: "Horse Feed Calculator – Calculate Daily Feed Requirements for Your Horse",
  description: "Fuel your horse's performance and health with our Horse Feed Calculator. Enter body weight, workload level, and life stage to calculate daily forage (hay) and concentrate requirements — based on equine nutrition guidelines.",
  alternates: {
    canonical: "https://1000freetools.com/calculators/horse-feed-calculator",
  },
};

const tools = [
  {
    "name": "Livestock Feed Calculator",
    "description": "Livestock Feed Calculator – Calculate Daily Feed Requirements for Farm Animals",
    "href": "/livestock-feed-calculator"
  },
  {
    "name": "Dog Calorie Calculator",
    "description": "Dog Calorie Calculator – Find Out How Many Calories Your Dog Needs Per Day",
    "href": "/dog-calorie-calculator"
  },
  {
    "name": "Cat Calorie Calculator",
    "description": "Cat Calorie Calculator – Calculate Your Cat&apos;s Daily Calorie Requirements",
    "href": "/cat-calorie-calculator"
  },
  {
    "name": "Bird Cage Size Calculator",
    "description": "Bird Cage Size Calculator – Find the Minimum Cage Size for Your Bird",
    "href": "/bird-cage-size-calculator"
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
