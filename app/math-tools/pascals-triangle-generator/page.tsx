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

    if (num < 1 || num > 100) {
      setError("Please enter a number between 1 and 100");
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

  const loadExample = (n: number) => {
    setRows(n.toString());
    setResult(null);
    setError("");
  };

  return (
    <div className="w-full mx-auto space-y-8">
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

        <div className="flex flex-wrap gap-2">
          <span className="text-xs text-muted-foreground">Examples:</span>
          <Button variant="ghost" size="sm" onClick={() => loadExample(5)}>5 Rows</Button>
          <Button variant="ghost" size="sm" onClick={() => loadExample(8)}>8 Rows</Button>
          <Button variant="ghost" size="sm" onClick={() => loadExample(10)}>10 Rows</Button>
          <Button variant="ghost" size="sm" onClick={() => loadExample(12)}>12 Rows</Button>
          <Button variant="ghost" size="sm" onClick={() => loadExample(15)}>15 Rows</Button>
          <Button variant="ghost" size="sm" onClick={() => loadExample(20)}>20 Rows</Button>
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
                          className={`w-10 h-10 flex items-center justify-center font-mono text-sm rounded ${val === 1 ? 'bg-primary/20 text-primary font-semibold' :
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

      <section className="border-t pt-8 space-y-6">
        <h2 className="text-2xl font-semibold">Understanding Pascal's Triangle</h2>
        <p className="text-muted-foreground">
          Pascal's triangle is one of the most elegant patterns in mathematics. Start with a single 1 at the top. Each row below adds one more number. Every number is the sum of the two numbers directly above it. The edges are always 1. What emerges is a triangular array packed with mathematical relationships.
        </p>
        <p className="text-muted-foreground">
          Named after French mathematician Blaise Pascal, who studied it extensively in 1653, the triangle was actually known centuries earlier in China, Persia, and India. Chinese mathematician Yang Hui described it in 1261, and Persian polymath Omar Khayyam worked with it in the 11th century.
        </p>
      </section>

      <section className="border-t pt-8 space-y-6">
        <h3 className="text-xl font-semibold">How Pascal's Triangle Works</h3>
        <div className="space-y-4">
          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-2">Building the Triangle</h4>
            <p className="text-sm text-muted-foreground mb-3">
              Row 0 starts with just [1]. Row 1 is [1, 1]. From there, each interior number equals the sum of the two numbers above it. Think of it as adding neighbors from the previous row.
            </p>
            <div className="font-mono text-xs bg-muted p-3 rounded space-y-1">
              <div>Row 0: 1</div>
              <div>Row 1: 1 1</div>
              <div>Row 2: 1 2 1</div>
              <div>Row 3: 1 3 3 1</div>
              <div>Row 4: 1 4 6 4 1</div>
              <div>Row 5: 1 5 10 10 5 1</div>
            </div>
          </div>

          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-2">The Formula Behind It</h4>
            <p className="text-sm text-muted-foreground mb-2">
              Each entry in Pascal's triangle is a binomial coefficient. The number at position k in row n equals "n choose k" – the number of ways to pick k items from n items.
            </p>
            <div className="font-mono text-sm bg-muted p-3 rounded">
              C(n,k) = n! / (k! × (n-k)!)
            </div>
            <p className="text-sm text-muted-foreground mt-2">
              Row 5, position 2: C(5,2) = 5!/(2!×3!) = 120/(2×6) = 10
            </p>
          </div>
        </div>
      </section>

      <section className="border-t pt-8 space-y-6">
        <h3 className="text-xl font-semibold">Patterns Hidden in the Triangle</h3>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-2">Row Sums Are Powers of 2</h4>
            <p className="text-sm text-muted-foreground mb-2">
              Add up all numbers in row n, and you get 2^n. Row 4 sums to 1+4+6+4+1 = 16 = 2^4.
            </p>
          </div>
          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-2">Diagonals Reveal Counting Numbers</h4>
            <p className="text-sm text-muted-foreground mb-2">
              The first diagonal is all 1s. The second diagonal counts 1, 2, 3, 4, 5... The third diagonal gives triangular numbers: 1, 3, 6, 10, 15...
            </p>
          </div>
          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-2">Fibonacci Sequence</h4>
            <p className="text-sm text-muted-foreground mb-2">
              Add numbers along shallow diagonals and you get the Fibonacci sequence: 1, 1, 2, 3, 5, 8, 13...
            </p>
          </div>
          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-2">Symmetry</h4>
            <p className="text-sm text-muted-foreground mb-2">
              Every row reads the same forwards and backwards. The triangle is perfectly symmetric down its center line.
            </p>
          </div>
        </div>
      </section>

      <section className="border-t pt-8 space-y-6">
        <h3 className="text-xl font-semibold">Worked Examples</h3>
        <div className="space-y-4">
          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-2">Example 1: Generate 6 Rows</h4>
            <p className="text-sm text-muted-foreground mb-2">Build Pascal's triangle with 6 rows (row 0 through row 5)</p>
            <div className="font-mono text-xs bg-muted p-3 rounded space-y-1">
              <div>Row 0: 1</div>
              <div>Row 1: 1 1</div>
              <div>Row 2: 1 2 1</div>
              <div>Row 3: 1 3 3 1</div>
              <div>Row 4: 1 4 6 4 1</div>
              <div>Row 5: 1 5 10 10 5 1</div>
              <div className="pt-2 text-muted-foreground">Total numbers: 21 | Largest: 10</div>
            </div>
          </div>

          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-2">Example 2: Find C(7,3)</h4>
            <p className="text-sm text-muted-foreground mb-2">Use Pascal's triangle to find the binomial coefficient "7 choose 3"</p>
            <div className="font-mono text-xs bg-muted p-3 rounded space-y-1">
              <div>Look at row 7, position 3 (0-indexed)</div>
              <div>Row 7: 1 7 21 35 35 21 7 1</div>
              <div>Position 3 = 35</div>
              <div className="pt-2">C(7,3) = 7!/(3!×4!) = 5040/(6×24) = 35</div>
            </div>
          </div>

          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-2">Example 3: Expand (x+y)^4</h4>
            <p className="text-sm text-muted-foreground mb-2">Use row 4 of Pascal's triangle as coefficients</p>
            <div className="font-mono text-xs bg-muted p-3 rounded space-y-1">
              <div>Row 4 coefficients: 1 4 6 4 1</div>
              <div>(x+y)^4 = 1x^4 + 4x^3y + 6x^2y^2 + 4xy^3 + 1y^4</div>
              <div className="pt-2">= x^4 + 4x^3y + 6x^2y^2 + 4xy^3 + y^4</div>
            </div>
          </div>

          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-2">Example 4: Sum of Row 8</h4>
            <p className="text-sm text-muted-foreground mb-2">Find the sum of all numbers in row 8 without adding them</p>
            <div className="font-mono text-xs bg-muted p-3 rounded space-y-1">
              <div>Sum of row n = 2^n</div>
              <div>Sum of row 8 = 2^8 = 256</div>
              <div className="pt-2">Verify: 1+8+28+56+70+56+28+8+1 = 256</div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t pt-8 space-y-6">
        <h3 className="text-xl font-semibold">Quick Fact</h3>
        <div className="p-4 bg-primary/10 border border-primary/20 rounded-lg">
          <p className="text-sm">
            Pascal's triangle contains the tetrahedral numbers in its fourth diagonal: 1, 4, 10, 20, 35... These count the number of spheres needed to build a tetrahedron (triangular pyramid). The 10 in row 5 represents a pyramid of 10 cannonballs – 1 on top, then 3, then 6 at the base.
          </p>
        </div>
      </section>

      <section className="border-t pt-8 space-y-6">
        <h3 className="text-xl font-semibold">Frequently Asked Questions</h3>
        <div className="space-y-6">
          <div>
            <h4 className="font-semibold text-sm mb-2">What is Pascal's triangle used for?</h4>
            <p className="text-sm text-muted-foreground">
              Pascal's triangle gives binomial coefficients for expanding (x+y)^n. It's used in probability to find combinations, in algebra for polynomial expansion, and in combinatorics for counting problems. Statisticians use it for binomial distributions.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">How do I find a specific number in Pascal's triangle?</h4>
            <p className="text-sm text-muted-foreground">
              Use the formula C(n,k) = n!/(k!(n-k)!), where n is the row number and k is the position (both starting from 0). For row 6, position 2: C(6,2) = 720/(2×24) = 15.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">Why are the edges always 1?</h4>
            <p className="text-sm text-muted-foreground">
              The edges represent C(n,0) and C(n,n) – choosing nothing or choosing everything. There's exactly one way to do either, so these values are always 1. Mathematically, n!/(0!×n!) = 1.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">Can Pascal's triangle have negative numbers?</h4>
            <p className="text-sm text-muted-foreground">
              Not in the standard triangle. Every entry is a positive counting number. However, extended versions exist for negative row indices, but those are advanced mathematical constructs.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">What's the largest number I can generate?</h4>
            <p className="text-sm text-muted-foreground">
              This calculator handles up to 100 rows. The middle number in row 100 is C(100,50), which has about 30 digits. Beyond that, numbers grow astronomically – row 1000's center has nearly 300 digits.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">Is there a pattern for odd and even numbers?</h4>
            <p className="text-sm text-muted-foreground">
              Yes. Color the odd numbers black and even numbers white, and you get the Sierpinski triangle fractal. This self-similar pattern emerges from the simple addition rule.
            </p>
          </div>
        </div>
      </section>

    </div>
  );
}
