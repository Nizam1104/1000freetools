"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function MatrixMultiplicationCalculator() {
  const [matrixA, setMatrixA] = useState<string>("1,2\n3,4");
  const [matrixB, setMatrixB] = useState<string>("5,6\n7,8");
  const [result, setResult] = useState<string>("");
  const [error, setError] = useState<string>("");

  const parseMatrix = (input: string): number[][] => {
    return input.trim().split("\n").map((row) =>
      row.split(",").map((cell) => parseFloat(cell.trim())).filter((n) => !isNaN(n))
    );
  };

  const calculate = () => {
    try {
      const A = parseMatrix(matrixA);
      const B = parseMatrix(matrixB);
      
      if (A[0].length !== B.length) {
        setError("Columns of A must equal rows of B");
        return;
      }
      
      const rows = A.length;
      const cols = B[0].length;
      const inner = B.length;
      const product: number[][] = [];
      
      for (let i = 0; i < rows; i++) {
        product[i] = [];
        for (let j = 0; j < cols; j++) {
          let sum = 0;
          for (let k = 0; k < inner; k++) {
            sum += A[i][k] * B[k][j];
          }
          product[i][j] = sum;
        }
      }
      
      setResult(product.map((row) => row.join(", ")).join("\n"));
      setError("");
    } catch {
      setError("Invalid matrix format");
    }
  };

  const reset = () => {
    setMatrixA("1,2\n3,4");
    setMatrixB("5,6\n7,8");
    setResult("");
    setError("");
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <Card>
        
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm text-muted-foreground mb-2 block">Matrix A</label>
                <textarea
                  className="w-full min-h-[100px] p-2 border rounded-md font-mono text-sm bg-background"
                  value={matrixA}
                  onChange={(e) => setMatrixA(e.target.value)}
                  placeholder="1,2&#10;3,4"
                />
              </div>
              <div>
                <label className="text-sm text-muted-foreground mb-2 block">Matrix B</label>
                <textarea
                  className="w-full min-h-[100px] p-2 border rounded-md font-mono text-sm bg-background"
                  value={matrixB}
                  onChange={(e) => setMatrixB(e.target.value)}
                  placeholder="5,6&#10;7,8"
                />
              </div>
            </div>
            {error && <p className="text-destructive text-sm">{error}</p>}
            <div className="flex gap-2">
              <Button onClick={calculate}>Multiply</Button>
              <Button variant="outline" onClick={reset}>Reset</Button>
            </div>
            {result && (
              <div className="p-4 bg-muted rounded-md">
                <p className="text-sm text-muted-foreground mb-2">Result (A × B)</p>
                <pre className="font-mono text-lg">{result}</pre>
              </div>
            )}
          </div>

          <div className="mt-6 space-y-4">
            <div>
              <h4 className="font-semibold text-sm mb-2">How Matrix Multiplication Works</h4>
              <p className="text-xs text-muted-foreground">
                Multiply rows of A by columns of B. Element (i,j) = sum of A[i,k] × B[k,j] for all k.
              </p>
            </div>
            <div className="p-3 bg-muted/50 rounded text-xs font-mono space-y-1">
              <div>For 2×2 matrices:</div>
              <div>[a b]   [e f]   [ae+bg  af+bh]</div>
              <div>[c d] × [g h] = [ce+dg  cf+dh]</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="mt-6">
        <CardHeader>
          <CardTitle>How to Use This Matrix Multiplication Calculator</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3 text-sm text-muted-foreground">
            <div className="flex gap-3">
              <div className="flex-shrink-0 w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center text-primary font-semibold text-xs">1</div>
              <div>
                <p className="font-medium text-foreground">Enter Matrix A</p>
                <p>Input numbers separated by commas for each row. Use newlines to separate rows.</p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="flex-shrink-0 w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center text-primary font-semibold text-xs">2</div>
              <div>
                <p className="font-medium text-foreground">Enter Matrix B</p>
                <p>The number of columns in A must equal the number of rows in B.</p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="flex-shrink-0 w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center text-primary font-semibold text-xs">3</div>
              <div>
                <p className="font-medium text-foreground">Click Multiply</p>
                <p>The calculator computes the matrix product using the dot product formula.</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Matrix Multiplication Properties</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-2 px-2 font-semibold">Property</th>
                  <th className="text-left py-2 px-2 font-semibold">Description</th>
                </tr>
              </thead>
              <tbody className="text-muted-foreground">
                <tr className="border-b">
                  <td className="py-2 px-2">Dimension Rule</td>
                  <td className="py-2 px-2">(m×n) × (n×p) = (m×p)</td>
                </tr>
                <tr className="border-b">
                  <td className="py-2 px-2">Commutative</td>
                  <td className="py-2 px-2">No: AB ≠ BA (generally)</td>
                </tr>
                <tr className="border-b">
                  <td className="py-2 px-2">Associative</td>
                  <td className="py-2 px-2">Yes: (AB)C = A(BC)</td>
                </tr>
                <tr className="border-b">
                  <td className="py-2 px-2">Distributive</td>
                  <td className="py-2 px-2">Yes: A(B+C) = AB + AC</td>
                </tr>
                <tr>
                  <td className="py-2 px-2">Identity</td>
                  <td className="py-2 px-2">AI = IA = A (I = identity matrix)</td>
                </tr>
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Common Applications</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3 text-sm text-muted-foreground">
            <div className="p-3 bg-muted/50 rounded">
              <p className="font-medium text-foreground">Computer Graphics</p>
              <p className="text-xs">Transformation matrices rotate, scale, and translate 3D objects. Multiple transformations combine through matrix multiplication.</p>
            </div>
            <div className="p-3 bg-muted/50 rounded">
              <p className="font-medium text-foreground">Machine Learning</p>
              <p className="text-xs">Neural networks multiply input vectors by weight matrices. Deep learning frameworks optimize these operations.</p>
            </div>
            <div className="p-3 bg-muted/50 rounded">
              <p className="font-medium text-foreground">Physics Simulations</p>
              <p className="text-xs">Quantum mechanics uses matrix operations to describe state transformations and observables.</p>
            </div>
            <div className="p-3 bg-muted/50 rounded">
              <p className="font-medium text-foreground">Economics</p>
              <p className="text-xs">Input-output models use matrix multiplication to analyze inter-industry relationships.</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Frequently Asked Questions</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h4 className="font-medium text-sm mb-2">Why must columns of A equal rows of B?</h4>
            <p className="text-xs text-muted-foreground">
              Each element in the result is a dot product of a row from A and a column from B. Dot products require vectors of equal length. If A has n columns, B must have n rows.
            </p>
          </div>
          <div>
            <h4 className="font-medium text-sm mb-2">Is matrix multiplication commutative?</h4>
            <p className="text-xs text-muted-foreground">
              Generally no. AB ≠ BA for most matrices. Even when both products are defined, they usually give different results. Exception: multiplying by identity or scalar matrices.
            </p>
          </div>
          <div>
            <h4 className="font-medium text-sm mb-2">What is the identity matrix?</h4>
            <p className="text-xs text-muted-foreground">
              An identity matrix has 1s on the diagonal and 0s elsewhere. Multiplying any matrix by the identity gives the original matrix unchanged. It's the matrix equivalent of multiplying by 1.
            </p>
          </div>
          <div>
            <h4 className="font-medium text-sm mb-2">Can I multiply a matrix by itself?</h4>
            <p className="text-xs text-muted-foreground">
              Yes, if the matrix is square (same rows and columns). A² = A × A is common in Markov chains and computing matrix powers for transformations.
            </p>
          </div>
          <div>
            <h4 className="font-medium text-sm mb-2">What's the difference between multiplication and the dot product?</h4>
            <p className="text-xs text-muted-foreground">
              Matrix multiplication uses dot products internally. Each element of the result is the dot product of one row from the first matrix with one column from the second.
            </p>
          </div>
        </CardContent>
      </Card>

      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Related Tools</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid sm:grid-cols-3 gap-3">
            <a href="/calculators/matrix-addition-calculator" className="p-3 rounded-lg border hover:bg-muted transition-colors">
              <p className="font-semibold text-sm">Matrix Addition</p>
              <p className="text-xs text-muted-foreground">Add two matrices</p>
            </a>
            <a href="/calculators/matrix-determinant-calculator" className="p-3 rounded-lg border hover:bg-muted transition-colors">
              <p className="font-semibold text-sm">Matrix Determinant</p>
              <p className="text-xs text-muted-foreground">Calculate determinant</p>
            </a>
            <a href="/calculators/matrix-transpose-calculator" className="p-3 rounded-lg border hover:bg-muted transition-colors">
              <p className="font-semibold text-sm">Matrix Transpose</p>
              <p className="text-xs text-muted-foreground">Flip rows and columns</p>
            </a>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
