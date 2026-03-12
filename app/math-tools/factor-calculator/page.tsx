"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function FactorCalculator() {
  const [number, setNumber] = useState("");
  const [result, setResult] = useState<{
    factors: number[];
    count: number;
    primeFactorization: string;
    factorPairs: [number, number][];
  } | null>(null);
  const [error, setError] = useState("");

  const findFactors = () => {
    const num = parseInt(number);

    if (isNaN(num) || num <= 0) {
      setError("Please enter a positive integer");
      setResult(null);
      return;
    }

    if (num > 100000000) {
      setError("Please enter a number up to 100,000,000 for performance reasons");
      setResult(null);
      return;
    }

    setError("");
    const factors: number[] = [];
    const factorPairs: [number, number][] = [];

    for (let i = 1; i <= Math.sqrt(num); i++) {
      if (num % i === 0) {
        factors.push(i);
        if (i !== num / i) {
          factorPairs.push([i, num / i]);
        } else {
          factorPairs.push([i, i]);
        }
      }
    }

    const allFactors = [...factors];
    factorPairs.forEach(([a, b]) => {
      if (a !== b) {
        allFactors.push(b);
      }
    });
    allFactors.sort((a, b) => a - b);

    const primeFactors = getPrimeFactorization(num);

    setResult({
      factors: allFactors,
      count: allFactors.length,
      primeFactorization: primeFactors,
      factorPairs,
    });
  };

  const getPrimeFactorization = (num: number): string => {
    const factors: Map<number, number> = new Map();
    let n = num;

    while (n % 2 === 0) {
      factors.set(2, (factors.get(2) || 0) + 1);
      n = n / 2;
    }

    for (let i = 3; i <= Math.sqrt(n); i += 2) {
      while (n % i === 0) {
        factors.set(i, (factors.get(i) || 0) + 1);
        n = n / i;
      }
    }

    if (n > 2) {
      factors.set(n, (factors.get(n) || 0) + 1);
    }

    return Array.from(factors.entries())
      .map(([prime, power]) => power === 1 ? `${prime}` : `${prime}^${power}`)
      .join(" × ");
  };

  const reset = () => {
    setNumber("");
    setResult(null);
    setError("");
  };

  const loadExample = (num: string) => {
    setNumber(num);
    setResult(null);
    setError("");
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <div className="mb-12">
          <h1 className="text-4xl font-bold mb-4">
            Factor Calculator – Find All Factors of Any Integer
          </h1>
          <p className="text-xl text-muted-foreground">
            Find all factors of any integer instantly with our free online factor calculator. Lists every factor in ascending order – perfect for simplifying fractions and solving number theory problems.
          </p>
        </div>

        <div className="mb-12">
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-2 block">Number</label>
              <Input
                type="number"
                placeholder="Enter a positive integer (e.g., 24)"
                value={number}
                onChange={(e) => setNumber(e.target.value)}
                className="w-full"
              />
            </div>

            <div className="flex gap-2 pt-2 flex-wrap">
              <Button onClick={findFactors}>Find Factors</Button>
              <Button variant="outline" onClick={reset}>Reset</Button>
            </div>

            <div className="flex flex-wrap gap-2 pt-2">
              <span className="text-sm text-muted-foreground self-center">Examples:</span>
              <Button variant="ghost" size="sm" onClick={() => loadExample("24")}>24</Button>
              <Button variant="ghost" size="sm" onClick={() => loadExample("36")}>36</Button>
              <Button variant="ghost" size="sm" onClick={() => loadExample("100")}>100</Button>
              <Button variant="ghost" size="sm" onClick={() => loadExample("97")}>97 (prime)</Button>
              <Button variant="ghost" size="sm" onClick={() => loadExample("144")}>144</Button>
              <Button variant="ghost" size="sm" onClick={() => loadExample("1000")}>1000</Button>
              <Button variant="ghost" size="sm" onClick={() => loadExample("2048")}>2048</Button>
            </div>

            {error && (
              <div className="p-4 bg-destructive/10 text-destructive rounded-md mt-4">
                <p className="text-sm">{error}</p>
              </div>
            )}

            {result && (
              <>
                <div className="p-4 bg-muted rounded-md mt-4">
                  <p className="text-sm text-muted-foreground mb-2">All Factors of {number}</p>
                  <p className="text-lg font-semibold">{result.factors.join(", ")}</p>
                  <p className="text-sm text-muted-foreground mt-2">
                    Total: {result.count} factor{result.count !== 1 ? "s" : ""}
                  </p>
                </div>

                <div className="p-4 bg-muted rounded-md mt-4">
                  <p className="text-sm text-muted-foreground mb-2">Prime Factorization</p>
                  <p className="text-xl font-semibold font-mono">
                    {number} = {result.primeFactorization}
                  </p>
                </div>

                <div className="p-4 bg-muted rounded-md mt-4">
                  <p className="text-sm text-muted-foreground mb-2">Factor Pairs</p>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                    {result.factorPairs.map(([a, b], index) => (
                      <div key={index} className="bg-background p-2 rounded text-center text-sm">
                        {a} × {b}
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>
        </div>

        <section className="border-t pt-8 space-y-6">
          <h2 className="text-2xl font-semibold">Understanding Factors</h2>
          <p className="text-muted-foreground">
            A factor is a whole number that divides another number evenly, leaving no remainder. When you multiply two factors together, you get the original number. For example, the factors of 12 are 1, 2, 3, 4, 6, and 12 because each of these divides 12 without leaving anything left over.
          </p>
          <p className="text-muted-foreground">
            Every number has at least two factors: 1 and itself. Numbers with exactly two factors are called prime numbers. Numbers with more than two factors are called composite numbers. The number 1 is special – it has only one factor and is neither prime nor composite.
          </p>
        </section>

        <section className="border-t pt-8 space-y-6">
          <h3 className="text-xl font-semibold">How to Find Factors</h3>
          <div className="p-6 bg-muted rounded-lg">
            <ol className="space-y-4 text-sm">
              <li className="flex gap-3">
                <span className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center flex-shrink-0">1</span>
                <div>
                  <p className="font-semibold mb-1">Start with 1 and the number itself</p>
                  <p className="text-muted-foreground">
                    Every number is divisible by 1 and by itself. These are always your first and last factors.
                  </p>
                </div>
              </li>
              <li className="flex gap-3">
                <span className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center flex-shrink-0">2</span>
                <div>
                  <p className="font-semibold mb-1">Test numbers up to the square root</p>
                  <p className="text-muted-foreground">
                    Check each number from 2 up to the square root of your number. If it divides evenly, both the divisor and the quotient are factors.
                  </p>
                </div>
              </li>
              <li className="flex gap-3">
                <span className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center flex-shrink-0">3</span>
                <div>
                  <p className="font-semibold mb-1">Use divisibility rules</p>
                  <p className="text-muted-foreground">
                    Even numbers are divisible by 2. Numbers ending in 0 or 5 are divisible by 5. If the digits add up to a multiple of 3, the number is divisible by 3.
                  </p>
                </div>
              </li>
              <li className="flex gap-3">
                <span className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center flex-shrink-0">4</span>
                <div>
                  <p className="font-semibold mb-1">List factor pairs</p>
                  <p className="text-muted-foreground">
                    Write factors as pairs that multiply to give the original number. This ensures you don't miss any.
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
              <h4 className="font-semibold text-sm mb-3">Example 1: Find all factors of 24</h4>
              <div className="font-mono text-sm space-y-2">
                <div>Start with 1 and 24: 1 × 24 = 24 ✓</div>
                <div>Check 2: 24 ÷ 2 = 12, so 2 × 12 = 24 ✓</div>
                <div>Check 3: 24 ÷ 3 = 8, so 3 × 8 = 24 ✓</div>
                <div>Check 4: 24 ÷ 4 = 6, so 4 × 6 = 24 ✓</div>
                <div>Check 5: 24 ÷ 5 = 4.8 (not a whole number) ✗</div>
                <div>√24 ≈ 4.9, so we stop here</div>
                <div className="text-muted-foreground mt-2">Factors of 24: 1, 2, 3, 4, 6, 8, 12, 24 (8 factors)</div>
              </div>
            </div>

            <div className="p-4 border rounded-lg">
              <h4 className="font-semibold text-sm mb-3">Example 2: Find all factors of 36</h4>
              <div className="font-mono text-sm space-y-2">
                <div>1 × 36 = 36 ✓</div>
                <div>2 × 18 = 36 ✓</div>
                <div>3 × 12 = 36 ✓</div>
                <div>4 × 9 = 36 ✓</div>
                <div>5 doesn't divide 36 ✗</div>
                <div>6 × 6 = 36 ✓ (perfect square, 6 pairs with itself)</div>
                <div className="text-muted-foreground mt-2">Factors of 36: 1, 2, 3, 4, 6, 9, 12, 18, 36 (9 factors)</div>
              </div>
            </div>

            <div className="p-4 border rounded-lg">
              <h4 className="font-semibold text-sm mb-3">Example 3: Find all factors of 97</h4>
              <div className="font-mono text-sm space-y-2">
                <div>1 × 97 = 97 ✓</div>
                <div>Check 2: 97 is odd ✗</div>
                <div>Check 3: 9 + 7 = 16, not divisible by 3 ✗</div>
                <div>Check 5: doesn't end in 0 or 5 ✗</div>
                <div>Check 7: 97 ÷ 7 = 13.86... ✗</div>
                <div>√97 ≈ 9.8, check up to 9</div>
                <div>Check 8, 9: neither divides evenly ✗</div>
                <div className="text-muted-foreground mt-2">Factors of 97: 1, 97 (only 2 factors – it's prime!)</div>
              </div>
            </div>

            <div className="p-4 border rounded-lg">
              <h4 className="font-semibold text-sm mb-3">Example 4: Prime factorization of 60</h4>
              <div className="font-mono text-sm space-y-2">
                <div>60 ÷ 2 = 30</div>
                <div>30 ÷ 2 = 15</div>
                <div>15 ÷ 3 = 5</div>
                <div>5 ÷ 5 = 1</div>
                <div className="text-muted-foreground mt-2">60 = 2² × 3 × 5</div>
              </div>
            </div>
          </div>
        </section>

        <section className="border-t pt-8 space-y-6">
          <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg">
            <h4 className="font-semibold text-sm mb-2 text-amber-800">Quick Fact</h4>
            <p className="text-sm text-amber-700">
              The ancient Greek mathematician Euclid proved around 300 BCE that there are infinitely many prime numbers. His elegant proof by contradiction is still taught today and is considered one of the most beautiful arguments in mathematics.
            </p>
          </div>
        </section>

        <section className="border-t pt-8 space-y-6">
          <h3 className="text-xl font-semibold">Frequently Asked Questions</h3>
          <div className="space-y-6">
            <div>
              <h4 className="font-semibold text-sm mb-2">What's the difference between factors and multiples?</h4>
              <p className="text-sm text-muted-foreground">
                Factors divide into a number evenly. Multiples are what you get when you multiply a number by integers. For 12: factors are 1, 2, 3, 4, 6, 12 (finite list). Multiples are 12, 24, 36, 48... (infinite list).
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-sm mb-2">How many factors does a number have?</h4>
              <p className="text-sm text-muted-foreground">
                Use the prime factorization. If n = p₁^a × p₂^b × p₃^c..., then the number of factors is (a+1)(b+1)(c+1).... For 60 = 2² × 3¹ × 5¹, factors = (2+1)(1+1)(1+1) = 3 × 2 × 2 = 12 factors.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-sm mb-2">What are factor pairs?</h4>
              <p className="text-sm text-muted-foreground">
                Factor pairs are two numbers that multiply together to give the original number. For 20: (1, 20), (2, 10), (4, 5). Perfect squares have one factor that pairs with itself, like (6, 6) for 36.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-sm mb-2">Why do we only check up to the square root?</h4>
              <p className="text-sm text-muted-foreground">
                Factors come in pairs. Once you pass the square root, you're just finding the partners of factors you already discovered. For 36, after checking 6, any new factor would pair with something less than 6, which you've already found.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-sm mb-2">What's prime factorization used for?</h4>
              <p className="text-sm text-muted-foreground">
                Prime factorization helps find the GCD and LCM of numbers, simplify fractions, and solve problems in cryptography. It's the unique "fingerprint" of a number – every integer has exactly one prime factorization.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-sm mb-2">Can negative numbers have factors?</h4>
              <p className="text-sm text-muted-foreground">
                Yes, but we typically work with positive factors. Technically, -2 is also a factor of 12 because (-2) × (-6) = 12. This calculator focuses on positive factors, which is standard for most applications.
              </p>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}
