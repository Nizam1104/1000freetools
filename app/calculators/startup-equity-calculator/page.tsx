"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function StartupEquityCalculatorPage() {
  const [founderShares, setFounderShares] = useState<string>("");
  const [optionPool, setOptionPool] = useState<string>("");
  const [seedInvestment, setSeedInvestment] = useState<string>("");
  const [seedValuation, setSeedValuation] = useState<string>("");
  const [seriesAInvestment, setSeriesAInvestment] = useState<string>("");
  const [seriesAValuation, setSeriesAValuation] = useState<string>("");
  const [result, setResult] = useState<{
    totalShares: number;
    founderPercent: number;
    optionPoolPercent: number;
    seedPercent: number;
    seriesAPercent: number;
    dilution: number;
  } | null>(null);

  const calculateEquity = () => {
    const founder = parseFloat(founderShares);
    const options = parseFloat(optionPool);
    const seedInv = parseFloat(seedInvestment) || 0;
    const seedVal = parseFloat(seedValuation) || 0;
    const seriesAInv = parseFloat(seriesAInvestment) || 0;
    const seriesAVal = parseFloat(seriesAValuation) || 0;

    if (isNaN(founder) || isNaN(options) || founder <= 0) {
      return;
    }

    let totalShares = founder + options;
    let seedShares = 0;
    let seriesAShares = 0;

    // Seed round
    if (seedInv > 0 && seedVal > 0) {
      const seedPercent = seedInv / seedVal;
      seedShares = (founder + options) * seedPercent / (1 - seedPercent);
      totalShares += seedShares;
    }

    // Series A round
    if (seriesAInv > 0 && seriesAVal > 0) {
      const seriesAPercent = seriesAInv / seriesAVal;
      seriesAShares = totalShares * seriesAPercent / (1 - seriesAPercent);
      totalShares += seriesAShares;
    }

    const founderPercent = (founder / totalShares) * 100;
    const optionPoolPercent = (options / totalShares) * 100;
    const seedPercentCalc = (seedShares / totalShares) * 100;
    const seriesAPercentCalc = (seriesAShares / totalShares) * 100;
    const dilution = 100 - founderPercent;

    setResult({
      totalShares: Math.round(totalShares),
      founderPercent,
      optionPoolPercent,
      seedPercent: seedPercentCalc,
      seriesAPercent: seriesAPercentCalc,
      dilution,
    });
  };

  const reset = () => {
    setFounderShares("");
    setOptionPool("");
    setSeedInvestment("");
    setSeedValuation("");
    setSeriesAInvestment("");
    setSeriesAValuation("");
    setResult(null);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl font-semibold tracking-tight mb-2">Startup Equity Calculator</h1>
          <p className="text-muted-foreground">
            Model your cap table across multiple funding rounds. Calculate founder and investor equity percentages accounting for dilution, option pools, and valuations.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardContent className="p-6 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="founderShares">Founder Shares</Label>
                <Input
                  id="founderShares"
                  type="number"
                  placeholder="Enter founder shares"
                  value={founderShares}
                  onChange={(e) => setFounderShares(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="optionPool">Option Pool Shares</Label>
                <Input
                  id="optionPool"
                  type="number"
                  placeholder="Enter option pool"
                  value={optionPool}
                  onChange={(e) => setOptionPool(e.target.value)}
                />
              </div>

              <div className="pt-2">
                <Label className="text-sm font-semibold">Seed Round (Optional)</Label>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <Input id="seedInvestment" type="number" placeholder="Investment" value={seedInvestment} onChange={(e) => setSeedInvestment(e.target.value)} />
                <Input id="seedValuation" type="number" placeholder="Pre-money Valuation" value={seedValuation} onChange={(e) => setSeedValuation(e.target.value)} />
              </div>

              <div className="pt-2">
                <Label className="text-sm font-semibold">Series A (Optional)</Label>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <Input id="seriesAInvestment" type="number" placeholder="Investment" value={seriesAInvestment} onChange={(e) => setSeriesAInvestment(e.target.value)} />
                <Input id="seriesAValuation" type="number" placeholder="Pre-money Valuation" value={seriesAValuation} onChange={(e) => setSeriesAValuation(e.target.value)} />
              </div>

              <div className="flex gap-2 pt-4">
                <Button onClick={calculateEquity} className="flex-1">
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
              <h3 className="text-lg font-semibold mb-4">Cap Table</h3>
              {result ? (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between items-center p-3 bg-primary/10 rounded-lg">
                      <span>Founders</span>
                      <span className="font-bold text-primary">{result.founderPercent.toFixed(1)}%</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-muted rounded-lg">
                      <span>Option Pool</span>
                      <span className="font-bold">{result.optionPoolPercent.toFixed(1)}%</span>
                    </div>
                    {result.seedPercent > 0 && (
                      <div className="flex justify-between items-center p-3 bg-muted rounded-lg">
                        <span>Seed Investors</span>
                        <span className="font-bold">{result.seedPercent.toFixed(1)}%</span>
                      </div>
                    )}
                    {result.seriesAPercent > 0 && (
                      <div className="flex justify-between items-center p-3 bg-muted rounded-lg">
                        <span>Series A Investors</span>
                        <span className="font-bold">{result.seriesAPercent.toFixed(1)}%</span>
                      </div>
                    )}
                  </div>
                  <div className="p-4 bg-orange-100 dark:bg-orange-900/20 rounded-lg">
                    <p className="text-sm text-muted-foreground">Total Dilution</p>
                    <p className="text-lg font-bold text-orange-600">{result.dilution.toFixed(1)}%</p>
                  </div>
                  <div className="text-sm text-muted-foreground pt-4 border-t">
                    <p>Total Shares: {result.totalShares.toLocaleString()}</p>
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
      </div>
    </div>
  );
}
