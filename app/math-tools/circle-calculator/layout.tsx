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
  title: "Circle Calculator – Find Radius, Diameter, Area & Circumference",
  description: "Calculate any property of a circle instantly with our free online circle calculator. Enter radius, diameter, area, or circumference and find all other measurements with formulas shown.",
  alternates: {
    canonical: "https://1000freetools.com/math-tools/circle-calculator",
  },
  openGraph: {
    title: "Circle Calculator – Find Radius, Diameter, Area & Circumference",
    description: "Calculate any property of a circle instantly with our free online circle calculator. Enter radius, diameter, area, or circumference and find all other measurements with formulas shown.",
    type: "website",
    url: "https://1000freetools.com/math-tools/circle-calculator",
    siteName: "1000 Free Tools",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Circle Calculator – Find Radius, Diameter, Area & Circumference",
    description: "Calculate any property of a circle instantly with our free online circle calculator. Enter radius, diameter, area, or circumference and find all other measurements with formulas shown.",
  },
};

const tools = [
  {
    "name": "Area Calculator – Find Area of Any 2D Shape Online",
    "description": "Calculate the area of any 2D shape with our free online area calculator. Supports circle, rectangle, triangle, trapezoid, parallelogram, and more with formula explanations.",
    "href": "/math-tools/area-calculator"
  },
  {
    "name": "Perimeter Calculator – Find Perimeter of Any Shape Online",
    "description": "Calculate the perimeter of any 2D shape with our free online perimeter calculator. Covers rectangles, triangles, circles, polygons, and more with step-by-step solutions.",
    "href": "/math-tools/perimeter-calculator"
  },
  {
    "name": "Surface Area Calculator – Find Surface Area of Any 3D Shape",
    "description": "Calculate the surface area of any 3D geometric shape with our free online surface area calculator. Covers cube, sphere, cylinder, cone, pyramid, and prisms with full formula details.",
    "href": "/math-tools/surface-area-calculator"
  },
  {
    "name": "Volume Calculator – Compute Volume of 3D Shapes Online",
    "description": "Calculate the volume of any 3D shape with our free online volume calculator. Supports cube, sphere, cylinder, cone, pyramid, and more with formula references and instant results.",
    "href": "/math-tools/volume-calculator"
  },
  {
    "name": "Polygon Interior Angle Sum Calculator – Find Angle Sum of Polygon",
    "description": "Calculate the sum of interior angles of any polygon with our free online calculator. Enter the number of sides and instantly find the total interior angle sum and each angle for regular polygons.",
    "href": "/math-tools/polygon-interior-angle-sum-calculator"
  },
  {
    "name": "Pythagorean Theorem Calculator – Find Any Side of a Right Triangle",
    "description": "Solve for any missing side of a right triangle using the Pythagorean theorem with our free online calculator. Enter two sides and instantly find the third with step-by-step working.",
    "href": "/math-tools/pythagorean-theorem-calculator"
  },
  {
    "name": "Pi Digit Generator – View Digits of π to Any Decimal Place",
    "description": "View the digits of Pi (π) to any decimal place with our free online Pi digit generator. Explore and study the infinite decimal expansion of this famous mathematical constant.",
    "href": "/math-tools/pi-digit-generator"
  },
  {
    "name": "Right Triangle Calculator – Solve Right Triangles Online",
    "description": "Solve any right triangle by entering two known values with our free online right triangle calculator. Find all sides, angles, area, and perimeter with clear step-by-step solutions.",
    "href": "/math-tools/right-triangle-calculator"
  }
];

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-y-4 max-w-6xl">
      <div>
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="/math-tools">Math Tools</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="/math-tools/circle-calculator">Circle Calculator</BreadcrumbLink>
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
