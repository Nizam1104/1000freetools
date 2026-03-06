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

    if (num > 1000000000) {
      setError("Please enter a number up to 1,000,000,000 for performance reasons");
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
      explanation = `${num} is not prime (composite). It can be divided evenly by ${factors.slice(1, -1).join(", ")}.`;
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

  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
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

        <div className="flex gap-2">
          <Button onClick={checkPrime}>Check if Prime</Button>
          <Button variant="outline" onClick={reset}>Reset</Button>
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

      <section className="border-t pt-8 space-y-4">
        <h2 className="text-2xl font-semibold">What Are Prime Numbers?</h2>
        <p className="text-muted-foreground">
          A prime number is a natural number greater than 1 that has no positive divisors other than 1 and itself. Numbers with more than two factors are called composite numbers.
        </p>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="p-4 bg-muted rounded-lg">
            <h3 className="font-semibold mb-2">Prime Numbers (2-50)</h3>
            <p className="text-sm font-mono">
              2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47
            </p>
            <p className="text-xs text-muted-foreground mt-2">
              2 is the only even prime number. All other primes are odd.
            </p>
          </div>
          <div className="p-4 bg-muted rounded-lg">
            <h3 className="font-semibold mb-2">Composite Numbers</h3>
            <p className="text-sm text-muted-foreground">
              Composite numbers have more than two factors. For example, 12 has factors 1, 2, 3, 4, 6, 12.
            </p>
            <p className="text-xs text-muted-foreground mt-2">
              Every composite number can be expressed as a product of primes (prime factorization).
            </p>
          </div>
        </div>
      </section>

      <section className="border-t pt-8 space-y-4">
        <h2 className="text-2xl font-semibold">How to Check if a Number is Prime</h2>
        <div className="grid md:grid-cols-4 gap-4">
          <div className="p-4 bg-muted rounded-lg">
            <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold mb-3">1</div>
            <h3 className="font-semibold text-sm mb-2">Check if less than 2</h3>
            <p className="text-xs text-muted-foreground">
              Numbers 0 and 1 are neither prime nor composite.
            </p>
          </div>
          <div className="p-4 bg-muted rounded-lg">
            <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold mb-3">2</div>
            <h3 className="font-semibold text-sm mb-2">Check if even</h3>
            <p className="text-xs text-muted-foreground">
              If divisible by 2 (and not 2 itself), it's composite.
            </p>
          </div>
          <div className="p-4 bg-muted rounded-lg">
            <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold mb-3">3</div>
            <h3 className="font-semibold text-sm mb-2">Test odd divisors</h3>
            <p className="text-xs text-muted-foreground">
              Check divisibility by odd numbers up to √n.
            </p>
          </div>
          <div className="p-4 bg-muted rounded-lg">
            <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold mb-3">4</div>
            <h3 className="font-semibold text-sm mb-2">Count factors</h3>
            <p className="text-xs text-muted-foreground">
              Exactly 2 factors means prime. More means composite.
            </p>
          </div>
        </div>
      </section>

      <section className="border-t pt-8 space-y-4">
        <h2 className="text-2xl font-semibold">Prime Number Examples</h2>
        <div className="space-y-3">
          <div className="p-4 bg-green-500/10 border border-green-500/30 rounded-lg">
            <p className="font-semibold text-sm mb-1">17 is Prime</p>
            <p className="text-sm text-muted-foreground">Factors: 1, 17</p>
          </div>
          <div className="p-4 bg-muted rounded-lg">
            <p className="font-semibold text-sm mb-1">24 is Composite</p>
            <p className="text-sm text-muted-foreground">Factors: 1, 2, 3, 4, 6, 8, 12, 24</p>
          </div>
          <div className="p-4 bg-green-500/10 border border-green-500/30 rounded-lg">
            <p className="font-semibold text-sm mb-1">97 is Prime</p>
            <p className="text-sm text-muted-foreground">Factors: 1, 97</p>
          </div>
          <div className="p-4 bg-muted rounded-lg">
            <p className="font-semibold text-sm mb-1">100 is Composite</p>
            <p className="text-sm text-muted-foreground">Factors: 1, 2, 4, 5, 10, 20, 25, 50, 100</p>
          </div>
        </div>
      </section>

      <section className="border-t pt-8 space-y-4">
        <h2 className="text-2xl font-semibold">Prime Number Properties</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="p-4 bg-muted rounded-lg">
            <h3 className="font-semibold text-sm mb-2">Key Facts</h3>
            <ul className="space-y-1 text-xs text-muted-foreground">
              <li>• 2 is the smallest and only even prime</li>
              <li>• There are infinitely many primes</li>
              <li>• Every integer &gt;1 is prime or product of primes</li>
              <li>• Primes become less frequent as numbers grow</li>
              <li>• The largest known prime has millions of digits</li>
            </ul>
          </div>
          <div className="p-4 bg-muted rounded-lg">
            <h3 className="font-semibold text-sm mb-2">Divisibility Shortcuts</h3>
            <ul className="space-y-1 text-xs text-muted-foreground">
              <li>• Ends in 0,2,4,6,8 → divisible by 2</li>
              <li>• Sum of digits divisible by 3 → divisible by 3</li>
              <li>• Ends in 0 or 5 → divisible by 5</li>
              <li>• Test up to √n for primality</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="border-t pt-8 space-y-6">
        <h2 className="text-2xl font-semibold">Frequently Asked Questions</h2>
        <div>
          <h3 className="font-semibold mb-2">What is a prime number?</h3>
          <p className="text-sm text-muted-foreground">
            A prime number is a whole number greater than 1 that has exactly two factors: 1 and itself. Examples include 2, 3, 5, 7, 11, and so on.
          </p>
        </div>
        <div>
          <h3 className="font-semibold mb-2">Is 1 a prime number?</h3>
          <p className="text-sm text-muted-foreground">
            No, 1 is neither prime nor composite. By definition, prime numbers must have exactly two distinct factors, but 1 only has one factor (itself).
          </p>
        </div>
        <div>
          <h3 className="font-semibold mb-2">Why is 2 the only even prime?</h3>
          <p className="text-sm text-muted-foreground">
            All other even numbers are divisible by 2, giving them at least three factors: 1, 2, and themselves. So they're composite.
          </p>
        </div>
        <div>
          <h3 className="font-semibold mb-2">How do you test if a large number is prime?</h3>
          <p className="text-sm text-muted-foreground">
            Check divisibility by all primes up to the square root of the number. If none divide evenly, the number is prime. For very large numbers, specialized algorithms like Miller-Rabin are used.
          </p>
        </div>
        <div>
          <h3 className="font-semibold mb-2">What are prime numbers used for?</h3>
          <p className="text-sm text-muted-foreground">
            Primes are fundamental in cryptography (RSA encryption), computer science, number theory, and random number generation. They're the building blocks of all integers.
          </p>
        </div>
      </section>

      <section className="border-t pt-8 space-y-4">
        <h2 className="text-2xl font-semibold">Related Math Tools</h2>
        <div className="grid sm:grid-cols-3 gap-4">
          <a href="/math-tools/prime-factorization-calculator" className="p-4 rounded-lg border hover:bg-muted transition-colors">
            <p className="font-semibold text-sm">Prime Factorization</p>
            <p className="text-xs text-muted-foreground">Break into prime factors</p>
          </a>
          <a href="/math-tools/factors-list-generator" className="p-4 rounded-lg border hover:bg-muted transition-colors">
            <p className="font-semibold text-sm">Factors List Generator</p>
            <p className="text-xs text-muted-foreground">Find all factors</p>
          </a>
          <a href="/math-tools/gcd-calculator" className="p-4 rounded-lg border hover:bg-muted transition-colors">
            <p className="font-semibold text-sm">GCD Calculator</p>
            <p className="text-xs text-muted-foreground">Greatest common divisor</p>
          </a>
        </div>
      </section>
    </div>
  );
}
