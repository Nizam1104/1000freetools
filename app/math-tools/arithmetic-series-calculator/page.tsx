"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function ArithmeticSeriesCalculator() {
  const [firstTerm, setFirstTerm] = useState("");
  const [commonDiff, setCommonDiff] = useState("");
  const [numTerms, setNumTerms] = useState("");
  const [lastTerm, setLastTerm] = useState("");
  const [result, setResult] = useState<{
    sum: number;
    terms: number[];
    steps: string[];
  } | null>(null);
  const [error, setError] = useState("");

  const calculate = () => {
    setError("");
    setResult(null);

    const a1 = parseFloat(firstTerm);
    const d = parseFloat(commonDiff);
    const n = parseInt(numTerms);
    const an = lastTerm ? parseFloat(lastTerm) : null;

    if (isNaN(a1)) {
      setError("Please enter the first term");
      return;
    }

    if (isNaN(n) || n < 1) {
      setError("Please enter at least 1 term");
      return;
    }

    if (n > 5000) {
      setError("Please enter 5000 or fewer terms");
      return;
    }

    try {
      // Calculate last term if not provided
      const last = an !== null ? an : a1 + (n - 1) * d;
      
      // Calculate sum: Sn = n/2 * (a1 + an)
      const sum = (n / 2) * (a1 + last);

      // Generate terms for display
      const terms: number[] = [];
      for (let i = 0; i < Math.min(n, 20); i++) {
        terms.push(a1 + i * d);
      }

      const steps = [
        `Given: a₁ = ${a1}, n = ${n}${d !== undefined ? `, d = ${d}` : ''}${an !== null ? `, aₙ = ${an}` : ''}`,
        ``,
        `Step 1: Find the last term (if not given)`,
        `aₙ = a₁ + (n-1)d`,
        `aₙ = ${a1} + (${n}-1) × ${d} = ${a1} + ${(n - 1) * d} = ${last}`,
        ``,
        `Step 2: Apply the sum formula`,
        `Sₙ = n/2 × (a₁ + aₙ)`,
        `Sₙ = ${n}/2 × (${a1} + ${last})`,
        `Sₙ = ${n/2} × ${a1 + last}`,
        `Sₙ = ${sum}`,
        ``,
        `Final Answer: The sum of ${n} terms is ${sum}`
      ];

      setResult({
        sum: Math.round(sum * 1000000) / 1000000,
        terms,
        steps
      });
    } catch (e) {
      setError("Unable to calculate. Please check your inputs.");
    }
  };

  const reset = () => {
    setFirstTerm("");
    setCommonDiff("");
    setNumTerms("");
    setLastTerm("");
    setResult(null);
    setError("");
  };

  const loadExample = (exampleNum?: number) => {
    const examples = [
      { firstTerm: "5", commonDiff: "3", numTerms: "15", lastTerm: "" },
      { firstTerm: "2", commonDiff: "2", numTerms: "50", lastTerm: "" },
      { firstTerm: "10", commonDiff: "-2", numTerms: "8", lastTerm: "" },
      { firstTerm: "1", commonDiff: "1", numTerms: "100", lastTerm: "" },
      { firstTerm: "7", commonDiff: "0.5", numTerms: "20", lastTerm: "" },
    ];
    const example = examples[exampleNum !== undefined ? exampleNum % examples.length : 0];
    setFirstTerm(example.firstTerm);
    setCommonDiff(example.commonDiff);
    setNumTerms(example.numTerms);
    setLastTerm(example.lastTerm);
    setResult(null);
    setError("");
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      <div className="mb-8">
        <h1 className="text-3xl font-semibold mb-2">Sum of Arithmetic Series Calculator</h1>
        <p className="text-muted-foreground">
          Calculate the sum of an arithmetic series with our free online calculator. Enter the first term, common difference, and number of terms to find the sum instantly with step-by-step solutions.
        </p>
      </div>

      <div className="space-y-4">
        <div className="grid md:grid-cols-4 gap-4">
          <div>
            <Label>First Term (a₁):</Label>
            <Input
              type="number"
              placeholder="e.g., 5"
              value={firstTerm}
              onChange={(e) => setFirstTerm(e.target.value)}
            />
          </div>
          <div>
            <Label>Common Difference (d):</Label>
            <Input
              type="number"
              placeholder="e.g., 3"
              value={commonDiff}
              onChange={(e) => setCommonDiff(e.target.value)}
            />
          </div>
          <div>
            <Label>Number of Terms (n):</Label>
            <Input
              type="number"
              placeholder="e.g., 15"
              value={numTerms}
              onChange={(e) => setNumTerms(e.target.value)}
            />
          </div>
          <div>
            <Label>Last Term (aₙ) - Optional:</Label>
            <Input
              type="number"
              placeholder="Auto-calculated"
              value={lastTerm}
              onChange={(e) => setLastTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="flex gap-2 flex-wrap">
          <Button onClick={calculate}>Calculate Sum</Button>
          <Button variant="outline" onClick={reset}>Reset</Button>
          <Select onValueChange={(v) => loadExample(parseInt(v))}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Load Example" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="0">Example 1: 5, 3, 15 terms</SelectItem>
              <SelectItem value="1">Example 2: 2, 2, 50 terms</SelectItem>
              <SelectItem value="2">Example 3: 10, -2, 8 terms</SelectItem>
              <SelectItem value="3">Example 4: 1, 1, 100 terms</SelectItem>
              <SelectItem value="4">Example 5: 7, 0.5, 20 terms</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {error && (
          <div className="p-4 bg-destructive/10 text-destructive rounded-md">
            <p className="text-sm">{error}</p>
          </div>
        )}

        {result && (
          <div className="space-y-4">
            <div className="p-6 bg-muted rounded-lg text-center">
              <p className="text-sm text-muted-foreground mb-2">Sum of Series (Sₙ)</p>
              <p className="text-5xl font-bold">{result.sum}</p>
              <p className="text-sm text-muted-foreground mt-2">
                Sum of {numTerms} terms
              </p>
            </div>

            {result.terms.length > 0 && (
              <div className="p-4 border rounded-lg">
                <h4 className="font-semibold text-sm mb-3">First {result.terms.length} Terms</h4>
                <div className="flex flex-wrap gap-2">
                  {result.terms.map((term, i) => (
                    <div key={i} className="p-2 bg-muted rounded text-center min-w-12">
                      <p className="text-xs text-muted-foreground">{term}</p>
                    </div>
                  ))}
                  {parseInt(numTerms) > 20 && (
                    <div className="p-2 text-muted-foreground">... and {parseInt(numTerms) - 20} more</div>
                  )}
                </div>
              </div>
            )}

            <div className="p-4 border rounded-lg">
              <h4 className="font-semibold text-sm mb-3">Step-by-Step Solution</h4>
              <div className="space-y-2 font-mono text-sm bg-muted p-3 rounded">
                {result.steps.map((step, i) => (
                  <div key={i} className={step === "" ? "h-4" : ""}>
                    {step}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      <section className="border-t pt-8 space-y-6">
        <h2 className="text-2xl font-semibold">Understanding Arithmetic Series</h2>
        <p className="text-muted-foreground">
          An arithmetic series is the sum of an arithmetic sequence – a list of numbers where each term increases or decreases by the same amount. That constant amount is called the "common difference." You see arithmetic series everywhere: calculating total savings with regular deposits, finding the sum of consecutive numbers, or working out cumulative distances when speed changes steadily.
        </p>
        <p className="text-muted-foreground">
          The beauty of arithmetic series is that you don't need to add every single term. There's a clean formula that gives you the sum instantly, no matter how many terms you have.
        </p>
      </section>

      <section className="border-t pt-8 space-y-6">
        <h3 className="text-xl font-semibold">The Sum Formula</h3>
        <div className="p-4 bg-muted rounded-lg">
          <p className="font-mono text-center text-lg mb-2">Sₙ = n/2 × (a₁ + aₙ)</p>
          <p className="text-sm text-muted-foreground text-center">
            Where Sₙ = sum, n = number of terms, a₁ = first term, aₙ = last term
          </p>
        </div>
        <p className="text-muted-foreground">
          If you don't know the last term, you can find it first using: aₙ = a₁ + (n-1)d, where d is the common difference. Then plug it into the sum formula. Some people prefer the combined version: Sₙ = n/2 × [2a₁ + (n-1)d], which skips the intermediate step.
        </p>
      </section>

      <section className="border-t pt-8 space-y-6">
        <h3 className="text-xl font-semibold">Worked Examples</h3>
        
        <div className="space-y-6">
          <div className="p-5 border rounded-lg">
            <h4 className="font-semibold mb-2">Example 1: Sum of the first 15 terms starting at 5 with difference 3</h4>
            <p className="text-sm text-muted-foreground mb-3">
              Sequence: 5, 8, 11, 14, 17, ... (15 terms total)
            </p>
            <div className="space-y-2 text-sm font-mono bg-muted p-3 rounded">
              <p>Step 1: Find the 15th term</p>
              <p>a₁₅ = 5 + (15-1) × 3 = 5 + 42 = 47</p>
              <p>Step 2: Apply the sum formula</p>
              <p>S₁₅ = 15/2 × (5 + 47) = 7.5 × 52 = 390</p>
            </div>
            <p className="text-sm text-muted-foreground mt-3">
              The sum of all 15 terms is 390.
            </p>
          </div>

          <div className="p-5 border rounded-lg">
            <h4 className="font-semibold mb-2">Example 2: Sum of integers from 1 to 100</h4>
            <p className="text-sm text-muted-foreground mb-3">
              This is the famous problem young Gauss supposedly solved in seconds.
            </p>
            <div className="space-y-2 text-sm font-mono bg-muted p-3 rounded">
              <p>a₁ = 1, d = 1, n = 100</p>
              <p>a₁₀₀ = 1 + (100-1) × 1 = 100</p>
              <p>S₁₀₀ = 100/2 × (1 + 100) = 50 × 101 = 5,050</p>
            </div>
            <p className="text-sm text-muted-foreground mt-3">
              The sum of all integers from 1 to 100 is 5,050.
            </p>
          </div>

          <div className="p-5 border rounded-lg">
            <h4 className="font-semibold mb-2">Example 3: Decreasing sequence with negative difference</h4>
            <p className="text-sm text-muted-foreground mb-3">
              Find the sum of 8 terms starting at 10 with common difference -2.
            </p>
            <div className="space-y-2 text-sm font-mono bg-muted p-3 rounded">
              <p>Sequence: 10, 8, 6, 4, 2, 0, -2, -4</p>
              <p>a₈ = 10 + (8-1) × (-2) = 10 - 14 = -4</p>
              <p>S₈ = 8/2 × (10 + (-4)) = 4 × 6 = 24</p>
            </div>
            <p className="text-sm text-muted-foreground mt-3">
              Even with negative terms, the formula works the same way. The sum is 24.
            </p>
          </div>
        </div>
      </section>

      <section className="border-t pt-8 space-y-6">
        <h3 className="text-xl font-semibold">Quick Fact</h3>
        <div className="p-5 bg-accent/10 rounded-lg">
          <p className="text-muted-foreground">
            The story goes that 8-year-old Carl Friedrich Gauss was told to add all numbers from 1 to 100 as busywork. He instantly realized that pairing 1+100, 2+99, 3+98, and so on always gives 101, and there are 50 such pairs. So 50 × 101 = 5,050. This insight is essentially the arithmetic series formula in disguise. Whether the story is true or not, it's a brilliant way to understand why the formula works.
          </p>
        </div>
      </section>

      <section className="border-t pt-8 space-y-6">
        <h3 className="text-xl font-semibold">Frequently Asked Questions</h3>
        <div className="space-y-6">
          <div>
            <h4 className="font-semibold text-sm mb-2">What's the difference between an arithmetic sequence and an arithmetic series?</h4>
            <p className="text-sm text-muted-foreground">
              A sequence is the list of numbers itself (like 2, 5, 8, 11, 14). A series is the sum of those numbers (2 + 5 + 8 + 11 + 14 = 40). The sequence shows the pattern; the series gives you the total.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">Can the common difference be negative?</h4>
            <p className="text-sm text-muted-foreground">
              Absolutely. A negative common difference means the sequence decreases. For example, 20, 17, 14, 11, 8 has a common difference of -3. The sum formula works exactly the same way – just plug in the negative value for d.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">What if I only know the first term and common difference, not the last term?</h4>
            <p className="text-sm text-muted-foreground">
              No problem. First calculate the last term using aₙ = a₁ + (n-1)d, then use the sum formula. Or use the combined formula Sₙ = n/2 × [2a₁ + (n-1)d] which does both steps at once.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">Does this work for decimal or fractional terms?</h4>
            <p className="text-sm text-muted-foreground">
              Yes. The formula doesn't care whether your terms are integers, decimals, or fractions. As long as the difference between consecutive terms is constant, it's an arithmetic series and the formula applies.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">How is this different from a geometric series?</h4>
            <p className="text-sm text-muted-foreground">
              In an arithmetic series, you add the same amount each time (like +3). In a geometric series, you multiply by the same amount each time (like ×2). They have completely different formulas. Arithmetic series grow linearly; geometric series grow exponentially.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">Why does the formula use n/2? Where does that come from?</h4>
            <p className="text-sm text-muted-foreground">
              Think of pairing terms from opposite ends: first + last, second + second-to-last, and so on. Each pair sums to the same value (a₁ + aₙ). With n terms, you have n/2 such pairs. That's why the formula is n/2 × (a₁ + aₙ). It's the same insight Gauss supposedly had as a child.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
