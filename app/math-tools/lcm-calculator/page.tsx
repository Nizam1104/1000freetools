"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function LcmCalculator() {
  const [num1, setNum1] = useState("");
  const [num2, setNum2] = useState("");
  const [num3, setNum3] = useState("");
  const [useThreeNumbers, setUseThreeNumbers] = useState(false);
  const [result, setResult] = useState<{
    lcm: number;
    gcd: number;
    steps: string[];
  } | null>(null);
  const [error, setError] = useState("");

  const gcd = (a: number, b: number): number => {
    while (b !== 0) {
      const temp = b;
      b = a % b;
      a = temp;
    }
    return a;
  };

  const lcm = (a: number, b: number): { lcm: number; gcd: number; steps: string[] } => {
    const gcdValue = gcd(a, b);
    const lcmValue = Math.abs(a * b) / gcdValue;

    const steps = [
      `Formula: LCM(a, b) = (a × b) / GCD(a, b)`,
      `Step 1: Find GCD(${a}, ${b}) = ${gcdValue}`,
      `Step 2: Calculate (${a} × ${b}) / ${gcdValue}`,
      `Step 3: ${a * b} / ${gcdValue} = ${lcmValue}`,
    ];

    return { lcm: lcmValue, gcd: gcdValue, steps };
  };

  const calculateLcm = () => {
    const n1 = parseInt(num1);
    const n2 = parseInt(num2);
    const n3 = useThreeNumbers ? parseInt(num3) : null;

    if (isNaN(n1) || isNaN(n2) || (useThreeNumbers && isNaN(n3!))) {
      setError("Please enter valid integers");
      setResult(null);
      return;
    }

    if (n1 <= 0 || n2 <= 0 || (useThreeNumbers && n3! <= 0)) {
      setError("Please enter positive integers");
      setResult(null);
      return;
    }

    setError("");
    let lcmResult: number;
    let gcdResult: number;
    let allSteps: string[] = [];

    if (useThreeNumbers && n3) {
      const first = lcm(n1, n2);
      const second = lcm(first.lcm, n3);
      lcmResult = second.lcm;
      gcdResult = second.gcd;
      allSteps = [
        `Finding LCM of ${n1}, ${n2}, and ${n3}`,
        "",
        `First, find LCM(${n1}, ${n2}):`,
        ...first.steps,
        "",
        `Then, find LCM(${first.lcm}, ${n3}):`,
        ...second.steps,
      ];
    } else {
      const res = lcm(n1, n2);
      lcmResult = res.lcm;
      gcdResult = res.gcd;
      allSteps = res.steps;
    }

    setResult({
      lcm: lcmResult,
      gcd: gcdResult,
      steps: allSteps,
    });
  };

  const reset = () => {
    setNum1("");
    setNum2("");
    setNum3("");
    setUseThreeNumbers(false);
    setResult(null);
    setError("");
  };

  const loadExample = (n1: string, n2: string, n3?: string) => {
    setNum1(n1);
    setNum2(n2);
    if (n3) {
      setNum3(n3);
      setUseThreeNumbers(true);
    } else {
      setNum3("");
      setUseThreeNumbers(false);
    }
    setResult(null);
    setError("");
  };

  return (
    <div className="w-full mx-auto space-y-8">
      <div className="mb-8">
        <h1 className="text-3xl font-semibold mb-2">LCM Calculator – Find Least Common Multiple Online</h1>
        <p className="text-muted-foreground">
          Calculate the Least Common Multiple (LCM) of two or more numbers instantly with our free online LCM calculator. Get accurate results with step-by-step explanations.
        </p>
      </div>

      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="threeNumbers"
            checked={useThreeNumbers}
            onChange={(e) => setUseThreeNumbers(e.target.checked)}
            className="w-4 h-4"
          />
          <Label htmlFor="threeNumbers">Calculate LCM of 3 numbers</Label>
        </div>

        <div className={`grid ${useThreeNumbers ? "md:grid-cols-3" : "md:grid-cols-2"} gap-4`}>
          <div>
            <Label>First Number</Label>
            <Input
              type="number"
              placeholder="e.g., 12"
              value={num1}
              onChange={(e) => setNum1(e.target.value)}
            />
          </div>
          <div>
            <Label>Second Number</Label>
            <Input
              type="number"
              placeholder="e.g., 18"
              value={num2}
              onChange={(e) => setNum2(e.target.value)}
            />
          </div>
          {useThreeNumbers && (
            <div>
              <Label>Third Number</Label>
              <Input
                type="number"
                placeholder="e.g., 24"
                value={num3}
                onChange={(e) => setNum3(e.target.value)}
              />
            </div>
          )}
        </div>

        <div className="flex gap-2 flex-wrap">
          <Button onClick={calculateLcm}>Calculate LCM</Button>
          <Button variant="outline" onClick={reset}>Reset</Button>
        </div>

        <div className="flex flex-wrap gap-2">
          <span className="text-sm text-muted-foreground self-center">Examples:</span>
          <Button variant="ghost" size="sm" onClick={() => loadExample("12", "18")}>12, 18</Button>
          <Button variant="ghost" size="sm" onClick={() => loadExample("8", "12")}>8, 12</Button>
          <Button variant="ghost" size="sm" onClick={() => loadExample("15", "25")}>15, 25</Button>
          <Button variant="ghost" size="sm" onClick={() => loadExample("7", "11")}>7, 11 (primes)</Button>
          <Button variant="ghost" size="sm" onClick={() => loadExample("6", "8", "12")}>6, 8, 12</Button>
          <Button variant="ghost" size="sm" onClick={() => loadExample("24", "36")}>24, 36</Button>
          <Button variant="ghost" size="sm" onClick={() => loadExample("100", "150")}>100, 150</Button>
        </div>

        {error && (
          <div className="p-4 bg-destructive/10 text-destructive rounded-md">
            <p className="text-sm">{error}</p>
          </div>
        )}

        {result && (
          <div className="space-y-4">
            <div className="p-6 bg-muted rounded-lg text-center">
              <p className="text-sm text-muted-foreground mb-2">Least Common Multiple</p>
              <p className="text-5xl font-bold">{result.lcm}</p>
              <p className="text-sm text-muted-foreground mt-2">
                LCM({num1}, {num2}{useThreeNumbers ? `, ${num3}` : ""}) = {result.lcm}
              </p>
            </div>

            <div className="p-4 bg-muted rounded-lg">
              <p className="text-sm font-semibold mb-3">Calculation Steps</p>
              <div className="space-y-1 font-mono text-sm">
                {result.steps.map((step, idx) => (
                  <p key={idx} className={step === "" ? "h-4" : ""}>{step || " "}</p>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      <section className="border-t pt-8 space-y-6">
        <h2 className="text-2xl font-semibold">Understanding LCM (Least Common Multiple)</h2>
        <p className="text-muted-foreground">
          The Least Common Multiple (LCM) of two or more numbers is the smallest positive number that is divisible by all of them. It's the smallest number that appears in the multiplication tables of all the given numbers.
        </p>
        <p className="text-muted-foreground">
          LCM is essential for adding and subtracting fractions with different denominators – you need the LCM to find a common denominator. It's also used in scheduling problems, like finding when repeating events will coincide.
        </p>
      </section>

      <section className="border-t pt-8 space-y-6">
        <h3 className="text-xl font-semibold">How to Find LCM</h3>
        <div className="p-6 bg-muted rounded-lg">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-sm mb-3">Method 1: Using GCD Formula</h4>
              <div className="font-mono text-sm p-3 bg-background rounded mb-3">
                LCM(a, b) = (a × b) / GCD(a, b)
              </div>
              <p className="text-sm text-muted-foreground">
                Find the GCD first, then use this formula. This is the most efficient method for large numbers.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-sm mb-3">Method 2: Prime Factorization</h4>
              <ol className="space-y-2 text-sm">
                <li>Find prime factorization of each number</li>
                <li>For each prime, take the highest power that appears</li>
                <li>Multiply these together</li>
              </ol>
              <div className="mt-2 font-mono text-xs">LCM(12, 18): 12=2²×3, 18=2×3²</div>
              <div className="font-mono text-xs">LCM = 2² × 3² = 4 × 9 = 36</div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t pt-8 space-y-6">
        <h3 className="text-xl font-semibold">Worked Examples</h3>
        <div className="space-y-4">
          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-3">Example 1: LCM of 12 and 18</h4>
            <div className="font-mono text-sm space-y-2">
              <div>Using GCD method:</div>
              <div>GCD(12, 18) = 6</div>
              <div>LCM = (12 × 18) / 6 = 216 / 6 = 36</div>
              <div className="mt-2">Using prime factorization:</div>
              <div>12 = 2² × 3</div>
              <div>18 = 2 × 3²</div>
              <div>LCM = 2² × 3² = 4 × 9 = 36</div>
            </div>
          </div>

          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-3">Example 2: LCM of 8 and 12</h4>
            <div className="font-mono text-sm space-y-2">
              <div>GCD(8, 12) = 4</div>
              <div>LCM = (8 × 12) / 4 = 96 / 4 = 24</div>
              <div className="mt-2">Verify: Multiples of 8: 8, 16, 24, 32...</div>
              <div>Multiples of 12: 12, 24, 36...</div>
              <div className="text-muted-foreground">First common multiple is 24 ✓</div>
            </div>
          </div>

          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-3">Example 3: LCM of Coprime Numbers (7 and 11)</h4>
            <div className="font-mono text-sm space-y-2">
              <div>GCD(7, 11) = 1 (they're coprime)</div>
              <div>LCM = (7 × 11) / 1 = 77</div>
              <div className="text-muted-foreground mt-2">For coprime numbers, LCM = product of the numbers.</div>
            </div>
          </div>

          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-3">Example 4: LCM of Three Numbers (6, 8, 12)</h4>
            <div className="font-mono text-sm space-y-2">
              <div>First: LCM(6, 8)</div>
              <div>GCD(6, 8) = 2</div>
              <div>LCM(6, 8) = 48 / 2 = 24</div>
              <div className="mt-2">Then: LCM(24, 12)</div>
              <div>GCD(24, 12) = 12</div>
              <div>LCM(24, 12) = 288 / 12 = 24</div>
              <div className="text-muted-foreground mt-2">LCM(6, 8, 12) = 24</div>
            </div>
          </div>

          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-3">Example 5: Real-World Application</h4>
            <div className="text-sm space-y-2">
              <p>Two buses leave a station. Bus A runs every 15 minutes. Bus B runs every 20 minutes. When will they leave together again?</p>
              <div className="font-mono">LCM(15, 20) = (15 × 20) / GCD(15, 20)</div>
              <div className="font-mono">GCD(15, 20) = 5</div>
              <div className="font-mono">LCM = 300 / 5 = 60 minutes</div>
              <p className="text-muted-foreground mt-2">The buses will leave together every hour.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t pt-8 space-y-6">
        <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg">
          <h4 className="font-semibold text-sm mb-2 text-amber-800">Quick Fact</h4>
          <p className="text-sm text-amber-700">
            The relationship LCM(a,b) × GCD(a,b) = a × b is a beautiful mathematical identity. It means that if you know the GCD, you can instantly find the LCM, and vice versa. This relationship holds for any pair of positive integers.
          </p>
        </div>
      </section>

      <section className="border-t pt-8 space-y-6">
        <h3 className="text-xl font-semibold">Frequently Asked Questions</h3>
        <div className="space-y-6">
          <div>
            <h4 className="font-semibold text-sm mb-2">What's the difference between LCM and GCD?</h4>
            <p className="text-sm text-muted-foreground">
              GCD (Greatest Common Divisor) is the largest number that divides both numbers. LCM (Least Common Multiple) is the smallest number that both numbers divide. GCD ≤ both numbers ≤ LCM.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">Why is LCM useful for fractions?</h4>
            <p className="text-sm text-muted-foreground">
              To add fractions like 1/12 + 1/18, you need a common denominator. The LCM of 12 and 18 is 36, so convert to 3/36 + 2/36 = 5/36. Using LCM gives the smallest (simplest) common denominator.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">Can LCM be smaller than the original numbers?</h4>
            <p className="text-sm text-muted-foreground">
              No. The LCM is always at least as large as the largest input number. If one number divides the other (like 4 and 12), the LCM equals the larger number.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">What if the numbers are coprime?</h4>
            <p className="text-sm text-muted-foreground">
              If two numbers share no common factors (GCD = 1), their LCM is simply their product. For example, LCM(7, 11) = 77.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">How do I find LCM of more than two numbers?</h4>
            <p className="text-sm text-muted-foreground">
              Find LCM of the first two, then find LCM of that result with the third number, and so on. LCM(a, b, c) = LCM(LCM(a, b), c).
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">What's the LCM of a number with itself?</h4>
            <p className="text-sm text-muted-foreground">
              LCM(n, n) = n. A number is its own smallest multiple that's also divisible by itself.
            </p>
          </div>
        </div>
      </section>

    </div>
  );
}
