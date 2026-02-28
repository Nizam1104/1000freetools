"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function PercentageCalculator() {
  const [percentage, setPercentage] = useState<string>("");
  const [value, setValue] = useState<string>("");
  const [result, setResult] = useState<number | null>(null);

  const calculate = () => {
    const pct = parseFloat(percentage);
    const val = parseFloat(value);
    if (!isNaN(pct) && !isNaN(val)) {
      setResult((pct / 100) * val);
    }
  };

  const reset = () => {
    setPercentage("");
    setValue("");
    setResult(null);
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Percentage Calculator</CardTitle>
          <CardDescription>Find a percentage of a value</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <label className="text-sm text-muted-foreground mb-2 block">Percentage (%)</label>
              <Input
                type="number"
                placeholder="e.g., 20"
                value={percentage}
                onChange={(e) => setPercentage(e.target.value)}
              />
            </div>
            <div>
              <label className="text-sm text-muted-foreground mb-2 block">Value</label>
              <Input
                type="number"
                placeholder="e.g., 150"
                value={value}
                onChange={(e) => setValue(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <Button onClick={calculate}>Calculate</Button>
              <Button variant="outline" onClick={reset}>Reset</Button>
            </div>
            {result !== null && (
              <div className="p-4 bg-muted rounded-md">
                <p className="text-sm text-muted-foreground">Result</p>
                <p className="text-2xl font-semibold">{result}</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
