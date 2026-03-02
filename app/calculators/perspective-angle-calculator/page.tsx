"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface PerspectiveResult {
  viewerHeight: number;
  distance: number;
  horizonDistance: number;
  vanishingPointY: number;
  perspectiveAngle: number;
  recommendations: string[];
}

export default function PerspectiveAngleCalculatorPage() {
  const [viewerHeight, setViewerHeight] = useState<string>("1.7");
  const [distance, setDistance] = useState<string>("");
  const [unit, setUnit] = useState<string>("meters");
  const [result, setResult] = useState<PerspectiveResult | null>(null);

  const calculate = () => {
    const heightNum = parseFloat(viewerHeight) || 1.7;
    const distanceNum = parseFloat(distance) || 0;

    // Convert to meters if needed
    let heightM = heightNum;
    let distanceM = distanceNum;

    if (unit === "feet") {
      heightM = heightNum * 0.3048;
      distanceM = distanceNum * 0.3048;
    }

    // Horizon distance (for Earth curvature)
    // d = sqrt(2 × R × h) where R = Earth radius (6371 km)
    const earthRadius = 6371000; // meters
    const horizonDistance = Math.sqrt(2 * earthRadius * heightM);

    // Vanishing point Y position (relative to viewer height)
    // In perspective drawing, vanishing point is at eye level
    const vanishingPointY = heightM;

    // Perspective angle (angle of view to horizon)
    // θ = arctan(height / distance)
    const perspectiveAngle = distanceM > 0 
      ? Math.atan(heightM / distanceM) * (180 / Math.PI)
      : 90;

    // Recommendations
    const recommendations: string[] = [];
    recommendations.push(`👁️ Viewer height: ${heightM.toFixed(2)}m (${(heightM * 3.281).toFixed(1)} ft)`);
    recommendations.push(`📏 Horizon distance: ${(horizonDistance / 1000).toFixed(2)} km`);

    if (distanceM > 0) {
      recommendations.push(`📐 Perspective angle: ${perspectiveAngle.toFixed(1)}°`);
    }

    recommendations.push("🎨 Vanishing point is always at eye level");
    recommendations.push("📏 Objects appear smaller as distance increases");
    recommendations.push("🔄 Parallel lines converge at vanishing point");

    if (distanceM > horizonDistance) {
      recommendations.push("⚠️ Distance exceeds visible horizon - consider atmospheric perspective");
    }

    setResult({
      viewerHeight: heightM,
      distance: distanceM,
      horizonDistance,
      vanishingPointY,
      perspectiveAngle,
      recommendations,
    });
  };

  const reset = () => {
    setDistance("");
    setResult(null);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl font-semibold tracking-tight mb-2">
            Perspective Angle Calculator – Calculate Vanishing Points for Technical Drawing
          </h1>
          <p className="text-muted-foreground">
            Master perspective drawing with our Perspective Angle Calculator. Input viewer
            height and distance to calculate accurate vanishing point locations and
            perspective angles for one-, two-, and three-point perspective — for artists,
            architects, and illustrators.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardContent className="p-6 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="viewer-height">Viewer Height (Eye Level)</Label>
                <Input
                  id="viewer-height"
                  type="number"
                  step="0.1"
                  value={viewerHeight}
                  onChange={(e) => setViewerHeight(e.target.value)}
                  placeholder="1.7"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="distance">Distance to Subject</Label>
                <Input
                  id="distance"
                  type="number"
                  value={distance}
                  onChange={(e) => setDistance(e.target.value)}
                  placeholder="Optional"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="unit">Unit</Label>
                <select
                  id="unit"
                  value={unit}
                  onChange={(e) => setUnit(e.target.value)}
                  className="w-full p-2 border rounded-md bg-background"
                >
                  <option value="meters">Meters</option>
                  <option value="feet">Feet</option>
                </select>
              </div>

              <div className="p-3 bg-muted/50 rounded-lg">
                <p className="text-xs text-muted-foreground font-medium mb-2">
                  Perspective Types:
                </p>
                <ul className="text-xs text-muted-foreground space-y-1">
                  <li>• 1-point: Single vanishing point</li>
                  <li>• 2-point: Two vanishing points</li>
                  <li>• 3-point: Three vanishing points</li>
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
              <h3 className="text-lg font-semibold mb-4">Perspective Data</h3>
              {result ? (
                <div className="space-y-4">
                  <div className="p-4 bg-primary/10 rounded-lg text-center">
                    <p className="text-sm text-muted-foreground">Vanishing Point Y</p>
                    <p className="text-3xl font-bold text-primary">{result.vanishingPointY.toFixed(2)}m</p>
                    <p className="text-sm text-muted-foreground mt-1">
                      (at eye level)
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-3 bg-muted rounded-lg text-center">
                      <p className="text-xs text-muted-foreground">Horizon Distance</p>
                      <p className="text-lg font-bold">{(result.horizonDistance / 1000).toFixed(2)} km</p>
                    </div>
                    {result.distance > 0 && (
                      <div className="p-3 bg-muted rounded-lg text-center">
                        <p className="text-xs text-muted-foreground">Perspective Angle</p>
                        <p className="text-lg font-bold">{result.perspectiveAngle.toFixed(1)}°</p>
                      </div>
                    )}
                  </div>

                  <div className="p-4 bg-muted rounded-lg space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Viewer Height:</span>
                      <span className="font-semibold">{result.viewerHeight.toFixed(2)}m</span>
                    </div>
                    {result.distance > 0 && (
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Subject Distance:</span>
                        <span className="font-semibold">{result.distance.toFixed(2)}m</span>
                      </div>
                    )}
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2 text-sm">Drawing Tips</h4>
                    <ul className="space-y-1">
                      {result.recommendations.map((rec, i) => (
                        <li key={i} className="text-sm">{rec}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <p>Enter viewer height and click Calculate to see perspective data</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="mt-8 space-y-6">
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">
                Perspective Drawing Basics
              </h3>
              <div className="space-y-3 text-sm text-muted-foreground">
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>
                    <strong>Horizon line:</strong> Always at viewer&apos;s eye level
                  </li>
                  <li>
                    <strong>Vanishing point:</strong> Where parallel lines converge
                  </li>
                  <li>
                    <strong>One-point:</strong> Front face parallel to picture plane
                  </li>
                  <li>
                    <strong>Two-point:</strong> Corner facing viewer, two vanishing points
                  </li>
                  <li>
                    <strong>Three-point:</strong> Looking up or down, three vanishing points
                  </li>
                </ul>
                <p>
                  <strong>Tip:</strong> The horizon line divides your drawing into sky
                  (above) and ground (below). All vanishing points lie on the horizon
                  line in one and two-point perspective.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
