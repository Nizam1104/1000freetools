"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function LensEquationCalculator() {
  const [solveFor, setSolveFor] = useState<"f" | "u" | "v">("f");
  const [focalLength, setFocalLength] = useState<string>("");
  const [objectDistance, setObjectDistance] = useState<string>("");
  const [imageDistance, setImageDistance] = useState<string>("");
  const [results, setResults] = useState<any>(null);

  const calculate = () => {
    // 1/f = 1/u + 1/v
    if (solveFor === "f") {
      const u = parseFloat(objectDistance);
      const v = parseFloat(imageDistance);
      if (u !== 0 && v !== 0) {
        const f = 1 / (1 / u + 1 / v);
        const m = -v / u;
        setResults({ value: f, magnification: m, label: "Focal Length" });
      }
    } else if (solveFor === "u") {
      const f = parseFloat(focalLength);
      const v = parseFloat(imageDistance);
      if (f !== 0 && v !== 0 && v !== f) {
        const u = 1 / (1 / f - 1 / v);
        const m = -v / u;
        setResults({ value: u, magnification: m, label: "Object Distance" });
      }
    } else {
      const f = parseFloat(focalLength);
      const u = parseFloat(objectDistance);
      if (f !== 0 && u !== 0 && u !== f) {
        const v = 1 / (1 / f - 1 / u);
        const m = -v / u;
        setResults({ value: v, magnification: m, label: "Image Distance" });
      }
    }
  };

  const reset = () => {
    setFocalLength(""); setObjectDistance(""); setImageDistance(""); setResults(null);
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Lens Equation Calculator – Thin Lens Formula Calculator</CardTitle>
          <CardDescription>
            Calculate focal length, object distance, or image distance using the thin lens equation. Our calculator also determines magnification.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">1/f = 1/u + 1/v</p>

            <div>
              <Label>Solve For</Label>
              <Select value={solveFor} onValueChange={(v) => setSolveFor(v as typeof solveFor)}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="f">Focal Length (f)</SelectItem>
                  <SelectItem value="u">Object Distance (u)</SelectItem>
                  <SelectItem value="v">Image Distance (v)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {solveFor !== "f" && <div><Label>Focal Length</Label><Input value={focalLength} onChange={e => setFocalLength(e.target.value)} /></div>}
              {solveFor !== "u" && <div><Label>Object Distance</Label><Input value={objectDistance} onChange={e => setObjectDistance(e.target.value)} /></div>}
              {solveFor !== "v" && <div><Label>Image Distance</Label><Input value={imageDistance} onChange={e => setImageDistance(e.target.value)} /></div>}
            </div>

            <div className="flex gap-2">
              <Button onClick={calculate}>Calculate</Button>
              <Button variant="outline" onClick={reset}>Reset</Button>
            </div>

            {results && (
              <div className="p-4 bg-muted rounded-md space-y-3">
                <div>
                  <p className="text-sm text-muted-foreground">{results.label}</p>
                  <p className="text-4xl font-bold">{Math.round(results.value * 1000) / 1000}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Magnification (m)</p>
                  <p className="text-2xl font-bold">{Math.round(results.magnification * 100) / 100}</p>
                  <p className="text-xs text-muted-foreground">
                    {Math.abs(results.magnification) > 1 ? "Enlarged" : Math.abs(results.magnification) < 1 ? "Reduced" : "Same size"}
                    {results.magnification < 0 ? ", Inverted" : ", Upright"}
                  </p>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
