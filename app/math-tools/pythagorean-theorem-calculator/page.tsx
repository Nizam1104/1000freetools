"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function PythagoreanTheoremCalculator() {
  const [mode, setMode] = useState<"hypotenuse" | "leg">("hypotenuse");
  const [sideA, setSideA] = useState("");
  const [sideB, setSideB] = useState("");
  const [hypotenuse, setHypotenuse] = useState("");
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState("");

  const calculate = () => {
    setError("");
    setResult(null);

    if (mode === "hypotenuse") {
      const a = parseFloat(sideA);
      const b = parseFloat(sideB);

      if (isNaN(a) || isNaN(b) || a <= 0 || b <= 0) {
        setError("Please enter positive values for both sides");
        return;
      }

      const c = Math.sqrt(a * a + b * b);
      setResult({
        value: Math.round(c * 10000) / 10000,
        formula: `c = √(a² + b²) = √(${a}² + ${b}²) = √(${a * a} + ${b * b}) = √${a * a + b * b}`,
        steps: [
          `a² = ${a}² = ${a * a}`,
          `b² = ${b}² = ${b * b}`,
          `a² + b² = ${a * a} + ${b * b} = ${a * a + b * b}`,
          `c = √${a * a + b * b} ≈ ${Math.round(c * 10000) / 10000}`
        ]
      });
    } else {
      const c = parseFloat(hypotenuse);
      const knownLeg = parseFloat(sideA);

      if (isNaN(c) || isNaN(knownLeg) || c <= 0 || knownLeg <= 0) {
        setError("Please enter positive values");
        return;
      }

      if (c <= knownLeg) {
        setError("Hypotenuse must be longer than either leg");
        return;
      }

      const missingLeg = Math.sqrt(c * c - knownLeg * knownLeg);
      setResult({
        value: Math.round(missingLeg * 10000) / 10000,
        formula: `b = √(c² - a²) = √(${c}² - ${knownLeg}²) = √(${c * c} - ${knownLeg * knownLeg}) = √${c * c - knownLeg * knownLeg}`,
        steps: [
          `c² = ${c}² = ${c * c}`,
          `a² = ${knownLeg}² = ${knownLeg * knownLeg}`,
          `c² - a² = ${c * c} - ${knownLeg * knownLeg} = ${c * c - knownLeg * knownLeg}`,
          `b = √${c * c - knownLeg * knownLeg} ≈ ${Math.round(missingLeg * 10000) / 10000}`
        ]
      });
    }
  };

  const reset = () => {
    setSideA("");
    setSideB("");
    setHypotenuse("");
    setResult(null);
    setError("");
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      <div className="mb-8">
        <h1 className="text-3xl font-semibold mb-2">Pythagorean Theorem Calculator – Find Any Side of a Right Triangle</h1>
        <p className="text-muted-foreground">
          Solve for any missing side of a right triangle using the Pythagorean theorem with our free online calculator. Enter two sides and instantly find the third with step-by-step working.
        </p>
      </div>

      <div className="space-y-4">
        <Tabs value={mode} onValueChange={(v) => setMode(v as typeof mode)}>
          <TabsList>
            <TabsTrigger value="hypotenuse">Find Hypotenuse</TabsTrigger>
            <TabsTrigger value="leg">Find Missing Leg</TabsTrigger>
          </TabsList>

          <TabsContent value="hypotenuse" className="space-y-4 mt-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Side a</Label>
                <Input
                  type="number"
                  placeholder="Enter length of side a"
                  value={sideA}
                  onChange={(e) => setSideA(e.target.value)}
                />
              </div>
              <div>
                <Label>Side b</Label>
                <Input
                  type="number"
                  placeholder="Enter length of side b"
                  value={sideB}
                  onChange={(e) => setSideB(e.target.value)}
                />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="leg" className="space-y-4 mt-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Known Leg (a or b)</Label>
                <Input
                  type="number"
                  placeholder="Enter length of known leg"
                  value={sideA}
                  onChange={(e) => setSideA(e.target.value)}
                />
              </div>
              <div>
                <Label>Hypotenuse (c)</Label>
                <Input
                  type="number"
                  placeholder="Enter length of hypotenuse"
                  value={hypotenuse}
                  onChange={(e) => setHypotenuse(e.target.value)}
                />
              </div>
            </div>
          </TabsContent>
        </Tabs>

        <div className="flex gap-2">
          <Button onClick={calculate}>Calculate</Button>
          <Button variant="outline" onClick={reset}>Reset</Button>
        </div>

        {error && (
          <div className="p-4 bg-destructive/10 text-destructive rounded-md">
            <p className="text-sm">{error}</p>
          </div>
        )}

        {result && (
          <div className="space-y-4">
            <div className="p-6 bg-muted rounded-lg text-center">
              <p className="text-sm text-muted-foreground mb-2">Missing Side Length</p>
              <p className="text-5xl font-bold">{result.value}</p>
            </div>

            <div className="p-4 border rounded-lg">
              <h4 className="font-semibold text-sm mb-2">Formula Used</h4>
              <code className="text-sm font-mono bg-muted px-3 py-2 rounded block">
                {result.formula}
              </code>
            </div>

            <div className="p-4 border rounded-lg">
              <h4 className="font-semibold text-sm mb-2">Step-by-Step Solution</h4>
              <div className="space-y-2">
                {result.steps.map((step: string, index: number) => (
                  <code key={index} className="text-sm font-mono bg-muted px-3 py-2 rounded block">
                    {step}
                  </code>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

    </div>
  );
}
