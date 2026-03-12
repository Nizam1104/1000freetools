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
  title: "Concrete Volume Calculator – How Much Concrete Do You Need?",
  description: "Estimate concrete quantities for any project with our concrete volume calculator. Compute cubic yards or meters for slabs, columns, footings, and walls to avoid over-ordering.",
  alternates: {
    canonical: "https://1000freetools.com/calculators/concrete-volume-calculator",
  },
};

const tools = [
  {
    "name": "Concrete Mix Ratio Calculator",
    "description": "Concrete Mix Ratio Calculator – Calculate Material Quantities",
    "href": "/calculators/concrete-mix-ratio-calculator"
  },
  {
    "name": "Brick Calculator",
    "description": "Brick Calculator",
    "href": "/calculators/brick-calculator"
  },
  {
    "name": "Brick Bond Calculator",
    "description": "Brick Bond Calculator – Calculate Bricks Needed for Any Wall Pattern",
    "href": "/calculators/brick-bond-calculator"
  },
  {
    "name": "Mortar Volume Calculator",
    "description": "Mortar Volume Calculator – Calculate Mortar Needed for Bricklaying & Tiling",
    "href": "/calculators/mortar-volume-calculator"
  },
  {
    "name": "Sand Quantity Calculator",
    "description": "Sand Quantity Calculator – Calculate How Much Sand You Need for Construction",
    "href": "/calculators/sand-quantity-calculator"
  },
  {
    "name": "Asphalt Quantity Calculator",
    "description": "Asphalt Quantity Calculator – Calculate Asphalt Needed for Roads & Driveways",
    "href": "/calculators/asphalt-quantity-calculator"
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
                    <BreadcrumbLink href="/calculators/concrete-volume-calculator">Concrete Volume Calculator</BreadcrumbLink>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
            </div>
            <header className="max-w-3xl">
        <h1 className="text-3xl font-bold mb-3">Concrete Volume Calculator – How Much Concrete Do You Need?</h1>
        <p className="text-muted-foreground">Estimate concrete quantities for any project with our concrete volume calculator. Compute cubic yards or meters for slabs, columns, footings, and walls to avoid over-ordering.</p>
      </header>
      {children}
      <div className="mt-16 max-w-6xl">
        <h2 className="text-2xl font-semibold mb-6 text-center">Other Free Tools</h2>
        <ToolLinkCards tools={tools} />
      </div>
    </div>
  );
}
