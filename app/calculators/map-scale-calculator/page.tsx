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

interface MapScaleResult {
  mapDistance: number;
  scaleRatio: number;
  realDistance: number;
  realDistanceFormatted: string;
  scaleType: string;
  comparisons: Array<{ name: string; distance: string }>;
  recommendations: string[];
}

export default function MapScaleCalculatorPage() {
  const [mapDistance, setMapDistance] = useState<string>("");
  const [scaleNumerator, setScaleNumerator] = useState<string>("1");
  const [scaleDenominator, setScaleDenominator] = useState<string>("");
  const [mapUnit, setMapUnit] = useState<string>("cm");
  const [result, setResult] = useState<MapScaleResult | null>(null);

  const calculate = () => {
    const mapDistNum = parseFloat(mapDistance) || 0;
    const scaleNum = parseFloat(scaleNumerator) || 1;
    const scaleDenom = parseFloat(scaleDenominator) || 0;

    if (mapDistNum === 0 || scaleDenom === 0) return;

    // Scale ratio
    const scaleRatio = scaleDenom / scaleNum;

    // Calculate real distance
    let realDistanceMm = 0;

    // Convert map distance to mm first
    let mapDistMm = mapDistNum;
    if (mapUnit === "cm") {
      mapDistMm = mapDistNum * 10;
    } else if (mapUnit === "meters") {
      mapDistMm = mapDistNum * 1000;
    } else if (mapUnit === "inches") {
      mapDistMm = mapDistNum * 25.4;
    }

    // Real distance in mm
    realDistanceMm = mapDistMm * scaleRatio;

    // Convert to appropriate unit
    let realDistance = 0;
    let realDistanceFormatted = "";
    let scaleType = "";

    if (realDistanceMm < 1000) {
      realDistance = realDistanceMm;
      realDistanceFormatted = `${realDistance.toFixed(0)} mm`;
      scaleType = "Large scale (detailed)";
    } else if (realDistanceMm < 1000000) {
      realDistance = realDistanceMm / 1000;
      realDistanceFormatted = `${realDistance.toFixed(2)} m`;
      scaleType = "Medium scale";
    } else if (realDistanceMm < 1000000000) {
      realDistance = realDistanceMm / 1000000;
      realDistanceFormatted = `${realDistance.toFixed(2)} km`;
      scaleType = "Small scale (overview)";
    } else {
      realDistance = realDistanceMm / 1000000;
      realDistanceFormatted = `${realDistance.toFixed(1)} km`;
      scaleType = "Very small scale";
    }

    // Comparisons
    const comparisons = [
      { name: "Football field", distance: "100m" },
      { name: "Marathon", distance: "42.2 km" },
      { name: "Earth circumference", distance: "40,075 km" },
    ];

    // Recommendations
    const recommendations: string[] = [];
    recommendations.push(`📏 Map distance: ${mapDistNum} ${mapUnit}`);
    recommendations.push(`🗺️ Scale: 1:${scaleRatio.toLocaleString()}`);
    recommendations.push(`📍 Real distance: ${realDistanceFormatted}`);

    if (scaleRatio < 10000) {
      recommendations.push("🔍 Large scale map - good for detailed navigation");
    } else if (scaleRatio < 100000) {
      recommendations.push("🗺️ Medium scale - good for regional planning");
    } else {
      recommendations.push("🌍 Small scale - good for overview/orientation");
    }

    recommendations.push("📐 Always check map scale before measuring distances");
    recommendations.push("⚠️ Digital maps may have different scales when zoomed");

    setResult({
      mapDistance: mapDistNum,
      scaleRatio,
      realDistance,
      realDistanceFormatted,
      scaleType,
      comparisons,
      recommendations,
    });
  };

  const reset = () => {
    setMapDistance("");
    setScaleDenominator("");
    setResult(null);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl font-semibold tracking-tight mb-2">
            Map Scale Calculator – Convert Map Distances to Real-World Measurements
          </h1>
          <p className="text-muted-foreground">
            Navigate any map accurately with our Map Scale Calculator. Enter a map
            measurement and scale ratio to instantly calculate the actual real-world
            distance — useful for hiking, urban planning, and geography education.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardContent className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-2">
                <div className="space-y-1">
                  <Label htmlFor="map-dist">Map Distance</Label>
                  <Input
                    id="map-dist"
                    type="number"
                    value={mapDistance}
                    onChange={(e) => setMapDistance(e.target.value)}
                    placeholder="5"
                  />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="map-unit">Unit</Label>
                  <Select value={mapUnit} onValueChange={setMapUnit}>
                    <SelectTrigger id="map-unit">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="cm">cm</SelectItem>
                      <SelectItem value="mm">mm</SelectItem>
                      <SelectItem value="meters">meters</SelectItem>
                      <SelectItem value="inches">inches</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="scale">Map Scale (1:X)</Label>
                <div className="flex items-center gap-2">
                  <span className="text-lg">1:</span>
                  <Input
                    id="scale"
                    type="number"
                    value={scaleDenominator}
                    onChange={(e) => setScaleDenominator(e.target.value)}
                    placeholder="e.g., 50000"
                    className="flex-1"
                  />
                </div>
                <p className="text-xs text-muted-foreground">
                  Common scales: 1:25,000 (hiking), 1:100,000 (road), 1:1,000,000 (country)
                </p>
              </div>

              <div className="p-3 bg-muted/50 rounded-lg">
                <p className="text-xs text-muted-foreground font-medium mb-2">
                  Scale Guide:
                </p>
                <ul className="text-xs text-muted-foreground space-y-1">
                  <li>• 1:10,000 - City map</li>
                  <li>• 1:50,000 - Hiking map</li>
                  <li>• 1:250,000 - Regional map</li>
                  <li>• 1:1,000,000 - Country map</li>
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
              <h3 className="text-lg font-semibold mb-4">Real-World Distance</h3>
              {result ? (
                <div className="space-y-4">
                  <div className="p-4 bg-primary/10 rounded-lg text-center">
                    <p className="text-sm text-muted-foreground">Real Distance</p>
                    <p className="text-4xl font-bold text-primary">{result.realDistanceFormatted}</p>
                    <p className="text-sm text-muted-foreground mt-1">{result.scaleType}</p>
                  </div>

                  <div className="p-4 bg-muted rounded-lg space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Map Scale:</span>
                      <span className="font-semibold">1:{result.scaleRatio.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Map Distance:</span>
                      <span className="font-semibold">{result.mapDistance} {mapUnit}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Multiplier:</span>
                      <span className="font-semibold">×{result.scaleRatio.toLocaleString()}</span>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2 text-sm">Distance Comparisons</h4>
                    <div className="space-y-1">
                      {result.comparisons.map((comp, i) => (
                        <div key={i} className="flex justify-between p-2 bg-muted/50 rounded text-sm">
                          <span>{comp.name}</span>
                          <span className="font-mono">{comp.distance}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2 text-sm">Tips</h4>
                    <ul className="space-y-1">
                      {result.recommendations.map((rec, i) => (
                        <li key={i} className="text-sm">{rec}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <p>Enter map distance and scale to calculate real distance</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="mt-8 space-y-6">
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">
                Understanding Map Scales
              </h3>
              <div className="space-y-3 text-sm text-muted-foreground">
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>
                    <strong>Large scale (1:10,000):</strong> More detail, smaller area
                  </li>
                  <li>
                    <strong>Small scale (1:1,000,000):</strong> Less detail, larger area
                  </li>
                  <li>
                    <strong>Formula:</strong> Real Distance = Map Distance × Scale Ratio
                  </li>
                  <li>
                    <strong>Bar scale:</strong> Visual scale bar on maps for quick measurement
                  </li>
                </ul>
                <p>
                  <strong>Tip:</strong> When using digital maps, the scale changes as you
                  zoom. Always check the current scale before measuring. For accurate
                  measurements, use the map&apos;s built-in measurement tool when available.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* How It Works Section */}
          <div className="mt-8 mb-8">
            <h2 className="text-2xl font-semibold mb-6">How to Use the Map Scale Calculator</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="flex flex-col items-center text-center p-6 bg-card rounded-lg border">
                <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xl font-bold mb-4">1</div>
                <h3 className="font-semibold mb-2">Enter Map Distance</h3>
                <p className="text-sm text-muted-foreground">Input the measured distance on your map and select the unit (cm, mm, meters, or inches).</p>
              </div>
              <div className="flex flex-col items-center text-center p-6 bg-card rounded-lg border">
                <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xl font-bold mb-4">2</div>
                <h3 className="font-semibold mb-2">Input Scale Ratio</h3>
                <p className="text-sm text-muted-foreground">Enter the map scale denominator (e.g., 50000 for a 1:50,000 scale map).</p>
              </div>
              <div className="flex flex-col items-center text-center p-6 bg-card rounded-lg border">
                <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xl font-bold mb-4">3</div>
                <h3 className="font-semibold mb-2">Get Real Distance</h3>
                <p className="text-sm text-muted-foreground">Instantly see the actual real-world distance with helpful comparisons and scale type info.</p>
              </div>
            </div>
          </div>

          {/* Features Section */}
          <div className="mt-8 mb-8">
            <h2 className="text-2xl font-semibold mb-6">Key Features of Map Scale Calculator</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="p-5 bg-card rounded-lg border">
                <h3 className="font-semibold mb-2 flex items-center gap-2">
                  <span className="text-primary">✓</span>
                  Multiple Unit Support
                </h3>
                <p className="text-sm text-muted-foreground">Work with centimeters, millimeters, meters, or inches for flexible map measurements.</p>
              </div>
              <div className="p-5 bg-card rounded-lg border">
                <h3 className="font-semibold mb-2 flex items-center gap-2">
                  <span className="text-primary">✓</span>
                  Scale Type Classification
                </h3>
                <p className="text-sm text-muted-foreground">Automatically identifies if your map is large, medium, or small scale for better context.</p>
              </div>
              <div className="p-5 bg-card rounded-lg border">
                <h3 className="font-semibold mb-2 flex items-center gap-2">
                  <span className="text-primary">✓</span>
                  Distance Comparisons
                </h3>
                <p className="text-sm text-muted-foreground">See your calculated distance compared to familiar references like football fields and marathons.</p>
              </div>
              <div className="p-5 bg-card rounded-lg border">
                <h3 className="font-semibold mb-2 flex items-center gap-2">
                  <span className="text-primary">✓</span>
                  Practical Recommendations
                </h3>
                <p className="text-sm text-muted-foreground">Get tailored tips based on your map scale for navigation, planning, or orientation use.</p>
              </div>
            </div>

            <div className="mt-6 p-6 bg-muted rounded-lg">
              <h3 className="font-semibold mb-3">Map Scale Reference Guide</h3>
              <div className="grid md:grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="font-semibold mb-2">Common Map Scales:</p>
                  <ul className="space-y-1 text-muted-foreground">
                    <li>• 1:10,000 - City street maps, detailed navigation</li>
                    <li>• 1:25,000 - Hiking and outdoor recreation</li>
                    <li>• 1:50,000 - Regional road maps</li>
                    <li>• 1:100,000 - County or district maps</li>
                    <li>• 1:250,000 - State or provincial maps</li>
                    <li>• 1:1,000,000 - Country or continental overview</li>
                  </ul>
                </div>
                <div>
                  <p className="font-semibold mb-2">Example Calculation:</p>
                  <ul className="space-y-1 text-muted-foreground">
                    <li>• Map distance: 5 cm</li>
                    <li>• Map scale: 1:50,000</li>
                    <li>• Calculation: 5 cm × 50,000 = 250,000 cm</li>
                    <li>• Convert: 250,000 cm = 2.5 km</li>
                    <li>• Result: Real distance is 2.5 kilometers</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="mt-8 mb-8">
            <h2 className="text-2xl font-semibold mb-6">Frequently Asked Questions About Map Scales</h2>
            <div className="space-y-4">
              <div className="p-5 bg-card rounded-lg border">
                <h3 className="font-semibold mb-2">What does a 1:50,000 map scale mean?</h3>
                <p className="text-sm text-muted-foreground">A 1:50,000 scale means 1 unit on the map equals 50,000 of the same units in reality. So 1 cm on the map represents 50,000 cm (500 meters) on the ground. This is a common scale for hiking and topographic maps.</p>
              </div>
              <div className="p-5 bg-card rounded-lg border">
                <h3 className="font-semibold mb-2">What is the difference between large and small scale maps?</h3>
                <p className="text-sm text-muted-foreground">Large scale maps (like 1:10,000) show more detail but cover smaller areas. Small scale maps (like 1:1,000,000) show less detail but cover larger areas. Counterintuitively, the smaller the denominator, the larger the scale.</p>
              </div>
              <div className="p-5 bg-card rounded-lg border">
                <h3 className="font-semibold mb-2">How do I measure distance on a digital map like Google Maps?</h3>
                <p className="text-sm text-muted-foreground">Digital maps don't have a fixed scale since zoom changes it. Use the built-in measure distance tool instead. Right-click on Google Maps and select "Measure distance" to click points and get automatic real-world distances.</p>
              </div>
              <div className="p-5 bg-card rounded-lg border">
                <h3 className="font-semibold mb-2">What map scale is best for hiking?</h3>
                <p className="text-sm text-muted-foreground">For hiking, 1:25,000 or 1:50,000 scales work best. The 1:25,000 scale shows more trail detail, elevation contours, and landmarks. The 1:50,000 scale covers more ground per map sheet, useful for longer routes.</p>
              </div>
              <div className="p-5 bg-card rounded-lg border">
                <h3 className="font-semibold mb-2">Can I use this calculator for online maps?</h3>
                <p className="text-sm text-muted-foreground">Online maps like Google Maps don't use fixed scales since zoom level changes the ratio. This calculator works best with printed maps or PDF maps that have a stated scale ratio. For digital maps, use their built-in measurement tools.</p>
              </div>
            </div>
          </div>

          {/* Related Tools Section */}
        </div>
      </div>
    </div>
  );
}
