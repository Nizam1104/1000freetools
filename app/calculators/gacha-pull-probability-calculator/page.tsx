"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardAction, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Faqs from "@/components/utils/Faqs";

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
                  <div className={`p-4 rounded-lg text-center ${result.probabilityAtLeastOne >= 75 ? "bg-green-100 dark:bg-green-900/20" :
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

          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">
                How to Use This Gacha Pull Probability Calculator
              </h3>
              <div className="space-y-4 text-sm text-muted-foreground">
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary font-semibold">
                    1
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Enter the pull rate for your target</p>
                    <p>Find the published rate for your desired character or item. Typical rates are 0.3-1% for 5-star/SSR units, 5-10% for 4-star/SR units.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary font-semibold">
                    2
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Set your planned number of pulls</p>
                    <p>Enter how many pulls you are planning. Common amounts are 10 (one multi-pull), 50 (half pity), or 90 (full pity in many games).</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary font-semibold">
                    3
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Review your odds and budget</p>
                    <p>The calculator shows your probability of success, expected cost, and whether you will reach pity. Use this to decide if pulling is worth it.</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">
                Common Gacha Game Pull Rates
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-2 font-semibold">Game</th>
                      <th className="text-left py-3 px-2 font-semibold">5-star/SSR Rate</th>
                      <th className="text-left py-3 px-2 font-semibold">Pity Count</th>
                    </tr>
                  </thead>
                  <tbody className="text-muted-foreground">
                    <tr className="border-b">
                      <td className="py-3 px-2">Genshin Impact</td>
                      <td className="py-3 px-2">0.6%</td>
                      <td className="py-3 px-2">90 pulls</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-3 px-2">Honkai: Star Rail</td>
                      <td className="py-3 px-2">0.6%</td>
                      <td className="py-3 px-2">90 pulls</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-3 px-2">Fate/Grand Order</td>
                      <td className="py-3 px-2">1%</td>
                      <td className="py-3 px-2">330 pulls (guaranteed NP5)</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-3 px-2">Arknights</td>
                      <td className="py-3 px-2">2%</td>
                      <td className="py-3 px-2">99 pulls</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-3 px-2">Nikke: Goddess of Victory</td>
                      <td className="py-3 px-2">1%</td>
                      <td className="py-3 px-2">160 pulls (guaranteed modern)</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-2">Reverse: 1999</td>
                      <td className="py-3 px-2">1.4%</td>
                      <td className="py-3 px-2">80 pulls</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="text-xs text-muted-foreground mt-4">
                Note: Rates and pity systems can change. Always check the current in-game details before pulling. Soft pity mechanics may increase rates before hard pity.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">
                Understanding Gacha Probability Mechanics
              </h3>
              <div className="space-y-4 text-sm text-muted-foreground">
                <div>
                  <h4 className="font-medium text-foreground mb-2">Why Multiple Pulls Increase Your Odds</h4>
                  <p>
                    Each pull is an independent event with the same base rate. But the probability of getting
                    at least one success increases with more attempts. At 1% rate, one pull has 1% chance.
                    Ten pulls have about 9.6% chance (1 - 0.99^10). Ninety pulls reach about 59% chance.
                    This is why saving for bulk pulls is smarter than spending on single pulls.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-foreground mb-2">How Pity Systems Work</h4>
                  <p>
                    Pity guarantees a rare item after a set number of pulls without one. Soft pity gradually
                    increases the rate starting around 70-80% of the pity count. Hard pity guarantees at
                    the maximum. In Genshin Impact, for example, soft pity starts around pull 74, dramatically
                    increasing your odds before the guaranteed pull 90.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-foreground mb-2">Expected Value vs Guaranteed Results</h4>
                  <p>
                    Expected pulls (1/p) is the average number needed, not a guarantee. At 1% rate, you
                    expect one success every 100 pulls on average. But half of players will need more than
                    100 pulls. Pity systems exist because the mathematical expectation does not guarantee
                    results for individual players.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">
                Tips for Responsible Gacha Spending
              </h3>
              <div className="space-y-4 text-sm text-muted-foreground">
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Set a strict budget before pulling</p>
                    <p>Decide the maximum you will spend before opening the game. Stop when you hit that limit, regardless of results. Never chase losses by spending more than planned.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Save for pity rather than gambling</p>
                    <p>If a character costs 90 pulls for pity, save enough for 90 pulls before the banner starts. Pulling without enough for pity risks getting nothing. Patience pays off in gacha games.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Use free currency strategically</p>
                    <p>Hoard primogems, jades, and tickets for banners you truly want. Don't spend on every banner. Free-to-play players can accumulate enough for 1-2 guaranteed pulls per patch by saving consistently.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Remember: every account gets unlucky sometimes</p>
                    <p>Probability means some players lose 50/50s and hit pity early. This is normal variance, not rigged systems. Accept that luck varies and plan your pulls accordingly.</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <section className="container mx-auto px-4 py-12 mb-12">
  <h2 className="text-3xl font-semibold mb-8 text-center">
    Frequently Asked Questions
  </h2>
  <Faqs faqs={[
{
    question: "How many pulls do I need for a 50% chance?",
    answer: "Use the formula: pulls = ln(0.5) / ln(1-p). At 1% rate, you need about 69 pulls for 50% chance. At 0.6% (Genshin 5-star), you need about 116 pulls. This is why pity systems are important - without them, half of players would fail even at expected pull counts.",
  },
{
    question: "What is soft pity?",
    answer: "Soft pity is a hidden mechanic that increases your pull rate after a certain number of pulls. In Genshin Impact, the 0.6% rate starts increasing around pull 74, reaching nearly 100% by pull 90. This means most players get their 5-star between pulls 75-85, not at the full 90 pity.",
  },
{
    question: "Is it worth pulling on rate-up banners?",
    answer: "Rate-up banners typically have 50% chance to get the featured character when you pull a 5-star. If you lose the 50/50, the next 5-star is guaranteed featured. Consider whether you have enough pulls to guarantee the character (worst case: lose 50/50, then hit pity again). If not, skipping may be wiser.",
  },
{
    question: "How much should I spend on gacha games?",
    answer: "Only spend money you can afford to lose completely. A common guideline is to treat gacha like entertainment: set a monthly budget similar to what you might spend on movies or dining out. Never spend rent money, emergency funds, or borrowed money on gacha pulls.",
  },
{
    question: "Can I calculate exact costs for guaranteed pulls?",
    answer: "Yes. Multiply the pity count by cost per pull. In Genshin, 90 pulls at $2.50 each equals $225 for hard pity. However, soft pity means most players spend less - around $175-200 on average for a guaranteed 5-star. Always budget for worst case though.",
  }
  ]} />
</section>

        </div>
      </div>
    </div>
  );
}
