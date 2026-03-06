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

export default function GeometricSequenceCalculator() {
  const [firstTerm, setFirstTerm] = useState<string>("");
  const [commonRatio, setCommonRatio] = useState<string>("");
  const [n, setN] = useState<string>("");
  const [result, setResult] = useState<{ nthTerm: number; sum: number; sequence: number[] } | null>(null);

  const calculate = () => {
    const a = parseFloat(firstTerm);
    const r = parseFloat(commonRatio);
    const nVal = parseInt(n);
    
    if (!isNaN(a) && !isNaN(r) && !isNaN(nVal) && nVal > 0) {
      const nthTerm = a * Math.pow(r, nVal - 1);
      let sum: number;
      if (r === 1) {
        sum = a * nVal;
      } else {
        sum = a * (1 - Math.pow(r, nVal)) / (1 - r);
      }
      const sequence: number[] = [];
      for (let i = 0; i < nVal; i++) {
        sequence.push(a * Math.pow(r, i));
      }
      setResult({ nthTerm, sum, sequence });
    }
  };

  const reset = () => {
    setFirstTerm("");
    setCommonRatio("");
    setN("");
    setResult(null);
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <Card>
        
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="text-sm text-muted-foreground mb-2 block">First term (a)</label>
                <Input
                  type="number"
                  placeholder="e.g., 1"
                  step="any"
                  value={firstTerm}
                  onChange={(e) => setFirstTerm(e.target.value)}
                />
              </div>
              <div>
                <label className="text-sm text-muted-foreground mb-2 block">Common ratio (r)</label>
                <Input
                  type="number"
                  placeholder="e.g., 2"
                  step="any"
                  value={commonRatio}
                  onChange={(e) => setCommonRatio(e.target.value)}
                />
              </div>
              <div>
                <label className="text-sm text-muted-foreground mb-2 block">n (terms)</label>
                <Input
                  type="number"
                  placeholder="e.g., 10"
                  min="1"
                  value={n}
                  onChange={(e) => setN(e.target.value)}
                />
              </div>
            </div>
            <div className="flex gap-2">
              <Button onClick={calculate}>Calculate</Button>
              <Button variant="outline" onClick={reset}>Reset</Button>
            </div>
            {result && (
              <div className="p-4 bg-muted rounded-md space-y-3">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">n-th Term</p>
                    <p className="text-xl font-semibold">{result.nthTerm}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Sum of n terms</p>
                    <p className="text-xl font-semibold">{result.sum}</p>
                  </div>
                </div>
                <div className="pt-2 border-t">
                  <p className="text-sm text-muted-foreground">Sequence</p>
                  <p className="text-sm">{result.sequence.map((n) => n.toFixed(2)).join(", ")}</p>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>How to Calculate Geometric Sequences</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            <strong>Step 1:</strong> Enter the first term (a) of your sequence.
          </p>
          <p className="text-sm text-muted-foreground">
            <strong>Step 2:</strong> Enter the common ratio (r) - the factor each term is multiplied by.
          </p>
          <p className="text-sm text-muted-foreground">
            <strong>Step 3:</strong> Enter how many terms (n) to calculate, then click Calculate.
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Understanding Geometric Sequences</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <h4 className="font-semibold text-sm mb-2">What Is a Geometric Sequence</h4>
            <p className="text-sm text-muted-foreground">
              A geometric sequence multiplies each term by a constant called the common ratio. Start with 2 and ratio 3: 2, 6, 18, 54, 162... Each term is 3x the previous one. This is different from arithmetic sequences that add a constant amount.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-sm mb-2">The Geometric Sequence Formula</h4>
            <p className="text-sm text-muted-foreground mb-3">
              Two key formulas:
            </p>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="p-4 bg-muted rounded-md">
                <p className="font-mono text-sm mb-2">n-th Term: aₙ = a × r^(n-1)</p>
                <p className="text-xs text-muted-foreground">
                  Find any term directly. For a=2, r=3, the 5th term is 2 × 3⁴ = 2 × 81 = 162.
                </p>
              </div>
              <div className="p-4 bg-muted rounded-md">
                <p className="font-mono text-sm mb-2">Sum: Sₙ = a(1-rⁿ)/(1-r)</p>
                <p className="text-xs text-muted-foreground">
                  Sum of first n terms. For a=2, r=3, n=5: S₅ = 2(1-3⁵)/(1-3) = 2(1-243)/(-2) = 242.
                </p>
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-sm mb-2">Where Geometric Sequences Appear</h4>
            <p className="text-sm text-muted-foreground">
              Compound interest is geometric - your money grows by a fixed percentage each year. Population growth follows geometric patterns. Computer algorithms often have geometric time complexity. Radioactive decay is geometric with ratio less than 1.
            </p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Geometric Sequence Examples Reference</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>First Term (a)</TableHead>
                <TableHead>Ratio (r)</TableHead>
                <TableHead>First 5 Terms</TableHead>
                <TableHead>Application</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-mono">1</TableCell>
                <TableCell className="font-mono">2</TableCell>
                <TableCell className="font-mono">1, 2, 4, 8, 16</TableCell>
                <TableCell>Binary numbers, doubling</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-mono">100</TableCell>
                <TableCell className="font-mono">1.05</TableCell>
                <TableCell className="font-mono">100, 105, 110.25, 115.76, 121.55</TableCell>
                <TableCell>5% compound interest</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-mono">1000</TableCell>
                <TableCell className="font-mono">0.5</TableCell>
                <TableCell className="font-mono">1000, 500, 250, 125, 62.5</TableCell>
                <TableCell>Radioactive half-life</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-mono">3</TableCell>
                <TableCell className="font-mono">3</TableCell>
                <TableCell className="font-mono">3, 9, 27, 81, 243</TableCell>
                <TableCell>Powers of 3</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-mono">1</TableCell>
                <TableCell className="font-mono">-2</TableCell>
                <TableCell className="font-mono">1, -2, 4, -8, 16</TableCell>
                <TableCell>Alternating sequence</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-mono">0.1</TableCell>
                <TableCell className="font-mono">10</TableCell>
                <TableCell className="font-mono">0.1, 1, 10, 100, 1000</TableCell>
                <TableCell>Orders of magnitude</TableCell>
              </TableRow>
            </TableBody>
          </Table>
          <p className="text-xs text-muted-foreground mt-3">
            When r &gt; 1, the sequence grows exponentially. When 0 &lt; r &lt; 1, it decays. When r is negative, terms alternate signs.
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Frequently Asked Questions</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <h4 className="font-semibold text-sm mb-2">What is the formula for geometric sequences?</h4>
            <p className="text-sm text-muted-foreground">
              The n-th term is aₙ = a × r^(n-1), where a is the first term and r is the common ratio. The sum of n terms is Sₙ = a(1-rⁿ)/(1-r) when r ≠ 1.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-sm mb-2">How do you find the common ratio?</h4>
            <p className="text-sm text-muted-foreground">
              Divide any term by the previous term. For 2, 6, 18, 54: ratio = 6/2 = 3, or 18/6 = 3, or 54/18 = 3. The ratio is constant throughout the sequence.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-sm mb-2">What's the difference between geometric and arithmetic sequences?</h4>
            <p className="text-sm text-muted-foreground">
              Arithmetic sequences add a constant (2, 5, 8, 11... adds 3 each time). Geometric sequences multiply by a constant (2, 6, 18, 54... multiplies by 3). Geometric growth is much faster than arithmetic growth.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-sm mb-2">Can the common ratio be negative?</h4>
            <p className="text-sm text-muted-foreground">
              Yes. A negative ratio creates an alternating sequence where signs flip each term. For a=1, r=-2: 1, -2, 4, -8, 16, -32... The absolute values still follow the geometric pattern.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-sm mb-2">What happens when the ratio is less than 1?</h4>
            <p className="text-sm text-muted-foreground">
              The sequence decays toward zero. For a=100, r=0.5: 100, 50, 25, 12.5, 6.25... This models radioactive decay, depreciation, and diminishing returns. The sum converges to a finite value as n approaches infinity.
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
            <a href="/calculators/arithmetic-sequence-calculator" className="p-4 rounded-lg border hover:bg-muted transition-colors">
              <p className="font-semibold text-sm">Arithmetic Sequence Calculator</p>
              <p className="text-xs text-muted-foreground">Calculate sequences with constant difference</p>
            </a>
            <a href="/calculators/fibonacci-generator" className="p-4 rounded-lg border hover:bg-muted transition-colors">
              <p className="font-semibold text-sm">Fibonacci Generator</p>
              <p className="text-xs text-muted-foreground">Generate Fibonacci sequence</p>
            </a>
            <a href="/calculators/compound-interest-calculator" className="p-4 rounded-lg border hover:bg-muted transition-colors">
              <p className="font-semibold text-sm">Compound Interest Calculator</p>
              <p className="text-xs text-muted-foreground">Calculate geometric growth in investments</p>
            </a>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
