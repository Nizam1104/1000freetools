"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function GeometricSequenceCalculator() {
  const [firstTerm, setFirstTerm] = useState<string>("");
  const [commonRatio, setCommonRatio] = useState<string>("");
  const [n, setN] = useState<string>("");
  const [result, setResult] = useState<{ nthTerm: number; sum: number; sequence: number[] } | null>(null);

  const calculate = () => {
    const a = parseFloat(firstTerm);
    const r = parseFloat(commonRatio);
    const nVal = parseInt(n);
    
    if (!isNaN(a) && !isNaN(r) && !isNaN(nVal) && nVal > 0) {
      const nthTerm = a * Math.pow(r, nVal - 1);
      let sum: number;
      if (r === 1) {
        sum = a * nVal;
      } else {
        sum = a * (1 - Math.pow(r, nVal)) / (1 - r);
      }
      const sequence: number[] = [];
      for (let i = 0; i < nVal; i++) {
        sequence.push(a * Math.pow(r, i));
      }
      setResult({ nthTerm, sum, sequence });
    }
  };

  const reset = () => {
    setFirstTerm("");
    setCommonRatio("");
    setN("");
    setResult(null);
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Geometric Sequence Calculator</CardTitle>
          <CardDescription>Calculate nth term and sum of geometric sequence</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="text-sm text-muted-foreground mb-2 block">First term (a)</label>
                <Input
                  type="number"
                  placeholder="e.g., 1"
                  step="any"
                  value={firstTerm}
                  onChange={(e) => setFirstTerm(e.target.value)}
                />
              </div>
              <div>
                <label className="text-sm text-muted-foreground mb-2 block">Common ratio (r)</label>
                <Input
                  type="number"
                  placeholder="e.g., 2"
                  step="any"
                  value={commonRatio}
                  onChange={(e) => setCommonRatio(e.target.value)}
                />
              </div>
              <div>
                <label className="text-sm text-muted-foreground mb-2 block">n (terms)</label>
                <Input
                  type="number"
                  placeholder="e.g., 10"
                  min="1"
                  value={n}
                  onChange={(e) => setN(e.target.value)}
                />
              </div>
            </div>
            <div className="flex gap-2">
              <Button onClick={calculate}>Calculate</Button>
              <Button variant="outline" onClick={reset}>Reset</Button>
            </div>
            {result && (
              <div className="p-4 bg-muted rounded-md space-y-3">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">n-th Term</p>
                    <p className="text-xl font-semibold">{result.nthTerm}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Sum of n terms</p>
                    <p className="text-xl font-semibold">{result.sum}</p>
                  </div>
                </div>
                <div className="pt-2 border-t">
                  <p className="text-sm text-muted-foreground">Sequence</p>
                  <p className="text-sm">{result.sequence.map((n) => n.toFixed(2)).join(", ")}</p>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
