"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const examples = [
  { size: "3", label: "3×3 Lo Shu Square" },
  { size: "4", label: "4×4 Dürer Square" },
];

export default function MagicSquareGenerator() {
  const [size, setSize] = useState<"3" | "4">("3");
  const [result, setResult] = useState<{
    size: number;
    square: number[][];
    magicConstant: number;
  } | null>(null);

  const generateMagicSquare3x3 = (): number[][] => {
    return [
      [8, 1, 6],
      [3, 5, 7],
      [4, 9, 2]
    ];
  };

  const generateMagicSquare4x4 = (): number[][] => {
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

  const loadExample = (exampleIndex: number) => {
    const ex = examples[exampleIndex];
    setSize(ex.size as "3" | "4");
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

        <div className="flex gap-2 flex-wrap">
          <Button onClick={generate}>Generate Magic Square</Button>
          <Button variant="outline" onClick={reset}>Reset</Button>
        </div>

        <div className="flex flex-wrap gap-2">
          <span className="text-xs text-muted-foreground self-center">Examples:</span>
          {examples.map((ex, i) => (
            <Button key={i} variant="ghost" size="sm" onClick={() => loadExample(i)}>
              {ex.label}
            </Button>
          ))}
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

      <section className="border-t pt-8 space-y-6">
        <h2 className="text-2xl font-semibold">Understanding Magic Squares</h2>
        <div className="space-y-4">
          <p className="text-muted-foreground">
            A magic square is a grid of numbers where every row, every column, and both main diagonals add up to the same sum – called the magic constant. For an n×n square using the numbers 1 to n², the magic constant is always n(n²+1)/2.
          </p>
          <p className="text-muted-foreground">
            Magic squares have fascinated mathematicians, mystics, and artists for thousands of years. The 3×3 Lo Shu square from ancient China is the oldest known magic square, dating back over 2,000 years. Albrecht Dürer famously included a 4×4 magic square in his 1514 engraving "Melencolia I."
          </p>
        </div>
      </section>

      <section className="border-t pt-8 space-y-6">
        <h3 className="text-xl font-semibold">Magic Constant Formula</h3>
        <div className="p-6 bg-muted rounded-lg">
          <p className="text-sm text-muted-foreground mb-4">
            For an n×n magic square using consecutive integers from 1 to n²:
          </p>
          <div className="font-mono text-lg text-center mb-4">M = n(n² + 1) / 2</div>
          <div className="space-y-2 text-sm">
            <div><strong>3×3 square:</strong> M = 3(9 + 1) / 2 = 3 × 10 / 2 = 15</div>
            <div><strong>4×4 square:</strong> M = 4(16 + 1) / 2 = 4 × 17 / 2 = 34</div>
            <div><strong>5×5 square:</strong> M = 5(25 + 1) / 2 = 5 × 26 / 2 = 65</div>
          </div>
          <p className="text-xs text-muted-foreground mt-4">
            The formula works because the sum of all numbers from 1 to n² is n²(n²+1)/2, and there are n rows, each summing to M.
          </p>
        </div>
      </section>

      <section className="border-t pt-8 space-y-6">
        <h3 className="text-xl font-semibold">Worked Examples</h3>
        <div className="space-y-4">
          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-2">Example 1: The Lo Shu Square (3×3)</h4>
            <p className="text-sm text-muted-foreground mb-3">The oldest known magic square from ancient China</p>
            <div className="bg-muted p-3 rounded font-mono text-sm">
              <div className="grid grid-cols-3 gap-2 text-center mb-3">
                <div className="p-2 bg-primary text-primary-foreground rounded">8</div>
                <div className="p-2 bg-primary text-primary-foreground rounded">1</div>
                <div className="p-2 bg-primary text-primary-foreground rounded">6</div>
                <div className="p-2 bg-primary text-primary-foreground rounded">3</div>
                <div className="p-2 bg-primary text-primary-foreground rounded">5</div>
                <div className="p-2 bg-primary text-primary-foreground rounded">7</div>
                <div className="p-2 bg-primary text-primary-foreground rounded">4</div>
                <div className="p-2 bg-primary text-primary-foreground rounded">9</div>
                <div className="p-2 bg-primary text-primary-foreground rounded">2</div>
              </div>
              <div>Rows: 8+1+6=15, 3+5+7=15, 4+9+2=15</div>
              <div>Columns: 8+3+4=15, 1+5+9=15, 6+7+2=15</div>
              <div>Diagonals: 8+5+2=15, 6+5+4=15</div>
              <div className="pt-2 font-semibold">Magic Constant: 15</div>
            </div>
          </div>

          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-2">Example 2: Dürer's Magic Square (4×4)</h4>
            <p className="text-sm text-muted-foreground mb-3">From Albrecht Dürer's "Melencolia I" (1514)</p>
            <div className="bg-muted p-3 rounded font-mono text-sm">
              <div className="grid grid-cols-4 gap-2 text-center mb-3">
                <div className="p-2 bg-primary text-primary-foreground rounded">1</div>
                <div className="p-2 bg-primary text-primary-foreground rounded">15</div>
                <div className="p-2 bg-primary text-primary-foreground rounded">14</div>
                <div className="p-2 bg-primary text-primary-foreground rounded">4</div>
                <div className="p-2 bg-primary text-primary-foreground rounded">12</div>
                <div className="p-2 bg-primary text-primary-foreground rounded">6</div>
                <div className="p-2 bg-primary text-primary-foreground rounded">7</div>
                <div className="p-2 bg-primary text-primary-foreground rounded">9</div>
                <div className="p-2 bg-primary text-primary-foreground rounded">8</div>
                <div className="p-2 bg-primary text-primary-foreground rounded">10</div>
                <div className="p-2 bg-primary text-primary-foreground rounded">11</div>
                <div className="p-2 bg-primary text-primary-foreground rounded">5</div>
                <div className="p-2 bg-primary text-primary-foreground rounded">13</div>
                <div className="p-2 bg-primary text-primary-foreground rounded">3</div>
                <div className="p-2 bg-primary text-primary-foreground rounded">2</div>
                <div className="p-2 bg-primary text-primary-foreground rounded">16</div>
              </div>
              <div>Rows: All sum to 34</div>
              <div>Columns: All sum to 34</div>
              <div>Diagonals: 1+6+11+16=34, 4+7+10+13=34</div>
              <div className="pt-2 font-semibold">Magic Constant: 34</div>
              <div className="text-xs text-muted-foreground mt-2">Fun fact: The bottom row contains 15 and 14 – the year 1514!</div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t pt-8 space-y-6">
        <h3 className="text-xl font-semibold">Quick Fact</h3>
        <div className="p-6 bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 rounded-lg">
          <p className="text-sm">
            The Lo Shu square was allegedly discovered by Emperor Yu around 2800 BCE on the back of a divine turtle emerging from the Yellow River. In Chinese culture, the arrangement of dots (not numbers) represented cosmic balance and became foundational to Feng Shui and the I Ching.
          </p>
        </div>
      </section>

      <section className="border-t pt-8 space-y-6">
        <h3 className="text-xl font-semibold">Frequently Asked Questions</h3>
        <div className="space-y-6">
          <div>
            <h4 className="font-semibold text-sm mb-2">Are there magic squares of any size?</h4>
            <p className="text-sm text-muted-foreground">
              Magic squares exist for all sizes n≥3. There's no 2×2 magic square using distinct positive integers. For n=1, it's trivially magic. Larger squares (5×5, 6×6, etc.) can be constructed using various algorithms.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">How many different 3×3 magic squares exist?</h4>
            <p className="text-sm text-muted-foreground">
              There's essentially only ONE 3×3 magic square using numbers 1-9. All others are rotations or reflections of the Lo Shu square. For 4×4 squares, there are 880 distinct solutions (not counting rotations/reflections).
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">Can magic squares use numbers other than 1 to n²?</h4>
            <p className="text-sm text-muted-foreground">
              Yes! You can create magic squares with any arithmetic sequence. For example, using 2, 4, 6, 8, 10, 12, 14, 16, 18 gives a 3×3 magic square with constant 30. Even negative numbers or fractions work.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">What's special about the center number?</h4>
            <p className="text-sm text-muted-foreground">
              In a 3×3 magic square, the center is always the middle number (5 for 1-9). It's also the average of all numbers and equals M/3. Any line through the center (row, column, diagonal) contains two numbers that average to the center.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">What are pandiagonal magic squares?</h4>
            <p className="text-sm text-muted-foreground">
              In a pandiagonal (or panmagic) square, not only do the main diagonals sum to M, but ALL "broken" diagonals do too. The 4×4 Dürer square is pandiagonal. These are rarer and more mathematically interesting.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">Do magic squares have practical uses?</h4>
            <p className="text-sm text-muted-foreground">
              Historically, they were used in astrology and mysticism. Today, they're mainly recreational mathematics, but the underlying concepts appear in experimental design, cryptography, and error-correcting codes.
            </p>
          </div>
        </div>
      </section>

    </div>
  );
}
