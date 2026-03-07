"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function ScalarMultiplicationCalculator() {
  const [rows, setRows] = useState(2);
  const [cols, setCols] = useState(2);
  const [scalar, setScalar] = useState<number>(2);
  const [matrix, setMatrix] = useState<number[][]>([[1, 2], [3, 4]]);
  const [result, setResult] = useState<number[][] | null>(null);
  const [showSteps, setShowSteps] = useState(false);
  const [error, setError] = useState("");

  const initializeMatrix = (newRows: number, newCols: number) => {
    setRows(newRows);
    setCols(newCols);
    setMatrix(Array(newRows).fill(0).map(() => Array(newCols).fill(0)));
    setResult(null);
    setError("");
  };

  const updateMatrix = (row: number, col: number, value: string) => {
    const newMatrix = matrix.map((r, ri) =>
      r.map((c, ci) => (ri === row && ci === col ? parseFloat(value) || 0 : c))
    );
    setMatrix(newMatrix);
  };

  const calculate = () => {
    try {
      const resultMatrix = matrix.map(row =>
        row.map(cell => cell * scalar)
      );
      setResult(resultMatrix);
      setError("");
    } catch (e) {
      setError("Error calculating scalar multiplication. Please check your input.");
      setResult(null);
    }
  };

  const reset = () => {
    setMatrix(Array(rows).fill(0).map(() => Array(cols).fill(0)));
    setScalar(2);
    setResult(null);
    setError("");
    setShowSteps(false);
  };

  const loadExample = () => {
    setRows(2);
    setCols(3);
    setMatrix([[1, 2, 3], [4, 5, 6]]);
    setScalar(3);
    setResult(null);
  };

  const loadIdentityMatrix = () => {
    const size = Math.min(rows, cols);
    const identity = Array(rows).fill(0).map((_, i) =>
      Array(cols).fill(0).map((_, j) => (i === j ? 1 : 0))
    );
    setMatrix(identity);
    setResult(null);
  };

  const round = (n: number): string => {
    const rounded = Math.round(n * 10000) / 10000;
    return Number.isInteger(rounded) ? rounded.toString() : rounded.toFixed(4);
  };

  return (
    <div className="w-full max-w-5xl mx-auto space-y-8">
      <div className="mb-8">
        <h1 className="text-3xl font-semibold mb-2">Scalar Multiplication Calculator – Multiply Matrix by Scalar</h1>
        <p className="text-muted-foreground">
          Multiply any matrix by a scalar with our free online calculator. See the complete result matrix with step-by-step multiplication display.
        </p>
      </div>

      <div className="space-y-4">
        <div className="flex items-center gap-4 flex-wrap">
          <div className="flex items-center gap-2">
            <Label>Matrix Size:</Label>
            <Select value={`${rows}x${cols}`} onValueChange={(v) => {
              const [r, c] = v.split("x").map(Number);
              initializeMatrix(r, c);
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
            <Label>Scalar (k):</Label>
            <Input
              type="number"
              value={scalar}
              onChange={(e) => setScalar(parseFloat(e.target.value) || 0)}
              className="w-24"
              step="any"
            />
          </div>
          <Button variant="outline" size="sm" onClick={loadExample}>Load Example</Button>
          <Button variant="outline" size="sm" onClick={loadIdentityMatrix}>Identity Matrix</Button>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          <div>
            <h3 className="font-semibold mb-3">Original Matrix A ({rows}×{cols})</h3>
            <div className="overflow-x-auto">
              <div className="flex items-center">
                <span className="text-4xl font-light mr-2">[</span>
                <div className="grid gap-2" style={{ gridTemplateColumns: `repeat(${cols}, 1fr)` }}>
                  {matrix.map((row, ri) =>
                    row.map((cell, ci) => (
                      <Input
                        key={`a-${ri}-${ci}`}
                        type="number"
                        value={cell || ""}
                        onChange={(e) => updateMatrix(ri, ci, e.target.value)}
                        className="w-14 h-10 text-center"
                        step="any"
                      />
                    ))
                  )}
                </div>
                <span className="text-4xl font-light ml-2">]</span>
              </div>
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-3">Result: {scalar} × A</h3>
            {result ? (
              <div className="overflow-x-auto">
                <div className="flex items-center">
                  <span className="text-4xl font-light mr-2">[</span>
                  <div className="grid gap-2" style={{ gridTemplateColumns: `repeat(${cols}, 1fr)` }}>
                    {result.map((row, ri) =>
                      row.map((cell, ci) => (
                        <div
                          key={`r-${ri}-${ci}`}
                          className="w-14 h-10 flex items-center justify-center bg-primary text-primary-foreground font-mono rounded"
                        >
                          {round(cell)}
                        </div>
                      ))
                    )}
                  </div>
                  <span className="text-4xl font-light ml-2">]</span>
                </div>
              </div>
            ) : (
              <div className="p-8 bg-muted rounded-lg text-center text-muted-foreground">
                Click "Multiply" to see the result
              </div>
            )}
          </div>
        </div>

        <div className="flex gap-2">
          <Button onClick={calculate}>Multiply Matrix</Button>
          <Button variant="outline" onClick={reset}>Reset</Button>
          {result && (
            <Button variant="outline" onClick={() => setShowSteps(!showSteps)}>
              {showSteps ? "Hide Steps" : "Show Step-by-Step"}
            </Button>
          )}
        </div>

        {error && (
          <div className="p-4 bg-destructive/10 text-destructive rounded-md">
            <p className="text-sm">{error}</p>
          </div>
        )}

        {result && showSteps && (
          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-3">Step-by-Step Calculation</h4>
            <p className="text-sm text-muted-foreground mb-4">
              Each element is multiplied by the scalar {scalar}:
            </p>
            <div className="space-y-3 font-mono text-xs bg-muted p-3 rounded overflow-x-auto">
              {matrix.map((row, ri) =>
                row.map((cell, ci) => (
                  <div key={`${ri}-${ci}`}>
                    {scalar} × {cell} = {round(cell * scalar)}
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {result && (
          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-2">Understanding the Result</h4>
            <p className="text-sm text-muted-foreground">
              Scalar multiplication multiplies <strong>every element</strong> of the matrix by the scalar value.
              The resulting matrix has the same dimensions as the original.
            </p>
          </div>
        )}
      </div>

      <section className="border-t pt-8 space-y-4">
      </section>
    </div>
  );
}
