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

      <section className="border-t pt-8 space-y-4">
        <h2 className="text-2xl font-semibold">What Is a Magic Square?</h2>
        <p className="text-muted-foreground">
          A magic square is a grid of numbers where every row, every column, and both main diagonals add up to the same total – called the magic constant. Each number from 1 to n² appears exactly once.
        </p>
        <p className="text-muted-foreground">
          Magic squares have fascinated mathematicians for thousands of years. The oldest known magic square, the Lo Shu, dates back to ancient China around 650 BCE.
        </p>
        <div className="p-4 bg-muted rounded-lg">
          <h3 className="font-semibold text-sm mb-2">Magic Constant Formula</h3>
          <p className="text-sm text-muted-foreground mb-2">
            For an n×n magic square using numbers 1 to n²:
          </p>
          <p className="text-lg font-mono bg-background p-3 rounded">
            M = n(n² + 1) / 2
          </p>
          <div className="grid grid-cols-2 gap-3 mt-3 text-sm">
            <div className="p-2 bg-background rounded">
              <span className="text-muted-foreground">3×3:</span>
              <span className="font-mono ml-2">3(9+1)/2 = 15</span>
            </div>
            <div className="p-2 bg-background rounded">
              <span className="text-muted-foreground">4×4:</span>
              <span className="font-mono ml-2">4(16+1)/2 = 34</span>
            </div>
            <div className="p-2 bg-background rounded">
              <span className="text-muted-foreground">5×5:</span>
              <span className="font-mono ml-2">5(25+1)/2 = 65</span>
            </div>
            <div className="p-2 bg-background rounded">
              <span className="text-muted-foreground">6×6:</span>
              <span className="font-mono ml-2">6(36+1)/2 = 111</span>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t pt-8 space-y-4">
        <h2 className="text-2xl font-semibold">The 3×3 Lo Shu Square</h2>
        <p className="text-muted-foreground">
          The Lo Shu (meaning "River Map") is the unique 3×3 magic square. Legend says it appeared on the back of a turtle from the Lo River during a flood. Emperor Yu used it to control the waters.
        </p>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="p-4 bg-muted rounded-lg">
            <h3 className="font-semibold text-sm mb-3">The Square</h3>
            <div className="flex justify-center">
              <div className="grid grid-cols-3 gap-2">
                {[8,1,6, 3,5,7, 4,9,2].map((v, i) => (
                  <div key={i} className="w-12 h-12 flex items-center justify-center font-mono text-xl font-bold bg-primary text-primary-foreground rounded">
                    {v}
                  </div>
                ))}
              </div>
            </div>
            <p className="text-xs text-muted-foreground text-center mt-3">
              Every line sums to 15
            </p>
          </div>
          <div className="p-4 bg-muted rounded-lg">
            <h3 className="font-semibold text-sm mb-2">Properties</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• Center is always 5</li>
              <li>• Corners are even numbers (2, 4, 6, 8)</li>
              <li>• Edges are odd numbers (1, 3, 7, 9)</li>
              <li>• Opposite pairs sum to 10</li>
              <li>• Only one unique arrangement (rotations/reflections aside)</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="border-t pt-8 space-y-4">
        <h2 className="text-2xl font-semibold">The 4×4 Dürer Square</h2>
        <p className="text-muted-foreground">
          Albrecht Dürer featured a 4×4 magic square in his 1514 engraving "Melencolia I". The bottom row contains 15 and 14 – the year he created it.
        </p>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="p-4 bg-muted rounded-lg">
            <h3 className="font-semibold text-sm mb-3">Dürer's Square</h3>
            <div className="flex justify-center">
              <div className="grid grid-cols-4 gap-1">
                {[1,15,14,4, 12,6,7,9, 8,10,11,5, 13,3,2,16].map((v, i) => (
                  <div key={i} className={`w-10 h-10 flex items-center justify-center font-mono font-bold rounded ${
                    i >= 12 ? 'bg-green-500/20 text-green-700' : 'bg-primary text-primary-foreground'
                  }`}>
                    {v}
                  </div>
                ))}
              </div>
            </div>
            <p className="text-xs text-muted-foreground text-center mt-3">
              Bottom row: 15 and 14 = year 1514
            </p>
          </div>
          <div className="p-4 bg-muted rounded-lg">
            <h3 className="font-semibold text-sm mb-2">Special Properties</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• Magic constant: 34</li>
              <li>• Corners sum to 34: 1+4+13+16</li>
              <li>• Center four sum to 34: 6+7+10+11</li>
              <li>• Each quadrant sums to 34</li>
              <li>• Bottom middle shows the date: 15, 14</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="border-t pt-8 space-y-4">
        <h2 className="text-2xl font-semibold">How to Build a 3×3 Magic Square</h2>
        <p className="text-muted-foreground">
          The Siamese method (also called de la Loubère's method) creates odd-order magic squares:
        </p>
        <div className="space-y-3">
          <div className="p-4 bg-muted rounded-lg">
            <h3 className="font-semibold text-sm mb-2">Step-by-Step</h3>
            <ol className="space-y-2 text-sm text-muted-foreground list-decimal list-inside">
              <li>Start with 1 in the middle of the top row</li>
              <li>Move up one row, right one column for the next number</li>
              <li>If you go off the top, wrap to the bottom</li>
              <li>If you go off the right, wrap to the left</li>
              <li>If the cell is occupied, drop down one row instead</li>
              <li>Continue until all cells are filled</li>
            </ol>
          </div>
          <div className="p-4 bg-muted rounded-lg">
            <h3 className="font-semibold text-sm mb-2">Visual Guide</h3>
            <div className="grid grid-cols-3 gap-2 text-center text-xs">
              <div className="p-2 bg-background rounded">
                <span className="block text-muted-foreground">Step 1:</span>
                <span className="font-mono">Place 1 at top-middle</span>
              </div>
              <div className="p-2 bg-background rounded">
                <span className="block text-muted-foreground">Step 2:</span>
                <span className="font-mono">Up-right → wrap to bottom</span>
              </div>
              <div className="p-2 bg-background rounded">
                <span className="block text-muted-foreground">Step 3:</span>
                <span className="font-mono">Up-right → place 3</span>
              </div>
              <div className="p-2 bg-background rounded">
                <span className="block text-muted-foreground">Step 4:</span>
                <span className="font-mono">Cell taken → drop down</span>
              </div>
              <div className="p-2 bg-background rounded">
                <span className="block text-muted-foreground">Continue...</span>
                <span className="font-mono">Until 9 is placed</span>
              </div>
              <div className="p-2 bg-green-500/20 rounded">
                <span className="block text-muted-foreground">Done!</span>
                <span className="font-mono">All sums = 15</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t pt-8 space-y-4">
        <h2 className="text-2xl font-semibold">Magic Square Facts</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="p-4 bg-muted rounded-lg">
            <h3 className="font-semibold text-sm mb-2">Historical Uses</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• Ancient China: Divination and feng shui</li>
              <li>• Medieval Islam: Talismans and amulets</li>
              <li>• Renaissance Europe: Art and symbolism</li>
              <li>• India: Religious rituals and yantras</li>
            </ul>
          </div>
          <div className="p-4 bg-muted rounded-lg">
            <h3 className="font-semibold text-sm mb-2">Mathematical Facts</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• No 2×2 magic square exists</li>
              <li>• Exactly 1 unique 3×3 (8 with rotations)</li>
              <li>• 880 unique 4×4 squares exist</li>
              <li>• Over 275 million unique 5×5 squares</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="border-t pt-8 space-y-6">
        <h2 className="text-2xl font-semibold">Frequently Asked Questions</h2>
        <div>
          <h3 className="font-semibold mb-2">Why is 15 the magic constant for 3×3?</h3>
          <p className="text-sm text-muted-foreground">
            The numbers 1 through 9 sum to 45. Since there are 3 rows and each must equal the magic constant, we have 45 ÷ 3 = 15.
          </p>
        </div>
        <div>
          <h3 className="font-semibold mb-2">Can you make a magic square with different numbers?</h3>
          <p className="text-sm text-muted-foreground">
            Yes. You can use any arithmetic sequence. For example, using 2, 4, 6... 18 instead of 1-9 creates a magic square with constant 30.
          </p>
        </div>
        <div>
          <h3 className="font-semibold mb-2">What about larger magic squares?</h3>
          <p className="text-sm text-muted-foreground">
            Magic squares exist for all sizes 3×3 and larger. There's no 2×2 magic square using distinct positive integers. Methods exist for odd orders, doubly-even (divisible by 4), and singly-even orders.
          </p>
        </div>
        <div>
          <h3 className="font-semibold mb-2">Are magic squares useful for anything?</h3>
          <p className="text-sm text-muted-foreground">
            Beyond recreation, magic squares appear in combinatorics, experimental design, and cryptography. They're also excellent for teaching pattern recognition and logical thinking.
          </p>
        </div>
        <div>
          <h3 className="font-semibold mb-2">What's a panmagic square?</h3>
          <p className="text-sm text-muted-foreground">
            A panmagic (or diabolic) square has the property that broken diagonals also sum to the magic constant. The 4×4 Dürer square is panmagic.
          </p>
        </div>
      </section>

      <section className="border-t pt-8 space-y-4">
        <h2 className="text-2xl font-semibold">Related Math Tools</h2>
        <div className="grid sm:grid-cols-3 gap-4">
          <a href="/math-tools/pascals-triangle-generator" className="p-4 rounded-lg border hover:bg-muted transition-colors">
            <p className="font-semibold text-sm">Pascal's Triangle Generator</p>
            <p className="text-xs text-muted-foreground">Generate Pascal's triangle</p>
          </a>
          <a href="/math-tools/fibonacci-generator" className="p-4 rounded-lg border hover:bg-muted transition-colors">
            <p className="font-semibold text-sm">Fibonacci Generator</p>
            <p className="text-xs text-muted-foreground">Fibonacci sequence</p>
          </a>
          <a href="/math-tools/matrix-addition-subtraction-calculator" className="p-4 rounded-lg border hover:bg-muted transition-colors">
            <p className="font-semibold text-sm">Matrix Calculator</p>
            <p className="text-xs text-muted-foreground">Matrix operations</p>
          </a>
        </div>
      </section>
    </div>
  );
}
