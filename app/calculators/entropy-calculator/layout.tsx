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
  title: "Entropy Calculator – Calculate Password & Data Entropy in Bits",
  description: "Measure the true randomness and security of your passwords with our Entropy Calculator. Enter your password or data string to calculate entropy in bits — helping security professionals and developers assess cryptographic strength.",
  alternates: {
    canonical: "https://1000freetools.com/calculators/entropy-calculator",
  },
};

const tools = [
  {
    "name": "Ideal Gas Law Calculator",
    "description": "Ideal Gas Law Calculator – Solve PV = nRT for Any Variable",
    "href": "/calculators/ideal-gas-law-calculator"
  },
  {
    "name": "Vapor Pressure Calculator",
    "description": "Vapor Pressure Calculator – Calculate Vapor Pressure at Any Temperature",
    "href": "/calculators/vapor-pressure-calculator"
  },
  {
    "name": "Concentration Calculator",
    "description": "Concentration Calculator – Convert Solution Concentration Units",
    "href": "/calculators/concentration-calculator"
  },
  {
    "name": "Molarity Calculator",
    "description": "Molarity Calculator – Calculate Molar Concentration Instantly",
    "href": "/calculators/molarity-calculator"
  },
  {
    "name": "Molality Calculator",
    "description": "Molality Calculator – Find Molality of Any Solution",
    "href": "/calculators/molality-calculator"
  },
  {
    "name": "Molecular Mass Calculator",
    "description": "Molecular Mass Calculator – Calculate Molar Mass of Any Compound",
    "href": "/calculators/molecular-mass-calculator"
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
              <BreadcrumbLink href="/calculators/entropy-calculator">Entropy Calculator</BreadcrumbLink>
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
