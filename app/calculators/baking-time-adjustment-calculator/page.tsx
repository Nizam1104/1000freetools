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

interface BakingResult {
  originalPan: { diameter: number; area: number };
  newPan: { diameter: number; area: number };
  areaRatio: number;
  adjustedTime: string;
  adjustedTemp: number;
  batterDepth: string;
  recommendations: string[];
}

export default function BakingTimeAdjustmentCalculatorPage() {
  const [originalDiameter, setOriginalDiameter] = useState<string>("9");
  const [newDiameter, setNewDiameter] = useState<string>("");
  const [originalTime, setOriginalTime] = useState<string>("30");
  const [originalTemp, setOriginalTemp] = useState<string>("350");
  const [panShape, setPanShape] = useState<string>("round");
  const [result, setResult] = useState<BakingResult | null>(null);

  const calculate = () => {
    const origDia = parseFloat(originalDiameter) || 9;
    const newDia = parseFloat(newDiameter) || 0;
    const origTime = parseFloat(originalTime) || 30;
    const origTemp = parseFloat(originalTemp) || 350;

    if (newDia === 0) return;

    // Calculate pan areas
    const origArea = panShape === "round" 
      ? Math.PI * Math.pow(origDia / 2, 2)
      : origDia * origDia;
    
    const newArea = panShape === "round"
      ? Math.PI * Math.pow(newDia / 2, 2)
      : newDia * newDia;

    // Area ratio
    const areaRatio = newArea / origArea;

    // Adjusted time (larger pan = less time, smaller pan = more time)
    // Time is inversely proportional to area for same batter amount
    const timeFactor = origArea / newArea;
    const adjustedTimeMin = origTime * timeFactor;

    // Format time
    const hours = Math.floor(adjustedTimeMin / 60);
    const minutes = Math.round(adjustedTimeMin % 60);
    const adjustedTime = hours > 0 
      ? `${hours}h ${minutes}m`
      : `${minutes} minutes`;

    // Temperature adjustment (slightly lower for larger pans)
    let adjustedTemp = origTemp;
    if (areaRatio > 1.5) {
      adjustedTemp = origTemp - 25;
    } else if (areaRatio > 1.2) {
      adjustedTemp = origTemp - 15;
    } else if (areaRatio < 0.8) {
      adjustedTemp = origTemp + 15;
    }

    // Batter depth change
    let batterDepth = "";
    if (areaRatio > 1.3) {
      batterDepth = "Shallower - will bake faster";
    } else if (areaRatio < 0.7) {
      batterDepth = "Deeper - will take longer to bake through";
    } else {
      batterDepth = "Similar depth to original";
    }

    // Recommendations
    const recommendations: string[] = [];
    recommendations.push(`📊 Area ratio: ${areaRatio.toFixed(2)}x original`);
    recommendations.push(`⏱️ Check for doneness ${Math.round(adjustedTimeMin * 0.8)} minutes in`);
    
    if (areaRatio > 1.5) {
      recommendations.push("⚠️ Larger pan - reduce temperature to prevent over-browning");
      recommendations.push("👀 Watch edges carefully, may brown faster");
    } else if (areaRatio < 0.7) {
      recommendations.push("⚠️ Smaller/deeper pan - may need to cover with foil");
      recommendations.push("🌡️ Lower temperature helps center cook through");
    }

    recommendations.push("🧪 Use toothpick test for doneness");
    recommendations.push("🔄 Rotate pan halfway through baking");

    setResult({
      originalPan: { diameter: origDia, area: parseFloat(origArea.toFixed(1)) },
      newPan: { diameter: newDia, area: parseFloat(newArea.toFixed(1)) },
      areaRatio: parseFloat(areaRatio.toFixed(2)),
      adjustedTime,
      adjustedTemp,
      batterDepth,
      recommendations,
    });
  };

  const reset = () => {
    setNewDiameter("");
    setResult(null);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl font-semibold tracking-tight mb-2">
            Baking Time Adjustment Calculator – Adjust Oven Time When Changing Pan Sizes
          </h1>
          <p className="text-muted-foreground">
            Get perfect bakes every time with our Baking Time Adjustment Calculator.
            When you change pan size, get adjusted baking time and temperature to ensure
            even cooking and consistent results.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardContent className="p-6 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="pan-shape">Pan Shape</Label>
                <Select value={panShape} onValueChange={setPanShape}>
                  <SelectTrigger id="pan-shape">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="round">Round</SelectItem>
                    <SelectItem value="square">Square</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div className="space-y-1">
                  <Label htmlFor="original-diameter">Original Pan ({panShape === "round" ? "diameter" : "side"})</Label>
                  <Input
                    id="original-diameter"
                    type="number"
                    value={originalDiameter}
                    onChange={(e) => setOriginalDiameter(e.target.value)}
                    placeholder="9"
                  />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="new-diameter">New Pan ({panShape === "round" ? "diameter" : "side"})</Label>
                  <Input
                    id="new-diameter"
                    type="number"
                    value={newDiameter}
                    onChange={(e) => setNewDiameter(e.target.value)}
                    placeholder="8"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div className="space-y-1">
                  <Label htmlFor="original-time">Original Time (min)</Label>
                  <Input
                    id="original-time"
                    type="number"
                    value={originalTime}
                    onChange={(e) => setOriginalTime(e.target.value)}
                    placeholder="30"
                  />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="original-temp">Original Temp (°F)</Label>
                  <Input
                    id="original-temp"
                    type="number"
                    value={originalTemp}
                    onChange={(e) => setOriginalTemp(e.target.value)}
                    placeholder="350"
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
              <h3 className="text-lg font-semibold mb-4">Baking Adjustments</h3>
              {result ? (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-4 bg-primary/10 rounded-lg text-center">
                      <p className="text-sm text-muted-foreground">Adjusted Time</p>
                      <p className="text-2xl font-bold text-primary">{result.adjustedTime}</p>
                    </div>
                    <div className="p-4 bg-primary/10 rounded-lg text-center">
                      <p className="text-sm text-muted-foreground">Adjusted Temp</p>
                      <p className="text-2xl font-bold text-primary">{result.adjustedTemp}°F</p>
                    </div>
                  </div>

                  <div className="p-4 bg-muted rounded-lg space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Original Pan:</span>
                      <span className="font-semibold">{result.originalPan.diameter}&quot; ({result.originalPan.area} sq in)</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">New Pan:</span>
                      <span className="font-semibold">{result.newPan.diameter}&quot; ({result.newPan.area} sq in)</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Area Ratio:</span>
                      <span className="font-semibold">{result.areaRatio}x</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Batter Depth:</span>
                      <span className="font-semibold">{result.batterDepth}</span>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2 text-sm">Baking Tips</h4>
                    <ul className="space-y-1">
                      {result.recommendations.map((rec, i) => (
                        <li key={i} className="text-sm">{rec}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <p>Enter pan details and click Calculate to see adjustments</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="mt-8 space-y-6">
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">
                Baking Pan Conversion Tips
              </h3>
              <div className="space-y-3 text-sm text-muted-foreground">
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>
                    <strong>Larger pan:</strong> Batter is shallower, bakes faster
                  </li>
                  <li>
                    <strong>Smaller pan:</strong> Batter is deeper, needs more time
                  </li>
                  <li>
                    <strong>Dark pans:</strong> Reduce temperature by 25°F
                  </li>
                  <li>
                    <strong>Glass pans:</strong> Reduce temperature by 25°F
                  </li>
                </ul>
                <p>
                  <strong>Tip:</strong> Always check for doneness 5-10 minutes before
                  the calculated time. Use a toothpick or cake tester - it should come
                  out clean or with a few moist crumbs.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
