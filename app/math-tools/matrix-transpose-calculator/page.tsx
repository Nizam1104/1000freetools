"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function MatrixTransposeCalculator() {
  const [rows, setRows] = useState(2);
  const [cols, setCols] = useState(2);
  const [matrix, setMatrix] = useState<number[][]>([[0, 0], [0, 0]]);
  const [transpose, setTranspose] = useState<number[][] | null>(null);
  const [error, setError] = useState("");

  const initializeMatrix = (newRows: number, newCols: number) => {
    setRows(newRows);
    setCols(newCols);
    setMatrix(Array(newRows).fill(0).map(() => Array(newCols).fill(0)));
    setTranspose(null);
    setError("");
  };

  const updateCell = (row: number, col: number, value: string) => {
    const newMatrix = matrix.map((r, ri) =>
      r.map((c, ci) => (ri === row && ci === col ? parseFloat(value) || 0 : c))
    );
    setMatrix(newMatrix);
  };

  const calculateTranspose = () => {
    const transposed = matrix[0].map((_, colIndex) =>
      matrix.map((row) => row[colIndex])
    );
    setTranspose(transposed);
    setError("");
  };

  const reset = () => {
    setMatrix(Array(rows).fill(0).map(() => Array(cols).fill(0)));
    setTranspose(null);
    setError("");
  };

  const fillExample = () => {
    if (rows === 2 && cols === 2) {
      setMatrix([[1, 2], [3, 4]]);
    } else if (rows === 2 && cols === 3) {
      setMatrix([[1, 2, 3], [4, 5, 6]]);
    } else if (rows === 3 && cols === 2) {
      setMatrix([[1, 2], [3, 4], [5, 6]]);
    } else if (rows === 3 && cols === 3) {
      setMatrix([[1, 2, 3], [4, 5, 6], [7, 8, 9]]);
    }
    setTranspose(null);
  };

  const round = (n: number): string => {
    const rounded = Math.round(n * 10000) / 10000;
    return Number.isInteger(rounded) ? rounded.toString() : rounded.toFixed(4);
  };

  return (
    <div className="w-full max-w-5xl mx-auto space-y-8">
      <div className="mb-8">
        <h1 className="text-3xl font-semibold mb-2">Matrix Transpose Calculator – Find Transpose of Any Matrix</h1>
        <p className="text-muted-foreground">
          Find the transpose of any matrix instantly with our free online matrix transpose calculator. Swap rows and columns of any size matrix with a single click.
        </p>
      </div>

      <div className="space-y-4">
        <div className="flex items-center gap-4 flex-wrap">
          <div className="flex items-center gap-2">
            <Label>Rows:</Label>
            <Select value={rows.toString()} onValueChange={(v) => initializeMatrix(parseInt(v), cols)}>
              <SelectTrigger className="w-20">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="2">2</SelectItem>
                <SelectItem value="3">3</SelectItem>
                <SelectItem value="4">4</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-center gap-2">
            <Label>Columns:</Label>
            <Select value={cols.toString()} onValueChange={(v) => initializeMatrix(rows, parseInt(v))}>
              <SelectTrigger className="w-20">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="2">2</SelectItem>
                <SelectItem value="3">3</SelectItem>
                <SelectItem value="4">4</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button variant="outline" size="sm" onClick={fillExample}>Load Example</Button>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="font-semibold mb-3">Original Matrix A ({rows}×{cols})</h3>
            <div className="overflow-x-auto">
              <div className="inline-block">
                <div className="flex items-center">
                  <span className="text-4xl font-light mr-2">[</span>
                  <div className="grid gap-2" style={{ gridTemplateColumns: `repeat(${cols}, 1fr)` }}>
                    {matrix.map((row, ri) =>
                      row.map((cell, ci) => (
                        <Input
                          key={`${ri}-${ci}`}
                          type="number"
                          value={cell || ""}
                          onChange={(e) => updateCell(ri, ci, e.target.value)}
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

          {transpose && (
            <div>
              <h3 className="font-semibold mb-3">Transpose Aᵀ ({cols}×{rows})</h3>
              <div className="overflow-x-auto">
                <div className="inline-block">
                  <div className="flex items-center">
                    <span className="text-4xl font-light mr-2">[</span>
                    <div className="grid gap-2" style={{ gridTemplateColumns: `repeat(${rows}, 1fr)` }}>
                      {transpose.map((row, ri) =>
                        row.map((cell, ci) => (
                          <div
                            key={`${ri}-${ci}`}
                            className="w-14 h-10 flex items-center justify-center bg-muted rounded font-mono"
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
          )}
        </div>

        <div className="flex gap-2">
          <Button onClick={calculateTranspose}>Calculate Transpose</Button>
          <Button variant="outline" onClick={reset}>Reset</Button>
        </div>

        {transpose && (
          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-2">How Transpose Works</h4>
            <p className="text-sm text-muted-foreground mb-2">
              The transpose flips a matrix over its diagonal. Element at position [i,j] moves to position [j,i].
            </p>
            <code className="text-sm font-mono bg-muted px-3 py-2 rounded block">
              If A = [{rows}×{cols}], then Aᵀ = [{cols}×{rows}]<br />
              Aᵀ[i,j] = A[j,i]
            </code>
          </div>
        )}
      </div>

      <section className="border-t pt-8 space-y-4">
        <h2 className="text-2xl font-semibold">What is Matrix Transpose?</h2>
        <p className="text-muted-foreground">
          The transpose of a matrix is formed by swapping its rows with columns. If the original matrix A has dimensions m×n, its transpose Aᵀ has dimensions n×m. The element at position [i,j] in A becomes the element at position [j,i] in Aᵀ.
        </p>
        <p className="text-muted-foreground">
          Transpose is used in many areas including solving linear systems, computing dot products, and in machine learning for data transformations.
        </p>
      </section>

      <section className="border-t pt-8">
        <h2 className="text-2xl font-semibold mb-6">Transpose Examples</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="p-4 border rounded-lg">
            <h3 className="font-semibold mb-2">2×2 Matrix</h3>
            <code className="text-sm font-mono bg-muted px-3 py-2 rounded block">
              A = [[1, 2], [3, 4]]<br />
              Aᵀ = [[1, 3], [2, 4]]
            </code>
          </div>
          <div className="p-4 border rounded-lg">
            <h3 className="font-semibold mb-2">2×3 Matrix</h3>
            <code className="text-xs font-mono bg-muted px-3 py-2 rounded block">
              A = [[1, 2, 3], [4, 5, 6]]<br />
              Aᵀ = [[1, 4], [2, 5], [3, 6]]
            </code>
          </div>
        </div>
      </section>

      <section className="border-t pt-8">
        <h2 className="text-2xl font-semibold mb-6">Properties of Transpose</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="p-4 bg-muted rounded-lg">
            <h3 className="font-semibold mb-2">Key Properties</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• (Aᵀ)ᵀ = A</li>
              <li>• (A + B)ᵀ = Aᵀ + Bᵀ</li>
              <li>• (kA)ᵀ = kAᵀ</li>
              <li>• (AB)ᵀ = BᵀAᵀ</li>
            </ul>
          </div>
          <div className="p-4 bg-muted rounded-lg">
            <h3 className="font-semibold mb-2">Special Matrices</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• Symmetric: Aᵀ = A</li>
              <li>• Skew-symmetric: Aᵀ = -A</li>
              <li>• Orthogonal: Aᵀ = A⁻¹</li>
              <li>• det(Aᵀ) = det(A)</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="border-t pt-8">
        <h2 className="text-2xl font-semibold mb-6">Frequently Asked Questions</h2>
        <div className="space-y-4">
          <div className="p-4 bg-muted rounded-lg">
            <h3 className="font-semibold mb-2">What happens to a square matrix when transposed?</h3>
            <p className="text-sm text-muted-foreground">
              A square matrix stays the same size when transposed. If it's symmetric (equal to its transpose), the values stay the same. Otherwise, off-diagonal elements swap positions.
            </p>
          </div>
          <div className="p-4 bg-muted rounded-lg">
            <h3 className="font-semibold mb-2">Can you transpose a non-square matrix?</h3>
            <p className="text-sm text-muted-foreground">
              Yes! Any matrix can be transposed. A 2×3 matrix becomes a 3×2 matrix, a 4×2 becomes 2×4, and so on.
            </p>
          </div>
          <div className="p-4 bg-muted rounded-lg">
            <h3 className="font-semibold mb-2">What is a symmetric matrix?</h3>
            <p className="text-sm text-muted-foreground">
              A symmetric matrix equals its transpose (A = Aᵀ). This means the matrix is symmetric across its main diagonal. Distance matrices and correlation matrices are often symmetric.
            </p>
          </div>
          <div className="p-4 bg-muted rounded-lg">
            <h3 className="font-semibold mb-2">Why is transpose useful?</h3>
            <p className="text-sm text-muted-foreground">
              Transpose is used for computing dot products, converting row vectors to column vectors, in least squares regression, and in many machine learning algorithms for efficient computation.
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
          <a href="/math-tools/matrix-inverse-calculator" className="p-4 rounded-lg border hover:bg-muted transition-colors">
            <p className="font-semibold text-sm">Matrix Inverse</p>
            <p className="text-xs text-muted-foreground">Find A⁻¹</p>
          </a>
          <a href="/math-tools/matrix-multiplication-calculator" className="p-4 rounded-lg border hover:bg-muted transition-colors">
            <p className="font-semibold text-sm">Matrix Multiplication</p>
            <p className="text-xs text-muted-foreground">Multiply matrices</p>
          </a>
        </div>
      </section>
    </div>
  );
}
