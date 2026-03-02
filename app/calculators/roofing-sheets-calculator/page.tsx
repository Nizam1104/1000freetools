"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function RoofingSheetsCalculator() {
  const [roofLength, setRoofLength] = useState<string>("");
  const [roofWidth, setRoofWidth] = useState<string>("");
  const [sheetLength, setSheetLength] = useState<string>("");
  const [sheetWidth, setSheetWidth] = useState<string>("");
  const [overlap, setOverlap] = useState<string>("10");
  const [waste, setWaste] = useState<string>("5");
  const [results, setResults] = useState<any>(null);

  const calculate = () => {
    const RL = parseFloat(roofLength);
    const RW = parseFloat(roofWidth);
    const SL = parseFloat(sheetLength);
    const SW = parseFloat(sheetWidth) / 100;
    const overlapFactor = 1 - parseFloat(overlap) / 100;
    const wasteFactor = 1 + parseFloat(waste) / 100;

    if (RL > 0 && RW > 0 && SL > 0 && SW > 0) {
      const roofArea = RL * RW;
      const effectiveSheetWidth = SW * overlapFactor;
      const effectiveSheetArea = SL * effectiveSheetWidth;
      const sheetsNeeded = Math.ceil((roofArea / effectiveSheetArea) * wasteFactor);

      setResults({
        roofArea,
        sheets: sheetsNeeded,
        coverage: sheetsNeeded * SL * effectiveSheetWidth,
      });
    }
  };

  const reset = () => {
    setRoofLength(""); setRoofWidth(""); setSheetLength(""); setSheetWidth("");
    setOverlap("10"); setWaste("5"); setResults(null);
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Roofing Calculator – How Many Roofing Sheets Do You Need?</CardTitle>
          <CardDescription>
            Plan your roofing project with our roofing sheets calculator. Enter roof area and sheet dimensions to calculate the exact number of panels needed with waste included.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div><Label>Roof Length (m)</Label><Input value={roofLength} onChange={e => setRoofLength(e.target.value)} /></div>
              <div><Label>Roof Width (m)</Label><Input value={roofWidth} onChange={e => setRoofWidth(e.target.value)} /></div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div><Label>Sheet Length (m)</Label><Input value={sheetLength} onChange={e => setSheetLength(e.target.value)} /></div>
              <div><Label>Sheet Width (cm)</Label><Input value={sheetWidth} onChange={e => setSheetWidth(e.target.value)} /></div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div><Label>Side Overlap (%)</Label><Input value={overlap} onChange={e => setOverlap(e.target.value)} /></div>
              <div><Label>Waste Factor (%)</Label><Input value={waste} onChange={e => setWaste(e.target.value)} /></div>
            </div>

            <div className="flex gap-2">
              <Button onClick={calculate}>Calculate Sheets</Button>
              <Button variant="outline" onClick={reset}>Reset</Button>
            </div>

            {results && (
              <div className="p-4 bg-muted rounded-md space-y-3">
                <div>
                  <p className="text-sm text-muted-foreground">Roof Area</p>
                  <p className="text-2xl font-bold">{Math.round(results.roofArea * 100) / 100} m²</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Sheets Needed</p>
                  <p className="text-4xl font-bold">{results.sheets}</p>
                </div>
                <p className="text-xs text-muted-foreground">Total coverage: {Math.round(results.coverage * 100) / 100} m²</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
