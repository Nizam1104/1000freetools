"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function LinearEquationSolver() {
  const [a, setA] = useState<string>("");
  const [b, setB] = useState<string>("");
  const [result, setResult] = useState<{ x: number; steps: string } | null>(null);

  const calculate = () => {
    const aVal = parseFloat(a);
    const bVal = parseFloat(b);
    
    if (!isNaN(aVal) && !isNaN(bVal) && aVal !== 0) {
      const x = -bVal / aVal;
      setResult({
        x,
        steps: `${aVal}x + ${bVal} = 0\n${aVal}x = -${bVal}\nx = ${-bVal}/${aVal}\nx = ${x}`
      });
    }
  };

  const reset = () => {
    setA("");
    setB("");
    setResult(null);
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Linear Equation Solver</CardTitle>
          <CardDescription>Solve equations in the form: ax + b = 0</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="p-3 bg-muted rounded-md text-center font-mono">
              ax + b = 0
            </div>
            <div>
              <label className="text-sm text-muted-foreground mb-2 block">Coefficient a</label>
              <Input
                type="number"
                placeholder="e.g., 2"
                step="any"
                value={a}
                onChange={(e) => setA(e.target.value)}
              />
            </div>
            <div>
              <label className="text-sm text-muted-foreground mb-2 block">Constant b</label>
              <Input
                type="number"
                placeholder="e.g., -6"
                step="any"
                value={b}
                onChange={(e) => setB(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <Button onClick={calculate}>Solve</Button>
              <Button variant="outline" onClick={reset}>Reset</Button>
            </div>
            {result && (
              <div className="p-4 bg-muted rounded-md space-y-2">
                <div>
                  <p className="text-sm text-muted-foreground">Solution</p>
                  <p className="text-2xl font-semibold">x = {result.x}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Steps</p>
                  <pre className="text-sm whitespace-pre-wrap font-mono">{result.steps}</pre>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
