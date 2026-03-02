"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function LivestockFeedCalculatorPage() {
  const [animalType, setAnimalType] = useState<string>("cattle");
  const [animalWeight, setAnimalWeight] = useState<string>("");
  const [weightUnit, setWeightUnit] = useState<"kg" | "lbs">("kg");
  const [productionStage, setProductionStage] = useState<string>("maintenance");
  const [numAnimals, setNumAnimals] = useState<string>("1");
  const [result, setResult] = useState<{
    dailyFeedIntake: number;
    dryMatterIntake: number;
    proteinRequired: number;
    energyRequired: number;
    totalDailyFeed: number;
  } | null>(null);

  // Dry matter intake as % of body weight for different animals and stages
  const dmiPercentages: Record<string, Record<string, number>> = {
    cattle: {
      maintenance: 2.0,
      growing: 2.5,
      lactating: 3.0,
      pregnant: 2.2,
    },
    sheep: {
      maintenance: 2.5,
      growing: 3.0,
      lactating: 3.5,
      pregnant: 2.8,
    },
    goat: {
      maintenance: 3.0,
      growing: 3.5,
      lactating: 4.0,
      pregnant: 3.2,
    },
    pig: {
      maintenance: 2.5,
      growing: 3.5,
      lactating: 4.5,
      pregnant: 2.8,
    },
    chicken_broiler: {
      growing: 0.15, // kg per bird per day
    },
    chicken_layer: {
      laying: 0.12, // kg per bird per day
    },
    horse: {
      maintenance: 2.0,
      working: 2.5,
      pregnant: 2.2,
    },
  };

  // Protein requirements (% of DM)
  const proteinRequirements: Record<string, Record<string, number>> = {
    cattle: { maintenance: 8, growing: 12, lactating: 16, pregnant: 10 },
    sheep: { maintenance: 8, growing: 14, lactating: 16, pregnant: 10 },
    goat: { maintenance: 8, growing: 14, lactating: 16, pregnant: 10 },
    pig: { maintenance: 12, growing: 16, lactating: 18, pregnant: 14 },
    chicken_broiler: { growing: 20 },
    chicken_layer: { laying: 17 },
    horse: { maintenance: 8, working: 10, pregnant: 10 },
  };

  // Energy requirements (Mcal ME per day per kg body weight)
  const energyRequirements: Record<string, Record<string, number>> = {
    cattle: { maintenance: 0.08, growing: 0.12, lactating: 0.15, pregnant: 0.10 },
    sheep: { maintenance: 0.10, growing: 0.14, lactating: 0.18, pregnant: 0.12 },
    goat: { maintenance: 0.10, growing: 0.14, lactating: 0.18, pregnant: 0.12 },
    pig: { maintenance: 0.12, growing: 0.18, lactating: 0.22, pregnant: 0.14 },
    chicken_broiler: { growing: 0.30 }, // Mcal per bird
    chicken_layer: { laying: 0.28 }, // Mcal per bird
    horse: { maintenance: 0.03, working: 0.05, pregnant: 0.04 },
  };

  const calculate = () => {
    let weight = parseFloat(animalWeight);
    const animals = parseInt(numAnimals) || 1;

    if (isNaN(weight) || weight <= 0 || isNaN(animals) || animals <= 0) return;

    // Convert to kg if in lbs
    if (weightUnit === "lbs") {
      weight = weight * 0.453592;
    }

    // Get DMI percentage for animal type and production stage
    const dmiPercent = dmiPercentages[animalType]?.[productionStage] || 2.0;
    
    // Calculate daily feed intake
    let dailyFeedIntake: number;
    
    // Special handling for poultry (fixed intake per bird)
    if (animalType === "chicken_broiler" || animalType === "chicken_layer") {
      dailyFeedIntake = dmiPercent * animals; // kg per day for all birds
    } else {
      dailyFeedIntake = (weight * dmiPercent / 100) * animals; // kg per day
    }

    // Dry matter intake (assuming 90% DM in feed)
    const dryMatterIntake = dailyFeedIntake * 0.9;

    // Protein requirement
    const proteinPercent = proteinRequirements[animalType]?.[productionStage] || 10;
    const proteinRequired = dryMatterIntake * (proteinPercent / 100);

    // Energy requirement
    const energyPerKg = energyRequirements[animalType]?.[productionStage] || 0.1;
    let energyRequired: number;
    if (animalType === "chicken_broiler" || animalType === "chicken_layer") {
      energyRequired = energyPerKg * animals;
    } else {
      energyRequired = energyPerKg * weight * animals;
    }

    // Total daily feed (as-fed basis, assuming 10% moisture)
    const totalDailyFeed = dailyFeedIntake;

    setResult({
      dailyFeedIntake: Math.round(dailyFeedIntake * 100) / 100,
      dryMatterIntake: Math.round(dryMatterIntake * 100) / 100,
      proteinRequired: Math.round(proteinRequired * 100) / 100,
      energyRequired: Math.round(energyRequired * 100) / 100,
      totalDailyFeed: Math.round(totalDailyFeed * 100) / 100,
    });
  };

  const reset = () => {
    setAnimalWeight("");
    setNumAnimals("1");
    setResult(null);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl font-semibold tracking-tight mb-2">
            Livestock Feed Calculator – Calculate Daily Feed Requirements for Farm Animals
          </h1>
          <p className="text-muted-foreground">
            Ensure your animals get proper nutrition with our Livestock Feed Calculator. Enter
            animal type, live weight, and production stage (growth, lactation, etc.) to calculate
            optimal daily feed quantities and reduce feed wastage on your farm.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardContent className="p-6 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="animalType">Animal Type</Label>
                <Select value={animalType} onValueChange={setAnimalType}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="cattle">Cattle/Beef</SelectItem>
                    <SelectItem value="sheep">Sheep</SelectItem>
                    <SelectItem value="goat">Goat</SelectItem>
                    <SelectItem value="pig">Pig/Swine</SelectItem>
                    <SelectItem value="chicken_broiler">Chicken (Broiler)</SelectItem>
                    <SelectItem value="chicken_layer">Chicken (Layer)</SelectItem>
                    <SelectItem value="horse">Horse</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="animalWeight">Animal Weight</Label>
                <div className="flex gap-2">
                  <Input
                    id="animalWeight"
                    type="number"
                    placeholder={weightUnit === "kg" ? "e.g., 500" : "e.g., 1100"}
                    value={animalWeight}
                    onChange={(e) => setAnimalWeight(e.target.value)}
                    className="flex-1"
                  />
                  <Select value={weightUnit} onValueChange={(v) => setWeightUnit(v as "kg" | "lbs")}>
                    <SelectTrigger className="w-[80px]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="kg">kg</SelectItem>
                      <SelectItem value="lbs">lbs</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="productionStage">Production Stage</Label>
                <Select value={productionStage} onValueChange={setProductionStage}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {animalType === "cattle" || animalType === "sheep" || animalType === "goat" || animalType === "pig" ? (
                      <>
                        <SelectItem value="maintenance">Maintenance</SelectItem>
                        <SelectItem value="growing">Growing/Finishing</SelectItem>
                        <SelectItem value="lactating">Lactating</SelectItem>
                        <SelectItem value="pregnant">Pregnant</SelectItem>
                      </>
                    ) : animalType === "chicken_broiler" ? (
                      <SelectItem value="growing">Growing</SelectItem>
                    ) : animalType === "chicken_layer" ? (
                      <SelectItem value="laying">Laying</SelectItem>
                    ) : (
                      <>
                        <SelectItem value="maintenance">Maintenance</SelectItem>
                        <SelectItem value="working">Working</SelectItem>
                        <SelectItem value="pregnant">Pregnant</SelectItem>
                      </>
                    )}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="numAnimals">Number of Animals</Label>
                <Input
                  id="numAnimals"
                  type="number"
                  placeholder="1"
                  value={numAnimals}
                  onChange={(e) => setNumAnimals(e.target.value)}
                />
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
              <h3 className="text-lg font-semibold mb-4">Feed Requirements</h3>
              {result ? (
                <div className="space-y-4">
                  <div className="p-4 bg-primary/10 rounded-lg">
                    <p className="text-sm text-muted-foreground">Daily Feed Required</p>
                    <p className="text-3xl font-bold text-primary">{result.totalDailyFeed} kg/day</p>
                    <p className="text-sm text-muted-foreground mt-1">
                      for {numAnimals} {animalType.replace("_", " ")}
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-4 bg-muted rounded-lg">
                      <p className="text-sm text-muted-foreground">Dry Matter Intake</p>
                      <p className="text-lg font-bold">{result.dryMatterIntake} kg/day</p>
                    </div>
                    <div className="p-4 bg-muted rounded-lg">
                      <p className="text-sm text-muted-foreground">Protein Required</p>
                      <p className="text-lg font-bold">{result.proteinRequired} kg/day</p>
                    </div>
                  </div>

                  <div className="p-4 bg-muted rounded-lg">
                    <p className="text-sm text-muted-foreground">Energy Required</p>
                    <p className="text-xl font-bold">{result.energyRequired} Mcal ME/day</p>
                  </div>

                  <div className="border-t pt-4">
                    <h4 className="font-semibold mb-2 text-sm">Feeding Tips</h4>
                    <ul className="text-sm space-y-1 list-disc list-inside text-muted-foreground">
                      <li>Provide clean, fresh water at all times</li>
                      <li>Divide daily feed into 2-3 meals for better digestion</li>
                      <li>Adjust feed based on body condition score</li>
                      <li>Store feed in cool, dry place to prevent spoilage</li>
                    </ul>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <p>Enter values and click Calculate to see results</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="mt-8 p-6 bg-card rounded-lg border">
          <h3 className="text-lg font-semibold mb-3">Feed Calculation Formula</h3>
          <div className="bg-muted p-3 rounded font-mono text-sm space-y-1">
            <div>DMI (% BW) = Dry Matter Intake as % of Body Weight</div>
            <div>Daily Feed (kg) = Body Weight (kg) × DMI% × Number of Animals</div>
            <div>Protein (kg) = Dry Matter Intake × Protein Requirement %</div>
            <div>Energy (Mcal) = Body Weight × Energy Requirement per kg</div>
          </div>
          <p className="text-muted-foreground text-sm mt-3">
            <strong>Note:</strong> These are general guidelines. Actual requirements may vary based
            on breed, activity level, environmental conditions, and feed quality. Consult a
            veterinarian or animal nutritionist for specific recommendations.
          </p>
        </div>
      </div>
    </div>
  );
}
