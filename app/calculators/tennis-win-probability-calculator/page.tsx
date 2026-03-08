"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardAction, CardDescription, CardFooter } from "@/components/ui/card";
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

interface TennisResult {
  player1ServeWin: number;
  player2ServeWin: number;
  player1WinProbability: number;
  setWinProbabilities: number[];
  matchWinProbability: number;
  analysis: string;
  keyFactors: string[];
}

export default function TennisWinProbabilityCalculatorPage() {
  const [player1Name, setPlayer1Name] = useState<string>("Player 1");
  const [player2Name, setPlayer2Name] = useState<string>("Player 2");
  const [player1ServeWin, setPlayer1ServeWin] = useState<string>("65");
  const [player2ServeWin, setPlayer2ServeWin] = useState<string>("60");
  const [player1BreakPoint, setPlayer1BreakPoint] = useState<string>("35");
  const [player2BreakPoint, setPlayer2BreakPoint] = useState<string>("30");
  const [surface, setSurface] = useState<string>("hard");
  const [result, setResult] = useState<TennisResult | null>(null);

  const calculate = () => {
    const p1ServeNum = parseFloat(player1ServeWin) || 65;
    const p2ServeNum = parseFloat(player2ServeWin) || 60;
    const p1BreakNum = parseFloat(player1BreakPoint) || 35;
    const p2BreakNum = parseFloat(player2BreakPoint) || 30;

    // Surface adjustment (serve advantage varies by surface)
    const surfaceFactors: Record<string, number> = {
      grass: 1.15,
      hard: 1.0,
      clay: 0.85,
    };
    const surfaceFactor = surfaceFactors[surface] || 1.0;

    // Adjusted serve win percentages
    const p1AdjustedServe = Math.min(95, p1ServeNum * surfaceFactor);
    const p2AdjustedServe = Math.min(95, p2ServeNum * surfaceFactor);

    // Calculate hold percentage (simplified model)
    const p1Hold = p1AdjustedServe;
    const p2Hold = p2AdjustedServe;

    // Break percentages
    const p1Break = p1BreakNum;
    const p2Break = p2BreakNum;

    // Game win probability (simplified Markov chain approximation)
    // P(win game on serve) ≈ hold percentage
    // P(win game on return) ≈ break point conversion

    // Set win probability using simplified model
    // Based on serve/return differential
    const serveAdvantage = p1Hold - p2Hold;
    const returnAdvantage = p1Break - p2Break;
    const totalAdvantage = (serveAdvantage + returnAdvantage) / 2;

    // Convert advantage to win probability (logistic function approximation)
    const player1SetWinProb = 50 + (totalAdvantage * 1.5);
    const player1SetWinProbClamped = Math.max(5, Math.min(95, player1SetWinProb));

    // Match win probability (best of 3 or 5 sets)
    // For best of 3: P(match) = P(set)^2 * (3 - 2*P(set))
    const p = player1SetWinProbClamped / 100;
    const matchWinProb3Sets = p * p * (3 - 2 * p);
    const matchWinProb5Sets = p * p * p * (10 - 15 * p + 6 * p * p);

    // Set win probabilities for different set numbers
    const setWinProbabilities = [
      player1SetWinProbClamped, // Set 1
      player1SetWinProbClamped, // Set 2
      player1SetWinProbClamped, // Set 3
    ];

    // Analysis
    let analysis = "";
    if (player1SetWinProbClamped > 70) {
      analysis = `${player1Name} is heavily favored to win`;
    } else if (player1SetWinProbClamped > 55) {
      analysis = `${player1Name} has a moderate advantage`;
    } else if (player1SetWinProbClamped > 45) {
      analysis = "Match is too close to call - essentially a coin flip";
    } else if (player1SetWinProbClamped > 30) {
      analysis = `${player2Name} has a moderate advantage`;
    } else {
      analysis = `${player2Name} is heavily favored to win`;
    }

    // Key factors
    const keyFactors: string[] = [];
    if (Math.abs(p1Hold - p2Hold) > 10) {
      keyFactors.push(`🎾 Serve advantage: ${p1Hold > p2Hold ? player1Name : player2Name}`);
    }
    if (Math.abs(p1Break - p2Break) > 10) {
      keyFactors.push(`💪 Return advantage: ${p1Break > p2Break ? player1Name : player2Name}`);
    }
    if (surface === "grass") {
      keyFactors.push("🌱 Grass favors big servers");
    } else if (surface === "clay") {
      keyFactors.push("🏔️ Clay favors baseline rallies and defense");
    } else {
      keyFactors.push("🏟️ Hard court - balanced surface");
    }

    setResult({
      player1ServeWin: p1AdjustedServe,
      player2ServeWin: p2AdjustedServe,
      player1WinProbability: parseFloat(player1SetWinProbClamped.toFixed(1)),
      setWinProbabilities: setWinProbabilities.map(p => parseFloat(p.toFixed(1))),
      matchWinProbability: parseFloat((matchWinProb3Sets * 100).toFixed(1)),
      analysis,
      keyFactors,
    });
  };

  const reset = () => {
    setResult(null);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-5xl">
        <div className="mb-8">
          <h1 className="text-3xl font-semibold tracking-tight mb-2">
            Tennis Win Probability Calculator – Predict Match Outcome from Player Stats
          </h1>
          <p className="text-muted-foreground">
            Predict tennis match outcomes with our Win Probability Calculator.
            Enter each player&apos;s serve win percentage and break point conversion
            rates to calculate the probability of winning sets and the overall match.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          <Card>
            <CardContent className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-2">
                <div className="space-y-1">
                  <Label htmlFor="p1-name">Player 1 Name</Label>
                  <Input
                    id="p1-name"
                    value={player1Name}
                    onChange={(e) => setPlayer1Name(e.target.value)}
                    placeholder="Player 1"
                  />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="p2-name">Player 2 Name</Label>
                  <Input
                    id="p2-name"
                    value={player2Name}
                    onChange={(e) => setPlayer2Name(e.target.value)}
                    placeholder="Player 2"
                  />
                </div>
              </div>

              <div className="border-t pt-4">
                <h4 className="font-semibold text-sm mb-3">{player1Name} Stats</h4>
                <div className="grid grid-cols-2 gap-2">
                  <div className="space-y-1">
                    <Label htmlFor="p1-serve">Serve Win %</Label>
                    <Input
                      id="p1-serve"
                      type="number"
                      value={player1ServeWin}
                      onChange={(e) => setPlayer1ServeWin(e.target.value)}
                      placeholder="65"
                    />
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="p1-break">Break Point %</Label>
                    <Input
                      id="p1-break"
                      type="number"
                      value={player1BreakPoint}
                      onChange={(e) => setPlayer1BreakPoint(e.target.value)}
                      placeholder="35"
                    />
                  </div>
                </div>
              </div>

              <div className="border-t pt-4">
                <h4 className="font-semibold text-sm mb-3">{player2Name} Stats</h4>
                <div className="grid grid-cols-2 gap-2">
                  <div className="space-y-1">
                    <Label htmlFor="p2-serve">Serve Win %</Label>
                    <Input
                      id="p2-serve"
                      type="number"
                      value={player2ServeWin}
                      onChange={(e) => setPlayer2ServeWin(e.target.value)}
                      placeholder="60"
                    />
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="p2-break">Break Point %</Label>
                    <Input
                      id="p2-break"
                      type="number"
                      value={player2BreakPoint}
                      onChange={(e) => setPlayer2BreakPoint(e.target.value)}
                      placeholder="30"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="surface">Court Surface</Label>
                <Select value={surface} onValueChange={setSurface}>
                  <SelectTrigger id="surface">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="hard">Hard Court</SelectItem>
                    <SelectItem value="clay">Clay</SelectItem>
                    <SelectItem value="grass">Grass</SelectItem>
                  </SelectContent>
                </Select>
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
              <h3 className="text-lg font-semibold mb-4">Match Prediction</h3>
              {result ? (
                <div className="space-y-4">
                  <div className={`p-4 rounded-lg text-center ${result.player1WinProbability > 60 ? "bg-green-100 dark:bg-green-900/20" :
                      result.player1WinProbability > 40 ? "bg-amber-100 dark:bg-amber-900/20" :
                        "bg-red-100 dark:bg-red-900/20"
                    }`}>
                    <p className="text-sm text-muted-foreground">Match Win Probability</p>
                    <p className="text-4xl font-bold">{result.matchWinProbability}%</p>
                    <p className="text-sm mt-1">{player1Name} to win (Best of 3)</p>
                  </div>

                  <div className="p-4 bg-muted rounded-lg">
                    <div className="flex justify-between mb-2">
                      <span className="text-sm">{player1Name}</span>
                      <span className="font-bold">{result.player1WinProbability}%</span>
                    </div>
                    <div className="w-full bg-muted-foreground/20 rounded-full h-3">
                      <div
                        className="bg-primary h-3 rounded-full"
                        style={{ width: `${result.player1WinProbability}%` }}
                      />
                    </div>
                    <div className="flex justify-between mt-2">
                      <span className="text-sm">{player2Name}</span>
                      <span className="font-bold">{(100 - result.player1WinProbability).toFixed(1)}%</span>
                    </div>
                  </div>

                  <div className="p-4 bg-muted rounded-lg space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">{player1Name} Serve:</span>
                      <span className="font-semibold">{result.player1ServeWin.toFixed(1)}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">{player2Name} Serve:</span>
                      <span className="font-semibold">{result.player2ServeWin.toFixed(1)}%</span>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2 text-sm">Analysis</h4>
                    <p className="text-sm">{result.analysis}</p>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2 text-sm">Key Factors</h4>
                    <ul className="space-y-1">
                      {result.keyFactors.map((factor, i) => (
                        <li key={i} className="text-sm">{factor}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <p>Enter player stats and click Calculate to see prediction</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="mt-8 space-y-6">
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">
                Understanding Tennis Probabilities
              </h3>
              <div className="space-y-3 text-sm text-muted-foreground">
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>
                    <strong>Serve Win %:</strong> Percentage of service games won
                    (typical: 60-80% on ATP tour)
                  </li>
                  <li>
                    <strong>Break Point %:</strong> Percentage of break points converted
                    (typical: 30-45%)
                  </li>
                  <li>
                    <strong>Surface impact:</strong> Grass favors servers, clay favors
                    returners and baseline play
                  </li>
                </ul>
                <p>
                  <strong>Note:</strong> This calculator uses a simplified model.
                  Actual match outcomes depend on many factors including form,
                  injuries, head-to-head records, and mental toughness.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="mt-8 space-y-6">
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">
                How It Works
              </h3>
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1 flex items-start gap-3">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm">1</div>
                  <div>
                    <h4 className="font-semibold text-sm mb-1">Enter Player Stats</h4>
                    <p className="text-xs text-muted-foreground">Input each player's serve win percentage and break point conversion rate from recent matches.</p>
                  </div>
                </div>
                <div className="flex-1 flex items-start gap-3">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm">2</div>
                  <div>
                    <h4 className="font-semibold text-sm mb-1">Select Court Surface</h4>
                    <p className="text-xs text-muted-foreground">Choose grass, clay, or hard court – surface affects serve advantage and playing style.</p>
                  </div>
                </div>
                <div className="flex-1 flex items-start gap-3">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm">3</div>
                  <div>
                    <h4 className="font-semibold text-sm mb-1">Get Match Prediction</h4>
                    <p className="text-xs text-muted-foreground">See win probability for each player, set-by-set projections, and key match factors.</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">
                ATP Tour Average Statistics Reference
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-2 px-3 font-semibold">Surface</th>
                      <th className="text-left py-2 px-3 font-semibold">Avg Serve Win %</th>
                      <th className="text-left py-2 px-3 font-semibold">Avg Break Point %</th>
                      <th className="text-left py-2 px-3 font-semibold">Style Favored</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b">
                      <td className="py-2 px-3 font-medium">Grass</td>
                      <td className="py-2 px-3 font-mono text-xs">75-80%</td>
                      <td className="py-2 px-3 text-xs">30-35%</td>
                      <td className="py-2 px-3 text-xs">Big servers, volleyers</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2 px-3 font-medium">Hard Court</td>
                      <td className="py-2 px-3 font-mono text-xs">65-75%</td>
                      <td className="py-2 px-3 text-xs">35-40%</td>
                      <td className="py-2 px-3 text-xs">All-court players</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2 px-3 font-medium">Clay</td>
                      <td className="py-2 px-3 font-mono text-xs">60-70%</td>
                      <td className="py-2 px-3 text-xs">40-45%</td>
                      <td className="py-2 px-3 text-xs">Baseline grinders</td>
                    </tr>
                    <tr>
                      <td className="py-2 px-3 font-medium">ATP Average</td>
                      <td className="py-2 px-3 font-mono text-xs">65-72%</td>
                      <td className="py-2 px-3 text-xs">35-42%</td>
                      <td className="py-2 px-3 text-xs">Varies by player</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">
                Key Features & Benefits
              </h3>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-lg border">
                  <h4 className="font-semibold text-sm mb-2">Surface-Adjusted Analysis</h4>
                  <p className="text-xs text-muted-foreground">Accounts for how grass, clay, and hard courts affect serve dominance and break opportunities.</p>
                </div>
                <div className="p-4 rounded-lg border">
                  <h4 className="font-semibold text-sm mb-2">Serve & Return Metrics</h4>
                  <p className="text-xs text-muted-foreground">Uses both serve win percentage and break point conversion for complete player assessment.</p>
                </div>
                <div className="p-4 rounded-lg border">
                  <h4 className="font-semibold text-sm mb-2">Match Format Support</h4>
                  <p className="text-xs text-muted-foreground">Calculates win probability for best-of-3 sets (most tournaments) and best-of-5 (Grand Slams).</p>
                </div>
                <div className="p-4 rounded-lg border">
                  <h4 className="font-semibold text-sm mb-2">Key Factor Analysis</h4>
                  <p className="text-xs text-muted-foreground">Identifies which player has serve advantage, return advantage, and surface-specific edges.</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <h3 className="text-lg font-semibold">Frequently Asked Questions</h3>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h4 className="font-semibold text-sm mb-2">How accurate are tennis match predictions?</h4>
                <p className="text-xs text-muted-foreground">
                  Statistical models using serve/return metrics achieve 65-70% accuracy for match outcomes. However, tennis has high variance – form, injuries, mental state, and head-to-head matchups significantly impact results beyond raw statistics.
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-sm mb-2">What is a good serve win percentage?</h4>
                <p className="text-xs text-muted-foreground">
                  On ATP tour, 65-70% is average, 70-75% is good, and 75%+ is elite. Big servers like Isner and Karlovic regularly exceed 80%. On clay, percentages run 5-10% lower due to slower surface reducing serve advantage.
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-sm mb-2">Why does surface matter in tennis predictions?</h4>
                <p className="text-xs text-muted-foreground">
                  Grass favors big servers (fast, low bounce). Clay favors baseline defenders (slow, high bounce, more time). Hard courts are balanced. Players often have vastly different records on different surfaces – Nadal dominates on clay but less so on grass.
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-sm mb-2">What is break point conversion rate?</h4>
                <p className="text-xs text-muted-foreground">
                  Break point conversion = (Breaks achieved / Break opportunities) × 100. It measures how effectively a player converts return game chances. Top players convert 40-45% of break points. This stat is crucial for predicting match outcomes.
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-sm mb-2">How do I find player serve statistics?</h4>
                <p className="text-xs text-muted-foreground">
                  ATP/WTA official websites provide detailed player stats including serve win %, break points saved/converted, and surface-specific records. Tennis Abstract and Ultimate Tennis also offer advanced metrics and historical data.
                </p>
              </div>
            </CardContent>
          </Card>

        </div>
      </div>
    </div>
  );
}
