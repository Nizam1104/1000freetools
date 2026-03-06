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

      <section className="border-t pt-8 space-y-4">
        <h2 className="text-2xl font-semibold">Learning Multiplication Tables</h2>
        <p className="text-muted-foreground">
          Multiplication tables are fundamental to mathematics education. Learning them helps with mental math, division, fractions, and algebra. The table above shows all products in an easy-to-read format.
        </p>
        <p className="text-muted-foreground">
          Hover over any cell to see the multiplication fact highlighted. Perfect squares (where row equals column) are shaded differently to help identify patterns.
        </p>
      </section>

      <section className="border-t pt-8">
        <h2 className="text-2xl font-semibold mb-6">Multiplication Tips</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="p-4 border rounded-lg">
            <h3 className="font-semibold mb-2">Easy Patterns</h3>
            <ul className="space-y-1 text-sm">
              <li>• ×1: Same number (identity)</li>
              <li>• ×2: Double the number</li>
              <li>• ×5: Ends in 0 or 5</li>
              <li>• ×9: Digits add to 9 (up to 90)</li>
              <li>• ×10: Add a zero</li>
              <li>• ×11: Repeat digit (1-9)</li>
            </ul>
          </div>
          <div className="p-4 border rounded-lg">
            <h3 className="font-semibold mb-2">Study Strategies</h3>
            <ul className="space-y-1 text-sm">
              <li>• Start with easier tables (1, 2, 5, 10)</li>
              <li>• Use patterns to remember facts</li>
              <li>• Practice regularly with flashcards</li>
              <li>• Learn commutative property (3×4 = 4×3)</li>
              <li>• Focus on trouble spots</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="border-t pt-8">
        <h2 className="text-2xl font-semibold mb-6">Interesting Patterns</h2>
        <div className="space-y-4">
          <div className="p-4 bg-muted rounded-lg">
            <h3 className="font-semibold mb-2">Diagonal (Perfect Squares)</h3>
            <p className="text-sm text-muted-foreground mb-2">
              The diagonal from top-left to bottom-right shows perfect squares:
            </p>
            <code className="text-sm font-mono bg-background px-2 py-1 rounded block">
              1, 4, 9, 16, 25, 36, 49, 64, 81, 100...
            </code>
          </div>
          <div className="p-4 bg-muted rounded-lg">
            <h3 className="font-semibold mb-2">Symmetry</h3>
            <p className="text-sm text-muted-foreground">
              The table is symmetric across the diagonal because multiplication is commutative: a × b = b × a. This means you only need to learn about half the facts!
            </p>
          </div>
          <div className="p-4 bg-muted rounded-lg">
            <h3 className="font-semibold mb-2">Nine Times Trick</h3>
            <p className="text-sm text-muted-foreground">
              For 9×1 through 9×10, the tens digit goes 0,1,2,3... and the ones digit goes 9,8,7,6... The digits always add to 9!
            </p>
          </div>
        </div>
      </section>

      <section className="border-t pt-8">
        <h2 className="text-2xl font-semibold mb-6">Frequently Asked Questions</h2>
        <div className="space-y-4">
          <div className="p-4 bg-muted rounded-lg">
            <h3 className="font-semibold mb-2">Why learn multiplication tables?</h3>
            <p className="text-sm text-muted-foreground">
              Knowing multiplication facts fluently makes all future math easier. It's essential for division, fractions, algebra, and mental calculations in everyday life.
            </p>
          </div>
          <div className="p-4 bg-muted rounded-lg">
            <h3 className="font-semibold mb-2">What age should kids learn times tables?</h3>
            <p className="text-sm text-muted-foreground">
              Most children start learning multiplication in 2nd or 3rd grade (ages 7-9). By 4th grade, students should know all facts up to 12×12 fluently.
            </p>
          </div>
          <div className="p-4 bg-muted rounded-lg">
            <h3 className="font-semibold mb-2">How can I practice?</h3>
            <p className="text-sm text-muted-foreground">
              Use this table to explore patterns, cover cells to quiz yourself, or use the custom range to focus on specific facts. Regular short practice sessions work best.
            </p>
          </div>
        </div>
      </section>

      <section className="border-t pt-8">
        <h2 className="text-2xl font-semibold mb-6">Related Math Tools</h2>
        <div className="grid sm:grid-cols-3 gap-4">
          <a href="/math-tools/fraction-calculator" className="p-4 rounded-lg border hover:bg-muted transition-colors">
            <p className="font-semibold text-sm">Fraction Calculator</p>
            <p className="text-xs text-muted-foreground">Work with fractions</p>
          </a>
          <a href="/math-tools/long-multiplication-calculator" className="p-4 rounded-lg border hover:bg-muted transition-colors">
            <p className="font-semibold text-sm">Long Multiplication</p>
            <p className="text-xs text-muted-foreground">Multi-digit multiplication</p>
          </a>
          <a href="/math-tools/divisibility-checker" className="p-4 rounded-lg border hover:bg-muted transition-colors">
            <p className="font-semibold text-sm">Divisibility Checker</p>
            <p className="text-xs text-muted-foreground">Divisibility rules</p>
          </a>
        </div>
      </section>
    </div>
  );
}
