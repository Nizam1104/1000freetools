"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function FibonacciGenerator() {
  const [mode, setMode] = useState<"sequence" | "nth">("sequence");
  const [terms, setTerms] = useState("");
  const [result, setResult] = useState<{
    sequence?: number[];
    nthValue?: number;
    n: number;
  } | null>(null);
  const [error, setError] = useState("");

  const generateFibonacci = (n: number): number[] => {
    if (n <= 0) return [];
    if (n === 1) return [0];

    const seq = [0, 1];
    for (let i = 2; i < n; i++) {
      seq.push(seq[i - 1] + seq[i - 2]);
    }
    return seq;
  };

  const getNthFibonacci = (n: number): number => {
    if (n <= 0) return 0;
    if (n === 1) return 0;
    if (n === 2) return 1;

    let a = 0, b = 1;
    for (let i = 3; i <= n; i++) {
      const temp = a + b;
      a = b;
      b = temp;
    }
    return b;
  };

  const calculate = () => {
    const n = parseInt(terms);

    if (isNaN(n) || n <= 0) {
      setError("Please enter a positive integer");
      setResult(null);
      return;
    }

    if (n > 10000) {
      setError("Please enter a number up to 10,000 for performance reasons");
      setResult(null);
      return;
    }

    setError("");

    if (mode === "sequence") {
      setResult({
        sequence: generateFibonacci(n),
        n,
      });
    } else {
      setResult({
        nthValue: getNthFibonacci(n),
        n,
      });
    }
  };

  const reset = () => {
    setTerms("");
    setResult(null);
    setError("");
  };

  const loadExample = (n: string) => {
    setTerms(n);
    setResult(null);
    setError("");
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      <div className="mb-8">
        <h1 className="text-3xl font-semibold mb-2">Fibonacci Sequence Generator – Calculate Fibonacci Numbers Online</h1>
        <p className="text-muted-foreground">
          Generate the Fibonacci sequence up to any number of terms or find the nth Fibonacci number with our free online Fibonacci calculator. Fast and accurate for any value of n.
        </p>
      </div>

      <div className="space-y-4">
        <div>
          <Label>Mode</Label>
          <Select value={mode} onValueChange={(v) => setMode(v as typeof mode)}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="sequence">Generate Sequence (first n terms)</SelectItem>
              <SelectItem value="nth">Find nth Fibonacci Number</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label>{mode === "sequence" ? "Number of Terms" : "Position (n)"}</Label>
          <Input
            type="number"
            placeholder={mode === "sequence" ? "e.g., 10" : "e.g., 10"}
            value={terms}
            onChange={(e) => setTerms(e.target.value)}
          />
        </div>

        <div className="flex gap-2 flex-wrap">
          <Button onClick={calculate}>Calculate</Button>
          <Button variant="outline" onClick={reset}>Reset</Button>
        </div>

        <div className="flex flex-wrap gap-2">
          <span className="text-sm text-muted-foreground self-center">Examples:</span>
          <Button variant="ghost" size="sm" onClick={() => loadExample("10")}>10 terms</Button>
          <Button variant="ghost" size="sm" onClick={() => loadExample("15")}>15 terms</Button>
          <Button variant="ghost" size="sm" onClick={() => loadExample("20")}>20 terms</Button>
          <Button variant="ghost" size="sm" onClick={() => loadExample("50")}>50th term</Button>
          <Button variant="ghost" size="sm" onClick={() => loadExample("100")}>100th term</Button>
          <Button variant="ghost" size="sm" onClick={() => loadExample("500")}>500th term</Button>
        </div>

        {error && (
          <div className="p-4 bg-destructive/10 text-destructive rounded-md">
            <p className="text-sm">{error}</p>
          </div>
        )}

        {result && (
          <div className="space-y-4">
            {mode === "sequence" && result.sequence && (
              <div className="p-6 bg-muted rounded-lg">
                <p className="text-sm text-muted-foreground mb-3">First {result.n} Fibonacci Numbers</p>
                <div className="flex flex-wrap gap-2">
                  {result.sequence.map((num, idx) => (
                    <div key={idx} className="px-3 py-2 bg-background rounded-lg border text-center min-w-[60px]">
                      <p className="text-xs text-muted-foreground">F({idx})</p>
                      <p className="font-semibold">{num}</p>
                    </div>
                  ))}
                </div>
                <p className="text-sm text-muted-foreground mt-4">
                  Sequence: {result.sequence.join(", ")}
                </p>
              </div>
            )}

            {mode === "nth" && result.nthValue !== undefined && (
              <div className="p-6 bg-muted rounded-lg text-center">
                <p className="text-sm text-muted-foreground mb-2">The {result.n}{result.n === 1 ? "st" : result.n === 2 ? "nd" : result.n === 3 ? "rd" : "th"} Fibonacci Number</p>
                <p className="text-5xl font-bold">{result.nthValue}</p>
                <p className="text-sm text-muted-foreground mt-2 font-mono">
                  F({result.n}) = {result.nthValue}
                </p>
              </div>
            )}
          </div>
        )}
      </div>

      <section className="border-t pt-8 space-y-6">
        <h2 className="text-2xl font-semibold">Understanding the Fibonacci Sequence</h2>
        <p className="text-muted-foreground">
          The Fibonacci sequence is one of the most famous patterns in mathematics. It starts with 0 and 1, then each subsequent number is the sum of the two preceding numbers: 0, 1, 1, 2, 3, 5, 8, 13, 21, 34, and so on. The pattern continues infinitely.
        </p>
        <p className="text-muted-foreground">
          What makes Fibonacci numbers special is their appearance throughout nature. Sunflower seeds spiral in Fibonacci patterns. Pinecones and pineapples display Fibonacci numbers in their scales. The arrangement of leaves on stems often follows Fibonacci ratios. Even the breeding pattern of rabbits that Fibonacci originally studied follows this sequence.
        </p>
      </section>

      <section className="border-t pt-8 space-y-6">
        <h3 className="text-xl font-semibold">The Fibonacci Formula</h3>
        <div className="p-6 bg-muted rounded-lg">
          <p className="text-sm mb-4">The sequence follows a simple recursive rule:</p>
          <div className="font-mono text-center text-lg p-4 bg-background rounded">
            F(0) = 0<br />
            F(1) = 1<br />
            F(n) = F(n-1) + F(n-2) for n ≥ 2
          </div>
          <p className="text-sm mt-4 text-muted-foreground">
            There's also a closed-form formula called Binet's formula that lets you calculate any Fibonacci number directly without computing all the previous ones. It involves the golden ratio φ = (1 + √5) / 2.
          </p>
        </div>
      </section>

      <section className="border-t pt-8 space-y-6">
        <h3 className="text-xl font-semibold">Worked Examples</h3>
        <div className="space-y-4">
          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-3">Example 1: First 10 Fibonacci Numbers</h4>
            <div className="font-mono text-sm space-y-2">
              <div>F(0) = 0</div>
              <div>F(1) = 1</div>
              <div>F(2) = 0 + 1 = 1</div>
              <div>F(3) = 1 + 1 = 2</div>
              <div>F(4) = 1 + 2 = 3</div>
              <div>F(5) = 2 + 3 = 5</div>
              <div>F(6) = 3 + 5 = 8</div>
              <div>F(7) = 5 + 8 = 13</div>
              <div>F(8) = 8 + 13 = 21</div>
              <div>F(9) = 13 + 21 = 34</div>
              <div className="text-muted-foreground mt-2">Sequence: 0, 1, 1, 2, 3, 5, 8, 13, 21, 34</div>
            </div>
          </div>

          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-3">Example 2: Find F(12)</h4>
            <div className="font-mono text-sm space-y-2">
              <div>Continue from F(9) = 34</div>
              <div>F(10) = 21 + 34 = 55</div>
              <div>F(11) = 34 + 55 = 89</div>
              <div>F(12) = 55 + 89 = 144</div>
              <div className="text-muted-foreground mt-2">The 12th Fibonacci number is 144</div>
            </div>
          </div>

          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-3">Example 3: The Golden Ratio Connection</h4>
            <div className="font-mono text-sm space-y-2">
              <div>Ratio of consecutive Fibonacci numbers approaches φ:</div>
              <div>8 / 5 = 1.6</div>
              <div>13 / 8 = 1.625</div>
              <div>21 / 13 ≈ 1.615</div>
              <div>34 / 21 ≈ 1.619</div>
              <div>55 / 34 ≈ 1.6176</div>
              <div>φ = (1 + √5) / 2 ≈ 1.618034...</div>
              <div className="text-muted-foreground mt-2">The ratios converge to the golden ratio!</div>
            </div>
          </div>

          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-3">Example 4: Fibonacci in Nature</h4>
            <div className="text-sm space-y-2">
              <p>A sunflower typically has:</p>
              <ul className="list-disc list-inside text-muted-foreground">
                <li>34 spirals in one direction</li>
                <li>55 spirals in the other direction</li>
                <li>Both are consecutive Fibonacci numbers</li>
              </ul>
              <p className="text-muted-foreground mt-2">This arrangement maximizes seed packing efficiency.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t pt-8 space-y-6">
        <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg">
          <h4 className="font-semibold text-sm mb-2 text-amber-800">Quick Fact</h4>
          <p className="text-sm text-amber-700">
            Leonardo Fibonacci introduced this sequence to Western mathematics in his 1202 book Liber Abaci. However, Indian mathematicians had described the pattern centuries earlier. Fibonacci's real name was Leonardo of Pisa, and his book revolutionized European mathematics by introducing Hindu-Arabic numerals.
          </p>
        </div>
      </section>

      <section className="border-t pt-8 space-y-6">
        <h3 className="text-xl font-semibold">Frequently Asked Questions</h3>
        <div className="space-y-6">
          <div>
            <h4 className="font-semibold text-sm mb-2">Why does the sequence start with 0?</h4>
            <p className="text-sm text-muted-foreground">
              Modern mathematicians typically start with F(0) = 0 for consistency with the recursive formula. Some older sources start with 1, 1 instead. Both conventions produce the same sequence after the first term.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">How do I calculate large Fibonacci numbers?</h4>
            <p className="text-sm text-muted-foreground">
              For large n, use Binet's formula: F(n) = (φⁿ - ψⁿ) / √5, where φ = (1+√5)/2 and ψ = (1-√5)/2. For very large n, the ψⁿ term becomes negligible, so F(n) ≈ φⁿ/√5 rounded to the nearest integer.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">What's the relationship with the golden ratio?</h4>
            <p className="text-sm text-muted-foreground">
              As you go further in the sequence, the ratio of consecutive Fibonacci numbers gets closer and closer to φ (approximately 1.618). This is why Fibonacci spirals appear in nature – they're the most efficient packing pattern.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">Are there negative Fibonacci numbers?</h4>
            <p className="text-sm text-muted-foreground">
              Yes! The sequence extends backward: F(-1) = 1, F(-2) = -1, F(-3) = 2, F(-4) = -3. The pattern alternates signs: 0, 1, -1, 2, -3, 5, -8, 13, -21...
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">Where else do Fibonacci numbers appear?</h4>
            <p className="text-sm text-muted-foreground">
              Beyond nature, Fibonacci numbers appear in computer algorithms (Euclidean algorithm analysis), financial markets (Fibonacci retracements), art and architecture (golden rectangles), and even in the family tree of honeybees.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">Can I find Fibonacci numbers in Pascal's triangle?</h4>
            <p className="text-sm text-muted-foreground">
              Yes! Add the numbers along the shallow diagonals of Pascal's triangle, and you get the Fibonacci sequence. This surprising connection links two fundamental mathematical patterns.
            </p>
          </div>
        </div>
      </section>

      <section className="border-t pt-8 space-y-6">
        <h3 className="text-xl font-semibold">Related Math Tools</h3>
        <div className="grid sm:grid-cols-3 gap-4">
          <a href="/math-tools/geometric-sequence-calculator" className="p-4 rounded-lg border hover:bg-muted transition-colors">
            <p className="font-semibold text-sm">Geometric Sequence</p>
            <p className="text-xs text-muted-foreground">Another number pattern</p>
          </a>
          <a href="/math-tools/arithmetic-sequence-calculator" className="p-4 rounded-lg border hover:bg-muted transition-colors">
            <p className="font-semibold text-sm">Arithmetic Sequence</p>
            <p className="text-xs text-muted-foreground">Linear number patterns</p>
          </a>
          <a href="/math-tools/golden-ratio-calculator" className="p-4 rounded-lg border hover:bg-muted transition-colors">
            <p className="font-semibold text-sm">Golden Ratio</p>
            <p className="text-xs text-muted-foreground">Calculate φ</p>
          </a>
        </div>
      </section>
    </div>
  );
}
