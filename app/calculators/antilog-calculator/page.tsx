"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function AntilogCalculator() {
  const [value, setValue] = useState<string>("");
  const [base, setBase] = useState<string>("10");
  const [result, setResult] = useState<number | null>(null);

  const calculate = () => {
    const v = parseFloat(value);
    const b = parseFloat(base);
    
    if (!isNaN(v) && !isNaN(b) && b > 0 && b !== 1) {
      setResult(Math.pow(b, v));
    }
  };

  const reset = () => {
    setValue("");
    setBase("10");
    setResult(null);
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Antilog Calculator</CardTitle>
          <CardDescription>Calculate the inverse logarithm (bˣ)</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <label className="text-sm text-muted-foreground mb-2 block">Value (x)</label>
              <Input
                type="number"
                placeholder="e.g., 2"
                step="any"
                value={value}
                onChange={(e) => setValue(e.target.value)}
              />
            </div>
            <div>
              <label className="text-sm text-muted-foreground mb-2 block">Base (default: 10)</label>
              <Input
                type="number"
                placeholder="e.g., e for natural antilog"
                step="any"
                value={base}
                onChange={(e) => setBase(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <Button onClick={calculate}>Calculate</Button>
              <Button variant="outline" onClick={reset}>Reset</Button>
            </div>
            {result !== null && (
              <div className="p-4 bg-muted rounded-md">
                <p className="text-sm text-muted-foreground">Antilog ({base}<sup>{value}</sup>)</p>
                <p className="text-2xl font-semibold">{result}</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
