"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardAction, CardDescription, CardFooter } from "@/components/ui/card";
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

        <div className="mt-8 space-y-6">
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">
                How to Use This Loot Probability Calculator
              </h3>
              <div className="space-y-4 text-sm text-muted-foreground">
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary font-semibold">
                    1
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Enter the drop rate</p>
                    <p>Input the item's drop rate as a percentage. If the game says "1 in 200", enter 0.5 (because 1/200 = 0.5%). Check the game wiki or community resources for exact rates.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary font-semibold">
                    2
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Enter your planned attempts</p>
                    <p>How many kills, runs, or attempts are you planning? This could be boss kills, chest opens, or any action that has a chance to drop the item.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary font-semibold">
                    3
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Review your chances</p>
                    <p>See your probability of getting at least one drop, the expected number of drops, and how many attempts you need for 50% or 90% confidence.</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">
                Common Drop Rates in Games
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-2 font-semibold">Rarity</th>
                      <th className="text-left py-3 px-2 font-semibold">Drop Rate</th>
                      <th className="text-left py-3 px-2 font-semibold">1 in X</th>
                      <th className="text-left py-3 px-2 font-semibold">Attempts for 50%</th>
                      <th className="text-left py-3 px-2 font-semibold">Attempts for 90%</th>
                    </tr>
                  </thead>
                  <tbody className="text-muted-foreground">
                    <tr className="border-b">
                      <td className="py-3 px-2">Common</td>
                      <td className="py-3 px-2">50%</td>
                      <td className="py-3 px-2">2</td>
                      <td className="py-3 px-2">1</td>
                      <td className="py-3 px-2">4</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-3 px-2">Uncommon</td>
                      <td className="py-3 px-2">20%</td>
                      <td className="py-3 px-2">5</td>
                      <td className="py-3 px-2">4</td>
                      <td className="py-3 px-2">11</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-3 px-2">Rare</td>
                      <td className="py-3 px-2">5%</td>
                      <td className="py-3 px-2">20</td>
                      <td className="py-3 px-2">14</td>
                      <td className="py-3 px-2">45</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-3 px-2">Very Rare</td>
                      <td className="py-3 px-2">1%</td>
                      <td className="py-3 px-2">100</td>
                      <td className="py-3 px-2">69</td>
                      <td className="py-3 px-2">230</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-3 px-2">Ultra Rare</td>
                      <td className="py-3 px-2">0.5%</td>
                      <td className="py-3 px-2">200</td>
                      <td className="py-3 px-2">139</td>
                      <td className="py-3 px-2">460</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-2">Legendary</td>
                      <td className="py-3 px-2">0.1%</td>
                      <td className="py-3 px-2">1,000</td>
                      <td className="py-3 px-2">693</td>
                      <td className="py-3 px-2">2,302</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="text-xs text-muted-foreground mt-4">
                Note: These are example rates. Actual drop rates vary by game. The "attempts for X%" shows how many tries you need for that confidence level.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">
                Understanding Drop Probability
              </h3>
              <div className="space-y-4 text-sm text-muted-foreground">
                <p>
                  Drop rates work independently for each attempt. If an item has a 1% drop rate, each kill has exactly a 1% chance — the game doesn't "owe" you a drop after 99 failures. This is called independent probability, and it's why some players get the item on their first try while others farm for hundreds of attempts.
                </p>
                <p>
                  The probability of getting at least one drop in n attempts is calculated as: 1 - (1 - p)^n, where p is the drop rate as a decimal. For a 1% drop rate over 100 attempts: 1 - (0.99)^100 = 1 - 0.366 = 0.634, or about 63.4%. This means even after 100 attempts at a 1% rate, you still have about a 37% chance of getting nothing.
                </p>
                <p>
                  Expected drops are simpler: just multiply attempts by drop rate. At 1% over 100 attempts, you'd expect 1 drop on average. But "expected" doesn't mean guaranteed — the actual distribution follows a binomial pattern, so results vary widely between players.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">
                Farming Efficiency Tips
              </h3>
              <div className="space-y-4 text-sm text-muted-foreground">
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Know Your Break Points</p>
                    <p>For a 1% drop, 69 attempts give you 50% confidence. If you can't complete 69 runs in a session, consider farming something else with better rates or higher value per time invested.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Track Your Attempts</p>
                    <p>Keep a log of how many kills or runs you've done. It's easy to lose count, and knowing your attempt count helps you decide whether to keep farming or switch targets.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Consider Opportunity Cost</p>
                    <p>Farming one ultra-rare item for 500 attempts might be less efficient than farming three different rare items for 150 attempts each. Calculate expected value per hour, not just per attempt.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Watch for Drop Rate Buffs</p>
                    <p>Many games offer temporary drop rate increases through events, consumables, or group bonuses. A 1% drop becoming 1.5% cuts your expected attempts from 100 to 67 — a significant time savings.</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">
                Frequently Asked Questions
              </h3>
              <div className="space-y-4 text-sm text-muted-foreground">
                <div>
                  <h4 className="font-medium text-foreground mb-2">Why haven't I gotten the item after X attempts?</h4>
                  <p>
                    Bad luck is real in random systems. Even at 1% drop rate, about 37% of players will go 100+ attempts without a drop. The probability never reaches 100% — there's always a chance (however tiny) you could farm forever and never get it. That's the nature of independent random events.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-foreground mb-2">Do drop rates increase after failures?</h4>
                  <p>
                    Usually no. Most games use true random with fixed rates. Some implement "pity timers" or "bad luck protection" that increase rates after many failures, but this is explicitly stated when it exists. Don't assume your game has this unless the developer confirms it.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-foreground mb-2">Is it better to farm in groups or solo?</h4>
                  <p>
                    Groups often kill faster but split loot rolls. If a group of 4 kills 3x faster than solo, each player gets 0.75x the rolls per hour. However, groups can tackle harder content with better drop tables. Calculate expected drops per hour, not per kill.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-foreground mb-2">What does "expected drops" mean?</h4>
                  <p>
                    Expected value is the average result over many trials. At 1% over 100 attempts, expected drops = 1. But you might get 0, 1, 2, or more. The expected value tells you what would happen on average across thousands of players, not what will happen to you specifically.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-foreground mb-2">How do I find drop rates for my game?</h4>
                  <p>
                    Check the game's official wiki, community Discords, Reddit subs, or fan sites. Some games display rates directly (required by law in some countries for loot boxes). For MMOs, players often datamine or crowdsource rates from thousands of kills.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">
                Related Tools
              </h3>
              <div className="space-y-2 text-sm">
                <a
                  href="/calculators/drop-rate-calculator"
                  className="block p-3 bg-muted/50 rounded-lg hover:bg-muted transition-colors"
                >
                  <span className="font-medium text-foreground">Drop Rate Calculator</span>
                  <p className="text-muted-foreground">Calculate actual drop rates from your farming data and number of drops received</p>
                </a>
                <a
                  href="/calculators/probability-calculator"
                  className="block p-3 bg-muted/50 rounded-lg hover:bg-muted transition-colors"
                >
                  <span className="font-medium text-foreground">Probability Calculator</span>
                  <p className="text-muted-foreground">Calculate probabilities for various events using different probability distributions</p>
                </a>
                <a
                  href="/calculators/percentage-calculator"
                  className="block p-3 bg-muted/50 rounded-lg hover:bg-muted transition-colors"
                >
                  <span className="font-medium text-foreground">Percentage Calculator</span>
                  <p className="text-muted-foreground">Calculate percentages, percentage change, and percentage differences</p>
                </a>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
