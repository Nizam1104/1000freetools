"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
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

interface TirePressureResult {
  basePressure: number;
  ambientTemp: number;
  loadAdjustment: number;
  altitudeAdjustment: number;
  adjustedPressure: number;
  pressureChange: number;
  status: string;
  recommendations: string[];
}

export default function TirePressureAdjustmentCalculatorPage() {
  const [basePressure, setBasePressure] = useState<string>("32");
  const [ambientTemp, setAmbientTemp] = useState<string>("20");
  const [loadCondition, setLoadCondition] = useState<string>("normal");
  const [altitude, setAltitude] = useState<string>("0");
  const [tempUnit, setTempUnit] = useState<string>("celsius");
  const [pressureUnit, setPressureUnit] = useState<string>("psi");
  const [result, setResult] = useState<TirePressureResult | null>(null);

  const calculate = () => {
    let baseNum = parseFloat(basePressure) || 32;
    let tempNum = parseFloat(ambientTemp) || 20;
    const altitudeNum = parseFloat(altitude) || 0;

    // Convert temperature to Celsius if needed
    if (tempUnit === "fahrenheit") {
      tempNum = (tempNum - 32) * 5/9;
    }

    // Reference temperature (standard is 20°C / 68°F)
    const refTemp = 20;
    const tempDiff = tempNum - refTemp;

    // Temperature adjustment: ~1 PSI per 10°F (5.5°C)
    const tempAdjustment = tempDiff / 5.5;

    // Load adjustment
    const loadAdjustments: Record<string, number> = {
      light: -2,
      normal: 0,
      heavy: 3,
      max: 6,
    };
    const loadAdj = loadAdjustments[loadCondition] || 0;

    // Altitude adjustment (minimal effect on tire pressure, but affects gauge reading)
    // ~0.5 PSI per 1000m altitude change
    const altitudeAdj = altitudeNum / 2000;

    // Calculate adjusted pressure
    const adjustedPressure = baseNum + tempAdjustment + loadAdj + altitudeAdj;
    const pressureChange = adjustedPressure - baseNum;

    // Status
    let status = "";
    if (Math.abs(pressureChange) <= 2) {
      status = "✅ Minimal adjustment needed";
    } else if (pressureChange > 2) {
      status = "⚠️ Pressure increase expected - monitor closely";
    } else {
      status = "⚠️ Pressure decrease expected - add air";
    }

    // Recommendations
    const recommendations: string[] = [];

    if (tempNum < 0) {
      recommendations.push("❄️ Cold weather: Check pressure more frequently");
      recommendations.push("💡 Pressure drops ~1 PSI per 10°F temperature drop");
    } else if (tempNum > 35) {
      recommendations.push("🌡️ Hot weather: Don't bleed tires when hot");
      recommendations.push("💡 Pressure increases during driving due to heat");
    }

    if (loadCondition === "heavy" || loadCondition === "max") {
      recommendations.push("⚖️ Heavy load: Increase pressure as recommended by manufacturer");
      recommendations.push("🚗 Check door jamb sticker for load-specific pressures");
    }

    if (altitudeNum > 1500) {
      recommendations.push("🏔️ High altitude: Gauge readings may differ slightly");
    }

    recommendations.push(`📊 Recommended cold pressure: ${adjustedPressure.toFixed(1)} ${pressureUnit}`);
    recommendations.push("💡 Always check tire pressure when tires are cold");

    setResult({
      basePressure: baseNum,
      ambientTemp: tempNum,
      loadAdjustment: loadAdj,
      altitudeAdjustment: parseFloat(altitudeAdj.toFixed(1)),
      adjustedPressure: parseFloat(adjustedPressure.toFixed(1)),
      pressureChange: parseFloat(pressureChange.toFixed(1)),
      status,
      recommendations,
    });
  };

  const reset = () => {
    setBasePressure("32");
    setAmbientTemp("20");
    setResult(null);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl font-semibold tracking-tight mb-2">
            Tire Pressure Adjustment Calculator – Correct PSI for Temperature & Load
          </h1>
          <p className="text-muted-foreground">
            Maintain optimal tire pressure in all conditions with our Tire Pressure Adjustment Calculator.
            Account for ambient temperature, vehicle load, and altitude to calculate the correct PSI —
            improving fuel efficiency, tire life, and driving safety.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardContent className="p-6 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="base-pressure">Base Tire Pressure ({pressureUnit})</Label>
                <Input
                  id="base-pressure"
                  type="number"
                  value={basePressure}
                  onChange={(e) => setBasePressure(e.target.value)}
                  placeholder="32"
                />
                <p className="text-xs text-muted-foreground">
                  Check door jamb or manual for recommended pressure
                </p>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div className="space-y-1">
                  <Label htmlFor="temp">Ambient Temperature</Label>
                  <Input
                    id="temp"
                    type="number"
                    value={ambientTemp}
                    onChange={(e) => setAmbientTemp(e.target.value)}
                    placeholder="20"
                  />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="temp-unit">Unit</Label>
                  <Select value={tempUnit} onValueChange={setTempUnit}>
                    <SelectTrigger id="temp-unit">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="celsius">°C</SelectItem>
                      <SelectItem value="fahrenheit">°F</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="load">Load Condition</Label>
                <Select value={loadCondition} onValueChange={setLoadCondition}>
                  <SelectTrigger id="load">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="light">Light Load (1-2 passengers)</SelectItem>
                    <SelectItem value="normal">Normal Load (3-4 passengers)</SelectItem>
                    <SelectItem value="heavy">Heavy Load (Full + cargo)</SelectItem>
                    <SelectItem value="max">Maximum Load (Towing)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="altitude">Altitude (meters)</Label>
                <Input
                  id="altitude"
                  type="number"
                  value={altitude}
                  onChange={(e) => setAltitude(e.target.value)}
                  placeholder="0"
                />
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
              <h3 className="text-lg font-semibold mb-4">Pressure Adjustment</h3>
              {result ? (
                <div className="space-y-4">
                  <div className={`p-4 rounded-lg text-center ${
                    Math.abs(result.pressureChange) <= 2 ? "bg-green-100 dark:bg-green-900/20" :
                    result.pressureChange > 2 ? "bg-amber-100 dark:bg-amber-900/20" :
                    "bg-red-100 dark:bg-red-900/20"
                  }`}>
                    <p className="text-sm text-muted-foreground">Adjusted Pressure</p>
                    <p className="text-4xl font-bold">{result.adjustedPressure} {pressureUnit}</p>
                    <p className="text-sm mt-1">
                      Change: {result.pressureChange > 0 ? "+" : ""}{result.pressureChange} {pressureUnit}
                    </p>
                    <p className="text-sm mt-2">{result.status}</p>
                  </div>

                  <div className="p-4 bg-muted rounded-lg space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Base Pressure:</span>
                      <span className="font-semibold">{result.basePressure} {pressureUnit}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Temp Adjustment:</span>
                      <span className="font-semibold">{(result.ambientTemp - 20) / 5.5 > 0 ? "+" : ""}{((result.ambientTemp - 20) / 5.5).toFixed(1)} {pressureUnit}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Load Adjustment:</span>
                      <span className="font-semibold">{result.loadAdjustment > 0 ? "+" : ""}{result.loadAdjustment} {pressureUnit}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Altitude Adjustment:</span>
                      <span className="font-semibold">{result.altitudeAdjustment > 0 ? "+" : ""}{result.altitudeAdjustment} {pressureUnit}</span>
                    </div>
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
                  <p>Enter conditions and click Calculate to see adjustment</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="mt-8 space-y-6">
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">
                Tire Pressure Tips
              </h3>
              <div className="space-y-3 text-sm text-muted-foreground">
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>
                    <strong>Temperature effect:</strong> ~1 PSI per 10°F (5.5°C) change
                  </li>
                  <li>
                    <strong>Check when cold:</strong> After sitting for 3+ hours
                  </li>
                  <li>
                    <strong>Driving heats tires:</strong> Pressure increases 3-5 PSI
                  </li>
                  <li>
                    <strong>Underinflation:</strong> Reduces fuel economy and tire life
                  </li>
                  <li>
                    <strong>Overinflation:</strong> Reduces traction and comfort
                  </li>
                </ul>
                <p>
                  <strong>Note:</strong> Always follow vehicle manufacturer&apos;s recommended
                  pressures (found on door jamb sticker). These calculations are adjustments
                  to the base recommended pressure.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
