"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function MatrixAdditionCalculator() {
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
      
      if (A.length !== B.length || A[0].length !== B[0].length) {
        setError("Matrices must have the same dimensions");
        return;
      }
      
      const rows = A.length;
      const cols = A[0].length;
      const sum: number[][] = [];
      
      for (let i = 0; i < rows; i++) {
        sum[i] = [];
        for (let j = 0; j < cols; j++) {
          sum[i][j] = A[i][j] + B[i][j];
        }
      }
      
      setResult(sum.map((row) => row.join(", ")).join("\n"));
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
        <CardHeader>
          <CardTitle>Matrix Addition Calculator</CardTitle>
          <CardDescription>Add two matrices of the same dimensions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm text-muted-foreground mb-2 block">Matrix A (rows separated by newlines)</label>
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
              <Button onClick={calculate}>Add</Button>
              <Button variant="outline" onClick={reset}>Reset</Button>
            </div>
            {result && (
              <div className="p-4 bg-muted rounded-md">
                <p className="text-sm text-muted-foreground mb-2">Result (A + B)</p>
                <pre className="font-mono text-lg">{result}</pre>
              </div>
            )}
          </div>

          <div className="mt-6 space-y-4">
            <div>
              <h4 className="font-semibold text-sm mb-2">How Matrix Addition Works</h4>
              <p className="text-xs text-muted-foreground">
                Add corresponding elements from each matrix. Element at position (i,j) in matrix A is added to element at position (i,j) in matrix B.
              </p>
            </div>
            <div className="p-3 bg-muted/50 rounded text-xs font-mono">
              <div>[a₁₁  a₁₂]   [b₁₁  b₁₂]   [a₁₁+b₁₁  a₁₂+b₁₂]</div>
              <div>[a₂₁  a₂₂] + [b₂₁  b₂₂] = [a₂₁+b₂₁  a₂₂+b₂₂]</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="mt-6">
        <CardHeader>
          <CardTitle>How to Use This Matrix Addition Calculator</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3 text-sm text-muted-foreground">
            <div className="flex gap-3">
              <div className="flex-shrink-0 w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center text-primary font-semibold text-xs">1</div>
              <div>
                <p className="font-medium text-foreground">Enter Matrix A</p>
                <p>Input numbers separated by commas for each row. Press Enter or use newlines to separate rows. Example: "1,2,3" for a row with three elements.</p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="flex-shrink-0 w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center text-primary font-semibold text-xs">2</div>
              <div>
                <p className="font-medium text-foreground">Enter Matrix B</p>
                <p>Use the same format. Both matrices must have identical dimensions (same number of rows and columns).</p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="flex-shrink-0 w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center text-primary font-semibold text-xs">3</div>
              <div>
                <p className="font-medium text-foreground">Click Add</p>
                <p>The calculator adds corresponding elements and displays the result matrix instantly.</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Matrix Addition Reference</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
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
                  <td className="py-2 px-2">Requirement</td>
                  <td className="py-2 px-2">Matrices must have same dimensions</td>
                </tr>
                <tr className="border-b">
                  <td className="py-2 px-2">Commutative</td>
                  <td className="py-2 px-2">Yes: A + B = B + A</td>
                </tr>
                <tr className="border-b">
                  <td className="py-2 px-2">Associative</td>
                  <td className="py-2 px-2">Yes: (A + B) + C = A + (B + C)</td>
                </tr>
                <tr className="border-b">
                  <td className="py-2 px-2">Identity Element</td>
                  <td className="py-2 px-2">Zero matrix: A + 0 = A</td>
                </tr>
                <tr>
                  <td className="py-2 px-2">Inverse</td>
                  <td className="py-2 px-2">A + (-A) = 0 (zero matrix)</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-xs text-muted-foreground">
            Matrix addition is element-wise. Each position in the result contains the sum of the corresponding positions from the input matrices.
          </p>
        </CardContent>
      </Card>

      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Common Matrix Dimensions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-3 text-sm">
            <div className="p-3 bg-muted rounded">
              <p className="font-medium">2×2 Matrix</p>
              <p className="text-xs text-muted-foreground">Square matrix, common in transformations</p>
            </div>
            <div className="p-3 bg-muted rounded">
              <p className="font-medium">3×3 Matrix</p>
              <p className="text-xs text-muted-foreground">3D graphics, rotation matrices</p>
            </div>
            <div className="p-3 bg-muted rounded">
              <p className="font-medium">m×n Matrix</p>
              <p className="text-xs text-muted-foreground">General rectangular matrix</p>
            </div>
            <div className="p-3 bg-muted rounded">
              <p className="font-medium">1×n Matrix</p>
              <p className="text-xs text-muted-foreground">Row vector</p>
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
            <h4 className="font-medium text-sm mb-2">What happens if matrices have different sizes?</h4>
            <p className="text-xs text-muted-foreground">
              Matrix addition is only defined for matrices of the same dimensions. If A is 2×3 and B is 3×2, they cannot be added. The calculator will show an error message.
            </p>
          </div>
          <div>
            <h4 className="font-medium text-sm mb-2">Can I add more than two matrices?</h4>
            <p className="text-xs text-muted-foreground">
              Yes. Matrix addition is associative, so you can add multiple matrices: A + B + C = (A + B) + C. Add them two at a time or all at once if dimensions match.
            </p>
          </div>
          <div>
            <h4 className="font-medium text-sm mb-2">What is the zero matrix?</h4>
            <p className="text-xs text-muted-foreground">
              A zero matrix has all elements equal to zero. Adding a zero matrix to any matrix A gives A unchanged. It's the additive identity for matrices.
            </p>
          </div>
          <div>
            <h4 className="font-medium text-sm mb-2">Is matrix addition commutative?</h4>
            <p className="text-xs text-muted-foreground">
              Yes. A + B = B + A for any matrices of the same size. The order doesn't matter because you're just adding numbers at each position.
            </p>
          </div>
          <div>
            <h4 className="font-medium text-sm mb-2">How is matrix addition used in real applications?</h4>
            <p className="text-xs text-muted-foreground">
              Matrix addition appears in computer graphics (combining transformations), economics (adding cost matrices), physics (superposition of states), and data analysis (combining datasets).
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
            <a href="/calculators/matrix-multiplication-calculator" className="p-3 rounded-lg border hover:bg-muted transition-colors">
              <p className="font-semibold text-sm">Matrix Multiplication</p>
              <p className="text-xs text-muted-foreground">Multiply two matrices</p>
            </a>
            <a href="/calculators/matrix-determinant-calculator" className="p-3 rounded-lg border hover:bg-muted transition-colors">
              <p className="font-semibold text-sm">Matrix Determinant</p>
              <p className="text-xs text-muted-foreground">Calculate matrix determinant</p>
            </a>
            <a href="/calculators/matrix-inverse-calculator" className="p-3 rounded-lg border hover:bg-muted transition-colors">
              <p className="font-semibold text-sm">Matrix Inverse</p>
              <p className="text-xs text-muted-foreground">Find the inverse matrix</p>
            </a>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
