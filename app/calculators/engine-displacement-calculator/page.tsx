"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

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

        <div className="mt-8 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>How to Calculate Engine Displacement</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">
                <strong>Step 1:</strong> Enter the bore (cylinder diameter) and select your unit (mm or inches).
              </p>
              <p className="text-sm text-muted-foreground">
                <strong>Step 2:</strong> Enter the stroke (how far the piston travels) in the same unit.
              </p>
              <p className="text-sm text-muted-foreground">
                <strong>Step 3:</strong> Select the number of cylinders and calculate to see total displacement in cc and liters.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Understanding Engine Displacement</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h4 className="font-semibold text-sm mb-2">What Is Engine Displacement</h4>
                <p className="text-sm text-muted-foreground">
                  Engine displacement is the total volume swept by all pistons during one stroke. It's measured in cubic centimeters (cc) or liters. A "2.0L engine" means the pistons displace 2 liters of volume as they move. Bigger displacement usually means more power, but also more fuel consumption.
                </p>
              </div>

              <div>
                <h4 className="font-semibold text-sm mb-2">Bore vs Stroke</h4>
                <p className="text-sm text-muted-foreground mb-3">
                  The relationship between bore and stroke affects engine character:
                </p>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="p-4 bg-muted rounded-md">
                    <p className="font-semibold text-sm mb-2">Oversquare (bore &gt; stroke)</p>
                    <p className="text-xs text-muted-foreground">
                      Wide cylinders, short stroke. Revs higher, makes more peak power. Most modern car engines are oversquare. Example: BMW S54 - 87mm bore, 84mm stroke.
                    </p>
                  </div>
                  <div className="p-4 bg-muted rounded-md">
                    <p className="font-semibold text-sm mb-2">Undersquare (bore &lt; stroke)</p>
                    <p className="text-xs text-muted-foreground">
                      Narrow cylinders, long stroke. More torque at low RPM, but can't rev as high. Common in trucks and old engines. Example: Many diesel trucks.
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-semibold text-sm mb-2">Why Displacement Matters</h4>
                <p className="text-sm text-muted-foreground">
                  Displacement affects power, torque, fuel economy, and emissions. Larger engines burn more fuel per cycle but can move heavier vehicles. Smaller engines with turbos can match larger engine power while using less fuel - that's why 2.0L turbo engines replaced V6s in many cars.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Common Engine Displacements Reference</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Vehicle Type</TableHead>
                    <TableHead>Typical Displacement</TableHead>
                    <TableHead>Cylinders</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>Motorcycle (small)</TableCell>
                    <TableCell className="font-mono">125-300 cc</TableCell>
                    <TableCell>1-2</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Motorcycle (large)</TableCell>
                    <TableCell className="font-mono">600-1,400 cc</TableCell>
                    <TableCell>2-4</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Subcompact car</TableCell>
                    <TableCell className="font-mono">1.0-1.5 L</TableCell>
                    <TableCell>3-4</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Compact car</TableCell>
                    <TableCell className="font-mono">1.5-2.5 L</TableCell>
                    <TableCell>4</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Mid-size sedan</TableCell>
                    <TableCell className="font-mono">2.0-3.5 L</TableCell>
                    <TableCell>4-6</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Full-size SUV/Truck</TableCell>
                    <TableCell className="font-mono">3.5-6.2 L</TableCell>
                    <TableCell>6-8</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Performance/Sports car</TableCell>
                    <TableCell className="font-mono">3.0-8.0 L</TableCell>
                    <TableCell>6-12</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
              <p className="text-xs text-muted-foreground mt-3">
                Electric vehicles don't have engine displacement - they're rated by motor power in kW instead.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Frequently Asked Questions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h4 className="font-semibold text-sm mb-2">How do I calculate engine cc?</h4>
                <p className="text-sm text-muted-foreground">
                  Use the formula: cc = π/4 × bore² × stroke × cylinders. Bore and stroke must be in centimeters. For a 4-cylinder with 86mm bore and 86mm stroke: π/4 × 8.6² × 8.6 × 4 = 1,998 cc.
                </p>
              </div>

              <div>
                <h4 className="font-semibold text-sm mb-2">Is bigger engine displacement better?</h4>
                <p className="text-sm text-muted-foreground">
                  Depends what you need. Bigger engines make more power and torque but use more fuel. For towing or performance, yes - bigger helps. For city driving and fuel economy, smaller is better. Turbocharging lets small engines make big-engine power when needed.
                </p>
              </div>

              <div>
                <h4 className="font-semibold text-sm mb-2">What does cc stand for in engines?</h4>
                <p className="text-sm text-muted-foreground">
                  CC means cubic centimeters. It's the volume of all cylinders combined. 1,000 cc equals 1 liter. A "2.0L" engine is 2,000 cc. Motorcycles use cc, cars usually use liters - same measurement, different units.
                </p>
              </div>

              <div>
                <h4 className="font-semibold text-sm mb-2">How does bore and stroke affect power?</h4>
                <p className="text-sm text-muted-foreground">
                  Larger bore allows bigger valves for better airflow at high RPM - more peak power. Longer stroke increases leverage on the crankshaft - more torque. Short-stroke engines rev higher. Long-stroke engines pull harder at low RPM.
                </p>
              </div>

              <div>
                <h4 className="font-semibold text-sm mb-2">Can I increase my engine's displacement?</h4>
                <p className="text-sm text-muted-foreground">
                  Yes, through "boring out" (wider cylinders) or "stroking" (longer stroke crankshaft). Boring adds maybe 0.5-1mm per side. Stroking requires new pistons and rods. Both increase displacement but also increase stress and may need tuning.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Related Tools</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid sm:grid-cols-3 gap-4">
                <a href="/calculators/rpm-calculator" className="p-4 rounded-lg border hover:bg-muted transition-colors">
                  <p className="font-semibold text-sm">RPM Calculator</p>
                  <p className="text-xs text-muted-foreground">Calculate engine RPM from speed</p>
                </a>
                <a href="/calculators/force-calculator" className="p-4 rounded-lg border hover:bg-muted transition-colors">
                  <p className="font-semibold text-sm">Force Calculator</p>
                  <p className="text-xs text-muted-foreground">Calculate force and torque</p>
                </a>
                <a href="/calculators/velocity-calculator" className="p-4 rounded-lg border hover:bg-muted transition-colors">
                  <p className="font-semibold text-sm">Velocity Calculator</p>
                  <p className="text-xs text-muted-foreground">Find speed and acceleration</p>
                </a>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
