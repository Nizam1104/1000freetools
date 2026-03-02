"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function ConcreteMixRatioCalculator() {
  const [volume, setVolume] = useState<string>("");
  const [ratio, setRatio] = useState<string>("1:2:4");
  const [results, setResults] = useState<any>(null);

  const calculate = () => {
    const V = parseFloat(volume);
    const parts = ratio.split(":").map(Number);

    if (V > 0 && parts.length === 3 && parts.every(p => p > 0)) {
      const [cement, sand, aggregate] = parts;
      const totalParts = cement + sand + aggregate;
      
      // Dry volume is ~1.54× wet volume
      const dryVolume = V * 1.54;
      
      const cementVol = (cement / totalParts) * dryVolume;
      const sandVol = (sand / totalParts) * dryVolume;
      const aggVol = (aggregate / totalParts) * dryVolume;
      
      // Cement: 1440 kg/m³, 50kg per bag
      const cementKg = cementVol * 1440;
      const cementBags = Math.ceil(cementKg / 50);

      setResults({
        cement: Math.round(cementKg),
        cementBags,
        sand: Math.round(sandVol * 100) / 100,
        aggregate: Math.round(aggVol * 100) / 100,
      });
    }
  };

  const reset = () => {
    setVolume(""); setRatio("1:2:4"); setResults(null);
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Concrete Mix Ratio Calculator – Calculate Material Quantities</CardTitle>
          <CardDescription>
            Calculate cement, sand, and aggregate quantities for concrete mixes. Enter volume and mix ratio.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div><Label>Concrete Volume (m³)</Label><Input value={volume} onChange={e => setVolume(e.target.value)} /></div>
              <div>
                <Label>Mix Ratio</Label>
                <Select value={ratio} onValueChange={(v) => setRatio(v)}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1:1.5:3">M20 (1:1.5:3)</SelectItem>
                    <SelectItem value="1:2:4">M15 (1:2:4)</SelectItem>
                    <SelectItem value="1:3:6">M10 (1:3:6)</SelectItem>
                    <SelectItem value="1:4:8">M7.5 (1:4:8)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex gap-2">
              <Button onClick={calculate}>Calculate Materials</Button>
              <Button variant="outline" onClick={reset}>Reset</Button>
            </div>

            {results && (
              <div className="p-4 bg-muted rounded-md space-y-3">
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Cement</p>
                    <p className="text-2xl font-bold">{results.cement} kg</p>
                    <p className="text-xs text-muted-foreground">{results.cementBags} bags</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Sand</p>
                    <p className="text-2xl font-bold">{results.sand} m³</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Aggregate</p>
                    <p className="text-2xl font-bold">{results.aggregate} m³</p>
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
