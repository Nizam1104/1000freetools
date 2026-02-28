"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function PercentageChangeCalculator() {
  const [oldValue, setOldValue] = useState<string>("");
  const [newValue, setNewValue] = useState<string>("");
  const [result, setResult] = useState<{ change: number; direction: string } | null>(null);

  const calculate = () => {
    const old = parseFloat(oldValue);
    const newV = parseFloat(newValue);
    if (!isNaN(old) && !isNaN(newV) && old !== 0) {
      const change = ((newV - old) / Math.abs(old)) * 100;
      setResult({
        change: Math.abs(change),
        direction: change >= 0 ? "increase" : "decrease"
      });
    }
  };

  const reset = () => {
    setOldValue("");
    setNewValue("");
    setResult(null);
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Percentage Change Calculator</CardTitle>
          <CardDescription>Calculate the percentage increase or decrease</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <label className="text-sm text-muted-foreground mb-2 block">Original Value</label>
              <Input
                type="number"
                placeholder="e.g., 100"
                value={oldValue}
                onChange={(e) => setOldValue(e.target.value)}
              />
            </div>
            <div>
              <label className="text-sm text-muted-foreground mb-2 block">New Value</label>
              <Input
                type="number"
                placeholder="e.g., 125"
                value={newValue}
                onChange={(e) => setNewValue(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <Button onClick={calculate}>Calculate</Button>
              <Button variant="outline" onClick={reset}>Reset</Button>
            </div>
            {result && (
              <div className="p-4 bg-muted rounded-md">
                <p className="text-sm text-muted-foreground">Percentage {result.direction}</p>
                <p className="text-2xl font-semibold">{result.change.toFixed(2)}%</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
