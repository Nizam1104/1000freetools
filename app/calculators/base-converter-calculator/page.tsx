"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function BaseConverterCalculator() {
  const [value, setValue] = useState<string>("");
  const [fromBase, setFromBase] = useState<string>("10");
  const [toBase, setToBase] = useState<string>("2");
  const [result, setResult] = useState<string>("");

  const calculate = () => {
    const v = value.trim();
    const from = parseInt(fromBase);
    const to = parseInt(toBase);
    
    if (!isNaN(from) && !isNaN(to) && from >= 2 && from <= 36 && to >= 2 && to <= 36) {
      try {
        const decimal = parseInt(v, from);
        if (!isNaN(decimal)) {
          setResult(decimal.toString(to).toUpperCase());
        }
      } catch {
        setResult("Invalid input");
      }
    }
  };

  const reset = () => {
    setValue("");
    setFromBase("10");
    setToBase("2");
    setResult("");
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Base Converter Calculator</CardTitle>
          <CardDescription>Convert numbers between different bases (2-36)</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <label className="text-sm text-muted-foreground mb-2 block">Value</label>
              <Input
                type="text"
                placeholder="e.g., 1010 or A or 255"
                value={value}
                onChange={(e) => setValue(e.target.value)}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm text-muted-foreground mb-2 block">From Base</label>
                <Input
                  type="number"
                  min="2"
                  max="36"
                  value={fromBase}
                  onChange={(e) => setFromBase(e.target.value)}
                />
              </div>
              <div>
                <label className="text-sm text-muted-foreground mb-2 block">To Base</label>
                <Input
                  type="number"
                  min="2"
                  max="36"
                  value={toBase}
                  onChange={(e) => setToBase(e.target.value)}
                />
              </div>
            </div>
            <div className="flex gap-2">
              <Button onClick={calculate}>Convert</Button>
              <Button variant="outline" onClick={reset}>Reset</Button>
            </div>
            {result && (
              <div className="p-4 bg-muted rounded-md">
                <p className="text-sm text-muted-foreground">Result (Base {toBase})</p>
                <p className="text-2xl font-semibold font-mono">{result}</p>
              </div>
            )}
            <div className="text-xs text-muted-foreground">
              Common bases: 2 (Binary), 8 (Octal), 10 (Decimal), 16 (Hexadecimal)
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
