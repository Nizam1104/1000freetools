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
  title: "Polygon Interior Angle Sum Calculator – Find Angle Sum of Polygon",
  description: "Calculate the sum of interior angles of any polygon with our free online calculator. Enter the number of sides and instantly find the total interior angle sum and each angle for regular polygons.",
  alternates: {
    canonical: "https://1000freetools.com/math-tools/polygon-interior-angle-sum-calculator",
  },
  openGraph: {
    title: "Polygon Interior Angle Sum Calculator – Find Angle Sum of Polygon",
    description: "Calculate the sum of interior angles of any polygon with our free online calculator. Enter the number of sides and instantly find the total interior angle sum and each angle for regular polygons.",
    type: "website",
    url: "https://1000freetools.com/math-tools/polygon-interior-angle-sum-calculator",
    siteName: "1000 Free Tools",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Polygon Interior Angle Sum Calculator – Find Angle Sum of Polygon",
    description: "Calculate the sum of interior angles of any polygon with our free online calculator. Enter the number of sides and instantly find the total interior angle sum and each angle for regular polygons.",
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
    "name": "Triangle Angle Calculator – Find Missing Angles in a Triangle",
    "description": "Find any missing angle in a triangle with our free online angle calculator. Enter known angles or sides and instantly solve for the remaining angles using trigonometry rules.",
    "href": "/math-tools/angle-calculator"
  },
  {
    "name": "Circle Calculator – Find Radius, Diameter, Area & Circumference",
    "description": "Calculate any property of a circle instantly with our free online circle calculator. Enter radius, diameter, area, or circumference and find all other measurements with formulas shown.",
    "href": "/math-tools/circle-calculator"
  },
  {
    "name": "Triangle Solver – Solve Any Triangle SSS SAS ASA AAS",
    "description": "Solve any triangle completely using SSS, SAS, ASA, or AAS methods with our free online triangle solver. Find all missing sides, angles, and area with step-by-step trigonometric solutions.",
    "href": "/math-tools/triangle-solver"
  },
  {
    "name": "Right Triangle Calculator – Solve Right Triangles Online",
    "description": "Solve any right triangle by entering two known values with our free online right triangle calculator. Find all sides, angles, area, and perimeter with clear step-by-step solutions.",
    "href": "/math-tools/right-triangle-calculator"
  },
  {
    "name": "Trig Function Calculator – Calculate Sin Cos Tan Online",
    "description": "Calculate any trigonometric function value including sin, cos, tan, csc, sec, and cot for any angle in degrees or radians with our free online trig calculator.",
    "href": "/math-tools/trig-function-calculator"
  },
  {
    "name": "Degrees to Radians Converter – Convert Angles Online",
    "description": "Convert any angle from degrees to radians or radians to degrees with our free online converter. Instant and accurate angle conversions using π-based formulas.",
    "href": "/math-tools/degrees-radians-converter"
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
              <BreadcrumbLink href="/math-tools/polygon-interior-angle-sum-calculator">Polygon Interior Angle Sum Calculator</BreadcrumbLink>
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
