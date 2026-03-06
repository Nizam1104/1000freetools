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

export default function PrimeFactorizationCalculator() {
  const [number, setNumber] = useState<string>("");
  const [result, setResult] = useState<{ factors: number[]; exponential: string } | null>(null);

  const calculate = () => {
    const num = parseInt(number);

    if (!isNaN(num) && num > 1) {
      const factors: number[] = [];
      let n = num;

      // Check for 2
      while (n % 2 === 0) {
        factors.push(2);
        n = n / 2;
      }

      // Check odd numbers
      for (let i = 3; i <= Math.sqrt(n); i += 2) {
        while (n % i === 0) {
          factors.push(i);
          n = n / i;
        }
      }

      if (n > 2) {
        factors.push(n);
      }

      // Create exponential form
      const factorCount: Record<number, number> = {};
      factors.forEach((f) => {
        factorCount[f] = (factorCount[f] || 0) + 1;
      });

      const exponential = Object.entries(factorCount)
        .map(([factor, exp]) => exp > 1 ? `${factor}^${exp}` : factor)
        .join(" × ");

      setResult({ factors, exponential });
    }
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
                placeholder="e.g., 84"
                min="2"
                value={number}
                onChange={(e) => setNumber(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <Button onClick={calculate}>Factorize</Button>
              <Button variant="outline" onClick={reset}>Reset</Button>
            </div>
            {result && (
              <div className="p-4 bg-muted rounded-md space-y-3">
                <div>
                  <p className="text-sm text-muted-foreground">Prime Factors</p>
                  <p className="text-lg">{result.factors.join(" × ")}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Exponential Form</p>
                  <p className="text-xl font-semibold">{result.exponential}</p>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>How Prime Factorization Works</CardTitle>
          <CardDescription>Step-by-step factorization method</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">1</div>
              <div>
                <h4 className="font-semibold">Divide by 2 Repeatedly</h4>
                <p className="text-sm text-muted-foreground">
                  Start with the smallest prime (2). Keep dividing by 2 until the number becomes odd. Each successful division gives you a prime factor of 2.
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">2</div>
              <div>
                <h4 className="font-semibold">Test Odd Primes Up to √n</h4>
                <p className="text-sm text-muted-foreground">
                  Try dividing by 3, 5, 7, 9, 11... up to the square root of the remaining number. Each time a divisor works, record it and continue with the quotient.
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">3</div>
              <div>
                <h4 className="font-semibold">Handle Remaining Prime</h4>
                <p className="text-sm text-muted-foreground">
                  If after all divisions a number greater than 2 remains, that number itself is prime. Add it to your factor list. Now express in exponential form.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Prime Factorization Features and Applications</CardTitle>
          <CardDescription>Why prime factorization matters</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="rounded-lg border p-4">
              <h4 className="font-semibold text-sm mb-2">**Fundamental Theorem of Arithmetic**</h4>
              <p className="text-xs text-muted-foreground">
                Every integer greater than 1 has a unique prime factorization. This uniqueness is foundational to number theory and ensures consistent results regardless of factorization method.
              </p>
            </div>
            <div className="rounded-lg border p-4">
              <h4 className="font-semibold text-sm mb-2">**Finding GCD and LCM**</h4>
              <p className="text-xs text-muted-foreground">
                Prime factorization makes finding GCD and LCM easy. GCD uses common primes with lowest exponents. LCM uses all primes with highest exponents. Essential for fraction operations.
              </p>
            </div>
            <div className="rounded-lg border p-4">
              <h4 className="font-semibold text-sm mb-2">**Simplifying Radicals**</h4>
              <p className="text-xs text-muted-foreground">
                To simplify √72, factor as 2³ × 3². Pull out pairs: 2 × 3 × √2 = 6√2. Prime factorization is the reliable method for simplifying square roots and higher radicals.
              </p>
            </div>
            <div className="rounded-lg border p-4">
              <h4 className="font-semibold text-sm mb-2">**Cryptography Foundation**</h4>
              <p className="text-xs text-muted-foreground">
                RSA encryption depends on the difficulty of factoring large numbers. While multiplying primes is easy, reversing the process for huge numbers is computationally infeasible.
              </p>
            </div>
          </div>

          <div className="mt-6">
            <h4 className="font-semibold mb-3">Prime Factorization Examples</h4>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Number</TableHead>
                  <TableHead>Prime Factors</TableHead>
                  <TableHead>Exponential Form</TableHead>
                  <TableHead>Verification</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell className="font-medium">12</TableCell>
                  <TableCell className="font-mono text-xs">2 × 2 × 3</TableCell>
                  <TableCell className="font-mono text-xs">2² × 3</TableCell>
                  <TableCell className="text-xs">4×3=12 ✓</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">60</TableCell>
                  <TableCell className="font-mono text-xs">2 × 2 × 3 × 5</TableCell>
                  <TableCell className="font-mono text-xs">2² × 3 × 5</TableCell>
                  <TableCell className="text-xs">4×3×5=60 ✓</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">84</TableCell>
                  <TableCell className="font-mono text-xs">2 × 2 × 3 × 7</TableCell>
                  <TableCell className="font-mono text-xs">2² × 3 × 7</TableCell>
                  <TableCell className="text-xs">4×3×7=84 ✓</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">100</TableCell>
                  <TableCell className="font-mono text-xs">2 × 2 × 5 × 5</TableCell>
                  <TableCell className="font-mono text-xs">2² × 5²</TableCell>
                  <TableCell className="text-xs">4×25=100 ✓</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">144</TableCell>
                  <TableCell className="font-mono text-xs">2×2×2×2×3×3</TableCell>
                  <TableCell className="font-mono text-xs">2⁴ × 3²</TableCell>
                  <TableCell className="text-xs">16×9=144 ✓</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">210</TableCell>
                  <TableCell className="font-mono text-xs">2 × 3 × 5 × 7</TableCell>
                  <TableCell className="font-mono text-xs">2 × 3 × 5 × 7</TableCell>
                  <TableCell className="text-xs">Product of first 4 primes</TableCell>
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
            <h4 className="font-semibold text-sm mb-2">What is prime factorization?</h4>
            <p className="text-xs text-muted-foreground">
              Prime factorization breaks a number down into its prime number building blocks. For example, 12 = 2 × 2 × 3. Every composite number has exactly one prime factorization.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">How do you write prime factorization in exponential form?</h4>
            <p className="text-xs text-muted-foreground">
              Count how many times each prime appears. Write the prime with that count as an exponent. For 72 = 2×2×2×3×3, write as 2³ × 3². This is more compact and useful for calculations.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">What is a factor tree?</h4>
            <p className="text-xs text-muted-foreground">
              A factor tree is a visual method for prime factorization. Start with the number, branch into any two factors, then keep branching until all endpoints are prime. The leaves give the factorization.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">Why stop at √n when finding factors?</h4>
            <p className="text-xs text-muted-foreground">
              If n has a factor larger than √n, it must also have a corresponding factor smaller than √n. So checking up to √n finds all factor pairs. This optimization makes factorization much faster.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">Can prime factorization help with fractions?</h4>
            <p className="text-xs text-muted-foreground">
              Yes! Use prime factorization to find the LCD (least common denominator) for adding fractions. Factor each denominator, then LCM uses highest power of each prime that appears.
            </p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Related Tools</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid sm:grid-cols-3 gap-4">
            <a href="/calculators/prime-checker" className="p-4 rounded-lg border hover:bg-muted transition-colors">
              <p className="font-semibold text-sm">Prime Checker</p>
              <p className="text-xs text-muted-foreground">Test if a number is prime</p>
            </a>
            <a href="/calculators/gcd-calculator" className="p-4 rounded-lg border hover:bg-muted transition-colors">
              <p className="font-semibold text-sm">GCD Calculator</p>
              <p className="text-xs text-muted-foreground">Find greatest common divisor</p>
            </a>
            <a href="/calculators/lcm-calculator" className="p-4 rounded-lg border hover:bg-muted transition-colors">
              <p className="font-semibold text-sm">LCM Calculator</p>
              <p className="text-xs text-muted-foreground">Calculate least common multiple</p>
            </a>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
