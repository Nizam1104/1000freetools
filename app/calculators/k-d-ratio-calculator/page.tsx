"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface KDResult {
  kdRatio: number;
  kdAssessment: string;
  percentileEstimate: string;
  kills: number;
  deaths: number;
  assists?: number;
  kdaRatio?: number;
  recommendations: string[];
}

export default function KDRatioCalculatorPage() {
  const [kills, setKills] = useState<string>("");
  const [deaths, setDeaths] = useState<string>("");
  const [assists, setAssists] = useState<string>("");
  const [gameType, setGameType] = useState<string>("fps");
  const [result, setResult] = useState<KDResult | null>(null);

  const calculate = () => {
    const killsNum = parseInt(kills) || 0;
    const deathsNum = parseInt(deaths) || 1; // Avoid division by zero
    const assistsNum = parseInt(assists) || 0;

    if (deathsNum === 0) return;

    // K/D Ratio = Kills / Deaths
    const kdRatio = killsNum / deathsNum;

    // KDA Ratio (for games with assists) = (Kills + Assists) / Deaths
    const kdaRatio = (killsNum + assistsNum) / deathsNum;

    // Assessment based on K/D ratio
    let kdAssessment = "";
    let percentileEstimate = "";
    const recommendations: string[] = [];

    if (kdRatio >= 4) {
      kdAssessment = "Exceptional - Top tier player";
      percentileEstimate = "Top 1-5% of players";
      recommendations.push("🏆 Elite performance! Consider coaching others.");
      recommendations.push("Focus on maintaining consistency across matches.");
    } else if (kdRatio >= 3) {
      kdAssessment = "Excellent - Highly skilled";
      percentileEstimate = "Top 10-15% of players";
      recommendations.push("🎯 Great job! Work on game sense to reach elite level.");
    } else if (kdRatio >= 2) {
      kdAssessment = "Good - Above average";
      percentileEstimate = "Top 25-30% of players";
      recommendations.push("👍 Solid performance. Focus on positioning and map awareness.");
      recommendations.push("Review death replays to identify patterns.");
    } else if (kdRatio >= 1.5) {
      kdAssessment = "Decent - Slightly above average";
      percentileEstimate = "40-50th percentile";
      recommendations.push("📈 You&apos;re improving! Work on aim and game knowledge.");
      recommendations.push("Practice in aim trainers for mechanical improvement.");
    } else if (kdRatio >= 1) {
      kdAssessment = "Average - Balanced";
      percentileEstimate = "50th percentile (median)";
      recommendations.push("⚖️ You trade evenly. Focus on survival and positioning.");
      recommendations.push("Play more defensively to reduce deaths.");
    } else if (kdRatio >= 0.75) {
      kdAssessment = "Below Average - Room for improvement";
      percentileEstimate = "30-40th percentile";
      recommendations.push("📚 Focus on fundamentals: positioning, map knowledge, crosshair placement.");
      recommendations.push("Watch educational content from pro players.");
    } else if (kdRatio >= 0.5) {
      kdAssessment = "Struggling - Significant improvement needed";
      percentileEstimate = "15-25th percentile";
      recommendations.push("🎮 Spend time in practice modes before ranked matches.");
      recommendations.push("Consider playing less competitive modes to build skills.");
    } else {
      kdAssessment = "Very Low - Focus on learning";
      percentileEstimate = "Bottom 15% of players";
      recommendations.push("🌱 Everyone starts somewhere! Focus on learning fundamentals.");
      recommendations.push("Play with more experienced friends for guidance.");
      recommendations.push("Consider tutorial videos for your specific game.");
    }

    setResult({
      kdRatio: parseFloat(kdRatio.toFixed(2)),
      kdAssessment,
      percentileEstimate,
      kills: killsNum,
      deaths: deathsNum,
      assists: assistsNum,
      kdaRatio: parseFloat(kdaRatio.toFixed(2)),
      recommendations,
    });
  };

  const reset = () => {
    setKills("");
    setDeaths("");
    setAssists("");
    setResult(null);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl font-semibold tracking-tight mb-2">
            K/D Ratio Calculator – Calculate Your Kill/Death Ratio in Any Game
          </h1>
          <p className="text-muted-foreground">
            Track your combat performance with our K/D Ratio Calculator.
            Enter your total kills and deaths to instantly calculate your Kill/Death ratio —
            the most popular metric for measuring skill in FPS and battle royale games.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardContent className="p-6 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="game-type">Game Type</Label>
                <select
                  id="game-type"
                  value={gameType}
                  onChange={(e) => setGameType(e.target.value)}
                  className="w-full p-2 border rounded-md bg-background"
                >
                  <option value="fps">FPS (K/D Ratio)</option>
                  <option value="moba">MOBA (KDA with Assists)</option>
                  <option value="battle-royale">Battle Royale</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div className="space-y-1">
                  <Label htmlFor="kills">Total Kills</Label>
                  <Input
                    id="kills"
                    type="number"
                    value={kills}
                    onChange={(e) => setKills(e.target.value)}
                    placeholder="0"
                  />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="deaths">Total Deaths</Label>
                  <Input
                    id="deaths"
                    type="number"
                    value={deaths}
                    onChange={(e) => setDeaths(e.target.value)}
                    placeholder="0"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <Label htmlFor="assists">Total Assists (optional)</Label>
                <Input
                  id="assists"
                  type="number"
                  value={assists}
                  onChange={(e) => setAssists(e.target.value)}
                  placeholder="0"
                />
                <p className="text-xs text-muted-foreground">
                  Used for KDA calculation in MOBA games
                </p>
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
              <h3 className="text-lg font-semibold mb-4">Results</h3>
              {result ? (
                <div className="space-y-4">
                  <div className={`p-4 rounded-lg text-center ${
                    result.kdRatio >= 2 ? "bg-green-100 dark:bg-green-900/20" :
                    result.kdRatio >= 1 ? "bg-blue-100 dark:bg-blue-900/20" :
                    result.kdRatio >= 0.75 ? "bg-amber-100 dark:bg-amber-900/20" :
                    "bg-red-100 dark:bg-red-900/20"
                  }`}>
                    <p className="text-sm text-muted-foreground">K/D Ratio</p>
                    <p className="text-5xl font-bold">{result.kdRatio}</p>
                    <p className="text-sm mt-2 font-medium">{result.kdAssessment}</p>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-3 bg-muted rounded-lg text-center">
                      <p className="text-xs text-muted-foreground">Percentile</p>
                      <p className="text-sm font-semibold">{result.percentileEstimate}</p>
                    </div>
                    {result.kdaRatio && (
                      <div className="p-3 bg-muted rounded-lg text-center">
                        <p className="text-xs text-muted-foreground">KDA Ratio</p>
                        <p className="text-lg font-semibold">{result.kdaRatio}</p>
                      </div>
                    )}
                  </div>

                  <div className="p-4 bg-muted rounded-lg space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Kills:</span>
                      <span className="font-semibold">{result.kills}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Deaths:</span>
                      <span className="font-semibold">{result.deaths}</span>
                    </div>
                    {result.assists !== undefined && (
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Assists:</span>
                        <span className="font-semibold">{result.assists}</span>
                      </div>
                    )}
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
                  <p>Enter your stats and click Calculate to see results</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="mt-8 space-y-6">
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">
                Understanding K/D Ratio
              </h3>
              <div className="space-y-3 text-sm text-muted-foreground">
                <p>
                  K/D Ratio (Kill/Death Ratio) is a fundamental statistic in competitive
                  gaming that measures your combat effectiveness.
                </p>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>
                    <strong>Formula:</strong> K/D = Total Kills / Total Deaths
                  </li>
                  <li>
                    <strong>KDA:</strong> (Kills + Assists) / Deaths (used in MOBAs)
                  </li>
                  <li>
                    <strong>1.0 K/D:</strong> You break even (equal kills and deaths)
                  </li>
                  <li>
                    <strong>&gt;1.0 K/D:</strong> Positive ratio (more kills than deaths)
                  </li>
                  <li>
                    <strong>&lt;1.0 K/D:</strong> Negative ratio (more deaths than kills)
                  </li>
                </ul>
                <p>
                  <strong>Note:</strong> K/D is just one metric. Team play, objectives,
                  and game sense are equally important for winning matches.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
