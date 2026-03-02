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

interface BoatSpeedResult {
  waterlineLength: number;
  hullSpeedKnots: number;
  hullSpeedMph: number;
  hullSpeedKmh: number;
  boatType: string;
  displacementMode: boolean;
  planingSpeed?: number;
  recommendations: string[];
}

export default function BoatSpeedCalculatorPage() {
  const [waterlineLength, setWaterlineLength] = useState<string>("");
  const [boatType, setBoatType] = useState<string>("displacement");
  const [lengthUnit, setLengthUnit] = useState<string>("feet");
  const [result, setResult] = useState<BoatSpeedResult | null>(null);

  const calculate = () => {
    let lwLNum = parseFloat(waterlineLength) || 0;

    if (lwLNum === 0) return;

    // Convert to feet if needed
    let lwLFeet = lwLNum;
    if (lengthUnit === "meters") {
      lwLFeet = lwLNum * 3.281;
    }

    // Hull speed formula for displacement hulls
    // Hull Speed (knots) = 1.34 × √LWL (feet)
    const hullSpeedKnots = 1.34 * Math.sqrt(lwLFeet);
    
    // Convert to other units
    const hullSpeedMph = hullSpeedKnots * 1.151;
    const hullSpeedKmh = hullSpeedKnots * 1.852;

    // Planing speed estimate for planing hulls
    // Planing typically starts around 2.5-3 × √LWL
    const planingSpeed = boatType === "planing" ? 2.8 * Math.sqrt(lwLFeet) : undefined;

    // Boat type description
    let boatTypeDesc = "";
    if (boatType === "displacement") {
      boatTypeDesc = "Displacement hull - limited by hull speed";
    } else if (boatType === "semi-displacement") {
      boatTypeDesc = "Semi-displacement - can exceed hull speed slightly";
    } else {
      boatTypeDesc = "Planing hull - can exceed hull speed significantly";
    }

    // Recommendations
    const recommendations: string[] = [];

    if (boatType === "displacement") {
      recommendations.push(`⚓ Maximum efficient speed: ${hullSpeedKnots.toFixed(1)} knots`);
      recommendations.push("📈 Exceeding hull speed requires exponentially more power");
      recommendations.push("🌊 Wave-making resistance increases dramatically past hull speed");
    } else if (boatType === "semi-displacement") {
      recommendations.push(`⚡ Can operate up to ${(hullSpeedKnots * 1.2).toFixed(1)} knots efficiently`);
      recommendations.push("💨 Semi-planing mode possible with sufficient power");
    } else {
      recommendations.push(`🚀 Planing threshold: ~${planingSpeed?.toFixed(1)} knots`);
      recommendations.push("⚡ Once on plane, resistance decreases significantly");
      recommendations.push("💰 Higher fuel consumption to achieve and maintain plane");
    }

    recommendations.push(`📏 LWL: ${lwLFeet.toFixed(1)} ft (${(lwLFeet * 0.3048).toFixed(1)} m)`);
    recommendations.push("⚠️ Hull speed is theoretical - actual speed varies with conditions");

    setResult({
      waterlineLength: lwLFeet,
      hullSpeedKnots: parseFloat(hullSpeedKnots.toFixed(1)),
      hullSpeedMph: parseFloat(hullSpeedMph.toFixed(1)),
      hullSpeedKmh: parseFloat(hullSpeedKmh.toFixed(1)),
      boatType: boatTypeDesc,
      displacementMode: boatType === "displacement",
      planingSpeed: planingSpeed ? parseFloat(planingSpeed.toFixed(1)) : undefined,
      recommendations,
    });
  };

  const reset = () => {
    setWaterlineLength("");
    setResult(null);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl font-semibold tracking-tight mb-2">
            Boat Speed Calculator – Calculate Maximum Hull Speed for Any Boat
          </h1>
          <p className="text-muted-foreground">
            Find your boat&apos;s theoretical maximum hull speed with our Boat Speed Calculator.
            Enter waterline length to calculate hull speed in knots, mph, and km/h —
            essential knowledge for sailors and powerboat operators planning passages.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardContent className="p-6 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="lwl">Waterline Length (LWL)</Label>
                <Input
                  id="lwl"
                  type="number"
                  step="0.1"
                  value={waterlineLength}
                  onChange={(e) => setWaterlineLength(e.target.value)}
                  placeholder="e.g., 30"
                />
                <p className="text-xs text-muted-foreground">
                  Length at waterline, not overall length (LOA)
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="length-unit">Unit</Label>
                <Select value={lengthUnit} onValueChange={setLengthUnit}>
                  <SelectTrigger id="length-unit">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="feet">Feet</SelectItem>
                    <SelectItem value="meters">Meters</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="boat-type">Hull Type</Label>
                <Select value={boatType} onValueChange={setBoatType}>
                  <SelectTrigger id="boat-type">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="displacement">Displacement (Sailboats, Trawlers)</SelectItem>
                    <SelectItem value="semi-displacement">Semi-Displacement</SelectItem>
                    <SelectItem value="planing">Planing (Powerboats)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="p-3 bg-muted/50 rounded-lg">
                <p className="text-xs text-muted-foreground font-medium mb-2">
                  Typical LWL Examples:
                </p>
                <ul className="text-xs text-muted-foreground space-y-1">
                  <li>• Small sailboat (25&apos;): ~22&apos; LWL</li>
                  <li>• Cruiser (35&apos;): ~28&apos; LWL</li>
                  <li>• Large yacht (50&apos;): ~40&apos; LWL</li>
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
              <h3 className="text-lg font-semibold mb-4">Hull Speed Results</h3>
              {result ? (
                <div className="space-y-4">
                  <div className="p-4 bg-primary/10 rounded-lg text-center">
                    <p className="text-sm text-muted-foreground">Hull Speed</p>
                    <p className="text-4xl font-bold text-primary">{result.hullSpeedKnots} knots</p>
                    <p className="text-sm text-muted-foreground mt-1">
                      {result.hullSpeedMph} mph / {result.hullSpeedKmh} km/h
                    </p>
                  </div>

                  <div className="p-4 bg-muted rounded-lg space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Waterline Length:</span>
                      <span className="font-semibold">{result.waterlineLength} ft</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Hull Type:</span>
                      <span className="font-semibold">{result.boatType}</span>
                    </div>
                    {result.planingSpeed && (
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Planing Speed:</span>
                        <span className="font-semibold">{result.planingSpeed} knots</span>
                      </div>
                    )}
                  </div>

                  {result.displacementMode && (
                    <div className="p-3 bg-amber-50 dark:bg-amber-950/20 rounded-lg">
                      <p className="text-sm text-amber-800 dark:text-amber-200">
                        <strong>Note:</strong> Displacement hulls cannot efficiently exceed
                        hull speed without planing. Power required increases cubically
                        beyond this point.
                      </p>
                    </div>
                  )}

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
                  <p>Enter waterline length and click Calculate to see hull speed</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="mt-8 space-y-6">
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">
                Understanding Hull Speed
              </h3>
              <div className="space-y-3 text-sm text-muted-foreground">
                <p>
                  Hull speed is the theoretical maximum efficient speed for displacement hulls:
                </p>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>
                    <strong>Formula:</strong> Hull Speed (knots) = 1.34 × √LWL (feet)
                  </li>
                  <li>
                    <strong>Physics:</strong> Boat creates bow and stern waves; at hull
                    speed, wavelength equals waterline length
                  </li>
                  <li>
                    <strong>Beyond hull speed:</strong> Boat must climb its own bow wave,
                    requiring exponentially more power
                  </li>
                  <li>
                    <strong>Planing hulls:</strong> Can exceed hull speed by rising onto
                    water surface
                  </li>
                </ul>
                <p>
                  <strong>Note:</strong> Some modern designs with fine entries can exceed
                  traditional hull speed. The 1.34 factor varies with hull shape (1.2-1.5).
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
