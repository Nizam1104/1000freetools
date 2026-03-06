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

      <Card className="mt-6">
        <CardHeader>
          <CardTitle>How to Calculate Plaster Quantity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-start gap-4 mb-4">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm">1</div>
            <div>
              <p className="font-semibold mb-1">Measure wall dimensions</p>
              <p className="text-sm text-muted-foreground">Enter the length and height of the wall or ceiling surface to be plastered in meters.</p>
            </div>
          </div>
          <div className="flex items-start gap-4 mb-4">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm">2</div>
            <div>
              <p className="font-semibold mb-1">Specify thickness and openings</p>
              <p className="text-sm text-muted-foreground">Input plaster thickness (typically 12-20mm) and subtract door/window areas.</p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm">3</div>
            <div>
              <p className="font-semibold mb-1">Get material quantities</p>
              <p className="text-sm text-muted-foreground">Receive cement bags and sand volume needed based on 1:4 mix ratio.</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Why Use This Plastering Calculator</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <p className="font-semibold mb-1">Accurate material estimates</p>
              <p className="text-sm text-muted-foreground">Prevents over-ordering or running short during your plastering project.</p>
            </div>
            <div>
              <p className="font-semibold mb-1">Accounts for openings</p>
              <p className="text-sm text-muted-foreground">Subtract door and window areas for precise material calculations.</p>
            </div>
            <div>
              <p className="font-semibold mb-1">Standard mix ratio</p>
              <p className="text-sm text-muted-foreground">Uses 1:4 cement-to-sand ratio common for wall plastering.</p>
            </div>
            <div>
              <p className="font-semibold mb-1">Dry volume adjustment</p>
              <p className="text-sm text-muted-foreground">Automatically adds 30% for dry-to-wet volume conversion.</p>
            </div>
            <div>
              <p className="font-semibold mb-1">Budget planning</p>
              <p className="text-sm text-muted-foreground">Know exact cement bags and sand volume before purchasing materials.</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Frequently Asked Questions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <p className="font-semibold mb-1">How thick should plaster be?</p>
              <p className="text-sm text-muted-foreground">Single coat plaster is typically 12-15mm thick. Double coat applications use 20mm total. Ceilings usually need 10-12mm.</p>
            </div>
            <div>
              <p className="font-semibold mb-1">What is the best cement-sand ratio for plaster?</p>
              <p className="text-sm text-muted-foreground">For walls, use 1:4 (cement:sand). For ceilings, 1:3 provides better adhesion. Richer mixes crack more easily.</p>
            </div>
            <div>
              <p className="font-semibold mb-1">How do I calculate plaster area?</p>
              <p className="text-sm text-muted-foreground">Multiply length by height for each wall, then subtract door and window openings. Add all wall areas together.</p>
            </div>
            <div>
              <p className="font-semibold mb-1">How many cement bags for 100 sq ft plaster?</p>
              <p className="text-sm text-muted-foreground">For 12mm thick 1:4 plaster, you need about 10-11 bags of 50kg cement per 100 square meters.</p>
            </div>
            <div>
              <p className="font-semibold mb-1">Do I add extra for wastage?</p>
              <p className="text-sm text-muted-foreground">Yes, add 10-15% extra material for wastage, spillage, and uneven surfaces during application.</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Related Construction Calculators</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground mb-3">
            Try our other building tools: the <a href="/calculators/brick-calculator" className="text-primary hover:underline">brick calculator</a> for masonry estimates, the <a href="/calculators/concrete-volume-calculator" className="text-primary hover:underline">concrete volume calculator</a> for foundations, and the <a href="/calculators/flooring-calculator" className="text-primary hover:underline">flooring calculator</a> for tile and wood installation.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
