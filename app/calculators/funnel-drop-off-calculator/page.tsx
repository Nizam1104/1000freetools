"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface FunnelResult {
  stages: Array<{ name: string; visitors: number; conversionRate: number; dropOffRate: number }>;
  overallConversion: number;
  biggestDropOff: { stage: string; rate: number };
  recommendations: string[];
}

export default function FunnelDropOffCalculatorPage() {
  const [stages, setStages] = useState<Array<{ name: string; visitors: string }>>([
    { name: "Visitors", visitors: "" },
    { name: "Signups", visitors: "" },
    { name: "Activated", visitors: "" },
    { name: "Customers", visitors: "" },
  ]);
  const [result, setResult] = useState<FunnelResult | null>(null);

  const updateStage = (index: number, field: string, value: string) => {
    const newStages = [...stages];
    newStages[index] = { ...newStages[index], [field]: value };
    setStages(newStages);
  };

  const calculate = () => {
    const visitorsNums = stages.map(s => parseInt(s.visitors) || 0);
    
    if (visitorsNums[0] === 0) return;

    const stageResults = [];
    let biggestDropOff = { stage: "", rate: 0 };

    for (let i = 0; i < visitorsNums.length; i++) {
      const current = visitorsNums[i];
      const prev = i === 0 ? current : visitorsNums[i - 1];
      
      const conversionRate = i === 0 ? 100 : (current / visitorsNums[0]) * 100;
      const dropOffRate = i === 0 ? 0 : ((prev - current) / prev) * 100;

      stageResults.push({
        name: stages[i].name,
        visitors: current,
        conversionRate: parseFloat(conversionRate.toFixed(1)),
        dropOffRate: parseFloat(dropOffRate.toFixed(1)),
      });

      if (dropOffRate > biggestDropOff.rate && i > 0) {
        biggestDropOff = { stage: stages[i].name, rate: parseFloat(dropOffRate.toFixed(1)) };
      }
    }

    // Overall conversion rate
    const overallConversion = (visitorsNums[visitorsNums.length - 1] / visitorsNums[0]) * 100;

    // Recommendations
    const recommendations: string[] = [];

    if (biggestDropOff.rate > 50) {
      recommendations.push(`🚨 Critical: ${biggestDropOff.rate}% drop-off at ${biggestDropOff.stage} stage`);
      recommendations.push("🔍 Investigate UX issues at this stage immediately");
    } else if (biggestDropOff.rate > 30) {
      recommendations.push(`⚠️ High drop-off (${biggestDropOff.rate}%) at ${biggestDropOff.stage}`);
      recommendations.push("📊 A/B test improvements at this stage");
    }

    if (overallConversion < 1) {
      recommendations.push("📉 Overall conversion below 1% - review entire funnel");
    } else if (overallConversion < 5) {
      recommendations.push("⚠️ Below average conversion - optimization needed");
    } else {
      recommendations.push("✅ Conversion rate is healthy");
    }

    recommendations.push(`📊 Track this funnel weekly to spot trends`);
    recommendations.push(`🎯 Set up alerts for significant drop-off changes`);

    setResult({
      stages: stageResults,
      overallConversion: parseFloat(overallConversion.toFixed(2)),
      biggestDropOff,
      recommendations,
    });
  };

  const reset = () => {
    setStages([
      { name: "Visitors", visitors: "" },
      { name: "Signups", visitors: "" },
      { name: "Activated", visitors: "" },
      { name: "Customers", visitors: "" },
    ]);
    setResult(null);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-5xl">
        <div className="mb-8">
          <h1 className="text-3xl font-semibold tracking-tight mb-2">
            Funnel Drop-off Calculator – Identify Where You&apos;re Losing Customers in Your Sales Funnel
          </h1>
          <p className="text-muted-foreground">
            Pinpoint leaks in your sales pipeline with our Funnel Drop-off Calculator.
            Enter the number of users at each funnel stage to calculate conversion and
            drop-off rates — enabling targeted optimization for maximum revenue.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          <Card>
            <CardContent className="p-6 space-y-4">
              <div className="space-y-3">
                <Label>Funnel Stages</Label>
                {stages.map((stage, index) => (
                  <div key={index} className="flex gap-2 items-center">
                    <Input
                      value={stage.name}
                      onChange={(e) => updateStage(index, "name", e.target.value)}
                      className="w-32"
                      placeholder="Stage name"
                    />
                    <Input
                      type="number"
                      value={stage.visitors}
                      onChange={(e) => updateStage(index, "visitors", e.target.value)}
                      placeholder="Count"
                      className="w-24"
                    />
                  </div>
                ))}
              </div>

              <div className="p-3 bg-muted/50 rounded-lg">
                <p className="text-xs text-muted-foreground">
                  💡 Add more stages or rename existing ones to match your funnel
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
              <h3 className="text-lg font-semibold mb-4">Funnel Analysis</h3>
              {result ? (
                <div className="space-y-4">
                  <div className="p-4 bg-primary/10 rounded-lg text-center">
                    <p className="text-sm text-muted-foreground">Overall Conversion</p>
                    <p className="text-4xl font-bold text-primary">{result.overallConversion}%</p>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2 text-sm">Funnel Visualization</h4>
                    <div className="space-y-2">
                      {result.stages.map((stage, i) => (
                        <div key={i}>
                          <div className="flex justify-between text-sm mb-1">
                            <span>{stage.name}</span>
                            <span>{stage.visitors} ({stage.conversionRate}%)</span>
                          </div>
                          <div className="w-full bg-muted rounded-full h-4">
                            <div
                              className={`h-4 rounded-full ${
                                stage.dropOffRate > 30 ? "bg-red-500" :
                                stage.dropOffRate > 15 ? "bg-amber-500" :
                                "bg-green-500"
                              }`}
                              style={{ width: `${stage.conversionRate}%` }}
                            />
                          </div>
                          {stage.dropOffRate > 0 && (
                            <p className="text-xs text-muted-foreground mt-1">
                              ↓ {stage.dropOffRate}% drop-off from previous
                            </p>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  {result.biggestDropOff.stage && (
                    <div className="p-3 bg-red-50 dark:bg-red-950/20 rounded-lg">
                      <p className="text-sm text-red-800 dark:text-red-200">
                        <strong>⚠️ Biggest Drop-off:</strong> {result.biggestDropOff.rate}% at {result.biggestDropOff.stage} stage
                      </p>
                    </div>
                  )}

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
                  <p>Enter funnel data and click Calculate to see analysis</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="mt-8 space-y-6">
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">
                Funnel Optimization Tips
              </h3>
              <div className="space-y-3 text-sm text-muted-foreground">
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>
                    <strong>Track consistently:</strong> Use same time periods for comparison
                  </li>
                  <li>
                    <strong>Segment users:</strong> Different sources may have different funnels
                  </li>
                  <li>
                    <strong>Set benchmarks:</strong> Know your industry averages
                  </li>
                  <li>
                    <strong>Test iteratively:</strong> One change at a time for clear results
                  </li>
                </ul>
                <p>
                  <strong>Typical SaaS funnel:</strong> Visitors → Signups (2-5%) → 
                  Activated (40-60%) → Customers (10-20%)
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
