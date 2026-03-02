"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function PlasteringCalculator() {
  const [length, setLength] = useState<string>("");
  const [height, setHeight] = useState<string>("");
  const [thickness, setThickness] = useState<string>("");
  const [doors, setDoors] = useState<string>("");
  const [windows, setWindows] = useState<string>("");
  const [results, setResults] = useState<any>(null);

  const calculate = () => {
    const L = parseFloat(length);
    const H = parseFloat(height);
    const T = parseFloat(thickness) / 1000; // Convert mm to m
    const doorArea = parseFloat(doors) || 0;
    const windowArea = parseFloat(windows) || 0;

    if (L > 0 && H > 0 && T > 0) {
      const wallArea = L * H;
      const plasterArea = wallArea - doorArea - windowArea;
      const plasterVolume = plasterArea * T;
      const dryVolume = plasterVolume * 1.3; // 30% increase for dry volume
      const cementBags = Math.ceil((dryVolume / 4) * 1440 / 50); // 1:4 mix, 1440 kg/m³ cement
      const sandVolume = dryVolume * 4 / 5;

      setResults({
        area: plasterArea,
        wetVolume: plasterVolume,
        dryVolume: dryVolume,
        cementBags: cementBags,
        sandVolume: sandVolume,
      });
    }
  };

  const reset = () => {
    setLength(""); setHeight(""); setThickness(""); setDoors(""); setWindows("");
    setResults(null);
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Plastering Calculator – How Much Plaster Do You Need?</CardTitle>
          <CardDescription>
            Calculate plaster quantities for walls and ceilings with our plastering calculator. Enter surface area and plaster thickness to find the volume and weight of plaster needed.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div><Label>Wall Length (m)</Label><Input value={length} onChange={e => setLength(e.target.value)} /></div>
              <div><Label>Wall Height (m)</Label><Input value={height} onChange={e => setHeight(e.target.value)} /></div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div><Label>Plaster Thickness (mm)</Label><Input value={thickness} onChange={e => setThickness(e.target.value)} placeholder="12" /></div>
              <div><Label>Doors Area (m²)</Label><Input value={doors} onChange={e => setDoors(e.target.value)} /></div>
              <div><Label>Windows Area (m²)</Label><Input value={windows} onChange={e => setWindows(e.target.value)} /></div>
            </div>

            <div className="flex gap-2">
              <Button onClick={calculate}>Calculate Plaster</Button>
              <Button variant="outline" onClick={reset}>Reset</Button>
            </div>

            {results && (
              <div className="p-4 bg-muted rounded-md space-y-3">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Plaster Area</p>
                    <p className="text-2xl font-bold">{Math.round(results.area * 100) / 100} m²</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Wet Volume</p>
                    <p className="text-2xl font-bold">{Math.round(results.wetVolume * 1000) / 1000} m³</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Cement Bags (50kg)</p>
                    <p className="text-3xl font-bold">{results.cementBags}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Sand Volume</p>
                    <p className="text-2xl font-bold">{Math.round(results.sandVolume * 100) / 100} m³</p>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground">Based on 1:4 cement:sand mix ratio</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
