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
  title: "LCM Calculator – Find Least Common Multiple Online",
  description: "Find the Least Common Multiple",
  alternates: {
    canonical: "https://1000freetools.com/calculators/lcm-calculator",
  },
};

const tools = [
  {
    "name": "Gcd Calculator",
    "description": "GCD / HCF Calculator",
    "href": "/calculators/gcd-calculator"
  },
  {
    "name": "Prime Factorization Calculator",
    "description": "Prime Factorization Calculator – Find Prime Factors",
    "href": "/calculators/prime-factorization-calculator"
  },
  {
    "name": "Prime Checker",
    "description": "Prime Number Checker – Is This Number Prime?",
    "href": "/calculators/prime-checker"
  },
  {
    "name": "Factorial Calculator",
    "description": "Factorial Calculator",
    "href": "/calculators/factorial-calculator"
  },
  {
    "name": "Combination Calculator",
    "description": "Combination Calculator",
    "href": "/calculators/combination-calculator"
  },
  {
    "name": "Permutation Calculator",
    "description": "Permutation Calculator",
    "href": "/calculators/permutation-calculator"
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
                    <BreadcrumbLink href="/calculators/lcm-calculator">Lcm Calculator</BreadcrumbLink>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
            </div>
            <header className="max-w-3xl">
        <h1 className="text-3xl font-bold mb-3">LCM Calculator – Find Least Common Multiple Online</h1>
        <p className="text-muted-foreground">Find the Least Common Multiple</p>
      </header>
      {children}
      <div className="mt-16 max-w-6xl">
        <h2 className="text-2xl font-semibold mb-6 text-center">Other Free Tools</h2>
        <ToolLinkCards tools={tools} />
      </div>
    </div>
  );
}
