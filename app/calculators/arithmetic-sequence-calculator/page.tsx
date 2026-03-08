"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function ArithmeticSequenceCalculator() {
  const [firstTerm, setFirstTerm] = useState<string>("");
  const [commonDiff, setCommonDiff] = useState<string>("");
  const [n, setN] = useState<string>("");
  const [result, setResult] = useState<{ nthTerm: number; sum: number; sequence: number[] } | null>(null);

  const calculate = () => {
    const a = parseFloat(firstTerm);
    const d = parseFloat(commonDiff);
    const nVal = parseInt(n);
    
    if (!isNaN(a) && !isNaN(d) && !isNaN(nVal) && nVal > 0) {
      const nthTerm = a + (nVal - 1) * d;
      const sum = (nVal / 2) * (2 * a + (nVal - 1) * d);
      const sequence: number[] = [];
      for (let i = 0; i < nVal; i++) {
        sequence.push(a + i * d);
      }
      setResult({ nthTerm, sum, sequence });
    }
  };

  const reset = () => {
    setFirstTerm("");
    setCommonDiff("");
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
                  placeholder="e.g., 2"
                  step="any"
                  value={firstTerm}
                  onChange={(e) => setFirstTerm(e.target.value)}
                />
              </div>
              <div>
                <label className="text-sm text-muted-foreground mb-2 block">Common difference (d)</label>
                <Input
                  type="number"
                  placeholder="e.g., 3"
                  step="any"
                  value={commonDiff}
                  onChange={(e) => setCommonDiff(e.target.value)}
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
                  <p className="text-sm">{result.sequence.join(", ")}</p>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* How to Use Section */}
      <Card className="mt-6">
        <CardHeader>
          <CardTitle>How to Use This Arithmetic Sequence Calculator</CardTitle>
        </CardHeader>
        <CardContent>
          <ol className="space-y-3 list-decimal list-inside text-sm">
            <li>
              <strong>Enter the first term (a)</strong> - This is the starting number of your sequence. For example, if your sequence begins with 2, enter 2.
            </li>
            <li>
              <strong>Enter the common difference (d)</strong> - This is the constant amount added between each term. If your sequence goes 2, 5, 8, the common difference is 3.
            </li>
            <li>
              <strong>Enter the number of terms (n)</strong> - Specify how many terms you want to calculate. Enter a positive integer like 10 to see the first 10 terms.
            </li>
          </ol>
          <p className="mt-4 text-sm text-muted-foreground">
            Click <strong>Calculate</strong> to see the nth term, sum of all terms, and the complete sequence.
          </p>
        </CardContent>
      </Card>

      {/* Understanding Arithmetic Sequences */}
      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Understanding Arithmetic Sequences</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-sm">
          <p>
            An arithmetic sequence is a list of numbers where each term differs from the previous one by a constant amount. This constant is called the <strong>common difference</strong>.
          </p>
          <p>
            The <strong>first term</strong> (denoted as a or a₁) is where your sequence starts. The <strong>nth term</strong> (aₙ) is any term at position n in the sequence.
          </p>
          <p>
            For example, in the sequence 2, 5, 8, 11, 14:
          </p>
          <ul className="list-disc list-inside space-y-1 ml-4">
            <li>First term (a₁) = 2</li>
            <li>Common difference (d) = 3 (each term increases by 3)</li>
            <li>5th term (a₅) = 14</li>
          </ul>
          <p>
            Arithmetic sequences appear everywhere - from the evenly spaced rungs on a ladder to monthly savings with fixed deposits.
          </p>
        </CardContent>
      </Card>

      {/* Formulas Section */}
      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Arithmetic Sequence Formulas</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-sm">
          <div className="p-4 bg-muted rounded-md">
            <p className="font-semibold mb-2">nth Term Formula</p>
            <p className="font-mono text-base">aₙ = a₁ + (n - 1)d</p>
            <p className="mt-2 text-muted-foreground">
              Find any term by knowing the first term, position, and common difference.
            </p>
          </div>

          <div className="p-4 bg-muted rounded-md">
            <p className="font-semibold mb-2">Sum of n Terms (Formula 1)</p>
            <p className="font-mono text-base">Sₙ = n/2 × (a₁ + aₙ)</p>
            <p className="mt-2 text-muted-foreground">
              Use when you know the first and nth terms.
            </p>
          </div>

          <div className="p-4 bg-muted rounded-md">
            <p className="font-semibold mb-2">Sum of n Terms (Formula 2)</p>
            <p className="font-mono text-base">Sₙ = n/2 × [2a₁ + (n - 1)d]</p>
            <p className="mt-2 text-muted-foreground">
              Use when you know the first term and common difference.
            </p>
          </div>

          <div className="p-4 bg-muted rounded-md">
            <p className="font-semibold mb-2">Common Difference</p>
            <p className="font-mono text-base">d = aₙ₊₁ - aₙ</p>
            <p className="mt-2 text-muted-foreground">
              Find the common difference by subtracting any term from the next term.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Examples Table */}
      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Arithmetic Sequence Examples</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4">Sequence</th>
                  <th className="text-left py-3 px-4">Common Difference (d)</th>
                  <th className="text-left py-3 px-4">Notes</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="py-3 px-4 font-mono">2, 5, 8, 11, 14...</td>
                  <td className="py-3 px-4">3</td>
                  <td className="py-3 px-4">Increasing sequence</td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 px-4 font-mono">10, 7, 4, 1, -2...</td>
                  <td className="py-3 px-4">-3</td>
                  <td className="py-3 px-4">Decreasing sequence</td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 px-4 font-mono">1, 3, 5, 7, 9...</td>
                  <td className="py-3 px-4">2</td>
                  <td className="py-3 px-4">Odd numbers</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-mono">5, 5, 5, 5...</td>
                  <td className="py-3 px-4">0</td>
                  <td className="py-3 px-4">Constant sequence</td>
                </tr>
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Real-World Applications */}
      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Real-World Applications</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-sm">
          <div>
            <p className="font-semibold">Staircase Design</p>
            <p className="text-muted-foreground">
              Building codes require uniform riser heights. If each step rises 7 inches, the total height follows an arithmetic sequence: 7, 14, 21, 28 inches...
            </p>
          </div>
          <div>
            <p className="font-semibold">Seating Arrangements</p>
            <p className="text-muted-foreground">
              Theater rows often increase by a fixed number of seats. Row 1 has 20 seats, row 2 has 22, row 3 has 24 - an arithmetic pattern with d = 2.
            </p>
          </div>
          <div>
            <p className="font-semibold">Salary Increments</p>
            <p className="text-muted-foreground">
              Annual raises of a fixed amount create arithmetic growth. Starting at $50,000 with $2,000 yearly raises: $50k, $52k, $54k, $56k...
            </p>
          </div>
          <div>
            <p className="font-semibold">Depreciation Schedules</p>
            <p className="text-muted-foreground">
              Straight-line depreciation reduces asset value by equal amounts each year. A $10,000 asset depreciating $1,000 annually: $10k, $9k, $8k, $7k...
            </p>
          </div>
        </CardContent>
      </Card>

      {/* FAQ Section */}
      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Frequently Asked Questions</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6 text-sm">
          <div>
            <p className="font-semibold mb-2">What is an arithmetic sequence?</p>
            <p className="text-muted-foreground">
              An arithmetic sequence is a sequence of numbers where the difference between any two consecutive terms is constant. This difference is called the common difference.
            </p>
          </div>
          <div>
            <p className="font-semibold mb-2">How do you find the nth term?</p>
            <p className="text-muted-foreground">
              Use the formula aₙ = a₁ + (n - 1)d, where a₁ is the first term, d is the common difference, and n is the position of the term you want to find.
            </p>
          </div>
          <div>
            <p className="font-semibold mb-2">What is the formula for the sum?</p>
            <p className="text-muted-foreground">
              The sum of the first n terms is Sₙ = n/2 × (a₁ + aₙ) or Sₙ = n/2 × [2a₁ + (n - 1)d]. Both formulas give the same result.
            </p>
          </div>
          <div>
            <p className="font-semibold mb-2">Can the common difference be negative?</p>
            <p className="text-muted-foreground">
              Yes. A negative common difference creates a decreasing sequence. For example, 10, 7, 4, 1 has d = -3.
            </p>
          </div>
          <div>
            <p className="font-semibold mb-2">How is arithmetic sequence different from geometric?</p>
            <p className="text-muted-foreground">
              In arithmetic sequences, you add a constant difference. In geometric sequences, you multiply by a constant ratio. Arithmetic: 2, 5, 8, 11 (add 3). Geometric: 2, 6, 18, 54 (multiply by 3).
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Related Tools */}    </div>
  );
}
