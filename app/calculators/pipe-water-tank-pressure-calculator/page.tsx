"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardAction, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface PressureResult {
  height: number;
  pressurePsi: number;
  pressureBar: number;
  pressureKpa: number;
  pressureAtm: number;
  flowVelocity: number;
  recommendations: string[];
}

export default function PipeWaterTankPressureCalculatorPage() {
  const [height, setHeight] = useState<string>("");
  const [heightUnit, setHeightUnit] = useState<string>("feet");
  const [pipeDiameter, setPipeDiameter] = useState<string>("");
  const [result, setResult] = useState<PressureResult | null>(null);

  const calculate = () => {
    let heightNum = parseFloat(height) || 0;
    const diameterNum = parseFloat(pipeDiameter) || 0;

    if (heightNum === 0) return;

    // Convert to meters
    let heightM = heightNum;
    if (heightUnit === "feet") {
      heightM = heightNum * 0.3048;
    }

    // Calculate pressure using hydrostatic pressure formula
    // P = ρgh where ρ = 1000 kg/m³ (water), g = 9.81 m/s²
    const pressurePa = 1000 * 9.81 * heightM;

    // Convert to various units
    const pressurePsi = pressurePa * 0.000145038;
    const pressureBar = pressurePa / 100000;
    const pressureKpa = pressurePa / 1000;
    const pressureAtm = pressurePa / 101325;

    // Calculate theoretical flow velocity (Torricelli's law)
    // v = √(2gh)
    const flowVelocity = Math.sqrt(2 * 9.81 * heightM);

    // Recommendations
    const recommendations: string[] = [];

    if (pressurePsi < 20) {
      recommendations.push("⚠️ Low pressure - may need booster pump");
      recommendations.push("📈 Increase tank height for better pressure");
    } else if (pressurePsi >= 20 && pressurePsi <= 60) {
      recommendations.push("✅ Good pressure range for residential use");
    } else if (pressurePsi > 60 && pressurePsi <= 80) {
      recommendations.push("⚠️ High pressure - consider pressure reducing valve");
    } else {
      recommendations.push("🚨 Very high pressure - pressure reducing valve required");
    }

    if (heightUnit === "feet" && heightNum > 100) {
      recommendations.push("🏗️ Tall water column - ensure pipe rating is sufficient");
    }

    recommendations.push(`💧 Flow velocity: ${flowVelocity.toFixed(2)} m/s at outlet`);
    recommendations.push(`📏 Rule: 1 foot of head = 0.433 PSI`);

    setResult({
      height: heightM,
      pressurePsi: parseFloat(pressurePsi.toFixed(2)),
      pressureBar: parseFloat(pressureBar.toFixed(2)),
      pressureKpa: parseFloat(pressureKpa.toFixed(1)),
      pressureAtm: parseFloat(pressureAtm.toFixed(3)),
      flowVelocity: parseFloat(flowVelocity.toFixed(2)),
      recommendations,
    });
  };

  const reset = () => {
    setHeight("");
    setResult(null);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl font-semibold tracking-tight mb-2">
            Pipe Water Pressure Calculator – Calculate Static Pressure from Water Tank Height
          </h1>
          <p className="text-muted-foreground">
            Calculate water pressure at any point in your pipe system with our Tank Pressure Calculator.
            Enter the height of the water column to determine static pressure in PSI, bar, or kPa —
            essential for plumbing design and water system planning.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardContent className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-2">
                <div className="space-y-1">
                  <Label htmlFor="height">Water Column Height</Label>
                  <Input
                    id="height"
                    type="number"
                    value={height}
                    onChange={(e) => setHeight(e.target.value)}
                    placeholder="e.g., 50"
                  />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="height-unit">Unit</Label>
                  <Select value={heightUnit} onValueChange={setHeightUnit}>
                    <SelectTrigger id="height-unit">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="feet">Feet</SelectItem>
                      <SelectItem value="meters">Meters</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="pipe-diameter">Pipe Diameter (optional, inches)</Label>
                <Input
                  id="pipe-diameter"
                  type="number"
                  step="0.5"
                  value={pipeDiameter}
                  onChange={(e) => setPipeDiameter(e.target.value)}
                  placeholder="e.g., 2"
                />
              </div>

              <div className="p-3 bg-muted/50 rounded-lg">
                <p className="text-xs text-muted-foreground font-medium mb-2">
                  Quick Reference:
                </p>
                <ul className="text-xs text-muted-foreground space-y-1">
                  <li>• 10 ft head = 4.33 PSI</li>
                  <li>• 23.1 ft head = 10 PSI</li>
                  <li>• 100 ft head = 43.3 PSI</li>
                </ul>
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
              <h3 className="text-lg font-semibold mb-4">Pressure Results</h3>
              {result ? (
                <div className="space-y-4">
                  <div className="p-4 bg-primary/10 rounded-lg text-center">
                    <p className="text-sm text-muted-foreground">Static Pressure</p>
                    <p className="text-4xl font-bold text-primary">{result.pressurePsi} PSI</p>
                    <p className="text-sm text-muted-foreground mt-1">
                      from {result.height.toFixed(1)}m water column
                    </p>
                  </div>

                  <div className="grid grid-cols-3 gap-2">
                    <div className="p-3 bg-muted rounded-lg text-center">
                      <p className="text-xs text-muted-foreground">Bar</p>
                      <p className="text-lg font-bold">{result.pressureBar}</p>
                    </div>
                    <div className="p-3 bg-muted rounded-lg text-center">
                      <p className="text-xs text-muted-foreground">kPa</p>
                      <p className="text-lg font-bold">{result.pressureKpa}</p>
                    </div>
                    <div className="p-3 bg-muted rounded-lg text-center">
                      <p className="text-xs text-muted-foreground">Atm</p>
                      <p className="text-lg font-bold">{result.pressureAtm}</p>
                    </div>
                  </div>

                  <div className="p-4 bg-muted rounded-lg space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Flow Velocity:</span>
                      <span className="font-semibold">{result.flowVelocity} m/s</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Head Pressure:</span>
                      <span className="font-semibold">{result.height.toFixed(1)} m</span>
                    </div>
                  </div>

                  <div className={`p-3 rounded-lg ${result.pressurePsi >= 20 && result.pressurePsi <= 60
                      ? "bg-green-50 dark:bg-green-950/20"
                      : "bg-amber-50 dark:bg-amber-950/20"
                    }`}>
                    <p className={`text-sm ${result.pressurePsi >= 20 && result.pressurePsi <= 60
                        ? "text-green-800 dark:text-green-200"
                        : "text-amber-800 dark:text-amber-200"
                      }`}>
                      {result.pressurePsi >= 20 && result.pressurePsi <= 60
                        ? "✅ Ideal residential pressure range"
                        : result.pressurePsi < 20
                          ? "⚠️ Below recommended pressure"
                          : "⚠️ Above recommended pressure"}
                    </p>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2 text-sm">Recommendations</h4>
                    <ul className="space-y-1">
                      {result.recommendations.map((rec, i) => (
                        <li key={i} className="text-sm">{rec}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <p>Enter water column height and click Calculate to see pressure</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="mt-8 space-y-6">
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">
                Understanding Water Pressure
              </h3>
              <div className="space-y-3 text-sm text-muted-foreground">
                <p>
                  Static water pressure is determined by the height of the water column:
                </p>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>
                    <strong>Formula:</strong> P = ρgh (density × gravity × height)
                  </li>
                  <li>
                    <strong>Water density:</strong> 1000 kg/m³
                  </li>
                  <li>
                    <strong>Gravity:</strong> 9.81 m/s²
                  </li>
                  <li>
                    <strong>1 foot of head:</strong> 0.433 PSI
                  </li>
                  <li>
                    <strong>1 meter of head:</strong> 9.81 kPa
                  </li>
                </ul>
                <p>
                  <strong>Note:</strong> This calculates static (no-flow) pressure.
                  Actual pressure during flow will be lower due to friction losses
                  in pipes. Residential systems typically need 40-60 PSI.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>How to Calculate Water Tank Pressure</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-start gap-4 mb-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm">1</div>
                <div>
                  <p className="font-semibold mb-1">Enter water column height</p>
                  <p className="text-sm text-muted-foreground">Input the vertical distance from the water surface to the measurement point in feet or meters.</p>
                </div>
              </div>
              <div className="flex items-start gap-4 mb-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm">2</div>
                <div>
                  <p className="font-semibold mb-1">Add pipe diameter (optional)</p>
                  <p className="text-sm text-muted-foreground">Include pipe size for more detailed flow velocity calculations and recommendations.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm">3</div>
                <div>
                  <p className="font-semibold mb-1">Get pressure readings</p>
                  <p className="text-sm text-muted-foreground">Receive static pressure in PSI, bar, kPa, and atm, plus flow velocity and system recommendations.</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Key Features for Plumbing Design</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <p className="font-semibold mb-1">Multiple pressure units</p>
                  <p className="text-sm text-muted-foreground">View results in PSI, bar, kPa, and atmospheres for any application.</p>
                </div>
                <div>
                  <p className="font-semibold mb-1">Flow velocity calculation</p>
                  <p className="text-sm text-muted-foreground">Estimate water speed at the outlet using Torricelli's law.</p>
                </div>
                <div>
                  <p className="font-semibold mb-1">Pressure range assessment</p>
                  <p className="text-sm text-muted-foreground">Instant feedback on whether pressure is suitable for residential use.</p>
                </div>
                <div>
                  <p className="font-semibold mb-1">Quick reference values</p>
                  <p className="text-sm text-muted-foreground">Built-in conversion: 10 ft head = 4.33 PSI for easy mental calculations.</p>
                </div>
                <div>
                  <p className="font-semibold mb-1">System recommendations</p>
                  <p className="text-sm text-muted-foreground">Get actionable advice on booster pumps or pressure reducing valves.</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Frequently Asked Questions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <p className="font-semibold mb-1">How do I calculate water pressure from tank height?</p>
                  <p className="text-sm text-muted-foreground">Use P = ρgh. For every foot of water height, you get 0.433 PSI. A 50-foot tank produces about 21.65 PSI at the bottom.</p>
                </div>
                <div>
                  <p className="font-semibold mb-1">What is good water pressure for a house?</p>
                  <p className="text-sm text-muted-foreground">Ideal residential water pressure is 40-60 PSI. Below 40 PSI may cause weak flow; above 80 PSI can damage pipes and fixtures.</p>
                </div>
                <div>
                  <p className="font-semibold mb-1">How high does a water tank need to be for good pressure?</p>
                  <p className="text-sm text-muted-foreground">For 40 PSI, you need about 92 feet of head. For 50 PSI, about 115 feet. Many homes use booster pumps instead of tall tanks.</p>
                </div>
                <div>
                  <p className="font-semibold mb-1">Why is my water pressure low from an overhead tank?</p>
                  <p className="text-sm text-muted-foreground">Low pressure usually means insufficient height. Each floor needs about 10-15 feet of elevation for adequate pressure.</p>
                </div>
                <div>
                  <p className="font-semibold mb-1">Does pipe diameter affect water pressure?</p>
                  <p className="text-sm text-muted-foreground">Pipe size affects flow rate and friction loss, not static pressure. Larger pipes reduce pressure drop during flow.</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Related Plumbing and Engineering Tools</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-3">
                Try our other calculators: the <a href="/calculators/pipe-flow-reynolds-number-calculator" className="text-primary hover:underline">Reynolds number calculator</a> for flow analysis, the <a href="/calculators/pipe-friction-loss-calculator" className="text-primary hover:underline">pipe friction loss calculator</a> for pressure drop, and the <a href="/calculators/water-flow-rate-calculator" className="text-primary hover:underline">water flow rate calculator</a> for volume calculations.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
