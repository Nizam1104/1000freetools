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
        </div>
      </div>
    </div>
  );
}
