"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface GachaResult {
  pullRate: number;
  pulls: number;
  pityPulls: number;
  probabilityAtLeastOne: number;
  probabilityExact: number;
  expectedPulls: number;
  costEstimate: number;
  pityGuaranteed: boolean;
  recommendations: string[];
}

export default function GachaPullProbabilityCalculatorPage() {
  const [pullRate, setPullRate] = useState<string>("0.6");
  const [pulls, setPulls] = useState<string>("10");
  const [pityCount, setPityCount] = useState<string>("90");
  const [costPerPull, setCostPerPull] = useState<string>("2.50");
  const [currency, setCurrency] = useState<string>("USD");
  const [result, setResult] = useState<GachaResult | null>(null);

  const calculate = () => {
    const rateNum = parseFloat(pullRate) || 0.6;
    const pullsNum = parseInt(pulls) || 10;
    const pityNum = parseInt(pityCount) || 90;
    const costNum = parseFloat(costPerPull) || 2.5;

    // Convert percentage to decimal
    const p = rateNum / 100;

    // Probability of getting AT LEAST one success in n pulls
    // P(at least one) = 1 - (1-p)^n
    const probabilityAtLeastOne = (1 - Math.pow(1 - p, pullsNum)) * 100;

    // Probability of getting exactly k successes (binomial)
    // For exactly 1: C(n,1) × p × (1-p)^(n-1)
    const probabilityExact = pullsNum * p * Math.pow(1 - p, pullsNum - 1) * 100;

    // Expected number of pulls to get one success
    // E = 1/p
    const expectedPulls = 1 / p;

    // Check if pity system guarantees
    const pityGuaranteed = pullsNum >= pityNum;

    // Cost estimate
    const costEstimate = pullsNum * costNum;

    // Generate recommendations
    const recommendations: string[] = [];

    if (probabilityAtLeastOne < 50) {
      recommendations.push(`⚠️ Low probability (${probabilityAtLeastOne.toFixed(1)}%). Consider saving for more pulls.`);
    } else if (probabilityAtLeastOne >= 50 && probabilityAtLeastOne < 75) {
      recommendations.push(`📊 Moderate chance (${probabilityAtLeastOne.toFixed(1)}%). Reasonable gamble.`);
    } else if (probabilityAtLeastOne >= 75 && probabilityAtLeastOne < 90) {
      recommendations.push(`✅ Good odds (${probabilityAtLeastOne.toFixed(1)}%). Worth attempting.`);
    } else {
      recommendations.push(`🎯 Excellent chance (${probabilityAtLeastOne.toFixed(1)}%). Highly recommended!`);
    }

    if (pityGuaranteed) {
      recommendations.push(`🎁 PITY GUARANTEED! You will get the item within ${pullsNum} pulls.`);
    } else {
      const pullsToPity = pityNum - pullsNum;
      recommendations.push(`💡 ${pullsToPity} more pulls needed for pity guarantee.`);
    }

    if (expectedPulls > pityNum) {
      recommendations.push(`💰 Expected pulls (${expectedPulls.toFixed(0)}) exceeds pity (${pityNum}). Pity system helps!`);
    }

    // Expected cost to get one
    const expectedCost = expectedPulls * costNum;
    recommendations.push(`💵 Expected cost for one: $${expectedCost.toFixed(2)} (${expectedPulls.toFixed(0)} pulls)`);

    setResult({
      pullRate: rateNum,
      pulls: pullsNum,
      pityPulls: pityNum,
      probabilityAtLeastOne: parseFloat(probabilityAtLeastOne.toFixed(2)),
      probabilityExact: parseFloat(probabilityExact.toFixed(2)),
      expectedPulls: parseFloat(expectedPulls.toFixed(1)),
      costEstimate: parseFloat(costEstimate.toFixed(2)),
      pityGuaranteed,
      recommendations,
    });
  };

  const reset = () => {
    setPullRate("0.6");
    setPulls("10");
    setPityCount("90");
    setResult(null);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl font-semibold tracking-tight mb-2">
            Gacha Pull Probability Calculator – Calculate Your Odds in Gacha Games
          </h1>
          <p className="text-muted-foreground">
            Know your odds before you spend with our Gacha Pull Probability Calculator.
            Enter the pull rate for your desired character or item and the number of
            attempts to calculate the cumulative probability — essential for gacha game
            players managing their budgets.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardContent className="p-6 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="pull-rate">Pull Rate (%)</Label>
                <Input
                  id="pull-rate"
                  type="number"
                  step="0.1"
                  value={pullRate}
                  onChange={(e) => setPullRate(e.target.value)}
                  placeholder="e.g., 0.6"
                />
                <p className="text-xs text-muted-foreground">
                  Typical rates: 0.3-3% for 5★/SSR, 5-20% for 4★/SR
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="pulls">Number of Pulls</Label>
                <Input
                  id="pulls"
                  type="number"
                  value={pulls}
                  onChange={(e) => setPulls(e.target.value)}
                  placeholder="e.g., 10"
                />
                <p className="text-xs text-muted-foreground">
                  10 = one multi-pull, 90 = typical pity
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="pity">Pity Count (guaranteed pulls)</Label>
                <Input
                  id="pity"
                  type="number"
                  value={pityCount}
                  onChange={(e) => setPityCount(e.target.value)}
                  placeholder="e.g., 90"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div className="space-y-2">
                  <Label htmlFor="cost">Cost per Pull</Label>
                  <Input
                    id="cost"
                    type="number"
                    step="0.01"
                    value={costPerPull}
                    onChange={(e) => setCostPerPull(e.target.value)}
                    placeholder="2.50"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="currency">Currency</Label>
                  <Select value={currency} onValueChange={setCurrency}>
                    <SelectTrigger id="currency">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="USD">USD</SelectItem>
                      <SelectItem value="EUR">EUR</SelectItem>
                      <SelectItem value="GBP">GBP</SelectItem>
                      <SelectItem value="JPY">JPY</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
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
              <h3 className="text-lg font-semibold mb-4">Probability Results</h3>
              {result ? (
                <div className="space-y-4">
                  <div className={`p-4 rounded-lg text-center ${
                    result.probabilityAtLeastOne >= 75 ? "bg-green-100 dark:bg-green-900/20" :
                    result.probabilityAtLeastOne >= 50 ? "bg-blue-100 dark:bg-blue-900/20" :
                    result.probabilityAtLeastOne >= 25 ? "bg-amber-100 dark:bg-amber-900/20" :
                    "bg-red-100 dark:bg-red-900/20"
                  }`}>
                    <p className="text-sm text-muted-foreground">Chance of At Least One Success</p>
                    <p className="text-4xl font-bold">{result.probabilityAtLeastOne}%</p>
                    <p className="text-sm mt-1">{result.pulls} pulls at {result.pullRate}% rate</p>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-3 bg-muted rounded-lg text-center">
                      <p className="text-xs text-muted-foreground">Expected Pulls</p>
                      <p className="text-xl font-bold">{result.expectedPulls}</p>
                    </div>
                    <div className="p-3 bg-muted rounded-lg text-center">
                      <p className="text-xs text-muted-foreground">Cost Estimate</p>
                      <p className="text-xl font-bold">${result.costEstimate}</p>
                    </div>
                  </div>

                  <div className="p-4 bg-muted rounded-lg space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Pity System:</span>
                      <span className={`font-semibold ${result.pityGuaranteed ? "text-green-600" : ""}`}>
                        {result.pityGuaranteed ? "✓ Guaranteed" : `${result.pityPulls} pulls`}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Exact 1 Success:</span>
                      <span className="font-semibold">{result.probabilityExact}%</span>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2 text-sm">Analysis</h4>
                    <ul className="space-y-1">
                      {result.recommendations.map((rec, i) => (
                        <li key={i} className="text-sm">{rec}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <p>Enter pull details and click Calculate to see odds</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="mt-8 space-y-6">
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">
                Understanding Gacha Probability
              </h3>
              <div className="space-y-3 text-sm text-muted-foreground">
                <p>
                  Gacha games use random number generation with published rates:
                </p>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>
                    <strong>P(at least one):</strong> 1 - (1-p)^n where p = rate, n = pulls
                  </li>
                  <li>
                    <strong>Expected pulls:</strong> 1/p (average pulls to get one)
                  </li>
                  <li>
                    <strong>Pity system:</strong> Guarantees rare item after X pulls
                  </li>
                  <li>
                    <strong>Soft pity:</strong> Rate increases after certain pull count
                  </li>
                </ul>
                <p>
                  <strong>Tip:</strong> Always check if the game has soft pity mechanics
                  that increase rates before the hard pity threshold.
                </p>
                <p className="text-amber-600 dark:text-amber-400">
                  <strong>Remember:</strong> Gacha is gambling. Set a budget and stick to it.
                  Never spend money you can&apos;t afford to lose.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
