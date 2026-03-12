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
  title: "Force Calculator – Calculate Force Using Newton's Second Law (F=ma)",
  description: "Calculate force from mass and acceleration using F=ma. Physics calculator helps solve problems involving force, motion, and Newton's laws with instant results.",
  alternates: {
    canonical: "https://1000freetools.com/calculators/force-calculator",
  },
};

const tools = [
  {
    "name": "Power Calculator",
    "description": "Power Calculator",
    "href": "/calculators/power-calculator"
  },
  {
    "name": "Energy Calculator",
    "description": "Energy Calculator",
    "href": "/calculators/energy-calculator"
  },
  {
    "name": "Work Calculator",
    "description": "Work Calculator",
    "href": "/calculators/work-calculator"
  },
  {
    "name": "Momentum Calculator",
    "description": "Momentum Calculator",
    "href": "/calculators/momentum-calculator"
  },
  {
    "name": "Acceleration Calculator",
    "description": "Acceleration Calculator",
    "href": "/calculators/acceleration-calculator"
  },
  {
    "name": "Torque Calculator",
    "description": "Torque Calculator",
    "href": "/calculators/torque-calculator"
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
              <BreadcrumbLink href="/calculators/force-calculator">Force Calculator</BreadcrumbLink>
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
