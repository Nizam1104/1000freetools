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
  title: "Bird Cage Size Calculator – Find the Minimum Cage Size for Your Bird",
  description: "Give your bird the space it deserves with our Bird Cage Size Calculator.            Enter your bird species to get minimum recommended cage dimensions based on            wingspan and behavioral needs — ensuring a healthy, stress-free environment            for your feathered friend.",
  alternates: {
    canonical: "https://1000freetools.com/calculators/bird-cage-size-calculator",
  },
};

const tools = [
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
    "name": "Horse Feed Calculator",
    "description": "Horse Feed Calculator – Calculate Daily Feed Requirements for Your Horse",
    "href": "/calculators/horse-feed-calculator"
  },
  {
    "name": "Livestock Feed Calculator",
    "description": "Livestock Feed Calculator – Calculate Daily Feed Requirements for Farm Animals",
    "href": "/calculators/livestock-feed-calculator"
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
              <BreadcrumbLink href="/calculators/bird-cage-size-calculator">Bird Cage Size Calculator</BreadcrumbLink>
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
