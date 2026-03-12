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
  title: "Pressure Calculator – Convert Between Pressure Units",
  description: "Convert pressure between pascals, bar, PSI, atmospheres, and more. Free pressure converter for scientific, engineering, and everyday pressure unit conversions.",
  alternates: {
    canonical: "https://1000freetools.com/calculators/pressure-calculator",
  },
};

const tools = [
  {
    "name": "Force Calculator",
    "description": "Force Calculator",
    "href": "/calculators/force-calculator"
  },
  {
    "name": "Density Calculator",
    "description": "Density Calculator",
    "href": "/calculators/density-calculator"
  },
  {
    "name": "Heat Transfer Calculator",
    "description": "Heat Transfer Calculator",
    "href": "/calculators/heat-transfer-calculator"
  },
  {
    "name": "Pipe Water Tank Pressure Calculator",
    "description": "Pipe Water Tank Pressure Calculator",
    "href": "/calculators/pipe-water-tank-pressure-calculator"
  },
  {
    "name": "Noise Level Calculator",
    "description": "Noise Level Calculator",
    "href": "/calculators/noise-level-calculator"
  },
  {
    "name": "Head Loss Darcy Weisbach Calculator",
    "description": "Head Loss Darcy Weisbach Calculator",
    "href": "/calculators/head-loss-darcy-weisbach-calculator"
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
              <BreadcrumbLink href="/calculators/pressure-calculator">Pressure Calculator</BreadcrumbLink>
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
