"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function LawOfCosinesCalculator() {
  const [knownType, setKnownType] = useState<"sss" | "sas">("sss");
  const [sideA, setSideA] = useState<string>("");
  const [sideB, setSideB] = useState<string>("");
  const [sideC, setSideC] = useState<string>("");
  const [angleA, setAngleA] = useState<string>("");
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string>("");

  const toRad = (deg: number) => (deg * Math.PI) / 180;
  const toDeg = (rad: number) => (rad * 180) / Math.PI;

  const calculate = () => {
    setResult(null);
    setError("");

    if (knownType === "sss") {
      const a = parseFloat(sideA);
      const b = parseFloat(sideB);
      const c = parseFloat(sideC);

      if (isNaN(a) || isNaN(b) || isNaN(c) || a <= 0 || b <= 0 || c <= 0) {
        setError("All sides must be positive numbers");
        return;
      }

      if (a + b <= c || a + c <= b || b + c <= a) {
        setError("These sides cannot form a triangle");
        return;
      }

      const A = toDeg(Math.acos((b*b + c*c - a*a) / (2*b*c)));
      const B = toDeg(Math.acos((a*a + c*c - b*b) / (2*a*c)));
      const C = 180 - A - B;

      const s = (a + b + c) / 2;
      const area = Math.sqrt(s * (s - a) * (s - b) * (s - c));

      setResult({
        sides: { a, b, c },
        angles: { A, B, C },
        area,
        steps: [
          `Given: a = ${a}, b = ${b}, c = ${c}`,
          ``,
          `Using Law of Cosines to find ∠A:`,
          `  cos(A) = (b² + c² - a²) / (2bc)`,
          `  cos(A) = (${b}² + ${c}² - ${a}²) / (2 × ${b} × ${c})`,
          `  A = arccos(${((b*b + c*c - a*a) / (2*b*c)).toFixed(4)})`,
          `  A = ${A.toFixed(2)}°`,
          ``,
          `Using Law of Cosines to find ∠B:`,
          `  B = ${B.toFixed(2)}°`,
          ``,
          `Finding ∠C:`,
          `  C = 180° - A - B = ${C.toFixed(2)}°`,
          ``,
          `Area using Heron's formula:`,
          `  Area = ${area.toFixed(4)}`
        ]
      });
    } else {
      const b = parseFloat(sideB);
      const A = parseFloat(angleA);
      const c = parseFloat(sideC);

      if (isNaN(b) || isNaN(A) || isNaN(c) || b <= 0 || c <= 0 || A <= 0 || A >= 180) {
        setError("Invalid values");
        return;
      }

      const a = Math.sqrt(b*b + c*c - 2*b*c*Math.cos(toRad(A)));
      const B = toDeg(Math.acos((a*a + c*c - b*b) / (2*a*c)));
      const C = 180 - A - B;
      const area = 0.5 * b * c * Math.sin(toRad(A));

      setResult({
        sides: { a, b, c },
        angles: { A, B, C },
        area,
        steps: [
          `Given: b = ${b}, ∠A = ${A}°, c = ${c}`,
          ``,
          `Using Law of Cosines to find side a:`,
          `  a² = b² + c² - 2bc × cos(A)`,
          `  a = √(${b}² + ${c}² - 2 × ${b} × ${c} × cos(${A}°))`,
          `  a = ${a.toFixed(4)}`,
          ``,
          `Finding ∠B using Law of Cosines:`,
          `  B = ${B.toFixed(2)}°`,
          ``,
          `Finding ∠C:`,
          `  C = 180° - A - B = ${C.toFixed(2)}°`,
          ``,
          `Area:`,
          `  Area = ½ × b × c × sin(A) = ${area.toFixed(4)}`
        ]
      });
    }
  };

  const reset = () => {
    setSideA(""); setSideB(""); setSideC(""); setAngleA("");
    setResult(null); setError("");
  };

  return (
    <div className="w-full max-w-5xl mx-auto space-y-8">
      <div className="mb-8">
        <h1 className="text-3xl font-semibold mb-2">Law of Cosines Calculator – Solve Triangles Using Cosine Rule</h1>
        <p className="text-muted-foreground">
          Solve triangles using the Law of Cosines with our free online calculator. Find missing sides and angles for SSS and SAS configurations with detailed step-by-step solutions.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Law of Cosines Calculator</CardTitle>
          <CardDescription>
            Solve triangles using the cosine rule: c² = a² + b² - 2ab × cos(C)
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div>
              <Label>Known Values</Label>
              <Select value={knownType} onValueChange={(v) => setKnownType(v as typeof knownType)}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="sss">SSS (Three Sides)</SelectItem>
                  <SelectItem value="sas">SAS (Two Sides and Included Angle)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {knownType === "sss" ? (
              <div className="grid md:grid-cols-3 gap-4">
                <div><Label>Side a</Label><Input type="number" value={sideA} onChange={(e) => setSideA(e.target.value)} /></div>
                <div><Label>Side b</Label><Input type="number" value={sideB} onChange={(e) => setSideB(e.target.value)} /></div>
                <div><Label>Side c</Label><Input type="number" value={sideC} onChange={(e) => setSideC(e.target.value)} /></div>
              </div>
            ) : (
              <div className="grid md:grid-cols-3 gap-4">
                <div><Label>Side b</Label><Input type="number" value={sideB} onChange={(e) => setSideB(e.target.value)} /></div>
                <div><Label>Angle A (°)</Label><Input type="number" value={angleA} onChange={(e) => setAngleA(e.target.value)} /></div>
                <div><Label>Side c</Label><Input type="number" value={sideC} onChange={(e) => setSideC(e.target.value)} /></div>
              </div>
            )}

            {error && <div className="p-3 bg-destructive/10 text-destructive text-sm rounded-lg">{error}</div>}

            <div className="flex gap-2">
              <Button onClick={calculate}>Calculate</Button>
              <Button variant="outline" onClick={reset}>Reset</Button>
            </div>

            {result && (
              <div className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="p-4 bg-muted rounded-lg"><h4 className="font-semibold text-sm mb-3">Angles</h4>
                    <div className="space-y-2 font-mono"><div>A = {result.angles.A.toFixed(2)}°</div><div>B = {result.angles.B.toFixed(2)}°</div><div>C = {result.angles.C.toFixed(2)}°</div></div>
                  </div>
                  <div className="p-4 bg-muted rounded-lg"><h4 className="font-semibold text-sm mb-3">Sides</h4>
                    <div className="space-y-2 font-mono"><div>a = {result.sides.a.toFixed(4)}</div><div>b = {result.sides.b.toFixed(4)}</div><div>c = {result.sides.c.toFixed(4)}</div></div>
                  </div>
                </div>
                <div className="p-4 border rounded-lg"><h4 className="font-semibold text-sm mb-3">Step-by-Step Solution</h4>
                  <div className="space-y-2 text-sm font-mono">{result.steps.map((s: string, i: number) => <div key={i}>{s}</div>)}</div>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle>Understanding the Law of Cosines</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            The Law of Cosines generalizes the Pythagorean theorem to any triangle. For right triangles, it reduces to a² + b² = c².
          </p>
          <div className="p-4 bg-muted rounded-lg text-center"><p className="text-lg font-mono">c² = a² + b² - 2ab × cos(C)</p></div>
          <p className="text-sm text-muted-foreground">
            Use when you know all three sides (SSS) or two sides and the included angle (SAS). It's the go-to formula when the Law of Sines doesn't apply.
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle>Related Math Tools</CardTitle></CardHeader>
        <CardContent>
          <div className="grid sm:grid-cols-3 gap-4">
            <a href="/math-tools/law-of-sines-calculator" className="p-4 rounded-lg border hover:bg-muted transition-colors">
              <p className="font-semibold text-sm">Law of Sines Calculator</p>
              <p className="text-xs text-muted-foreground">Solve ASA and AAS triangles</p>
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
