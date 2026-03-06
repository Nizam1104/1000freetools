"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function InverseMatrixCalculator() {
  const [matrix, setMatrix] = useState<string>("1,2\n3,4");
  const [result, setResult] = useState<string>("");
  const [error, setError] = useState<string>("");

  const parseMatrix = (input: string): number[][] => {
    return input.trim().split("\n").map((row) =>
      row.split(",").map((cell) => parseFloat(cell.trim())).filter((n) => !isNaN(n))
    );
  };

  const determinant2x2 = (m: number[][]): number => m[0][0] * m[1][1] - m[0][1] * m[1][0];
  
  const determinant3x3 = (m: number[][]): number => {
    return m[0][0] * (m[1][1] * m[2][2] - m[1][2] * m[2][1])
         - m[0][1] * (m[1][0] * m[2][2] - m[1][2] * m[2][0])
         + m[0][2] * (m[1][0] * m[2][1] - m[1][1] * m[2][0]);
  };

  const inverse2x2 = (m: number[][]): number[][] => {
    const det = determinant2x2(m);
    return [
      [m[1][1] / det, -m[0][1] / det],
      [-m[1][0] / det, m[0][0] / det]
    ];
  };

  const inverse3x3 = (m: number[][]): number[][] => {
    const det = determinant3x3(m);
    const cofactors = [
      [m[1][1]*m[2][2]-m[1][2]*m[2][1], -(m[1][0]*m[2][2]-m[1][2]*m[2][0]), m[1][0]*m[2][1]-m[1][1]*m[2][0]],
      [-(m[0][1]*m[2][2]-m[0][2]*m[2][1]), m[0][0]*m[2][2]-m[0][2]*m[2][0], -(m[0][0]*m[2][1]-m[0][1]*m[2][0])],
      [m[0][1]*m[1][2]-m[0][2]*m[1][1], -(m[0][0]*m[1][2]-m[0][2]*m[1][0]), m[0][0]*m[1][1]-m[0][1]*m[1][0]]
    ];
    // Transpose and divide by determinant
    return cofactors[0].map((_, colIndex) => cofactors.map((row) => row[colIndex] / det));
  };

  const calculate = () => {
    try {
      const M = parseMatrix(matrix);
      
      if (M.length !== M[0].length) {
        setError("Matrix must be square");
        return;
      }
      
      if (M.length > 3) {
        setError("Only 2x2 and 3x3 matrices supported");
        return;
      }
      
      let inverse: number[][];
      if (M.length === 2) {
        const det = determinant2x2(M);
        if (det === 0) {
          setError("Matrix is singular (no inverse)");
          return;
        }
        inverse = inverse2x2(M);
      } else {
        const det = determinant3x3(M);
        if (det === 0) {
          setError("Matrix is singular (no inverse)");
          return;
        }
        inverse = inverse3x3(M);
      }
      
      setResult(inverse.map((row) => row.map((n) => n.toFixed(4)).join(", ")).join("\n"));
      setError("");
    } catch {
      setError("Invalid matrix format");
    }
  };

  const reset = () => {
    setMatrix("1,2\n3,4");
    setResult("");
    setError("");
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <Card>
        
        <CardContent>
          <div className="space-y-4">
            <div>
              <label className="text-sm text-muted-foreground mb-2 block">Matrix (2x2 or 3x3)</label>
              <textarea
                className="w-full min-h-[100px] p-2 border rounded-md font-mono text-sm bg-background"
                value={matrix}
                onChange={(e) => setMatrix(e.target.value)}
                placeholder="1,2&#10;3,4"
              />
            </div>
            {error && <p className="text-destructive text-sm">{error}</p>}
            <div className="flex gap-2">
              <Button onClick={calculate}>Calculate Inverse</Button>
              <Button variant="outline" onClick={reset}>Reset</Button>
            </div>
            {result && (
              <div className="p-4 bg-muted rounded-md">
                <p className="text-sm text-muted-foreground mb-2">Inverse Matrix (A⁻¹)</p>
                <pre className="font-mono text-lg">{result}</pre>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
