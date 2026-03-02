"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface WinRateResult {
  wins: number;
  losses: number;
  draws: number;
  totalGames: number;
  winRate: number;
  winLossRatio: number;
  assessment: string;
  recommendations: string[];
}

export default function WinRateEstimatorPage() {
  const [wins, setWins] = useState<string>("");
  const [losses, setLosses] = useState<string>("");
  const [draws, setDraws] = useState<string>("");
  const [result, setResult] = useState<WinRateResult | null>(null);

  const calculate = () => {
    const winsNum = parseInt(wins) || 0;
    const lossesNum = parseInt(losses) || 0;
    const drawsNum = parseInt(draws) || 0;

    const totalGames = winsNum + lossesNum + drawsNum;

    if (totalGames === 0) return;

    // Win rate (wins / total games)
    const winRate = (winsNum / totalGames) * 100;

    // Win/Loss ratio (not counting draws)
    const winLossRatio = lossesNum > 0 ? winsNum / lossesNum : winsNum > 0 ? Infinity : 0;

    // Assessment
    let assessment = "";
    if (winRate >= 70) {
      assessment = "🏆 Excellent - Top tier player";
    } else if (winRate >= 60) {
      assessment = "✅ Great - Above average";
    } else if (winRate >= 50) {
      assessment = "⚖️ Average - Balanced record";
    } else if (winRate >= 40) {
      assessment = "📉 Below Average - Room for improvement";
    } else {
      assessment = "⚠️ Struggling - Focus on learning fundamentals";
    }

    // Recommendations
    const recommendations: string[] = [];

    if (winRate >= 60) {
      recommendations.push("🎯 Consider competitive play or ranked modes");
      recommendations.push("📊 Analyze replays to find marginal improvements");
    } else if (winRate >= 45) {
      recommendations.push("📚 Focus on fundamentals and consistency");
      recommendations.push("🎮 Review losses to identify patterns");
    } else {
      recommendations.push("🎓 Consider tutorials or coaching");
      recommendations.push("🎯 Focus on one character/role to master");
      recommendations.push("📈 Track specific stats beyond wins/losses");
    }

    if (winLossRatio > 2) {
      recommendations.push("🔥 On a hot streak - keep momentum!");
    } else if (winLossRatio < 0.5 && totalGames > 20) {
      recommendations.push("⏸️ Consider taking a break to avoid tilt");
    }

    recommendations.push(`📊 Games played: ${totalGames}`);
    if (drawsNum > 0) {
      recommendations.push(`🤝 Draws: ${drawsNum} (${((drawsNum/totalGames)*100).toFixed(1)}%)`);
    }

    setResult({
      wins: winsNum,
      losses: lossesNum,
      draws: drawsNum,
      totalGames,
      winRate: parseFloat(winRate.toFixed(1)),
      winLossRatio: winLossRatio === Infinity ? 999 : parseFloat(winLossRatio.toFixed(2)),
      assessment,
      recommendations,
    });
  };

  const reset = () => {
    setWins("");
    setLosses("");
    setDraws("");
    setResult(null);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl font-semibold tracking-tight mb-2">
            Win Rate Calculator – Calculate Your Gaming Win Rate & Win/Loss Ratio
          </h1>
          <p className="text-muted-foreground">
            Measure your competitive edge with our Win Rate Estimator. Enter total games
            played along with wins and losses to calculate your win rate percentage and
            win/loss ratio — valuable for tracking improvement across any competitive game.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardContent className="p-6 space-y-4">
              <div className="grid grid-cols-3 gap-2">
                <div className="space-y-1">
                  <Label htmlFor="wins">Wins</Label>
                  <Input
                    id="wins"
                    type="number"
                    value={wins}
                    onChange={(e) => setWins(e.target.value)}
                    placeholder="0"
                  />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="losses">Losses</Label>
                  <Input
                    id="losses"
                    type="number"
                    value={losses}
                    onChange={(e) => setLosses(e.target.value)}
                    placeholder="0"
                  />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="draws">Draws</Label>
                  <Input
                    id="draws"
                    type="number"
                    value={draws}
                    onChange={(e) => setDraws(e.target.value)}
                    placeholder="0"
                  />
                </div>
              </div>

              <div className="p-3 bg-muted/50 rounded-lg">
                <p className="text-xs text-muted-foreground font-medium mb-2">
                  Win Rate Guide:
                </p>
                <ul className="text-xs text-muted-foreground space-y-1">
                  <li>• 60%+ = Excellent</li>
                  <li>• 55-60% = Great</li>
                  <li>• 45-55% = Average</li>
                  <li>• &lt;45% = Needs improvement</li>
                </ul>
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
              <h3 className="text-lg font-semibold mb-4">Win Rate Analysis</h3>
              {result ? (
                <div className="space-y-4">
                  <div className={`p-4 rounded-lg text-center ${
                    result.winRate >= 60 ? "bg-green-100 dark:bg-green-900/20" :
                    result.winRate >= 50 ? "bg-blue-100 dark:bg-blue-900/20" :
                    result.winRate >= 40 ? "bg-amber-100 dark:bg-amber-900/20" :
                    "bg-red-100 dark:bg-red-900/20"
                  }`}>
                    <p className="text-sm text-muted-foreground">Win Rate</p>
                    <p className="text-5xl font-bold">{result.winRate}%</p>
                    <p className="text-sm mt-1">{result.assessment}</p>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-3 bg-muted rounded-lg text-center">
                      <p className="text-xs text-muted-foreground">W/L Ratio</p>
                      <p className="text-2xl font-bold">
                        {result.winLossRatio >= 999 ? '∞' : result.winLossRatio}
                      </p>
                    </div>
                    <div className="p-3 bg-muted rounded-lg text-center">
                      <p className="text-xs text-muted-foreground">Total Games</p>
                      <p className="text-2xl font-bold">{result.totalGames}</p>
                    </div>
                  </div>

                  <div className="p-4 bg-muted rounded-lg">
                    <div className="flex justify-between mb-2">
                      <span className="text-sm text-muted-foreground">Record:</span>
                      <span className="font-semibold">
                        {result.wins}W - {result.losses}L{result.draws > 0 ? ` - ${result.draws}D` : ''}
                      </span>
                    </div>
                    <div className="w-full bg-muted-foreground/20 rounded-full h-4">
                      <div
                        className="bg-green-500 h-4 rounded-l-full"
                        style={{ width: `${result.winRate}%` }}
                      />
                    </div>
                    <div className="flex justify-between mt-1 text-xs text-muted-foreground">
                      <span>Wins: {result.winRate}%</span>
                      <span>Losses: {((result.losses/result.totalGames)*100).toFixed(1)}%</span>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2 text-sm">Recommendations</h4>
                    <ul className="space-y-1">
                      {result.recommendations.map((rec, i) => (
                        <li key={i} className="text-sm">{rec}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <p>Enter your game record and click Calculate to see analysis</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="mt-8 space-y-6">
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">
                Understanding Win Rate Stats
              </h3>
              <div className="space-y-3 text-sm text-muted-foreground">
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>
                    <strong>Win Rate:</strong> Wins ÷ Total Games × 100
                  </li>
                  <li>
                    <strong>W/L Ratio:</strong> Wins ÷ Losses (higher is better)
                  </li>
                  <li>
                    <strong>Sample size:</strong> Need 50+ games for reliable stats
                  </li>
                  <li>
                    <strong>Ranked vs Unranked:</strong> Track separately for accuracy
                  </li>
                </ul>
                <p>
                  <strong>Tip:</strong> Win rate naturally converges to ~50% in
                  matchmaking systems as you climb. Focus on improvement, not just
                  the number. Track specific skills and stats for better feedback.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
