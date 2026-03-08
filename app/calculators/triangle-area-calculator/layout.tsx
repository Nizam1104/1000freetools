import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";

export const metadata: Metadata = {
  title: "Triangle Area Calculator – Find Area from Base and Height",
  description: "Calculate the area of any triangle instantly. Enter the base and height to get the area using the standard formula – no sign-up required.",
  alternates: {
    canonical: "https://1000freetools.com/calculators/triangle-area-calculator",
  },
};

const tools = [
  {
    "name": "Law Of Cosines Calculator",
    "description": "Law of Cosines Calculator",
    "href": "/calculators/law-of-cosines-calculator"
  },
  {
    "name": "Law Of Sines Calculator",
    "description": "Law of Sines Calculator",
    "href": "/calculators/law-of-sines-calculator"
  },
  {
    "name": "Pythagorean Theorem Calculator",
    "description": "Pythagorean Theorem Calculator",
    "href": "/calculators/pythagorean-theorem-calculator"
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
  }
];

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-y-4">
            <header className="max-w-3xl">
        <h1 className="text-3xl font-bold mb-3">Triangle Area Calculator – Find Area from Base and Height</h1>
        <p className="text-muted-foreground">Calculate the area of any triangle instantly. Enter the base and height to get the area using the standard formula – no sign-up required.</p>
      </header>
      {children}
      <div className="mt-16 max-w-6xl">
        <h2 className="text-2xl font-semibold mb-6 text-center">Other Free Tools</h2>
        <ToolLinkCards tools={tools} />
      </div>
    </div>
  );
}
