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
  title: "Square Area Calculator – Find Area, Perimeter and Diagonal",
  description: "Calculate the area, perimeter, and diagonal of a square instantly. Enter the side length to get all measurements – perfect for construction, crafts, and math homework.",
  alternates: {
    canonical: "https://1000freetools.com/calculators/square-area-calculator",
  },
};

const tools = [
  {
    "name": "Rectangle Area Calculator",
    "description": "Rectangle Area Calculator",
    "href": "/calculators/rectangle-area-calculator"
  },
  {
    "name": "Circle Area Calculator",
    "description": "Circle Area Calculator",
    "href": "/calculators/circle-area-calculator"
  },
  {
    "name": "Ellipse Area Calculator",
    "description": "Ellipse Area Calculator",
    "href": "/calculators/ellipse-area-calculator"
  },
  {
    "name": "Parallelogram Area Calculator",
    "description": "Parallelogram Area Calculator",
    "href": "/calculators/parallelogram-area-calculator"
  },
  {
    "name": "Rhombus Area Calculator",
    "description": "Rhombus Area Calculator",
    "href": "/calculators/rhombus-area-calculator"
  },
  {
    "name": "Triangle Area Calculator",
    "description": "Triangle Area Calculator – Find Area from Base and Height",
    "href": "/calculators/triangle-area-calculator"
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
                    <BreadcrumbLink href="/calculators/square-area-calculator">Square Area Calculator</BreadcrumbLink>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
            </div>
            <header className="max-w-3xl">
        <h1 className="text-3xl font-bold mb-3">Square Area Calculator – Find Area, Perimeter and Diagonal</h1>
        <p className="text-muted-foreground">Calculate the area, perimeter, and diagonal of a square instantly. Enter the side length to get all measurements – perfect for construction, crafts, and math homework.</p>
      </header>
      {children}
      <div className="mt-16 max-w-6xl">
        <h2 className="text-2xl font-semibold mb-6 text-center">Other Free Tools</h2>
        <ToolLinkCards tools={tools} />
      </div>
    </div>
  );
}
