"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function ModuloCalculator() {
  const [dividend, setDividend] = useState("");
  const [divisor, setDivisor] = useState("");
  const [result, setResult] = useState<number | null>(null);
  const [steps, setSteps] = useState<string[]>([]);

  const examples = [
    { name: "Simple", dividend: "17", divisor: "5" },
    { name: "Large Numbers", dividend: "1234", divisor: "100" },
    { name: "Negative Dividend", dividend: "-17", divisor: "5" },
    { name: "Even Division", dividend: "20", divisor: "4" },
    { name: "Small Mod", dividend: "100", divisor: "3" },
    { name: "Clock Example", dividend: "25", divisor: "12" },
    { name: "Byte Range", dividend: "300", divisor: "256" }
  ];

  const calculate = () => {
    const a = parseInt(dividend);
    const n = parseInt(divisor);
    if (!isNaN(a) && !isNaN(n) && n !== 0) {
      const quotient = Math.floor(a / n);
      const mod = ((a % n) + n) % n;
      setResult(mod);
      setSteps([
        `Calculate ${a} mod ${n}`,
        ``,
        `Step 1: Find the quotient`,
        `${a} / ${n} = ${a/n} (exact division)`,
        `Floor(${a/n}) = ${quotient}`,
        ``,
        `Step 2: Multiply quotient by divisor`,
        `${quotient} x ${n} = ${quotient * n}`,
        ``,
        `Step 3: Subtract from dividend`,
        `${a} - ${quotient * n} = ${a - quotient * n}`,
        ``,
        `Step 4: Ensure positive result`,
        `((${a} % ${n}) + ${n}) % ${n} = ${mod}`,
        ``,
        `Verification: ${a} = ${quotient} x ${n} + ${mod}`
      ]);
    }
  };

  const reset = () => {
    setDividend("");
    setDivisor("");
    setResult(null);
    setSteps([]);
  };

  const loadExample = (index: number) => {
    const ex = examples[index];
    setDividend(ex.dividend);
    setDivisor(ex.divisor);
    setResult(null);
    setSteps([]);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <div className="mb-12">
          <h1 className="text-4xl font-bold mb-4">
            Modulo Calculator – Find the Remainder of Division
          </h1>
          <p className="text-xl text-muted-foreground">
            Calculate the modulo or remainder of any division instantly with our free online modulo calculator. Essential for programming, number theory, and cryptography applications.
          </p>
        </div>

        <div className="mb-12">
          <div className="space-y-4">
            <div className="flex flex-wrap gap-2 mb-4">
              <span className="text-sm text-muted-foreground">Examples:</span>
              {examples.map((ex, idx) => (
                <Button key={idx} variant="outline" size="sm" onClick={() => loadExample(idx)}>{ex.name}</Button>
              ))}
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">Dividend (a)</label>
              <Input
                type="number"
                placeholder="Enter dividend (e.g., 17)"
                value={dividend}
                onChange={(e) => setDividend(e.target.value)}
                className="w-full"
              />
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">Divisor (n)</label>
              <Input
                type="number"
                placeholder="Enter divisor (e.g., 5)"
                value={divisor}
                onChange={(e) => setDivisor(e.target.value)}
                className="w-full"
              />
            </div>
            <div className="flex gap-2 pt-2">
              <Button onClick={calculate}>Calculate</Button>
              <Button variant="outline" onClick={reset}>Reset</Button>
            </div>
            {result !== null && (
              <div className="space-y-4 mt-4">
                <div className="p-4 bg-muted rounded-md">
                  <p className="text-sm text-muted-foreground">Result</p>
                  <p className="text-2xl font-semibold">
                    {dividend} mod {divisor} = {result}
                  </p>
                  <p className="text-sm text-muted-foreground mt-2">
                    {dividend} = {Math.floor(parseInt(dividend) / parseInt(divisor))} x {divisor} + {result}
                  </p>
                </div>

                {steps.length > 0 && (
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-semibold text-sm mb-3">Step-by-Step Solution</h4>
                    <div className="space-y-2 font-mono text-sm bg-muted p-3 rounded">
                      {steps.map((step, i) => (
                        <div key={i} className={step === "" ? "h-4" : ""}>
                          {step}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        <section className="border-t pt-8 space-y-6">
          <h2 className="text-2xl font-semibold">Understanding Modulo Operations</h2>
          <p className="text-muted-foreground">
            The modulo operation finds the remainder after division. When you divide a by n, you get a quotient and a remainder. The modulo operation returns just the remainder. For example, 17 / 5 = 3 remainder 2, so 17 mod 5 = 2.
          </p>
          <p className="text-muted-foreground">
            Modulo is written as "a mod n" or "a % n" in programming. It's fundamental to computer science (array indexing, hash functions), cryptography (RSA, Diffie-Hellman), and everyday applications (checking if a number is even: n mod 2 = 0).
          </p>
        </section>

        <section className="border-t pt-8 space-y-6">
          <h3 className="text-xl font-semibold">Modulo Formula</h3>
          <div className="p-4 bg-muted rounded-lg">
            <code className="text-sm font-mono block">
              a mod n = a - n x floor(a/n)
            </code>
            <p className="text-sm text-muted-foreground mt-2">
              Or equivalently: a = q x n + r, where r = a mod n and 0 ≤ r &lt; n
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-4 mt-4">
            <div className="p-4 border rounded-lg">
              <h4 className="font-semibold text-sm mb-2">Key Property</h4>
              <p className="text-sm text-muted-foreground">
                The result is always between 0 and n-1 (inclusive). This makes modulo perfect for "wrapping" values into a fixed range.
              </p>
            </div>
            <div className="p-4 border rounded-lg">
              <h4 className="font-semibold text-sm mb-2">Negative Numbers</h4>
              <p className="text-sm text-muted-foreground">
                For negative dividends, we add n until the result is positive. -17 mod 5 = 3 (not -2).
              </p>
            </div>
          </div>
        </section>

        <section className="border-t pt-8 space-y-6">
          <h3 className="text-xl font-semibold">Worked Examples</h3>
          <div className="space-y-4">
            <div className="p-4 border rounded-lg">
              <h4 className="font-semibold text-sm mb-3">Example 1: Simple Modulo</h4>
              <div className="font-mono text-sm space-y-2">
                <div>17 mod 5</div>
                <div>17 / 5 = 3.4, floor = 3</div>
                <div>3 x 5 = 15</div>
                <div>17 - 15 = 2</div>
                <div>Answer: 2</div>
              </div>
            </div>
            <div className="p-4 border rounded-lg">
              <h4 className="font-semibold text-sm mb-3">Example 2: Even Division</h4>
              <div className="font-mono text-sm space-y-2">
                <div>20 mod 4</div>
                <div>20 / 4 = 5 exactly</div>
                <div>5 x 4 = 20</div>
                <div>20 - 20 = 0</div>
                <div>Answer: 0 (divides evenly)</div>
              </div>
            </div>
            <div className="p-4 border rounded-lg">
              <h4 className="font-semibold text-sm mb-3">Example 3: Negative Dividend</h4>
              <div className="font-mono text-sm space-y-2">
                <div>-17 mod 5</div>
                <div>-17 / 5 = -3.4, floor = -4</div>
                <div>-4 x 5 = -20</div>
                <div>-17 - (-20) = 3</div>
                <div>Answer: 3 (always positive!)</div>
              </div>
            </div>
            <div className="p-4 border rounded-lg">
              <h4 className="font-semibold text-sm mb-3">Example 4: Clock Arithmetic</h4>
              <div className="font-mono text-sm space-y-2">
                <div>25 hours on a 12-hour clock</div>
                <div>25 mod 12</div>
                <div>25 = 2 x 12 + 1</div>
                <div>Answer: 1 o'clock</div>
              </div>
            </div>
          </div>
        </section>

        <section className="border-t pt-8 space-y-6">
          <h3 className="text-xl font-semibold">Quick Fact</h3>
          <div className="p-4 bg-primary/10 border border-primary/20 rounded-lg">
            <p className="text-sm">
              The modulo operation is so important in computing that most programming languages have a dedicated operator for it (%). In Python, JavaScript, and C++, you write "a % n". The word "modulo" comes from Latin "modulus" meaning "measure" – it measures how far a number is from the nearest lower multiple.
            </p>
          </div>
        </section>

        <section className="border-t pt-8 space-y-6">
          <h3 className="text-xl font-semibold">Frequently Asked Questions</h3>
          <div className="space-y-6">
            <div>
              <h4 className="font-semibold text-sm mb-2">What's the difference between mod and remainder?</h4>
              <p className="text-sm text-muted-foreground">
                In mathematics, they're the same. In programming, the % operator may return negative results for negative inputs (called "truncated division"), while true modulo always returns positive. This calculator uses true mathematical modulo.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-sm mb-2">Can the divisor be negative?</h4>
              <p className="text-sm text-muted-foreground">
                Mathematically, we typically use positive divisors. If you need negative moduli, the sign convention varies. This calculator assumes positive divisors for consistent results.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-sm mb-2">What is modulo used for in programming?</h4>
              <p className="text-sm text-muted-foreground">
                Common uses include: checking even/odd (n % 2), wrapping array indices, implementing circular buffers, hash functions, generating random numbers in a range, and time calculations (seconds to minutes: s % 60).
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-sm mb-2">How do I check if a number is divisible by n?</h4>
              <p className="text-sm text-muted-foreground">
                If a mod n = 0, then a is divisible by n. For example, 100 mod 5 = 0, so 100 is divisible by 5. This is faster than division for divisibility testing.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-sm mb-2">What does "congruent modulo n" mean?</h4>
              <p className="text-sm text-muted-foreground">
                Two numbers are congruent mod n if they have the same remainder. We write a ≡ b (mod n). For example, 17 ≡ 5 (mod 12) because both leave remainder 5 when divided by 12.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-sm mb-2">Why is my calculator showing a different result?</h4>
              <p className="text-sm text-muted-foreground">
                Some calculators and programming languages use truncated division for negative numbers, giving negative remainders. This calculator uses floored division, which always gives non-negative results – the mathematical standard.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
