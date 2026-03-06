"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function MatrixMultiplicationCalculator() {
  const [rowsA, setRowsA] = useState(2);
  const [colsA, setColsA] = useState(2);
  const [rowsB, setRowsB] = useState(2);
  const [colsB, setColsB] = useState(2);
  const [matrixA, setMatrixA] = useState<number[][]>([[0, 0], [0, 0]]);
  const [matrixB, setMatrixB] = useState<number[][]>([[0, 0], [0, 0]]);
  const [result, setResult] = useState<number[][] | null>(null);
  const [showSteps, setShowSteps] = useState(false);
  const [error, setError] = useState("");

  const initializeMatrixA = (newRows: number, newCols: number) => {
    setRowsA(newRows);
    setColsA(newCols);
    setMatrixA(Array(newRows).fill(0).map(() => Array(newCols).fill(0)));
    setResult(null);
    setError("");
    
    if (newCols !== rowsB) {
      setRowsB(newCols);
      setMatrixB(Array(newCols).fill(0).map(() => Array(colsB).fill(0)));
    }
  };

  const initializeMatrixB = (newRows: number, newCols: number) => {
    setRowsB(newRows);
    setColsB(newCols);
    setMatrixB(Array(newRows).fill(0).map(() => Array(newCols).fill(0)));
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
    if (colsA !== rowsB) {
      setError(`Cannot multiply: columns of A (${colsA}) must equal rows of B (${rowsB})`);
      setResult(null);
      return;
    }

    const resultMatrix = Array(rowsA).fill(0).map(() => Array(colsB).fill(0));

    for (let i = 0; i < rowsA; i++) {
      for (let j = 0; j < colsB; j++) {
        let sum = 0;
        for (let k = 0; k < colsA; k++) {
          sum += matrixA[i][k] * matrixB[k][j];
        }
        resultMatrix[i][j] = sum;
      }
    }

    setResult(resultMatrix);
    setError("");
  };

  const reset = () => {
    setMatrixA(Array(rowsA).fill(0).map(() => Array(colsA).fill(0)));
    setMatrixB(Array(rowsB).fill(0).map(() => Array(colsB).fill(0)));
    setResult(null);
    setError("");
    setShowSteps(false);
  };

  const loadExample = () => {
    setRowsA(2);
    setColsA(3);
    setRowsB(3);
    setColsB(2);
    setMatrixA([[1, 2, 3], [4, 5, 6]]);
    setMatrixB([[7, 8], [9, 10], [11, 12]]);
    setResult(null);
    setError("");
  };

  const round = (n: number): string => {
    const rounded = Math.round(n * 10000) / 10000;
    return Number.isInteger(rounded) ? rounded.toString() : rounded.toFixed(4);
  };

  const getElementCalculation = (row: number, col: number): string => {
    const terms = [];
    for (let k = 0; k < colsA; k++) {
      terms.push(`${matrixA[row][k]}×${matrixB[k][col]}`);
    }
    const products = [];
    for (let k = 0; k < colsA; k++) {
      products.push(matrixA[row][k] * matrixB[k][col]);
    }
    return `${terms.join(" + ")} = ${products.join(" + ")} = ${result![row][col]}`;
  };

  return (
    <div className="w-full max-w-6xl mx-auto space-y-8">
      <div className="mb-8">
        <h1 className="text-3xl font-semibold mb-2">Matrix Multiplication Calculator – Multiply Matrices Online</h1>
        <p className="text-muted-foreground">
          Multiply any two compatible matrices with our free online matrix multiplication calculator. See the full product matrix with step-by-step row-by-column computation.
        </p>
      </div>

      <div className="space-y-4">
        <div className="flex items-center gap-4 flex-wrap">
          <div className="flex items-center gap-2">
            <Label>Matrix A:</Label>
            <Select value={`${rowsA}x${colsA}`} onValueChange={(v) => {
              const [r, c] = v.split("x").map(Number);
              initializeMatrixA(r, c);
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
            <Label>Matrix B:</Label>
            <Select value={`${rowsB}x${colsB}`} onValueChange={(v) => {
              const [r, c] = v.split("x").map(Number);
              if (r !== colsA) {
                setError(`Note: For multiplication, rows of B must equal columns of A (${colsA})`);
              }
              initializeMatrixB(r, c);
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
          <Button variant="outline" size="sm" onClick={loadExample}>Load Example</Button>
        </div>

        {colsA !== rowsB && (
          <div className="p-4 bg-destructive/10 text-destructive rounded-md">
            <p className="text-sm">
              Cannot multiply: Matrix A has {colsA} columns but Matrix B has {rowsB} rows. 
              For matrix multiplication, columns of A must equal rows of B.
            </p>
          </div>
        )}

        <div className="grid xl:grid-cols-2 gap-8">
          <div>
            <h3 className="font-semibold mb-3">Matrix A ({rowsA}×{colsA})</h3>
            <div className="overflow-x-auto">
              <div className="inline-block">
                <div className="flex items-center">
                  <span className="text-4xl font-light mr-2">[</span>
                  <div className="grid gap-2" style={{ gridTemplateColumns: `repeat(${colsA}, 1fr)` }}>
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
            <h3 className="font-semibold mb-3">Matrix B ({rowsB}×{colsB})</h3>
            <div className="overflow-x-auto">
              <div className="inline-block">
                <div className="flex items-center">
                  <span className="text-4xl font-light mr-2">[</span>
                  <div className="grid gap-2" style={{ gridTemplateColumns: `repeat(${colsB}, 1fr)` }}>
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
          <Button onClick={calculate} disabled={colsA !== rowsB}>Multiply Matrices</Button>
          <Button variant="outline" onClick={reset}>Reset</Button>
        </div>

        {error && colsA === rowsB && (
          <div className="p-4 bg-destructive/10 text-destructive rounded-md">
            <p className="text-sm">{error}</p>
          </div>
        )}

        {result && (
          <div className="space-y-4">
            <div className="p-6 bg-muted rounded-lg">
              <p className="text-sm text-muted-foreground mb-4 text-center">
                Result: A × B = {rowsA}×{colsB} Matrix
              </p>
              <div className="overflow-x-auto">
                <div className="inline-block">
                  <div className="flex items-center">
                    <span className="text-4xl font-light mr-2">[</span>
                    <div className="grid gap-2" style={{ gridTemplateColumns: `repeat(${colsB}, 1fr)` }}>
                      {result.map((row, ri) =>
                        row.map((cell, ci) => (
                          <div
                            key={`${ri}-${ci}`}
                            className="w-16 h-12 flex items-center justify-center bg-primary text-primary-foreground font-mono rounded"
                          >
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

            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" onClick={() => setShowSteps(!showSteps)}>
                {showSteps ? "Hide Steps" : "Show Step-by-Step"}
              </Button>
            </div>

            {showSteps && (
              <div className="p-4 border rounded-lg">
                <h4 className="font-semibold text-sm mb-3">Step-by-Step Calculation</h4>
                <p className="text-sm text-muted-foreground mb-4">
                  Each element C[i,j] is the dot product of row i from A and column j from B.
                </p>
                <div className="space-y-3 font-mono text-xs bg-muted p-3 rounded overflow-x-auto">
                  {result.map((row, ri) =>
                    row.map((_, ci) => (
                      <div key={`${ri}-${ci}`}>
                        <strong>C[{ri},{ci}]</strong> = {getElementCalculation(ri, ci)}
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      <section className="border-t pt-8 space-y-4">
        <h2 className="text-2xl font-semibold">Matrix Multiplication</h2>
        <p className="text-muted-foreground">
          Matrix multiplication is performed by taking the dot product of rows from the first matrix with columns from the second matrix. For matrices A (m×n) and B (n×p), the result is a matrix C (m×p).
        </p>
        <p className="text-muted-foreground">
          Unlike regular multiplication, matrix multiplication is not commutative: A × B ≠ B × A in general.
        </p>
      </section>

      <section className="border-t pt-8">
        <h2 className="text-2xl font-semibold mb-6">Multiplication Rule</h2>
        <div className="p-4 border rounded-lg">
          <code className="text-sm font-mono bg-muted px-3 py-2 rounded block whitespace-pre">
{`For C = A × B:
C[i,j] = Σ(k=0 to n-1) A[i,k] × B[k,j]

Example (2×3) × (3×2) = (2×2):
A = [[1, 2, 3],    B = [[7, 8],
     [4, 5, 6]]         [9, 10],
                        [11, 12]]

C[0,0] = 1×7 + 2×9 + 3×11 = 7 + 18 + 33 = 58
C[0,1] = 1×8 + 2×10 + 3×12 = 8 + 20 + 36 = 64
C[1,0] = 4×7 + 5×9 + 6×11 = 28 + 45 + 66 = 139
C[1,1] = 4×8 + 5×10 + 6×12 = 32 + 50 + 72 = 154

Result: [[58, 64], [139, 154]]`}
          </code>
        </div>
      </section>

      <section className="border-t pt-8">
        <h2 className="text-2xl font-semibold mb-6">Properties</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="p-4 bg-muted rounded-lg">
            <h3 className="font-semibold mb-2">Key Properties</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• Associative: (AB)C = A(BC)</li>
              <li>• Distributive: A(B+C) = AB + AC</li>
              <li>• Identity: AI = IA = A</li>
              <li>• (AB)ᵀ = BᵀAᵀ</li>
            </ul>
          </div>
          <div className="p-4 bg-muted rounded-lg">
            <h3 className="font-semibold mb-2">Important Notes</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• Not commutative: AB ≠ BA</li>
              <li>• Columns of A = Rows of B</li>
              <li>• Result: rows of A × cols of B</li>
              <li>• Can multiply by scalar</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="border-t pt-8">
        <h2 className="text-2xl font-semibold mb-6">Frequently Asked Questions</h2>
        <div className="space-y-4">
          <div className="p-4 bg-muted rounded-lg">
            <h3 className="font-semibold mb-2">Why must columns of A equal rows of B?</h3>
            <p className="text-sm text-muted-foreground">
              Each element in the result is a dot product of a row from A and a column from B. For a dot product, both vectors must have the same length.
            </p>
          </div>
          <div className="p-4 bg-muted rounded-lg">
            <h3 className="font-semibold mb-2">Is matrix multiplication commutative?</h3>
            <p className="text-sm text-muted-foreground">
              No, generally AB ≠ BA. In fact, even if AB is defined, BA might not be (if dimensions don't match), or if both are defined, they usually give different results.
            </p>
          </div>
          <div className="p-4 bg-muted rounded-lg">
            <h3 className="font-semibold mb-2">What is the identity matrix?</h3>
            <p className="text-sm text-muted-foreground">
              The identity matrix I has 1s on the diagonal and 0s elsewhere. Multiplying any matrix by I leaves it unchanged, similar to multiplying a number by 1.
            </p>
          </div>
          <div className="p-4 bg-muted rounded-lg">
            <h3 className="font-semibold mb-2">Where is matrix multiplication used?</h3>
            <p className="text-sm text-muted-foreground">
              Matrix multiplication is fundamental in computer graphics (transformations), machine learning (neural networks), physics (quantum mechanics), economics (input-output models), and solving systems of equations.
            </p>
          </div>
        </div>
      </section>

      <section className="border-t pt-8">
        <h2 className="text-2xl font-semibold mb-6">Related Math Tools</h2>
        <div className="grid sm:grid-cols-3 gap-4">
          <a href="/math-tools/matrix-addition-subtraction-calculator" className="p-4 rounded-lg border hover:bg-muted transition-colors">
            <p className="font-semibold text-sm">Matrix Addition</p>
            <p className="text-xs text-muted-foreground">Add/Subtract</p>
          </a>
          <a href="/math-tools/matrix-transpose-calculator" className="p-4 rounded-lg border hover:bg-muted transition-colors">
            <p className="font-semibold text-sm">Matrix Transpose</p>
            <p className="text-xs text-muted-foreground">Find Aᵀ</p>
          </a>
          <a href="/math-tools/matrix-inverse-calculator" className="p-4 rounded-lg border hover:bg-muted transition-colors">
            <p className="font-semibold text-sm">Matrix Inverse</p>
            <p className="text-xs text-muted-foreground">Find A⁻¹</p>
          </a>
        </div>
      </section>
    </div>
  );
}
