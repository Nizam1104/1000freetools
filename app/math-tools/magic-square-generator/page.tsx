"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function MagicSquareGenerator() {
  const [size, setSize] = useState<"3" | "4">("3");
  const [result, setResult] = useState<{
    size: number;
    square: number[][];
    magicConstant: number;
  } | null>(null);

  const generateMagicSquare3x3 = (): number[][] => {
    // Siamese method for 3x3
    return [
      [8, 1, 6],
      [3, 5, 7],
      [4, 9, 2]
    ];
  };

  const generateMagicSquare4x4 = (): number[][] => {
    // Dürer's method for 4x4
    return [
      [1, 15, 14, 4],
      [12, 6, 7, 9],
      [8, 10, 11, 5],
      [13, 3, 2, 16]
    ];
  };

  const calculateMagicConstant = (n: number): number => {
    return (n * (n * n + 1)) / 2;
  };

  const generate = () => {
    const n = parseInt(size);
    let square: number[][];

    if (n === 3) {
      square = generateMagicSquare3x3();
    } else {
      square = generateMagicSquare4x4();
    }

    setResult({
      size: n,
      square,
      magicConstant: calculateMagicConstant(n)
    });
  };

  const reset = () => {
    setResult(null);
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      <div className="mb-8">
        <h1 className="text-3xl font-semibold mb-2">Magic Square Generator – Create 3×3 and 4×4 Magic Squares</h1>
        <p className="text-muted-foreground">
          Generate magic squares instantly with our free online tool. Each row, column, and diagonal adds up to the same magic constant.
        </p>
      </div>

      <div className="space-y-4">
        <div>
          <Label>Square Size</Label>
          <Select value={size} onValueChange={(v) => setSize(v as "3" | "4")}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="3">3 × 3 (Classic Lo Shu)</SelectItem>
              <SelectItem value="4">4 × 4 (Dürer Square)</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex gap-2">
          <Button onClick={generate}>Generate Magic Square</Button>
          <Button variant="outline" onClick={reset}>Reset</Button>
        </div>

        {result && (
          <div className="space-y-4">
            <div className="p-6 bg-muted rounded-lg">
              <p className="text-sm text-muted-foreground mb-3">
                {result.size}×{result.size} Magic Square
              </p>
              <p className="text-lg font-semibold mb-4">
                Magic Constant: <span className="text-primary font-bold">{result.magicConstant}</span>
              </p>
              <div className="flex items-center gap-4 overflow-x-auto justify-center">
                <span className="text-4xl font-serif">[</span>
                <div className="grid gap-2" style={{ gridTemplateColumns: `repeat(${result.size}, minmax(0, 1fr))` }}>
                  {result.square.map((row, i) =>
                    row.map((val, j) => (
                      <div
                        key={`${i}-${j}`}
                        className="w-14 h-14 flex items-center justify-center font-mono text-xl font-bold bg-primary text-primary-foreground rounded-lg shadow"
                      >
                        {val}
                      </div>
                    ))
                  )}
                </div>
                <span className="text-4xl font-serif">]</span>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="p-4 bg-muted rounded-lg">
                <p className="text-sm font-semibold mb-3">Row Sums</p>
                <div className="space-y-2">
                  {result.square.map((row, i) => (
                    <div key={i} className="flex justify-between items-center text-sm">
                      <span className="font-mono">Row {i + 1}: {row.join(" + ")}</span>
                      <span className="font-bold text-green-600">= {row.reduce((a, b) => a + b, 0)}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="p-4 bg-muted rounded-lg">
                <p className="text-sm font-semibold mb-3">Column Sums</p>
                <div className="space-y-2">
                  {result.square[0].map((_, j) => {
                    const col = result.square.map(row => row[j]);
                    return (
                      <div key={j} className="flex justify-between items-center text-sm">
                        <span className="font-mono">Col {j + 1}: {col.join(" + ")}</span>
                        <span className="font-bold text-green-600">= {col.reduce((a, b) => a + b, 0)}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="p-4 bg-muted rounded-lg">
              <p className="text-sm font-semibold mb-3">Diagonal Sums</p>
              <div className="space-y-2">
                <div className="flex justify-between items-center text-sm">
                  <span className="font-mono">
                    Main: {result.square.map((row, i) => row[i]).join(" + ")}
                  </span>
                  <span className="font-bold text-green-600">
                    = {result.square.reduce((sum, row, i) => sum + row[i], 0)}
                  </span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="font-mono">
                    Anti: {result.square.map((row, i) => row[result.size - 1 - i]).join(" + ")}
                  </span>
                  <span className="font-bold text-green-600">
                    = {result.square.reduce((sum, row, i) => sum + row[result.size - 1 - i], 0)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

    </div>
  );
}
