"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function PaintCoverageCalculator() {
  const [length, setLength] = useState<string>("");
  const [width, setWidth] = useState<string>("");
  const [height, setHeight] = useState<string>("");
  const [doors, setDoors] = useState<string>("");
  const [windows, setWindows] = useState<string>("");
  const [coats, setCoats] = useState<string>("2");
  const [coverage, setCoverage] = useState<string>("10");
  const [results, setResults] = useState<any>(null);

  const calculate = () => {
    const L = parseFloat(length);
    const W = parseFloat(width);
    const H = parseFloat(height);
    const doorArea = parseFloat(doors) || 0;
    const windowArea = parseFloat(windows) || 0;
    const numCoats = parseInt(coats);
    const coverageRate = parseFloat(coverage); // m² per liter

    if (L > 0 && W > 0 && H > 0 && coverageRate > 0) {
      const wallArea = 2 * (L + W) * H;
      const paintableArea = wallArea - doorArea - windowArea;
      const totalArea = paintableArea * numCoats;
      const paintNeeded = totalArea / coverageRate;
      const gallons = paintNeeded * 0.264172;

      setResults({
        wallArea: wallArea,
        paintableArea: paintableArea,
        totalArea: totalArea,
        liters: paintNeeded,
        gallons: gallons,
      });
    }
  };

  const reset = () => {
    setLength(""); setWidth(""); setHeight(""); setDoors(""); setWindows("");
    setCoats("2"); setCoverage("10"); setResults(null);
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Paint Calculator – How Much Paint Do You Need to Cover a Room?</CardTitle>
          <CardDescription>
            Take the guesswork out of painting with our paint coverage calculator. Enter your room dimensions and number of coats to find out exactly how much paint to buy.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-3 gap-4">
              <div><Label>Length (m)</Label><Input value={length} onChange={e => setLength(e.target.value)} /></div>
              <div><Label>Width (m)</Label><Input value={width} onChange={e => setWidth(e.target.value)} /></div>
              <div><Label>Height (m)</Label><Input value={height} onChange={e => setHeight(e.target.value)} /></div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div><Label>Doors Area (m²)</Label><Input value={doors} onChange={e => setDoors(e.target.value)} placeholder="e.g., 4" /></div>
              <div><Label>Windows Area (m²)</Label><Input value={windows} onChange={e => setWindows(e.target.value)} placeholder="e.g., 3" /></div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div><Label>Number of Coats</Label><Input type="number" value={coats} onChange={e => setCoats(e.target.value)} /></div>
              <div><Label>Coverage Rate (m²/L)</Label><Input value={coverage} onChange={e => setCoverage(e.target.value)} /></div>
            </div>

            <div className="flex gap-2">
              <Button onClick={calculate}>Calculate Paint</Button>
              <Button variant="outline" onClick={reset}>Reset</Button>
            </div>

            {results && (
              <div className="p-4 bg-muted rounded-md space-y-3">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Paintable Area</p>
                    <p className="text-2xl font-bold">{Math.round(results.paintableArea * 100) / 100} m²</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Total Area ({coats} coats)</p>
                    <p className="text-2xl font-bold">{Math.round(results.totalArea * 100) / 100} m²</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Paint Needed</p>
                    <p className="text-3xl font-bold">{Math.round(results.liters * 10) / 10} L</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">In Gallons</p>
                    <p className="text-2xl font-bold">{Math.round(results.gallons * 10) / 10} gal</p>
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
