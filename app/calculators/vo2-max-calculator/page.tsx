"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function VO2MaxCalculator() {
  const [method, setMethod] = useState<"resting" | "cooper">("resting");
  const [age, setAge] = useState<string>("");
  const [restingHR, setRestingHR] = useState<string>("");
  const [distance, setDistance] = useState<string>("");
  const [vo2Max, setVo2Max] = useState<number | null>(null);
  const [category, setCategory] = useState<string>("");

  const calculate = () => {
    let result: number;

    if (method === "resting") {
      const ageValue = parseFloat(age);
      const restingHRValue = parseFloat(restingHR);

      if (isNaN(ageValue) || isNaN(restingHRValue) || ageValue <= 0 || restingHRValue <= 0) return;

      const maxHR = 220 - ageValue;
      result = 15 * (maxHR / restingHRValue);
    } else {
      const ageValue = parseFloat(age);
      const distanceValue = parseFloat(distance);

      if (isNaN(ageValue) || isNaN(distanceValue) || ageValue <= 0 || distanceValue <= 0) return;

      // Cooper test formula: VO2max = (distance in meters - 504.9) / 44.73
      const distanceInMeters = distanceValue * 1000;
      result = (distanceInMeters - 504.9) / 44.73;
    }

    const roundedResult = Math.round(result * 10) / 10;
    setVo2Max(roundedResult);

    // Categorize based on age and gender norms (simplified)
    const ageValue = parseFloat(age) || 30;
    if (roundedResult < 25) {
      setCategory("Poor");
    } else if (roundedResult < 33) {
      setCategory("Fair");
    } else if (roundedResult < 42) {
      setCategory("Good");
    } else if (roundedResult < 52) {
      setCategory("Excellent");
    } else {
      setCategory("Superior");
    }
  };

  const reset = () => {
    setAge("");
    setRestingHR("");
    setDistance("");
    setVo2Max(null);
    setCategory("");
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>VO2 Max Calculator – Estimate Your Aerobic Fitness Level</CardTitle>
          <CardDescription>
            Measure your cardiovascular fitness with our VO2 max calculator. Estimate your maximal oxygen uptake using simple field test data and compare your results to fitness norms.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <Label>Calculation Method</Label>
              <Select value={method} onValueChange={(v) => setMethod(v as "resting" | "cooper")}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="resting">Resting Heart Rate Method</SelectItem>
                  <SelectItem value="cooper">Cooper Test (12-minute run)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="age">Age (years)</Label>
              <Input
                id="age"
                type="number"
                placeholder="e.g., 30"
                value={age}
                onChange={(e) => setAge(e.target.value)}
              />
            </div>

            {method === "resting" ? (
              <div>
                <Label htmlFor="restingHR">Resting Heart Rate (bpm)</Label>
                <Input
                  id="restingHR"
                  type="number"
                  placeholder="e.g., 60"
                  value={restingHR}
                  onChange={(e) => setRestingHR(e.target.value)}
                />
                <p className="text-xs text-muted-foreground mt-1">Measure your resting HR first thing in the morning</p>
              </div>
            ) : (
              <div>
                <Label htmlFor="distance">Distance Covered (km in 12 minutes)</Label>
                <Input
                  id="distance"
                  type="number"
                  step="0.01"
                  placeholder="e.g., 2.5"
                  value={distance}
                  onChange={(e) => setDistance(e.target.value)}
                />
                <p className="text-xs text-muted-foreground mt-1">How far did you run in 12 minutes?</p>
              </div>
            )}

            <div className="flex gap-2">
              <Button onClick={calculate}>Calculate VO2 Max</Button>
              <Button variant="outline" onClick={reset}>Reset</Button>
            </div>

            {vo2Max !== null && (
              <div className="p-4 bg-muted rounded-md">
                <p className="text-sm text-muted-foreground">Your VO2 Max</p>
                <p className="text-4xl font-bold mt-1">{vo2Max} <span className="text-lg font-normal">ml/kg/min</span></p>
                <p className="text-lg font-medium mt-2">Category: <span className="text-primary">{category}</span></p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
