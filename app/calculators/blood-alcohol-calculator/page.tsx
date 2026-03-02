"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function BloodAlcoholCalculator() {
  const [gender, setGender] = useState<"male" | "female">("male");
  const [weight, setWeight] = useState<string>("");
  const [weightUnit, setWeightUnit] = useState<"kg" | "lbs">("kg");
  const [drinks, setDrinks] = useState<string>("");
  const [hours, setHours] = useState<string>("");
  const [bac, setBac] = useState<number | null>(null);

  const calculate = () => {
    const w = parseFloat(weight);
    const d = parseInt(drinks);
    const h = parseFloat(hours);

    if (isNaN(w) || isNaN(d) || isNaN(h) || w <= 0 || d < 0 || h < 0) return;

    const weightKg = weightUnit === "lbs" ? w * 0.453592 : w;
    const weightGrams = weightKg * 1000;
    
    // Standard drink = 14g pure alcohol
    const alcoholGrams = d * 14;
    
    // Widmark factor: 0.68 for men, 0.55 for women
    const r = gender === "male" ? 0.68 : 0.55;
    
    // BAC formula
    let bacValue = (alcoholGrams / (weightGrams * r)) * 100;
    
    // Metabolism: 0.015% per hour
    bacValue = bacValue - (0.015 * h);
    bacValue = Math.max(0, bacValue);
    
    setBac(Math.round(bacValue * 1000) / 1000);
  };

  const reset = () => {
    setWeight("");
    setDrinks("");
    setHours("");
    setBac(null);
  };

  const getBacInfo = (bacValue: number) => {
    if (bacValue === 0) return { label: "Sober", color: "text-green-600" };
    if (bacValue < 0.02) return { label: "Minimal impairment", color: "text-green-600" };
    if (bacValue < 0.05) return { label: "Mild impairment", color: "text-yellow-600" };
    if (bacValue < 0.08) return { label: "Impaired - Do not drive", color: "text-orange-600" };
    if (bacValue < 0.15) return { label: "Highly impaired", color: "text-red-600" };
    return { label: "Dangerous - Medical risk", color: "text-red-700" };
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Blood Alcohol Content Calculator – Estimate Your BAC Level</CardTitle>
          <CardDescription>
            Use our BAC calculator to estimate your blood alcohol content based on the number of drinks, your body weight, and time elapsed. Stay safe and make informed decisions.
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

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="weight">Weight</Label>
                <Input
                  id="weight"
                  type="number"
                  placeholder="e.g., 70"
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="weightUnit">Unit</Label>
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
              <Label htmlFor="drinks">Number of Standard Drinks</Label>
              <Input
                id="drinks"
                type="number"
                placeholder="e.g., 3"
                value={drinks}
                onChange={(e) => setDrinks(e.target.value)}
              />
              <p className="text-xs text-muted-foreground mt-1">
                1 drink = 12oz beer, 5oz wine, or 1.5oz spirits
              </p>
            </div>

            <div>
              <Label htmlFor="hours">Hours Since First Drink</Label>
              <Input
                id="hours"
                type="number"
                step="0.5"
                placeholder="e.g., 2"
                value={hours}
                onChange={(e) => setHours(e.target.value)}
              />
            </div>

            <div className="flex gap-2">
              <Button onClick={calculate}>Calculate BAC</Button>
              <Button variant="outline" onClick={reset}>Reset</Button>
            </div>

            {bac !== null && (
              <div className="p-4 bg-muted rounded-md">
                <p className="text-sm text-muted-foreground">Estimated BAC</p>
                <p className="text-4xl font-bold mt-1">{bac.toFixed(3)}%</p>
                <p className={`text-lg font-medium mt-2 ${getBacInfo(bac).color}`}>
                  {getBacInfo(bac).label}
                </p>
                <p className="text-xs text-muted-foreground mt-2">
                  Your body metabolizes approximately 0.015% BAC per hour.
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
