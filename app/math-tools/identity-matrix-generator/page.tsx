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

    if (num < 1 || num > 20) {
      setError("Please enter a size between 1 and 20");
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

        <div className="flex gap-2">
          <Button onClick={calculate}>Generate Identity Matrix</Button>
          <Button variant="outline" onClick={reset}>Reset</Button>
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

    </div>
  );
}
