"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function IdentityMatrixGenerator() {
  const [size, setSize] = useState("");
  const [result, setResult] = useState<{
    size: number;
    matrix: number[][];
  } | null>(null);
  const [error, setError] = useState("");

  const generateIdentityMatrix = (n: number) => {
    const matrix: number[][] = [];
    for (let i = 0; i < n; i++) {
      const row: number[] = [];
      for (let j = 0; j < n; j++) {
        row.push(i === j ? 1 : 0);
      }
      matrix.push(row);
    }
    return { size: n, matrix };
  };

  const calculate = () => {
    const num = parseInt(size.trim());

    if (isNaN(num)) {
      setError("Please enter a valid size");
      setResult(null);
      return;
    }

    if (num < 1 || num > 20) {
      setError("Please enter a size between 1 and 20");
      setResult(null);
      return;
    }

    setError("");
    setResult(generateIdentityMatrix(num));
  };

  const reset = () => {
    setSize("");
    setResult(null);
    setError("");
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      <div className="mb-8">
        <h1 className="text-3xl font-semibold mb-2">Identity Matrix Generator – Create Iₙ Matrices</h1>
        <p className="text-muted-foreground">
          Generate identity matrices of any size with our free online tool. Perfect for linear algebra, matrix operations, and learning about matrix properties.
        </p>
      </div>

      <div className="space-y-4">
        <div>
          <Label>Matrix Size (n × n)</Label>
          <Input
            type="text"
            placeholder="e.g., 3 for a 3×3 identity matrix"
            value={size}
            onChange={(e) => setSize(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && calculate()}
          />
        </div>

        <div className="flex gap-2">
          <Button onClick={calculate}>Generate Identity Matrix</Button>
          <Button variant="outline" onClick={reset}>Reset</Button>
        </div>

        {error && (
          <div className="p-4 bg-destructive/10 text-destructive rounded-md">
            <p className="text-sm">{error}</p>
          </div>
        )}

        {result && (
          <div className="space-y-4">
            <div className="p-6 bg-muted rounded-lg">
              <p className="text-sm text-muted-foreground mb-3">
                {result.size}×{result.size} Identity Matrix (I<sub>{result.size}</sub>)
              </p>
              <div className="flex items-center gap-4 overflow-x-auto">
                <span className="text-4xl font-serif">[</span>
                <div className="grid gap-1" style={{ gridTemplateColumns: `repeat(${result.size}, minmax(0, 1fr))` }}>
                  {result.matrix.map((row, i) =>
                    row.map((val, j) => (
                      <div
                        key={`${i}-${j}`}
                        className={`w-12 h-12 flex items-center justify-center font-mono text-lg ${
                          val === 1 ? "bg-primary text-primary-foreground rounded" : "text-muted-foreground"
                        }`}
                      >
                        {val}
                      </div>
                    ))
                  )}
                </div>
                <span className="text-4xl font-serif">]</span>
              </div>
            </div>

            <div className="p-4 bg-muted rounded-lg">
              <p className="text-sm font-semibold mb-3">Matrix Notation</p>
              <div className="space-y-2 font-mono text-sm overflow-x-auto">
                {result.matrix.map((row, i) => (
                  <div key={i} className="flex gap-2">
                    <span className="text-muted-foreground">Row {i + 1}:</span>
                    <span>[{row.join(", ")}]</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="p-4 bg-muted rounded-lg">
                <p className="text-sm text-muted-foreground mb-1">Diagonal Elements</p>
                <p className="text-2xl font-bold">{result.size} ones</p>
                <p className="text-xs text-muted-foreground mt-1">All positions where row = column</p>
              </div>
              <div className="p-4 bg-muted rounded-lg">
                <p className="text-sm text-muted-foreground mb-1">Off-Diagonal Elements</p>
                <p className="text-2xl font-bold">{result.size * result.size - result.size} zeros</p>
                <p className="text-xs text-muted-foreground mt-1">All other positions</p>
              </div>
            </div>
          </div>
        )}
      </div>

      <section className="border-t pt-8 space-y-4">
        <h2 className="text-2xl font-semibold">What Is an Identity Matrix?</h2>
        <p className="text-muted-foreground">
          An identity matrix is a square matrix with ones on the main diagonal (top-left to bottom-right) and zeros everywhere else. It's denoted as I or Iₙ where n is the size.
        </p>
        <p className="text-muted-foreground">
          The identity matrix plays the same role in matrix multiplication that the number 1 plays in regular multiplication. Multiply any matrix by the identity matrix, and you get the original matrix back – just like 5 × 1 = 5.
        </p>
        <div className="grid md:grid-cols-3 gap-4">
          <div className="p-4 bg-muted rounded-lg">
            <h3 className="font-semibold text-sm mb-2">2×2 Identity</h3>
            <div className="flex items-center gap-2">
              <span className="text-2xl font-serif">[</span>
              <div className="grid grid-cols-2 gap-1">
                <span className="w-8 h-8 flex items-center justify-center font-mono bg-primary text-primary-foreground rounded">1</span>
                <span className="w-8 h-8 flex items-center justify-center font-mono text-muted-foreground">0</span>
                <span className="w-8 h-8 flex items-center justify-center font-mono text-muted-foreground">0</span>
                <span className="w-8 h-8 flex items-center justify-center font-mono bg-primary text-primary-foreground rounded">1</span>
              </div>
              <span className="text-2xl font-serif">]</span>
            </div>
          </div>
          <div className="p-4 bg-muted rounded-lg">
            <h3 className="font-semibold text-sm mb-2">3×3 Identity</h3>
            <div className="flex items-center gap-2">
              <span className="text-2xl font-serif">[</span>
              <div className="grid grid-cols-3 gap-1">
                <span className="w-8 h-8 flex items-center justify-center font-mono bg-primary text-primary-foreground rounded">1</span>
                <span className="w-8 h-8 flex items-center justify-center font-mono text-muted-foreground">0</span>
                <span className="w-8 h-8 flex items-center justify-center font-mono text-muted-foreground">0</span>
                <span className="w-8 h-8 flex items-center justify-center font-mono text-muted-foreground">0</span>
                <span className="w-8 h-8 flex items-center justify-center font-mono bg-primary text-primary-foreground rounded">1</span>
                <span className="w-8 h-8 flex items-center justify-center font-mono text-muted-foreground">0</span>
                <span className="w-8 h-8 flex items-center justify-center font-mono text-muted-foreground">0</span>
                <span className="w-8 h-8 flex items-center justify-center font-mono text-muted-foreground">0</span>
                <span className="w-8 h-8 flex items-center justify-center font-mono bg-primary text-primary-foreground rounded">1</span>
              </div>
              <span className="text-2xl font-serif">]</span>
            </div>
          </div>
          <div className="p-4 bg-muted rounded-lg">
            <h3 className="font-semibold text-sm mb-2">4×4 Identity</h3>
            <div className="flex items-center gap-2">
              <span className="text-2xl font-serif">[</span>
              <div className="grid grid-cols-4 gap-0.5">
                {[1,0,0,0, 0,1,0,0, 0,0,1,0, 0,0,0,1].map((v, i) => (
                  <span key={i} className={`w-6 h-6 flex items-center justify-center font-mono text-xs ${v === 1 ? 'bg-primary text-primary-foreground rounded' : 'text-muted-foreground'}`}>{v}</span>
                ))}
              </div>
              <span className="text-2xl font-serif">]</span>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t pt-8 space-y-4">
        <h2 className="text-2xl font-semibold">Key Properties</h2>
        <div className="space-y-3">
          <div className="p-4 bg-muted rounded-lg">
            <h3 className="font-semibold text-sm mb-2">Multiplicative Identity</h3>
            <p className="text-sm text-muted-foreground mb-2">
              For any matrix A of size m×n:
            </p>
            <p className="text-sm font-mono">
              A × Iₙ = A<br />
              Iₘ × A = A
            </p>
            <p className="text-xs text-muted-foreground mt-2">
              The identity matrix leaves other matrices unchanged when multiplied.
            </p>
          </div>
          <div className="p-4 bg-muted rounded-lg">
            <h3 className="font-semibold text-sm mb-2">Its Own Inverse</h3>
            <p className="text-sm text-muted-foreground mb-2">
              The identity matrix is its own inverse:
            </p>
            <p className="text-sm font-mono">
              Iₙ × Iₙ = Iₙ<br />
              Iₙ⁻¹ = Iₙ
            </p>
            <p className="text-xs text-muted-foreground mt-2">
              Multiply I by itself and you still get I.
            </p>
          </div>
          <div className="p-4 bg-muted rounded-lg">
            <h3 className="font-semibold text-sm mb-2">Determinant Equals 1</h3>
            <p className="text-sm text-muted-foreground mb-2">
              The determinant of any identity matrix is always 1:
            </p>
            <p className="text-sm font-mono">
              det(Iₙ) = 1
            </p>
            <p className="text-xs text-muted-foreground mt-2">
              This means the identity matrix is always invertible.
            </p>
          </div>
          <div className="p-4 bg-muted rounded-lg">
            <h3 className="font-semibold text-sm mb-2">Trace Equals n</h3>
            <p className="text-sm text-muted-foreground mb-2">
              The trace (sum of diagonal elements) equals the size:
            </p>
            <p className="text-sm font-mono">
              trace(Iₙ) = n
            </p>
            <p className="text-xs text-muted-foreground mt-2">
              For I₃, the trace is 1 + 1 + 1 = 3.
            </p>
          </div>
        </div>
      </section>

      <section className="border-t pt-8 space-y-4">
        <h2 className="text-2xl font-semibold">Why Identity Matrices Matter</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="p-4 bg-muted rounded-lg">
            <h3 className="font-semibold text-sm mb-2">Matrix Inversion</h3>
            <p className="text-sm text-muted-foreground">
              When you find the inverse of a matrix A, you're looking for A⁻¹ such that A × A⁻¹ = I. The identity matrix is the "target" of matrix inversion.
            </p>
          </div>
          <div className="p-4 bg-muted rounded-lg">
            <h3 className="font-semibold text-sm mb-2">Linear Transformations</h3>
            <p className="text-sm text-muted-foreground">
              The identity matrix represents the "do nothing" transformation. It leaves vectors unchanged – like multiplying by 1 in regular arithmetic.
            </p>
          </div>
          <div className="p-4 bg-muted rounded-lg">
            <h3 className="font-semibold text-sm mb-2">Solving Systems</h3>
            <p className="text-sm text-muted-foreground">
              Gaussian elimination aims to transform the coefficient matrix into the identity matrix, revealing the solution directly.
            </p>
          </div>
          <div className="p-4 bg-muted rounded-lg">
            <h3 className="font-semibold text-sm mb-2">Eigenvalues</h3>
            <p className="text-sm text-muted-foreground">
              Finding eigenvalues involves solving det(A - λI) = 0. The identity matrix is essential for this fundamental concept.
            </p>
          </div>
        </div>
      </section>

      <section className="border-t pt-8 space-y-4">
        <h2 className="text-2xl font-semibold">Identity Matrix Examples</h2>
        <div className="space-y-3">
          <div className="p-4 bg-muted rounded-lg">
            <h3 className="font-semibold text-sm mb-2">Verification Example</h3>
            <p className="text-sm text-muted-foreground mb-2">Multiply any 2×2 matrix by I₂:</p>
            <p className="text-sm font-mono">
              [3  5]   [1  0]   [3  5]<br />
              [2  4] × [0  1] = [2  4]
            </p>
            <p className="text-xs text-muted-foreground mt-2">
              The result is the original matrix – unchanged.
            </p>
          </div>
          <div className="p-4 bg-muted rounded-lg">
            <h3 className="font-semibold text-sm mb-2">With Vectors</h3>
            <p className="text-sm text-muted-foreground mb-2">Multiply I₃ by any 3D vector:</p>
            <p className="text-sm font-mono">
              [1  0  0]   [x]   [x]<br />
              [0  1  0] × [y] = [y]<br />
              [0  0  1]   [z]   [z]
            </p>
            <p className="text-xs text-muted-foreground mt-2">
              The vector stays exactly the same.
            </p>
          </div>
        </div>
      </section>

      <section className="border-t pt-8 space-y-6">
        <h2 className="text-2xl font-semibold">Frequently Asked Questions</h2>
        <div>
          <h3 className="font-semibold mb-2">What makes a matrix an identity matrix?</h3>
          <p className="text-sm text-muted-foreground">
            An identity matrix must be square (same rows and columns), have all ones on the main diagonal (top-left to bottom-right), and zeros everywhere else.
          </p>
        </div>
        <div>
          <h3 className="font-semibold mb-2">Can an identity matrix be rectangular?</h3>
          <p className="text-sm text-muted-foreground">
            No. By definition, an identity matrix must be square. Rectangular matrices can't have a proper main diagonal from corner to corner.
          </p>
        </div>
        <div>
          <h3 className="font-semibold mb-2">What is I₀ (zero-by-zero identity matrix)?</h3>
          <p className="text-sm text-muted-foreground">
            The 0×0 identity matrix is an empty matrix. It's a technical edge case that exists in formal mathematics but has no practical elements.
          </p>
        </div>
        <div>
          <h3 className="font-semibold mb-2">Is the identity matrix symmetric?</h3>
          <p className="text-sm text-muted-foreground">
            Yes. The identity matrix equals its own transpose. Flip it across the diagonal and it looks exactly the same.
          </p>
        </div>
        <div>
          <h3 className="font-semibold mb-2">What's the difference between I and 1?</h3>
          <p className="text-sm text-muted-foreground">
            The number 1 is the identity for scalar multiplication. The identity matrix I is the identity for matrix multiplication. They play analogous roles in their respective systems.
          </p>
        </div>
      </section>

      <section className="border-t pt-8 space-y-4">
        <h2 className="text-2xl font-semibold">Related Math Tools</h2>
        <div className="grid sm:grid-cols-3 gap-4">
          <a href="/math-tools/matrix-addition-subtraction-calculator" className="p-4 rounded-lg border hover:bg-muted transition-colors">
            <p className="font-semibold text-sm">Matrix Addition/Subtraction</p>
            <p className="text-xs text-muted-foreground">Add and subtract matrices</p>
          </a>
          <a href="/math-tools/matrix-multiplication-calculator" className="p-4 rounded-lg border hover:bg-muted transition-colors">
            <p className="font-semibold text-sm">Matrix Multiplication</p>
            <p className="text-xs text-muted-foreground">Multiply matrices</p>
          </a>
          <a href="/math-tools/matrix-inverse-calculator" className="p-4 rounded-lg border hover:bg-muted transition-colors">
            <p className="font-semibold text-sm">Matrix Inverse Calculator</p>
            <p className="text-xs text-muted-foreground">Find matrix inverses</p>
          </a>
        </div>
      </section>
    </div>
  );
}
