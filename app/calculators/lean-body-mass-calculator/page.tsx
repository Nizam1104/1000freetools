"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function LeanBodyMassCalculator() {
  const [weight, setWeight] = useState<string>("");
  const [weightUnit, setWeightUnit] = useState<"kg" | "lbs">("kg");
  const [bodyFatPercentage, setBodyFatPercentage] = useState<string>("");
  const [lbm, setLbm] = useState<number | null>(null);
  const [fatMass, setFatMass] = useState<number | null>(null);

  const calculate = () => {
    const weightValue = parseFloat(weight);
    const bodyFatValue = parseFloat(bodyFatPercentage);

    if (isNaN(weightValue) || isNaN(bodyFatValue) || weightValue <= 0 || bodyFatValue < 0 || bodyFatValue > 100) return;

    // LBM = weight × (1 - bodyFatPercentage/100)
    const lbmValue = weightValue * (1 - bodyFatValue / 100);
    const fatMassValue = weightValue - lbmValue;

    setLbm(Math.round(lbmValue * 10) / 10);
    setFatMass(Math.round(fatMassValue * 10) / 10);
  };

  const reset = () => {
    setWeight("");
    setBodyFatPercentage("");
    setLbm(null);
    setFatMass(null);
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <Card>
        
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-2">
              <div>
                <Label htmlFor="weight">Weight</Label>
                <Input
                  id="weight"
                  type="number"
                  placeholder="70"
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                />
              </div>
              <div>
                <Label>Unit</Label>
                <Select value={weightUnit} onValueChange={(v) => setWeightUnit(v as "kg" | "lbs")}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="kg">kg</SelectItem>
                    <SelectItem value="lbs">lbs</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <Label htmlFor="bodyFat">Body Fat Percentage (%)</Label>
              <Input
                id="bodyFat"
                type="number"
                step="0.1"
                placeholder="e.g., 20"
                value={bodyFatPercentage}
                onChange={(e) => setBodyFatPercentage(e.target.value)}
              />
            </div>

            <div className="flex gap-2">
              <Button onClick={calculate}>Calculate LBM</Button>
              <Button variant="outline" onClick={reset}>Reset</Button>
            </div>

            {(lbm !== null || fatMass !== null) && (
              <div className="space-y-3">
                <div className="p-4 bg-muted rounded-md">
                  <p className="text-sm text-muted-foreground">Lean Body Mass</p>
                  <p className="text-4xl font-bold mt-1">{lbm} <span className="text-lg font-normal">{weightUnit}</span></p>
                </div>
                <div className="p-4 border rounded-md">
                  <p className="text-sm text-muted-foreground">Fat Mass</p>
                  <p className="text-2xl font-bold mt-1">{fatMass} <span className="text-lg font-normal">{weightUnit}</span></p>
                </div>
                {lbm !== null && weight && (
                  <div className="p-4 border rounded-md">
                    <p className="text-sm text-muted-foreground">Body Fat Percentage</p>
                    <p className="text-2xl font-bold mt-1">{parseFloat(bodyFatPercentage)}%</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
