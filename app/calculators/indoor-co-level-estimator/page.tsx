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

interface IndoorCOResult {
  roomVolume: number;
  occupants: number;
  ventilationRate: number;
  co2Level: number;
  co2Rating: string;
  healthImpact: string;
  recommendations: string[];
}

export default function IndoorCOLevelEstimatorPage() {
  const [roomLength, setRoomLength] = useState<string>("");
  const [roomWidth, setRoomWidth] = useState<string>("");
  const [roomHeight, setRoomHeight] = useState<string>("");
  const [occupants, setOccupants] = useState<string>("");
  const [ventilationRate, setVentilationRate] = useState<string>("");
  const [unit, setUnit] = useState<string>("meters");
  const [result, setResult] = useState<IndoorCOResult | null>(null);

  const calculate = () => {
    const lengthNum = parseFloat(roomLength) || 0;
    const widthNum = parseFloat(roomWidth) || 0;
    const heightNum = parseFloat(roomHeight) || 0;
    const occupantsNum = parseInt(occupants) || 0;
    const ventRateNum = parseFloat(ventilationRate) || 0;

    if (lengthNum === 0 || widthNum === 0 || heightNum === 0) return;

    // Calculate room volume
    let volume = lengthNum * widthNum * heightNum;
    
    // Convert to cubic meters if needed
    if (unit === "feet") {
      volume = volume * 0.0283; // cubic feet to cubic meters
    }

    // CO2 generation rate per person (approximately 0.005 L/s or 18 L/hour at rest)
    const co2GenerationPerPerson = 18; // L/hour

    // Outdoor CO2 level (typically 400-420 ppm)
    const outdoorCO2 = 420;

    // Calculate steady-state CO2 concentration
    // C = Co + (G × N) / (Q × 3600)
    // Where: C = indoor CO2, Co = outdoor CO2, G = generation rate, N = occupants, Q = ventilation (m³/h)
    
    // If no ventilation rate provided, estimate based on room volume (typical ACH = 1-2)
    const airChangesPerHour = ventRateNum > 0 ? ventRateNum : 1.5;
    const ventilationM3h = volume * airChangesPerHour;

    // Total CO2 generation (L/hour)
    const totalGeneration = co2GenerationPerPerson * occupantsNum;

    // Indoor CO2 concentration (ppm)
    // 1 ppm = 0.0001% = 0.001 L/m³
    const co2Level = outdoorCO2 + (totalGeneration * 1000) / ventilationM3h;

    // CO2 rating
    let co2Rating = "";
    let healthImpact = "";

    if (co2Level < 600) {
      co2Rating = "🟢 Excellent - Fresh air";
      healthImpact = "No adverse effects";
    } else if (co2Level < 800) {
      co2Rating = "🟢 Good - Acceptable";
      healthImpact = "No significant effects";
    } else if (co2Level < 1000) {
      co2Rating = "🟡 Fair - Marginal";
      healthImpact = "Some may feel drowsy";
    } else if (co2Level < 1500) {
      co2Rating = "🟠 Poor - Inadequate ventilation";
      healthImpact = "Drowsiness, poor concentration";
    } else if (co2Level < 2000) {
      co2Rating = "🔴 Very Poor - Unhealthy";
      healthImpact = "Headaches, sleepiness, poor air quality";
    } else {
      co2Rating = "🔴 Dangerous - Immediate action needed";
      healthImpact = "Nausea, increased heart rate, cognitive impairment";
    }

    // Recommendations
    const recommendations: string[] = [];
    recommendations.push(`📐 Room volume: ${volume.toFixed(1)} m³`);
    recommendations.push(`👥 Occupants: ${occupantsNum}`);
    recommendations.push(`💨 Ventilation: ${airChangesPerHour.toFixed(1)} air changes/hour`);
    recommendations.push(`🌡️ Estimated CO₂: ${Math.round(co2Level)} ppm`);

    if (co2Level > 1000) {
      recommendations.push("⚠️ Increase ventilation - open windows or increase HVAC");
      recommendations.push("🪟 Consider air purifier with CO2 monitoring");
    }

    if (occupantsNum > 0 && volume / occupantsNum < 10) {
      recommendations.push("⚠️ Overcrowded - reduce occupancy or increase ventilation");
    }

    recommendations.push("📊 Monitor CO2 levels continuously in occupied spaces");
    recommendations.push("🌬️ ASHRAE recommends keeping CO2 below 1000 ppm");

    setResult({
      roomVolume: parseFloat(volume.toFixed(1)),
      occupants: occupantsNum,
      ventilationRate: parseFloat(airChangesPerHour.toFixed(1)),
      co2Level: parseFloat(co2Level.toFixed(0)),
      co2Rating,
      healthImpact,
      recommendations,
    });
  };

  const reset = () => {
    setRoomLength("");
    setRoomWidth("");
    setRoomHeight("");
    setOccupants("");
    setVentilationRate("");
    setResult(null);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl font-semibold tracking-tight mb-2">
            Indoor CO₂ Level Estimator – Calculate CO₂ Concentration in Any Room
          </h1>
          <p className="text-muted-foreground">
            Ensure healthy indoor air quality with our CO₂ Level Estimator. Enter room
            dimensions, occupancy, and ventilation rate to estimate indoor CO₂
            concentration in ppm — helping building managers and homeowners maintain
            safe and productive environments.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardContent className="p-6 space-y-4">
              <div className="grid grid-cols-3 gap-2">
                <div className="space-y-1">
                  <Label htmlFor="length">Length</Label>
                  <Input
                    id="length"
                    type="number"
                    value={roomLength}
                    onChange={(e) => setRoomLength(e.target.value)}
                    placeholder="5"
                  />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="width">Width</Label>
                  <Input
                    id="width"
                    type="number"
                    value={roomWidth}
                    onChange={(e) => setRoomWidth(e.target.value)}
                    placeholder="4"
                  />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="height">Height</Label>
                  <Input
                    id="height"
                    type="number"
                    value={roomHeight}
                    onChange={(e) => setRoomHeight(e.target.value)}
                    placeholder="2.5"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="unit">Unit</Label>
                <Select value={unit} onValueChange={setUnit}>
                  <SelectTrigger id="unit">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="meters">Meters</SelectItem>
                    <SelectItem value="feet">Feet</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="occupants">Number of Occupants</Label>
                <Input
                  id="occupants"
                  type="number"
                  value={occupants}
                  onChange={(e) => setOccupants(e.target.value)}
                  placeholder="4"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="ventilation">Air Changes per Hour (optional)</Label>
                <Input
                  id="ventilation"
                  type="number"
                  step="0.1"
                  value={ventilationRate}
                  onChange={(e) => setVentilationRate(e.target.value)}
                  placeholder="Leave empty for estimate"
                />
                <p className="text-xs text-muted-foreground">
                  Typical: 1-2 ACH (natural), 3-6 ACH (mechanical)
                </p>
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
              <h3 className="text-lg font-semibold mb-4">CO₂ Analysis</h3>
              {result ? (
                <div className="space-y-4">
                  <div className={`p-4 rounded-lg text-center ${
                    result.co2Level < 800 ? "bg-green-100 dark:bg-green-900/20" :
                    result.co2Level < 1000 ? "bg-blue-100 dark:bg-blue-900/20" :
                    result.co2Level < 1500 ? "bg-amber-100 dark:bg-amber-900/20" :
                    "bg-red-100 dark:bg-red-900/20"
                  }`}>
                    <p className="text-sm text-muted-foreground">Estimated CO₂ Level</p>
                    <p className="text-5xl font-bold">{result.co2Level} ppm</p>
                    <p className="text-sm mt-1">{result.co2Rating}</p>
                  </div>

                  <div className="p-4 bg-muted rounded-lg space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Room Volume:</span>
                      <span className="font-semibold">{result.roomVolume} m³</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Occupants:</span>
                      <span className="font-semibold">{result.occupants}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Ventilation:</span>
                      <span className="font-semibold">{result.ventilationRate} ACH</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Health Impact:</span>
                      <span className="font-semibold text-sm">{result.healthImpact}</span>
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
                  <p>Enter room details and click Calculate to see CO₂ estimate</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="mt-8 space-y-6">
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">
                CO₂ Level Guidelines
              </h3>
              <div className="space-y-3 text-sm text-muted-foreground">
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>
                    <strong>400-600 ppm:</strong> Outdoor/fresh air quality
                  </li>
                  <li>
                    <strong>600-800 ppm:</strong> Good indoor air quality
                  </li>
                  <li>
                    <strong>800-1000 ppm:</strong> Acceptable (ASHRAE standard)
                  </li>
                  <li>
                    <strong>1000-1500 ppm:</strong> Poor ventilation, drowsiness
                  </li>
                  <li>
                    <strong>1500-2000 ppm:</strong> Unhealthy, headaches likely
                  </li>
                  <li>
                    <strong>2000+ ppm:</strong> Dangerous, immediate action needed
                  </li>
                </ul>
                <p>
                  <strong>Note:</strong> This is an estimate based on steady-state
                  conditions. Actual CO2 levels vary with activity level, exact
                  ventilation, and time. Use a CO2 monitor for accurate readings.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
