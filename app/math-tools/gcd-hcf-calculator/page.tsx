"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function GcdHcfCalculator() {
  const [num1, setNum1] = useState("");
  const [num2, setNum2] = useState("");
  const [num3, setNum3] = useState("");
  const [useThreeNumbers, setUseThreeNumbers] = useState(false);
  const [result, setResult] = useState<{
    gcd: number;
    steps: string[];
  } | null>(null);
  const [error, setError] = useState("");

  const gcd = (a: number, b: number): { result: number; steps: string[] } => {
    const steps: string[] = [];
    let x = a, y = b;

    while (y !== 0) {
      steps.push(`GCD(${x}, ${y}): ${x} = ${y} × ${Math.floor(x / y)} + ${x % y}`);
      const temp = y;
      y = x % y;
      x = temp;
    }

    steps.push(`GCD found: ${x}`);
    return { result: x, steps };
  };

  const calculateGcd = () => {
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
    let gcdResult: number;
    let allSteps: string[] = [];

    if (useThreeNumbers && n3) {
      const first = gcd(n1, n2);
      const second = gcd(first.result, n3);
      gcdResult = second.result;
      allSteps = [
        `Step 1: Find GCD of ${n1} and ${n2}`,
        ...first.steps,
        "",
        `Step 2: Find GCD of ${first.result} and ${n3}`,
        ...second.steps,
      ];
    } else {
      const res = gcd(n1, n2);
      gcdResult = res.result;
      allSteps = res.steps;
    }

    setResult({
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
    <div className="w-full max-w-4xl mx-auto space-y-8">
      <div className="mb-8">
        <h1 className="text-3xl font-semibold mb-2">GCD / HCF Calculator – Find Greatest Common Divisor Online</h1>
        <p className="text-muted-foreground">
          Calculate the GCD or HCF of two or more numbers instantly with our free online calculator. Uses the Euclidean algorithm to find the greatest common divisor with step-by-step solutions.
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
          <Label htmlFor="threeNumbers">Calculate GCD of 3 numbers</Label>
        </div>

        <div className={`grid ${useThreeNumbers ? "md:grid-cols-3" : "md:grid-cols-2"} gap-4`}>
          <div>
            <Label>First Number</Label>
            <Input
              type="number"
              placeholder="e.g., 48"
              value={num1}
              onChange={(e) => setNum1(e.target.value)}
            />
          </div>
          <div>
            <Label>Second Number</Label>
            <Input
              type="number"
              placeholder="e.g., 60"
              value={num2}
              onChange={(e) => setNum2(e.target.value)}
            />
          </div>
          {useThreeNumbers && (
            <div>
              <Label>Third Number</Label>
              <Input
                type="number"
                placeholder="e.g., 72"
                value={num3}
                onChange={(e) => setNum3(e.target.value)}
              />
            </div>
          )}
        </div>

        <div className="flex gap-2 flex-wrap">
          <Button onClick={calculateGcd}>Calculate GCD</Button>
          <Button variant="outline" onClick={reset}>Reset</Button>
        </div>

        <div className="flex flex-wrap gap-2">
          <span className="text-sm text-muted-foreground self-center">Examples:</span>
          <Button variant="ghost" size="sm" onClick={() => loadExample("48", "60")}>48, 60</Button>
          <Button variant="ghost" size="sm" onClick={() => loadExample("24", "36")}>24, 36</Button>
          <Button variant="ghost" size="sm" onClick={() => loadExample("17", "23")}>17, 23 (primes)</Button>
          <Button variant="ghost" size="sm" onClick={() => loadExample("100", "150")}>100, 150</Button>
          <Button variant="ghost" size="sm" onClick={() => loadExample("12", "18", "24")}>12, 18, 24</Button>
          <Button variant="ghost" size="sm" onClick={() => loadExample("84", "90")}>84, 90</Button>
        </div>

        {error && (
          <div className="p-4 bg-destructive/10 text-destructive rounded-md">
            <p className="text-sm">{error}</p>
          </div>
        )}

        {result && (
          <div className="space-y-4">
            <div className="p-6 bg-muted rounded-lg text-center">
              <p className="text-sm text-muted-foreground mb-2">Greatest Common Divisor</p>
              <p className="text-5xl font-bold">{result.gcd}</p>
              <p className="text-sm text-muted-foreground mt-2">
                GCD({num1}, {num2}{useThreeNumbers ? `, ${num3}` : ""}) = {result.gcd}
              </p>
            </div>

            <div className="p-4 bg-muted rounded-lg">
              <p className="text-sm font-semibold mb-3">Euclidean Algorithm Steps</p>
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
        <h2 className="text-2xl font-semibold">Understanding GCD/HCF</h2>
        <p className="text-muted-foreground">
          The Greatest Common Divisor (GCD), also called the Highest Common Factor (HCF), is the largest number that divides two or more numbers without leaving a remainder. It's a fundamental concept in number theory with practical applications in simplifying fractions and solving problems involving ratios.
        </p>
        <p className="text-muted-foreground">
          For example, the GCD of 12 and 18 is 6, because 6 is the largest number that divides both 12 and 18 evenly. The factors of 12 are 1, 2, 3, 4, 6, 12. The factors of 18 are 1, 2, 3, 6, 9, 18. The common factors are 1, 2, 3, 6, and the greatest is 6.
        </p>
      </section>

      <section className="border-t pt-8 space-y-6">
        <h3 className="text-xl font-semibold">The Euclidean Algorithm</h3>
        <div className="p-6 bg-muted rounded-lg">
          <p className="text-sm mb-4">The Euclidean algorithm is an efficient method for finding the GCD. It's based on a simple principle:</p>
          <div className="font-mono text-center text-lg p-4 bg-background rounded mb-4">
            GCD(a, b) = GCD(b, a mod b)
          </div>
          <ol className="space-y-3 text-sm">
            <li className="flex gap-3">
              <span className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center flex-shrink-0">1</span>
              <div>
                <p className="font-semibold mb-1">Divide the larger number by the smaller</p>
                <p className="text-muted-foreground">
                  Find the quotient and remainder.
                </p>
              </div>
            </li>
            <li className="flex gap-3">
              <span className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center flex-shrink-0">2</span>
              <div>
                <p className="font-semibold mb-1">Replace and repeat</p>
                <p className="text-muted-foreground">
                  Replace the larger number with the smaller, and the smaller with the remainder.
                </p>
              </div>
            </li>
            <li className="flex gap-3">
              <span className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center flex-shrink-0">3</span>
              <div>
                <p className="font-semibold mb-1">Continue until remainder is zero</p>
                <p className="text-muted-foreground">
                  When the remainder becomes zero, the last non-zero remainder is the GCD.
                </p>
              </div>
            </li>
          </ol>
        </div>
      </section>

      <section className="border-t pt-8 space-y-6">
        <h3 className="text-xl font-semibold">Worked Examples</h3>
        <div className="space-y-4">
          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-3">Example 1: GCD of 48 and 60</h4>
            <div className="font-mono text-sm space-y-2">
              <div>60 = 48 × 1 + 12</div>
              <div>48 = 12 × 4 + 0</div>
              <div>Remainder is 0, so GCD = 12</div>
              <div className="text-muted-foreground mt-2">Verification: 48÷12=4 ✓, 60÷12=5 ✓</div>
            </div>
          </div>

          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-3">Example 2: GCD of 100 and 35</h4>
            <div className="font-mono text-sm space-y-2">
              <div>100 = 35 × 2 + 30</div>
              <div>35 = 30 × 1 + 5</div>
              <div>30 = 5 × 6 + 0</div>
              <div>GCD = 5</div>
              <div className="text-muted-foreground mt-2">Verification: 100÷5=20 ✓, 35÷5=7 ✓</div>
            </div>
          </div>

          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-3">Example 3: GCD of 17 and 23 (coprime)</h4>
            <div className="font-mono text-sm space-y-2">
              <div>23 = 17 × 1 + 6</div>
              <div>17 = 6 × 2 + 5</div>
              <div>6 = 5 × 1 + 1</div>
              <div>5 = 1 × 5 + 0</div>
              <div>GCD = 1</div>
              <div className="text-muted-foreground mt-2">When GCD = 1, numbers are coprime (relatively prime)</div>
            </div>
          </div>

          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-3">Example 4: GCD of Three Numbers (12, 18, 24)</h4>
            <div className="font-mono text-sm space-y-2">
              <div>First find GCD(12, 18):</div>
              <div>18 = 12 × 1 + 6</div>
              <div>12 = 6 × 2 + 0</div>
              <div>GCD(12, 18) = 6</div>
              <div className="mt-2">Now find GCD(6, 24):</div>
              <div>24 = 6 × 4 + 0</div>
              <div>GCD = 6</div>
              <div className="text-muted-foreground mt-2">GCD(12, 18, 24) = 6</div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t pt-8 space-y-6">
        <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg">
          <h4 className="font-semibold text-sm mb-2 text-amber-800">Quick Fact</h4>
          <p className="text-sm text-amber-700">
            The Euclidean algorithm is over 2,300 years old, appearing in Euclid's Elements around 300 BCE. It's one of the oldest algorithms still in common use today. Donald Knuth called it "the granddaddy of all algorithms."
          </p>
        </div>
      </section>

      <section className="border-t pt-8 space-y-6">
        <h3 className="text-xl font-semibold">Frequently Asked Questions</h3>
        <div className="space-y-6">
          <div>
            <h4 className="font-semibold text-sm mb-2">What's the difference between GCD and HCF?</h4>
            <p className="text-sm text-muted-foreground">
              There's no difference – they're the same thing. GCD (Greatest Common Divisor) is more common in American mathematics. HCF (Highest Common Factor) is often used in British and Indian mathematics. Both refer to the largest number that divides all given numbers.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">Why use the Euclidean algorithm instead of listing factors?</h4>
            <p className="text-sm text-muted-foreground">
              For small numbers, listing factors works fine. But for large numbers, the Euclidean algorithm is much faster. It reduces the problem size with each step, guaranteeing a quick solution even for very large numbers.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">What are coprime numbers?</h4>
            <p className="text-sm text-muted-foreground">
              Two numbers are coprime (or relatively prime) if their GCD is 1. They share no common factors other than 1. Examples: 8 and 15, 14 and 25, any two different prime numbers.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">How is GCD used to simplify fractions?</h4>
            <p className="text-sm text-muted-foreground">
              Divide both numerator and denominator by their GCD. For 48/60, GCD(48,60) = 12, so 48÷12 = 4 and 60÷12 = 5, giving 4/5. This gives the fraction in lowest terms.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">Can GCD be found for more than two numbers?</h4>
            <p className="text-sm text-muted-foreground">
              Yes. Find the GCD of the first two numbers, then find the GCD of that result with the third number, and so on. GCD(a, b, c) = GCD(GCD(a, b), c).
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">What's the relationship between GCD and LCM?</h4>
            <p className="text-sm text-muted-foreground">
              For any two numbers a and b: GCD(a,b) × LCM(a,b) = a × b. So if you know the GCD, you can find the LCM: LCM = (a × b) / GCD.
            </p>
          </div>
        </div>
      </section>

    </div>
  );
}
