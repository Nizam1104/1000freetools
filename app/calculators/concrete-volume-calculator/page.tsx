"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function ConcreteVolumeCalculator() {
  const [shape, setShape] = useState<"slab" | "column" | "footing" | "wall">("slab");
  const [length, setLength] = useState<string>("");
  const [width, setWidth] = useState<string>("");
  const [depth, setDepth] = useState<string>("");
  const [height, setHeight] = useState<string>("");
  const [diameter, setDiameter] = useState<string>("");
  const [waste, setWaste] = useState<string>("10");
  const [results, setResults] = useState<any>(null);

  const calculate = () => {
    let volume = 0;
    const wasteFactor = 1 + parseFloat(waste) / 100;

    switch (shape) {
      case "slab":
      case "footing":
        const L = parseFloat(length);
        const W = parseFloat(width);
        const D = parseFloat(depth);
        if (L > 0 && W > 0 && D > 0) volume = L * W * D;
        break;
      case "column":
        const dia = parseFloat(diameter);
        const H = parseFloat(height);
        if (dia > 0 && H > 0) volume = Math.PI * Math.pow(dia / 2, 2) * H;
        break;
      case "wall":
        const WL = parseFloat(length);
        const WH = parseFloat(height);
        const WT = parseFloat(depth);
        if (WL > 0 && WH > 0 && WT > 0) volume = WL * WH * WT;
        break;
    }

    if (volume > 0) {
      const withWaste = volume * wasteFactor;
      setResults({
        volume: volume,
        withWaste: withWaste,
        cubicYards: withWaste * 1.30795,
        bags80lb: Math.ceil((withWaste * 1.30795 * 27) / 0.6),
      });
    }
  };

  const reset = () => {
    setLength(""); setWidth(""); setDepth(""); setHeight(""); setDiameter("");
    setWaste("10"); setResults(null);
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Concrete Volume Calculator – How Much Concrete Do You Need?</CardTitle>
          <CardDescription>
            Estimate concrete quantities for any project with our concrete volume calculator. Compute cubic yards or meters for slabs, columns, footings, and walls to avoid over-ordering.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <Label>Shape</Label>
              <Select value={shape} onValueChange={(v) => setShape(v as typeof shape)}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="slab">Slab</SelectItem>
                  <SelectItem value="column">Column</SelectItem>
                  <SelectItem value="footing">Footing</SelectItem>
                  <SelectItem value="wall">Wall</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {shape === "column" ? (
              <div className="grid grid-cols-2 gap-4">
                <div><Label>Diameter (m)</Label><Input value={diameter} onChange={e => setDiameter(e.target.value)} /></div>
                <div><Label>Height (m)</Label><Input value={height} onChange={e => setHeight(e.target.value)} /></div>
              </div>
            ) : shape === "wall" ? (
              <div className="grid grid-cols-3 gap-4">
                <div><Label>Length (m)</Label><Input value={length} onChange={e => setLength(e.target.value)} /></div>
                <div><Label>Height (m)</Label><Input value={height} onChange={e => setHeight(e.target.value)} /></div>
                <div><Label>Thickness (m)</Label><Input value={depth} onChange={e => setDepth(e.target.value)} /></div>
              </div>
            ) : (
              <div className="grid grid-cols-3 gap-4">
                <div><Label>Length (m)</Label><Input value={length} onChange={e => setLength(e.target.value)} /></div>
                <div><Label>Width (m)</Label><Input value={width} onChange={e => setWidth(e.target.value)} /></div>
                <div><Label>Depth (m)</Label><Input value={depth} onChange={e => setDepth(e.target.value)} /></div>
              </div>
            )}

            <div>
              <Label>Waste Factor (%)</Label>
              <Input type="number" value={waste} onChange={e => setWaste(e.target.value)} />
              <p className="text-sm text-muted-foreground mt-1">Recommended: 5-10% for slabs, 10-15% for complex shapes</p>
            </div>

            <div className="flex gap-2">
              <Button onClick={calculate}>Calculate Volume</Button>
              <Button variant="outline" onClick={reset}>Reset</Button>
            </div>

            {results && (
              <div className="p-4 bg-muted rounded-md space-y-3">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Volume (m³)</p>
                    <p className="text-2xl font-bold">{Math.round(results.volume * 100) / 100}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">With Waste (m³)</p>
                    <p className="text-2xl font-bold">{Math.round(results.withWaste * 100) / 100}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Cubic Yards</p>
                    <p className="text-2xl font-bold">{Math.round(results.cubicYards * 10) / 10}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">80lb Bags</p>
                    <p className="text-2xl font-bold">{results.bags80lb}</p>
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
