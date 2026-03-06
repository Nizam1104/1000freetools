"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function MatrixRankCalculator() {
  const [size, setSize] = useState<"2x2" | "2x3" | "3x2" | "3x3" | "3x4" | "4x3" | "4x4">("3x3");
  const [matrix, setMatrix] = useState<string[][]>([["1", "2", "3"], ["4", "5", "6"], ["7", "8", "9"]]);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState("");

  const getDimensions = () => {
    const [rows, cols] = size.split('x').map(Number);
    return { rows, cols };
  };

  const updateMatrix = (row: number, col: number, value: string) => {
    const newMatrix = matrix.map((r, ri) => r.map((c, ci) => (ri === row && ci === col ? value : c)));
    setMatrix(newMatrix);
    setResult(null);
  };

  const initializeMatrix = (newSize: typeof size) => {
    setSize(newSize);
    const { rows, cols } = { 
      "2x2": { rows: 2, cols: 2 }, 
      "2x3": { rows: 2, cols: 3 },
      "3x2": { rows: 3, cols: 2 },
      "3x3": { rows: 3, cols: 3 },
      "3x4": { rows: 3, cols: 4 },
      "4x3": { rows: 4, cols: 3 },
      "4x4": { rows: 4, cols: 4 }
    }[newSize];
    
    const newMatrix = Array(rows).fill(null).map((_, i) => 
      Array(cols).fill(null).map((_, j) => 
        i === j ? "1" : "0"
      )
    );
    setMatrix(newMatrix);
    setResult(null);
  };

  const calculateRank = () => {
    setError("");
    setResult(null);

    const { rows, cols } = getDimensions();
    
    // Parse matrix
    const parsedMatrix = matrix.map(row => row.map(cell => parseFloat(cell)));
    if (parsedMatrix.flat().some(isNaN)) {
      setError("Please enter all matrix values as numbers");
      return;
    }

    // Create a copy for row reduction
    const augmented = parsedMatrix.map(row => [...row]);
    
    let rank = 0;
    const steps: string[] = [];
    const rowOperations: string[] = [];

    steps.push(`Starting matrix (${rows}×${cols}):`);
    steps.push(formatMatrix(augmented));
    steps.push("");
    steps.push("Performing Gaussian elimination (row echelon form):");
    steps.push("");

    let pivotRow = 0;
    
    for (let col = 0; col < cols && pivotRow < rows; col++) {
      // Find pivot
      let maxRow = pivotRow;
      for (let row = pivotRow + 1; row < rows; row++) {
        if (Math.abs(augmented[row][col]) > Math.abs(augmented[maxRow][col])) {
          maxRow = row;
        }
      }

      if (Math.abs(augmented[maxRow][col]) < 1e-10) {
        continue; // No pivot in this column
      }

      // Swap rows if needed
      if (maxRow !== pivotRow) {
        [augmented[pivotRow], augmented[maxRow]] = [augmented[maxRow], augmented[pivotRow]];
        rowOperations.push(`Swap R${pivotRow + 1} ↔ R${maxRow + 1}`);
      }

      // Scale pivot row
      const pivot = augmented[pivotRow][col];
      if (Math.abs(pivot) > 1e-10 && Math.abs(pivot - 1) > 1e-10) {
        for (let j = col; j < cols; j++) {
          augmented[pivotRow][j] /= pivot;
        }
        rowOperations.push(`R${pivotRow + 1} = R${pivotRow + 1} / ${pivot.toFixed(4)}`);
      }

      // Eliminate below
      for (let row = pivotRow + 1; row < rows; row++) {
        const factor = augmented[row][col];
        if (Math.abs(factor) > 1e-10) {
          for (let j = col; j < cols; j++) {
            augmented[row][j] -= factor * augmented[pivotRow][j];
          }
          rowOperations.push(`R${row + 1} = R${row + 1} - ${factor.toFixed(4)} × R${pivotRow + 1}`);
        }
      }

      rank++;
      pivotRow++;
    }

    steps.push(rowOperations.join("\n"));
    steps.push("");
    steps.push("Row echelon form:");
    steps.push(formatMatrix(augmented));
    steps.push("");
    steps.push(`Number of non-zero rows = ${rank}`);
    steps.push(`Therefore, Rank = ${rank}`);

    // Determine properties
    const isFullRank = rank === Math.min(rows, cols);
    let propertyText = "";
    if (rows === cols) {
      propertyText = rank === rows 
        ? "Matrix is full rank (invertible/non-singular)" 
        : "Matrix is rank deficient (singular/non-invertible)";
    } else {
      propertyText = isFullRank 
        ? `Matrix has full rank (${rank} = min(${rows}, ${cols}))`
        : `Matrix is rank deficient (rank ${rank} < min(${rows}, ${cols}) = ${Math.min(rows, cols)})`;
    }

    setResult({
      rank,
      steps,
      rows,
      cols,
      isFullRank,
      propertyText,
      nullity: cols - rank
    });
  };

  const formatMatrix = (m: number[][]): string => {
    return m.map(row => 
      "[ " + row.map(x => x.toFixed(2).padStart(8)).join(" ") + " ]"
    ).join("\n");
  };

  const reset = () => {
    const { rows, cols } = getDimensions();
    const newMatrix = Array(rows).fill(null).map((_, i) => 
      Array(cols).fill(null).map((_, j) => 
        i === j ? "1" : "0"
      )
    );
    setMatrix(newMatrix);
    setResult(null);
    setError("");
  };

  const loadExample = (type: "identity" | "zeros" | "random" | "singular") => {
    const { rows, cols } = getDimensions();
    let newMatrix: string[][];

    if (type === "identity") {
      newMatrix = Array(rows).fill(null).map((_, i) => 
        Array(cols).fill(null).map((_, j) => (i === j ? "1" : "0"))
      );
    } else if (type === "zeros") {
      newMatrix = Array(rows).fill(null).map(() => 
        Array(cols).fill("0")
      );
    } else if (type === "singular") {
      // Create a singular matrix (row3 = row1 + row2)
      newMatrix = [
        ["1", "2", "3", cols > 3 ? "4" : ""].filter(Boolean),
        ["2", "4", "6", cols > 3 ? "8" : ""].filter(Boolean),
        ["3", "6", "9", cols > 3 ? "12" : ""].filter(Boolean),
        rows > 3 ? ["4", "8", "12", cols > 3 ? "16" : ""].filter(Boolean) : null
      ].filter(Boolean) as string[][];
    } else {
      // Random
      newMatrix = Array(rows).fill(null).map(() => 
        Array(cols).fill(null).map(() => Math.floor(Math.random() * 10).toString())
      );
    }

    setMatrix(newMatrix);
    setResult(null);
    setError("");
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      <div className="mb-8">
        <h1 className="text-3xl font-semibold mb-2">Matrix Rank Calculator – Find Rank of a Matrix</h1>
        <p className="text-muted-foreground">
          Calculate the rank of any matrix with our free online matrix rank calculator. Get step-by-step row reduction to echelon form with detailed explanations.
        </p>
      </div>

      <div className="space-y-4">
        <div className="flex items-center gap-4 flex-wrap">
          <Label>Matrix Size:</Label>
          <Tabs value={size} onValueChange={(v) => initializeMatrix(v as typeof size)}>
            <TabsList className="flex flex-wrap">
              <TabsTrigger value="2x2">2×2</TabsTrigger>
              <TabsTrigger value="2x3">2×3</TabsTrigger>
              <TabsTrigger value="3x2">3×2</TabsTrigger>
              <TabsTrigger value="3x3">3×3</TabsTrigger>
              <TabsTrigger value="3x4">3×4</TabsTrigger>
              <TabsTrigger value="4x3">4×3</TabsTrigger>
              <TabsTrigger value="4x4">4×4</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        <div className="flex justify-center">
          <div className="inline-grid gap-2" style={{ gridTemplateColumns: `repeat(${getDimensions().cols}, auto)` }}>
            <span className="text-3xl self-center">[</span>
            {matrix.map((row, ri) => (
              row.map((cell, ci) => (
                <Input
                  key={`${ri}-${ci}`}
                  type="number"
                  value={cell}
                  onChange={(e) => updateMatrix(ri, ci, e.target.value)}
                  className="w-16 text-center"
                />
              ))
            ))}
            <span className="text-3xl self-center">]</span>
          </div>
        </div>

        <div className="flex gap-2 flex-wrap">
          <Button onClick={calculateRank}>Calculate Rank</Button>
          <Button variant="outline" onClick={reset}>Reset</Button>
          <Button variant="outline" onClick={() => loadExample("identity")}>Identity</Button>
          <Button variant="outline" onClick={() => loadExample("singular")}>Singular</Button>
          <Button variant="outline" onClick={() => loadExample("random")}>Random</Button>
        </div>

        {error && (
          <div className="p-4 bg-destructive/10 text-destructive rounded-md">
            <p className="text-sm">{error}</p>
          </div>
        )}

        {result && (
          <div className="space-y-4">
            <div className="p-6 bg-muted rounded-lg text-center">
              <p className="text-sm text-muted-foreground mb-2">Matrix Rank</p>
              <p className="text-5xl font-bold">{result.rank}</p>
              <p className="text-sm text-muted-foreground mt-2">
                {result.rows}×{result.cols} matrix with rank {result.rank}
              </p>
              <p className={`text-sm mt-2 font-semibold ${result.isFullRank ? 'text-green-600' : 'text-amber-600'}`}>
                {result.propertyText}
              </p>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className="p-4 bg-muted rounded-lg text-center">
                <p className="text-sm text-muted-foreground mb-1">Rows</p>
                <p className="text-2xl font-bold">{result.rows}</p>
              </div>
              <div className="p-4 bg-muted rounded-lg text-center">
                <p className="text-sm text-muted-foreground mb-1">Columns</p>
                <p className="text-2xl font-bold">{result.cols}</p>
              </div>
              <div className="p-4 bg-muted rounded-lg text-center">
                <p className="text-sm text-muted-foreground mb-1">Nullity</p>
                <p className="text-2xl font-bold">{result.nullity}</p>
              </div>
            </div>

            <div className="p-4 border rounded-lg">
              <h4 className="font-semibold text-sm mb-3">Step-by-Step Solution</h4>
              <div className="space-y-2 font-mono text-xs bg-muted p-3 rounded overflow-x-auto whitespace-pre">
                {result.steps.map((step: string, i: number) => (
                  <div key={i}>{step}</div>
                ))}
              </div>
            </div>

            <div className="p-4 border rounded-lg">
              <h4 className="font-semibold text-sm mb-2">Rank-Nullity Theorem</h4>
              <p className="text-sm text-muted-foreground mb-2">
                For any matrix: Rank + Nullity = Number of columns
              </p>
              <code className="text-sm font-mono bg-muted px-3 py-2 rounded block">
                {result.rank} + {result.nullity} = {result.cols}
              </code>
            </div>
          </div>
        )}
      </div>

      <section className="border-t pt-8 space-y-4">
        <h2 className="text-2xl font-semibold">Understanding Matrix Rank</h2>
        <p className="text-muted-foreground">
          The rank of a matrix is the number of linearly independent rows or columns. It represents the dimension of the vector space spanned by the matrix's rows or columns. Rank is fundamental in linear algebra and has applications in solving systems of equations.
        </p>
        <div className="grid md:grid-cols-3 gap-4">
          <div className="p-4 bg-muted rounded-lg">
            <h3 className="font-semibold text-sm mb-2">Full Rank</h3>
            <p className="text-sm text-muted-foreground">
              A matrix has full rank when rank = min(rows, cols). Square full-rank matrices are invertible.
            </p>
          </div>
          <div className="p-4 bg-muted rounded-lg">
            <h3 className="font-semibold text-sm mb-2">Rank Deficient</h3>
            <p className="text-sm text-muted-foreground">
              When rank &lt; min(rows, cols), the matrix is rank deficient. Some rows/columns are linear combinations of others.
            </p>
          </div>
          <div className="p-4 bg-muted rounded-lg">
            <h3 className="font-semibold text-sm mb-2">Finding Rank</h3>
            <p className="text-sm text-muted-foreground">
              Reduce to row echelon form using Gaussian elimination. Count the non-zero rows.
            </p>
          </div>
        </div>
      </section>

      <section className="border-t pt-8 space-y-6">
        <h2 className="text-2xl font-semibold">Frequently Asked Questions</h2>
        <div>
          <h3 className="font-semibold mb-2">What is matrix rank?</h3>
          <p className="text-sm text-muted-foreground">
            Matrix rank is the maximum number of linearly independent rows or columns. It tells you the "true dimension" of the information in the matrix.
          </p>
        </div>
        <div>
          <h3 className="font-semibold mb-2">How do you find the rank of a matrix?</h3>
          <p className="text-sm text-muted-foreground">
            Use Gaussian elimination to reduce the matrix to row echelon form. The rank equals the number of non-zero rows in the result.
          </p>
        </div>
        <div>
          <h3 className="font-semibold mb-2">What does rank tell us?</h3>
          <p className="text-sm text-muted-foreground">
            Rank indicates whether a system of equations has a unique solution (full rank), infinitely many solutions, or no solution. It also determines if a matrix is invertible.
          </p>
        </div>
        <div>
          <h3 className="font-semibold mb-2">What is nullity?</h3>
          <p className="text-sm text-muted-foreground">
            Nullity is the dimension of the null space (kernel). By the rank-nullity theorem: rank + nullity = number of columns.
          </p>
        </div>
        <div>
          <h3 className="font-semibold mb-2">Can rank exceed matrix dimensions?</h3>
          <p className="text-sm text-muted-foreground">
            No. Rank is always ≤ min(rows, columns). A 3×5 matrix can have rank at most 3. A 5×3 matrix can have rank at most 3.
          </p>
        </div>
      </section>

      <section className="border-t pt-8 space-y-4">
        <h2 className="text-2xl font-semibold">Related Math Tools</h2>
        <div className="grid sm:grid-cols-3 gap-4">
          <a href="/math-tools/matrix-determinant-calculator" className="p-4 rounded-lg border hover:bg-muted transition-colors">
            <p className="font-semibold text-sm">Determinant Calculator</p>
            <p className="text-xs text-muted-foreground">Find det(A)</p>
          </a>
          <a href="/math-tools/matrix-inverse-calculator" className="p-4 rounded-lg border hover:bg-muted transition-colors">
            <p className="font-semibold text-sm">Matrix Inverse</p>
            <p className="text-xs text-muted-foreground">Find A⁻¹</p>
          </a>
          <a href="/math-tools/eigenvalue-calculator" className="p-4 rounded-lg border hover:bg-muted transition-colors">
            <p className="font-semibold text-sm">Eigenvalue Calculator</p>
            <p className="text-xs text-muted-foreground">Find eigenvalues</p>
          </a>
        </div>
      </section>
    </div>
  );
}
