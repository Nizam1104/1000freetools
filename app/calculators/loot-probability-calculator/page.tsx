"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function LootProbabilityCalculatorPage() {
  const [dropRate, setDropRate] = useState<string>("");
  const [attempts, setAttempts] = useState<string>("");
  const [result, setResult] = useState<{
    probability: number;
    probabilityFormatted: string;
    expectedDrops: number;
    attemptsFor50: number;
    attemptsFor90: number;
  } | null>(null);

  const calculate = () => {
    const rate = parseFloat(dropRate);
    const tries = parseFloat(attempts);
    
    if (isNaN(rate) || isNaN(tries)) return;
    if (rate <= 0 || rate > 100 || tries <= 0) return;

    // Convert drop rate to decimal
    const p = rate / 100;
    
    // Probability of getting at least one drop in n attempts
    // P(at least one) = 1 - P(none) = 1 - (1-p)^n
    const probability = 1 - Math.pow(1 - p, tries);
    
    // Expected number of drops
    const expectedDrops = tries * p;
    
    // Attempts needed for 50% and 90% probability
    const attemptsFor50 = Math.ceil(Math.log(0.5) / Math.log(1 - p));
    const attemptsFor90 = Math.ceil(Math.log(0.1) / Math.log(1 - p));

    // Format probability
    let probabilityFormatted: string;
    if (probability >= 0.9999) probabilityFormatted = ">99.99%";
    else if (probability <= 0.0001) probabilityFormatted = "<0.01%";
    else probabilityFormatted = `${(probability * 100).toFixed(2)}%`;

    setResult({
      probability: probability * 100,
      probabilityFormatted,
      expectedDrops: Math.round(expectedDrops * 100) / 100,
      attemptsFor50,
      attemptsFor90
    });
  };

  const reset = () => {
    setDropRate("");
    setAttempts("");
    setResult(null);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl font-semibold tracking-tight mb-2">Loot Drop Probability Calculator – Calculate Your Chances of Getting Rare Items</h1>
          <p className="text-muted-foreground">
            Find out your real chances of getting that rare drop with our Loot Probability Calculator. Enter the item's drop rate and your number of attempts to calculate the probability of obtaining it — perfect for planning farming sessions in MMOs and ARPGs.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardContent className="p-6 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="dropRate">Drop Rate (%)</Label>
                <Input 
                  id="dropRate" 
                  type="number" 
                  step="0.01"
                  placeholder="e.g., 0.5 for 0.5%" 
                  value={dropRate} 
                  onChange={(e) => setDropRate(e.target.value)} 
                />
                <p className="text-xs text-muted-foreground">Enter as percentage (e.g., 0.5 for 1 in 200)</p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="attempts">Number of Attempts</Label>
                <Input 
                  id="attempts" 
                  type="number" 
                  placeholder="e.g., 100" 
                  value={attempts} 
                  onChange={(e) => setAttempts(e.target.value)} 
                />
                <p className="text-xs text-muted-foreground">How many kills/runs you plan to do</p>
              </div>

              <div className="flex gap-2 pt-4">
                <Button onClick={calculate} className="flex-1">
                  Calculate Probability
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
                  <div className="p-4 bg-primary/10 rounded-lg">
                    <p className="text-sm text-muted-foreground">Probability of Getting Item</p>
                    <p className="text-4xl font-bold text-primary">{result.probabilityFormatted}</p>
                  </div>

                  <div className="p-3 bg-muted rounded-lg">
                    <p className="text-sm text-muted-foreground">Expected Number of Drops</p>
                    <p className="text-2xl font-semibold">{result.expectedDrops}</p>
                    <p className="text-xs text-muted-foreground">On average, you'll get this many drops</p>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div className="p-3 bg-primary/10 rounded-lg">
                      <p className="text-xs text-muted-foreground">Attempts for 50%</p>
                      <p className="text-xl font-bold text-primary">{result.attemptsFor50}</p>
                    </div>
                    <div className="p-3 bg-primary/10 rounded-lg">
                      <p className="text-xs text-muted-foreground">Attempts for 90%</p>
                      <p className="text-xl font-bold text-primary">{result.attemptsFor90}</p>
                    </div>
                  </div>

                  <div className="p-3 bg-primary/10 rounded-lg">
                    <p className="text-sm font-semibold text-primary mb-1">Gaming Tip:</p>
                    <p className="text-sm">Even with a 1% drop rate, you need ~69 attempts for a 50% chance and ~229 attempts for a 90% chance of getting the item.</p>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <p>Enter drop rate and attempts to calculate your chances</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
