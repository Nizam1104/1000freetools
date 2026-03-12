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
  title: "Law of Sines Calculator",
  description: "Solve triangles using a/sin(A) = b/sin(B)",
  alternates: {
    canonical: "https://1000freetools.com/calculators/law-of-sines-calculator",
  },
};

const tools = [
  {
    "name": "Law Of Cosines Calculator",
    "description": "Law of Cosines Calculator",
    "href": "/calculators/law-of-cosines-calculator"
  },
  {
    "name": "Pythagorean Theorem Calculator",
    "description": "Pythagorean Theorem Calculator",
    "href": "/calculators/pythagorean-theorem-calculator"
  },
  {
    "name": "Distance Formula Calculator",
    "description": "Distance Formula Calculator – Find Distance Between Two Points",
    "href": "/calculators/distance-formula-calculator"
  },
  {
    "name": "Triangle Area Calculator",
    "description": "Triangle Area Calculator – Find Area from Base and Height",
    "href": "/calculators/triangle-area-calculator"
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
                    <BreadcrumbLink href="/calculators/law-of-sines-calculator">Law Of Sines Calculator</BreadcrumbLink>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
            </div>
            <header className="max-w-3xl">
        <h1 className="text-3xl font-bold mb-3">Law of Sines Calculator</h1>
        <p className="text-muted-foreground">Solve triangles using a/sin(A) = b/sin(B)</p>
      </header>
      {children}
      <div className="mt-16 max-w-6xl">
        <h2 className="text-2xl font-semibold mb-6 text-center">Other Free Tools</h2>
        <ToolLinkCards tools={tools} />
      </div>
    </div>
  );
}
