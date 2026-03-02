"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function BeamBendingCalculator() {
  const [supportType, setSupportType] = useState<"simply" | "cantilever">("simply");
  const [loadType, setLoadType] = useState<"point" | "distributed">("point");
  const [length, setLength] = useState<string>("");
  const [load, setLoad] = useState<string>("");
  const [loadPosition, setLoadPosition] = useState<string>("");
  const [E, setE] = useState<string>("");
  const [I, setI] = useState<string>("");
  const [results, setResults] = useState<any>(null);

  const calculate = () => {
    const L = parseFloat(length);
    const P = parseFloat(load);
    const a = parseFloat(loadPosition) || L / 2;
    const EVal = parseFloat(E);
    const IVal = parseFloat(I);

    if (L > 0 && P > 0 && EVal > 0 && IVal > 0) {
      let maxMoment = 0;
      let maxDeflection = 0;

      if (supportType === "simply" && loadType === "point") {
        maxMoment = (P * a * (L - a)) / L;
        maxDeflection = (P * a * (L - a) * Math.sqrt(L * L - a * a)) / (9 * Math.sqrt(3) * EVal * IVal * L);
      } else if (supportType === "simply" && loadType === "distributed") {
        const w = P / L; // P is total load
        maxMoment = (w * L * L) / 8;
        maxDeflection = (5 * w * Math.pow(L, 4)) / (384 * EVal * IVal);
      } else if (supportType === "cantilever" && loadType === "point") {
        maxMoment = P * a;
        maxDeflection = (P * Math.pow(a, 3)) / (3 * EVal * IVal);
      } else {
        const w = P / L;
        maxMoment = (w * L * L) / 2;
        maxDeflection = (w * Math.pow(L, 4)) / (8 * EVal * IVal);
      }

      setResults({
        moment: maxMoment,
        deflection: maxDeflection,
      });
    }
  };

  const reset = () => {
    setLength(""); setLoad(""); setLoadPosition(""); setE(""); setI("");
    setResults(null);
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Beam Bending Calculator – Stress & Deflection for Structural Beams</CardTitle>
          <CardDescription>
            Analyze beam performance under load with our beam bending calculator. Calculate maximum bending stress, deflection, and moment for simply supported and cantilever beams.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Support Type</Label>
                <Select value={supportType} onValueChange={(v) => setSupportType(v as typeof supportType)}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="simply">Simply Supported</SelectItem>
                    <SelectItem value="cantilever">Cantilever</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Load Type</Label>
                <Select value={loadType} onValueChange={(v) => setLoadType(v as typeof loadType)}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="point">Point Load</SelectItem>
                    <SelectItem value="distributed">Distributed Load</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div><Label>Beam Length (m)</Label><Input value={length} onChange={e => setLength(e.target.value)} /></div>
              <div><Label>Total Load (N)</Label><Input value={load} onChange={e => setLoad(e.target.value)} /></div>
              <div><Label>Young's Modulus E (Pa)</Label><Input value={E} onChange={e => setE(e.target.value)} /></div>
              <div><Label>Moment of Inertia I (m⁴)</Label><Input value={I} onChange={e => setI(e.target.value)} /></div>
              {loadType === "point" && (
                <div><Label>Load Position from Left (m)</Label><Input value={loadPosition} onChange={e => setLoadPosition(e.target.value)} placeholder={length ? (parseFloat(length)/2).toString() : ""} /></div>
              )}
            </div>

            <div className="flex gap-2">
              <Button onClick={calculate}>Calculate</Button>
              <Button variant="outline" onClick={reset}>Reset</Button>
            </div>

            {results && (
              <div className="p-4 bg-muted rounded-md space-y-3">
                <div>
                  <p className="text-sm text-muted-foreground">Maximum Bending Moment</p>
                  <p className="text-3xl font-bold">{Math.round(results.moment * 100) / 100} N·m</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Maximum Deflection</p>
                  <p className="text-3xl font-bold">{results.deflection.toExponential(4)} m</p>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
