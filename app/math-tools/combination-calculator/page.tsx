"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function CombinationCalculator() {
  const [n, setN] = useState<string>("");
  const [r, setR] = useState<string>("");
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string>("");

  const factorialNum = (num: number): bigint => {
    if (num <= 1) return BigInt(1);
    let result = BigInt(1);
    for (let i = BigInt(2); i <= BigInt(num); i++) result *= i;
    return result;
  };

  const calculate = () => {
    setResult(null);
    setError("");

    const nNum = parseInt(n);
    const rNum = parseInt(r);

    if (isNaN(nNum) || isNaN(rNum) || nNum < 0 || rNum < 0 || rNum > nNum) {
      setError("Enter valid values (0 ≤ r ≤ n)");
      return;
    }

    const nFact = factorialNum(nNum);
    const nrFact = factorialNum(nNum - rNum);
    const rFact = factorialNum(rNum);
    const ncr = nFact / (nrFact * rFact);

    setResult({
      n: nNum,
      r: rNum,
      ncr: ncr.toString(),
      nFact: nFact.toString(),
      nrFact: nrFact.toString(),
      rFact: rFact.toString(),
      steps: [
        `Formula: C(n,r) = n! / (r! × (n-r)!)`,
        ``,
        `Substitute values:`,
        `  C(${nNum},${rNum}) = ${nNum}! / (${rNum}! × (${nNum}-${rNum})!)`,
        `  C(${nNum},${rNum}) = ${nNum}! / (${rNum}! × ${nNum - rNum}!)`,
        ``,
        `Calculate factorials:`,
        `  ${nNum}! = ${nFact.toString()}`,
        `  ${rNum}! = ${rFact.toString()}`,
        `  ${nNum - rNum}! = ${nrFact.toString()}`,
        ``,
        `Calculate:`,
        `  C(${nNum},${rNum}) = ${nFact.toString()} / (${rFact.toString()} × ${nrFact.toString()})`,
        `  C(${nNum},${rNum}) = ${nFact.toString()} / ${(rFact * nrFact).toString()}`,
        `  C(${nNum},${rNum}) = ${ncr.toString()}`,
      ],
    });
  };

  const reset = () => {
    setN("");
    setR("");
    setResult(null);
    setError("");
  };

  return (
    <div className="w-full max-w-5xl mx-auto space-y-8">
      <div className="mb-8">
        <h1 className="text-3xl font-semibold mb-2">
          Combination Calculator – Calculate nCr Online
        </h1>
        <p className="text-muted-foreground">
          Calculate combinations (nCr) instantly with our free online
          combination calculator. Find how many ways r items can be chosen from
          n items using the combination formula.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Combination Calculator (nCr)</CardTitle>
          <CardDescription>
            Calculate the number of combinations
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label>n (total items)</Label>
                <Input
                  type="number"
                  value={n}
                  onChange={(e) => setN(e.target.value)}
                />
              </div>
              <div>
                <Label>r (items to choose)</Label>
                <Input
                  type="number"
                  value={r}
                  onChange={(e) => setR(e.target.value)}
                />
              </div>
            </div>

            {error && (
              <div className="p-3 bg-destructive/10 text-destructive text-sm rounded-lg">
                {error}
              </div>
            )}
            <div className="flex gap-2">
              <Button onClick={calculate}>Calculate</Button>
              <Button variant="outline" onClick={reset}>
                Reset
              </Button>
            </div>

            {result && (
              <div className="space-y-6">
                <div className="p-6 bg-muted rounded-lg text-center">
                  <p className="text-sm text-muted-foreground mb-2">
                    C(n,r) = nCr
                  </p>
                  <p className="text-5xl font-bold">{result.ncr}</p>
                  <p className="text-sm text-muted-foreground mt-2">
                    {result.n}! / ({result.r}! × ({result.n}-{result.r})!)
                  </p>
                </div>
                <div className="p-4 border rounded-lg">
                  <h4 className="font-semibold text-sm mb-3">
                    Step-by-Step Solution
                  </h4>
                  <div className="space-y-2 text-sm font-mono">
                    {result.steps.map((s: string, i: number) => (
                      <div key={i}>{s}</div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Understanding Combinations</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Combinations count selections where order doesn't matter. Picking 3
            toppings from 10 options is a combination – the order you pick them
            doesn't change your pizza.
          </p>
          <div className="p-4 bg-muted rounded-lg text-center">
            <p className="text-lg font-mono">C(n,r) = n! / (r! × (n-r)!)</p>
          </div>
          <p className="text-sm text-muted-foreground">
            Combinations are always fewer than permutations because
            rearrangements of the same items count as one combination. C(n,r) =
            P(n,r) / r!
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Combination Examples</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="p-3 border rounded-lg">
              <div className="font-semibold text-sm mb-1">
                Choose 5 cards from 52
              </div>
              <div className="font-mono text-xs text-muted-foreground">
                C(52,5) = 2,598,960 hands
              </div>
            </div>
            <div className="p-3 border rounded-lg">
              <div className="font-semibold text-sm mb-1">
                Committee of 4 from 12 people
              </div>
              <div className="font-mono text-xs text-muted-foreground">
                C(12,4) = 495 ways
              </div>
            </div>
            <div className="p-3 border rounded-lg">
              <div className="font-semibold text-sm mb-1">
                3 toppings from 8 options
              </div>
              <div className="font-mono text-xs text-muted-foreground">
                C(8,3) = 56 combinations
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Related Math Tools</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid sm:grid-cols-3 gap-4">
            <a
              href="/math-tools/permutation-calculator"
              className="p-4 rounded-lg border hover:bg-muted transition-colors"
            >
              <p className="font-semibold text-sm">Permutation Calculator</p>
              <p className="text-xs text-muted-foreground">nPr</p>
            </a>
            <a
              href="/math-tools/probability-calculator"
              className="p-4 rounded-lg border hover:bg-muted transition-colors"
            >
              <p className="font-semibold text-sm">Probability Calculator</p>
              <p className="text-xs text-muted-foreground">
                Calculate probability
              </p>
            </a>
            <a
              href="/math-tools/mean-median-mode-calculator"
              className="p-4 rounded-lg border hover:bg-muted transition-colors"
            >
              <p className="font-semibold text-sm">Statistics Calculator</p>
              <p className="text-xs text-muted-foreground">
                Mean, median, mode
              </p>
            </a>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
