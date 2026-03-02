"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function HorseFeedCalculatorPage() {
  const [weight, setWeight] = useState<string>("500");
  const [workload, setWorkload] = useState<string>("light");
  const [lifeStage, setLifeStage] = useState<string>("adult");
  const [result, setResult] = useState<{
    dailyForage: number;
    dailyConcentrate: number;
    totalFeed: number;
    waterRequirement: number;
    feedingSchedule: string[];
  } | null>(null);

  const calculate = () => {
    const horseWeight = parseFloat(weight);
    if (isNaN(horseWeight)) return;

    // Forage requirement: 1.5-2.5% of body weight depending on workload
    const foragePercentages: { [key: string]: number } = {
      "idle": 0.02,
      "light": 0.018,
      "moderate": 0.015,
      "heavy": 0.012,
      "very_heavy": 0.01
    };

    // Concentrate requirements based on workload (kg per day)
    const concentrateBase: { [key: string]: number } = {
      "idle": 0,
      "light": horseWeight * 0.002,
      "moderate": horseWeight * 0.005,
      "heavy": horseWeight * 0.01,
      "very_heavy": horseWeight * 0.015
    };

    // Life stage adjustments
    const lifeStageMultipliers: { [key: string]: number } = {
      "adult": 1,
      "growing": 1.3,
      "pregnant": 1.2,
      "lactating": 1.5,
      "senior": 1.1
    };

    const foragePercent = foragePercentages[workload] * lifeStageMultipliers[lifeStage];
    const dailyForage = horseWeight * foragePercent;
    const dailyConcentrate = concentrateBase[workload] * lifeStageMultipliers[lifeStage];
    const totalFeed = dailyForage + dailyConcentrate;

    // Water requirement: 25-50 liters per day depending on workload and diet
    const waterBase = horseWeight * 0.06; // 6% of body weight in liters
    const waterAdjustments: { [key: string]: number } = {
      "idle": 0.8,
      "light": 1,
      "moderate": 1.2,
      "heavy": 1.5,
      "very_heavy": 1.8
    };
    const waterRequirement = waterBase * waterAdjustments[workload];

    // Feeding schedule recommendations
    const feedingSchedule: string[] = [];
    if (dailyForage > 0) {
      feedingSchedule.push(`Divide forage into ${dailyForage > 10 ? '3-4' : '2-3'} small meals throughout the day`);
    }
    if (dailyConcentrate > 0) {
      feedingSchedule.push(`Split concentrate into ${dailyConcentrate > 2 ? '3' : '2'} equal portions`);
      feedingSchedule.push("Feed concentrate after forage to aid digestion");
    }
    feedingSchedule.push("Provide fresh, clean water at all times");
    feedingSchedule.push("Feed at consistent times each day");

    setResult({
      dailyForage: Math.round(dailyForage * 10) / 10,
      dailyConcentrate: Math.round(dailyConcentrate * 10) / 10,
      totalFeed: Math.round(totalFeed * 10) / 10,
      waterRequirement: Math.round(waterRequirement),
      feedingSchedule
    });
  };

  const reset = () => {
    setWeight("500");
    setWorkload("light");
    setLifeStage("adult");
    setResult(null);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl font-semibold tracking-tight mb-2">Horse Feed Calculator – Calculate Daily Feed Requirements for Your Horse</h1>
          <p className="text-muted-foreground">
            Fuel your horse's performance and health with our Horse Feed Calculator. Enter body weight, workload level, and life stage to calculate daily forage (hay) and concentrate requirements — based on equine nutrition guidelines.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardContent className="p-6 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="weight">Horse Weight (kg)</Label>
                <Input 
                  id="weight" 
                  type="number" 
                  placeholder="e.g., 500" 
                  value={weight} 
                  onChange={(e) => setWeight(e.target.value)} 
                />
                <p className="text-xs text-muted-foreground">Average: 400-600kg for light breeds, 500-800kg for warmbloods</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="workload">Workload Level</Label>
                <Select value={workload} onValueChange={setWorkload}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="idle">Idle (Pasture rest)</SelectItem>
                    <SelectItem value="light">Light (1-3 hrs/week walking)</SelectItem>
                    <SelectItem value="moderate">Moderate (3-5 hrs/week mixed)</SelectItem>
                    <SelectItem value="heavy">Heavy (4-5 hrs/week intense)</SelectItem>
                    <SelectItem value="very_heavy">Very Heavy (6+ hrs/week intense)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="lifeStage">Life Stage</Label>
                <Select value={lifeStage} onValueChange={setLifeStage}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="adult">Adult (Maintenance)</SelectItem>
                    <SelectItem value="growing">Growing (1-3 years)</SelectItem>
                    <SelectItem value="pregnant">Pregnant (Last trimester)</SelectItem>
                    <SelectItem value="lactating">Lactating</SelectItem>
                    <SelectItem value="senior">Senior (20+ years)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex gap-2 pt-4">
                <Button onClick={calculate} className="flex-1">
                  Calculate Feed
                </Button>
                <Button variant="outline" onClick={reset}>
                  Reset
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">Results</h3>
              {result ? (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-2">
                    <div className="p-3 bg-primary/10 rounded-lg">
                      <p className="text-xs text-muted-foreground">Daily Forage (Hay)</p>
                      <p className="text-2xl font-bold text-primary">{result.dailyForage} kg</p>
                    </div>
                    <div className="p-3 bg-primary/10 rounded-lg">
                      <p className="text-xs text-muted-foreground">Daily Concentrate</p>
                      <p className="text-2xl font-bold text-primary">{result.dailyConcentrate} kg</p>
                    </div>
                  </div>

                  <div className="p-3 bg-muted rounded-lg">
                    <p className="text-sm text-muted-foreground">Total Daily Feed</p>
                    <p className="text-2xl font-semibold">{result.totalFeed} kg</p>
                  </div>

                  <div className="p-3 bg-primary/10 rounded-lg">
                    <p className="text-sm text-muted-foreground">Daily Water Requirement</p>
                    <p className="text-2xl font-bold text-primary">{result.waterRequirement} liters</p>
                  </div>

                  <div className="p-3 bg-primary/10 rounded-lg">
                    <p className="text-sm font-semibold text-primary mb-2">Feeding Schedule:</p>
                    <ul className="text-sm space-y-1">
                      {result.feedingSchedule.map((item, i) => (
                        <li key={i}>• {item}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <p>Enter horse details and click Calculate to see results</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
