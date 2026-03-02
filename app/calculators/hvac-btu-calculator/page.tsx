"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function HVACBtuCalculator() {
  const [length, setLength] = useState<string>("");
  const [width, setWidth] = useState<string>("");
  const [height, setHeight] = useState<string>("");
  const [insulation, setInsulation] = useState<"poor" | "average" | "good">("average");
  const [climate, setClimate] = useState<"hot" | "moderate" | "cool">("moderate");
  const [sunExposure, setSunExposure] = useState<"high" | "average" | "low">("average");
  const [results, setResults] = useState<any>(null);

  const calculate = () => {
    const L = parseFloat(length);
    const W = parseFloat(width);
    const H = parseFloat(height);

    if (L > 0 && W > 0 && H > 0) {
      const area = L * W;
      const volume = area * H;
      
      // Base BTU: 25 BTU per sq ft (≈270 per m²)
      let btu = area * 270;

      // Insulation factor
      if (insulation === "poor") btu *= 1.2;
      if (insulation === "good") btu *= 0.85;

      // Climate factor
      if (climate === "hot") btu *= 1.15;
      if (climate === "cool") btu *= 0.85;

      // Sun exposure
      if (sunExposure === "high") btu *= 1.1;
      if (sunExposure === "low") btu *= 0.9;

      // Height adjustment (standard is 2.5m)
      if (H > 2.5) btu *= (H / 2.5);

      const tons = btu / 12000;
      const kW = btu * 0.000293071;

      setResults({ btu: Math.round(btu), tons: Math.round(tons * 10) / 10, kW: Math.round(kW * 100) / 100 });
    }
  };

  const reset = () => {
    setLength(""); setWidth(""); setHeight(""); setInsulation("average");
    setClimate("moderate"); setSunExposure("average"); setResults(null);
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>HVAC BTU Calculator – What Size Air Conditioner Do You Need?</CardTitle>
          <CardDescription>
            Choose the right HVAC unit with our BTU calculator. Enter room size, insulation, and climate to determine the required heating or cooling capacity in BTUs per hour.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-3 gap-4">
              <div><Label>Length (m)</Label><Input value={length} onChange={e => setLength(e.target.value)} /></div>
              <div><Label>Width (m)</Label><Input value={width} onChange={e => setWidth(e.target.value)} /></div>
              <div><Label>Height (m)</Label><Input value={height} onChange={e => setHeight(e.target.value)} /></div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div>
                <Label>Insulation</Label>
                <Select value={insulation} onValueChange={(v) => setInsulation(v as typeof insulation)}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="poor">Poor</SelectItem>
                    <SelectItem value="average">Average</SelectItem>
                    <SelectItem value="good">Good</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Climate</Label>
                <Select value={climate} onValueChange={(v) => setClimate(v as typeof climate)}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="hot">Hot</SelectItem>
                    <SelectItem value="moderate">Moderate</SelectItem>
                    <SelectItem value="cool">Cool</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Sun Exposure</Label>
                <Select value={sunExposure} onValueChange={(v) => setSunExposure(v as typeof sunExposure)}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="high">High</SelectItem>
                    <SelectItem value="average">Average</SelectItem>
                    <SelectItem value="low">Low</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex gap-2">
              <Button onClick={calculate}>Calculate BTU</Button>
              <Button variant="outline" onClick={reset}>Reset</Button>
            </div>

            {results && (
              <div className="p-4 bg-muted rounded-md space-y-3">
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Cooling Capacity</p>
                    <p className="text-3xl font-bold">{results.btu.toLocaleString()} BTU/h</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">In Tons</p>
                    <p className="text-3xl font-bold">{results.tons} tons</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">In kW</p>
                    <p className="text-2xl font-bold">{results.kW} kW</p>
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
