"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";

export default function PregnancyWeightGainCalculator() {
  const [prePregnancyWeight, setPrePregnancyWeight] = useState<string>("");
  const [height, setHeight] = useState<string>("");
  const [trimester, setTrimester] = useState<string>("");
  const [bmi, setBmi] = useState<number | null>(null);
  const [bmiCategory, setBmiCategory] = useState<string>("");
  const [results, setResults] = useState<{
    totalGain: string;
    firstTrimester: string;
    secondThirdTrimester: string;
  } | null>(null);

  const calculate = () => {
    const weight = parseFloat(prePregnancyWeight);
    const heightCm = parseFloat(height);

    if (isNaN(weight) || isNaN(heightCm) || weight <= 0 || heightCm <= 0 || !trimester) return;

    // Calculate BMI
    const heightInMeters = heightCm / 100;
    const calculatedBmi = weight / (heightInMeters * heightInMeters);
    setBmi(Math.round(calculatedBmi * 10) / 10);

    // Determine BMI category and recommendations (IOM guidelines)
    let category: string;
    let totalGainMin: number, totalGainMax: number;
    let firstTrimesterGain: number;
    let secondThirdRate: string;

    if (calculatedBmi < 18.5) {
      category = "Underweight";
      totalGainMin = 12.5;
      totalGainMax = 18;
      firstTrimesterGain = 2;
      secondThirdRate = "0.5 kg per week";
    } else if (calculatedBmi < 25) {
      category = "Normal weight";
      totalGainMin = 11.5;
      totalGainMax = 16;
      firstTrimesterGain = 1.5;
      secondThirdRate = "0.4 kg per week";
    } else if (calculatedBmi < 30) {
      category = "Overweight";
      totalGainMin = 7;
      totalGainMax = 11.5;
      firstTrimesterGain = 1;
      secondThirdRate = "0.3 kg per week";
    } else {
      category = "Obese";
      totalGainMin = 5;
      totalGainMax = 9;
      firstTrimesterGain = 0.5;
      secondThirdRate = "0.2 kg per week";
    }

    setBmiCategory(category);

    // Calculate recommended gain based on trimester
    let currentRecommendation: string;
    if (trimester === "1") {
      currentRecommendation = `First trimester: ~${firstTrimesterGain} kg total`;
    } else if (trimester === "2") {
      currentRecommendation = `Second trimester: ${secondThirdRate}`;
    } else {
      currentRecommendation = `Third trimester: ${secondThirdRate}`;
    }

    setResults({
      totalGain: `${totalGainMin}–${totalGainMax} kg`,
      firstTrimester: `~${firstTrimesterGain} kg`,
      secondThirdTrimester: secondThirdRate,
    });
  };

  const reset = () => {
    setPrePregnancyWeight("");
    setHeight("");
    setTrimester("");
    setBmi(null);
    setBmiCategory("");
    setResults(null);
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Pregnancy Weight Gain Calculator – Free Pregnancy BMI Calculator</CardTitle>
          <CardDescription>
            Calculate recommended pregnancy weight gain based on your pre-pregnancy BMI. Get personalized weight gain recommendations for each trimester according to IOM guidelines.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <Label htmlFor="prePregnancyWeight">Pre-Pregnancy Weight (kg)</Label>
              <Input
                id="prePregnancyWeight"
                type="number"
                placeholder="e.g., 65"
                value={prePregnancyWeight}
                onChange={(e) => setPrePregnancyWeight(e.target.value)}
              />
            </div>

            <div>
              <Label htmlFor="height">Height (cm)</Label>
              <Input
                id="height"
                type="number"
                placeholder="e.g., 165"
                value={height}
                onChange={(e) => setHeight(e.target.value)}
              />
            </div>

            <div>
              <Label>Current Trimester</Label>
              <Select value={trimester} onValueChange={setTrimester}>
                <SelectTrigger>
                  <SelectValue placeholder="Select trimester" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">First Trimester (Weeks 1-12)</SelectItem>
                  <SelectItem value="2">Second Trimester (Weeks 13-27)</SelectItem>
                  <SelectItem value="3">Third Trimester (Weeks 28-40)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex gap-2">
              <Button onClick={calculate}>Calculate</Button>
              <Button variant="outline" onClick={reset}>Reset</Button>
            </div>

            {bmi !== null && (
              <div className="p-4 bg-muted rounded-md space-y-3">
                <div>
                  <p className="text-sm text-muted-foreground">Pre-Pregnancy BMI</p>
                  <p className="text-4xl font-bold mt-1">{bmi}</p>
                  <p className="text-lg font-medium mt-2">{bmiCategory}</p>
                </div>

                {results && (
                  <>
                    <div className="border-t pt-3">
                      <p className="text-sm font-medium mb-2">Recommended Total Weight Gain</p>
                      <p className="text-2xl font-bold">{results.totalGain}</p>
                    </div>

                    <div className="border-t pt-3 space-y-2">
                      <p className="text-sm font-medium">Weight Gain by Trimester</p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
                        <div className="p-2 bg-background rounded">
                          <span className="text-muted-foreground">First Trimester:</span>
                          <span className="ml-2 font-medium">{results.firstTrimester}</span>
                        </div>
                        <div className="p-2 bg-background rounded">
                          <span className="text-muted-foreground">Second & Third:</span>
                          <span className="ml-2 font-medium">{results.secondThirdTrimester}</span>
                        </div>
                      </div>
                    </div>

                    <p className="text-xs text-muted-foreground pt-2">
                      These recommendations are based on Institute of Medicine (IOM) guidelines. Always consult your healthcare provider for personalized advice.
                    </p>
                  </>
                )}
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
