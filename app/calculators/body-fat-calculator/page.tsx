"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";

export default function BodyFatCalculator() {
  const [gender, setGender] = useState<"male" | "female">("male");
  const [unit, setUnit] = useState<"metric" | "imperial">("metric");
  const [neck, setNeck] = useState<string>("");
  const [waist, setWaist] = useState<string>("");
  const [hip, setHip] = useState<string>("");
  const [height, setHeight] = useState<string>("");
  const [bodyFat, setBodyFat] = useState<number | null>(null);
  const [category, setCategory] = useState<string>("");

  const calculate = () => {
    const n = parseFloat(neck);
    const w = parseFloat(waist);
    const h = parseFloat(hip);
    const ht = parseFloat(height);

    if (isNaN(n) || isNaN(w) || isNaN(ht) || n <= 0 || w <= 0 || ht <= 0) return;
    if (gender === "female" && (isNaN(h) || h <= 0)) return;

    let bodyFatValue: number;

    if (unit === "metric") {
      // Convert cm to inches for US Navy formula
      const neckInches = n / 2.54;
      const waistInches = w / 2.54;
      const hipInches = h / 2.54;
      const heightInches = ht / 2.54;

      if (gender === "male") {
        // US Navy formula for men: 86.010×log10(abdomen-neck) - 70.041×log10(height) + 36.76
        bodyFatValue = 86.010 * Math.log10(waistInches - neckInches) - 70.041 * Math.log10(heightInches) + 36.76;
      } else {
        // US Navy formula for women: 163.205×log10(waist+hip-neck) - 97.684×log10(height) - 78.387
        bodyFatValue = 163.205 * Math.log10(waistInches + hipInches - neckInches) - 97.684 * Math.log10(heightInches) - 78.387;
      }
    } else {
      // Already in inches
      if (gender === "male") {
        bodyFatValue = 86.010 * Math.log10(w - n) - 70.041 * Math.log10(ht) + 36.76;
      } else {
        bodyFatValue = 163.205 * Math.log10(w + h - n) - 97.684 * Math.log10(ht) - 78.387;
      }
    }

    bodyFatValue = Math.round(bodyFatValue * 10) / 10;
    setBodyFat(bodyFatValue);

    // Determine category based on gender and body fat percentage
    let cat: string;
    if (gender === "male") {
      if (bodyFatValue < 2) cat = "Essential Fat";
      else if (bodyFatValue < 6) cat = "Athletes";
      else if (bodyFatValue < 14) cat = "Fitness";
      else if (bodyFatValue < 18) cat = "Average";
      else cat = "Obese";
    } else {
      if (bodyFatValue < 10) cat = "Essential Fat";
      else if (bodyFatValue < 14) cat = "Athletes";
      else if (bodyFatValue < 21) cat = "Fitness";
      else if (bodyFatValue < 25) cat = "Average";
      else cat = "Obese";
    }
    setCategory(cat);
  };

  const reset = () => {
    setNeck("");
    setWaist("");
    setHip("");
    setHeight("");
    setBodyFat(null);
    setCategory("");
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Body Fat Percentage Calculator – Estimate Your Body Fat Instantly</CardTitle>
          <CardDescription>
            Calculate your body fat percentage accurately using our free online tool. Input your measurements to get an estimate of your fat mass, lean mass, and fitness category.
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
              <Label>Unit System</Label>
              <Select value={unit} onValueChange={(v) => setUnit(v as "metric" | "imperial")}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="metric">Metric (cm)</SelectItem>
                  <SelectItem value="imperial">Imperial (inches)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="height">Height ({unit === "metric" ? "cm" : "inches"})</Label>
              <Input
                id="height"
                type="number"
                placeholder={unit === "metric" ? "e.g., 175" : "e.g., 69"}
                value={height}
                onChange={(e) => setHeight(e.target.value)}
              />
            </div>

            <div>
              <Label htmlFor="neck">Neck Circumference ({unit === "metric" ? "cm" : "inches"})</Label>
              <Input
                id="neck"
                type="number"
                placeholder={unit === "metric" ? "e.g., 38" : "e.g., 15"}
                value={neck}
                onChange={(e) => setNeck(e.target.value)}
              />
            </div>

            <div>
              <Label htmlFor="waist">Waist Circumference ({unit === "metric" ? "cm" : "inches"})</Label>
              <Input
                id="waist"
                type="number"
                placeholder={unit === "metric" ? "e.g., 82" : "e.g., 32"}
                value={waist}
                onChange={(e) => setWaist(e.target.value)}
              />
            </div>

            {gender === "female" && (
              <div>
                <Label htmlFor="hip">Hip Circumference ({unit === "metric" ? "cm" : "inches"})</Label>
                <Input
                  id="hip"
                  type="number"
                  placeholder={unit === "metric" ? "e.g., 95" : "e.g., 37"}
                  value={hip}
                  onChange={(e) => setHip(e.target.value)}
                />
              </div>
            )}

            <div className="flex gap-2">
              <Button onClick={calculate}>Calculate Body Fat</Button>
              <Button variant="outline" onClick={reset}>Reset</Button>
            </div>

            {bodyFat !== null && (
              <div className="p-4 bg-muted rounded-md">
                <p className="text-sm text-muted-foreground">Your Body Fat Percentage</p>
                <p className="text-4xl font-bold mt-1">{bodyFat}%</p>
                <p className="text-lg font-medium mt-2">Category: {category}</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
