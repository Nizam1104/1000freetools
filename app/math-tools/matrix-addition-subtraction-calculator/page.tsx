"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function MatrixAdditionSubtractionCalculator() {
  const [size, setSize] = useState<"2" | "3" | "4">("2");
  const [operation, setOperation] = useState<"add" | "subtract">("add");
  const [matrixA, setMatrixA] = useState<number[][]>([[0, 0], [0, 0]]);
  const [matrixB, setMatrixB] = useState<number[][]>([[0, 0], [0, 0]]);
  const [result, setResult] = useState<number[][] | null>(null);
  const [error, setError] = useState("");

  const initializeMatrices = (newSize: "2" | "3" | "4") => {
    setSize(newSize);
    const n = parseInt(newSize);
    setMatrixA(Array(n).fill(0).map(() => Array(n).fill(0)));
    setMatrixB(Array(n).fill(0).map(() => Array(n).fill(0)));
    setResult(null);
    setError("");
  };

  const updateMatrixA = (row: number, col: number, value: string) => {
    const newMatrix = matrixA.map((r, ri) =>
      r.map((c, ci) => (ri === row && ci === col ? parseFloat(value) || 0 : c))
    );
    setMatrixA(newMatrix);
  };

  const updateMatrixB = (row: number, col: number, value: string) => {
    const newMatrix = matrixB.map((r, ri) =>
      r.map((c, ci) => (ri === row && ci === col ? parseFloat(value) || 0 : c))
    );
    setMatrixB(newMatrix);
  };

  const calculate = () => {
    const n = parseInt(size);
    const resultMatrix = Array(n).fill(0).map(() => Array(n).fill(0));

    for (let i = 0; i < n; i++) {
      for (let j = 0; j < n; j++) {
        if (operation === "add") {
          resultMatrix[i][j] = matrixA[i][j] + matrixB[i][j];
        } else {
          resultMatrix[i][j] = matrixA[i][j] - matrixB[i][j];
        }
      }
    }

    setResult(resultMatrix);
    setError("");
  };

  const reset = () => {
    const n = parseInt(size);
    setMatrixA(Array(n).fill(0).map(() => Array(n).fill(0)));
    setMatrixB(Array(n).fill(0).map(() => Array(n).fill(0)));
    setResult(null);
    setError("");
  };

  const loadExample = () => {
    if (size === "2") {
      setMatrixA([[1, 2], [3, 4]]);
      setMatrixB([[5, 6], [7, 8]]);
    } else if (size === "3") {
      setMatrixA([[1, 2, 3], [4, 5, 6], [7, 8, 9]]);
      setMatrixB([[9, 8, 7], [6, 5, 4], [3, 2, 1]]);
    } else {
      setMatrixA([[1, 2, 3, 4], [5, 6, 7, 8], [9, 10, 11, 12], [13, 14, 15, 16]]);
      setMatrixB([[16, 15, 14, 13], [12, 11, 10, 9], [8, 7, 6, 5], [4, 3, 2, 1]]);
    }
    setResult(null);
  };

  const round = (n: number): string => {
    const rounded = Math.round(n * 10000) / 10000;
    return Number.isInteger(rounded) ? rounded.toString() : rounded.toFixed(4);
  };

  const MatrixDisplay = ({ matrix, label, highlight = false }: { matrix: number[][]; label: string; highlight?: boolean }) => (
    <div className="overflow-x-auto">
      <div className="inline-block">
        <div className="flex items-center">
          <span className="text-4xl font-light mr-2">[</span>
          <div className="grid gap-2" style={{ gridTemplateColumns: `repeat(${size}, 1fr)` }}>
            {matrix.map((row, ri) =>
              row.map((cell, ci) => (
                <div
                  key={`${ri}-${ci}`}
                  className={`w-14 h-10 flex items-center justify-center font-mono rounded ${
                    highlight ? "bg-primary text-primary-foreground" : "bg-muted"
                  }`}
                >
                  {round(cell)}
                </div>
              ))
            )}
          </div>
          <span className="text-4xl font-light ml-2">]</span>
        </div>
        <p className="text-center text-sm text-muted-foreground mt-2">{label}</p>
      </div>
    </div>
  );

  return (
    <div className="w-full max-w-5xl mx-auto space-y-8">
      <div className="mb-8">
        <h1 className="text-3xl font-semibold mb-2">Matrix Addition & Subtraction Calculator – Compute Matrices Online</h1>
        <p className="text-muted-foreground">
          Add or subtract any two matrices with our free online matrix calculator. Supports all matrix sizes with instant results and element-wise computation displayed clearly.
        </p>
      </div>

      <div className="space-y-4">
        <div className="flex items-center gap-4 flex-wrap">
          <div className="flex items-center gap-2">
            <Label>Matrix Size:</Label>
            <Select value={size} onValueChange={(v) => initializeMatrices(v as "2" | "3" | "4")}>
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="2">2 × 2</SelectItem>
                <SelectItem value="3">3 × 3</SelectItem>
                <SelectItem value="4">4 × 4</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button variant="outline" size="sm" onClick={loadExample}>Load Example</Button>
        </div>

        <Tabs value={operation} onValueChange={(v) => setOperation(v as "add" | "subtract")}>
          <TabsList>
            <TabsTrigger value="add">Addition (A + B)</TabsTrigger>
            <TabsTrigger value="subtract">Subtraction (A - B)</TabsTrigger>
          </TabsList>
        </Tabs>

        <div className="grid lg:grid-cols-2 gap-8">
          <div>
            <h3 className="font-semibold mb-3">Matrix A</h3>
            <div className="overflow-x-auto">
              <div className="inline-block">
                <div className="flex items-center">
                  <span className="text-4xl font-light mr-2">[</span>
                  <div className="grid gap-2" style={{ gridTemplateColumns: `repeat(${size}, 1fr)` }}>
                    {matrixA.map((row, ri) =>
                      row.map((cell, ci) => (
                        <Input
                          key={`a-${ri}-${ci}`}
                          type="number"
                          value={cell || ""}
                          onChange={(e) => updateMatrixA(ri, ci, e.target.value)}
                          className="w-14 h-10 text-center"
                        />
                      ))
                    )}
                  </div>
                  <span className="text-4xl font-light ml-2">]</span>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-3">Matrix B</h3>
            <div className="overflow-x-auto">
              <div className="inline-block">
                <div className="flex items-center">
                  <span className="text-4xl font-light mr-2">[</span>
                  <div className="grid gap-2" style={{ gridTemplateColumns: `repeat(${size}, 1fr)` }}>
                    {matrixB.map((row, ri) =>
                      row.map((cell, ci) => (
                        <Input
                          key={`b-${ri}-${ci}`}
                          type="number"
                          value={cell || ""}
                          onChange={(e) => updateMatrixB(ri, ci, e.target.value)}
                          className="w-14 h-10 text-center"
                        />
                      ))
                    )}
                  </div>
                  <span className="text-4xl font-light ml-2">]</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex gap-2">
          <Button onClick={calculate}>
            {operation === "add" ? "Add Matrices" : "Subtract Matrices"}
          </Button>
          <Button variant="outline" onClick={reset}>Reset</Button>
        </div>

        {result && (
          <div className="space-y-4">
            <div className="p-6 bg-muted rounded-lg">
              <p className="text-sm text-muted-foreground mb-4 text-center">
                Result: {operation === "add" ? "A + B" : "A - B"}
              </p>
              <MatrixDisplay matrix={result} label="" highlight />
            </div>

            <div className="p-4 border rounded-lg">
              <h4 className="font-semibold text-sm mb-2">Element-wise Calculation</h4>
              <p className="text-sm text-muted-foreground mb-2">
                {operation === "add"
                  ? "Each element in the result is the sum of corresponding elements from A and B."
                  : "Each element in the result is the difference of corresponding elements from A and B."}
              </p>
              <code className="text-sm font-mono bg-muted px-3 py-2 rounded block">
                {operation === "add"
                  ? `C[i,j] = A[i,j] + B[i,j]`
                  : `C[i,j] = A[i,j] - B[i,j]`}
              </code>
            </div>
          </div>
        )}
      </div>

      <section className="border-t pt-8 space-y-4">
        <h2 className="text-2xl font-semibold">Matrix Addition and Subtraction</h2>
        <p className="text-muted-foreground">
          Matrix addition and subtraction are performed element-by-element. Both matrices must have the same dimensions. The result is a matrix of the same size where each element is the sum or difference of the corresponding elements.
        </p>
        <p className="text-muted-foreground">
          These operations are fundamental in linear algebra and are used extensively in computer graphics, machine learning, and scientific computing.
        </p>
      </section>

      <section className="border-t pt-8">
        <h2 className="text-2xl font-semibold mb-6">Properties</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="p-4 bg-muted rounded-lg">
            <h3 className="font-semibold mb-2">Addition Properties</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• Commutative: A + B = B + A</li>
              <li>• Associative: (A + B) + C = A + (B + C)</li>
              <li>• Identity: A + 0 = A</li>
              <li>• Inverse: A + (-A) = 0</li>
            </ul>
          </div>
          <div className="p-4 bg-muted rounded-lg">
            <h3 className="font-semibold mb-2">Requirements</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• Same dimensions required</li>
              <li>• Element-wise operation</li>
              <li>• Result has same size</li>
              <li>• Works with any numbers</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="border-t pt-8">
        <h2 className="text-2xl font-semibold mb-6">Example Calculation</h2>
        <div className="p-4 border rounded-lg">
          <code className="text-sm font-mono bg-muted px-3 py-2 rounded block whitespace-pre">
{`Addition:
[[1, 2],    [[5, 6],    [[1+5, 2+6],    [[6, 8],
 [3, 4]]  +  [7, 8]]  =  [3+7, 4+8]]  =  [10, 12]]

Subtraction:
[[5, 6],    [[1, 2],    [[5-1, 6-2],    [[4, 4],
 [7, 8]]  -  [3, 4]]  =  [7-3, 8-4]]  =  [4, 4]]`}
          </code>
        </div>
      </section>

      <section className="border-t pt-8">
        <h2 className="text-2xl font-semibold mb-6">Frequently Asked Questions</h2>
        <div className="space-y-4">
          <div className="p-4 bg-muted rounded-lg">
            <h3 className="font-semibold mb-2">Can I add matrices of different sizes?</h3>
            <p className="text-sm text-muted-foreground">
              No, matrices must have the same dimensions (same number of rows and columns) to be added or subtracted.
            </p>
          </div>
          <div className="p-4 bg-muted rounded-lg">
            <h3 className="font-semibold mb-2">Is matrix addition commutative?</h3>
            <p className="text-sm text-muted-foreground">
              Yes, A + B = B + A for any matrices of the same size. However, subtraction is not commutative: A - B ≠ B - A.
            </p>
          </div>
          <div className="p-4 bg-muted rounded-lg">
            <h3 className="font-semibold mb-2">What is the zero matrix?</h3>
            <p className="text-sm text-muted-foreground">
              The zero matrix has all elements equal to 0. Adding it to any matrix leaves the matrix unchanged, similar to adding 0 to a number.
            </p>
          </div>
          <div className="p-4 bg-muted rounded-lg">
            <h3 className="font-semibold mb-2">Where are these operations used?</h3>
            <p className="text-sm text-muted-foreground">
              Matrix addition and subtraction are used in image processing, computer graphics transformations, machine learning algorithms, physics simulations, and solving systems of equations.
            </p>
          </div>
        </div>
      </section>

      <section className="border-t pt-8">
        <h2 className="text-2xl font-semibold mb-6">Related Math Tools</h2>
        <div className="grid sm:grid-cols-3 gap-4">
          <a href="/math-tools/matrix-multiplication-calculator" className="p-4 rounded-lg border hover:bg-muted transition-colors">
            <p className="font-semibold text-sm">Matrix Multiplication</p>
            <p className="text-xs text-muted-foreground">Multiply A × B</p>
          </a>
          <a href="/math-tools/matrix-transpose-calculator" className="p-4 rounded-lg border hover:bg-muted transition-colors">
            <p className="font-semibold text-sm">Matrix Transpose</p>
            <p className="text-xs text-muted-foreground">Find Aᵀ</p>
          </a>
          <a href="/math-tools/matrix-determinant-calculator" className="p-4 rounded-lg border hover:bg-muted transition-colors">
            <p className="font-semibold text-sm">Matrix Determinant</p>
            <p className="text-xs text-muted-foreground">Calculate det(A)</p>
          </a>
        </div>
      </section>
    </div>
  );
}
