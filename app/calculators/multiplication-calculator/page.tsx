"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function MultiplicationCalculator() {
  const [numbers, setNumbers] = useState<string>("");
  const [result, setResult] = useState<number | null>(null);

  const calculate = () => {
    const nums = numbers.split(",").map((n) => parseFloat(n.trim())).filter((n) => !isNaN(n));
    if (nums.length > 0) {
      setResult(nums.reduce((a, b) => a * b, 1));
    }
  };

  const reset = () => {
    setNumbers("");
    setResult(null);
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Multiplication Calculator</CardTitle>
          <CardDescription>Multiply multiple numbers together</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <label className="text-sm text-muted-foreground mb-2 block">
                Enter numbers (comma-separated)
              </label>
              <Input
                type="text"
                placeholder="e.g., 5, 10, 3"
                value={numbers}
                onChange={(e) => setNumbers(e.target.value)}
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
