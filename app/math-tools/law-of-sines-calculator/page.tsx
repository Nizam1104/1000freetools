"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function LawOfSinesCalculator() {
  const [knownType, setKnownType] = useState<"asa" | "aas" | "ssa">("asa");
  const [angleA, setAngleA] = useState<string>("");
  const [angleB, setAngleB] = useState<string>("");
  const [sideA, setSideA] = useState<string>("");
  const [sideB, setSideB] = useState<string>("");
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string>("");

  const toRad = (deg: number) => (deg * Math.PI) / 180;
  const toDeg = (rad: number) => (rad * 180) / Math.PI;

  const calculate = () => {
    setResult(null);
    setError("");

    if (knownType === "asa" || knownType === "aas") {
      const A = parseFloat(angleA);
      const B = parseFloat(angleB);
      const a = parseFloat(sideA);

      if (isNaN(A) || isNaN(B) || isNaN(a) || A <= 0 || B <= 0 || a <= 0) {
        setError("Please enter valid positive values");
        return;
      }

      if (A + B >= 180) {
        setError("Sum of two angles must be less than 180°");
        return;
      }

      const C = 180 - A - B;
      const b = (a * Math.sin(toRad(B))) / Math.sin(toRad(A));
      const c = (a * Math.sin(toRad(C))) / Math.sin(toRad(A));

      const s = (a + b + c) / 2;
      const area = Math.sqrt(s * (s - a) * (s - b) * (s - c));

      setResult({
        angles: { A, B, C },
        sides: { a, b, c },
        area,
        steps: [
          `Given: ∠A = ${A}°, ∠B = ${B}°, side a = ${a}`,
          ``,
          `Find ∠C:`,
          `  ∠C = 180° - ∠A - ∠B`,
          `  ∠C = 180° - ${A}° - ${B}° = ${C.toFixed(2)}°`,
          ``,
          `Using Law of Sines to find side b:`,
          `  a/sin(A) = b/sin(B)`,
          `  b = a × sin(B) / sin(A)`,
          `  b = ${a} × sin(${B}°) / sin(${A}°)`,
          `  b = ${b.toFixed(4)}`,
          ``,
          `Using Law of Sines to find side c:`,
          `  c = a × sin(C) / sin(A)`,
          `  c = ${a} × sin(${C.toFixed(2)}°) / sin(${A}°)`,
          `  c = ${c.toFixed(4)}`,
          ``,
          `Area using Heron's formula:`,
          `  s = (a + b + c) / 2 = ${s.toFixed(4)}`,
          `  Area = √[s(s-a)(s-b)(s-c)] = ${area.toFixed(4)}`
        ]
      });
    }
  };

  const reset = () => {
    setAngleA(""); setAngleB(""); setSideA(""); setSideB("");
    setResult(null);
    setError("");
  };

  return (
    <div className="w-full max-w-5xl mx-auto space-y-8">
      <div className="mb-8">
        <h1 className="text-3xl font-semibold mb-2">Law of Sines Calculator – Solve Triangles Using Sine Rule</h1>
        <p className="text-muted-foreground">
          Solve any triangle using the Law of Sines with our free online calculator. Find missing sides and angles for ASA, AAS, and SSA triangle configurations with step-by-step solutions.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Law of Sines Calculator</CardTitle>
          <CardDescription>
            Solve triangles using the sine rule: a/sin(A) = b/sin(B) = c/sin(C)
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div>
              <Label>Known Values</Label>
              <Select value={knownType} onValueChange={(v) => setKnownType(v as typeof knownType)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="asa">ASA (Angle-Side-Angle)</SelectItem>
                  <SelectItem value="aas">AAS (Angle-Angle-Side)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid md:grid-cols-3 gap-4">
              <div>
                <Label>Angle A (°)</Label>
                <Input type="number" value={angleA} onChange={(e) => setAngleA(e.target.value)} />
              </div>
              <div>
                <Label>Angle B (°)</Label>
                <Input type="number" value={angleB} onChange={(e) => setAngleB(e.target.value)} />
              </div>
              <div>
                <Label>Side a</Label>
                <Input type="number" value={sideA} onChange={(e) => setSideA(e.target.value)} />
              </div>
            </div>

            {error && <div className="p-3 bg-destructive/10 text-destructive text-sm rounded-lg">{error}</div>}

            <div className="flex gap-2">
              <Button onClick={calculate}>Calculate</Button>
              <Button variant="outline" onClick={reset}>Reset</Button>
            </div>

            {result && (
              <div className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="p-4 bg-muted rounded-lg">
                    <h4 className="font-semibold text-sm mb-3">Angles</h4>
                    <div className="space-y-2 font-mono">
                      <div>A = {result.angles.A.toFixed(2)}°</div>
                      <div>B = {result.angles.B.toFixed(2)}°</div>
                      <div>C = {result.angles.C.toFixed(2)}°</div>
                    </div>
                  </div>
                  <div className="p-4 bg-muted rounded-lg">
                    <h4 className="font-semibold text-sm mb-3">Sides</h4>
                    <div className="space-y-2 font-mono">
                      <div>a = {result.sides.a.toFixed(4)}</div>
                      <div>b = {result.sides.b.toFixed(4)}</div>
                      <div>c = {result.sides.c.toFixed(4)}</div>
                    </div>
                  </div>
                </div>
                <div className="p-4 border rounded-lg">
                  <h4 className="font-semibold text-sm mb-3">Step-by-Step Solution</h4>
                  <div className="space-y-2 text-sm font-mono">{result.steps.map((s: string, i: number) => <div key={i}>{s}</div>)}</div>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Understanding the Law of Sines</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            The Law of Sines relates the sides of a triangle to the sines of their opposite angles. It works for any triangle, not just right triangles.
          </p>
          <div className="p-4 bg-muted rounded-lg text-center">
            <p className="text-lg font-mono">a/sin(A) = b/sin(B) = c/sin(C)</p>
          </div>
          <p className="text-sm text-muted-foreground">
            Use the Law of Sines when you know either two angles and one side (ASA or AAS), or two sides and a non-included angle (SSA). For SSA, there might be zero, one, or two possible triangles.
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Related Math Tools</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid sm:grid-cols-3 gap-4">
            <a href="/math-tools/law-of-cosines-calculator" className="p-4 rounded-lg border hover:bg-muted transition-colors">
              <p className="font-semibold text-sm">Law of Cosines Calculator</p>
              <p className="text-xs text-muted-foreground">Solve SSS and SAS triangles</p>
            </a>
            <a href="/math-tools/triangle-solver" className="p-4 rounded-lg border hover:bg-muted transition-colors">
              <p className="font-semibold text-sm">Triangle Solver</p>
              <p className="text-xs text-muted-foreground">Solve any triangle</p>
            </a>
            <a href="/math-tools/right-triangle-calculator" className="p-4 rounded-lg border hover:bg-muted transition-colors">
              <p className="font-semibold text-sm">Right Triangle Calculator</p>
              <p className="text-xs text-muted-foreground">Solve right triangles</p>
            </a>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
