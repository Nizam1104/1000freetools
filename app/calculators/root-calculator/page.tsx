"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function RootCalculator() {
  const [radicand, setRadicand] = useState<string>("");
  const [index, setIndex] = useState<string>("2");
  const [result, setResult] = useState<number | null>(null);

  const calculate = () => {
    const r = parseFloat(radicand);
    const i = parseFloat(index);
    if (!isNaN(r) && !isNaN(i) && i !== 0) {
      if (r < 0 && i % 2 === 0) {
        setResult(NaN);
      } else {
        setResult(Math.pow(r, 1 / i));
      }
    }
  };

  const reset = () => {
    setRadicand("");
    setIndex("2");
    setResult(null);
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Root Calculator</CardTitle>
          <CardDescription>Calculate nth root of a number</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <label className="text-sm text-muted-foreground mb-2 block">Radicand (number)</label>
              <Input
                type="number"
                placeholder="e.g., 64"
                step="any"
                value={radicand}
                onChange={(e) => setRadicand(e.target.value)}
              />
            </div>
            <div>
              <label className="text-sm text-muted-foreground mb-2 block">Root Index (n)</label>
              <Input
                type="number"
                placeholder="e.g., 3 for cube root"
                value={index}
                onChange={(e) => setIndex(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <Button onClick={calculate}>Calculate</Button>
              <Button variant="outline" onClick={reset}>Reset</Button>
            </div>
            {result !== null && (
              <div className="p-4 bg-muted rounded-md">
                <p className="text-sm text-muted-foreground">
                  Result ({index}√{radicand})
                </p>
                <p className="text-2xl font-semibold">
                  {isNaN(result) ? "Undefined (complex result)" : result}
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
