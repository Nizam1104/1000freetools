"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function ScalarMultiplicationCalculator() {
  const [rows, setRows] = useState(2);
  const [cols, setCols] = useState(2);
  const [scalar, setScalar] = useState<number>(2);
  const [matrix, setMatrix] = useState<number[][]>([[1, 2], [3, 4]]);
  const [result, setResult] = useState<number[][] | null>(null);
  const [showSteps, setShowSteps] = useState(false);
  const [error, setError] = useState("");

  const initializeMatrix = (newRows: number, newCols: number) => {
    setRows(newRows);
    setCols(newCols);
    setMatrix(Array(newRows).fill(0).map(() => Array(newCols).fill(0)));
    setResult(null);
    setError("");
  };

  const updateMatrix = (row: number, col: number, value: string) => {
    const newMatrix = matrix.map((r, ri) =>
      r.map((c, ci) => (ri === row && ci === col ? parseFloat(value) || 0 : c))
    );
    setMatrix(newMatrix);
  };

  const calculate = () => {
    try {
      const resultMatrix = matrix.map(row =>
        row.map(cell => cell * scalar)
      );
      setResult(resultMatrix);
      setError("");
    } catch (e) {
      setError("Error calculating scalar multiplication. Please check your input.");
      setResult(null);
    }
  };

  const reset = () => {
    setMatrix(Array(rows).fill(0).map(() => Array(cols).fill(0)));
    setScalar(2);
    setResult(null);
    setError("");
    setShowSteps(false);
  };

  const loadExample = () => {
    setRows(2);
    setCols(3);
    setMatrix([[1, 2, 3], [4, 5, 6]]);
    setScalar(3);
    setResult(null);
  };

  const loadIdentityMatrix = () => {
    const size = Math.min(rows, cols);
    const identity = Array(rows).fill(0).map((_, i) =>
      Array(cols).fill(0).map((_, j) => (i === j ? 1 : 0))
    );
    setMatrix(identity);
    setResult(null);
  };

  const round = (n: number): string => {
    const rounded = Math.round(n * 10000) / 10000;
    return Number.isInteger(rounded) ? rounded.toString() : rounded.toFixed(4);
  };

  return (
    <div className="w-full max-w-5xl mx-auto space-y-8">
      <div className="mb-8">
        <h1 className="text-3xl font-semibold mb-2">Scalar Multiplication Calculator – Multiply Matrix by Scalar</h1>
        <p className="text-muted-foreground">
          Multiply any matrix by a scalar with our free online calculator. See the complete result matrix with step-by-step multiplication display.
        </p>
      </div>

      <div className="space-y-4">
        <div className="flex items-center gap-4 flex-wrap">
          <div className="flex items-center gap-2">
            <Label>Matrix Size:</Label>
            <Select value={`${rows}x${cols}`} onValueChange={(v) => {
              const [r, c] = v.split("x").map(Number);
              initializeMatrix(r, c);
            }}>
              <SelectTrigger className="w-28">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="2x2">2 × 2</SelectItem>
                <SelectItem value="2x3">2 × 3</SelectItem>
                <SelectItem value="2x4">2 × 4</SelectItem>
                <SelectItem value="3x2">3 × 2</SelectItem>
                <SelectItem value="3x3">3 × 3</SelectItem>
                <SelectItem value="3x4">3 × 4</SelectItem>
                <SelectItem value="4x2">4 × 2</SelectItem>
                <SelectItem value="4x3">4 × 3</SelectItem>
                <SelectItem value="4x4">4 × 4</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-center gap-2">
            <Label>Scalar (k):</Label>
            <Input
              type="number"
              value={scalar}
              onChange={(e) => setScalar(parseFloat(e.target.value) || 0)}
              className="w-24"
              step="any"
            />
          </div>
          <Button variant="outline" size="sm" onClick={loadExample}>Load Example</Button>
          <Button variant="outline" size="sm" onClick={loadIdentityMatrix}>Identity Matrix</Button>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          <div>
            <h3 className="font-semibold mb-3">Original Matrix A ({rows}×{cols})</h3>
            <div className="overflow-x-auto">
              <div className="flex items-center">
                <span className="text-4xl font-light mr-2">[</span>
                <div className="grid gap-2" style={{ gridTemplateColumns: `repeat(${cols}, 1fr)` }}>
                  {matrix.map((row, ri) =>
                    row.map((cell, ci) => (
                      <Input
                        key={`a-${ri}-${ci}`}
                        type="number"
                        value={cell || ""}
                        onChange={(e) => updateMatrix(ri, ci, e.target.value)}
                        className="w-14 h-10 text-center"
                        step="any"
                      />
                    ))
                  )}
                </div>
                <span className="text-4xl font-light ml-2">]</span>
              </div>
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-3">Result: {scalar} × A</h3>
            {result ? (
              <div className="overflow-x-auto">
                <div className="flex items-center">
                  <span className="text-4xl font-light mr-2">[</span>
                  <div className="grid gap-2" style={{ gridTemplateColumns: `repeat(${cols}, 1fr)` }}>
                    {result.map((row, ri) =>
                      row.map((cell, ci) => (
                        <div
                          key={`r-${ri}-${ci}`}
                          className="w-14 h-10 flex items-center justify-center bg-primary text-primary-foreground font-mono rounded"
                        >
                          {round(cell)}
                        </div>
                      ))
                    )}
                  </div>
                  <span className="text-4xl font-light ml-2">]</span>
                </div>
              </div>
            ) : (
              <div className="p-8 bg-muted rounded-lg text-center text-muted-foreground">
                Click "Multiply" to see the result
              </div>
            )}
          </div>
        </div>

        <div className="flex gap-2">
          <Button onClick={calculate}>Multiply Matrix</Button>
          <Button variant="outline" onClick={reset}>Reset</Button>
          {result && (
            <Button variant="outline" onClick={() => setShowSteps(!showSteps)}>
              {showSteps ? "Hide Steps" : "Show Step-by-Step"}
            </Button>
          )}
        </div>

        {error && (
          <div className="p-4 bg-destructive/10 text-destructive rounded-md">
            <p className="text-sm">{error}</p>
          </div>
        )}

        {result && showSteps && (
          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-3">Step-by-Step Calculation</h4>
            <p className="text-sm text-muted-foreground mb-4">
              Each element is multiplied by the scalar {scalar}:
            </p>
            <div className="space-y-3 font-mono text-xs bg-muted p-3 rounded overflow-x-auto">
              {matrix.map((row, ri) =>
                row.map((cell, ci) => (
                  <div key={`${ri}-${ci}`}>
                    {scalar} × {cell} = {round(cell * scalar)}
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {result && (
          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-2">Understanding the Result</h4>
            <p className="text-sm text-muted-foreground">
              Scalar multiplication multiplies <strong>every element</strong> of the matrix by the scalar value.
              The resulting matrix has the same dimensions as the original.
            </p>
          </div>
        )}
      </div>

      <div className="mt-16 space-y-12">
        <section>
          <h2 className="text-2xl font-semibold mb-4">How Scalar Multiplication Works</h2>
          <p className="text-muted-foreground mb-4">
            Scalar multiplication is one of the fundamental operations in linear algebra. When you multiply a matrix by a scalar (a single number), you multiply <strong>every element</strong> of the matrix by that number. The result is a new matrix with the same dimensions as the original.
          </p>
          <p className="text-muted-foreground mb-4">
            If you have a matrix A and scalar k, the scalar multiplication k·A produces a matrix where each element aᵢⱼ becomes k·aᵢⱼ. This operation scales the entire matrix uniformly—think of it as stretching or shrinking all values by the same factor.
          </p>
          <div className="bg-muted p-4 rounded-lg font-mono text-sm">
            <p>If A = [a b; c d] and k = 3, then:</p>
            <p>k·A = [3a 3b; 3c 3d]</p>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Example Calculations</h2>

          <h3 className="text-xl font-semibold mb-3 mt-6">2×2 Matrix Example</h3>
          <p className="text-muted-foreground mb-2">
            Multiply matrix A by scalar k = 3:
          </p>
          <div className="bg-muted p-4 rounded-lg font-mono text-sm space-y-2">
            <p>A = [1  2]</p>
            <p>    [3  4]</p>
            <p className="mt-4">3·A = [3·1  3·2] = [3   6 ]</p>
            <p>      [3·3  3·4]   [9  12]</p>
          </div>

          <h3 className="text-xl font-semibold mb-3 mt-6">2×3 Matrix Example</h3>
          <p className="text-muted-foreground mb-2">
            Multiply by k = -2:
          </p>
          <div className="bg-muted p-4 rounded-lg font-mono text-sm space-y-2">
            <p>A = [1  2  3]</p>
            <p>    [4  5  6]</p>
            <p className="mt-4">-2·A = [-2  -4  -6]</p>
            <p>       [-8 -10 -12]</p>
          </div>

          <h3 className="text-xl font-semibold mb-3 mt-6">Identity Matrix Example</h3>
          <p className="text-muted-foreground mb-2">
            Multiplying the identity matrix by 5:
          </p>
          <div className="bg-muted p-4 rounded-lg font-mono text-sm space-y-2">
            <p>I = [1  0]</p>
            <p>    [0  1]</p>
            <p className="mt-4">5·I = [5  0]</p>
            <p>      [0  5]</p>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Quick Fact: Matrices in History</h2>
          <div className="bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 p-6 rounded-lg">
            <p className="text-muted-foreground">
              The term "matrix" was coined by <strong>James Joseph Sylvester</strong> in 1850, derived from the Latin word for "womb." Sylvester saw matrices as containers that could "give birth" to various mathematical determinants. His colleague <strong>Arthur Cayley</strong> developed the modern theory of matrices in 1858, publishing the first systematic treatment of matrix algebra. Interestingly, matrices were used in Chinese mathematics as early as 300 BCE in the text "Nine Chapters on the Mathematical Art" to solve systems of linear equations—predating European development by over 2000 years.
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-6">Frequently Asked Questions</h2>

          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-2">What is a scalar in mathematics?</h3>
              <p className="text-muted-foreground">
                A scalar is a single number (real or complex) used to scale other mathematical objects. Unlike vectors or matrices that have multiple components, a scalar has only magnitude. In scalar multiplication, the scalar acts as a multiplier that uniformly scales every element of the matrix.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">Does scalar multiplication change the matrix dimensions?</h3>
              <p className="text-muted-foreground">
                No, scalar multiplication preserves the dimensions of the original matrix. If you multiply a 3×4 matrix by any scalar, the result is still a 3×4 matrix. Only the values inside change, not the structure.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">What happens when you multiply a matrix by zero?</h3>
              <p className="text-muted-foreground">
                Multiplying any matrix by the scalar 0 produces a zero matrix (all elements become 0). This is analogous to multiplying any number by zero in regular arithmetic. The zero matrix plays an important role in linear algebra as the additive identity.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">Can I multiply a matrix by a negative scalar?</h3>
              <p className="text-muted-foreground">
                Yes, negative scalars work the same way as positive ones. Each element gets multiplied by the negative number, which flips the sign of every element. For example, -1·A produces the additive inverse of matrix A.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">Is scalar multiplication commutative?</h3>
              <p className="text-muted-foreground">
                Yes, scalar multiplication is commutative: k·A = A·k. Since you're multiplying each element by the same scalar, the order doesn't matter. This differs from matrix-matrix multiplication, which is generally not commutative.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">What are the properties of scalar multiplication?</h3>
              <p className="text-muted-foreground">
                Key properties include: (1) Distributive over matrix addition: k(A+B) = kA + kB, (2) Distributive over scalar addition: (k+m)A = kA + mA, (3) Associative with scalar multiplication: k(mA) = (km)A, and (4) Identity: 1·A = A.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">Where is scalar multiplication used in real applications?</h3>
              <p className="text-muted-foreground">
                Scalar multiplication appears in computer graphics (scaling objects), physics (scaling force vectors), economics (adjusting price matrices), and machine learning (weight adjustments in neural networks). It's a fundamental operation in any field that uses linear algebra.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
