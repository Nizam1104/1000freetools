"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function EngineDisplacementCalculatorPage() {
  const [bore, setBore] = useState<string>("");
  const [stroke, setStroke] = useState<string>("");
  const [cylinders, setCylinders] = useState<string>("");
  const [unit, setUnit] = useState<"mm" | "inches">("mm");
  const [result, setResult] = useState<{
    displacementCc: number;
    displacementLiters: number;
    displacementCi: number;
    boreCm: number;
    strokeCm: number;
  } | null>(null);

  const calculate = () => {
    const boreVal = parseFloat(bore);
    const strokeVal = parseFloat(stroke);
    const cylindersVal = parseInt(cylinders);

    if (isNaN(boreVal) || isNaN(strokeVal) || isNaN(cylindersVal) || boreVal <= 0 || strokeVal <= 0 || cylindersVal <= 0) return;

    // Convert to cm for calculation (1 cm = 10 mm, 1 inch = 2.54 cm)
    let boreCm = boreVal;
    let strokeCm = strokeVal;

    if (unit === "mm") {
      boreCm = boreVal / 10;
      strokeCm = strokeVal / 10;
    } else {
      boreCm = boreVal * 2.54;
      strokeCm = strokeVal * 2.54;
    }

    // Formula: Displacement = π/4 × bore² × stroke × number of cylinders
    const radius = boreCm / 2;
    const singleCylinderVolume = Math.PI * radius * radius * strokeCm;
    const totalDisplacementCc = singleCylinderVolume * cylindersVal;
    const totalDisplacementLiters = totalDisplacementCc / 1000;
    const totalDisplacementCi = totalDisplacementCc * 0.0610237;

    setResult({
      displacementCc: Math.round(totalDisplacementCc),
      displacementLiters: Math.round(totalDisplacementLiters * 100) / 100,
      displacementCi: Math.round(totalDisplacementCi),
      boreCm: Math.round(boreCm * 100) / 100,
      strokeCm: Math.round(strokeCm * 100) / 100,
    });
  };

  const reset = () => {
    setBore("");
    setStroke("");
    setCylinders("");
    setResult(null);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl font-semibold tracking-tight mb-2">
            Engine Displacement Calculator – Calculate CC & Liter Capacity from Bore & Stroke
          </h1>
          <p className="text-muted-foreground">
            Calculate your engine's total displacement in cc or liters using bore, stroke, and
            cylinder count with our Engine Displacement Calculator. Ideal for mechanics, car
            enthusiasts, and performance tuning.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardContent className="p-6 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="bore">Bore (Cylinder Diameter)</Label>
                <div className="flex gap-2">
                  <Input
                    id="bore"
                    type="number"
                    placeholder={unit === "mm" ? "e.g., 86" : "e.g., 3.39"}
                    value={bore}
                    onChange={(e) => setBore(e.target.value)}
                    className="flex-1"
                  />
                  <Select value={unit} onValueChange={(v) => setUnit(v as "mm" | "inches")}>
                    <SelectTrigger className="w-[100px]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="mm">mm</SelectItem>
                      <SelectItem value="inches">inches</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="stroke">Stroke (Piston Travel)</Label>
                <Input
                  id="stroke"
                  type="number"
                  placeholder={unit === "mm" ? "e.g., 86" : "e.g., 3.39"}
                  value={stroke}
                  onChange={(e) => setStroke(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="cylinders">Number of Cylinders</Label>
                <Select value={cylinders} onValueChange={setCylinders}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select cylinders" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">1 (Single)</SelectItem>
                    <SelectItem value="2">2 (Twin)</SelectItem>
                    <SelectItem value="3">3 (Triple)</SelectItem>
                    <SelectItem value="4">4 (Inline-4)</SelectItem>
                    <SelectItem value="5">5 (Inline-5)</SelectItem>
                    <SelectItem value="6">6 (Inline-6/V6)</SelectItem>
                    <SelectItem value="8">8 (V8)</SelectItem>
                    <SelectItem value="10">10 (V10)</SelectItem>
                    <SelectItem value="12">12 (V12)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex gap-2 pt-4">
                <Button onClick={calculate} className="flex-1">
                  Calculate
                </Button>
                <Button variant="outline" onClick={reset}>
                  Reset
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">Engine Displacement Results</h3>
              {result ? (
                <div className="space-y-4">
                  <div className="p-4 bg-primary/10 rounded-lg">
                    <p className="text-sm text-muted-foreground">Total Displacement</p>
                    <p className="text-3xl font-bold text-primary">
                      {result.displacementLiters} L ({result.displacementCc} cc)
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-4 bg-muted rounded-lg">
                      <p className="text-sm text-muted-foreground">Cubic Inches</p>
                      <p className="text-lg font-bold">{result.displacementCi} ci</p>
                    </div>
                    <div className="p-4 bg-muted rounded-lg">
                      <p className="text-sm text-muted-foreground">Cylinders</p>
                      <p className="text-lg font-bold">{cylinders}</p>
                    </div>
                  </div>

                  <div className="p-4 bg-muted rounded-lg">
                    <p className="text-sm text-muted-foreground">Bore × Stroke</p>
                    <p className="text-xl font-bold">{result.boreCm} cm × {result.strokeCm} cm</p>
                  </div>

                  <div className="border-t pt-4">
                    <p className="text-sm text-muted-foreground">
                      <strong>Engine type:</strong>{" "}
                      {result.displacementLiters < 1.0 ? "Small engine (motorcycle/subcompact)" :
                       result.displacementLiters < 2.0 ? "Compact car engine" :
                       result.displacementLiters < 3.0 ? "Mid-size car engine" :
                       result.displacementLiters < 5.0 ? "Large car/SUV engine" :
                       "Large truck/performance engine"}
                    </p>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <p>Enter values and click Calculate to see results</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="mt-8 p-6 bg-card rounded-lg border">
          <h3 className="text-lg font-semibold mb-3">Engine Displacement Formula</h3>
          <p className="text-muted-foreground text-sm mb-3">
            Engine displacement is the total volume swept by all pistons during one stroke:
          </p>
          <div className="bg-muted p-3 rounded font-mono text-sm space-y-1">
            <div>Single Cylinder Volume = π/4 × bore² × stroke</div>
            <div>Total Displacement = Single Cylinder Volume × Number of Cylinders</div>
          </div>
          <p className="text-muted-foreground text-sm mt-3">
            <strong>Example:</strong> A 4-cylinder engine with 86mm bore and 86mm stroke:
            <br />
            π/4 × 8.6² × 8.6 × 4 = 1,998 cc ≈ 2.0L
          </p>
        </div>
      </div>
    </div>
  );
}
