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

  const examples = [
    { name: "1-10", min: 1, max: 10 },
    { name: "1-12", min: 1, max: 12 },
    { name: "1-15", min: 1, max: 15 },
    { name: "1-20", min: 1, max: 20 },
    { name: "5-10", min: 5, max: 10 },
    { name: "10-20", min: 10, max: 20 },
    { name: "Single Table", min: 5, max: 5 }
  ];

  const getMin = () => useCustomRange ? parseInt(customMin) || 1 : 1;
  const getMax = () => useCustomRange ? parseInt(customMax) || 10 : size;

  const loadExample = (min: number, max: number) => {
    setUseCustomRange(true);
    setCustomMin(min.toString());
    setCustomMax(max.toString());
    setHighlight(null);
  };

  const generateTable = () => {
    const min = getMin();
    const max = getMax();

    return (
      <div className="overflow-x-auto">
        <table className="border-collapse w-full max-w-full">
          <thead>
            <tr>
              <th className="border p-2 bg-muted w-12">x</th>
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
                      className={`border p-2 text-center cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors ${isSquare ? 'bg-accent' : isEven ? '' : 'bg-muted/30'
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
    <div className="w-full mx-auto space-y-8">
      <div className="mb-8">
        <h1 className="text-3xl font-semibold mb-2">Multiplication Table Generator</h1>
        <p className="text-muted-foreground">
          Generate and explore multiplication tables with our free online calculator. Customize the range, highlight patterns, and help students learn their times tables interactively.
        </p>
      </div>

      <div className="space-y-4">
        <div className="space-y-4">
          <div className="flex flex-wrap items-center gap-4">
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
                  max="50"
                  value={size}
                  onChange={(e) => setSize(Math.min(50, Math.max(1, parseInt(e.target.value) || 1)))}
                  className="w-24"
                />
                <span className="text-sm text-muted-foreground">(1-50)</span>
              </div>
            )}
          </div>

          <div className="flex flex-wrap gap-2">
            <span className="text-sm text-muted-foreground">Quick presets:</span>
            {examples.map((ex, idx) => (
              <Button key={idx} variant="outline" size="sm" onClick={() => loadExample(ex.min, ex.max)}>{ex.name}</Button>
            ))}
            <Button variant="outline" size="sm" onClick={reset}>Reset</Button>
          </div>

          <div className="p-4 border rounded-lg bg-background">
            {generateTable()}
          </div>

          {highlight && (
            <div className="p-4 bg-muted rounded-lg text-center">
              <p className="text-lg">
                <span className="font-semibold">{highlight.row}</span> x <span className="font-semibold">{highlight.col}</span> = <span className="font-bold text-2xl">{highlight.row * highlight.col}</span>
              </p>
            </div>
          )}
        </div>
      </div>

      <section className="border-t pt-8 space-y-6">
        <h2 className="text-2xl font-semibold">Understanding Multiplication Tables</h2>
        <p className="text-muted-foreground">
          A multiplication table shows the products of numbers in a grid format. Each cell contains the result of multiplying its row number by its column number. These tables are fundamental tools for learning arithmetic and recognizing number patterns.
        </p>
        <p className="text-muted-foreground">
          The classic multiplication table goes from 1 to 10 or 1 to 12, but you can generate tables for any range. Larger tables reveal interesting patterns like diagonal symmetry (because multiplication is commutative) and the distribution of even and odd products.
        </p>
      </section>

      <section className="border-t pt-8 space-y-6">
        <h3 className="text-xl font-semibold">Key Patterns in Multiplication Tables</h3>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-2">Diagonal Symmetry</h4>
            <p className="text-sm text-muted-foreground">
              The table is symmetric across the main diagonal (top-left to bottom-right) because a x b = b x a. This is the commutative property of multiplication.
            </p>
          </div>
          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-2">Perfect Squares</h4>
            <p className="text-sm text-muted-foreground">
              The diagonal from top-left to bottom-right contains perfect squares: 1, 4, 9, 16, 25... These are numbers multiplied by themselves.
            </p>
          </div>
          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-2">Even Products</h4>
            <p className="text-sm text-muted-foreground">
              Any product involving an even number is even. This creates a checkerboard-like pattern in the table.
            </p>
          </div>
          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-2">Skip Counting</h4>
            <p className="text-sm text-muted-foreground">
              Each row shows skip counting by that number. Row 5 shows: 5, 10, 15, 20... (counting by 5s).
            </p>
          </div>
        </div>
      </section>

      <section className="border-t pt-8 space-y-6">
        <h3 className="text-xl font-semibold">Multiplication Tips and Tricks</h3>
        <div className="space-y-4">
          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-2">Times 9 Trick</h4>
            <p className="text-sm text-muted-foreground">
              For 9 x n, the tens digit is (n-1) and the ones digit makes the sum equal 9. Example: 9 x 7 = 63 (6 = 7-1, and 6+3 = 9).
            </p>
          </div>
          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-2">Times 11 Pattern</h4>
            <p className="text-sm text-muted-foreground">
              For single digits: 11 x n = nn (11 x 3 = 33). For larger numbers, add adjacent digits: 11 x 12 = 132 (1, 1+2, 2).
            </p>
          </div>
          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-2">Times 5 Rule</h4>
            <p className="text-sm text-muted-foreground">
              Multiply by 10, then divide by 2. Example: 5 x 7 = (10 x 7) / 2 = 70 / 2 = 35. Products always end in 0 or 5.
            </p>
          </div>
          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-2">Square Numbers</h4>
            <p className="text-sm text-muted-foreground">
              Memorize squares up to 12: 1, 4, 9, 16, 25, 36, 49, 64, 81, 100, 121, 144. These appear frequently in math problems.
            </p>
          </div>
        </div>
      </section>

      <section className="border-t pt-8 space-y-6">
        <h3 className="text-xl font-semibold">Worked Examples</h3>
        <div className="space-y-4">
          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-3">Example 1: Finding 7 x 8</h4>
            <div className="font-mono text-sm space-y-2">
              <div>Look at row 7, column 8</div>
              <div>Or row 8, column 7 (same answer!)</div>
              <div>7 x 8 = 56</div>
              <div className="text-muted-foreground">This is often considered the hardest single fact to memorize</div>
            </div>
          </div>
          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-3">Example 2: Using the Table for Division</h4>
            <div className="font-mono text-sm space-y-2">
              <div>What is 56 / 7?</div>
              <div>Find 56 in row 7</div>
              <div>It's in column 8</div>
              <div>So 56 / 7 = 8</div>
            </div>
          </div>
          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-3">Example 3: Pattern Recognition</h4>
            <div className="font-mono text-sm space-y-2">
              <div>Look at the 9s row: 9, 18, 27, 36, 45, 54, 63, 72, 81</div>
              <div>Tens digit increases: 0, 1, 2, 3, 4, 5, 6, 7, 8</div>
              <div>Ones digit decreases: 9, 8, 7, 6, 5, 4, 3, 2, 1</div>
              <div>Each digit sum equals 9!</div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t pt-8 space-y-6">
        <h3 className="text-xl font-semibold">Quick Fact</h3>
        <div className="p-4 bg-primary/10 border border-primary/20 rounded-lg">
          <p className="text-sm">
            The oldest known multiplication table dates back to ancient Babylon around 4000 years ago, written in cuneiform on clay tablets. They used base-60 (sexagesimal) instead of our base-10. The Chinese multiplication table (nine-nine song) has been used for over 2000 years and is still taught as a rhyme today.
          </p>
        </div>
      </section>

      <section className="border-t pt-8 space-y-6">
        <h3 className="text-xl font-semibold">Frequently Asked Questions</h3>
        <div className="space-y-6">
          <div>
            <h4 className="font-semibold text-sm mb-2">Why do multiplication tables go to 12?</h4>
            <p className="text-sm text-muted-foreground">
              Historically, 12 was important because it has many factors (1, 2, 3, 4, 6, 12) – useful for measurements like dozens, inches in a foot, and hours on a clock. Many systems used base-12 or duodecimal counting.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">At what age should kids learn multiplication tables?</h4>
            <p className="text-sm text-muted-foreground">
              Most children start learning times tables around age 7-8 (2nd-3rd grade), beginning with 2s, 5s, and 10s. By age 9-10, they typically learn all tables through 12. Mastery takes practice over time.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">What's the best way to memorize multiplication facts?</h4>
            <p className="text-sm text-muted-foreground">
              Use patterns and tricks, practice regularly with flashcards or apps, sing multiplication songs, and apply facts to real problems. Understanding why facts work (like using arrays) helps more than rote memorization alone.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">Why is 0 x anything = 0?</h4>
            <p className="text-sm text-muted-foreground">
              Multiplication is repeated addition. "0 x 5" means "add zero, five times" or "add five, zero times" – both give zero. Think of it as having zero groups of something, or having groups with zero items.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">How does this help with larger multiplication?</h4>
            <p className="text-sm text-muted-foreground">
              Multi-digit multiplication breaks into single-digit facts. For 23 x 45, you need 2x4, 2x5, 3x4, 3x5, then add with proper place values. Mastering the basic table is essential for all future math.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">Can I use this for division practice?</h4>
            <p className="text-sm text-muted-foreground">
              Absolutely! Multiplication and division are inverse operations. To solve 56 / 8, find 56 in row 8 and see which column it's in. The table works both ways for fact families.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
