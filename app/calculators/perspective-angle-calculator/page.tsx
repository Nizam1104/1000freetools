"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
            <CardHeader>
              <CardTitle>How to Calculate Perspective Angles</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-start gap-4 mb-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm">1</div>
                <div>
                  <p className="font-semibold mb-1">Enter viewer height</p>
                  <p className="text-sm text-muted-foreground">Input the eye level height from the ground. Average adult height is about 1.7m (5ft 7in).</p>
                </div>
              </div>
              <div className="flex items-start gap-4 mb-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm">2</div>
                <div>
                  <p className="font-semibold mb-1">Add distance to subject (optional)</p>
                  <p className="text-sm text-muted-foreground">Enter how far you are from what you're drawing to calculate the perspective angle.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm">3</div>
                <div>
                  <p className="font-semibold mb-1">Get perspective data</p>
                  <p className="text-sm text-muted-foreground">Receive vanishing point Y position, horizon distance, and drawing recommendations instantly.</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Features for Artists and Architects</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <p className="font-semibold mb-1">Accurate vanishing point calculation</p>
                  <p className="text-sm text-muted-foreground">Find the exact Y position for your horizon line based on viewer height.</p>
                </div>
                <div>
                  <p className="font-semibold mb-1">Horizon distance estimation</p>
                  <p className="text-sm text-muted-foreground">Know how far you can see based on Earth curvature and your eye level.</p>
                </div>
                <div>
                  <p className="font-semibold mb-1">Perspective angle computation</p>
                  <p className="text-sm text-muted-foreground">Calculate the angle of view for accurate depth representation in drawings.</p>
                </div>
                <div>
                  <p className="font-semibold mb-1">Multiple unit support</p>
                  <p className="text-sm text-muted-foreground">Work in meters or feet depending on your preference and project needs.</p>
                </div>
                <div>
                  <p className="font-semibold mb-1">Practical drawing tips</p>
                  <p className="text-sm text-muted-foreground">Get contextual recommendations for one, two, and three-point perspective.</p>
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
                  <p className="font-semibold mb-1">Where is the vanishing point located?</p>
                  <p className="text-sm text-muted-foreground">The vanishing point is always at eye level (horizon line). Its Y position equals the viewer's height from the ground plane.</p>
                </div>
                <div>
                  <p className="font-semibold mb-1">How do I calculate perspective angle?</p>
                  <p className="text-sm text-muted-foreground">Use the formula: angle = arctan(height / distance). For a 1.7m viewer at 10m distance, the angle is about 9.6 degrees.</p>
                </div>
                <div>
                  <p className="font-semibold mb-1">What is the horizon line in perspective drawing?</p>
                  <p className="text-sm text-muted-foreground">The horizon line represents the viewer's eye level. It divides the scene into sky above and ground below, and all vanishing points lie on it.</p>
                </div>
                <div>
                  <p className="font-semibold mb-1">How far can I see based on my height?</p>
                  <p className="text-sm text-muted-foreground">Horizon distance = sqrt(2 × Earth radius × height). At 1.7m eye level, you can see about 4.7 km to the horizon.</p>
                </div>
                <div>
                  <p className="font-semibold mb-1">What's the difference between 1-point and 2-point perspective?</p>
                  <p className="text-sm text-muted-foreground">One-point has a single vanishing point for objects facing you directly. Two-point uses two vanishing points for objects at an angle to the viewer.</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Related Art and Design Tools</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-3">
                Explore our other creative calculators: the <a href="/calculators/golden-ratio-calculator" className="text-primary hover:underline">golden ratio calculator</a> for harmonious compositions, the <a href="/calculators/aspect-ratio-calculator" className="text-primary hover:underline">aspect ratio calculator</a> for canvas sizing, and the <a href="/calculators/focal-length-calculator" className="text-primary hover:underline">focal length calculator</a> for photography planning.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
