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

export default function PermutationCalculator() {
  const [n, setN] = useState<string>("");
  const [r, setR] = useState<string>("");
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string>("");

  const factorial = (num: number): string => {
    if (num <= 1) return "1";
    let result = BigInt(1);
    for (let i = BigInt(2); i <= BigInt(num); i++) result *= i;
    return result.toString();
  };

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
    const npr = nFact / nrFact;

    setResult({
      n: nNum,
      r: rNum,
      npr: npr.toString(),
      nFact: nFact.toString(),
      nrFact: nrFact.toString(),
      rFact: rFact.toString(),
      steps: [
        `Formula: P(n,r) = n! / (n-r)!`,
        ``,
        `Substitute values:`,
        `  P(${nNum},${rNum}) = ${nNum}! / (${nNum}-${rNum})!`,
        `  P(${nNum},${rNum}) = ${nNum}! / ${nNum - rNum}!`,
        ``,
        `Calculate factorials:`,
        `  ${nNum}! = ${nFact.toString()}`,
        `  ${nNum - rNum}! = ${nrFact.toString()}`,
        ``,
        `Divide:`,
        `  P(${nNum},${rNum}) = ${nFact.toString()} / ${nrFact.toString()}`,
        `  P(${nNum},${rNum}) = ${npr.toString()}`,
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
          Permutation Calculator – Calculate nPr Online
        </h1>
        <p className="text-muted-foreground">
          Calculate permutations (nPr) instantly with our free online
          permutation calculator. Find the number of ways r items can be
          arranged from n items with formula and solution shown.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Permutation Calculator (nPr)</CardTitle>
          <CardDescription>
            Calculate the number of permutations
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
                <Label>r (items to arrange)</Label>
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
                    P(n,r) = nPr
                  </p>
                  <p className="text-5xl font-bold">{result.npr}</p>
                  <p className="text-sm text-muted-foreground mt-2">
                    {result.n}! / ({result.n}-{result.r})!
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
          <CardTitle>Understanding Permutations</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Permutations count arrangements where order matters. Picking a
            president, vice-president, and secretary from 10 people is a
            permutation – who gets which role matters.
          </p>
          <div className="p-4 bg-muted rounded-lg text-center">
            <p className="text-lg font-mono">P(n,r) = n! / (n-r)!</p>
          </div>
          <p className="text-sm text-muted-foreground">
            n is the total number of items. r is how many you're arranging. The
            formula divides n factorial by (n-r) factorial to count only the
            first r terms.
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Permutation Examples</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="p-3 border rounded-lg">
              <div className="font-semibold text-sm mb-1">
                Arrange 3 books from 5
              </div>
              <div className="font-mono text-xs text-muted-foreground">
                P(5,3) = 5!/(5-3)! = 120/2 = 60 ways
              </div>
            </div>
            <div className="p-3 border rounded-lg">
              <div className="font-semibold text-sm mb-1">
                Podium finishes from 8 runners
              </div>
              <div className="font-mono text-xs text-muted-foreground">
                P(8,3) = 8!/5! = 336 ways
              </div>
            </div>
            <div className="p-3 border rounded-lg">
              <div className="font-semibold text-sm mb-1">
                4-digit codes from 10 digits
              </div>
              <div className="font-mono text-xs text-muted-foreground">
                P(10,4) = 10!/6! = 5,040 codes
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
              href="/math-tools/combination-calculator"
              className="p-4 rounded-lg border hover:bg-muted transition-colors"
            >
              <p className="font-semibold text-sm">Combination Calculator</p>
              <p className="text-xs text-muted-foreground">nCr</p>
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
              href="/math-tools/factorial-calculator"
              className="p-4 rounded-lg border hover:bg-muted transition-colors"
            >
              <p className="font-semibold text-sm">Factorial Calculator</p>
              <p className="text-xs text-muted-foreground">Calculate n!</p>
            </a>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
