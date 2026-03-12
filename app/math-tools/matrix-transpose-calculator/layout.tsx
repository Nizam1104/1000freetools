import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";

export const metadata: Metadata = {
  title: "Matrix Transpose Calculator – Find Transpose of Any Matrix",
  description: "Find the transpose of any matrix instantly with our free online matrix transpose calculator. Swap rows and columns of any size matrix with a single click.",
  alternates: {
    canonical: "https://1000freetools.com/math-tools/matrix-transpose-calculator",
  },
  openGraph: {
    title: "Matrix Transpose Calculator – Find Transpose of Any Matrix",
    description: "Find the transpose of any matrix instantly with our free online matrix transpose calculator. Swap rows and columns of any size matrix with a single click.",
    type: "website",
    url: "https://1000freetools.com/math-tools/matrix-transpose-calculator",
    siteName: "1000 Free Tools",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Matrix Transpose Calculator – Find Transpose of Any Matrix",
    description: "Find the transpose of any matrix instantly with our free online matrix transpose calculator. Swap rows and columns of any size matrix with a single click.",
  },
};

const tools = [
  {
    "name": "Matrix Addition & Subtraction Calculator – Compute Matrices Online",
    "description": "Add or subtract any two matrices with our free online matrix calculator. Supports all matrix sizes with instant results and element-wise computation displayed clearly.",
    "href": "/math-tools/matrix-addition-subtraction-calculator"
  },
  {
    "name": "Matrix Multiplication Calculator – Multiply Matrices Online",
    "description": "Multiply any two compatible matrices with our free online matrix multiplication calculator. See the full product matrix with step-by-step row-by-column computation.",
    "href": "/math-tools/matrix-multiplication-calculator"
  },
  {
    "name": "Matrix Determinant Calculator – Compute Det of Any Matrix",
    "description": "Calculate the determinant of any square matrix with our free online determinant calculator. Supports 2x2, 3x3, and larger matrices with cofactor expansion steps shown.",
    "href": "/math-tools/matrix-determinant-calculator"
  },
  {
    "name": "Matrix Inverse Calculator – Find Inverse of Any Matrix",
    "description": "Find the inverse of any invertible square matrix with our free online matrix inverse calculator. Uses row reduction method with step-by-step solution for 2x2, 3x3, and larger matrices.",
    "href": "/math-tools/matrix-inverse-calculator"
  },
  {
    "name": "Scalar Matrix Multiplication Calculator – Multiply Matrix by Scalar",
    "description": "Multiply any matrix by a scalar constant with our free online scalar multiplication calculator. See the scaled matrix with all element-by-element calculations shown clearly.",
    "href": "/math-tools/scalar-multiplication-calculator"
  },
  {
    "name": "Identity Matrix Generator – Create n×n Identity Matrix",
    "description": "Generate an identity matrix of any size instantly with our free online identity matrix generator. Create n×n identity matrices for linear algebra, matrix operations, and proofs.",
    "href": "/math-tools/identity-matrix-generator"
  },
  {
    "name": "Matrix Rank Calculator – Find Rank of Any Matrix Online",
    "description": "Find the rank of any matrix with our free online matrix rank calculator. Uses row reduction to row echelon form with step-by-step working shown for complete understanding.",
    "href": "/math-tools/matrix-rank-calculator"
  },
  {
    "name": "Matrix Trace Calculator – Find Trace of a Square Matrix",
    "description": "Calculate the trace of any square matrix instantly with our free online trace calculator. Sums the main diagonal elements with a clear formula and highlighted diagonal shown.",
    "href": "/math-tools/matrix-trace-calculator"
  }
];

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-y-4 max-w-6xl">
      {children}
      <div className="mt-16 max-w-6xl">
        <h2 className="text-2xl font-semibold mb-6 text-center">Other Free Tools</h2>
        <ToolLinkCards tools={tools} />
      </div>
    </div>
  );
}
