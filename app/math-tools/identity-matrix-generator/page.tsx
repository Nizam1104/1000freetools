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

    if (num < 1 || num > 50) {
      setError("Please enter a size between 1 and 50");
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

  const loadExample = (s: string) => {
    setSize(s);
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

        <div className="flex gap-2 flex-wrap">
          <Button onClick={calculate}>Generate Identity Matrix</Button>
          <Button variant="outline" onClick={reset}>Reset</Button>
        </div>

        <div className="flex flex-wrap gap-2">
          <span className="text-sm text-muted-foreground self-center">Examples:</span>
          <Button variant="ghost" size="sm" onClick={() => loadExample("2")}>2×2</Button>
          <Button variant="ghost" size="sm" onClick={() => loadExample("3")}>3×3</Button>
          <Button variant="ghost" size="sm" onClick={() => loadExample("4")}>4×4</Button>
          <Button variant="ghost" size="sm" onClick={() => loadExample("5")}>5×5</Button>
          <Button variant="ghost" size="sm" onClick={() => loadExample("10")}>10×10</Button>
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

      <section className="border-t pt-8 space-y-6">
        <h2 className="text-2xl font-semibold">Understanding Identity Matrices</h2>
        <p className="text-muted-foreground">
          An identity matrix is a square matrix with ones on the main diagonal (top-left to bottom-right) and zeros everywhere else. It's denoted by I or Iₙ where n is the size. Just like multiplying by 1 leaves a number unchanged, multiplying by the identity matrix leaves any matrix unchanged.
        </p>
        <p className="text-muted-foreground">
          Identity matrices are fundamental in linear algebra. They serve as the multiplicative identity for matrix multiplication, appear in matrix inverses (A × A⁻¹ = I), and are crucial in solving systems of equations, eigenvalue problems, and transformations.
        </p>
      </section>

      <section className="border-t pt-8 space-y-6">
        <h3 className="text-xl font-semibold">Properties of Identity Matrices</h3>
        <div className="p-6 bg-muted rounded-lg">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-sm mb-3">Definition</h4>
              <div className="font-mono text-center p-3 bg-background rounded mb-3">
                Iₙ[i,j] = 1 if i = j, else 0
              </div>
              <p className="text-sm text-muted-foreground">
                Also written using the Kronecker delta: Iₙ[i,j] = δᵢⱼ
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-sm mb-3">Key Properties</h4>
              <ul className="space-y-2 text-sm">
                <li>• A × I = I × A = A (identity property)</li>
                <li>• I × I = I (idempotent)</li>
                <li>• det(I) = 1 (determinant is 1)</li>
                <li>• I⁻¹ = I (self-inverse)</li>
                <li>• Iᵀ = I (symmetric)</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t pt-8 space-y-6">
        <h3 className="text-xl font-semibold">Worked Examples</h3>
        <div className="space-y-4">
          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-3">Example 1: 2×2 Identity Matrix</h4>
            <div className="font-mono text-sm">
              <div>I₂ = [1  0]</div>
              <div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[0  1]</div>
              <div className="text-muted-foreground mt-2">The smallest non-trivial identity matrix.</div>
            </div>
          </div>

          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-3">Example 2: 3×3 Identity Matrix</h4>
            <div className="font-mono text-sm">
              <div>I₃ = [1  0  0]</div>
              <div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[0  1  0]</div>
              <div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[0  0  1]</div>
              <div className="text-muted-foreground mt-2">Common in 3D graphics transformations.</div>
            </div>
          </div>

          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-3">Example 3: Matrix Multiplication with Identity</h4>
            <div className="font-mono text-sm space-y-2">
              <div>Let A = [2  3]</div>
              <div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[4  5]</div>
              <div className="mt-2">A × I₂ = [2  3] × [1  0]</div>
              <div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[4  5]&nbsp;&nbsp;&nbsp;[0  1]</div>
              <div className="mt-2">= [2×1+3×0  2×0+3×1]</div>
              <div>&nbsp;&nbsp;&nbsp;[4×1+5×0  4×0+5×1]</div>
              <div>= [2  3] = A ✓</div>
              <div>&nbsp;&nbsp;&nbsp;[4  5]</div>
            </div>
          </div>

          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-3">Example 4: Identity in Matrix Inverse</h4>
            <div className="text-sm space-y-2">
              <p>If A × B = I, then B is the inverse of A (B = A⁻¹).</p>
              <div className="font-mono">For A = [2  1], A⁻¹ = [1  -0.5]</div>
              <div className="font-mono">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[1  1]&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[-1  1]</div>
              <div className="font-mono mt-2">A × A⁻¹ = [1  0] = I₂</div>
              <div className="font-mono">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[0  1]</div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t pt-8 space-y-6">
        <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg">
          <h4 className="font-semibold text-sm mb-2 text-amber-800">Quick Fact</h4>
          <p className="text-sm text-amber-700">
            The identity matrix is sometimes called the "unit matrix." In Einstein's summation convention, the Kronecker delta δᵢⱼ (which equals 1 when i=j and 0 otherwise) is used to represent identity matrix elements compactly in tensor notation.
          </p>
        </div>
      </section>

      <section className="border-t pt-8 space-y-6">
        <h3 className="text-xl font-semibold">Frequently Asked Questions</h3>
        <div className="space-y-6">
          <div>
            <h4 className="font-semibold text-sm mb-2">Why is it called the "identity" matrix?</h4>
            <p className="text-sm text-muted-foreground">
              Because it acts as the identity element for matrix multiplication. Just as 1 is the multiplicative identity for numbers (a × 1 = a), the identity matrix I is the multiplicative identity for matrices (A × I = A).
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">Can identity matrices be rectangular?</h4>
            <p className="text-sm text-muted-foreground">
              No, identity matrices must be square (same number of rows and columns). The concept requires the diagonal from top-left to bottom-right, which only exists in square matrices.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">What's the determinant of an identity matrix?</h4>
            <p className="text-sm text-muted-foreground">
              Always 1, regardless of size. This makes sense because the identity matrix represents "no change" – it doesn't scale space at all.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">Is the identity matrix invertible?</h4>
            <p className="text-sm text-muted-foreground">
              Yes, and it's its own inverse! I × I = I, so I⁻¹ = I. This is unique – most matrices have different inverses.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">What are identity matrices used for?</h4>
            <p className="text-sm text-muted-foreground">
              Solving systems of equations (Gaussian elimination produces identity), finding matrix inverses, representing "no transformation" in computer graphics, defining orthogonality, and as starting points in iterative algorithms.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">Can you have a 1×1 identity matrix?</h4>
            <p className="text-sm text-muted-foreground">
              Yes! I₁ = [1]. It's just the number 1, which makes sense since 1×1 matrices behave like scalars.
            </p>
          </div>
        </div>
      </section>

    </div>
  );
}
