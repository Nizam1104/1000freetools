"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function BoltTorqueCalculator() {
  const [boltSize, setBoltSize] = useState<string>("");
  const [grade, setGrade] = useState<string>("8.8");
  const [lubrication, setLubrication] = useState<"dry" | "lubricated">("dry");
  const [results, setResults] = useState<any>(null);

  const gradeProof: Record<string, number> = {
    "4.6": 240,
    "8.8": 640,
    "10.9": 940,
    "12.9": 1100,
  };

  const calculate = () => {
    const d = parseFloat(boltSize);
    const σ_proof = gradeProof[grade] || 640;
    const K = lubrication === "dry" ? 0.2 : 0.15;

    if (d > 0) {
      // T = K × F × d where F = 0.75 × σ_proof × As
      const As = 0.7854 * Math.pow(d - 0.9382 * 1.5, 2); // Approximate stress area
      const F = 0.75 * σ_proof * As / 1000; // kN
      const T = K * F * (d / 1000); // N·m

      setResults({ torque: Math.round(T * 10) / 10, preload: Math.round(F * 10) / 10 });
    }
  };

  const reset = () => {
    setBoltSize(""); setGrade("8.8"); setLubrication("dry"); setResults(null);
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Bolt Torque Calculator – Calculate Bolt Tightening Torque</CardTitle>
          <CardDescription>
            Calculate the recommended tightening torque for bolts based on size, grade, and lubrication condition.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div><Label>Bolt Diameter (mm)</Label><Input value={boltSize} onChange={e => setBoltSize(e.target.value)} placeholder="e.g., 10" /></div>
              <div>
                <Label>Grade</Label>
                <Select value={grade} onValueChange={(v) => setGrade(v)}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="4.6">4.6</SelectItem>
                    <SelectItem value="8.8">8.8</SelectItem>
                    <SelectItem value="10.9">10.9</SelectItem>
                    <SelectItem value="12.9">12.9</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <Label>Lubrication</Label>
              <Select value={lubrication} onValueChange={(v) => setLubrication(v as typeof lubrication)}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="dry">Dry</SelectItem>
                  <SelectItem value="lubricated">Lubricated</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex gap-2">
              <Button onClick={calculate}>Calculate Torque</Button>
              <Button variant="outline" onClick={reset}>Reset</Button>
            </div>

            {results && (
              <div className="p-4 bg-muted rounded-md space-y-3">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Tightening Torque</p>
                    <p className="text-4xl font-bold">{results.torque} N·m</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Preload</p>
                    <p className="text-2xl font-bold">{results.preload} kN</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
