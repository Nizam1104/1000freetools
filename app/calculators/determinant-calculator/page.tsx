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
        <CardHeader>
          <CardTitle>Determinant Calculator</CardTitle>
          <CardDescription>Calculate the determinant of a square matrix</CardDescription>
        </CardHeader>
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
    </div>
  );
}
