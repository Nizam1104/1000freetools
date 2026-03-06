"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function MatrixDeterminantCalculator() {
  const [size, setSize] = useState<"2" | "3" | "4">("2");
  const [matrix, setMatrix] = useState<number[][]>([[0, 0], [0, 0]]);
  const [result, setResult] = useState<number | null>(null);
  const [steps, setSteps] = useState<string[]>([]);
  const [error, setError] = useState("");

  const initializeMatrix = (newSize: "2" | "3" | "4") => {
    setSize(newSize);
    const n = parseInt(newSize);
    setMatrix(Array(n).fill(0).map(() => Array(n).fill(0)));
    setResult(null);
    setSteps([]);
    setError("");
  };

  const updateCell = (row: number, col: number, value: string) => {
    const newMatrix = matrix.map((r, ri) =>
      r.map((c, ci) => (ri === row && ci === col ? parseFloat(value) || 0 : c))
    );
    setMatrix(newMatrix);
  };

  const calculateDeterminant2x2 = (m: number[][]): { det: number; steps: string[] } => {
    const a = m[0][0], b = m[0][1], c = m[1][0], d = m[1][1];
    const ad = a * d;
    const bc = b * c;
    const det = ad - bc;
    
    const steps = [
      `For a 2×2 matrix [[a,b],[c,d]], det = ad - bc`,
      `a = ${a}, b = ${b}, c = ${c}, d = ${d}`,
      `ad = ${a} × ${d} = ${ad}`,
      `bc = ${b} × ${c} = ${bc}`,
      `det = ${ad} - ${bc} = ${det}`
    ];
    
    return { det, steps };
  };

  const calculateDeterminant3x3 = (m: number[][]): { det: number; steps: string[] } => {
    const a = m[0][0], b = m[0][1], c = m[0][2];
    const d = m[1][0], e = m[1][1], f = m[1][2];
    const g = m[2][0], h = m[2][1], i = m[2][2];

    const minor1 = e * i - f * h;
    const minor2 = d * i - f * g;
    const minor3 = d * h - e * g;

    const term1 = a * minor1;
    const term2 = b * minor2;
    const term3 = c * minor3;

    const det = term1 - term2 + term3;

    const steps = [
      `Using cofactor expansion along the first row:`,
      `det = a(ei - fh) - b(di - fg) + c(dh - eg)`,
      ``,
      `First minor (ei - fh): ${e}×${i} - ${f}×${h} = ${e*i} - ${f*h} = ${minor1}`,
      `Second minor (di - fg): ${d}×${i} - ${f}×${g} = ${d*i} - ${f*g} = ${minor2}`,
      `Third minor (dh - eg): ${d}×${h} - ${e}×${g} = ${d*h} - ${e*g} = ${minor3}`,
      ``,
      `Term 1: ${a} × ${minor1} = ${term1}`,
      `Term 2: ${b} × ${minor2} = ${term2}`,
      `Term 3: ${c} × ${minor3} = ${term3}`,
      ``,
      `det = ${term1} - ${term2} + ${term3} = ${det}`
    ];

    return { det, steps };
  };

  const calculateDeterminant4x4 = (m: number[][]): { det: number; steps: string[] } => {
    const steps: string[] = [`Using cofactor expansion along the first row:`];
    let det = 0;

    for (let j = 0; j < 4; j++) {
      const minor = getMinor(m, 0, j);
      const minorDet = calculateDeterminant3x2x2(minor).det;
      const cofactor = Math.pow(-1, 0 + j) * m[0][j] * minorDet;
      det += cofactor;
      
      const sign = j % 2 === 0 ? "+" : "-";
      steps.push(`${sign} a₀${j} × det(M₀${j}) = ${sign} ${m[0][j]} × ${minorDet} = ${cofactor}`);
    }

    steps.push(``, `Total determinant: ${det}`);
    return { det, steps };
  };

  const calculateDeterminant3x2x2 = (m: number[][]): { det: number } => {
    const a = m[0][0], b = m[0][1], c = m[0][2];
    const d = m[1][0], e = m[1][1], f = m[1][2];
    const g = m[2][0], h = m[2][1], i = m[2][2];
    return { det: a * (e * i - f * h) - b * (d * i - f * g) + c * (d * h - e * g) };
  };

  const getMinor = (m: number[][], skipRow: number, skipCol: number): number[][] => {
    return m
      .filter((_, ri) => ri !== skipRow)
      .map(row => row.filter((_, ci) => ci !== skipCol));
  };

  const calculate = () => {
    const n = parseInt(size);
    
    let calculation;
    if (n === 2) {
      calculation = calculateDeterminant2x2(matrix);
    } else if (n === 3) {
      calculation = calculateDeterminant3x3(matrix);
    } else {
      calculation = calculateDeterminant4x4(matrix);
    }

    setResult(calculation.det);
    setSteps(calculation.steps);
    setError("");
  };

  const reset = () => {
    setMatrix(Array(parseInt(size)).fill(0).map(() => Array(parseInt(size)).fill(0)));
    setResult(null);
    setSteps([]);
    setError("");
  };

  const fillExample = () => {
    if (size === "2") {
      setMatrix([[4, 3], [2, 5]]);
    } else if (size === "3") {
      setMatrix([[1, 2, 3], [4, 5, 6], [7, 8, 9]]);
    } else {
      setMatrix([
        [1, 2, 3, 4],
        [5, 6, 7, 8],
        [9, 10, 11, 12],
        [13, 14, 15, 16]
      ]);
    }
    setResult(null);
    setSteps([]);
  };

  return (
    <div className="w-full max-w-5xl mx-auto space-y-8">
      <div className="mb-8">
        <h1 className="text-3xl font-semibold mb-2">Matrix Determinant Calculator – Compute Det of Any Matrix</h1>
        <p className="text-muted-foreground">
          Calculate the determinant of any square matrix with our free online determinant calculator. Supports 2×2, 3×3, and 4×4 matrices with cofactor expansion steps shown.
        </p>
      </div>

      <div className="space-y-4">
        <div className="flex items-center gap-4">
          <Label>Matrix Size:</Label>
          <Select value={size} onValueChange={(v) => initializeMatrix(v as "2" | "3" | "4")}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="2">2 × 2</SelectItem>
              <SelectItem value="3">3 × 3</SelectItem>
              <SelectItem value="4">4 × 4</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="sm" onClick={fillExample}>Load Example</Button>
        </div>

        <div className="overflow-x-auto">
          <div className="inline-block">
            <div className="flex items-center">
              <span className="text-4xl font-light mr-2">[</span>
              <div className="grid gap-2" style={{ gridTemplateColumns: `repeat(${size}, 1fr)` }}>
                {matrix.map((row, ri) =>
                  row.map((cell, ci) => (
                    <Input
                      key={`${ri}-${ci}`}
                      type="number"
                      value={cell || ""}
                      onChange={(e) => updateCell(ri, ci, e.target.value)}
                      className="w-16 h-12 text-center"
                    />
                  ))
                )}
              </div>
              <span className="text-4xl font-light ml-2">]</span>
            </div>
          </div>
        </div>

        <div className="flex gap-2">
          <Button onClick={calculate}>Calculate Determinant</Button>
          <Button variant="outline" onClick={reset}>Reset</Button>
        </div>

        {result !== null && (
          <div className="space-y-4">
            <div className="p-6 bg-muted rounded-lg text-center">
              <p className="text-sm text-muted-foreground mb-2">Determinant</p>
              <p className="text-5xl font-bold">det(A) = {result}</p>
              {result === 0 && (
                <p className="text-sm text-destructive mt-2">
                  This matrix is singular (not invertible)
                </p>
              )}
              {result !== 0 && (
                <p className="text-sm text-muted-foreground mt-2">
                  This matrix is invertible
                </p>
              )}
            </div>

            <div className="p-4 border rounded-lg">
              <h4 className="font-semibold text-sm mb-3">Step-by-Step Solution</h4>
              <div className="space-y-2 font-mono text-sm bg-muted p-3 rounded">
                {steps.map((step, i) => (
                  <div key={i} className={step === "" ? "h-4" : ""}>
                    {step}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      <section className="border-t pt-8 space-y-4">
        <h2 className="text-2xl font-semibold">What is a Determinant?</h2>
        <p className="text-muted-foreground">
          The determinant is a scalar value that can be computed from a square matrix. It provides important information about the matrix and is used in many areas of mathematics including solving systems of linear equations, finding matrix inverses, and calculating areas and volumes.
        </p>
        <p className="text-muted-foreground">
          A determinant of 0 means the matrix is singular (not invertible). A non-zero determinant means the matrix has an inverse.
        </p>
      </section>

      <section className="border-t pt-8">
        <h2 className="text-2xl font-semibold mb-6">Determinant Formulas</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="p-4 border rounded-lg">
            <h3 className="font-semibold mb-2">2×2 Matrix</h3>
            <code className="text-sm font-mono bg-muted px-3 py-2 rounded block">
              |a b|<br />
              |c d| = ad - bc
            </code>
            <p className="text-xs text-muted-foreground mt-2">
              Multiply diagonals and subtract
            </p>
          </div>
          <div className="p-4 border rounded-lg">
            <h3 className="font-semibold mb-2">3×3 Matrix (Cofactor Expansion)</h3>
            <code className="text-xs font-mono bg-muted px-3 py-2 rounded block">
              det = a(ei - fh) - b(di - fg) + c(dh - eg)
            </code>
            <p className="text-xs text-muted-foreground mt-2">
              Expand along first row using minors
            </p>
          </div>
        </div>
      </section>

      <section className="border-t pt-8">
        <h2 className="text-2xl font-semibold mb-6">Properties of Determinants</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="p-4 bg-muted rounded-lg">
            <h3 className="font-semibold mb-2">Key Properties</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• det(AB) = det(A) × det(B)</li>
              <li>• det(A⁻¹) = 1/det(A)</li>
              <li>• det(Aᵀ) = det(A)</li>
              <li>• det(kA) = kⁿ × det(A) for n×n matrix</li>
            </ul>
          </div>
          <div className="p-4 bg-muted rounded-lg">
            <h3 className="font-semibold mb-2">When det = 0</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• Matrix is not invertible</li>
              <li>• Rows/columns are linearly dependent</li>
              <li>• System has no unique solution</li>
              <li>• Transformation collapses space</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="border-t pt-8">
        <h2 className="text-2xl font-semibold mb-6">Frequently Asked Questions</h2>
        <div className="space-y-4">
          <div className="p-4 bg-muted rounded-lg">
            <h3 className="font-semibold mb-2">What does a determinant of 0 mean?</h3>
            <p className="text-sm text-muted-foreground">
              A determinant of 0 means the matrix is singular – it has no inverse. The rows or columns are linearly dependent, and the matrix transformation collapses space to a lower dimension.
            </p>
          </div>
          <div className="p-4 bg-muted rounded-lg">
            <h3 className="font-semibold mb-2">Can determinants be negative?</h3>
            <p className="text-sm text-muted-foreground">
              Yes, determinants can be positive, negative, or zero. A negative determinant indicates the matrix includes a reflection (it reverses orientation).
            </p>
          </div>
          <div className="p-4 bg-muted rounded-lg">
            <h3 className="font-semibold mb-2">How is the determinant used?</h3>
            <p className="text-sm text-muted-foreground">
              Determinants are used to check if a matrix is invertible, solve systems of equations (Cramer's rule), find eigenvalues, calculate volumes in geometry, and in calculus for change of variables.
            </p>
          </div>
          <div className="p-4 bg-muted rounded-lg">
            <h3 className="font-semibold mb-2">What is cofactor expansion?</h3>
            <p className="text-sm text-muted-foreground">
              Cofactor expansion is a method to calculate determinants by expanding along a row or column. Each element is multiplied by its cofactor (signed minor determinant) and summed.
            </p>
          </div>
        </div>
      </section>

      <section className="border-t pt-8">
        <h2 className="text-2xl font-semibold mb-6">Related Math Tools</h2>
        <div className="grid sm:grid-cols-3 gap-4">
          <a href="/math-tools/matrix-inverse" className="p-4 rounded-lg border hover:bg-muted transition-colors">
            <p className="font-semibold text-sm">Matrix Inverse</p>
            <p className="text-xs text-muted-foreground">Find A⁻¹</p>
          </a>
          <a href="/math-tools/matrix-transpose" className="p-4 rounded-lg border hover:bg-muted transition-colors">
            <p className="font-semibold text-sm">Matrix Transpose</p>
            <p className="text-xs text-muted-foreground">Find Aᵀ</p>
          </a>
          <a href="/math-tools/system-of-equations-solver" className="p-4 rounded-lg border hover:bg-muted transition-colors">
            <p className="font-semibold text-sm">System of Equations</p>
            <p className="text-xs text-muted-foreground">Solve linear systems</p>
          </a>
        </div>
      </section>
    </div>
  );
}
