"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function DeterminantCalculator() {
  const [matrix, setMatrix] = useState<string>("1,2,3\n4,5,6\n7,8,9");
  const [result, setResult] = useState<number | null>(null);
  const [error, setError] = useState<string>("");

  const parseMatrix = (input: string): number[][] => {
    return input.trim().split("\n").map((row) =>
      row.split(",").map((cell) => parseFloat(cell.trim())).filter((n) => !isNaN(n))
    );
  };

  const determinant = (matrix: number[][]): number => {
    const n = matrix.length;
    if (n === 1) return matrix[0][0];
    if (n === 2) return matrix[0][0] * matrix[1][1] - matrix[0][1] * matrix[1][0];
    
    let det = 0;
    for (let col = 0; col < n; col++) {
      const subMatrix = matrix.slice(1).map((row) => [...row.slice(0, col), ...row.slice(col + 1)]);
      det += Math.pow(-1, col) * matrix[0][col] * determinant(subMatrix);
    }
    return det;
  };

  const calculate = () => {
    try {
      const M = parseMatrix(matrix);
      
      if (M.length !== M[0].length) {
        setError("Matrix must be square");
        return;
      }
      
      setResult(determinant(M));
      setError("");
    } catch {
      setError("Invalid matrix format");
    }
  };

  const reset = () => {
    setMatrix("1,2,3\n4,5,6\n7,8,9");
    setResult(null);
    setError("");
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <Card>
        
        <CardContent>
          <div className="space-y-4">
            <div>
              <label className="text-sm text-muted-foreground mb-2 block">Matrix (rows separated by newlines)</label>
              <textarea
                className="w-full min-h-[100px] p-2 border rounded-md font-mono text-sm bg-background"
                value={matrix}
                onChange={(e) => setMatrix(e.target.value)}
                placeholder="1,2,3&#10;4,5,6&#10;7,8,9"
              />
            </div>
            {error && <p className="text-destructive text-sm">{error}</p>}
            <div className="flex gap-2">
              <Button onClick={calculate}>Calculate</Button>
              <Button variant="outline" onClick={reset}>Reset</Button>
            </div>
            {result !== null && (
              <div className="p-4 bg-muted rounded-md">
                <p className="text-sm text-muted-foreground">Determinant</p>
                <p className="text-2xl font-semibold">{result}</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <div className="mt-8 space-y-6">
        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4">
              How to Use This Determinant Calculator
            </h3>
            <div className="space-y-4 text-sm text-muted-foreground">
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary font-semibold">
                  1
                </div>
                <div>
                  <p className="font-medium text-foreground">Enter your matrix values</p>
                  <p>Type numbers separated by commas for each row. Press Enter or use a new line for each row. The matrix must be square (same number of rows and columns).</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="flex-shrink-0-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary font-semibold">
                  2
                </div>
                <div>
                  <p className="font-medium text-foreground">Verify the matrix format</p>
                  <p>Check that your input looks correct. For a 3x3 matrix, you need 3 rows with 3 numbers each, like: 1,2,3 on the first line, 4,5,6 on the second, 7,8,9 on the third.</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary font-semibold">
                  3
                </div>
                <div>
                  <p className="font-medium text-foreground">Click Calculate to get the result</p>
                  <p>The calculator computes the determinant using cofactor expansion. A result of 0 means the matrix is singular (not invertible).</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4">
              Determinant Properties Reference
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-2 font-semibold">Property</th>
                    <th className="text-left py-3 px-2 font-semibold">Description</th>
                    <th className="text-left py-3 px-2 font-semibold">Example</th>
                  </tr>
                </thead>
                <tbody className="text-muted-foreground">
                  <tr className="border-b">
                    <td className="py-3 px-2 font-medium">Identity Matrix</td>
                    <td className="py-3 px-2">Determinant equals 1</td>
                    <td className="py-3 px-2">det(I) = 1</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-2 font-medium">Zero Row/Column</td>
                    <td className="py-3 px-2">Determinant equals 0</td>
                    <td className="py-3 px-2">Any row of zeros gives det = 0</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-2 font-medium">Row Swap</td>
                    <td className="py-3 px-2">Changes sign of determinant</td>
                    <td className="py-3 px-2">Swapping rows multiplies det by -1</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-2 font-medium">Scalar Multiple</td>
                    <td className="py-3 px-2">Multiply row by k, det multiplies by k</td>
                    <td className="py-3 px-2">det(kA) = k^n det(A) for n x n matrix</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-2 font-medium">Product Rule</td>
                    <td className="py-3 px-2">det(AB) = det(A) det(B)</td>
                    <td className="py-3 px-2">Determinant of product equals product of determinants</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-2 font-medium">Transpose</td>
                    <td className="py-3 px-2">det(A) = det(A^T)</td>
                    <td className="py-3 px-2">Determinant unchanged by transposing</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4">
              Understanding Determinants
            </h3>
            <div className="space-y-4 text-sm text-muted-foreground">
              <p>
                The determinant is a single number calculated from a square matrix. It tells you important things about the matrix without needing to look at all the individual elements.
              </p>
              <div>
                <h4 className="font-medium text-foreground mb-2">What Does the Determinant Tell You?</h4>
                <p>
                  If the determinant is zero, the matrix is singular — it has no inverse. This means the system of equations it represents either has no solution or infinitely many solutions. If the determinant is non-zero, the matrix is invertible and the system has exactly one solution.
                </p>
              </div>
              <div>
                <h4 className="font-medium text-foreground mb-2">Geometric Meaning</h4>
                <p>
                  For a 2x2 matrix, the absolute value of the determinant equals the area of the parallelogram formed by the column vectors. For a 3x3 matrix, it equals the volume of the parallelepiped. The sign indicates orientation (whether the transformation preserves or reverses handedness).
                </p>
              </div>
              <div>
                <h4 className="font-medium text-foreground mb-2">2x2 Determinant Formula</h4>
                <p>
                  For a 2x2 matrix [[a,b],[c,d]], the determinant is ad - bc. Example: [[3,1],[2,4]] has determinant (3)(4) - (1)(2) = 12 - 2 = 10.
                </p>
              </div>
              <div>
                <h4 className="font-medium text-foreground mb-2">3x3 Determinant Using Cofactor Expansion</h4>
                <p>
                  For a 3x3 matrix, expand along the first row: det = a(ei-fh) - b(di-fg) + c(dh-eg) where the matrix is [[a,b,c],[d,e,f],[g,h,i]]. This is sometimes called the "rule of Sarrus" when visualized with diagonals.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4">
              Common Determinant Values
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-2 font-semibold">Matrix Type</th>
                    <th className="text-left py-3 px-2 font-semibold">Determinant</th>
                    <th className="text-left py-3 px-2 font-semibold">Invertible?</th>
                  </tr>
                </thead>
                <tbody className="text-muted-foreground">
                  <tr className="border-b">
                    <td className="py-3 px-2">Identity Matrix</td>
                    <td className="py-3 px-2">1</td>
                    <td className="py-3 px-2">Yes</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-2">Diagonal Matrix</td>
                    <td className="py-3 px-2">Product of diagonal elements</td>
                    <td className="py-3 px-2">Yes, if no diagonal element is 0</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-2">Triangular Matrix</td>
                    <td className="py-3 px-2">Product of diagonal elements</td>
                    <td className="py-3 px-2">Yes, if no diagonal element is 0</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-2">Matrix with proportional rows</td>
                    <td className="py-3 px-2">0</td>
                    <td className="py-3 px-2">No (singular)</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-2">Orthogonal Matrix</td>
                    <td className="py-3 px-2">1 or -1</td>
                    <td className="py-3 px-2">Yes</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-2">Matrix with a zero row</td>
                    <td className="py-3 px-2">0</td>
                    <td className="py-3 px-2">No (singular)</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4">
              Tips for Working with Determinants
            </h3>
            <div className="space-y-4 text-sm text-muted-foreground">
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <p className="font-medium text-foreground">Use Row Operations to Simplify</p>
                  <p>Adding a multiple of one row to another doesn't change the determinant. Use this to create zeros and make calculation easier.</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <p className="font-medium text-foreground">Expand Along Rows or Columns with Zeros</p>
                  <p>When using cofactor expansion, pick the row or column with the most zeros. You only need to compute cofactors for non-zero elements.</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <p className="font-medium text-foreground">Check for Singular Matrices First</p>
                  <p>If two rows or columns are identical or proportional, the determinant is zero. Spot these patterns before calculating.</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <p className="font-medium text-foreground">Remember the Sign Pattern for Cofactors</p>
                  <p>Cofactor signs alternate in a checkerboard pattern: + - + / - + - / + - +. This matters when expanding by cofactors.</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4">
              Frequently Asked Questions
            </h3>
            <div className="space-y-4 text-sm text-muted-foreground">
              <div>
                <h4 className="font-medium text-foreground mb-2">What does a determinant of 0 mean?</h4>
                <p>
                  A determinant of 0 means the matrix is singular — it has no inverse. Geometrically, the transformation collapses space into a lower dimension. For systems of equations, it means either no solution or infinitely many solutions.
                </p>
              </div>
              <div>
                <h4 className="font-medium text-foreground mb-2">Can a determinant be negative?</h4>
                <p>
                  Yes. A negative determinant indicates the transformation reverses orientation. In 2D, it flips the plane (like a mirror reflection). In 3D, it changes a right-handed coordinate system to left-handed or vice versa.
                </p>
              </div>
              <div>
                <h4 className="font-medium text-foreground mb-2">How do I find the determinant of a 4x4 matrix?</h4>
                <p>
                  Use cofactor expansion along a row or column, which reduces it to four 3x3 determinants. Alternatively, use row reduction to get an upper triangular matrix, then multiply the diagonal elements. For large matrices, computational tools are recommended.
                </p>
              </div>
              <div>
                <h4 className="font-medium text-foreground mb-2">What is the relationship between determinants and eigenvalues?</h4>
                <p>
                  The determinant equals the product of all eigenvalues. This is useful for checking eigenvalue calculations. If you know the eigenvalues, you can find the determinant by multiplying them together.
                </p>
              </div>
              <div>
                <h4 className="font-medium text-foreground mb-2">Why are determinants only defined for square matrices?</h4>
                <p>
                  Determinants represent scaling factors for linear transformations. Only square matrices represent transformations from a space to itself (like R^n to R^n). Non-square matrices change the dimension, so there's no single scaling factor.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4">
              Related Tools
            </h3>
            <div className="space-y-2 text-sm">
              <a
                href="/calculators/matrix-multiplication-calculator"
                className="block p-3 bg-muted/50 rounded-lg hover:bg-muted transition-colors"
              >
                <span className="font-medium text-foreground">Matrix Multiplication Calculator</span>
                <p className="text-muted-foreground">Multiply matrices and see step-by-step results</p>
              </a>
              <a
                href="/calculators/matrix-inverse-calculator"
                className="block p-3 bg-muted/50 rounded-lg hover:bg-muted transition-colors"
              >
                <span className="font-medium text-foreground">Matrix Inverse Calculator</span>
                <p className="text-muted-foreground">Find the inverse of a square matrix</p>
              </a>
              <a
                href="/calculators/system-of-equations-calculator"
                className="block p-3 bg-muted/50 rounded-lg hover:bg-muted transition-colors"
              >
                <span className="font-medium text-foreground">System of Equations Calculator</span>
                <p className="text-muted-foreground">Solve linear systems using matrices</p>
              </a>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
