"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function FibonacciGenerator() {
  const [n, setN] = useState<string>("");
  const [result, setResult] = useState<{ sequence: number[]; nth: number; sum: number } | null>(null);

  const calculate = () => {
    const nVal = parseInt(n);
    
    if (!isNaN(nVal) && nVal > 0 && nVal <= 100) {
      const sequence: number[] = [];
      let a = 0, b = 1;
      
      for (let i = 0; i < nVal; i++) {
        sequence.push(a);
        [a, b] = [b, a + b];
      }
      
      setResult({
        sequence,
        nth: sequence[nVal - 1] || 0,
        sum: sequence.reduce((sum, val) => sum + val, 0)
      });
    }
  };

  const reset = () => {
    setN("");
    setResult(null);
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Fibonacci Generator</CardTitle>
          <CardDescription>Generate Fibonacci sequence up to n terms</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <label className="text-sm text-muted-foreground mb-2 block">Number of terms (n)</label>
              <Input
                type="number"
                placeholder="e.g., 15"
                min="1"
                max="100"
                value={n}
                onChange={(e) => setN(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <Button onClick={calculate}>Generate</Button>
              <Button variant="outline" onClick={reset}>Reset</Button>
            </div>
            {result && (
              <div className="p-4 bg-muted rounded-md space-y-3">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">n-th Fibonacci</p>
                    <p className="text-xl font-semibold">{result.nth}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Sum of terms</p>
                    <p className="text-xl font-semibold">{result.sum}</p>
                  </div>
                </div>
                <div className="pt-2 border-t">
                  <p className="text-sm text-muted-foreground">Sequence</p>
                  <p className="text-sm break-all">{result.sequence.join(", ")}</p>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>How to Generate Fibonacci Numbers</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            <strong>Step 1:</strong> Enter how many Fibonacci numbers you want to generate (1 to 100).
          </p>
          <p className="text-sm text-muted-foreground">
            <strong>Step 2:</strong> Click Generate to see the sequence, the n-th Fibonacci number, and the sum.
          </p>
          <p className="text-sm text-muted-foreground">
            <strong>Step 3:</strong> Use the sequence for math problems, art proportions, or programming exercises.
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Understanding the Fibonacci Sequence</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <h4 className="font-semibold text-sm mb-2">What Is the Fibonacci Sequence</h4>
            <p className="text-sm text-muted-foreground">
              The Fibonacci sequence starts with 0 and 1. Each subsequent number is the sum of the two before it: 0, 1, 1, 2, 3, 5, 8, 13, 21, 34... Leonardo Fibonacci described it in 1202, but Indian mathematicians knew it centuries earlier. It shows up everywhere - flower petals, pinecones, hurricanes, and even stock market patterns.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-sm mb-2">The Golden Ratio Connection</h4>
            <p className="text-sm text-muted-foreground">
              Divide any Fibonacci number by the one before it. As you go higher in the sequence, the ratio approaches 1.618 - the golden ratio (φ). 34/21 = 1.619. 89/55 = 1.618. Artists and architects have used this ratio for centuries because it's aesthetically pleasing. The Parthenon, Mona Lisa, and modern logos all use golden ratio proportions.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-sm mb-2">Where Fibonacci Appears in Nature</h4>
            <p className="text-sm text-muted-foreground mb-3">
              The sequence isn't just math - it's how nature grows efficiently:
            </p>
            <ul className="text-xs text-muted-foreground space-y-1 ml-4">
              <li><strong>Flower petals:</strong> Lilies have 3, buttercups have 5, daisies have 34 or 55</li>
              <li><strong>Pinecones:</strong> Spirals count to Fibonacci numbers (8 and 13, or 13 and 21)</li>
              <li><strong>Sunflower seeds:</strong> Two sets of spirals - consecutive Fibonacci numbers</li>
              <li><strong>Tree branches:</strong> Main trunk, then branches, then sub-branches follow the pattern</li>
              <li><strong>Hurricane spirals:</strong> The arms follow logarithmic spirals based on φ</li>
            </ul>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>First 20 Fibonacci Numbers Reference</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Position (n)</TableHead>
                <TableHead>Fibonacci Number F(n)</TableHead>
                <TableHead>Ratio F(n)/F(n-1)</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {[0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144, 233, 377, 610, 987, 1597, 2584, 4181].map((fib, i) => (
                <TableRow key={i}>
                  <TableCell className="font-mono">{i}</TableCell>
                  <TableCell className="font-mono">{fib}</TableCell>
                  <TableCell className="font-mono">{i > 0 ? (fib / [0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144, 233, 377, 610, 987, 1597, 2584, 4181][i-1]).toFixed(5) : '-'}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <p className="text-xs text-muted-foreground mt-3">
            The ratio converges to φ ≈ 1.61803... as n increases. By n=20, it's accurate to 4 decimal places.
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Fibonacci Formula and Properties</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="p-4 bg-muted rounded-md">
            <h4 className="font-semibold text-sm mb-3">Recursive Formula</h4>
            <p className="font-mono text-sm mb-2">F(n) = F(n-1) + F(n-2)</p>
            <p className="text-xs text-muted-foreground">
              Each number equals the sum of the two before it. F(0) = 0, F(1) = 1. This is how the generator works - start with 0 and 1, keep adding.
            </p>
          </div>

          <div className="p-4 bg-muted rounded-md">
            <h4 className="font-semibold text-sm mb-3">Closed-Form Formula (Binet's Formula)</h4>
            <p className="font-mono text-sm mb-2">F(n) = (φⁿ - ψⁿ) / √5</p>
            <p className="text-xs text-muted-foreground">
              φ = (1+√5)/2 ≈ 1.618 (golden ratio), ψ = (1-√5)/2 ≈ -0.618. This formula gives F(n) directly without calculating all previous numbers. For large n, F(n) ≈ φⁿ/√5.
            </p>
          </div>

          <div className="p-4 bg-muted rounded-md">
            <h4 className="font-semibold text-sm mb-3">Interesting Properties</h4>
            <ul className="text-xs text-muted-foreground space-y-1 ml-4">
              <li>The sum of the first n Fibonacci numbers equals F(n+2) - 1</li>
              <li>Every 3rd Fibonacci number is even (2, 8, 34, 144...)</li>
              <li>Every 4th Fibonacci number is divisible by 3</li>
              <li>Every 5th Fibonacci number is divisible by 5</li>
              <li>The GCD of F(m) and F(n) equals F(GCD(m, n))</li>
            </ul>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Frequently Asked Questions</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <h4 className="font-semibold text-sm mb-2">What is the Fibonacci sequence formula?</h4>
            <p className="text-sm text-muted-foreground">
              F(n) = F(n-1) + F(n-2), with F(0) = 0 and F(1) = 1. Each number is the sum of the two before it. The sequence goes 0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55...
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-sm mb-2">What is the 10th Fibonacci number?</h4>
            <p className="text-sm text-muted-foreground">
              The 10th Fibonacci number (F(9) if starting from F(0)) is 34. Counting from F(0)=0: 0, 1, 1, 2, 3, 5, 8, 13, 21, 34. If you count from 1 as the first number, the 10th is 55.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-sm mb-2">Why is the Fibonacci sequence important?</h4>
            <p className="text-sm text-muted-foreground">
              It appears throughout nature, art, and mathematics. The ratio between consecutive Fibonacci numbers approaches the golden ratio (1.618), which describes aesthetically pleasing proportions. It's used in computer algorithms, financial analysis, and biological modeling.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-sm mb-2">Can Fibonacci numbers be negative?</h4>
            <p className="text-sm text-muted-foreground">
              The standard sequence uses only non-negative integers. However, you can extend Fibonacci backwards using F(n-2) = F(n) - F(n-1). This gives F(-1) = 1, F(-2) = -1, F(-3) = 2, F(-4) = -3... alternating signs.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-sm mb-2">How do I calculate Fibonacci numbers efficiently?</h4>
            <p className="text-sm text-muted-foreground">
              For small n, use the recursive formula. For large n, use Binet's closed-form formula or matrix exponentiation. The recursive approach is slow for large n because it recalculates the same values repeatedly. Dynamic programming or memoization solves this.
            </p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Related Tools</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid sm:grid-cols-3 gap-4">
            <a href="/calculators/golden-ratio-calculator" className="p-4 rounded-lg border hover:bg-muted transition-colors">
              <p className="font-semibold text-sm">Golden Ratio Calculator</p>
              <p className="text-xs text-muted-foreground">Calculate golden ratio proportions</p>
            </a>
            <a href="/calculators/geometric-sequence-calculator" className="p-4 rounded-lg border hover:bg-muted transition-colors">
              <p className="font-semibold text-sm">Geometric Sequence Calculator</p>
              <p className="text-xs text-muted-foreground">Calculate geometric progressions</p>
            </a>
            <a href="/calculators/arithmetic-sequence-calculator" className="p-4 rounded-lg border hover:bg-muted transition-colors">
              <p className="font-semibold text-sm">Arithmetic Sequence Calculator</p>
              <p className="text-xs text-muted-foreground">Calculate arithmetic progressions</p>
            </a>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
