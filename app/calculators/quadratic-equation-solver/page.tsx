"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function QuadraticEquationSolver() {
  const [a, setA] = useState<string>("");
  const [b, setB] = useState<string>("");
  const [c, setC] = useState<string>("");
  const [result, setResult] = useState<{
    x1: number | string;
    x2: number | string;
    discriminant: number;
    nature: string;
    vertex: { x: number; y: number };
  } | null>(null);

  const calculate = () => {
    const aVal = parseFloat(a);
    const bVal = parseFloat(b);
    const cVal = parseFloat(c);
    
    if (!isNaN(aVal) && !isNaN(bVal) && !isNaN(cVal) && aVal !== 0) {
      const discriminant = bVal * bVal - 4 * aVal * cVal;
      const vertexX = -bVal / (2 * aVal);
      const vertexY = aVal * vertexX * vertexX + bVal * vertexX + cVal;
      
      let x1: number | string;
      let x2: number | string;
      let nature: string;
      
      if (discriminant > 0) {
        x1 = (-bVal + Math.sqrt(discriminant)) / (2 * aVal);
        x2 = (-bVal - Math.sqrt(discriminant)) / (2 * aVal);
        nature = "Two distinct real roots";
      } else if (discriminant === 0) {
        x1 = x2 = -bVal / (2 * aVal);
        nature = "One repeated real root";
      } else {
        const realPart = -bVal / (2 * aVal);
        const imagPart = Math.sqrt(-discriminant) / (2 * aVal);
        x1 = `${realPart.toFixed(4)} + ${Math.abs(imagPart).toFixed(4)}i`;
        x2 = `${realPart.toFixed(4)} - ${Math.abs(imagPart).toFixed(4)}i`;
        nature = "Two complex conjugate roots";
      }
      
      setResult({ x1, x2, discriminant, nature, vertex: { x: vertexX, y: vertexY } });
    }
  };

  const reset = () => {
    setA("");
    setB("");
    setC("");
    setResult(null);
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Quadratic Equation Solver</CardTitle>
          <CardDescription>Solve equations in the form: ax² + bx + c = 0</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="p-3 bg-muted rounded-md text-center font-mono">
              ax² + bx + c = 0
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="text-sm text-muted-foreground mb-2 block">a</label>
                <Input
                  type="number"
                  placeholder="e.g., 1"
                  step="any"
                  value={a}
                  onChange={(e) => setA(e.target.value)}
                />
              </div>
              <div>
                <label className="text-sm text-muted-foreground mb-2 block">b</label>
                <Input
                  type="number"
                  placeholder="e.g., -5"
                  step="any"
                  value={b}
                  onChange={(e) => setB(e.target.value)}
                />
              </div>
              <div>
                <label className="text-sm text-muted-foreground mb-2 block">c</label>
                <Input
                  type="number"
                  placeholder="e.g., 6"
                  step="any"
                  value={c}
                  onChange={(e) => setC(e.target.value)}
                />
              </div>
            </div>
            <div className="flex gap-2">
              <Button onClick={calculate}>Solve</Button>
              <Button variant="outline" onClick={reset}>Reset</Button>
            </div>
            {result && (
              <div className="p-4 bg-muted rounded-md space-y-3">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Root x₁</p>
                    <p className="text-xl font-semibold">{typeof result.x1 === 'number' ? result.x1.toFixed(4) : result.x1}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Root x₂</p>
                    <p className="text-xl font-semibold">{typeof result.x2 === 'number' ? result.x2.toFixed(4) : result.x2}</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4 pt-2 border-t">
                  <div>
                    <p className="text-sm text-muted-foreground">Discriminant (Δ)</p>
                    <p className="text-lg">{result.discriminant}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Nature</p>
                    <p className="text-lg">{result.nature}</p>
                  </div>
                </div>
                <div className="pt-2 border-t">
                  <p className="text-sm text-muted-foreground">Vertex</p>
                  <p className="text-lg">({result.vertex.x.toFixed(4)}, {result.vertex.y.toFixed(4)})</p>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
