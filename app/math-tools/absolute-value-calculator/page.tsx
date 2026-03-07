"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function AbsoluteValueCalculator() {
  const [number, setNumber] = useState("");
  const [result, setResult] = useState<number | null>(null);

  const calculate = () => {
    const num = parseFloat(number);
    if (!isNaN(num)) {
      setResult(Math.abs(num));
    }
  };

  const reset = () => {
    setNumber("");
    setResult(null);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <div className="mb-12">
          <h1 className="text-4xl font-bold mb-4">
            Absolute Value Calculator – Find |x| of Any Number
          </h1>
          <p className="text-xl text-muted-foreground">
            Calculate the absolute value of any number or expression instantly with our free online absolute value calculator. Supports positive, negative, and decimal numbers.
          </p>
        </div>

        <div className="mb-12">
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-2 block">Number (x)</label>
              <Input
                type="number"
                placeholder="Enter any number (e.g., -15)"
                step="any"
                value={number}
                onChange={(e) => setNumber(e.target.value)}
                className="w-full"
              />
            </div>
            <div className="flex gap-2 pt-2">
              <Button onClick={calculate}>Calculate</Button>
              <Button variant="outline" onClick={reset}>Reset</Button>
            </div>
            {result !== null && (
              <div className="p-4 bg-muted rounded-md mt-4">
                <p className="text-sm text-muted-foreground">Result</p>
                <p className="text-2xl font-semibold">
                  |{number}| = {result}
                </p>
              </div>
            )}
          </div>
        </div>

        <section className="mb-12 border-t pt-8">
        </section>
      </div>
    </div>
  );
}
