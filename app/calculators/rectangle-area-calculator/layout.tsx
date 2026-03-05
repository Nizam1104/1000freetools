import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";

export const metadata: Metadata = {
  title: "Rectangle Area Calculator",
  description: "Calculate area, perimeter, and diagonal of a rectangle",
  alternates: {
    canonical: "https://1000freetools.com/calculators/rectangle-area-calculator",
  },
};

const tools = [
  {
    "name": "Circle Area Calculator",
    "description": "Circle Area Calculator",
    "href": "/circle-area-calculator"
  },
  {
    "name": "Ellipse Area Calculator",
    "description": "Ellipse Area Calculator",
    "href": "/ellipse-area-calculator"
  },
  {
    "name": "Square Area Calculator",
    "description": "Square Area Calculator – Find Area, Perimeter and Diagonal",
    "href": "/square-area-calculator"
  },
  {
    "name": "Parallelogram Area Calculator",
    "description": "Parallelogram Area Calculator",
    "href": "/parallelogram-area-calculator"
  },
  {
    "name": "Rhombus Area Calculator",
    "description": "Rhombus Area Calculator",
    "href": "/rhombus-area-calculator"
  },
  {
    "name": "Triangle Area Calculator",
    "description": "Triangle Area Calculator – Find Area from Base and Height",
    "href": "/triangle-area-calculator"
  }
];

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-y-4">
            <header className="max-w-3xl">
        <h1 className="text-3xl font-bold mb-3">Rectangle Area Calculator</h1>
        <p className="text-muted-foreground">Calculate area, perimeter, and diagonal of a rectangle</p>
      </header>
      {children}
      <div className="mt-16 max-w-6xl">
        <h2 className="text-2xl font-semibold mb-6 text-center">Other Free Tools</h2>
        <ToolLinkCards tools={tools} />
      </div>
    </div>
  );
}
