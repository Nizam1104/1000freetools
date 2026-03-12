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
  title: "Big Number Calculator – Compute Huge Numbers Online",
  description: "Calculate with extremely large integers using our free online big number calculator. Perform addition, subtraction, multiplication, and division on numbers of any size without overflow errors.",
  alternates: {
    canonical: "https://1000freetools.com/math-tools/big-number-calculator",
  },
  openGraph: {
    title: "Big Number Calculator – Compute Huge Numbers Online",
    description: "Calculate with extremely large integers using our free online big number calculator. Perform addition, subtraction, multiplication, and division on numbers of any size without overflow errors.",
    type: "website",
    url: "https://1000freetools.com/math-tools/big-number-calculator",
    siteName: "1000 Free Tools",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Big Number Calculator – Compute Huge Numbers Online",
    description: "Calculate with extremely large integers using our free online big number calculator. Perform addition, subtraction, multiplication, and division on numbers of any size without overflow errors.",
  },
};

const tools = [
  {
    "name": "Free Online Standard Calculator – Fast & Easy Math",
    "description": "Use our free standard calculator online to perform quick arithmetic operations including addition, subtraction, multiplication, and division. Simple, fast, and accurate for everyday math needs.",
    "href": "/math-tools/standard-calculator"
  },
  {
    "name": "Free Online Scientific Calculator – Advanced Math Functions",
    "description": "Perform complex scientific calculations online with our free scientific calculator. Supports trigonometry, logarithms, exponents, roots, and more – ideal for students and professionals.",
    "href": "/math-tools/scientific-calculator"
  },
  {
    "name": "Long Division Calculator – Step-by-Step Division with Remainder",
    "description": "Solve long division problems step by step with our free online long division calculator. See every step of the division process including quotient and remainder – ideal for learning.",
    "href": "/math-tools/long-division-calculator"
  },
  {
    "name": "Long Multiplication Calculator – Step-by-Step Multiplication",
    "description": "Multiply large numbers with full step-by-step working using our free online long multiplication calculator. See every step laid out clearly – perfect for students learning multiplication.",
    "href": "/math-tools/long-multiplication-calculator"
  },
  {
    "name": "BODMAS / PEMDAS Calculator – Order of Operations Solver",
    "description": "Solve any math expression using the correct order of operations with our free BODMAS/PEMDAS calculator. Get step-by-step breakdowns to understand exactly how each expression is evaluated.",
    "href": "/math-tools/order-of-operations-solver"
  },
  {
    "name": "Matrix Multiplication Calculator – Multiply Matrices Online",
    "description": "Multiply any two compatible matrices with our free online matrix multiplication calculator. See the full product matrix with step-by-step row-by-column computation.",
    "href": "/math-tools/matrix-multiplication-calculator"
  },
  {
    "name": "Binary Addition & Subtraction Calculator – Compute in Base 2",
    "description": "Add and subtract binary numbers step by step with our free online binary calculator. See each bit-by-bit operation clearly – perfect for computer science and digital electronics.",
    "href": "/math-tools/binary-arithmetic-calculator"
  },
  {
    "name": "Bitwise Operations Calculator – Compute AND OR XOR NOT Shifts",
    "description": "Perform bitwise AND, OR, XOR, NOT, left shift, and right shift operations on integers with our free online bitwise calculator. See binary representations alongside results.",
    "href": "/math-tools/bitwise-operations-calculator"
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
              <BreadcrumbLink href="/math-tools/big-number-calculator">Big Number Calculator</BreadcrumbLink>
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
