"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function EulersTotientCalculator() {
  const [number, setNumber] = useState("");
  const [result, setResult] = useState<{
    totient: number;
    primeFactors: number[];
    coprimes: number[];
    steps: string[];
  } | null>(null);
  const [error, setError] = useState("");

  const calculate = () => {
    setError("");
    setResult(null);

    const n = parseInt(number);

    if (isNaN(n) || n < 1) {
      setError("Please enter a positive integer");
      return;
    }

    if (n > 100000) {
      setError("Please enter a number up to 100,000 for performance");
      return;
    }

    try {
      const primeFactors: number[] = [];
      let temp = n;

      for (let i = 2; i <= temp; i++) {
        while (temp % i === 0) {
          if (!primeFactors.includes(i)) {
            primeFactors.push(i);
          }
          temp = temp / i;
        }
      }

      let totient = n;
      for (const p of primeFactors) {
        totient = totient * (p - 1) / p;
      }
      totient = Math.floor(totient);

      const coprimes: number[] = [];
      for (let i = 1; i <= n; i++) {
        if (gcd(i, n) === 1) {
          coprimes.push(i);
        }
      }

      const steps = [
        `Finding Euler's totient function φ(${n})`,
        ``,
        `Step 1: Find prime factorization of ${n}`,
        `${n} = ${primeFactors.map((p, i) => i === 0 ? `${p}` : `× ${p}`).join(' ')}`,
        `Distinct prime factors: ${primeFactors.join(', ')}`,
        ``,
        `Step 2: Apply Euler's totient formula`,
        `φ(n) = n × ∏(1 - 1/p) for each prime p`,
        `φ(${n}) = ${n} × ${primeFactors.map(p => `(1 - 1/${p})`).join(' × ')}`,
        `φ(${n}) = ${n} × ${primeFactors.map(p => `${p-1}/${p}`).join(' × ')}`,
        `φ(${n}) = ${totient}`,
        ``,
        `Step 3: Verify by counting coprimes`,
        `Numbers coprime to ${n}: ${coprimes.slice(0, 30).join(', ')}${coprimes.length > 30 ? '...' : ''}`,
        `Count: ${coprimes.length}`
      ];

      setResult({
        totient,
        primeFactors,
        coprimes,
        steps
      });
    } catch (e) {
      setError("Unable to calculate. Please check your input.");
    }
  };

  const gcd = (a: number, b: number): number => {
    while (b !== 0) {
      const temp = b;
      b = a % b;
      a = temp;
    }
    return a;
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
    <div className="w-full max-w-4xl mx-auto space-y-8">
      <div className="mb-8">
        <h1 className="text-3xl font-semibold mb-2">Euler's Totient Function Calculator – Compute φ(n) Online</h1>
        <p className="text-muted-foreground">
          Calculate Euler's totient function φ(n) for any integer with our free online calculator. Find the count of integers up to n that share no common factor with n, with step-by-step solutions and coprime listings.
        </p>
      </div>

      <div className="space-y-4">
        <div>
          <Label htmlFor="number">Enter a positive integer (n):</Label>
          <Input
            id="number"
            type="number"
            placeholder="e.g., 12"
            value={number}
            onChange={(e) => setNumber(e.target.value)}
          />
          <p className="text-xs text-muted-foreground mt-1">Supports numbers up to 100,000</p>
        </div>

        <div className="flex gap-2 flex-wrap">
          <Button onClick={calculate}>Calculate φ(n)</Button>
          <Button variant="outline" onClick={reset}>Reset</Button>
          <Button variant="outline" onClick={() => loadExample("12")}>φ(12)</Button>
          <Button variant="outline" onClick={() => loadExample("36")}>φ(36)</Button>
          <Button variant="outline" onClick={() => loadExample("100")}>φ(100)</Button>
          <Button variant="outline" onClick={() => loadExample("17")}>φ(17)</Button>
          <Button variant="outline" onClick={() => loadExample("60")}>φ(60)</Button>
          <Button variant="outline" onClick={() => loadExample("97")}>φ(97)</Button>
          <Button variant="outline" onClick={() => loadExample("1000")}>φ(1000)</Button>
        </div>

        {error && (
          <div className="p-4 bg-destructive/10 text-destructive rounded-md">
            <p className="text-sm">{error}</p>
          </div>
        )}

        {result && (
          <div className="space-y-4">
            <div className="p-6 bg-muted rounded-lg">
              <div className="text-center mb-4">
                <p className="text-sm text-muted-foreground mb-2">Euler's Totient Function</p>
                <p className="text-5xl font-bold">φ({number}) = {result.totient}</p>
                <p className="text-sm text-muted-foreground mt-2">
                  {result.totient} numbers are coprime to {number}
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="p-4 bg-background rounded border">
                  <p className="text-xs text-muted-foreground mb-2">Prime Factorization</p>
                  <p className="text-lg font-mono">{result.primeFactors.join(' × ')}</p>
                </div>
                <div className="p-4 bg-background rounded border">
                  <p className="text-xs text-muted-foreground mb-2">Coprime Ratio</p>
                  <p className="text-lg">Out of {number} numbers, {result.totient} are coprime</p>
                  <p className="text-sm text-muted-foreground">
                    ({Math.round(result.totient / parseInt(number) * 100)}%)
                  </p>
                </div>
              </div>
            </div>

            <div className="p-4 border rounded-lg">
              <h4 className="font-semibold text-sm mb-3">Coprime Numbers (1 to {number})</h4>
              <div className="flex flex-wrap gap-2 max-h-64 overflow-y-auto">
                {result.coprimes.map((num) => (
                  <div key={num} className="p-2 bg-muted rounded text-center min-w-10">
                    <p className="font-mono text-sm">{num}</p>
                  </div>
                ))}
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                These {result.coprimes.length} numbers share no common factor with {number} other than 1.
              </p>
            </div>

            <div className="p-4 border rounded-lg">
              <h4 className="font-semibold text-sm mb-3">Step-by-Step Solution</h4>
              <div className="space-y-2 font-mono text-sm bg-muted p-3 rounded max-h-96 overflow-y-auto">
                {result.steps.map((step, i) => (
                  <div key={i} className={step === "" ? "h-4" : ""}>
                    {step}
                  </div>
                ))}
              </div>
            </div>

            <div className="p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg">
              <h4 className="font-semibold text-sm mb-2 text-blue-700 dark:text-blue-400">Euler's Theorem</h4>
              <p className="text-sm text-muted-foreground">
                For any integer a coprime to n: a^φ(n) ≡ 1 (mod n). This fundamental theorem is the basis for RSA encryption.
              </p>
            </div>
          </div>
        )}
      </div>

      <section className="border-t pt-8 space-y-6">
        <h2 className="text-2xl font-semibold">Understanding Euler's Totient Function</h2>
        <p className="text-muted-foreground">
          Euler's totient function, written as φ(n) (phi of n), counts how many positive integers up to n are coprime to n. Two numbers are coprime if their greatest common divisor (GCD) is 1 – meaning they share no common factors other than 1.
        </p>
        <p className="text-muted-foreground">
          For example, φ(12) = 4 because among the numbers 1 through 12, only four are coprime to 12: namely 1, 5, 7, and 11. The others (2, 3, 4, 6, 8, 9, 10, 12) all share a common factor with 12.
        </p>
      </section>

      <section className="border-t pt-8 space-y-6">
        <h3 className="text-xl font-semibold">The Totient Formula</h3>
        <div className="p-6 bg-muted rounded-lg">
          <div className="text-center mb-4">
            <p className="text-lg font-mono">φ(n) = n × ∏(1 - 1/p) for each distinct prime p dividing n</p>
          </div>
          <div className="grid md:grid-cols-2 gap-4 text-sm">
            <div>
              <h4 className="font-semibold mb-2">How to Calculate</h4>
              <ol className="space-y-2">
                <li>1. Find the prime factorization of n</li>
                <li>2. List each distinct prime factor (ignore repeats)</li>
                <li>3. For each prime p, multiply by (1 - 1/p)</li>
                <li>4. Simplify to get φ(n)</li>
              </ol>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Special Cases</h4>
              <ul className="space-y-2">
                <li>• φ(1) = 1 (by definition)</li>
                <li>• φ(p) = p - 1 for any prime p</li>
                <li>• φ(p^k) = p^k - p^(k-1) for prime powers</li>
                <li>• φ(mn) = φ(m) × φ(n) when gcd(m,n) = 1</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t pt-8 space-y-6">
        <h3 className="text-xl font-semibold">Worked Examples</h3>
        <div className="space-y-4">
          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-3">Example 1: φ(12)</h4>
            <div className="text-sm space-y-2">
              <p>Prime factorization: 12 = 2 × 2 × 3 = 2² × 3</p>
              <p>Distinct primes: 2, 3</p>
              <p>φ(12) = 12 × (1 - 1/2) × (1 - 1/3)</p>
              <p>φ(12) = 12 × 1/2 × 2/3 = 4</p>
              <p>Coprimes: 1, 5, 7, 11</p>
              <p className="text-muted-foreground">Four numbers from 1 to 12 share no common factor with 12.</p>
            </div>
          </div>

          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-3">Example 2: φ(36)</h4>
            <div className="text-sm space-y-2">
              <p>Prime factorization: 36 = 2² × 3²</p>
              <p>Distinct primes: 2, 3</p>
              <p>φ(36) = 36 × (1 - 1/2) × (1 - 1/3)</p>
              <p>φ(36) = 36 × 1/2 × 2/3 = 12</p>
              <p>Coprimes: 1, 5, 7, 11, 13, 17, 19, 23, 25, 29, 31, 35</p>
              <p className="text-muted-foreground">Twelve numbers are coprime to 36. Notice the pattern – they avoid multiples of 2 and 3.</p>
            </div>
          </div>

          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-3">Example 3: φ(100)</h4>
            <div className="text-sm space-y-2">
              <p>Prime factorization: 100 = 2² × 5²</p>
              <p>Distinct primes: 2, 5</p>
              <p>φ(100) = 100 × (1 - 1/2) × (1 - 1/5)</p>
              <p>φ(100) = 100 × 1/2 × 4/5 = 40</p>
              <p className="text-muted-foreground">40% of numbers up to 100 are coprime to 100. These are numbers not divisible by 2 or 5.</p>
            </div>
          </div>

          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-3">Example 4: φ(17)</h4>
            <div className="text-sm space-y-2">
              <p>Prime factorization: 17 is prime</p>
              <p>For any prime p: φ(p) = p - 1</p>
              <p>φ(17) = 17 - 1 = 16</p>
              <p>Coprimes: 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16</p>
              <p className="text-muted-foreground">Every number less than a prime is coprime to it. That's why φ(p) = p - 1.</p>
            </div>
          </div>

          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-3">Example 5: φ(60)</h4>
            <div className="text-sm space-y-2">
              <p>Prime factorization: 60 = 2² × 3 × 5</p>
              <p>Distinct primes: 2, 3, 5</p>
              <p>φ(60) = 60 × (1 - 1/2) × (1 - 1/3) × (1 - 1/5)</p>
              <p>φ(60) = 60 × 1/2 × 2/3 × 4/5 = 16</p>
              <p>Coprimes: 1, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 49, 53, 59</p>
              <p className="text-muted-foreground">Only 16 of 60 numbers are coprime to 60. Numbers must avoid factors 2, 3, and 5.</p>
            </div>
          </div>

          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-3">Example 6: φ(97)</h4>
            <div className="text-sm space-y-2">
              <p>Prime factorization: 97 is prime</p>
              <p>φ(97) = 97 - 1 = 96</p>
              <p className="text-muted-foreground">97 is prime, so all 96 numbers from 1 to 96 are coprime to it. Prime numbers maximize the totient ratio.</p>
            </div>
          </div>

          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-3">Example 7: φ(1000)</h4>
            <div className="text-sm space-y-2">
              <p>Prime factorization: 1000 = 2³ × 5³</p>
              <p>Distinct primes: 2, 5</p>
              <p>φ(1000) = 1000 × (1 - 1/2) × (1 - 1/5)</p>
              <p>φ(1000) = 1000 × 1/2 × 4/5 = 400</p>
              <p className="text-muted-foreground">400 numbers up to 1000 are coprime to 1000. These are numbers not divisible by 2 or 5.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t pt-8 space-y-6">
        <h3 className="text-xl font-semibold">Quick Fact</h3>
        <div className="p-6 bg-primary/10 rounded-lg border border-primary/20">
          <p className="text-sm">
            <strong>Euler's totient function is essential for RSA encryption.</strong> The security of RSA depends on the difficulty of computing φ(n) for large n without knowing its prime factors. Your online banking, secure messaging, and digital signatures all rely on this mathematical function discovered by Leonhard Euler in 1763.
          </p>
        </div>
      </section>

      <section className="border-t pt-8 space-y-6">
        <h3 className="text-xl font-semibold">Frequently Asked Questions</h3>
        <div className="space-y-6">
          <div>
            <h4 className="font-semibold text-sm mb-2">What does φ(n) tell us?</h4>
            <p className="text-sm text-muted-foreground">
              φ(n) counts how many numbers from 1 to n are coprime to n. It also equals the size of the multiplicative group of integers modulo n – important in abstract algebra and cryptography.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">Why is φ(p) = p - 1 for primes?</h4>
            <p className="text-sm text-muted-foreground">
              A prime p has no factors other than 1 and itself. So every number from 1 to p-1 shares no common factor with p (except 1). All p-1 numbers are coprime to p.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">What's the maximum value of φ(n)?</h4>
            <p className="text-sm text-muted-foreground">
              For any n, φ(n) ≤ n - 1, with equality only when n is prime. The ratio φ(n)/n is highest for primes (approaching 1) and lowest for products of many small primes.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">Is φ(n) always even?</h4>
            <p className="text-sm text-muted-foreground">
              φ(n) is even for all n {'>'} 2. The only odd values are φ(1) = 1 and φ(2) = 1. This is because coprime numbers come in pairs: if k is coprime to n, so is n - k.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">How is the totient function used in RSA?</h4>
            <p className="text-sm text-muted-foreground">
              RSA uses φ(n) where n = p × q (two large primes). The public and private keys are chosen using φ(n) = (p-1)(q-1). Factoring n to find φ(n) is computationally hard, which makes RSA secure.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">What is Euler's theorem?</h4>
            <p className="text-sm text-muted-foreground">
              Euler's theorem states: if gcd(a, n) = 1, then a^φ(n) ≡ 1 (mod n). This generalizes Fermat's little theorem and is fundamental to modular arithmetic and cryptography.
            </p>
          </div>
        </div>
      </section>

      <section className="border-t pt-8 space-y-6">
        <h3 className="text-xl font-semibold">Related Math Tools</h3>
        <div className="grid sm:grid-cols-3 gap-4">
          <a href="/math-tools/gcd-calculator" className="p-4 rounded-lg border hover:bg-muted transition-colors">
            <p className="font-semibold text-sm">GCD Calculator</p>
            <p className="text-xs text-muted-foreground">Find greatest common divisor</p>
          </a>
          <a href="/math-tools/prime-factorization-calculator" className="p-4 rounded-lg border hover:bg-muted transition-colors">
            <p className="font-semibold text-sm">Prime Factorization</p>
            <p className="text-xs text-muted-foreground">Break into prime factors</p>
          </a>
          <a href="/math-tools/modular-arithmetic-calculator" className="p-4 rounded-lg border hover:bg-muted transition-colors">
            <p className="font-semibold text-sm">Modular Arithmetic</p>
            <p className="text-xs text-muted-foreground">Mod operations calculator</p>
          </a>
        </div>
      </section>
    </div>
  );
}
