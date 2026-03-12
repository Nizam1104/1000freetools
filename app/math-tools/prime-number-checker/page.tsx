"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function PrimeNumberChecker() {
  const [number, setNumber] = useState("");
  const [result, setResult] = useState<{
    isPrime: boolean;
    explanation: string;
    factors?: number[];
  } | null>(null);
  const [error, setError] = useState("");

  const isPrime = (num: number): { isPrime: boolean; factors: number[] } => {
    if (num < 2) return { isPrime: false, factors: [] };
    if (num === 2) return { isPrime: true, factors: [1, 2] };
    if (num % 2 === 0) return { isPrime: false, factors: [1, 2, num / 2, num] };

    const factors: number[] = [1];
    const sqrt = Math.sqrt(num);

    for (let i = 3; i <= sqrt; i += 2) {
      if (num % i === 0) {
        factors.push(i);
        if (i !== num / i) {
          factors.push(num / i);
        }
      }
    }

    factors.push(num);
    factors.sort((a, b) => a - b);

    return { isPrime: factors.length === 2, factors };
  };

  const checkPrime = () => {
    const num = parseInt(number);

    if (isNaN(num)) {
      setError("Please enter a valid integer");
      setResult(null);
      return;
    }

    if (num < 0) {
      setError("Please enter a positive integer");
      setResult(null);
      return;
    }

    if (num > 10000000000000) {
      setError("Please enter a number up to 10 trillion for performance reasons");
      setResult(null);
      return;
    }

    setError("");
    const { isPrime: prime, factors } = isPrime(num);

    let explanation: string;
    if (num < 2) {
      explanation = `${num} is not prime. Prime numbers must be greater than 1.`;
    } else if (prime) {
      explanation = `${num} is prime. It has exactly two factors: 1 and itself.`;
    } else {
      const properFactors = factors.slice(1, -1);
      if (properFactors.length <= 6) {
        explanation = `${num} is not prime (composite). It can be divided evenly by ${properFactors.join(", ")}.`;
      } else {
        explanation = `${num} is not prime (composite). It has ${factors.length} total factors.`;
      }
    }

    setResult({
      isPrime: prime,
      explanation,
      factors,
    });
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
    <div className="w-full mx-auto space-y-8">
      <div className="mb-8">
        <h1 className="text-3xl font-semibold mb-2">Prime Number Checker – Is It Prime? Find Out Instantly</h1>
        <p className="text-muted-foreground">
          Check if any number is prime or composite instantly with our free online prime number checker. Fast, accurate prime testing for any positive integer with a clear explanation.
        </p>
      </div>

      <div className="space-y-4">
        <div>
          <Label>Number</Label>
          <Input
            type="number"
            placeholder="Enter a positive integer (e.g., 17)"
            value={number}
            onChange={(e) => setNumber(e.target.value)}
          />
        </div>

        <div className="flex gap-2 flex-wrap">
          <Button onClick={checkPrime}>Check if Prime</Button>
          <Button variant="outline" onClick={reset}>Reset</Button>
          <Button variant="outline" onClick={() => loadExample("17")}>17</Button>
          <Button variant="outline" onClick={() => loadExample("100")}>100</Button>
          <Button variant="outline" onClick={() => loadExample("997")}>997</Button>
          <Button variant="outline" onClick={() => loadExample("1000003")}>1000003</Button>
          <Button variant="outline" onClick={() => loadExample("7919")}>7919</Button>
        </div>

        {error && (
          <div className="p-4 bg-destructive/10 text-destructive rounded-md">
            <p className="text-sm">{error}</p>
          </div>
        )}

        {result && (
          <div className="space-y-4">
            <div className={`p-6 rounded-lg text-center ${result.isPrime ? "bg-green-500/10 border border-green-500/30" : "bg-muted"}`}>
              <p className={`text-5xl font-bold mb-2 ${result.isPrime ? "text-green-600" : ""}`}>
                {result.isPrime ? "Prime Number" : "Not Prime"}
              </p>
              <p className="text-sm text-muted-foreground">{result.explanation}</p>
            </div>

            {result.factors && result.factors.length > 0 && (
              <div className="p-4 bg-muted rounded-lg">
                <p className="text-sm text-muted-foreground mb-2">All Factors</p>
                <p className="font-semibold">{result.factors.join(", ")}</p>
                <p className="text-xs text-muted-foreground mt-2">
                  Total: {result.factors.length} factor{result.factors.length !== 1 ? "s" : ""}
                </p>
              </div>
            )}
          </div>
        )}
      </div>

      <section className="space-y-6 pt-8 border-t">
        <h2 className="text-2xl font-semibold">Understanding Prime Numbers</h2>

        <div className="space-y-4">
          <p>
            A prime number is a whole number greater than 1 that can only be divided evenly by 1 and itself. The first few primes are 2, 3, 5, 7, 11, 13, 17, 19... Everything else greater than 1 is called composite.
          </p>

          <h3 className="text-xl font-semibold">How Prime Testing Works</h3>
          <p>
            This checker uses trial division — the most straightforward primality test. We check if the number is divisible by any integer from 2 up to its square root. If we find a divisor, it's composite. If we don't, it's prime.
          </p>
          <p>
            Why only up to the square root? If n = a × b, then at least one of a or b must be ≤ √n. So if no divisor exists below √n, none exists above it either.
          </p>

          <h3 className="text-xl font-semibold">Worked Examples</h3>

          <div className="space-y-4">
            <div className="p-4 border rounded-lg">
              <h4 className="font-semibold mb-2">Example 1: Is 17 prime?</h4>
              <p className="text-sm text-muted-foreground mb-2">
                Check divisibility by 2, 3, and 4 (since √17 ≈ 4.1).
              </p>
              <code className="text-sm font-mono bg-muted px-3 py-2 rounded block">
                17 ÷ 2 = 8.5 (not divisible)<br />
                17 ÷ 3 = 5.67 (not divisible)<br />
                17 ÷ 4 = 4.25 (not divisible)
              </code>
              <p className="text-sm mt-2">
                No divisors found, so 17 is prime.
              </p>
            </div>

            <div className="p-4 border rounded-lg">
              <h4 className="font-semibold mb-2">Example 2: Is 100 prime?</h4>
              <p className="text-sm text-muted-foreground mb-2">
                100 is even, so it's immediately divisible by 2.
              </p>
              <code className="text-sm font-mono bg-muted px-3 py-2 rounded block">
                100 = 2 × 50 = 4 × 25 = 5 × 20 = 10 × 10
              </code>
              <p className="text-sm mt-2">
                Factors: 1, 2, 4, 5, 10, 20, 25, 50, 100. Not prime.
              </p>
            </div>

            <div className="p-4 border rounded-lg">
              <h4 className="font-semibold mb-2">Example 3: Is 997 prime?</h4>
              <p className="text-sm text-muted-foreground mb-2">
                √997 ≈ 31.6, so we check primes up to 31.
              </p>
              <code className="text-sm font-mono bg-muted px-3 py-2 rounded block">
                Check: 2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31
              </code>
              <p className="text-sm mt-2">
                None divide 997 evenly. It's prime — and it's actually the largest 3-digit prime.
              </p>
            </div>
          </div>

          <h3 className="text-xl font-semibold">A Quick Fact</h3>
          <div className="p-4 bg-muted rounded-lg">
            <p className="text-sm">
              The largest known prime number as of 2024 is 2^82,589,933 − 1, a Mersenne prime with 24,862,048 digits. It was discovered in December 2018 by the Great Internet Mersenne Prime Search (GIMPS), a distributed computing project.
            </p>
          </div>

          <h3 className="text-xl font-semibold">Common Questions</h3>

          <div className="space-y-4">
            <div>
              <h4 className="font-semibold mb-2">Why isn't 1 considered prime?</h4>
              <p className="text-sm">
                It's a convention that makes math cleaner. If 1 were prime, the Fundamental Theorem of Arithmetic (every number has a unique prime factorization) would break. You could write 6 = 2×3 = 1×2×3 = 1×1×2×3, and so on.
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-2">Is 2 the only even prime?</h4>
              <p className="text-sm">
                Yes. Every other even number is divisible by 2, so it has at least three factors: 1, 2, and itself. That makes it composite by definition.
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-2">How many prime numbers are there?</h4>
              <p className="text-sm">
                Infinitely many. Euclid proved this around 300 BCE. His proof: assume there's a largest prime, multiply all primes together, add 1 — the result is either prime itself or divisible by a prime not on your list. Either way, contradiction.
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-2">What's the largest prime this checker can handle?</h4>
              <p className="text-sm">
                This tool checks numbers up to 10 trillion. The trial division algorithm runs in O(√n) time, so larger numbers would take noticeably longer to verify.
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-2">Why are prime numbers useful?</h4>
              <p className="text-sm">
                Modern cryptography depends on primes. RSA encryption, which secures most online transactions, relies on the fact that multiplying two large primes is easy, but factoring their product back is extremely hard.
              </p>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
