"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function PascalsTriangleCalculator() {
  const [rows, setRows] = useState<string>("");
  const [result, setResult] = useState<number[][] | null>(null);

  const calculate = () => {
    const n = parseInt(rows);
    
    if (!isNaN(n) && n > 0 && n <= 20) {
      const triangle: number[][] = [];
      
      for (let i = 0; i < n; i++) {
        triangle[i] = [1];
        for (let j = 1; j < i; j++) {
          triangle[i][j] = triangle[i - 1][j - 1] + triangle[i - 1][j];
        }
        if (i > 0) triangle[i].push(1);
      }
      
      setResult(triangle);
    }
  };

  const reset = () => {
    setRows("");
    setResult(null);
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Pascal's Triangle Calculator</CardTitle>
          <CardDescription>Generate Pascal's triangle up to n rows</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <label className="text-sm text-muted-foreground mb-2 block">Number of rows</label>
              <Input
                type="number"
                placeholder="e.g., 10"
                min="1"
                max="20"
                value={rows}
                onChange={(e) => setRows(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <Button onClick={calculate}>Generate</Button>
              <Button variant="outline" onClick={reset}>Reset</Button>
            </div>
            {result && (
              <div className="p-4 bg-muted rounded-md">
                <p className="text-sm text-muted-foreground mb-3">Triangle</p>
                <div className="text-center space-y-1">
                  {result.map((row, i) => (
                    <div key={i} className="text-sm font-mono">
                      {row.join("  ")}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
