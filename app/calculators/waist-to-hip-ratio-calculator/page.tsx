"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function WaistToHipRatioCalculator() {
  const [gender, setGender] = useState<"male" | "female">("male");
  const [unit, setUnit] = useState<"cm" | "inches">("cm");
  const [waist, setWaist] = useState<string>("");
  const [hip, setHip] = useState<string>("");
  const [whr, setWhr] = useState<number | null>(null);
  const [risk, setRisk] = useState<string>("");

  const calculate = () => {
    const w = parseFloat(waist);
    const h = parseFloat(hip);

    if (isNaN(w) || isNaN(h) || w <= 0 || h <= 0) return;

    const ratio = w / h;
    setWhr(Math.round(ratio * 100) / 100);

    const lowRisk = gender === "male" ? 0.9 : 0.85;
    const highRisk = gender === "male" ? 1.0 : 0.9;

    if (ratio < lowRisk) {
      setRisk("Low Risk");
    } else if (ratio < highRisk) {
      setRisk("Moderate Risk");
    } else {
      setRisk("High Risk");
    }
  };

  const reset = () => {
    setWaist("");
    setHip("");
    setWhr(null);
    setRisk("");
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Waist-to-Hip Ratio Calculator – Check Your Body Shape & Health Risk</CardTitle>
          <CardDescription>
            Find your waist-to-hip ratio and understand what it means for your health. Our calculator helps identify risk levels for heart disease, diabetes, and other conditions.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <Label>Gender</Label>
              <Select value={gender} onValueChange={(v) => setGender(v as "male" | "female")}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="male">Male</SelectItem>
                  <SelectItem value="female">Female</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>Unit</Label>
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

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="waist">Waist Circumference ({unit})</Label>
                <Input
                  id="waist"
                  type="number"
                  placeholder={unit === "cm" ? "e.g., 80" : "e.g., 32"}
                  value={waist}
                  onChange={(e) => setWaist(e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="hip">Hip Circumference ({unit})</Label>
                <Input
                  id="hip"
                  type="number"
                  placeholder={unit === "cm" ? "e.g., 100" : "e.g., 40"}
                  value={hip}
                  onChange={(e) => setHip(e.target.value)}
                />
              </div>
            </div>

            <div className="flex gap-2">
              <Button onClick={calculate}>Calculate WHR</Button>
              <Button variant="outline" onClick={reset}>Reset</Button>
            </div>

            {whr !== null && (
              <div className="p-4 bg-muted rounded-md">
                <p className="text-sm text-muted-foreground">Your Waist-to-Hip Ratio</p>
                <p className="text-4xl font-bold mt-1">{whr}</p>
                <p className="text-lg font-medium mt-2">Health Risk: {risk}</p>
                <p className="text-sm text-muted-foreground mt-2">
                  {gender === "male" 
                    ? "Low risk: <0.9 | Moderate: 0.9-1.0 | High: >1.0"
                    : "Low risk: <0.85 | Moderate: 0.85-0.9 | High: >0.9"}
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
