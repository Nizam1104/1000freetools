"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function RightTriangleCalculator() {
  const [knownType, setKnownType] = useState<"two-sides" | "side-angle">("two-sides");
  const [sideA, setSideA] = useState<string>("");
  const [sideB, setSideB] = useState<string>("");
  const [hypotenuse, setHypotenuse] = useState<string>("");
  const [angle, setAngle] = useState<string>("");
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string>("");

  const toRad = (deg: number) => (deg * Math.PI) / 180;
  const toDeg = (rad: number) => (rad * 180) / Math.PI;

  const calculate = () => {
    setResult(null);
    setError("");

    if (knownType === "two-sides") {
      if (sideA && sideB) {
        const a = parseFloat(sideA);
        const b = parseFloat(sideB);
        if (a <= 0 || b <= 0) { setError("Sides must be positive"); return; }
        const c = Math.sqrt(a*a + b*b);
        const A = toDeg(Math.atan(a/b));
        const B = 90 - A;
        setResult({ sides: { a, b, c }, angles: { A, B, C: 90 }, area: 0.5*a*b, perimeter: a+b+c });
      } else if (sideA && hypotenuse) {
        const a = parseFloat(sideA);
        const c = parseFloat(hypotenuse);
        if (a <= 0 || c <= 0 || a >= c) { setError("Invalid values"); return; }
        const b = Math.sqrt(c*c - a*a);
        const A = toDeg(Math.asin(a/c));
        const B = 90 - A;
        setResult({ sides: { a, b, c }, angles: { A, B, C: 90 }, area: 0.5*a*b, perimeter: a+b+c });
      } else if (sideB && hypotenuse) {
        const b = parseFloat(sideB);
        const c = parseFloat(hypotenuse);
        if (b <= 0 || c <= 0 || b >= c) { setError("Invalid values"); return; }
        const a = Math.sqrt(c*c - b*b);
        const B = toDeg(Math.asin(b/c));
        const A = 90 - B;
        setResult({ sides: { a, b, c }, angles: { A, B, C: 90 }, area: 0.5*a*b, perimeter: a+b+c });
      } else {
        setError("Enter any two sides");
      }
    } else {
      if (sideA && angle) {
        const a = parseFloat(sideA);
        const A = parseFloat(angle);
        if (a <= 0 || A <= 0 || A >= 90) { setError("Invalid values"); return; }
        const B = 90 - A;
        const b = a / Math.tan(toRad(A));
        const c = a / Math.sin(toRad(A));
        setResult({ sides: { a, b, c }, angles: { A, B, C: 90 }, area: 0.5*a*b, perimeter: a+b+c });
      } else if (sideB && angle) {
        const b = parseFloat(sideB);
        const A = parseFloat(angle);
        if (b <= 0 || A <= 0 || A >= 90) { setError("Invalid values"); return; }
        const B = 90 - A;
        const a = b * Math.tan(toRad(A));
        const c = b / Math.cos(toRad(A));
        setResult({ sides: { a, b, c }, angles: { A, B, C: 90 }, area: 0.5*a*b, perimeter: a+b+c });
      } else if (hypotenuse && angle) {
        const c = parseFloat(hypotenuse);
        const A = parseFloat(angle);
        if (c <= 0 || A <= 0 || A >= 90) { setError("Invalid values"); return; }
        const B = 90 - A;
        const a = c * Math.sin(toRad(A));
        const b = c * Math.cos(toRad(A));
        setResult({ sides: { a, b, c }, angles: { A, B, C: 90 }, area: 0.5*a*b, perimeter: a+b+c });
      } else {
        setError("Enter one side and one acute angle");
      }
    }
  };

  const reset = () => { setSideA(""); setSideB(""); setHypotenuse(""); setAngle(""); setResult(null); setError(""); };

  return (
    <div className="w-full max-w-5xl mx-auto space-y-8">
      <div className="mb-8">
        <h1 className="text-3xl font-semibold mb-2">Right Triangle Calculator – Solve Right Triangles Online</h1>
        <p className="text-muted-foreground">
          Solve any right triangle by entering two known values with our free online right triangle calculator. Find all sides, angles, area, and perimeter with clear step-by-step solutions.
        </p>
      </div>

      <Card>
        <CardHeader><CardTitle>Right Triangle Calculator</CardTitle><CardDescription>Enter two known values to solve the triangle</CardDescription></CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div>
              <Label>Known Values</Label>
              <Select value={knownType} onValueChange={(v) => setKnownType(v as typeof knownType)}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="two-sides">Two Sides</SelectItem>
                  <SelectItem value="side-angle">One Side and One Angle</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {knownType === "two-sides" ? (
              <div className="grid md:grid-cols-3 gap-4">
                <div><Label>Leg a</Label><Input type="number" value={sideA} onChange={(e) => setSideA(e.target.value)} /></div>
                <div><Label>Leg b</Label><Input type="number" value={sideB} onChange={(e) => setSideB(e.target.value)} /></div>
                <div><Label>Hypotenuse c</Label><Input type="number" value={hypotenuse} onChange={(e) => setHypotenuse(e.target.value)} /></div>
              </div>
            ) : (
              <div className="grid md:grid-cols-3 gap-4">
                <div><Label>Leg a</Label><Input type="number" value={sideA} onChange={(e) => setSideA(e.target.value)} /></div>
                <div><Label>Leg b</Label><Input type="number" value={sideB} onChange={(e) => setSideB(e.target.value)} /></div>
                <div><Label>Hypotenuse c</Label><Input type="number" value={hypotenuse} onChange={(e) => setHypotenuse(e.target.value)} /></div>
                <div className="md:col-span-3"><Label>Acute Angle A (°)</Label><Input type="number" value={angle} onChange={(e) => setAngle(e.target.value)} /></div>
              </div>
            )}

            {error && <div className="p-3 bg-destructive/10 text-destructive text-sm rounded-lg">{error}</div>}
            <div className="flex gap-2"><Button onClick={calculate}>Calculate</Button><Button variant="outline" onClick={reset}>Reset</Button></div>

            {result && (
              <div className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="p-4 bg-muted rounded-lg"><h4 className="font-semibold text-sm mb-2">Sides</h4>
                    <div className="font-mono">a = {result.sides.a.toFixed(4)}<br/>b = {result.sides.b.toFixed(4)}<br/>c = {result.sides.c.toFixed(4)}</div></div>
                  <div className="p-4 bg-muted rounded-lg"><h4 className="font-semibold text-sm mb-2">Angles</h4>
                    <div className="font-mono">A = {result.angles.A.toFixed(2)}°<br/>B = {result.angles.B.toFixed(2)}°<br/>C = 90°</div></div>
                </div>
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="p-4 bg-muted rounded-lg text-center"><p className="text-sm text-muted-foreground">Area</p><p className="text-2xl font-bold">{result.area.toFixed(4)}</p></div>
                  <div className="p-4 bg-muted rounded-lg text-center"><p className="text-sm text-muted-foreground">Perimeter</p><p className="text-2xl font-bold">{result.perimeter.toFixed(4)}</p></div>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle>Right Triangle Formulas</CardTitle></CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="p-4 border rounded-lg"><h4 className="font-semibold text-sm mb-2">Pythagorean Theorem</h4><p className="font-mono">a² + b² = c²</p></div>
            <div className="p-4 border rounded-lg"><h4 className="font-semibold text-sm mb-2">Trig Ratios</h4><p className="font-mono">sin A = a/c<br/>cos A = b/c<br/>tan A = a/b</p></div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle>Related Math Tools</CardTitle></CardHeader>
        <CardContent>
          <div className="grid sm:grid-cols-3 gap-4">
            <a href="/math-tools/triangle-solver" className="p-4 rounded-lg border hover:bg-muted transition-colors"><p className="font-semibold text-sm">Triangle Solver</p><p className="text-xs text-muted-foreground">Solve any triangle</p></a>
            <a href="/math-tools/law-of-sines-calculator" className="p-4 rounded-lg border hover:bg-muted transition-colors"><p className="font-semibold text-sm">Law of Sines</p><p className="text-xs text-muted-foreground">Solve triangles</p></a>
            <a href="/math-tools/law-of-cosines-calculator" className="p-4 rounded-lg border hover:bg-muted transition-colors"><p className="font-semibold text-sm">Law of Cosines</p><p className="text-xs text-muted-foreground">Solve triangles</p></a>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
