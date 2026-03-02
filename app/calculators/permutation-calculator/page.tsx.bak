"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function PermutationCalculator() {
  const [n, setN] = useState<string>("");
  const [r, setR] = useState<string>("");
  const [result, setResult] = useState<{ permutations: string; formula: string } | null>(null);

  const factorial = (num: number): bigint => {
    let result = 1n;
    for (let i = 2; i <= num; i++) {
      result *= BigInt(i);
    }
    return result;
  };

  const calculate = () => {
    const nVal = parseInt(n);
    const rVal = parseInt(r);
    
    if (!isNaN(nVal) && !isNaN(rVal) && nVal >= 0 && rVal >= 0 && nVal >= rVal) {
      const permutations = factorial(nVal) / factorial(nVal - rVal);
      setResult({
        permutations: permutations.toString(),
        formula: `P(${nVal}, ${rVal}) = ${nVal}! / (${nVal}-${rVal})! = ${permutations}`
      });
    }
  };

  const reset = () => {
    setN("");
    setR("");
    setResult(null);
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Permutation Calculator</CardTitle>
          <CardDescription>Calculate arrangements where order matters: P(n,r)</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <label className="text-sm text-muted-foreground mb-2 block">Total items (n)</label>
              <Input
                type="number"
                placeholder="e.g., 10"
                min="0"
                value={n}
                onChange={(e) => setN(e.target.value)}
              />
            </div>
            <div>
              <label className="text-sm text-muted-foreground mb-2 block">Items to select (r)</label>
              <Input
                type="number"
                placeholder="e.g., 3"
                min="0"
                value={r}
                onChange={(e) => setR(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <Button onClick={calculate}>Calculate</Button>
              <Button variant="outline" onClick={reset}>Reset</Button>
            </div>
            {result && (
              <div className="p-4 bg-muted rounded-md space-y-2">
                <div>
                  <p className="text-sm text-muted-foreground">Permutations</p>
                  <p className="text-2xl font-semibold">{result.permutations}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Formula</p>
                  <p className="text-sm">{result.formula}</p>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
