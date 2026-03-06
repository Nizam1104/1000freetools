"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function MatrixTraceCalculator() {
  const [size, setSize] = useState(3);
  const [matrix, setMatrix] = useState<number[][]>([
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
  ]);
  const [result, setResult] = useState<number | null>(null);
  const [error, setError] = useState("");

  const initializeMatrix = (newSize: number) => {
    setSize(newSize);
    setMatrix(Array(newSize).fill(0).map(() => Array(newSize).fill(0)));
    setResult(null);
    setError("");
  };

  const updateMatrix = (row: number, col: number, value: string) => {
    const newMatrix = matrix.map((r, ri) =>
      r.map((c, ci) => (ri === row && ci === col ? parseFloat(value) || 0 : c))
    );
    setMatrix(newMatrix);
  };

  const calculateTrace = () => {
    try {
      let trace = 0;
      for (let i = 0; i < size; i++) {
        trace += matrix[i][i];
      }
      setResult(trace);
      setError("");
    } catch (e) {
      setError("Error calculating trace. Please check your input.");
      setResult(null);
    }
  };

  const reset = () => {
    setMatrix(Array(size).fill(0).map(() => Array(size).fill(0)));
    setResult(null);
    setError("");
  };

  const loadExample = () => {
    const examples: Record<number, number[][]> = {
      2: [[1, 2], [3, 4]],
      3: [[1, 2, 3], [4, 5, 6], [7, 8, 9]],
      4: [[1, 2, 3, 4], [5, 6, 7, 8], [9, 10, 11, 12], [13, 14, 15, 16]]
    };
    setMatrix(examples[size]);
    setResult(null);
  };

  const loadIdentityMatrix = () => {
    const identity = Array(size).fill(0).map((_, i) =>
      Array(size).fill(0).map((_, j) => (i === j ? 1 : 0))
    );
    setMatrix(identity);
    setResult(null);
  };

  const loadDiagonalMatrix = () => {
    const diagonal = Array(size).fill(0).map((_, i) =>
      Array(size).fill(0).map((_, j) => (i === j ? (i + 1) * 2 : 0))
    );
    setMatrix(diagonal);
    setResult(null);
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      <div className="mb-8">
        <h1 className="text-3xl font-semibold mb-2">Matrix Trace Calculator – Find tr(A) Online</h1>
        <p className="text-muted-foreground">
          Calculate the trace of any square matrix with our free online matrix trace calculator. Find the sum of diagonal elements instantly with step-by-step display.
        </p>
      </div>

      <div className="space-y-4">
        <div className="flex items-center gap-4 flex-wrap">
          <div className="flex items-center gap-2">
            <Label>Matrix Size:</Label>
            <Select value={size.toString()} onValueChange={(v) => initializeMatrix(parseInt(v))}>
              <SelectTrigger className="w-28">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="2">2 × 2</SelectItem>
                <SelectItem value="3">3 × 3</SelectItem>
                <SelectItem value="4">4 × 4</SelectItem>
                <SelectItem value="5">5 × 5</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button variant="outline" size="sm" onClick={loadExample}>Load Example</Button>
          <Button variant="outline" size="sm" onClick={loadIdentityMatrix}>Identity Matrix</Button>
          <Button variant="outline" size="sm" onClick={loadDiagonalMatrix}>Diagonal Matrix</Button>
        </div>

        <div className="flex justify-center">
          <div className="overflow-x-auto">
            <div className="flex items-center">
              <span className="text-4xl font-light mr-2">[</span>
              <div className="grid gap-2" style={{ gridTemplateColumns: `repeat(${size}, 1fr)` }}>
                {matrix.map((row, ri) =>
                  row.map((cell, ci) => (
                    <Input
                      key={`${ri}-${ci}`}
                      type="number"
                      value={cell || ""}
                      onChange={(e) => updateMatrix(ri, ci, e.target.value)}
                      className={`w-14 h-12 text-center ${ri === ci ? 'bg-primary/10 border-primary' : ''}`}
                    />
                  ))
                )}
              </div>
              <span className="text-4xl font-light ml-2">]</span>
            </div>
          </div>
        </div>

        <p className="text-sm text-muted-foreground text-center">
          Diagonal elements are highlighted (blue background). The trace is the sum of these elements.
        </p>

        <div className="flex gap-2">
          <Button onClick={calculateTrace}>Calculate Trace</Button>
          <Button variant="outline" onClick={reset}>Reset</Button>
        </div>

        {error && (
          <div className="p-4 bg-destructive/10 text-destructive rounded-md">
            <p className="text-sm">{error}</p>
          </div>
        )}

        {result !== null && (
          <div className="space-y-4">
            <div className="p-6 bg-muted rounded-lg">
              <p className="text-sm text-muted-foreground mb-2">
                tr(A) = Sum of Diagonal Elements
              </p>
              <div className="text-center">
                <p className="text-4xl font-bold text-primary">{result}</p>
              </div>
              <div className="mt-4 p-4 bg-background rounded-lg">
                <p className="text-sm font-mono">
                  tr(A) = {matrix.map((_, i) => `a[${i}][${i}]`).join(" + ")} = {matrix.map((_, i) => matrix[i][i]).join(" + ")} = {result}
                </p>
              </div>
            </div>

            <div className="p-4 border rounded-lg">
              <h4 className="font-semibold text-sm mb-2">Understanding the Trace</h4>
              <p className="text-sm text-muted-foreground">
                The trace is the sum of elements on the main diagonal (top-left to bottom-right).
                Only square matrices have a trace.
              </p>
            </div>
          </div>
        )}
      </div>

      <section className="border-t pt-8 space-y-4">
        <h2 className="text-2xl font-semibold">What is Matrix Trace?</h2>
        <p className="text-muted-foreground">
          The trace of a square matrix A, denoted tr(A), is the sum of the elements on its main diagonal (from top-left to bottom-right). For an n×n matrix A, the trace is: tr(A) = a₁₁ + a₂₂ + ... + aₙₙ.
        </p>
        <p className="text-muted-foreground">
          The trace is an important matrix invariant used in linear algebra, quantum mechanics, and various applications in physics and engineering.
        </p>
      </section>

      <section className="border-t pt-8">
        <h2 className="text-2xl font-semibold mb-6">Trace Formula</h2>
        <div className="p-4 border rounded-lg">
          <code className="text-lg font-mono bg-muted px-3 py-2 rounded block">
            tr(A) = Σ(i=1 to n) aᵢᵢ
          </code>
          <p className="text-sm text-muted-foreground mt-2">
            Sum all elements where row index equals column index.
          </p>
          <div className="mt-4 p-3 bg-muted rounded">
            <p className="text-sm font-semibold mb-2">Example (3×3 matrix):</p>
            <code className="text-xs font-mono block">
              {`A = [[1, 2, 3],
     [4, 5, 6],
     [7, 8, 9]]

tr(A) = 1 + 5 + 9 = 15`}
            </code>
          </div>
        </div>
      </section>

      <section className="border-t pt-8">
        <h2 className="text-2xl font-semibold mb-6">Properties of Matrix Trace</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="p-4 bg-muted rounded-lg">
            <h3 className="font-semibold mb-2">Basic Properties</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• tr(A + B) = tr(A) + tr(B)</li>
              <li>• tr(cA) = c × tr(A) (c is scalar)</li>
              <li>• tr(Aᵀ) = tr(A) (trace of transpose)</li>
              <li>• tr(Iₙ) = n (trace of identity matrix)</li>
              <li>• tr(0) = 0 (trace of zero matrix)</li>
            </ul>
          </div>
          <div className="p-4 bg-muted rounded-lg">
            <h3 className="font-semibold mb-2">Advanced Properties</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• tr(AB) = tr(BA) (cyclic property)</li>
              <li>• tr(ABC) = tr(BCA) = tr(CAB)</li>
              <li>• tr(A) = sum of eigenvalues</li>
              <li>• tr(Aᵏ) = sum of eigenvaluesᵏ</li>
              <li>• Similar matrices have same trace</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="border-t pt-8">
        <h2 className="text-2xl font-semibold mb-6">Trace Examples</h2>
        <div className="space-y-4">
          <div className="p-4 border rounded-lg">
            <h3 className="font-semibold mb-2">2×2 Matrix</h3>
            <code className="text-sm font-mono bg-muted px-2 py-1 rounded block">
              {`A = [[3, 1],
     [2, 4]]

tr(A) = 3 + 4 = 7`}
            </code>
          </div>
          <div className="p-4 border rounded-lg">
            <h3 className="font-semibold mb-2">Identity Matrix</h3>
            <code className="text-sm font-mono bg-muted px-2 py-1 rounded block">
              {`I₃ = [[1, 0, 0],
      [0, 1, 0],
      [0, 0, 1]]

tr(I₃) = 1 + 1 + 1 = 3`}
            </code>
            <p className="text-xs text-muted-foreground mt-2">
              Trace of n×n identity matrix always equals n.
            </p>
          </div>
          <div className="p-4 border rounded-lg">
            <h3 className="font-semibold mb-2">Diagonal Matrix</h3>
            <code className="text-sm font-mono bg-muted px-2 py-1 rounded block">
              {`D = [[5, 0, 0],
     [0, 3, 0],
     [0, 0, 7]]

tr(D) = 5 + 3 + 7 = 15`}
            </code>
            <p className="text-xs text-muted-foreground mt-2">
              For diagonal matrices, trace equals sum of diagonal entries.
            </p>
          </div>
        </div>
      </section>

      <section className="border-t pt-8">
        <h2 className="text-2xl font-semibold mb-6">Applications of Matrix Trace</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="p-4 border rounded-lg">
            <h3 className="font-semibold mb-2">Quantum Mechanics</h3>
            <p className="text-sm text-muted-foreground">
              The trace of a density matrix equals 1. Expectation values are calculated using trace operations.
            </p>
          </div>
          <div className="p-4 border rounded-lg">
            <h3 className="font-semibold mb-2">Linear Algebra</h3>
            <p className="text-sm text-muted-foreground">
              The trace equals the sum of eigenvalues, useful for characterizing matrices.
            </p>
          </div>
          <div className="p-4 border rounded-lg">
            <h3 className="font-semibold mb-2">Statistics</h3>
            <p className="text-sm text-muted-foreground">
              Used in multivariate analysis and covariance matrix computations.
            </p>
          </div>
          <div className="p-4 border rounded-lg">
            <h3 className="font-semibold mb-2">Machine Learning</h3>
            <p className="text-sm text-muted-foreground">
              Trace regularization and kernel methods use trace operations.
            </p>
          </div>
        </div>
      </section>

      <section className="border-t pt-8">
        <h2 className="text-2xl font-semibold mb-6">Frequently Asked Questions</h2>
        <div className="space-y-4">
          <div className="p-4 bg-muted rounded-lg">
            <h3 className="font-semibold mb-2">Can non-square matrices have a trace?</h3>
            <p className="text-sm text-muted-foreground">
              No, only square matrices have a trace because the main diagonal is only defined for matrices with equal rows and columns.
            </p>
          </div>
          <div className="p-4 bg-muted rounded-lg">
            <h3 className="font-semibold mb-2">What is the trace of a zero matrix?</h3>
            <p className="text-sm text-muted-foreground">
              The trace of any zero matrix is 0, since all diagonal elements are 0.
            </p>
          </div>
          <div className="p-4 bg-muted rounded-lg">
            <h3 className="font-semibold mb-2">Is trace the same as determinant?</h3>
            <p className="text-sm text-muted-foreground">
              No. Trace is the sum of diagonal elements (and eigenvalues). Determinant is the product of eigenvalues. They are different matrix invariants.
            </p>
          </div>
          <div className="p-4 bg-muted rounded-lg">
            <h3 className="font-semibold mb-2">Why is tr(AB) = tr(BA)?</h3>
            <p className="text-sm text-muted-foreground">
              This cyclic property holds even when AB ≠ BA. It's a fundamental property used extensively in matrix algebra and physics.
            </p>
          </div>
        </div>
      </section>

      <section className="border-t pt-8">
        <h2 className="text-2xl font-semibold mb-6">Related Math Tools</h2>
        <div className="grid sm:grid-cols-3 gap-4">
          <a href="/math-tools/matrix-determinant-calculator" className="p-4 rounded-lg border hover:bg-muted transition-colors">
            <p className="font-semibold text-sm">Matrix Determinant</p>
            <p className="text-xs text-muted-foreground">Find det(A)</p>
          </a>
          <a href="/math-tools/matrix-transpose-calculator" className="p-4 rounded-lg border hover:bg-muted transition-colors">
            <p className="font-semibold text-sm">Matrix Transpose</p>
            <p className="text-xs text-muted-foreground">Find Aᵀ</p>
          </a>
          <a href="/math-tools/eigenvalue-calculator" className="p-4 rounded-lg border hover:bg-muted transition-colors">
            <p className="font-semibold text-sm">Eigenvalues</p>
            <p className="text-xs text-muted-foreground">Find λ</p>
          </a>
        </div>
      </section>
    </div>
  );
}
