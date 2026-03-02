"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function WaistToHeightRatioCalculator() {
  const [waist, setWaist] = useState<string>("");
  const [height, setHeight] = useState<string>("");
  const [unit, setUnit] = useState<"cm" | "inches">("cm");
  const [whtr, setWhtr] = useState<number | null>(null);
  const [risk, setRisk] = useState<string>("");
  const [riskDescription, setRiskDescription] = useState<string>("");

  const calculate = () => {
    const waistValue = parseFloat(waist);
    const heightValue = parseFloat(height);

    if (isNaN(waistValue) || isNaN(heightValue) || waistValue <= 0 || heightValue <= 0) return;

    // Calculate WHtR = waist / height (both in same unit)
    const ratio = waistValue / heightValue;
    const roundedRatio = Math.round(ratio * 100) / 100;
    setWhtr(roundedRatio);

    // Determine risk category
    if (roundedRatio < 0.5) {
      setRisk("Low Risk");
      setRiskDescription("Your waist-to-height ratio indicates a low risk of cardiovascular and metabolic health issues. Keep maintaining a healthy lifestyle!");
    } else if (roundedRatio <= 0.6) {
      setRisk("Moderate Risk");
      setRiskDescription("Your waist-to-height ratio indicates a moderate risk. Consider adopting healthier eating habits and increasing physical activity.");
    } else {
      setRisk("High Risk");
      setRiskDescription("Your waist-to-height ratio indicates a high risk of cardiovascular disease and metabolic disorders. Consult with a healthcare provider for personalized advice.");
    }
  };

  const reset = () => {
    setWaist("");
    setHeight("");
    setWhtr(null);
    setRisk("");
    setRiskDescription("");
  };

  const getRiskColor = () => {
    if (!risk) return "";
    if (risk === "Low Risk") return "text-green-600 dark:text-green-400";
    if (risk === "Moderate Risk") return "text-yellow-600 dark:text-yellow-400";
    return "text-red-600 dark:text-red-400";
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Waist-to-Height Ratio Calculator – Assess Your Health Risk</CardTitle>
          <CardDescription>
            The waist-to-height ratio is a powerful predictor of health risks. Use our calculator to see where you stand and get insights on cardiovascular and metabolic health.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <Label>Measurement Unit</Label>
              <Select value={unit} onValueChange={(v) => setUnit(v as "cm" | "inches")}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="cm">Centimeters (cm)</SelectItem>
                  <SelectItem value="inches">Inches</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="waist">Waist Circumference ({unit})</Label>
              <Input
                id="waist"
                type="number"
                step="0.1"
                placeholder={unit === "cm" ? "e.g., 80" : "e.g., 32"}
                value={waist}
                onChange={(e) => setWaist(e.target.value)}
              />
              <p className="text-xs text-muted-foreground mt-1">Measure at the narrowest point, usually just above the navel</p>
            </div>

            <div>
              <Label htmlFor="height">Height ({unit})</Label>
              <Input
                id="height"
                type="number"
                step="0.1"
                placeholder={unit === "cm" ? "e.g., 170" : "e.g., 67"}
                value={height}
                onChange={(e) => setHeight(e.target.value)}
              />
            </div>

            <div className="flex gap-2">
              <Button onClick={calculate}>Calculate WHtR</Button>
              <Button variant="outline" onClick={reset}>Reset</Button>
            </div>

            {whtr !== null && (
              <div className="space-y-3">
                <div className="p-4 bg-muted rounded-md">
                  <p className="text-sm text-muted-foreground">Your Waist-to-Height Ratio</p>
                  <p className="text-4xl font-bold mt-1">{whtr}</p>
                  <p className={`text-lg font-medium mt-2 ${getRiskColor()}`}>{risk}</p>
                </div>
                <div className="p-4 border rounded-md">
                  <p className="text-sm text-muted-foreground mb-2">Health Insight</p>
                  <p className="text-sm">{riskDescription}</p>
                </div>
                <div className="p-4 border rounded-md">
                  <p className="text-sm font-medium mb-2">Risk Categories</p>
                  <ul className="text-sm space-y-1">
                    <li><span className="text-green-600 dark:text-green-400 font-medium">Low Risk:</span> WHtR &lt; 0.5</li>
                    <li><span className="text-yellow-600 dark:text-yellow-400 font-medium">Moderate Risk:</span> WHtR 0.5 - 0.6</li>
                    <li><span className="text-red-600 dark:text-red-400 font-medium">High Risk:</span> WHtR &gt; 0.6</li>
                  </ul>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
