"use client";

import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Info, Activity, Droplets } from "lucide-react";

interface ProteinResult {
  absorptionRate: number;
  totalAbsorbed: number;
  timeToAbsorb: number;
  unit: string;
}

export default function ProteinAbsorptionCalculatorPage() {
  const [proteinAmount, setProteinAmount] = useState<string>("");
  const [proteinType, setProteinType] = useState<"whey" | "casein" | "egg" | "soy" | "pea" | "beef">("whey");
  const [bodyWeight, setBodyWeight] = useState<string>("");
  const [weightUnit, setWeightUnit] = useState<"kg" | "lb">("kg");
  const [result, setResult] = useState<ProteinResult | null>(null);

  const calculateAbsorption = () => {
    const protein = parseFloat(proteinAmount);
    const weight = parseFloat(bodyWeight);

    if (isNaN(protein) || isNaN(weight) || protein <= 0 || weight <= 0) {
      setResult(null);
      return;
    }

    let weightInKg = weight;
    if (weightUnit === "lb") {
      weightInKg = weight * 0.453592;
    }

    const absorptionRates = {
      whey: { rate: 10, time: 2 },
      casein: { rate: 6, time: 6 },
      egg: { rate: 7, time: 3 },
      soy: { rate: 8, time: 3 },
      pea: { rate: 7, time: 3 },
      beef: { rate: 8, time: 4 },
    };

    const { rate, time } = absorptionRates[proteinType];
    const totalAbsorbed = Math.min(protein, rate * time);
    const timeToAbsorb = protein / rate;

    setResult({
      absorptionRate: rate,
      totalAbsorbed: Math.round(totalAbsorbed * 10) / 10,
      timeToAbsorb: Math.round(timeToAbsorb * 10) / 10,
      unit: "g/hour",
    });
  };

  const reset = () => {
    setProteinAmount("");
    setBodyWeight("");
    setResult(null);
  };

  useEffect(() => {
    calculateAbsorption();
  }, [proteinAmount, proteinType, bodyWeight, weightUnit]);

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-5xl">
        <div className="mb-8">
          <h1 className="text-3xl font-semibold tracking-tight mb-2">Protein Absorption Calculator – Calculate Protein Uptake Rate</h1>
          <p className="text-muted-foreground">
            Estimate how quickly your body absorbs different types of protein. This calculator shows absorption rates for whey, casein, and other protein sources to optimize timing for muscle building and recovery.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-2">
            <CardContent className="p-6 space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-4">Protein Details</h3>
                <div className="grid sm:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="proteinAmount">Protein Amount (g)</Label>
                    <Input
                      id="proteinAmount"
                      type="number"
                      placeholder="e.g., 30"
                      value={proteinAmount}
                      onChange={(e) => setProteinAmount(e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="proteinType">Protein Type</Label>
                    <select
                      id="proteinType"
                      value={proteinType}
                      onChange={(e) => setProteinType(e.target.value as any)}
                      className="w-full border rounded-md px-3 py-2 text-sm bg-background"
                    >
                      <option value="whey">Whey (fast)</option>
                      <option value="casein">Casein (slow)</option>
                      <option value="egg">Egg (medium)</option>
                      <option value="soy">Soy (medium)</option>
                      <option value="pea">Pea (medium)</option>
                      <option value="beef">Beef (medium-slow)</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="bodyWeight">Body Weight</Label>
                    <div className="flex gap-2">
                      <Input
                        id="bodyWeight"
                        type="number"
                        placeholder="e.g., 70"
                        value={bodyWeight}
                        onChange={(e) => setBodyWeight(e.target.value)}
                        className="flex-1"
                      />
                      <select
                        value={weightUnit}
                        onChange={(e) => setWeightUnit(e.target.value as any)}
                        className="w-20 border rounded-md px-2 text-sm bg-background"
                      >
                        <option value="kg">kg</option>
                        <option value="lb">lb</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>

              <Alert>
                <Info className="h-4 w-4" />
                <AlertDescription className="text-sm">
                  Absorption rates vary by protein type. Whey absorbs fastest (~10g/hour), casein slowest (~6g/hour).
                </AlertDescription>
              </Alert>

              <div className="flex gap-2 pt-4">
                <Button onClick={calculateAbsorption} className="flex-1">
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
              <h3 className="text-lg font-semibold mb-4">Absorption Results</h3>
              {result ? (
                <div className="space-y-4">
                  <div className="p-4 bg-primary/10 rounded-lg">
                    <p className="text-sm text-muted-foreground">Absorption Rate</p>
                    <p className="text-3xl font-bold text-primary">{result.absorptionRate} g/hour</p>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-3 bg-muted rounded-lg">
                      <p className="text-xs text-muted-foreground">Time to Absorb</p>
                      <p className="text-lg font-semibold">{result.timeToAbsorb} hours</p>
                    </div>
                    <div className="p-3 bg-muted rounded-lg">
                      <p className="text-xs text-muted-foreground">Total Absorbed</p>
                      <p className="text-lg font-semibold">{result.totalAbsorbed} g</p>
                    </div>
                  </div>

                  <div className="p-4 bg-muted rounded-lg">
                    <p className="text-sm text-muted-foreground">Best Timing</p>
                    <p className="font-semibold">
                      {proteinType === "whey" && "Post-workout, morning"}
                      {proteinType === "casein" && "Before bed, between meals"}
                      {proteinType === "egg" && "Anytime, breakfast"}
                      {proteinType === "soy" && "Post-workout, meals"}
                      {proteinType === "pea" && "Post-workout, vegan option"}
                      {proteinType === "beef" && "With meals"}
                    </p>
                  </div>

                  <div className="text-xs text-muted-foreground pt-4 border-t">
                    <p>Individual absorption varies based on metabolism, meal composition, and digestive health.</p>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <Activity className="h-12 w-12 mx-auto mb-3 opacity-50" />
                  <p>Enter protein details to calculate absorption</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <Card className="mt-8">
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-6">Protein Absorption Rates</h3>
            <div className="grid md:grid-cols-2 gap-6 text-sm text-muted-foreground">
              <div>
                <h4 className="font-semibold mb-2 flex items-center gap-2">
                  <Droplets className="h-4 w-4" />
                  Absorption Speed:
                </h4>
                <ul className="space-y-1">
                  <li><strong>Whey isolate:</strong> ~10 g/hour (1-2 hours)</li>
                  <li><strong>Whey concentrate:</strong> ~8-10 g/hour (2-3 hours)</li>
                  <li><strong>Egg/Soy/Pea:</strong> ~7-8 g/hour (3-4 hours)</li>
                  <li><strong>Casein:</strong> ~6 g/hour (5-7 hours)</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-2 flex items-center gap-2">
                  <Activity className="h-4 w-4" />
                  Timing Recommendations:
                </h4>
                <ul className="list-disc list-inside space-y-1">
                  <li>Post-workout: Fast protein (whey)</li>
                  <li>Before bed: Slow protein (casein)</li>
                  <li>Between meals: Medium protein (egg, soy)</li>
                  <li>Daily intake: 1.6-2.2 g/kg body weight</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="mt-8">
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-6">Frequently Asked Questions</h3>
            <div className="space-y-4">
              <div className="p-5 bg-muted rounded-lg">
                <h3 className="font-semibold mb-2">How much protein can the body absorb at once?</h3>
                <p className="text-sm text-muted-foreground">The body absorbs about 6-10g of protein per hour depending on the type. However, "absorption" differs from "utilization" - larger amounts are absorbed but used more slowly.</p>
              </div>
              <div className="p-5 bg-muted rounded-lg">
                <h3 className="font-semibold mb-2">Is whey protein absorbed faster than food?</h3>
                <p className="text-sm text-muted-foreground">Yes, whey isolate is one of the fastest-absorbing proteins. Whole foods like meat take longer due to digestion of fats and fiber that slow gastric emptying.</p>
              </div>
              <div className="p-5 bg-muted rounded-lg">
                <h3 className="font-semibold mb-2">Should I take protein before bed?</h3>
                <p className="text-sm text-muted-foreground">Casein protein before bed provides slow-release amino acids during sleep, potentially reducing muscle breakdown. About 30-40g is typical.</p>
              </div>
              <div className="p-5 bg-muted rounded-lg">
                <h3 className="font-semibold mb-2">Does protein timing matter?</h3>
                <p className="text-sm text-muted-foreground">Total daily protein matters most. Timing provides marginal benefits - post-workout protein within 2 hours and even distribution across meals (20-40g each) is optimal.</p>
              </div>
              <div className="p-5 bg-muted rounded-lg">
                <h3 className="font-semibold mb-2">What affects protein absorption?</h3>
                <p className="text-sm text-muted-foreground">Meal composition (fat/fiber slow absorption), digestive health, age, protein type, and whether you eat alone or with other foods all affect absorption rate.</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="mt-8">
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-6">Related Tools</h3>
            <div className="grid md:grid-cols-3 gap-4">
              <a href="/calculators/protein-intake-calculator" className="p-5 bg-muted rounded-lg hover:border-primary border transition-colors">
                <h3 className="font-semibold mb-2">Protein Intake Calculator</h3>
                <p className="text-sm text-muted-foreground">Calculate daily protein needs for your goals.</p>
              </a>
              <a href="/calculators/calorie-calculator" className="p-5 bg-muted rounded-lg hover:border-primary border transition-colors">
                <h3 className="font-semibold mb-2">Calorie Calculator</h3>
                <p className="text-sm text-muted-foreground">Find your daily calorie requirements.</p>
              </a>
              <a href="/calculators/macro-calculator" className="p-5 bg-muted rounded-lg hover:border-primary border transition-colors">
                <h3 className="font-semibold mb-2">Macro Calculator</h3>
                <p className="text-sm text-muted-foreground">Calculate macronutrient ratios for diet.</p>
              </a>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
