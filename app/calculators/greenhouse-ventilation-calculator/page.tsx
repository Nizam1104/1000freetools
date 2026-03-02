"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function GreenhouseVentilationCalculatorPage() {
  const [greenhouseLength, setGreenhouseLength] = useState<string>("");
  const [greenhouseWidth, setGreenhouseWidth] = useState<string>("");
  const [greenhouseHeight, setGreenhouseHeight] = useState<string>("");
  const [coveringType, setCoveringType] = useState<"polyethylene" | "glass" | "polycarbonate">("polyethylene");
  const [cropType, setCropType] = useState<string>("vegetables");
  const [maxTemp, setMaxTemp] = useState<string>("30");
  const [outsideTemp, setOutsideTemp] = useState<string>("25");
  const [unit, setUnit] = useState<"meters" | "feet">("meters");
  const [result, setResult] = useState<{
    volume: number;
    airExchangeRate: number;
    fanCapacity: number;
    ventArea: number;
    coolingCapacity: number;
  } | null>(null);

  // Air exchange rates per hour for different conditions
  const airExchangeRates: Record<string, number> = {
    vegetables: 60, // per hour
    flowers: 45,
    seedlings: 30,
    tropical: 90,
    succulents: 30,
  };

  // Heat transmission coefficients (W/m²·K)
  const heatCoefficients: Record<string, number> = {
    polyethylene: 6.0,
    glass: 5.5,
    polycarbonate: 3.5,
  };

  const calculate = () => {
    let length = parseFloat(greenhouseLength);
    let width = parseFloat(greenhouseWidth);
    let height = parseFloat(greenhouseHeight);
    const maxT = parseFloat(maxTemp);
    const outsideT = parseFloat(outsideTemp);

    if (isNaN(length) || isNaN(width) || isNaN(height) || 
        length <= 0 || width <= 0 || height <= 0 ||
        isNaN(maxT) || isNaN(outsideT)) return;

    // Convert to meters if in feet
    if (unit === "feet") {
      length *= 0.3048;
      width *= 0.3048;
      height *= 0.3048;
    }

    // Calculate greenhouse volume
    const volume = length * width * height;

    // Calculate floor area
    const floorArea = length * width;

    // Get air exchange rate for crop type
    const exchangeRate = airExchangeRates[cropType] || 60; // per hour

    // Calculate required ventilation rate (m³/hour)
    const airExchangeRate = volume * exchangeRate;

    // Convert to m³/minute for fan capacity
    const fanCapacity = airExchangeRate / 60;

    // Calculate required vent area (natural ventilation)
    // Rule of thumb: vent area should be 15-25% of floor area
    const ventArea = floorArea * 0.20; // 20% of floor area

    // Calculate cooling capacity needed
    // Q = U × A × ΔT (heat loss/gain through covering)
    const U = heatCoefficients[coveringType];
    const coveringArea = 2 * (length * width + length * height + width * height); // Approximate surface area
    const deltaT = maxT - outsideT;
    const coolingCapacity = U * coveringArea * deltaT; // Watts

    setResult({
      volume: Math.round(volume * 100) / 100,
      airExchangeRate: Math.round(airExchangeRate),
      fanCapacity: Math.round(fanCapacity * 100) / 100,
      ventArea: Math.round(ventArea * 100) / 100,
      coolingCapacity: Math.round(coolingCapacity),
    });
  };

  const reset = () => {
    setGreenhouseLength("");
    setGreenhouseWidth("");
    setGreenhouseHeight("");
    setResult(null);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl font-semibold tracking-tight mb-2">
            Greenhouse Ventilation Calculator – Calculate Fan Size & Airflow for Your Greenhouse
          </h1>
          <p className="text-muted-foreground">
            Maintain ideal growing conditions with our Greenhouse Ventilation Calculator. Enter
            your greenhouse dimensions, plant density, and target temperature to calculate the
            required air exchange rate and recommended fan capacity.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardContent className="p-6 space-y-4">
              <div className="space-y-2">
                <Label>Unit System</Label>
                <Select value={unit} onValueChange={(v) => setUnit(v as "meters" | "feet")}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="meters">Meters</SelectItem>
                    <SelectItem value="feet">Feet</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-3 gap-2">
                <div className="space-y-2">
                  <Label htmlFor="length">Length</Label>
                  <Input
                    id="length"
                    type="number"
                    placeholder={unit === "meters" ? "10" : "30"}
                    value={greenhouseLength}
                    onChange={(e) => setGreenhouseLength(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="width">Width</Label>
                  <Input
                    id="width"
                    type="number"
                    placeholder={unit === "meters" ? "6" : "20"}
                    value={greenhouseWidth}
                    onChange={(e) => setGreenhouseWidth(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="height">Height</Label>
                  <Input
                    id="height"
                    type="number"
                    placeholder={unit === "meters" ? "3" : "10"}
                    value={greenhouseHeight}
                    onChange={(e) => setGreenhouseHeight(e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="coveringType">Covering Material</Label>
                <Select value={coveringType} onValueChange={(v) => setCoveringType(v as "polyethylene" | "glass" | "polycarbonate")}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="polyethylene">Polyethylene Film</SelectItem>
                    <SelectItem value="glass">Glass</SelectItem>
                    <SelectItem value="polycarbonate">Polycarbonate</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="cropType">Crop Type</Label>
                <Select value={cropType} onValueChange={setCropType}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="vegetables">Vegetables</SelectItem>
                    <SelectItem value="flowers">Flowers/Ornamentals</SelectItem>
                    <SelectItem value="seedlings">Seedlings/Propagation</SelectItem>
                    <SelectItem value="tropical">Tropical Plants</SelectItem>
                    <SelectItem value="succulents">Succulents/Cacti</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-2">
                  <Label htmlFor="maxTemp">Max Inside Temp (°C)</Label>
                  <Input
                    id="maxTemp"
                    type="number"
                    placeholder="30"
                    value={maxTemp}
                    onChange={(e) => setMaxTemp(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="outsideTemp">Outside Temp (°C)</Label>
                  <Input
                    id="outsideTemp"
                    type="number"
                    placeholder="25"
                    value={outsideTemp}
                    onChange={(e) => setOutsideTemp(e.target.value)}
                  />
                </div>
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
              <h3 className="text-lg font-semibold mb-4">Ventilation Requirements</h3>
              {result ? (
                <div className="space-y-4">
                  <div className="p-4 bg-primary/10 rounded-lg">
                    <p className="text-sm text-muted-foreground">Required Fan Capacity</p>
                    <p className="text-3xl font-bold text-primary">{result.fanCapacity} m³/min</p>
                    <p className="text-sm text-muted-foreground mt-1">
                      ({result.airExchangeRate.toLocaleString()} m³/hour)
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-4 bg-muted rounded-lg">
                      <p className="text-sm text-muted-foreground">Greenhouse Volume</p>
                      <p className="text-lg font-bold">{result.volume} m³</p>
                    </div>
                    <div className="p-4 bg-muted rounded-lg">
                      <p className="text-sm text-muted-foreground">Vent Area Needed</p>
                      <p className="text-lg font-bold">{result.ventArea} m²</p>
                    </div>
                  </div>

                  <div className="p-4 bg-muted rounded-lg">
                    <p className="text-sm text-muted-foreground">Cooling Capacity Required</p>
                    <p className="text-xl font-bold">{result.coolingCapacity} W</p>
                    <p className="text-sm text-muted-foreground mt-1">
                      ({(result.coolingCapacity / 1000).toFixed(1)} kW or {(result.coolingCapacity / 2930).toFixed(1)} tons)
                    </p>
                  </div>

                  <div className="border-t pt-4">
                    <h4 className="font-semibold mb-2 text-sm">Ventilation Recommendations</h4>
                    <ul className="text-sm space-y-1 list-disc list-inside text-muted-foreground">
                      <li>Install exhaust fans on the warmest side of greenhouse</li>
                      <li>Place intake vents on opposite side for cross-ventilation</li>
                      <li>Use thermostatic controls for automatic operation</li>
                      <li>Consider evaporative cooling for hot climates</li>
                      <li>Size fans for 1-2 air changes per minute in summer</li>
                    </ul>
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
          <h3 className="text-lg font-semibold mb-3">Ventilation Calculation Formulas</h3>
          <div className="bg-muted p-3 rounded font-mono text-sm space-y-1">
            <div>Volume = Length × Width × Height</div>
            <div>Air Exchange Rate = Volume × Exchanges/Hour (based on crop)</div>
            <div>Fan Capacity = Air Exchange Rate / 60 (m³/min)</div>
            <div>Vent Area = Floor Area × 20%</div>
            <div>Cooling Load = U × Surface Area × ΔT</div>
          </div>
          <table className="w-full text-sm mt-3">
            <thead>
              <tr className="border-b">
                <th className="text-left py-2">Crop Type</th>
                <th className="text-left py-2">Air Changes/Hour</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b">
                <td className="py-2">Vegetables</td>
                <td className="py-2">60</td>
              </tr>
              <tr className="border-b">
                <td className="py-2">Flowers</td>
                <td className="py-2">45</td>
              </tr>
              <tr className="border-b">
                <td className="py-2">Seedlings</td>
                <td className="py-2">30</td>
              </tr>
              <tr>
                <td className="py-2">Tropical Plants</td>
                <td className="py-2">90</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
