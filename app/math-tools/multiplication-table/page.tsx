"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function MultiplicationTable() {
  const [size, setSize] = useState(10);
  const [highlight, setHighlight] = useState<{ row: number; col: number } | null>(null);
  const [customMin, setCustomMin] = useState("1");
  const [customMax, setCustomMax] = useState("10");
  const [useCustomRange, setUseCustomRange] = useState(false);

  const getMin = () => useCustomRange ? parseInt(customMin) || 1 : 1;
  const getMax = () => useCustomRange ? parseInt(customMax) || 10 : size;

  const generateTable = () => {
    const min = getMin();
    const max = getMax();
    
    return (
      <div className="overflow-x-auto">
        <table className="border-collapse w-full max-w-full">
          <thead>
            <tr>
              <th className="border p-2 bg-muted w-12">×</th>
              {Array.from({ length: max - min + 1 }, (_, i) => i + min).map((num) => (
                <th key={num} className="border p-2 bg-muted min-w-12 font-semibold">{num}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: max - min + 1 }, (_, i) => i + min).map((row) => (
              <tr key={row}>
                <td className="border p-2 bg-muted font-semibold text-center">{row}</td>
                {Array.from({ length: max - min + 1 }, (_, j) => j + min).map((col) => {
                  const product = row * col;
                  const isSquare = row === col;
                  const isEven = product % 2 === 0;
                  
                  return (
                    <td
                      key={`${row}-${col}`}
                      className={`border p-2 text-center cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors ${
                        isSquare ? 'bg-accent' : isEven ? '' : 'bg-muted/30'
                      }`}
                      onMouseEnter={() => setHighlight({ row, col })}
                      onMouseLeave={() => setHighlight(null)}
                    >
                      {product}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  const reset = () => {
    setSize(10);
    setCustomMin("1");
    setCustomMax("10");
    setUseCustomRange(false);
    setHighlight(null);
  };

  return (
    <div className="w-full max-w-5xl mx-auto space-y-8">
      <div className="mb-8">
        <h1 className="text-3xl font-semibold mb-2">Multiplication Table Generator</h1>
        <p className="text-muted-foreground">
          Generate and explore multiplication tables with our free online calculator. Customize the range, highlight patterns, and help students learn their times tables interactively.
        </p>
      </div>

      <div className="space-y-4">
        <div className="flex items-center gap-4">
          <Label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={useCustomRange}
              onChange={(e) => setUseCustomRange(e.target.checked)}
              className="h-4 w-4"
            />
            Custom Range
          </Label>
          {useCustomRange ? (
            <div className="flex items-center gap-2">
              <Input
                type="number"
                placeholder="From"
                value={customMin}
                onChange={(e) => setCustomMin(e.target.value)}
                className="w-24"
              />
              <span>to</span>
              <Input
                type="number"
                placeholder="To"
                value={customMax}
                onChange={(e) => setCustomMax(e.target.value)}
                className="w-24"
              />
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Label>Table Size:</Label>
              <Input
                type="number"
                min="1"
                max="20"
                value={size}
                onChange={(e) => setSize(Math.min(20, Math.max(1, parseInt(e.target.value) || 1)))}
                className="w-24"
              />
              <span className="text-sm text-muted-foreground">(1-20)</span>
            </div>
          )}
          <Button variant="outline" size="sm" onClick={reset}>Reset</Button>
        </div>

        <div className="p-4 border rounded-lg bg-background">
          {generateTable()}
        </div>

        {highlight && (
          <div className="p-4 bg-muted rounded-lg text-center">
            <p className="text-lg">
              <span className="font-semibold">{highlight.row}</span> × <span className="font-semibold">{highlight.col}</span> = <span className="font-bold text-2xl">{highlight.row * highlight.col}</span>
            </p>
          </div>
        )}
      </div>

    </div>
  );
}
