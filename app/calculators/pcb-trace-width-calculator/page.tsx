"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function PcbTraceWidthCalculator() {
  const [current, setCurrent] = useState<string>("");
  const [copperWeight, setCopperWeight] = useState<string>("1");
  const [tempRise, setTempRise] = useState<string>("10");
  const [layer, setLayer] = useState<"external" | "internal">("external");
  const [results, setResults] = useState<any>(null);

  const calculate = () => {
    const I = parseFloat(current);
    const oz = parseFloat(copperWeight);
    const ΔT = parseFloat(tempRise);
    
    if (I > 0 && oz > 0 && ΔT > 0) {
      // IPC-2221 formula approximation
      const thickness = oz * 0.0348; // mm
      const k = layer === "external" ? 0.048 : 0.024;
      
      // Area in mil²
      const area = Math.pow(I / (k * Math.pow(ΔT, 0.44)), 1 / 0.725);
      
      // Width in mm (assuming area = width × thickness)
      const widthMils = area / 1.378; // Convert to width in mils
      const widthMm = widthMils * 0.0254;

      setResults({
        width: Math.round(widthMm * 100) / 100,
        widthMils: Math.round(widthMils * 10) / 10,
        thickness: thickness,
      });
    }
  };

  const reset = () => {
    setCurrent(""); setCopperWeight("1"); setTempRise("10"); setResults(null);
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>PCB Trace Width Calculator – Calculate Copper Trace Width</CardTitle>
          <CardDescription>
            Calculate minimum PCB trace width for a given current using IPC-2221 guidelines. Prevents overheating and ensures reliability.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div><Label>Current (A)</Label><Input value={current} onChange={e => setCurrent(e.target.value)} /></div>
              <div>
                <Label>Copper Weight (oz/ft²)</Label>
                <Select value={copperWeight} onValueChange={(v) => setCopperWeight(v)}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="0.5">0.5 oz</SelectItem>
                    <SelectItem value="1">1 oz</SelectItem>
                    <SelectItem value="2">2 oz</SelectItem>
                    <SelectItem value="3">3 oz</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div><Label>Temp Rise (°C)</Label><Input value={tempRise} onChange={e => setTempRise(e.target.value)} /></div>
              <div>
                <Label>Layer Type</Label>
                <Select value={layer} onValueChange={(v) => setLayer(v as typeof layer)}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="external">External Layer</SelectItem>
                    <SelectItem value="internal">Internal Layer</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex gap-2">
              <Button onClick={calculate}>Calculate Width</Button>
              <Button variant="outline" onClick={reset}>Reset</Button>
            </div>

            {results && (
              <div className="p-4 bg-muted rounded-md space-y-3">
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Trace Width</p>
                    <p className="text-2xl font-bold">{results.width} mm</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">In Mils</p>
                    <p className="text-2xl font-bold">{results.widthMils} mil</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Copper Thickness</p>
                    <p className="text-xl font-bold">{results.thickness} mm</p>
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
