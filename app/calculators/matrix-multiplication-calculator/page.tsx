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
        <CardHeader>
          <CardTitle>Matrix Multiplication Calculator</CardTitle>
          <CardDescription>Multiply two matrices (A × B)</CardDescription>
        </CardHeader>
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
        </CardContent>
      </Card>
    </div>
  );
}
