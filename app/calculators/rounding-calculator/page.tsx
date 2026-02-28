"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function RoundingCalculator() {
  const [number, setNumber] = useState<string>("");
  const [places, setPlaces] = useState<string>("0");
  const [result, setResult] = useState<number | null>(null);

  const calculate = () => {
    const num = parseFloat(number);
    const p = parseInt(places);
    
    if (!isNaN(num) && !isNaN(p) && p >= 0) {
      setResult(Number(num.toFixed(p)));
    }
  };

  const reset = () => {
    setNumber("");
    setPlaces("0");
    setResult(null);
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Rounding Calculator</CardTitle>
          <CardDescription>Round a number to specified decimal places</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <label className="text-sm text-muted-foreground mb-2 block">Number</label>
              <Input
                type="number"
                placeholder="e.g., 3.14159"
                step="any"
                value={number}
                onChange={(e) => setNumber(e.target.value)}
              />
            </div>
            <div>
              <label className="text-sm text-muted-foreground mb-2 block">Decimal Places</label>
              <Input
                type="number"
                placeholder="e.g., 2"
                min="0"
                value={places}
                onChange={(e) => setPlaces(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <Button onClick={calculate}>Round</Button>
              <Button variant="outline" onClick={reset}>Reset</Button>
            </div>
            {result !== null && (
              <div className="p-4 bg-muted rounded-md">
                <p className="text-sm text-muted-foreground">Rounded Result</p>
                <p className="text-2xl font-semibold">{result}</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
