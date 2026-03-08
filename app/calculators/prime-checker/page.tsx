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

export default function PrimeChecker() {
  const [number, setNumber] = useState<string>("");
  const [result, setResult] = useState<{ isPrime: boolean; factors?: number[] } | null>(null);

  const isPrime = (num: number): { isPrime: boolean; factors: number[] } => {
    if (num < 2) return { isPrime: false, factors: [] };
    if (num === 2) return { isPrime: true, factors: [1, 2] };
    if (num % 2 === 0) return { isPrime: false, factors: [1, 2, num / 2, num] };

    const factors: number[] = [1, num];
    const sqrt = Math.sqrt(num);

    for (let i = 3; i <= sqrt; i += 2) {
      if (num % i === 0) {
        factors.push(i, num / i);
      }
    }

    return { isPrime: factors.length === 2, factors: factors.sort((a, b) => a - b) };
  };

  const calculate = () => {
    const num = parseInt(number);
    if (isNaN(num) || num < 0) return;

    setResult(isPrime(num));
  };

  const reset = () => {
    setNumber("");
    setResult(null);
  };

  return (
    <div className="w-full max-w-5xl mx-auto space-y-8">
      <Card>
        
        <CardContent>
          <div className="space-y-4">
            <div>
              <label className="text-sm text-muted-foreground mb-2 block">Number</label>
              <Input
                type="number"
                placeholder="e.g., 17"
                min="0"
                value={number}
                onChange={(e) => setNumber(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <Button onClick={calculate}>Check</Button>
              <Button variant="outline" onClick={reset}>Reset</Button>
            </div>
            {result && (
              <div className="p-4 bg-muted rounded-md space-y-2">
                <div>
                  <p className="text-sm text-muted-foreground">Result</p>
                  <p className={`text-2xl font-semibold ${result.isPrime ? 'text-green-600' : 'text-destructive'}`}>
                    {result.isPrime ? "Prime Number ✓" : "Not a Prime Number ✗"}
                  </p>
                </div>
                {!result.isPrime && result.factors && result.factors.length > 0 && (
                  <div>
                    <p className="text-sm text-muted-foreground">Factors</p>
                    <p className="text-lg">{result.factors.join(", ")}</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>How Prime Number Testing Works</CardTitle>
          <CardDescription>Understanding primality testing algorithms</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">1</div>
              <div>
                <h4 className="font-semibold">Check Basic Conditions</h4>
                <p className="text-sm text-muted-foreground">
                  Numbers less than 2 are not prime. The number 2 is the only even prime. Any other even number is divisible by 2, so it is not prime.
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">2</div>
              <div>
                <h4 className="font-semibold">Test Odd Divisors Up to √n</h4>
                <p className="text-sm text-muted-foreground">
                  Check if any odd number from 3 to √n divides evenly. If n has a factor larger than √n, it must also have a factor smaller than √n. This optimization greatly speeds up testing.
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">3</div>
              <div>
                <h4 className="font-semibold">Determine Primality</h4>
                <p className="text-sm text-muted-foreground">
                  If no divisors are found, the number is prime – it has exactly two factors: 1 and itself. If divisors exist, the number is composite and we list all its factors.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Prime Number Features and Properties</CardTitle>
          <CardDescription>Fascinating facts about prime numbers</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="rounded-lg border p-4">
              <h4 className="font-semibold text-sm mb-2">**Definition of Prime**</h4>
              <p className="text-xs text-muted-foreground">
                A prime number has exactly two positive divisors: 1 and itself. The first primes are 2, 3, 5, 7, 11, 13, 17, 19, 23, 29... Note that 1 is NOT prime by definition.
              </p>
            </div>
            <div className="rounded-lg border p-4">
              <h4 className="font-semibold text-sm mb-2">**Fundamental Theorem of Arithmetic**</h4>
              <p className="text-xs text-muted-foreground">
                Every integer greater than 1 can be uniquely expressed as a product of primes. This makes primes the "building blocks" of all numbers – essential for number theory and cryptography.
              </p>
            </div>
            <div className="rounded-lg border p-4">
              <h4 className="font-semibold text-sm mb-2">**Infinite Primes**</h4>
              <p className="text-xs text-muted-foreground">
                Euclid proved around 300 BCE that there are infinitely many primes. His elegant proof shows that assuming finitely many primes leads to a contradiction.
              </p>
            </div>
            <div className="rounded-lg border p-4">
              <h4 className="font-semibold text-sm mb-2">**Cryptography Applications**</h4>
              <p className="text-xs text-muted-foreground">
                Modern encryption (RSA) relies on the difficulty of factoring large composite numbers into primes. Large primes (hundreds of digits) secure internet communications and digital signatures.
              </p>
            </div>
          </div>

          <div className="mt-6">
            <h4 className="font-semibold mb-3">Prime Numbers Reference Table</h4>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Range</TableHead>
                  <TableHead>Prime Numbers</TableHead>
                  <TableHead>Count</TableHead>
                  <TableHead>Notable Facts</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell className="font-medium">1-10</TableCell>
                  <TableCell className="font-mono text-xs">2, 3, 5, 7</TableCell>
                  <TableCell className="font-mono">4</TableCell>
                  <TableCell className="text-xs">Only even prime is 2</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">11-20</TableCell>
                  <TableCell className="font-mono text-xs">11, 13, 17, 19</TableCell>
                  <TableCell className="font-mono">4</TableCell>
                  <TableCell className="text-xs">Twin primes: (11,13), (17,19)</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">21-50</TableCell>
                  <TableCell className="font-mono text-xs">23, 29, 31, 37, 41, 43, 47</TableCell>
                  <TableCell className="font-mono">7</TableCell>
                  <TableCell className="text-xs">Includes twin primes (29,31), (41,43)</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">51-100</TableCell>
                  <TableCell className="font-mono text-xs">53, 59, 61, 67, 71, 73, 79, 83, 89, 97</TableCell>
                  <TableCell className="font-mono">10</TableCell>
                  <TableCell className="text-xs">10 primes in this range</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">First 25 Primes</TableCell>
                  <TableCell className="font-mono text-xs">2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89, 97</TableCell>
                  <TableCell className="font-mono">25</TableCell>
                  <TableCell className="text-xs">All primes under 100</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Frequently Asked Questions</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <h4 className="font-semibold text-sm mb-2">Why is 1 not a prime number?</h4>
            <p className="text-xs text-muted-foreground">
              By definition, primes must have exactly two distinct positive divisors. The number 1 has only one divisor (itself). Excluding 1 ensures unique prime factorization for all numbers.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">What is the smallest prime number?</h4>
            <p className="text-xs text-muted-foreground">
              The smallest prime is 2. It is also the only even prime number. All other even numbers are divisible by 2, making them composite.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">How do you check if a large number is prime?</h4>
            <p className="text-xs text-muted-foreground">
              For large numbers, trial division becomes slow. Advanced algorithms like Miller-Rabin (probabilistic) or AKS (deterministic) are used. Cryptography uses specialized primality tests for huge numbers.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">What are twin primes?</h4>
            <p className="text-xs text-muted-foreground">
              Twin primes are pairs of primes that differ by 2, like (3,5), (11,13), (17,19). The Twin Prime Conjecture states there are infinitely many such pairs, but this remains unproven.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">Are there patterns in prime numbers?</h4>
            <p className="text-xs text-muted-foreground">
              Primes appear random but follow statistical patterns. The Prime Number Theorem describes their distribution. The Riemann Hypothesis, one of math's biggest unsolved problems, relates to prime distribution.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
