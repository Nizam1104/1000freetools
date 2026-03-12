"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function PerfectNumberChecker() {
  const [number, setNumber] = useState("");
  const [result, setResult] = useState<{
    isPerfect: boolean;
    properDivisors: number[];
    sum: number;
    explanation: string;
  } | null>(null);
  const [error, setError] = useState("");

  const getProperDivisors = (num: number): number[] => {
    if (num <= 1) return [];

    const divisors = [1];
    for (let i = 2; i <= Math.sqrt(num); i++) {
      if (num % i === 0) {
        divisors.push(i);
        if (i !== num / i && num / i !== num) {
          divisors.push(num / i);
        }
      }
    }
    return divisors.sort((a, b) => a - b);
  };

  const checkPerfect = () => {
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
    const properDivisors = getProperDivisors(num);
    const sum = properDivisors.reduce((a, b) => a + b, 0);
    const isPerfect = sum === num && num > 1;

    let explanation: string;
    if (num === 1) {
      explanation = "1 is not a perfect number. By definition, perfect numbers must be greater than 1.";
    } else if (isPerfect) {
      explanation = `${num} is a perfect number! The sum of its proper divisors equals ${num}.`;
    } else if (sum < num) {
      explanation = `${num} is deficient. The sum of its proper divisors (${sum}) is less than ${num}.`;
    } else {
      explanation = `${num} is abundant. The sum of its proper divisors (${sum}) is greater than ${num}.`;
    }

    setResult({
      isPerfect,
      properDivisors,
      sum,
      explanation,
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
        <h1 className="text-3xl font-semibold mb-2">Perfect Number Checker - Is It a Perfect Number?</h1>
        <p className="text-muted-foreground">
          Check if any number is a perfect number with our free online perfect number checker. Instantly determine if the sum of proper divisors equals the number itself.
        </p>
      </div>

      <div className="space-y-4">
        <div>
          <Label>Number</Label>
          <Input
            type="number"
            placeholder="Enter a positive integer (e.g., 28)"
            value={number}
            onChange={(e) => setNumber(e.target.value)}
          />
        </div>

        <div className="flex flex-wrap gap-2">
          <Button onClick={checkPerfect}>Check if Perfect</Button>
          <Button variant="outline" onClick={reset}>Reset</Button>
        </div>

        <div className="flex flex-wrap gap-2">
          <span className="text-xs text-muted-foreground self-center">Examples:</span>
          <Button variant="ghost" size="sm" onClick={() => loadExample("6")}>6 (smallest)</Button>
          <Button variant="ghost" size="sm" onClick={() => loadExample("28")}>28</Button>
          <Button variant="ghost" size="sm" onClick={() => loadExample("496")}>496</Button>
          <Button variant="ghost" size="sm" onClick={() => loadExample("8128")}>8128</Button>
          <Button variant="ghost" size="sm" onClick={() => loadExample("12")}>12 (abundant)</Button>
          <Button variant="ghost" size="sm" onClick={() => loadExample("15")}>15 (deficient)</Button>
          <Button variant="ghost" size="sm" onClick={() => loadExample("100")}>100</Button>
        </div>

        {error && (
          <div className="p-4 bg-destructive/10 text-destructive rounded-md">
            <p className="text-sm">{error}</p>
          </div>
        )}

        {result && (
          <div className="space-y-4">
            <div className={`p-6 rounded-lg text-center ${result.isPerfect ? "bg-green-500/10 border border-green-500/30" : "bg-muted"}`}>
              <p className={`text-5xl font-bold mb-2 ${result.isPerfect ? "text-green-600" : ""}`}>
                {result.isPerfect ? "Perfect Number" : "Not Perfect"}
              </p>
              <p className="text-sm text-muted-foreground">{result.explanation}</p>
            </div>

            <div className="p-4 bg-muted rounded-lg">
              <p className="text-sm font-semibold mb-2">Proper Divisors of {number}</p>
              <p className="text-lg font-mono">{result.properDivisors.join(", ")}</p>
              <p className="text-sm text-muted-foreground mt-2">
                Sum: {result.properDivisors.join(" + ")} = {result.sum}
              </p>
            </div>

            {!result.isPerfect && result.sum !== parseInt(number) && (
              <div className="p-4 border rounded-lg">
                <p className="text-sm font-semibold mb-2">How Close Is It?</p>
                <p className="text-sm text-muted-foreground">
                  The sum of divisors ({result.sum}) is {Math.abs(result.sum - parseInt(number))} {result.sum < parseInt(number) ? "less" : "more"} than {number}.
                </p>
              </div>
            )}
          </div>
        )}
      </div>

      <section className="border-t pt-8 space-y-6">
        <h2 className="text-2xl font-semibold">Understanding Perfect Numbers</h2>
        <p className="text-muted-foreground">
          A perfect number is a positive integer that equals the sum of its proper divisors - all the positive whole numbers that divide it evenly, excluding the number itself. It's like the number is perfectly balanced: its parts add up exactly to the whole.
        </p>
        <p className="text-muted-foreground">
          Take 6, the smallest perfect number. Its proper divisors are 1, 2, and 3. Add them up: 1 + 2 + 3 = 6. Perfect. The next one is 28: its divisors 1, 2, 4, 7, and 14 sum to exactly 28.
        </p>
      </section>

      <section className="border-t pt-8 space-y-6">
        <h3 className="text-xl font-semibold">How to Check if a Number Is Perfect</h3>
        <div className="space-y-4">
          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-2">Step 1: Find All Proper Divisors</h4>
            <p className="text-sm text-muted-foreground">
              List all positive integers that divide the number evenly, excluding the number itself. Start with 1 (always a divisor), then check 2, 3, 4, and so on up to the square root of the number.
            </p>
          </div>
          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-2">Step 2: Add Them Up</h4>
            <p className="text-sm text-muted-foreground">
              Sum all the proper divisors you found. This is called the aliquot sum.
            </p>
          </div>
          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-2">Step 3: Compare</h4>
            <p className="text-sm text-muted-foreground">
              If the sum equals the original number, it's perfect. If the sum is less, the number is deficient. If the sum is more, it's abundant.
            </p>
          </div>
        </div>
      </section>

      <section className="border-t pt-8 space-y-6">
        <h3 className="text-xl font-semibold">Worked Examples</h3>
        <div className="space-y-4">
          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-2">Example 1: Checking 6</h4>
            <div className="font-mono text-xs bg-muted p-3 rounded space-y-1">
              <div>Number: 6</div>
              <div>Find divisors: 6 ÷ 1 = 6 ✓, 6 ÷ 2 = 3 ✓, 6 ÷ 3 = 2 ✓</div>
              <div>Proper divisors (excluding 6): 1, 2, 3</div>
              <div>Sum: 1 + 2 + 3 = 6</div>
              <div className="text-green-600 font-semibold">6 = 6, so 6 is a perfect number!</div>
            </div>
          </div>

          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-2">Example 2: Checking 28</h4>
            <div className="font-mono text-xs bg-muted p-3 rounded space-y-1">
              <div>Number: 28</div>
              <div>Find divisors: 1, 2, 4, 7, 14 (all divide 28 evenly)</div>
              <div>Proper divisors: 1, 2, 4, 7, 14</div>
              <div>Sum: 1 + 2 + 4 + 7 + 14 = 28</div>
              <div className="text-green-600 font-semibold">28 = 28, so 28 is a perfect number!</div>
            </div>
          </div>

          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-2">Example 3: Checking 12 (Abundant)</h4>
            <div className="font-mono text-xs bg-muted p-3 rounded space-y-1">
              <div>Number: 12</div>
              <div>Proper divisors: 1, 2, 3, 4, 6</div>
              <div>Sum: 1 + 2 + 3 + 4 + 6 = 16</div>
              <div className="text-amber-600 font-semibold">16 &gt; 12, so 12 is abundant (sum exceeds the number)</div>
            </div>
          </div>

          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-2">Example 4: Checking 15 (Deficient)</h4>
            <div className="font-mono text-xs bg-muted p-3 rounded space-y-1">
              <div>Number: 15</div>
              <div>Proper divisors: 1, 3, 5</div>
              <div>Sum: 1 + 3 + 5 = 9</div>
              <div className="text-blue-600 font-semibold">9 &lt; 15, so 15 is deficient (sum is less than the number)</div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t pt-8 space-y-6">
        <h3 className="text-xl font-semibold">Quick Fact</h3>
        <div className="p-4 bg-primary/10 border border-primary/30 rounded-lg">
          <p className="text-sm">
            Only 51 perfect numbers are known today, and they grow astronomically large. The first four (6, 28, 496, 8128) were known to ancient Greek mathematicians. The fifth wasn't discovered until 1456. The largest known perfect number has over 49 million digits - writing it out would fill thousands of books. All known perfect numbers are even; whether any odd perfect numbers exist remains one of mathematics' oldest unsolved problems.
          </p>
        </div>
      </section>

      <section className="border-t pt-8 space-y-6">
        <h3 className="text-xl font-semibold">Frequently Asked Questions</h3>
        <div className="space-y-6">
          <div>
            <h4 className="font-semibold text-sm mb-2">What are the first 10 perfect numbers?</h4>
            <p className="text-sm text-muted-foreground">
              The first four are 6, 28, 496, and 8128. The fifth is 33,550,336. After that they explode in size: the sixth is over 8 billion, and by the 10th perfect number, you're dealing with numbers with hundreds of digits. Only 51 perfect numbers have been discovered as of 2024.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">Is there a formula for perfect numbers?</h4>
            <p className="text-sm text-muted-foreground">
              Yes, for even perfect numbers. Euclid proved that if 2^p - 1 is prime (a Mersenne prime), then 2^(p-1) × (2^p - 1) is a perfect number. Euler later proved this generates ALL even perfect numbers. Every even perfect number corresponds to a Mersenne prime.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">Are there any odd perfect numbers?</h4>
            <p className="text-sm text-muted-foreground">
              Nobody knows. Mathematicians have proven that if an odd perfect number exists, it must be larger than 10^1500, have at least 101 prime factors, and satisfy dozens of other conditions. But no one has proven they can't exist or found one yet.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">What's the difference between perfect, abundant, and deficient numbers?</h4>
            <p className="text-sm text-muted-foreground">
              It's about the sum of proper divisors. Perfect: sum equals the number (6: 1+2+3=6). Abundant: sum exceeds the number (12: 1+2+3+4+6=16). Deficient: sum is less than the number (15: 1+3+5=9). Most numbers are deficient.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">Why were perfect numbers important to ancient mathematicians?</h4>
            <p className="text-sm text-muted-foreground">
              Ancient Greeks, especially the Pythagoreans, saw mystical significance in perfect numbers. They associated 6 with marriage (union of male 3 and female 2) and considered it the number of creation. Saint Augustine wrote that God created the world in 6 days because 6 is perfect, not vice versa.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">Do perfect numbers have any practical applications?</h4>
            <p className="text-sm text-muted-foreground">
              Not directly - they're primarily of theoretical interest in number theory. However, the mathematics behind them (Mersenne primes, divisor functions) connects to cryptography and computer science. The search for large perfect numbers drives development of efficient algorithms for prime testing.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
