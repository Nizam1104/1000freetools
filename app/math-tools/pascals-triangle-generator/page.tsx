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
        <h2 className="text-2xl font-semibold">What Is Pascal's Triangle?</h2>
        <p className="text-muted-foreground">
          Pascal's triangle is a triangular arrangement of numbers where each number is the sum of the two numbers directly above it. The edges are always 1.
        </p>
        <p className="text-muted-foreground">
          Despite being named after Blaise Pascal (1653), the triangle was known to mathematicians in China, Persia, and India centuries earlier. Yang Hui described it in 13th century China, and Omar Khayyam studied it in 11th century Persia.
        </p>
        <div className="p-4 bg-muted rounded-lg">
          <h3 className="font-semibold text-sm mb-2">How It's Built</h3>
          <div className="space-y-2 text-sm">
            <p className="text-muted-foreground">Start with a single 1 at the top:</p>
            <div className="flex justify-center py-2">
              <span className="w-10 h-10 flex items-center justify-center bg-primary text-primary-foreground rounded font-mono">1</span>
            </div>
            <p className="text-muted-foreground">Each new row starts and ends with 1. Middle numbers are the sum of the two above:</p>
            <div className="flex flex-col items-center gap-1 py-2">
              <div className="flex gap-1">
                <span className="w-8 h-8 flex items-center justify-center bg-muted-foreground/10 rounded font-mono text-xs">1</span>
              </div>
              <div className="flex gap-1">
                <span className="w-8 h-8 flex items-center justify-center bg-muted-foreground/10 rounded font-mono text-xs">1</span>
                <span className="w-8 h-8 flex items-center justify-center bg-muted-foreground/10 rounded font-mono text-xs">1</span>
              </div>
              <div className="flex gap-1">
                <span className="w-8 h-8 flex items-center justify-center bg-muted-foreground/10 rounded font-mono text-xs">1</span>
                <span className="w-8 h-8 flex items-center justify-center bg-primary text-primary-foreground rounded font-mono text-xs">2</span>
                <span className="w-8 h-8 flex items-center justify-center bg-muted-foreground/10 rounded font-mono text-xs">1</span>
              </div>
              <div className="flex gap-1">
                <span className="w-8 h-8 flex items-center justify-center bg-muted-foreground/10 rounded font-mono text-xs">1</span>
                <span className="w-8 h-8 flex items-center justify-center bg-muted-foreground/10 rounded font-mono text-xs">3</span>
                <span className="w-8 h-8 flex items-center justify-center bg-muted-foreground/10 rounded font-mono text-xs">3</span>
                <span className="w-8 h-8 flex items-center justify-center bg-muted-foreground/10 rounded font-mono text-xs">1</span>
              </div>
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              The 2 comes from 1+1. The 3s come from 1+2 and 2+1.
            </p>
          </div>
        </div>
      </section>

      <section className="border-t pt-8 space-y-4">
        <h2 className="text-2xl font-semibold">Patterns in Pascal's Triangle</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="p-4 bg-muted rounded-lg">
            <h3 className="font-semibold text-sm mb-2">Row Sums</h3>
            <p className="text-sm text-muted-foreground mb-2">
              Each row sums to a power of 2:
            </p>
            <p className="text-sm font-mono">
              Row 0: 1 = 2⁰<br />
              Row 1: 1+1 = 2 = 2¹<br />
              Row 2: 1+2+1 = 4 = 2²<br />
              Row 3: 1+3+3+1 = 8 = 2³<br />
              Row 4: 1+4+6+4+1 = 16 = 2⁴
            </p>
          </div>
          <div className="p-4 bg-muted rounded-lg">
            <h3 className="font-semibold text-sm mb-2">Diagonals</h3>
            <p className="text-sm text-muted-foreground mb-2">
              The diagonals reveal sequences:
            </p>
            <p className="text-sm font-mono">
              Edge: 1, 1, 1, 1, 1...<br />
              1st diagonal: 1, 2, 3, 4, 5... (counting)<br />
              2nd diagonal: 1, 3, 6, 10, 15... (triangular)<br />
              3rd diagonal: 1, 4, 10, 20... (tetrahedral)
            </p>
          </div>
          <div className="p-4 bg-muted rounded-lg">
            <h3 className="font-semibold text-sm mb-2">Symmetry</h3>
            <p className="text-sm text-muted-foreground mb-2">
              Each row reads the same forwards and backwards:
            </p>
            <p className="text-sm font-mono">
              1, 5, 10, 10, 5, 1<br />
              ← same either way →
            </p>
          </div>
          <div className="p-4 bg-muted rounded-lg">
            <h3 className="font-semibold text-sm mb-2">Fibonacci Connection</h3>
            <p className="text-sm text-muted-foreground mb-2">
              Sum the shallow diagonals to get Fibonacci numbers:
            </p>
            <p className="text-sm font-mono">
              1, 1, 2, 3, 5, 8, 13, 21...<br />
              Each is the sum of the two before it.
            </p>
          </div>
        </div>
      </section>

      <section className="border-t pt-8 space-y-4">
        <h2 className="text-2xl font-semibold">Binomial Coefficients</h2>
        <p className="text-muted-foreground">
          Pascal's triangle gives the coefficients for expanding binomials. The nth row contains the coefficients of (a + b)ⁿ.
        </p>
        <div className="space-y-3">
          <div className="p-4 bg-muted rounded-lg">
            <h3 className="font-semibold text-sm mb-2">Examples</h3>
            <div className="space-y-2 text-sm font-mono">
              <div className="p-2 bg-background rounded">
                (a + b)⁰ = 1<br />
                Coefficients: [1]
              </div>
              <div className="p-2 bg-background rounded">
                (a + b)¹ = 1a + 1b<br />
                Coefficients: [1, 1]
              </div>
              <div className="p-2 bg-background rounded">
                (a + b)² = 1a² + 2ab + 1b²<br />
                Coefficients: [1, 2, 1]
              </div>
              <div className="p-2 bg-background rounded">
                (a + b)³ = 1a³ + 3a²b + 3ab² + 1b³<br />
                Coefficients: [1, 3, 3, 1]
              </div>
              <div className="p-2 bg-background rounded">
                (a + b)⁴ = 1a⁴ + 4a³b + 6a²b² + 4ab³ + 1b⁴<br />
                Coefficients: [1, 4, 6, 4, 1]
              </div>
            </div>
          </div>
          <div className="p-4 bg-muted rounded-lg">
            <h3 className="font-semibold text-sm mb-2">The Formula</h3>
            <p className="text-sm text-muted-foreground mb-2">
              Each entry is a binomial coefficient "n choose k":
            </p>
            <p className="text-lg font-mono bg-background p-3 rounded">
              C(n,k) = n! / (k! × (n-k)!)
            </p>
            <p className="text-xs text-muted-foreground mt-2">
              Row 5, position 2: C(5,2) = 5!/(2!×3!) = 120/(2×6) = 10
            </p>
          </div>
        </div>
      </section>

      <section className="border-t pt-8 space-y-4">
        <h2 className="text-2xl font-semibold">Real-World Applications</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="p-4 bg-muted rounded-lg">
            <h3 className="font-semibold text-sm mb-2">Probability</h3>
            <p className="text-sm text-muted-foreground">
              Flip a coin 4 times. Row 4 of Pascal's triangle (1, 4, 6, 4, 1) tells you: 1 way to get 0 heads, 4 ways to get 1 head, 6 ways to get 2 heads, etc.
            </p>
          </div>
          <div className="p-4 bg-muted rounded-lg">
            <h3 className="font-semibold text-sm mb-2">Combinations</h3>
            <p className="text-sm text-muted-foreground">
              Choose 3 people from a group of 7? Look at row 7, position 3: C(7,3) = 35 different combinations.
            </p>
          </div>
          <div className="p-4 bg-muted rounded-lg">
            <h3 className="font-semibold text-sm mb-2">Computer Science</h3>
            <p className="text-sm text-muted-foreground">
              Pascal's triangle appears in algorithm analysis, particularly for recursive functions and dynamic programming problems.
            </p>
          </div>
          <div className="p-4 bg-muted rounded-lg">
            <h3 className="font-semibold text-sm mb-2">Algebra</h3>
            <p className="text-sm text-muted-foreground">
              Expanding polynomials, finding coefficients, and solving combinatorial problems all use Pascal's triangle.
            </p>
          </div>
        </div>
      </section>

      <section className="border-t pt-8 space-y-6">
        <h2 className="text-2xl font-semibold">Frequently Asked Questions</h2>
        <div>
          <h3 className="font-semibold mb-2">What's the first row – row 0 or row 1?</h3>
          <p className="text-sm text-muted-foreground">
            Mathematicians typically start with row 0 (just the single 1 at the top). This makes the formulas cleaner: row n corresponds to (a+b)ⁿ.
          </p>
        </div>
        <div>
          <h3 className="font-semibold mb-2">Why is it called Pascal's triangle?</h3>
          <p className="text-sm text-muted-foreground">
            Blaise Pascal wrote a comprehensive treatise on the triangle in 1653, discovering many new properties. Though others knew of it earlier, his work popularized it in Europe.
          </p>
        </div>
        <div>
          <h3 className="font-semibold mb-2">What's the largest number in row 10?</h3>
          <p className="text-sm text-muted-foreground">
            Row 10 is: 1, 10, 45, 120, 210, 252, 210, 120, 45, 10, 1. The largest is 252 in the middle.
          </p>
        </div>
        <div>
          <h3 className="font-semibold mb-2">Can Pascal's triangle go on forever?</h3>
          <p className="text-sm text-muted-foreground">
            Yes. There's no limit to how many rows you can generate. Each row builds on the previous one using the same simple rule.
          </p>
        </div>
        <div>
          <h3 className="font-semibold mb-2">What about negative rows?</h3>
          <p className="text-sm text-muted-foreground">
            Pascal's triangle can be extended to negative indices using the generalized binomial theorem, but this creates an infinite series rather than finite rows.
          </p>
        </div>
      </section>

      <section className="border-t pt-8 space-y-4">
        <h2 className="text-2xl font-semibold">Related Math Tools</h2>
        <div className="grid sm:grid-cols-3 gap-4">
          <a href="/math-tools/factorial-calculator" className="p-4 rounded-lg border hover:bg-muted transition-colors">
            <p className="font-semibold text-sm">Factorial Calculator</p>
            <p className="text-xs text-muted-foreground">Calculate n!</p>
          </a>
          <a href="/math-tools/combination-calculator" className="p-4 rounded-lg border hover:bg-muted transition-colors">
            <p className="font-semibold text-sm">Combination Calculator</p>
            <p className="text-xs text-muted-foreground">Calculate nCr</p>
          </a>
          <a href="/math-tools/fibonacci-generator" className="p-4 rounded-lg border hover:bg-muted transition-colors">
            <p className="font-semibold text-sm">Fibonacci Generator</p>
            <p className="text-xs text-muted-foreground">Fibonacci sequence</p>
          </a>
        </div>
      </section>
    </div>
  );
}
