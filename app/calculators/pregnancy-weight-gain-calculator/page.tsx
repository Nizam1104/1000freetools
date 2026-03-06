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

      <Card className="mt-6">
        <CardHeader>
          <CardTitle>How to Calculate Pregnancy Weight Gain</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-start gap-4 mb-4">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm">1</div>
            <div>
              <p className="font-semibold mb-1">Enter pre-pregnancy weight</p>
              <p className="text-sm text-muted-foreground">Input your weight before becoming pregnant in kilograms.</p>
            </div>
          </div>
          <div className="flex items-start gap-4 mb-4">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm">2</div>
            <div>
              <p className="font-semibold mb-1">Add height and trimester</p>
              <p className="text-sm text-muted-foreground">Enter your height in cm and select your current trimester.</p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm">3</div>
            <div>
              <p className="font-semibold mb-1">Get personalized recommendations</p>
              <p className="text-sm text-muted-foreground">Receive BMI-based weight gain guidelines for each trimester.</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Why Track Pregnancy Weight Gain</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <p className="font-semibold mb-1">Healthy baby development</p>
              <p className="text-sm text-muted-foreground">Appropriate weight gain supports optimal fetal growth and development.</p>
            </div>
            <div>
              <p className="font-semibold mb-1">Reduce complications</p>
              <p className="text-sm text-muted-foreground">Proper gain lowers risks of gestational diabetes and preeclampsia.</p>
            </div>
            <div>
              <p className="font-semibold mb-1">BMI-based guidelines</p>
              <p className="text-sm text-muted-foreground">Recommendations adjust for underweight, normal, overweight, and obese categories.</p>
            </div>
            <div>
              <p className="font-semibold mb-1">Trimester breakdown</p>
              <p className="text-sm text-muted-foreground">Understand expected gain patterns throughout pregnancy.</p>
            </div>
            <div>
              <p className="font-semibold mb-1">IOM guidelines</p>
              <p className="text-sm text-muted-foreground">Based on Institute of Medicine evidence-based recommendations.</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Frequently Asked Questions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <p className="font-semibold mb-1">How much weight should I gain during pregnancy?</p>
              <p className="text-sm text-muted-foreground">Normal BMI: 11.5-16 kg. Underweight: 12.5-18 kg. Overweight: 7-11.5 kg. Obese: 5-9 kg total.</p>
            </div>
            <div>
              <p className="font-semibold mb-1">How much weight in first trimester?</p>
              <p className="text-sm text-muted-foreground">Most women gain 0.5-2 kg in first trimester. Some gain less due to morning sickness, which is normal.</p>
            </div>
            <div>
              <p className="font-semibold mb-1">How fast should I gain weight in second trimester?</p>
              <p className="text-sm text-muted-foreground">Normal BMI: about 0.4 kg per week. Underweight: 0.5 kg/week. Overweight: 0.3 kg/week. Obese: 0.2 kg/week.</p>
            </div>
            <div>
              <p className="font-semibold mb-1">Is it bad to gain too much weight during pregnancy?</p>
              <p className="text-sm text-muted-foreground">Excessive gain increases risks of complications, large baby, and difficulty losing weight postpartum.</p>
            </div>
            <div>
              <p className="font-semibold mb-1">What if I'm not gaining enough weight?</p>
              <p className="text-sm text-muted-foreground">Insufficient gain may lead to low birth weight. Talk to your provider about nutrition strategies.</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Related Pregnancy Tools</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground mb-3">
            Try our other pregnancy calculators: the <a href="/calculators/pregnancy-due-date-calculator" className="text-primary hover:underline">pregnancy due date calculator</a> for delivery estimates, the <a href="/calculators/pregnancy-week-calculator" className="text-primary hover:underline">pregnancy week calculator</a> to track progress, and the <a href="/calculators/bmi-calculator" className="text-primary hover:underline">BMI calculator</a> for health metrics.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
