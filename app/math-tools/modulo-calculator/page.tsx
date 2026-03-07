"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function ModuloCalculator() {
  const [dividend, setDividend] = useState("");
  const [divisor, setDivisor] = useState("");
  const [result, setResult] = useState<number | null>(null);

  const calculate = () => {
    const a = parseInt(dividend);
    const n = parseInt(divisor);
    if (!isNaN(a) && !isNaN(n) && n !== 0) {
      const mod = ((a % n) + n) % n;
      setResult(mod);
    }
  };

  const reset = () => {
    setDividend("");
    setDivisor("");
    setResult(null);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <div className="mb-12">
          <h1 className="text-4xl font-bold mb-4">
            Modulo Calculator – Find the Remainder of Division
          </h1>
          <p className="text-xl text-muted-foreground">
            Calculate the modulo or remainder of any division instantly with our free online modulo calculator. Essential for programming, number theory, and cryptography applications.
          </p>
        </div>

        <div className="mb-12">
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-2 block">Dividend (a)</label>
              <Input
                type="number"
                placeholder="Enter dividend (e.g., 17)"
                value={dividend}
                onChange={(e) => setDividend(e.target.value)}
                className="w-full"
              />
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">Divisor (n)</label>
              <Input
                type="number"
                placeholder="Enter divisor (e.g., 5)"
                value={divisor}
                onChange={(e) => setDivisor(e.target.value)}
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
                  {dividend} mod {divisor} = {result}
                </p>
                <p className="text-sm text-muted-foreground mt-2">
                  {dividend} = {Math.floor(parseInt(dividend) / parseInt(divisor))} × {divisor} + {result}
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
