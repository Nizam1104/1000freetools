"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function PascalsTriangleGenerator() {
  const [rows, setRows] = useState("");
  const [result, setResult] = useState<{
    numRows: number;
    triangle: number[][];
    totalNumbers: number;
  } | null>(null);
  const [error, setError] = useState("");

  const generatePascalsTriangle = (n: number): number[][] => {
    const triangle: number[][] = [];
    for (let i = 0; i < n; i++) {
      const row: number[] = [1];
      for (let j = 1; j < i; j++) {
        row.push(triangle[i - 1][j - 1] + triangle[i - 1][j]);
      }
      if (i > 0) row.push(1);
      triangle.push(row);
    }
    return triangle;
  };

  const calculate = () => {
    const num = parseInt(rows.trim());

    if (isNaN(num)) {
      setError("Please enter a valid number of rows");
      setResult(null);
      return;
    }

    if (num < 1 || num > 25) {
      setError("Please enter a number between 1 and 25");
      setResult(null);
      return;
    }

    setError("");
    const triangle = generatePascalsTriangle(num);
    setResult({
      numRows: num,
      triangle,
      totalNumbers: triangle.reduce((sum, row) => sum + row.length, 0)
    });
  };

  const reset = () => {
    setRows("");
    setResult(null);
    setError("");
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      <div className="mb-8">
        <h1 className="text-3xl font-semibold mb-2">Pascal's Triangle Generator – Build the Triangle</h1>
        <p className="text-muted-foreground">
          Generate Pascal's triangle up to any number of rows with our free online tool. Explore binomial coefficients, combinations, and mathematical patterns.
        </p>
      </div>

      <div className="space-y-4">
        <div>
          <Label>Number of Rows</Label>
          <Input
            type="text"
            placeholder="e.g., 10"
            value={rows}
            onChange={(e) => setRows(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && calculate()}
          />
        </div>

        <div className="flex gap-2">
          <Button onClick={calculate}>Generate Triangle</Button>
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
              <p className="text-sm text-muted-foreground mb-4">
                Pascal's Triangle – {result.numRows} Rows ({result.totalNumbers} numbers total)
              </p>
              <div className="overflow-x-auto">
                <div className="flex flex-col items-center gap-2 min-w-max">
                  {result.triangle.map((row, i) => (
                    <div key={i} className="flex gap-2">
                      {row.map((val, j) => (
                        <div
                          key={j}
                          className={`w-10 h-10 flex items-center justify-center font-mono text-sm rounded ${
                            val === 1 ? 'bg-primary/20 text-primary font-semibold' :
                            val > 100 ? 'bg-purple-500/20 text-purple-700 font-semibold' :
                            val > 20 ? 'bg-blue-500/20 text-blue-700 font-semibold' :
                            'bg-muted-foreground/10'
                          }`}
                        >
                          {val}
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-4">
              <div className="p-4 bg-muted rounded-lg">
                <p className="text-sm text-muted-foreground mb-1">Total Numbers</p>
                <p className="text-2xl font-bold">{result.totalNumbers}</p>
              </div>
              <div className="p-4 bg-muted rounded-lg">
                <p className="text-sm text-muted-foreground mb-1">Largest Number</p>
                <p className="text-2xl font-bold">{Math.max(...result.triangle.flat())}</p>
              </div>
              <div className="p-4 bg-muted rounded-lg">
                <p className="text-sm text-muted-foreground mb-1">Row Sums Total</p>
                <p className="text-2xl font-bold">{Math.pow(2, result.numRows) - 1}</p>
              </div>
            </div>

            <div className="p-4 bg-muted rounded-lg">
              <p className="text-sm font-semibold mb-3">Row-by-Row Display</p>
              <div className="space-y-2 font-mono text-sm overflow-x-auto">
                {result.triangle.map((row, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <span className="text-muted-foreground w-12">Row {i}:</span>
                    <span>[{row.join(", ")}]</span>
                    <span className="text-muted-foreground">Sum = {row.reduce((a, b) => a + b, 0)}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      <section className="border-t pt-8 space-y-4">
      </section>
    </div>
  );
}
