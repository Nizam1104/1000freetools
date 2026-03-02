"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function FoundationVolumeCalculator() {
  const [length, setLength] = useState<string>("");
  const [width, setWidth] = useState<string>("");
  const [depth, setDepth] = useState<string>("");
  const [numFootings, setNumFootings] = useState<string>("");
  const [results, setResults] = useState<any>(null);

  const calculate = () => {
    const L = parseFloat(length);
    const W = parseFloat(width);
    const D = parseFloat(depth);
    const n = parseInt(numFootings) || 1;

    if (L > 0 && W > 0 && D > 0) {
      const volume = L * W * D * n;
      // Add 10% waste
      const withWaste = volume * 1.1;

      setResults({
        volume: Math.round(volume * 100) / 100,
        withWaste: Math.round(withWaste * 100) / 100,
        cubicYards: Math.round(withWaste * 1.30795 * 10) / 10,
      });
    }
  };

  const reset = () => {
    setLength(""); setWidth(""); setDepth(""); setNumFootings("1"); setResults(null);
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Foundation Volume Calculator – Calculate Concrete for Footings</CardTitle>
          <CardDescription>
            Calculate the volume of concrete needed for foundation footings. Enter dimensions and number of footings.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-3 gap-4">
              <div><Label>Length (m)</Label><Input value={length} onChange={e => setLength(e.target.value)} /></div>
              <div><Label>Width (m)</Label><Input value={width} onChange={e => setWidth(e.target.value)} /></div>
              <div><Label>Depth (m)</Label><Input value={depth} onChange={e => setDepth(e.target.value)} /></div>
            </div>
            <div>
              <Label>Number of Footings</Label>
              <Input type="number" value={numFootings} onChange={e => setNumFootings(e.target.value)} />
            </div>

            <div className="flex gap-2">
              <Button onClick={calculate}>Calculate Volume</Button>
              <Button variant="outline" onClick={reset}>Reset</Button>
            </div>

            {results && (
              <div className="p-4 bg-muted rounded-md space-y-3">
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Net Volume</p>
                    <p className="text-2xl font-bold">{results.volume} m³</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">With 10% Waste</p>
                    <p className="text-2xl font-bold">{results.withWaste} m³</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Cubic Yards</p>
                    <p className="text-2xl font-bold">{results.cubicYards} yd³</p>
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
