"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function MatrixInverseCalculator() {
  const [size, setSize] = useState<"2" | "3">("2");
  const [matrix, setMatrix] = useState<number[][]>([[0, 0], [0, 0]]);
  const [inverse, setInverse] = useState<number[][] | null>(null);
  const [steps, setSteps] = useState<string[]>([]);
  const [error, setError] = useState("");

  const initializeMatrix = (newSize: "2" | "3") => {
    setSize(newSize);
    const n = parseInt(newSize);
    setMatrix(Array(n).fill(0).map(() => Array(n).fill(0)));
    setInverse(null);
    setSteps([]);
    setError("");
  };

  const updateCell = (row: number, col: number, value: string) => {
    const newMatrix = matrix.map((r, ri) =>
      r.map((c, ci) => (ri === row && ci === col ? parseFloat(value) || 0 : c))
    );
    setMatrix(newMatrix);
  };

  const calculateDeterminant2x2 = (m: number[][]): number => {
    return m[0][0] * m[1][1] - m[0][1] * m[1][0];
  };

  const calculateDeterminant3x3 = (m: number[][]): number => {
    const a = m[0][0], b = m[0][1], c = m[0][2];
    const d = m[1][0], e = m[1][1], f = m[1][2];
    const g = m[2][0], h = m[2][1], i = m[2][2];
    return a * (e * i - f * h) - b * (d * i - f * g) + c * (d * h - e * g);
  };

  const getMinor = (m: number[][], skipRow: number, skipCol: number): number[][] => {
    return m
      .filter((_, ri) => ri !== skipRow)
      .map(row => row.filter((_, ci) => ci !== skipCol));
  };

  const calculateInverse2x2 = () => {
    const a = matrix[0][0], b = matrix[0][1], c = matrix[1][0], d = matrix[1][1];
    const det = calculateDeterminant2x2(matrix);

    if (det === 0) {
      setError("This matrix is singular (determinant = 0) and has no inverse");
      setInverse(null);
      setSteps([]);
      return;
    }

    const invDet = 1 / det;
    const inv = [
      [d * invDet, -b * invDet],
      [-c * invDet, a * invDet]
    ];

    const steps = [
      `For a 2×2 matrix [[a,b],[c,d]], the inverse is (1/det) × [[d,-b],[-c,a]]`,
      ``,
      `Step 1: Calculate determinant`,
      `det = ad - bc = ${a}×${d} - ${b}×${c} = ${a*d} - ${b*c} = ${det}`,
      ``,
      `Step 2: Find the adjugate matrix`,
      `Swap diagonal elements: a↔d`,
      `Negate off-diagonal elements: b→-${b}, c→-${c}`,
      `Adjugate = [[${d}, ${-b}], [${-c}, ${a}]]`,
      ``,
      `Step 3: Multiply by 1/det`,
      `A⁻¹ = (1/${det}) × [[${d}, ${-b}], [${-c}, ${a}]]`,
      `A⁻¹ = [[${round(inv[0][0])}, ${round(inv[0][1])}], [${round(inv[1][0])}, ${round(inv[1][1])}]]`
    ];

    setInverse(inv);
    setSteps(steps);
    setError("");
  };

  const calculateInverse3x3 = () => {
    const det = calculateDeterminant3x3(matrix);

    if (det === 0) {
      setError("This matrix is singular (determinant = 0) and has no inverse");
      setInverse(null);
      setSteps([]);
      return;
    }

    const cofactors = [];
    for (let i = 0; i < 3; i++) {
      cofactors[i] = [];
      for (let j = 0; j < 3; j++) {
        const minor = getMinor(matrix, i, j);
        const minorDet = calculateDeterminant2x2(minor);
        const sign = Math.pow(-1, i + j);
        cofactors[i][j] = sign * minorDet;
      }
    }

    const adjugate = [
      [cofactors[0][0], cofactors[1][0], cofactors[2][0]],
      [cofactors[0][1], cofactors[1][1], cofactors[2][1]],
      [cofactors[0][2], cofactors[1][2], cofactors[2][2]]
    ];

    const invDet = 1 / det;
    const inv = adjugate.map(row => row.map(val => val * invDet));

    const steps = [
      `For a 3×3 matrix, A⁻¹ = (1/det(A)) × adj(A)`,
      ``,
      `Step 1: Calculate determinant`,
      `det = ${det}`,
      ``,
      `Step 2: Find the matrix of cofactors`,
      `C₀₀ = +(${cofactors[0][0]}), C₀₁ = ${cofactors[0][1] < 0 ? "" : "+"}${cofactors[0][1]}, C₀₂ = ${cofactors[0][2] < 0 ? "" : "+"}${cofactors[0][2]}`,
      `C₁₀ = ${cofactors[1][0] < 0 ? "" : "+"}${cofactors[1][0]}, C₁₁ = +(${cofactors[1][1]}), C₁₂ = ${cofactors[1][2] < 0 ? "" : "+"}${cofactors[1][2]}`,
      `C₂₀ = ${cofactors[2][0] < 0 ? "" : "+"}${cofactors[2][0]}, C₂₁ = ${cofactors[2][1] < 0 ? "" : "+"}${cofactors[2][1]}, C₂₂ = +(${cofactors[2][2]})`,
      ``,
      `Step 3: Transpose to get adjugate`,
      `adj(A) = [[${adjugate[0][0]}, ${adjugate[0][1]}, ${adjugate[0][2]}],`,
      `          [${adjugate[1][0]}, ${adjugate[1][1]}, ${adjugate[1][2]}],`,
      `          [${adjugate[2][0]}, ${adjugate[2][1]}, ${adjugate[2][2]}]]`,
      ``,
      `Step 4: Multiply by 1/det = 1/${det}`,
      `A⁻¹ computed successfully`
    ];

    setInverse(inv);
    setSteps(steps);
    setError("");
  };

  const round = (n: number): string => {
    const rounded = Math.round(n * 10000) / 10000;
    return Number.isInteger(rounded) ? rounded.toString() : rounded.toFixed(4);
  };

  const calculate = () => {
    if (size === "2") {
      calculateInverse2x2();
    } else {
      calculateInverse3x3();
    }
  };

  const reset = () => {
    setMatrix(Array(parseInt(size)).fill(0).map(() => Array(parseInt(size)).fill(0)));
    setInverse(null);
    setSteps([]);
    setError("");
  };

  const fillExample = () => {
    if (size === "2") {
      setMatrix([[4, 7], [2, 6]]);
    } else {
      setMatrix([[1, 2, 3], [0, 1, 4], [5, 6, 0]]);
    }
    setInverse(null);
    setSteps([]);
    setError("");
  };

  return (
    <div className="w-full max-w-5xl mx-auto space-y-8">
      <div className="mb-8">
        <h1 className="text-3xl font-semibold mb-2">Matrix Inverse Calculator – Find Inverse of Any Matrix</h1>
        <p className="text-muted-foreground">
          Find the inverse of any invertible square matrix with our free online matrix inverse calculator. Uses the adjugate method with step-by-step solution for 2×2 and 3×3 matrices.
        </p>
      </div>

      <div className="space-y-4">
        <div className="flex items-center gap-4">
          <Label>Matrix Size:</Label>
          <Select value={size} onValueChange={(v) => initializeMatrix(v as "2" | "3")}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="2">2 × 2</SelectItem>
              <SelectItem value="3">3 × 3</SelectItem>
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
          <Button onClick={calculate}>Calculate Inverse</Button>
          <Button variant="outline" onClick={reset}>Reset</Button>
        </div>

        {error && (
          <div className="p-4 bg-destructive/10 text-destructive rounded-md">
            <p className="text-sm">{error}</p>
          </div>
        )}

        {inverse && (
          <div className="space-y-4">
            <div className="p-6 bg-muted rounded-lg">
              <p className="text-sm text-muted-foreground mb-4 text-center">Inverse Matrix A⁻¹</p>
              <div className="overflow-x-auto">
                <div className="inline-block">
                  <div className="flex items-center">
                    <span className="text-4xl font-light mr-2">[</span>
                    <div className="grid gap-2" style={{ gridTemplateColumns: `repeat(${size}, 1fr)` }}>
                      {inverse.map((row, ri) =>
                        row.map((cell, ci) => (
                          <div key={`${ri}-${ci}`} className="w-20 text-center font-mono">
                            {round(cell)}
                          </div>
                        ))
                      )}
                    </div>
                    <span className="text-4xl font-light ml-2">]</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-4 border rounded-lg">
              <h4 className="font-semibold text-sm mb-3">Step-by-Step Solution</h4>
              <div className="space-y-2 font-mono text-sm bg-muted p-3 rounded overflow-x-auto">
                {steps.map((step, i) => (
                  <div key={i} className={step === "" ? "h-4" : "whitespace-pre"}>
                    {step}
                  </div>
                ))}
              </div>
            </div>

            <div className="p-4 border rounded-lg bg-muted/50">
              <h4 className="font-semibold text-sm mb-2">Verification: A × A⁻¹ = I</h4>
              <p className="text-xs text-muted-foreground">
                Multiply the original matrix by its inverse to verify you get the identity matrix.
              </p>
            </div>
          </div>
        )}
      </div>

      <section className="border-t pt-8 space-y-4">
        <h2 className="text-2xl font-semibold">What is a Matrix Inverse?</h2>
        <p className="text-muted-foreground">
          The inverse of a matrix A, denoted A⁻¹, is a matrix that when multiplied by A gives the identity matrix: A × A⁻¹ = I. Not all matrices have inverses – only square matrices with non-zero determinants are invertible.
        </p>
        <p className="text-muted-foreground">
          Matrix inverses are essential for solving systems of linear equations, computing transformations in computer graphics, and many applications in engineering and physics.
        </p>
      </section>

      <section className="border-t pt-8">
        <h2 className="text-2xl font-semibold mb-6">How to Find the Inverse</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="p-4 border rounded-lg">
            <h3 className="font-semibold mb-2">2×2 Matrix Formula</h3>
            <code className="text-sm font-mono bg-muted px-3 py-2 rounded block">
              A = [[a,b],[c,d]]<br />
              A⁻¹ = (1/det) × [[d,-b],[-c,a]]
            </code>
            <p className="text-xs text-muted-foreground mt-2">
              Swap diagonals, negate off-diagonals, divide by determinant
            </p>
          </div>
          <div className="p-4 border rounded-lg">
            <h3 className="font-semibold mb-2">3×3 Matrix Method</h3>
            <code className="text-xs font-mono bg-muted px-3 py-2 rounded block">
              A⁻¹ = (1/det(A)) × adj(A)<br />
              adj(A) = transpose of cofactor matrix
            </code>
            <p className="text-xs text-muted-foreground mt-2">
              Find cofactors, transpose, divide by determinant
            </p>
          </div>
        </div>
      </section>

      <section className="border-t pt-8">
        <h2 className="text-2xl font-semibold mb-6">Properties of Matrix Inverses</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="p-4 bg-muted rounded-lg">
            <h3 className="font-semibold mb-2">Key Properties</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• (A⁻¹)⁻¹ = A</li>
              <li>• (AB)⁻¹ = B⁻¹A⁻¹</li>
              <li>• (Aᵀ)⁻¹ = (A⁻¹)ᵀ</li>
              <li>• det(A⁻¹) = 1/det(A)</li>
            </ul>
          </div>
          <div className="p-4 bg-muted rounded-lg">
            <h3 className="font-semibold mb-2">When No Inverse Exists</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• Determinant equals zero</li>
              <li>• Matrix is singular</li>
              <li>• Rows are linearly dependent</li>
              <li>• Not full rank</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="border-t pt-8">
        <h2 className="text-2xl font-semibold mb-6">Frequently Asked Questions</h2>
        <div className="space-y-4">
          <div className="p-4 bg-muted rounded-lg">
            <h3 className="font-semibold mb-2">When does a matrix have no inverse?</h3>
            <p className="text-sm text-muted-foreground">
              A matrix has no inverse when its determinant is zero. This is called a singular matrix. It means the rows or columns are linearly dependent.
            </p>
          </div>
          <div className="p-4 bg-muted rounded-lg">
            <h3 className="font-semibold mb-2">Can non-square matrices have inverses?</h3>
            <p className="text-sm text-muted-foreground">
              No, only square matrices can have true inverses. However, rectangular matrices can have left or right inverses in special cases (pseudo-inverses).
            </p>
          </div>
          <div className="p-4 bg-muted rounded-lg">
            <h3 className="font-semibold mb-2">How do you verify an inverse?</h3>
            <p className="text-sm text-muted-foreground">
              Multiply the original matrix by the calculated inverse. If correct, the result should be the identity matrix (1s on diagonal, 0s elsewhere).
            </p>
          </div>
          <div className="p-4 bg-muted rounded-lg">
            <h3 className="font-semibold mb-2">What is the adjugate matrix?</h3>
            <p className="text-sm text-muted-foreground">
              The adjugate (or adjoint) matrix is the transpose of the cofactor matrix. Each element is the signed determinant of the minor obtained by removing that row and column.
            </p>
          </div>
        </div>
      </section>

      <section className="border-t pt-8">
        <h2 className="text-2xl font-semibold mb-6">Related Math Tools</h2>
        <div className="grid sm:grid-cols-3 gap-4">
          <a href="/math-tools/matrix-determinant-calculator" className="p-4 rounded-lg border hover:bg-muted transition-colors">
            <p className="font-semibold text-sm">Matrix Determinant</p>
            <p className="text-xs text-muted-foreground">Calculate det(A)</p>
          </a>
          <a href="/math-tools/matrix-transpose-calculator" className="p-4 rounded-lg border hover:bg-muted transition-colors">
            <p className="font-semibold text-sm">Matrix Transpose</p>
            <p className="text-xs text-muted-foreground">Find Aᵀ</p>
          </a>
          <a href="/math-tools/system-of-equations-solver" className="p-4 rounded-lg border hover:bg-muted transition-colors">
            <p className="font-semibold text-sm">System of Equations</p>
            <p className="text-xs text-muted-foreground">Solve using A⁻¹</p>
          </a>
        </div>
      </section>
    </div>
  );
}
