"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function AngleElevationDepressionSolver() {
  const [calcType, setCalcType] = useState<"find-angle" | "find-height" | "find-distance">("find-angle");
  const [height, setHeight] = useState<string>("");
  const [distance, setDistance] = useState<string>("");
  const [angle, setAngle] = useState<string>("");
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string>("");

  const toRad = (deg: number) => (deg * Math.PI) / 180;
  const toDeg = (rad: number) => (rad * 180) / Math.PI;

  const calculate = () => {
    setResult(null);
    setError("");

    if (calcType === "find-angle") {
      const h = parseFloat(height);
      const d = parseFloat(distance);
      if (isNaN(h) || isNaN(d) || h <= 0 || d <= 0) { setError("Enter positive values"); return; }
      const angleVal = toDeg(Math.atan(h/d));
      setResult({ angle: angleVal, steps: [`tan(θ) = height/distance = ${h}/${d}`, `θ = arctan(${(h/d).toFixed(4)})`, `θ = ${angleVal.toFixed(2)}°`] });
    } else if (calcType === "find-height") {
      const d = parseFloat(distance);
      const a = parseFloat(angle);
      if (isNaN(d) || isNaN(a) || d <= 0 || a <= 0 || a >= 90) { setError("Invalid values"); return; }
      const h = d * Math.tan(toRad(a));
      setResult({ height: h, steps: [`height = distance × tan(angle)`, `height = ${d} × tan(${a}°)`, `height = ${h.toFixed(4)}`] });
    } else {
      const h = parseFloat(height);
      const a = parseFloat(angle);
      if (isNaN(h) || isNaN(a) || h <= 0 || a <= 0 || a >= 90) { setError("Invalid values"); return; }
      const d = h / Math.tan(toRad(a));
      setResult({ distance: d, steps: [`distance = height / tan(angle)`, `distance = ${h} / tan(${a}°)`, `distance = ${d.toFixed(4)}`] });
    }
  };

  const reset = () => { setHeight(""); setDistance(""); setAngle(""); setResult(null); setError(""); };

  return (
    <div className="w-full max-w-5xl mx-auto space-y-8">
      <div className="mb-8">
        <h1 className="text-3xl font-semibold mb-2">Angle of Elevation & Depression Calculator – Solve Word Problems</h1>
        <p className="text-muted-foreground">
          Calculate the angle of elevation or depression with our free online solver. Enter height and distance to find the angle, or the angle to find missing dimensions – perfect for trig word problems.
        </p>
      </div>

      <Card>
        <CardHeader><CardTitle>Angle of Elevation/Depression Calculator</CardTitle><CardDescription>Solve right triangle word problems</CardDescription></CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div>
              <Label>Calculate</Label>
              <Select value={calcType} onValueChange={(v) => setCalcType(v as typeof calcType)}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="find-angle">Find Angle</SelectItem>
                  <SelectItem value="find-height">Find Height</SelectItem>
                  <SelectItem value="find-distance">Find Distance</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {calcType === "find-angle" && (
              <div className="grid md:grid-cols-2 gap-4">
                <div><Label>Height (opposite)</Label><Input type="number" value={height} onChange={(e) => setHeight(e.target.value)} /></div>
                <div><Label>Distance (adjacent)</Label><Input type="number" value={distance} onChange={(e) => setDistance(e.target.value)} /></div>
              </div>
            )}
            {calcType === "find-height" && (
              <div className="grid md:grid-cols-2 gap-4">
                <div><Label>Distance (adjacent)</Label><Input type="number" value={distance} onChange={(e) => setDistance(e.target.value)} /></div>
                <div><Label>Angle (°)</Label><Input type="number" value={angle} onChange={(e) => setAngle(e.target.value)} /></div>
              </div>
            )}
            {calcType === "find-distance" && (
              <div className="grid md:grid-cols-2 gap-4">
                <div><Label>Height (opposite)</Label><Input type="number" value={height} onChange={(e) => setHeight(e.target.value)} /></div>
                <div><Label>Angle (°)</Label><Input type="number" value={angle} onChange={(e) => setAngle(e.target.value)} /></div>
              </div>
            )}

            {error && <div className="p-3 bg-destructive/10 text-destructive text-sm rounded-lg">{error}</div>}
            <div className="flex gap-2"><Button onClick={calculate}>Calculate</Button><Button variant="outline" onClick={reset}>Reset</Button></div>

            {result && (
              <div className="space-y-4">
                <div className="p-6 bg-muted rounded-lg text-center">
                  {result.angle && <><p className="text-sm text-muted-foreground">Angle</p><p className="text-4xl font-bold">{result.angle.toFixed(2)}°</p></>}
                  {result.height && <><p className="text-sm text-muted-foreground">Height</p><p className="text-4xl font-bold">{result.height.toFixed(4)}</p></>}
                  {result.distance && <><p className="text-sm text-muted-foreground">Distance</p><p className="text-4xl font-bold">{result.distance.toFixed(4)}</p></>}
                </div>
                <div className="p-4 border rounded-lg"><h4 className="font-semibold text-sm mb-3">Solution</h4><div className="space-y-2 text-sm font-mono">{result.steps.map((s:string,i:number)=><div key={i}>{s}</div>)}</div></div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle>Understanding Elevation and Depression</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Angle of elevation is the angle you look up from horizontal. Angle of depression is the angle you look down. Both use the same math – they're alternate interior angles.
          </p>
          <div className="p-4 bg-muted rounded-lg"><p className="font-mono text-center">tan(θ) = opposite/adjacent = height/distance</p></div>
          <p className="text-sm text-muted-foreground">
            Use tangent when you have height and distance. Use sine when you have height and line of sight. Use cosine when you have distance and line of sight.
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle>Related Math Tools</CardTitle></CardHeader>
        <CardContent>
          <div className="grid sm:grid-cols-3 gap-4">
            <a href="/math-tools/right-triangle-calculator" className="p-4 rounded-lg border hover:bg-muted transition-colors"><p className="font-semibold text-sm">Right Triangle Calculator</p><p className="text-xs text-muted-foreground">Solve right triangles</p></a>
            <a href="/math-tools/trig-function-calculator" className="p-4 rounded-lg border hover:bg-muted transition-colors"><p className="font-semibold text-sm">Trig Function Calculator</p><p className="text-xs text-muted-foreground">Calculate sin, cos, tan</p></a>
            <a href="/math-tools/triangle-solver" className="p-4 rounded-lg border hover:bg-muted transition-colors"><p className="font-semibold text-sm">Triangle Solver</p><p className="text-xs text-muted-foreground">Solve any triangle</p></a>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
